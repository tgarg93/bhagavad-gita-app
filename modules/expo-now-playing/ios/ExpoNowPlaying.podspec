Pod::Spec.new do |s|
  s.name           = 'ExpoNowPlaying'
  s.version        = '1.0.0'
  s.summary        = 'Now Playing info center + remote command controls for narration.'
  s.description    = 'Publishes lock-screen / Control Center / CarPlay / Bluetooth Now Playing metadata and routes remote play/pause/skip commands back to JS.'
  s.author         = ''
  s.homepage       = 'https://docs.expo.dev/modules/'
  s.platforms      = { :ios => '15.1' }
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'SWIFT_COMPILATION_MODE' => 'wholemodule'
  }

  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}"
end
