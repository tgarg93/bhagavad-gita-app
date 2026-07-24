import ExpoModulesCore
import MediaPlayer

// A thin metadata + remote-command layer over whatever is already producing audio
// (expo-av clips or expo-speech TTS — this module doesn't play anything itself). It
// feeds MPNowPlayingInfoCenter and wires MPRemoteCommandCenter so the lock screen,
// Control Center, CarPlay's Now Playing tab and Bluetooth head units show the
// narration and can control it. No CarPlay entitlement is required — the system
// populates the CarPlay Now Playing screen for any app that fills these in.
public class ExpoNowPlayingModule: Module {
  private var commandsEnabled = false
  // The artwork URI currently loading/shown, so we skip redundant reloads and can
  // drop a stale async load that resolves after the track already changed.
  private var artworkUri: String?

  public func definition() -> ModuleDefinition {
    Name("ExpoNowPlaying")

    Events("remoteCommand")

    Function("updateMetadata") { (info: [String: Any]) in
      DispatchQueue.main.async {
        self.applyMetadata(info)
      }
    }

    Function("enableCommands") {
      DispatchQueue.main.async {
        self.enableCommands()
      }
    }

    Function("clearNowPlaying") {
      DispatchQueue.main.async {
        self.artworkUri = nil
        MPNowPlayingInfoCenter.default().nowPlayingInfo = nil
      }
    }
  }

  // Merge into the existing dict rather than replacing it, so an artwork load that
  // lands between metadata pushes isn't clobbered by the next text-only update.
  private func applyMetadata(_ info: [String: Any]) {
    var np = MPNowPlayingInfoCenter.default().nowPlayingInfo ?? [String: Any]()

    if let title = info["title"] as? String {
      np[MPMediaItemPropertyTitle] = title
    }
    if let artist = info["artist"] as? String {
      np[MPMediaItemPropertyArtist] = artist
    }
    if let duration = Self.number(info["durationSec"]) {
      np[MPMediaItemPropertyPlaybackDuration] = duration
    }
    if let elapsed = Self.number(info["elapsedSec"]) {
      np[MPNowPlayingInfoPropertyElapsedPlaybackTime] = elapsed
    }
    if let rate = Self.number(info["rate"]) {
      np[MPNowPlayingInfoPropertyPlaybackRate] = rate
    }
    np[MPNowPlayingInfoPropertyMediaType] = MPNowPlayingInfoMediaType.audio.rawValue

    MPNowPlayingInfoCenter.default().nowPlayingInfo = np

    if let uri = info["artworkUri"] as? String, !uri.isEmpty {
      loadArtwork(uri: uri)
    }
  }

  // Bundled covers resolve to a file path in release and an http Metro-asset URL in
  // dev — handle both. Always async so a slow/remote image never blocks a metadata push.
  private func loadArtwork(uri: String) {
    if uri == artworkUri { return } // same art already loading/shown
    artworkUri = uri

    let apply: (UIImage) -> Void = { image in
      let artwork = MPMediaItemArtwork(boundsSize: image.size) { _ in image }
      DispatchQueue.main.async {
        // The track may have changed while we were loading — only apply if this is
        // still the current art, and only if a track is still showing.
        guard self.artworkUri == uri,
              var np = MPNowPlayingInfoCenter.default().nowPlayingInfo else { return }
        np[MPMediaItemPropertyArtwork] = artwork
        MPNowPlayingInfoCenter.default().nowPlayingInfo = np
      }
    }

    if uri.hasPrefix("http://") || uri.hasPrefix("https://") {
      guard let url = URL(string: uri) else { return }
      URLSession.shared.dataTask(with: url) { data, _, _ in
        if let data = data, let image = UIImage(data: data) {
          apply(image)
        }
      }.resume()
    } else {
      let raw = uri.hasPrefix("file://") ? String(uri.dropFirst("file://".count)) : uri
      let path = raw.removingPercentEncoding ?? raw
      DispatchQueue.global(qos: .utility).async {
        if let image = UIImage(contentsOfFile: path) {
          apply(image)
        }
      }
    }
  }

  private func enableCommands() {
    if commandsEnabled { return }
    commandsEnabled = true

    let center = MPRemoteCommandCenter.shared()

    center.playCommand.isEnabled = true
    center.playCommand.addTarget { [weak self] _ in
      self?.sendEvent("remoteCommand", ["action": "play"])
      return .success
    }
    center.pauseCommand.isEnabled = true
    center.pauseCommand.addTarget { [weak self] _ in
      self?.sendEvent("remoteCommand", ["action": "pause"])
      return .success
    }
    center.togglePlayPauseCommand.isEnabled = true
    center.togglePlayPauseCommand.addTarget { [weak self] _ in
      self?.sendEvent("remoteCommand", ["action": "toggle"])
      return .success
    }

    center.skipForwardCommand.isEnabled = true
    center.skipForwardCommand.preferredIntervals = [15]
    center.skipForwardCommand.addTarget { [weak self] _ in
      self?.sendEvent("remoteCommand", ["action": "skipForward"])
      return .success
    }
    center.skipBackwardCommand.isEnabled = true
    center.skipBackwardCommand.preferredIntervals = [15]
    center.skipBackwardCommand.addTarget { [weak self] _ in
      self?.sendEvent("remoteCommand", ["action": "skipBackward"])
      return .success
    }

    // We drive neither track stepping nor scrubbing from the remote surfaces.
    center.nextTrackCommand.isEnabled = false
    center.previousTrackCommand.isEnabled = false
    center.changePlaybackPositionCommand.isEnabled = false
  }

  // JS numbers arrive as NSNumber; accept Double/Int/NSNumber uniformly.
  private static func number(_ value: Any?) -> Double? {
    if let d = value as? Double { return d }
    if let n = value as? NSNumber { return n.doubleValue }
    return nil
  }
}
