// The Foundations diagrams — one half of the section-figure registry that
// `SectionFigure.tsx` assembles (the other half is `figures/conceptFigures.tsx`).
// Keyed on the card's section id, so a card carries no figure config: if a figure
// exists for that id it renders, if not the card is text-only and nothing breaks.
//
// These are still drawn on the ORIGINAL 640-unit canvas, which the card squeezes
// into ~342px — everything at 53%, hence the tap-to-enlarge affordance on
// `Figure`. The Foundations retrofit rescales them to 1:1; `DharmaRolesSvg` below
// is the first one done, because concept:dharma reuses it.
//
// Arrowheads are drawn as explicit <Path> triangles rather than SVG <Marker>,
// which react-native-svg supports unevenly across platforms.
import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import Svg, {
  Rect,
  Circle,
  Ellipse,
  Path,
  Line,
  G,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Text as SvgText,
} from 'react-native-svg';
import {
  BuildIn,
  SceneFigure,
  useOneShot,
  useBreathLoop,
  useSpin,
  Caption,
  Figure,
  InsetFigure,
  styles,
  INK,
  SOFT,
  GOLD,
  TEAL,
  INDIGO,
  SAFFRON,
  PINK,
  GREEN,
  TURMERIC,
  RULE,
} from './figures/figurePrimitives';

// Animated SVG primitives for the two bespoke figures (salt dissolve, breath loop).
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

// Illustration-only palette for the Core-Ideas scenes (matches the approved
// Wave 0 Act 3 artifact). Kept local — these are scene colours, not design tokens.
const OCEAN_TOP = '#4A5AB0';
const OCEAN_DEEP = '#25306E';
const SKY_TOP = '#EAF0FA';
const SKY_BOT = '#DCE4F5';
const FOAM = '#B4BEE8';
const SWELL = '#9FAAE2';
const OCEAN_INK = '#25306E';
const OCEAN_LABEL = '#41508F';
const CLAY = '#B07050';
const DARKROOM_TOP = '#2A2440';
const DARKROOM_BOT = '#151228';

// ── Sindhu → Hindū → Indós → India / Indus ──────────────────────────────────
const Etymology = () => (
  <Figure caption="“Hindu”, “India” and “Indus” are the same word.">
    <Svg width="100%" height={150} viewBox="0 0 640 190">
      {[
        { x: 8, label: 'सिन्धु', sub: 'Sindhu', foot: 'the river (Sanskrit)', color: TEAL },
        { x: 178, label: 'Hindū', sub: '“the people over there”', foot: 'a place, not a faith', color: SAFFRON },
        { x: 348, label: 'Indós', sub: 'Greek', foot: '', color: INDIGO },
      ].map(b => (
        <G key={b.x}>
          <Rect x={b.x} y={54} width={118} height={50} rx={3} fill="none" stroke={b.color} strokeWidth={1.5} />
          <SvgText x={b.x + 59} y={78} textAnchor="middle" fontSize={15} fontWeight="700" fill={INK}>{b.label}</SvgText>
          <SvgText x={b.x + 59} y={95} textAnchor="middle" fontSize={10} fill={SOFT}>{b.sub}</SvgText>
          {!!b.foot && <SvgText x={b.x + 59} y={124} textAnchor="middle" fontSize={10} fill={SOFT}>{b.foot}</SvgText>}
        </G>
      ))}
      {[{ x: 130, top: 'Persians', bot: 'lose the S' }, { x: 300, top: 'Greeks', bot: 'lose the H' }].map(a => (
        <G key={a.x}>
          <Line x1={a.x} y1={79} x2={a.x + 36} y2={79} stroke={SOFT} strokeWidth={1.2} />
          <Path d={`M${a.x + 42},79 L${a.x + 34},75 L${a.x + 34},83 Z`} fill={SOFT} />
          <SvgText x={a.x + 24} y={69} textAnchor="middle" fontSize={9} fill={SOFT}>{a.top}</SvgText>
          <SvgText x={a.x + 24} y={97} textAnchor="middle" fontSize={9} fill={SOFT}>{a.bot}</SvgText>
        </G>
      ))}
      <Line x1={470} y1={79} x2={506} y2={79} stroke={SOFT} strokeWidth={1.2} />
      <Path d="M512,79 L504,75 L504,83 Z" fill={SOFT} />
      <SvgText x={490} y={69} textAnchor="middle" fontSize={9} fill={SOFT}>Latin</SvgText>
      <Rect x={518} y={42} width={106} height={30} rx={3} fill="none" stroke={GOLD} strokeWidth={1.5} />
      <SvgText x={571} y={62} textAnchor="middle" fontSize={14} fontWeight="700" fill={INK}>India</SvgText>
      <Rect x={518} y={86} width={106} height={30} rx={3} fill="none" stroke={GOLD} strokeWidth={1.5} />
      <SvgText x={571} y={106} textAnchor="middle" fontSize={14} fontWeight="700" fill={INK}>Indus</SvgText>
      <SvgText x={320} y={172} textAnchor="middle" fontSize={11} fontStyle="italic" fill={SOFT}>
        Three languages wore one river-name down into three of ours.
      </SvgText>
    </Svg>
  </Figure>
);

// ── Hinduism / Judaism / Christianity / Islam ───────────────────────────────
// A table, built as a table — this one is all text, and Views keep it readable
// and selectable in a way SVG text would not.
const COMPARE_ROWS: [string, string, string, string, string][] = [
  ['Founder', 'None', 'Abraham, Moses', 'Jesus', 'Muhammad'],
  ['One book', 'No — a library', 'The Torah', 'The Bible', 'The Qur’an'],
  ['You join by', 'Practicing', 'Birth or covenant', 'Professing faith', 'The shahada'],
  ['After death', 'Reborn — again', 'Rarely the point', 'Judgement, once', 'Judgement, once'],
  ['The goal', 'Escape the cycle', 'Live the covenant', 'Salvation', 'Paradise'],
];

const Compare = () => (
  <View style={styles.figure}>
    <View style={styles.table}>
      <View style={[styles.tr, styles.thead]}>
        <Text style={[styles.th, styles.colLabel]} />
        <Text style={[styles.th, styles.colUs]}>Hinduism</Text>
        <Text style={styles.th}>Judaism</Text>
        <Text style={styles.th}>Christian</Text>
        <Text style={styles.th}>Islam</Text>
      </View>
      {COMPARE_ROWS.map(([label, us, ju, ch, is]) => (
        <View key={label} style={styles.tr}>
          <Text style={[styles.td, styles.colLabel, styles.rowLabel]}>{label}</Text>
          <Text style={[styles.td, styles.colUs, styles.tdUs]}>{us}</Text>
          <Text style={styles.td}>{ju}</Text>
          <Text style={styles.td}>{ch}</Text>
          <Text style={styles.td}>{is}</Text>
        </View>
      ))}
    </View>
    <Caption>They ask what you believe. This one asks what you do.</Caption>
  </View>
);

// ── One trunk, four boughs ──────────────────────────────────────────────────
const STREAM_BOUGHS = [
  { d: 'M320 170 C320 138, 120 148, 92 104', c: TEAL, cx: 92, name: 'Vaishnava', god: 'Vishnu', foot: 'Rama · Krishna' },
  { d: 'M320 170 C320 138, 240 146, 232 102', c: INDIGO, cx: 232, name: 'Shaiva', god: 'Shiva', foot: 'the ascetic' },
  { d: 'M320 170 C320 138, 400 146, 408 102', c: PINK, cx: 408, name: 'Shakta', god: 'the Goddess', foot: 'Durga · Kali' },
  { d: 'M320 170 C320 138, 520 148, 548 104', c: GREEN, cx: 548, name: 'Smarta', god: 'all of them', foot: 'five at once' },
];

// The tree builds in once, when `active` first turns true — i.e. when the reader
// lands on this page (for a read-along, the moment the narration reaches it). The
// whole figure fades and grows up from the root. The motion lives in the shared
// `BuildIn` wrapper (see figurePrimitives) because react-native-svg won't reliably
// animate stroke props — the SVG itself stays static.
const StreamsSvg: React.FC<{ active?: boolean; width?: number | string; height?: number }> = ({
  active,
  width = '100%',
  height = 190,
}) => (
  <BuildIn active={active}>
    <Svg width={width} height={height} viewBox="0 0 640 244">
        <Path d="M320 244 L320 166" stroke={GOLD} strokeWidth={9} strokeLinecap="round" fill="none" />
        {STREAM_BOUGHS.map(b => (
          <G key={b.cx}>
            <Path d={b.d} stroke={b.c} strokeWidth={4} strokeLinecap="round" fill="none" />
            <Circle cx={b.cx} cy={86} r={26} fill={b.c} opacity={0.14} />
            <SvgText x={b.cx} y={42} textAnchor="middle" fontSize={12} fontWeight="700" fill={INK}>{b.name}</SvgText>
            <SvgText x={b.cx} y={91} textAnchor="middle" fontSize={10} fill={SOFT}>{b.god}</SvgText>
            <SvgText x={b.cx} y={130} textAnchor="middle" fontSize={9} fill={SOFT}>{b.foot}</SvgText>
          </G>
        ))}
        <SvgText x={320} y={212} textAnchor="middle" fontSize={10} fill={SOFT}>one root</SvgText>
        <SvgText x={320} y={231} textAnchor="middle" fontSize={12} fontWeight="600" fill={INK}>Sanatana Dharma</SvgText>
    </Svg>
  </BuildIn>
);

const Streams: React.FC<{ active?: boolean }> = ({ active }) => (
  <Figure caption="Not sects at war. Four answers to “which face do you love?”" viewBox="0 0 640 244">
    <StreamsSvg active={active} />
  </Figure>
);

// ── The pot and the sky (Wave 0: full-bleed 1:1) ────────────────────────────
const PotSpace: React.FC<{ active?: boolean }> = ({ active }) => (
  <SceneFigure caption="The pot has walls. The space does not." active={active}>
    <Svg width="100%" height={260} viewBox="0 0 390 260">
      <Defs>
        <LinearGradient id="p-sky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={SKY_TOP} />
          <Stop offset="1" stopColor={SKY_BOT} />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={390} height={260} fill="url(#p-sky)" />
      {[[44, 42, 1.6], [120, 26, 1.4], [210, 46, 1.6], [300, 30, 1.4], [356, 54, 1.6], [60, 120, 1.4], [340, 128, 1.6], [176, 20, 1.3]].map(
        ([cx, cy, r]) => (
          <Circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={GOLD} opacity={0.55} />
        )
      )}
      <Path d="M150 128 C138 162 145 214 170 228 L220 228 C245 214 252 162 240 128 Z" fill="#5A6AC0" opacity={0.24} />
      <Path d="M150 128 C138 162 145 214 170 228 L220 228 C245 214 252 162 240 128" fill="none" stroke={CLAY} strokeWidth={7} strokeLinecap="round" />
      <Ellipse cx={195} cy={128} rx={46} ry={10} fill="none" stroke={CLAY} strokeWidth={3} opacity={0.55} strokeDasharray="3 4" />
      <SvgText x={195} y={182} textAnchor="middle" fontSize={14} fontWeight="700" fontStyle="italic" fill={INK}>ātman</SvgText>
      <SvgText x={195} y={199} textAnchor="middle" fontSize={10.5} fill="#5A6AC0">the space inside</SvgText>
      <SvgText x={34} y={86} fontSize={14} fontWeight="700" fontStyle="italic" fill="#3A4680">brahman</SvgText>
      <SvgText x={34} y={103} fontSize={10.5} fill={OCEAN_LABEL}>the space everywhere</SvgText>
      <SvgText x={195} y={250} textAnchor="middle" fontSize={11} fontStyle="italic" fill={SOFT}>
        Break the pot and nothing is released.
      </SvgText>
    </Svg>
  </SceneFigure>
);

// The ocean base shared by brahman and atman — the water is a FILLED path whose
// top edge is the wave itself (not a flat rect with strokes floating in it), so
// the two figures read as one continuous scene: atman is brahman + one drop.
const OCEAN_SURFACE = 'M0 150 C50 134 90 168 140 150 C190 132 230 168 280 150 C330 132 362 162 390 148';
const OceanBase = () => (
  <>
    <Rect x={0} y={0} width={390} height={250} fill="url(#o-sky)" />
    <Path d={`${OCEAN_SURFACE} L390 250 L0 250 Z`} fill="url(#o-sea)" />
    <Path d={OCEAN_SURFACE} fill="none" stroke={FOAM} strokeWidth={2} opacity={0.55} />
    <Path d="M0 186 C48 174 92 200 140 186 C188 172 232 202 280 186 C328 174 362 196 390 184" fill="none" stroke={SWELL} strokeWidth={1.6} opacity={0.3} />
    <Path d="M0 216 C48 206 92 228 140 216 C188 206 232 228 280 216 C328 206 362 224 390 214" fill="none" stroke={FOAM} strokeWidth={1.4} opacity={0.22} />
  </>
);
const OceanDefs = ({ id }: { id: string }) => (
  <Defs>
    <LinearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
      <Stop offset="0" stopColor={SKY_TOP} />
      <Stop offset="1" stopColor={SKY_BOT} />
    </LinearGradient>
    <LinearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
      <Stop offset="0" stopColor={OCEAN_TOP} />
      <Stop offset="1" stopColor={OCEAN_DEEP} />
    </LinearGradient>
  </Defs>
);

// ── Brahman: the ocean (Wave 0: full-bleed 1:1) ─────────────────────────────
const OceanWaves: React.FC<{ active?: boolean }> = ({ active }) => (
  <SceneFigure caption="One water. Every form is a shape it takes." active={active}>
    <Svg width="100%" height={250} viewBox="0 0 390 250">
      <OceanDefs id="o" />
      <OceanBase />
      <SvgText x={24} y={196} fontSize={15} fontWeight="700" fontStyle="italic" fill={SKY_TOP}>brahman</SvgText>
      <SvgText x={24} y={214} fontSize={11} fill="#C7D0EC">the ocean — the one water</SvgText>
    </Svg>
  </SceneFigure>
);

// ── One current, many devices (Wave 0: distinct appliances on one wire) ──────
const OneCurrentManyLamps: React.FC<{ active?: boolean }> = ({ active }) => (
  <SceneFigure caption="One current — a lamp lights, a fan spins, a kettle heats." active={active}>
    <Svg width="100%" height={240} viewBox="0 0 390 240">
      <Defs>
        <RadialGradient id="l-glow" cx="0.5" cy="0.5" r="0.5">
          <Stop offset="0" stopColor="#FFD766" stopOpacity={0.85} />
          <Stop offset="1" stopColor="#FFD766" stopOpacity={0} />
        </RadialGradient>
        <LinearGradient id="l-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={DARKROOM_TOP} />
          <Stop offset="1" stopColor={DARKROOM_BOT} />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={390} height={240} fill="url(#l-bg)" />
      {/* the one wire, and three cords tapping off it */}
      <Path d="M14 200 L376 200" stroke="#00A594" strokeWidth={3.5} strokeLinecap="round" />
      <Line x1={80} y1={200} x2={80} y2={150} stroke="#00A594" strokeWidth={2.4} />
      <Line x1={195} y1={200} x2={195} y2={150} stroke="#00A594" strokeWidth={2.4} />
      <Line x1={310} y1={200} x2={310} y2={176} stroke="#00A594" strokeWidth={2.4} />
      {/* 1 · a table lamp */}
      <Circle cx={80} cy={120} r={42} fill="url(#l-glow)" />
      <Path d="M60 118 L100 118 L92 96 L68 96 Z" fill="#FFE39A" />
      <Path d="M60 118 L100 118 L106 128 L54 128 Z" fill="#FFCF5A" />
      <Line x1={80} y1={128} x2={80} y2={150} stroke="#C9BFA6" strokeWidth={2.4} />
      <Rect x={70} y={150} width={20} height={4} rx={2} fill="#C9BFA6" />
      <SvgText x={80} y={72} textAnchor="middle" fontSize={11} fill="#B9C2E8">a lamp</SvgText>
      <SvgText x={80} y={86} textAnchor="middle" fontSize={8.5} fill="#6C6C8C">it lights</SvgText>
      {/* 2 · a fan */}
      <Circle cx={195} cy={112} r={42} fill="none" stroke="#3A3A5C" strokeWidth={2} />
      <G fill="#8FE3D8" opacity={0.9}>
        <Path d="M195 112 Q214 92 210 78 Q190 90 195 112 Z" />
        <Path d="M195 112 Q220 128 214 146 Q192 132 195 112 Z" />
        <Path d="M195 112 Q168 122 152 132 Q172 100 195 112 Z" />
      </G>
      <Circle cx={195} cy={112} r={7} fill="#CFE9E3" />
      <Path d="M226 90 A40 40 0 0 1 232 116" fill="none" stroke="#8FE3D8" strokeWidth={1.6} opacity={0.55} />
      <Path d="M234 84 A48 48 0 0 1 241 118" fill="none" stroke="#8FE3D8" strokeWidth={1.4} opacity={0.3} />
      <SvgText x={195} y={60} textAnchor="middle" fontSize={11} fill="#B9C2E8">a fan</SvgText>
      <SvgText x={195} y={74} textAnchor="middle" fontSize={8.5} fill="#6C6C8C">it spins</SvgText>
      {/* 3 · an electric kettle */}
      <Path d="M292 176 Q288 150 296 146 L330 146 Q338 150 334 176 Z" fill="#4A5A6C" />
      <Path d="M296 146 L330 146 L328 140 L298 140 Z" fill="#5C6E82" />
      <Path d="M292 156 Q278 154 276 142" fill="none" stroke="#4A5A6C" strokeWidth={5} strokeLinecap="round" />
      <Path d="M334 150 Q352 152 350 170" fill="none" stroke="#4A5A6C" strokeWidth={4} />
      <Path d="M282 132 Q276 122 284 114 Q292 106 286 96" fill="none" stroke="#8FA0B4" strokeWidth={2.2} strokeLinecap="round" opacity={0.7} />
      <Path d="M292 128 Q286 120 293 112" fill="none" stroke="#8FA0B4" strokeWidth={2} strokeLinecap="round" opacity={0.45} />
      <SvgText x={310} y={112} textAnchor="middle" fontSize={11} fill="#B9C2E8">a kettle</SvgText>
      <SvgText x={310} y={126} textAnchor="middle" fontSize={8.5} fill="#6C6C8C">it heats</SvgText>
      <SvgText x={195} y={228} textAnchor="middle" fontSize={12} fontWeight="700" fontStyle="italic" fill="#8FE3D8">
        brahman — the current you never see
      </SvgText>
    </Svg>
  </SceneFigure>
);

// ── Atman: the drop (Wave 0: the SAME ocean base + one drop) ────────────────
const DropAndOcean: React.FC<{ active?: boolean }> = ({ active }) => (
  <SceneFigure caption="Same water, smaller shape." active={active}>
    <Svg width="100%" height={250} viewBox="0 0 390 250">
      <OceanDefs id="o" />
      <Defs>
        <RadialGradient id="d-drop" cx="0.4" cy="0.35" r="0.7">
          <Stop offset="0" stopColor="#8B98DC" />
          <Stop offset="1" stopColor="#3A4680" />
        </RadialGradient>
      </Defs>
      <OceanBase />
      <SvgText x={24} y={196} fontSize={15} fontWeight="700" fontStyle="italic" fill={SKY_TOP}>brahman</SvgText>
      <SvgText x={24} y={214} fontSize={11} fill="#C7D0EC">the ocean</SvgText>
      {/* the one element the drop card adds, above the wave surface */}
      <Path d="M195 30 q-20 32 -20 45 a20 20 0 0 0 40 0 q0 -13 -20 -45" fill="url(#d-drop)" />
      <Circle cx={188} cy={66} r={5} fill={SKY_TOP} opacity={0.6} />
      <Line x1={195} y1={98} x2={195} y2={138} stroke="#7C8AD6" strokeWidth={2} strokeDasharray="3 5" />
      <SvgText x={232} y={60} fontSize={14} fontWeight="700" fontStyle="italic" fill={OCEAN_INK}>ātman</SvgText>
      <SvgText x={232} y={76} fontSize={11} fill={OCEAN_LABEL}>the drop</SvgText>
    </Svg>
  </SceneFigure>
);

// ── The salt in the water (Wave 0: one-shot dissolve, then a faint even tint) ─
// Concept IS a transformation, so it animates: crystals fall in, sink, and fade
// to nothing while an even haze fills in — no discrete dots left to point at.
// One-shot on arrival; Reduce Motion jumps straight to the dissolved rest state.
const SALT_CRYSTALS: [number, number][] = [
  [182, 72], [190, 68], [199, 73], [187, 80], [196, 78],
];
const SaltDissolve: React.FC<{ active?: boolean }> = ({ active }) => {
  const p = useOneShot(active, 2600);
  const hazeOpacity = p.interpolate({ inputRange: [0, 0.45, 1], outputRange: [0, 0, 0.9] });
  const crystalOpacity = p.interpolate({ inputRange: [0, 0.12, 0.55, 1], outputRange: [0, 1, 0.9, 0] });
  return (
    <SceneFigure caption="Gone from sight — present in every sip." active={active} animate={false}>
      <Svg width="100%" height={250} viewBox="0 0 390 250">
        <Defs>
          <LinearGradient id="s-bg" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FCF7E8" />
            <Stop offset="1" stopColor="#F1E7CE" />
          </LinearGradient>
          <ClipPath id="s-clip">
            <Path d="M96 96 L294 96 C286 168 244 198 195 198 C146 198 104 168 96 96 Z" />
          </ClipPath>
        </Defs>
        <Rect x={0} y={0} width={390} height={250} fill="url(#s-bg)" />
        <G clipPath="url(#s-clip)">
          <Rect x={90} y={90} width={210} height={120} fill="#5A6AC0" opacity={0.14} />
          <AnimatedRect x={90} y={90} width={210} height={120} fill="#5A6AC0" opacity={hazeOpacity} />
          {SALT_CRYSTALS.map(([cx, y0], i) => (
            <AnimatedCircle
              key={i}
              cx={cx}
              cy={p.interpolate({ inputRange: [0, 1], outputRange: [y0, y0 + 64] })}
              r={2.6}
              fill="#F2EDE0"
              opacity={crystalOpacity}
            />
          ))}
        </G>
        <Path d="M96 96 L294 96 C286 168 244 198 195 198 C146 198 104 168 96 96" fill="none" stroke={CLAY} strokeWidth={6} strokeLinecap="round" />
        <Path d="M110 110 C160 124 230 124 280 110" fill="none" stroke="#5A6AC0" strokeWidth={2.5} opacity={0.55} />
        <SvgText x={18} y={150} fontSize={10.5} fill={SOFT}>sip from</SvgText>
        <SvgText x={18} y={164} fontSize={10.5} fill={SOFT}>any side:</SvgText>
        <SvgText x={18} y={180} fontSize={12} fontWeight="700" fill={CLAY}>salty</SvgText>
        <SvgText x={372} y={150} textAnchor="end" fontSize={12} fontWeight="700" fontStyle="italic" fill={INK}>the salt</SvgText>
        <SvgText x={372} y={166} textAnchor="end" fontSize={10.5} fill={SOFT}>now gone</SvgText>
        <SvgText x={372} y={180} textAnchor="end" fontSize={10.5} fill={SOFT}>from sight</SvgText>
        <SvgText x={195} y={228} textAnchor="middle" fontSize={11} fontStyle="italic" fill="#8A6A1E">
          Nowhere to point at — nowhere it isn’t.
        </SvgText>
      </Svg>
    </SceneFigure>
  );
};

// ── Namaste (f-claim-tta-so-what) — DEFERRED TO RASTER ──────────────────────
// Two attempts at code-vector praying hands both read as anatomically wrong.
// Realistic hands are the one subject flat vector can't carry, so this figure
// waits for a painted (Modern Editorial Miniature) illustration — the first item
// in the eventual raster batch. Until then the card is intentionally text-only:
// no registry entry, so SectionFigure renders nothing rather than a broken or
// squeezed figure. Do NOT re-add a vector namaste.

// ── The mirage (Wave 0: full-bleed 1:1) ─────────────────────────────────────
const Mirage: React.FC<{ active?: boolean }> = ({ active }) => (
  <SceneFigure caption="The road is real. “Water” was the reading." active={active}>
    <Svg width="100%" height={250} viewBox="0 0 390 250">
      <Defs>
        <LinearGradient id="m-sky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FBE7B4" />
          <Stop offset="1" stopColor="#F6D28A" />
        </LinearGradient>
        <LinearGradient id="m-road" x1="0" y1="1" x2="0" y2="0">
          <Stop offset="0" stopColor="#6B6152" />
          <Stop offset="1" stopColor="#9A8B72" />
        </LinearGradient>
        <RadialGradient id="m-sun" cx="0.5" cy="0.5" r="0.5">
          <Stop offset="0" stopColor="#FFE39A" />
          <Stop offset="1" stopColor="#FFE39A" stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width={390} height={250} fill="url(#m-sky)" />
      <Circle cx={320} cy={58} r={46} fill="url(#m-sun)" />
      <Circle cx={320} cy={58} r={20} fill="#FFCF5A" />
      <Path d="M70 236 L182 96 L208 96 L320 236 Z" fill="url(#m-road)" />
      <Path d="M195 232 L195 208 M195 196 L195 178 M195 168 L195 152 M195 144 L195 132" stroke="#F1E7CE" strokeWidth={4} opacity={0.8} />
      <Ellipse cx={195} cy={98} rx={30} ry={7} fill="#5A6AC0" opacity={0.45} />
      <Ellipse cx={195} cy={98} rx={16} ry={4} fill="#5A6AC0" opacity={0.8} />
      <SvgText x={195} y={74} textAnchor="middle" fontSize={11} fontWeight="700" fontStyle="italic" fill="#3A4680">“water”</SvgText>
      <SvgText x={60} y={150} fontSize={10.5} fill="#6B6152">dry when</SvgText>
      <SvgText x={60} y={164} fontSize={10.5} fill="#6B6152">you arrive</SvgText>
      <SvgText x={195} y={246} textAnchor="middle" fontSize={10.5} fill="#6B6152">the road — real the whole way</SvgText>
    </Svg>
  </SceneFigure>
);

// ── The breath (Wave 0: breathe-along loop) ─────────────────────────────────
// The one sanctioned ambient loop in the app — the "Try it now" practice card.
// A dot rides one breath curve: quick up on the in-breath, long slow glide on
// the exhale, so the reader can breathe with it. Points below are sampled off
// the authored path (RN has no offset-path), keyed by cumulative arc-length
// fraction; useBreathLoop drives `t` as that fraction (see figurePrimitives —
// gated on `active`, disabled under Reduce Motion, do NOT copy the loop).
const BREATH_PATH = 'M10 110 C35 60 70 52 100 52 C160 52 300 108 380 110';
const BREATH_F = [0, 0.091, 0.163, 0.225, 0.284, 0.43, 0.623, 0.825, 1];
const BREATH_X = [10, 30.4, 53.1, 76.8, 100, 157.8, 232.5, 310.9, 380];
const BREATH_Y = [110, 79.8, 62.3, 54, 52, 60.8, 80.3, 100.1, 110];
const BREATH_INHALE_FRAC = 0.284;
const BreatheAlong: React.FC<{ active?: boolean }> = ({ active }) => {
  const t = useBreathLoop(active, BREATH_INHALE_FRAC);
  const cx = t.interpolate({ inputRange: BREATH_F, outputRange: BREATH_X });
  const cy = t.interpolate({ inputRange: BREATH_F, outputRange: BREATH_Y });
  // halo swells on the in-breath, softens on the out
  const haloR = t.interpolate({ inputRange: [0, BREATH_INHALE_FRAC, 1], outputRange: [15, 26, 15] });
  return (
    <SceneFigure caption="Breathe with the dot — in for four, out for six." active={active} animate={false}>
      <Svg width="100%" height={200} viewBox="0 0 390 200">
        <Defs>
          <LinearGradient id="b-bg" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#E4F3F0" />
            <Stop offset="1" stopColor="#CFE9E3" />
          </LinearGradient>
          <LinearGradient id="b-wave" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#00A594" />
            <Stop offset="1" stopColor={TEAL} />
          </LinearGradient>
          <RadialGradient id="b-dot" cx="0.5" cy="0.5" r="0.5">
            <Stop offset="0" stopColor="#00A594" stopOpacity={0.35} />
            <Stop offset="1" stopColor="#00A594" stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={390} height={200} fill="url(#b-bg)" />
        <Line x1={0} y1={110} x2={390} y2={110} stroke={TEAL} strokeWidth={1} strokeDasharray="2 6" opacity={0.3} />
        <Path d={BREATH_PATH} fill="none" stroke="url(#b-wave)" strokeWidth={4.5} strokeLinecap="round" />
        <AnimatedCircle cx={cx} cy={cy} r={haloR} fill="url(#b-dot)" />
        <AnimatedCircle cx={cx} cy={cy} r={7} fill={TEAL} />
        <SvgText x={86} y={38} fontSize={11} fontWeight="700" fill={TEAL}>in · four</SvgText>
        <SvgText x={252} y={150} fontSize={11} fontWeight="700" fontStyle="italic" fill={TEAL}>out — long and slow · six</SvgText>
      </Svg>
    </SceneFigure>
  );
};

// ── The three strands, twisted into one rope (Wave 0: full-bleed 1:1) ────────
// Three coloured strands fray from their labels on the left and twist together
// into one cord — drawn as diagonal colour bands so it reads as a plaited rope,
// not crossing wires. All three always present; only the ratio moves.
const GUNA_BANDS: [number, number, string][] = [
  [150, 30, '#C9A233'], [170, 20, '#E65100'], [182, 20, '#303F9F'],
  [204, 30, '#C9A233'], [226, 20, '#E65100'], [238, 20, '#303F9F'],
  [260, 30, '#C9A233'], [282, 20, '#E65100'], [294, 20, '#303F9F'],
  [316, 30, '#C9A233'], [338, 24, '#E65100'], [356, 14, '#303F9F'],
];
const ROPE_OUTLINE = 'M150 88 C176 82 330 82 356 96 C362 100 362 116 356 120 C330 134 176 134 150 128 C144 124 144 92 150 88 Z';
const Gunas: React.FC<{ active?: boolean }> = ({ active }) => (
  <SceneFigure caption="Not three types of people. Three threads in every person." active={active}>
    <Svg width="100%" height={250} viewBox="0 0 390 250">
      <Defs>
        <LinearGradient id="gu-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FCF7E8" />
          <Stop offset="1" stopColor="#F1E7CE" />
        </LinearGradient>
        <ClipPath id="gu-rope">
          <Path d={ROPE_OUTLINE} />
        </ClipPath>
      </Defs>
      <Rect x={0} y={0} width={390} height={250} fill="url(#gu-bg)" />
      <SvgText x={195} y={30} textAnchor="middle" fontSize={10} fontWeight="700" letterSpacing={1.4} fill="#8A6A1E">
        ONE ROPE, THREE STRANDS
      </SvgText>

      {/* three separate strands on the left, converging into the rope */}
      <Path d="M40 84 C90 84 118 92 150 104" fill="none" stroke="#C9A233" strokeWidth={8} strokeLinecap="round" />
      <Path d="M40 108 C92 108 120 108 150 108" fill="none" stroke="#E65100" strokeWidth={8} strokeLinecap="round" />
      <Path d="M40 132 C90 132 118 124 150 112" fill="none" stroke="#303F9F" strokeWidth={8} strokeLinecap="round" />
      <Circle cx={40} cy={84} r={5.5} fill="#C9A233" />
      <Circle cx={40} cy={108} r={5.5} fill="#E65100" />
      <Circle cx={40} cy={132} r={5.5} fill="#303F9F" />

      {/* the twisted cord: diagonal colour bands cycling the three strands */}
      <G clipPath="url(#gu-rope)">
        <Rect x={150} y={82} width={212} height={52} fill="#EBD9A8" />
        {GUNA_BANDS.map(([x, w, c], i) => (
          <Path key={i} d={`M${x} 82 l${w} 0 l-30 52 l${-w} 0 Z`} fill={c} />
        ))}
        <Rect x={150} y={86} width={212} height={7} fill="#FFFFFF" opacity={0.22} />
        <Rect x={150} y={124} width={212} height={7} fill="#000000" opacity={0.12} />
      </G>
      <Path d={ROPE_OUTLINE} fill="none" stroke="#8A6A1E" strokeWidth={1.4} opacity={0.4} />

      <Rect x={30} y={176} width={9} height={9} rx={2} fill="#C9A233" />
      <SvgText x={45} y={184} fontSize={13} fontWeight="700" fontStyle="italic" fill={INK}>sattva</SvgText>
      <SvgText x={30} y={200} fontSize={10} fill={SOFT}>clarity · light</SvgText>
      <Rect x={160} y={176} width={9} height={9} rx={2} fill="#E65100" />
      <SvgText x={175} y={184} fontSize={13} fontWeight="700" fontStyle="italic" fill={INK}>rajas</SvgText>
      <SvgText x={160} y={200} fontSize={10} fill={SOFT}>heat · drive</SvgText>
      <Rect x={286} y={176} width={9} height={9} rx={2} fill="#303F9F" />
      <SvgText x={301} y={184} fontSize={13} fontWeight="700" fontStyle="italic" fill={INK}>tamas</SvgText>
      <SvgText x={286} y={200} fontSize={10} fill={SOFT}>inertia · fog</SvgText>

      <SvgText x={195} y={230} textAnchor="middle" fontSize={11} fontStyle="italic" fill="#8A6A1E">
        All three, always — only the ratio moves.
      </SvgText>
    </Svg>
  </SceneFigure>
);

// ── Seed and harvest (Wave 0: full-bleed 1:1) ───────────────────────────────
const KarmaSeed: React.FC<{ active?: boolean }> = ({ active }) => (
  <SceneFigure caption="The harvest is true to the seed. You are not sentenced — you are farming." active={active}>
    <Svg width="100%" height={250} viewBox="0 0 390 250">
      <Defs>
        <LinearGradient id="k-sky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#EAF3E4" />
          <Stop offset="1" stopColor="#F1E7CE" />
        </LinearGradient>
        <LinearGradient id="k-soil" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#B98A52" />
          <Stop offset="1" stopColor="#9A6E3C" />
        </LinearGradient>
        <RadialGradient id="k-crown" cx="0.5" cy="0.5" r="0.5">
          <Stop offset="0" stopColor="#5FA83F" />
          <Stop offset="1" stopColor="#388E3C" />
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width={390} height={250} fill="url(#k-sky)" />
      <Rect x={0} y={184} width={390} height={66} fill="url(#k-soil)" />
      <Path d="M0 184 C60 178 120 190 190 184 C260 178 330 190 390 184 L390 190 L0 190 Z" fill="#A87C48" opacity={0.5} />

      {/* the seed */}
      <Ellipse cx={70} cy={196} rx={9} ry={12} fill="#7A5A2E" />
      <Path d="M70 184 C70 176 66 170 72 164" fill="none" stroke="#5FA83F" strokeWidth={2.5} strokeLinecap="round" />
      <SvgText x={70} y={228} textAnchor="middle" fontSize={11} fontWeight="700" fill={INK}>the action</SvgText>

      {/* time arrow */}
      <Path d="M108 120 C170 96 236 96 292 116" fill="none" stroke="#8A6A1E" strokeWidth={1.6} strokeDasharray="5 5" />
      <Path d="M298 118 L286 113 L289 123 Z" fill="#8A6A1E" />
      <SvgText x={200} y={86} textAnchor="middle" fontSize={10} fill="#8A6A1E">seasons — sometimes lives — later</SvgText>

      {/* the tree */}
      <Path d="M320 184 L320 120" stroke="#7A5A2E" strokeWidth={7} strokeLinecap="round" />
      <Path d="M320 150 C300 146 292 132 296 120 M320 140 C340 138 350 124 346 112" fill="none" stroke="#7A5A2E" strokeWidth={4} strokeLinecap="round" />
      <Circle cx={320} cy={102} r={40} fill="url(#k-crown)" opacity={0.35} />
      <Circle cx={320} cy={102} r={27} fill="url(#k-crown)" opacity={0.55} />
      <Circle cx={305} cy={96} r={6} fill="#E8823C" />
      <Circle cx={335} cy={108} r={6} fill="#E8823C" />
      <Circle cx={326} cy={86} r={6} fill="#E8823C" />
      <SvgText x={320} y={228} textAnchor="middle" fontSize={11} fontWeight="700" fill={INK}>the consequence</SvgText>
      <SvgText x={320} y={242} textAnchor="middle" fontSize={9} fill="#EFE4C4">true to its kind</SvgText>
    </Svg>
  </SceneFigure>
);

// ── One person, three duties ────────────────────────────────────────────────
// FIRST FIGURE RESCALED TO 1:1 (342 = the card's padded drawable width), because
// concept:dharma's `dharma-personal` card reuses it — a recall figure is only
// free if the thing being recalled is already at 1:1. The labels that used to
// render at 6.5px now render at 12. Body exported bare so a second card can wrap
// it with its own caption.
export const DharmaRolesSvg = () => (
  <Svg width="100%" height={196} viewBox="0 0 342 196">
    {/* the person */}
    <SvgText x={171} y={18} textAnchor="middle" fontSize={10} fill={SOFT}>the same you</SvgText>
    <Circle cx={171} cy={44} r={16} fill="none" stroke={INK} strokeWidth={2.5} />
    <Path d="M171 60 L171 100" stroke={INK} strokeWidth={2.5} />
    {/* three branches */}
    <Path d="M171 100 L62 132" stroke={TEAL} strokeWidth={2} />
    <Path d="M171 100 L171 132" stroke={SAFFRON} strokeWidth={2} />
    <Path d="M171 100 L280 132" stroke={INDIGO} strokeWidth={2} />
    <Rect x={10} y={134} width={104} height={44} rx={5} fill={TEAL} opacity={0.13} />
    <SvgText x={62} y={155} textAnchor="middle" fontSize={12} fontWeight="700" fill={INK}>3 pm · parent</SvgText>
    <SvgText x={62} y={170} textAnchor="middle" fontSize={9.5} fill={SOFT}>patience</SvgText>
    <Rect x={119} y={134} width={104} height={44} rx={5} fill={SAFFRON} opacity={0.13} />
    <SvgText x={171} y={155} textAnchor="middle" fontSize={12} fontWeight="700" fill={INK}>4 pm · at work</SvgText>
    <SvgText x={171} y={170} textAnchor="middle" fontSize={9.5} fill={SOFT}>honest work</SvgText>
    <Rect x={228} y={134} width={104} height={44} rx={5} fill={INDIGO} opacity={0.13} />
    <SvgText x={280} y={155} textAnchor="middle" fontSize={12} fontWeight="700" fill={INK}>6 pm · driving</SvgText>
    <SvgText x={280} y={170} textAnchor="middle" fontSize={9.5} fill={SOFT}>make way</SvgText>
  </Svg>
);

const DharmaRoles: React.FC<{ active?: boolean }> = ({ active }) => (
  <InsetFigure caption="Three roles in one afternoon — three different right things." active={active}>
    <DharmaRolesSvg />
  </InsetFigure>
);

// ── The surgeon's knife (Wave 0: full-bleed, one wound read two ways) ────────
// The card's own words: a surgeon's and an attacker's knife can leave the SAME
// wound — separated by intention and by necessity. So: one identical central
// wound made by two IDENTICAL knives (same blade, same handle), read two ways.
const KnifeIcon: React.FC<{ x: number; deg: number }> = ({ x, deg }) => (
  <G rotation={deg} originX={x} originY={66}>
    <Rect x={x - 5} y={40} width={10} height={24} rx={3} fill="#6B5A38" />
    <Path d={`M${x - 6} 64 L${x + 6} 64 L${x} 94 Z`} fill="url(#kn-steel)" stroke="#9AA6AE" strokeWidth={0.7} />
  </G>
);
const TwoKnives: React.FC<{ active?: boolean }> = ({ active }) => (
  <SceneFigure
    caption="Same blade, same wound — split by intention and by whether it had to happen."
    active={active}
  >
    <Svg width="100%" height={250} viewBox="0 0 390 250">
      <Defs>
        <LinearGradient id="kn-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FCF7E8" />
          <Stop offset="1" stopColor="#F1E7CE" />
        </LinearGradient>
        <LinearGradient id="kn-steel" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#AEB8C0" />
          <Stop offset="0.5" stopColor="#EEF2F5" />
          <Stop offset="1" stopColor="#AEB8C0" />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={390} height={250} fill="url(#kn-bg)" />
      <SvgText x={195} y={22} textAnchor="middle" fontSize={10} fontWeight="700" letterSpacing={1.1} fill="#8A6A1E">
        TWO KNIVES · ONE WOUND
      </SvgText>

      {/* two IDENTICAL knives angled into the same wound */}
      <KnifeIcon x={150} deg={34} />
      <KnifeIcon x={240} deg={-34} />

      {/* the one same wound */}
      <Ellipse cx={195} cy={120} rx={46} ry={15} fill="#E7C9A6" opacity={0.6} />
      <Path d="M176 120 Q195 114 214 119" fill="none" stroke="#B4285A" strokeWidth={3} strokeLinecap="round" />
      <Path d="M182 116 l2 8 M195 114 l0 9 M208 116 l-2 8" stroke="#B4285A" strokeWidth={1.4} opacity={0.7} />
      <SvgText x={195} y={150} textAnchor="middle" fontSize={10} fontStyle="italic" fill="#8A6A1E">the same wound</SvgText>

      {/* LEFT reading: the surgeon */}
      <SvgText x={96} y={180} textAnchor="middle" fontSize={12.5} fontWeight="700" fill="#1F5E55">the surgeon</SvgText>
      <SvgText x={96} y={197} textAnchor="middle" fontSize={10} fill="#5A5A4A">to heal · had to cut</SvgText>
      <Rect x={22} y={208} width={148} height={26} rx={13} fill={TEAL} opacity={0.15} />
      <Path d="M46 221 l5 5 l11 -13" fill="none" stroke="#1F5E55" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      <SvgText x={70} y={225} fontSize={11.5} fontWeight="700" fill="#1F5E55">ahimsa kept</SvgText>

      {/* RIGHT reading: the attacker */}
      <SvgText x={294} y={180} textAnchor="middle" fontSize={12.5} fontWeight="700" fill="#B4285A">the attacker</SvgText>
      <SvgText x={294} y={197} textAnchor="middle" fontSize={10} fill="#5A5A4A">to harm · chose to cut</SvgText>
      <Rect x={220} y={208} width={148} height={26} rx={13} fill={PINK} opacity={0.13} />
      <Path d="M244 216 l13 12 M257 216 l-13 12" stroke="#B4285A" strokeWidth={2} strokeLinecap="round" />
      <SvgText x={278} y={225} fontSize={11.5} fontWeight="700" fill="#B4285A">himsa</SvgText>
    </Svg>
  </SceneFigure>
);

// ── Rivers into the sea (Wave 0: full-bleed 1:1, one-shot flow-in) ───────────
// Two blue rivers, not green land. On arrival they flow DOWN and merge into the
// SAME sea as brahman/atman (product-spec cross-act callback, Mundaka 3.2.8): the
// rivers reveal top→bottom via an animated clip, then rest. One-shot only — a
// perpetual flow would be a second ambient loop, which the motion rule bans.
const OCEAN_SURFACE_FILL = `${OCEAN_SURFACE} L390 250 L0 250 Z`;
const RiverToSea: React.FC<{ active?: boolean }> = ({ active }) => {
  const p = useOneShot(active, 1400);
  const revealH = p.interpolate({ inputRange: [0, 1], outputRange: [0, 172] });
  return (
    <SceneFigure caption="The banks fall away; the water does not die. The drop comes home." active={active} animate={false}>
      <Svg width="100%" height={250} viewBox="0 0 390 250">
        <Defs>
          <LinearGradient id="r-land" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#EFE4C4" />
            <Stop offset="1" stopColor="#E3D3A6" />
          </LinearGradient>
          <LinearGradient id="r-sea" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={OCEAN_TOP} />
            <Stop offset="1" stopColor={OCEAN_DEEP} />
          </LinearGradient>
          <LinearGradient id="r-water" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#6E86D8" />
            <Stop offset="1" stopColor={OCEAN_TOP} />
          </LinearGradient>
          <ClipPath id="r-reveal">
            <AnimatedRect x={0} y={-4} width={390} height={revealH} />
          </ClipPath>
        </Defs>
        <Rect x={0} y={0} width={390} height={250} fill="url(#r-land)" />

        {/* the rivers flow down under the animated reveal */}
        <G clipPath="url(#r-reveal)">
          <Path d="M96 -4 C82 40 122 70 96 112 C84 132 92 142 104 150 L150 150 C150 140 138 128 140 108 C144 66 118 34 132 -4 Z" fill="url(#r-water)" />
          <Path d="M114 0 C104 44 132 74 118 118" fill="none" stroke="#AEBEEC" strokeWidth={2} opacity={0.6} />
          <Path d="M300 -4 C314 40 274 72 300 114 C312 132 302 142 288 150 L242 150 C244 138 256 126 254 106 C250 64 278 34 264 -4 Z" fill="url(#r-water)" />
          <Path d="M282 0 C292 46 264 76 278 120" fill="none" stroke="#AEBEEC" strokeWidth={2} opacity={0.6} />
        </G>

        {/* the one sea — the SAME filled-wave surface as brahman/atman, over the river mouths */}
        <Path d={OCEAN_SURFACE_FILL} fill="url(#r-sea)" />
        <Path d={OCEAN_SURFACE} fill="none" stroke={FOAM} strokeWidth={2} opacity={0.55} />
        <Path d="M0 186 C48 174 92 200 140 186 C188 172 232 202 280 186 C328 174 362 196 390 184" fill="none" stroke={SWELL} strokeWidth={1.6} opacity={0.3} />
        <Path d="M0 216 C48 206 92 228 140 216 C188 206 232 228 280 216 C328 206 362 224 390 214" fill="none" stroke={FOAM} strokeWidth={1.4} opacity={0.22} />

        <SvgText x={150} y={60} fontSize={11} fontWeight="600" fill="#3A4680" transform="rotate(-20 150 60)">Ganga</SvgText>
        <SvgText x={240} y={60} fontSize={11} fontWeight="600" fill="#3A4680" transform="rotate(20 240 60)">Yamuna</SvgText>
        <SvgText x={30} y={112} fontSize={9.5} fill="#8A7A55">a name,</SvgText>
        <SvgText x={30} y={125} fontSize={9.5} fill="#8A7A55">two banks</SvgText>

        <SvgText x={195} y={196} textAnchor="middle" fontSize={14} fontWeight="700" fontStyle="italic" fill={SKY_TOP}>the sea</SvgText>
        <SvgText x={195} y={213} textAnchor="middle" fontSize={9.5} fill="#C7D0EC">no name, no banks</SvgText>
        <SvgText x={195} y={236} textAnchor="middle" fontSize={9} fill={SWELL}>MUNDAKA UPANISHAD 3.2.8</SvgText>
      </Svg>
    </SceneFigure>
  );
};

// ── The four aims (Wave 0: full-bleed, three rooms + a door) ─────────────────
const AIM_ROOMS: [number, string, string, string, number][] = [
  [24, 'dharma', 'live rightly', TEAL, 0.13],
  [118, 'artha', 'prosper', '#C9A233', 0.16],
  [212, 'kama', 'enjoy', PINK, 0.12],
];
const FourAims: React.FC<{ active?: boolean }> = ({ active }) => (
  <SceneFigure caption="Three aims for the world, and a door at the back." active={active}>
    <Svg width="100%" height={230} viewBox="0 0 390 230">
      <Defs>
        <LinearGradient id="fa-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FCF7E8" />
          <Stop offset="1" stopColor="#F1E7CE" />
        </LinearGradient>
        <RadialGradient id="fa-door" cx="0.5" cy="0.4" r="0.7">
          <Stop offset="0" stopColor="#FFE7A8" />
          <Stop offset="1" stopColor="#F0C766" />
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width={390} height={230} fill="url(#fa-bg)" />
      <SvgText x={150} y={30} textAnchor="middle" fontSize={10} fontWeight="700" letterSpacing={1.2} fill="#8A6A1E">
        THREE ROOMS TO LIVE IN
      </SvgText>
      {AIM_ROOMS.map(([x, name, sub, c, op]) => (
        <G key={name}>
          <Rect x={x} y={52} width={86} height={104} rx={6} fill={c} opacity={op} />
          <Rect x={x} y={52} width={86} height={104} rx={6} fill="none" stroke={c} strokeWidth={1.6} />
          <SvgText x={x + 43} y={98} textAnchor="middle" fontSize={14} fontWeight="700" fontStyle="italic" fill={INK}>{name}</SvgText>
          <SvgText x={x + 43} y={116} textAnchor="middle" fontSize={10} fill={SOFT}>{sub}</SvgText>
        </G>
      ))}
      {/* the open door at the back */}
      <Rect x={322} y={40} width={52} height={128} rx={3} fill="#6B5A38" />
      <Path d="M322 40 L374 40 L366 52 L330 52 Z" fill="#57492C" />
      <Rect x={330} y={52} width={36} height={116} fill="url(#fa-door)" />
      <Circle cx={360} cy={112} r={2.5} fill="#8A6A1E" />
      <SvgText x={348} y={188} textAnchor="middle" fontSize={13} fontWeight="700" fontStyle="italic" fill={INK}>moksha</SvgText>
      <SvgText x={348} y={202} textAnchor="middle" fontSize={9.5} fill={SOFT}>the open door</SvgText>
      <SvgText x={195} y={220} textAnchor="middle" fontSize={10.5} fontStyle="italic" fill="#8A6A1E">
        Live in the three — with the fourth kept open.
      </SvgText>
    </Svg>
  </SceneFigure>
);

// ── Four paths, one summit (Wave 0: full-bleed mountain) ────────────────────
const PATH_TRAILS: [string, string, string, string, string][] = [
  ['M70 208 C120 176 150 110 190 52', 'bhakti', 'love', PINK, '#B4285A'],
  ['M150 208 C168 160 180 108 192 52', 'karma', 'action', TEAL, '#1F5E55'],
  ['M240 208 C222 160 210 108 198 52', 'jnana', 'knowledge', INDIGO, '#303F9F'],
  ['M320 208 C270 176 240 110 200 52', 'raja', 'stillness', GREEN, '#2E6B34'],
];
const PATH_LABEL_X = [66, 150, 240, 322];
const FourPaths: React.FC<{ active?: boolean }> = ({ active }) => (
  <SceneFigure caption="Four trails. One summit. The hikers meet at the top." active={active}>
    <Svg width="100%" height={250} viewBox="0 0 390 250">
      <Defs>
        <LinearGradient id="fp-sky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FBEBC4" />
          <Stop offset="1" stopColor="#F6EFDD" />
        </LinearGradient>
        <LinearGradient id="fp-mtn" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#B7A272" />
          <Stop offset="1" stopColor="#8F7A4E" />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={390} height={250} fill="url(#fp-sky)" />
      <Circle cx={330} cy={52} r={26} fill="#FFCF5A" opacity={0.4} />
      {/* the mountain */}
      <Path d="M40 210 L195 40 L350 210 Z" fill="url(#fp-mtn)" />
      <Path d="M195 40 L140 210 L250 210 Z" fill="#000000" opacity={0.06} />
      <Path d="M195 40 L168 70 C182 78 208 78 222 70 Z" fill="#F6EFDD" opacity={0.85} />
      {/* the summit shrine */}
      <Path d="M188 44 L195 30 L202 44 Z" fill={SAFFRON} />
      <Circle cx={195} cy={27} r={3.5} fill={SAFFRON} />
      <SvgText x={195} y={18} textAnchor="middle" fontSize={9} fontWeight="700" fill="#8A6A1E">the same summit</SvgText>
      {/* four trails + labels */}
      {PATH_TRAILS.map(([d, , , c]) => (
        <Path key={d} d={d} fill="none" stroke={c} strokeWidth={2.6} strokeDasharray="7 4" />
      ))}
      {PATH_TRAILS.map(([, name, sub, , ink], i) => (
        <G key={name}>
          <SvgText x={PATH_LABEL_X[i]} y={230} textAnchor="middle" fontSize={11.5} fontWeight="700" fontStyle="italic" fill={ink}>{name}</SvgText>
          <SvgText x={PATH_LABEL_X[i]} y={243} textAnchor="middle" fontSize={8.5} fill={SOFT}>{sub}</SvgText>
        </G>
      ))}
    </Svg>
  </SceneFigure>
);

// ── The lifeguard dives ─────────────────────────────────────────────────────
const AvatarDescent = () => (
  <Figure caption="Not instructions from the chair — a dive into the same water.">
    <Svg width="100%" height={160} viewBox="0 0 640 200">
      {/* the chair */}
      <Line x1={120} y1={166} x2={120} y2={56} stroke={GOLD} strokeWidth={4} />
      <Line x1={96} y1={166} x2={144} y2={166} stroke={GOLD} strokeWidth={4} />
      <Rect x={96} y={40} width={48} height={18} rx={3} fill={GOLD} opacity={0.6} />
      <SvgText x={120} y={26} textAnchor="middle" fontSize={10} fill={SOFT}>present, but apart</SvgText>
      {/* the dive arc */}
      <Path d="M150 52 C260 20, 380 48, 452 108" stroke={SAFFRON} strokeWidth={3} strokeDasharray="7 5" fill="none" />
      <Path d="M456,113 L446,104 L443,115 Z" fill={SAFFRON} />
      <SvgText x={306} y={20} textAnchor="middle" fontSize={11} fontWeight="700" fontStyle="italic" fill={INK}>avatāra — the crossing-down</SvgText>
      {/* the water */}
      <Path d="M180 150 C240 128, 300 168, 360 150 C420 132, 480 168, 540 148 C580 136, 610 148, 622 144" stroke={INDIGO} strokeWidth={4} strokeLinecap="round" fill="none" opacity={0.75} />
      <Path d="M200 176 C260 158, 320 190, 380 174 C440 158, 500 188, 560 172" stroke={INDIGO} strokeWidth={3} strokeLinecap="round" fill="none" opacity={0.4} />
      <Circle cx={470} cy={130} r={7} fill="none" stroke={INK} strokeWidth={2} />
      <SvgText x={470} y={196} textAnchor="middle" fontSize={10} fill={SOFT}>into the same waves</SvgText>
    </Svg>
  </Figure>
);

// ── Fire and its heat ───────────────────────────────────────────────────────
const FlameAndHeat = () => (
  <Figure caption="The god is the flame's shape. Shakti is what makes it burn.">
    <Svg width="100%" height={160} viewBox="0 0 640 200">
      {/* the flame */}
      <Path d="M320 36 q-34 44 -34 78 a34 34 0 0 0 68 0 q0 -34 -34 -78" fill={SAFFRON} opacity={0.8} />
      <Path d="M320 74 q-16 24 -16 40 a16 16 0 0 0 32 0 q0 -16 -16 -40" fill={TURMERIC} opacity={0.95} />
      {/* the heat */}
      {[52, 76, 100].map(r => (
        <Circle key={r} cx={320} cy={116} r={r + 18} fill="none" stroke={PINK} strokeWidth={1.8} opacity={0.5 - (r - 52) / 160} strokeDasharray="2 7" />
      ))}
      <SvgText x={140} y={110} textAnchor="middle" fontSize={12} fontWeight="700" fill={INK}>the flame</SvgText>
      <SvgText x={140} y={127} textAnchor="middle" fontSize={10} fill={SOFT}>the god’s shape</SvgText>
      <SvgText x={504} y={110} textAnchor="middle" fontSize={12} fontWeight="700" fontStyle="italic" fill={INK}>śakti — the heat</SvgText>
      <SvgText x={504} y={127} textAnchor="middle" fontSize={10} fill={SOFT}>what makes it fire at all</SvgText>
    </Svg>
  </Figure>
);

// ── The two epics ───────────────────────────────────────────────────────────
const TwoEpics = () => (
  <Figure caption="One epic is the ideal. The other is the mirror.">
    <Svg width="100%" height={165} viewBox="0 0 640 206">
      {/* Ramayana: a straight road into the forest */}
      <Path d="M60 170 L60 60" stroke={TEAL} strokeWidth={3.5} strokeLinecap="round" />
      <Path d="M60 60 L54 74 M60 60 L66 74" stroke={TEAL} strokeWidth={2.5} strokeLinecap="round" />
      <SvgText x={160} y={40} textAnchor="middle" fontSize={13} fontWeight="700" fill={INK}>Ramayana</SvgText>
      <SvgText x={160} y={58} textAnchor="middle" fontSize={10} fill={SOFT}>the tidy one</SvgText>
      <SvgText x={160} y={110} textAnchor="middle" fontSize={10} fill={SOFT}>exile accepted the same hour —</SvgText>
      <SvgText x={160} y={125} textAnchor="middle" fontSize={10} fill={SOFT}>duty held, whatever it costs</SvgText>
      <SvgText x={160} y={160} textAnchor="middle" fontSize={11} fontStyle="italic" fill={INK}>the ideal</SvgText>
      <Line x1={320} y1={30} x2={320} y2={180} stroke={RULE} strokeWidth={1.5} />
      {/* Mahabharata: dice */}
      <Rect x={430} y={64} width={34} height={34} rx={6} fill="none" stroke={PINK} strokeWidth={2.2} transform="rotate(12 447 81)" />
      <Circle cx={441} cy={76} r={2.4} fill={PINK} /><Circle cx={455} cy={90} r={2.4} fill={PINK} />
      <Rect x={476} y={70} width={34} height={34} rx={6} fill="none" stroke={PINK} strokeWidth={2.2} transform="rotate(-9 493 87)" />
      <Circle cx={493} cy={87} r={2.4} fill={PINK} />
      <SvgText x={480} y={40} textAnchor="middle" fontSize={13} fontWeight="700" fill={INK}>Mahabharata</SvgText>
      <SvgText x={480} y={58} textAnchor="middle" fontSize={10} fill={SOFT}>the messy one</SvgText>
      <SvgText x={480} y={128} textAnchor="middle" fontSize={10} fill={SOFT}>a kingdom lost, one throw at a time</SvgText>
      <SvgText x={480} y={160} textAnchor="middle" fontSize={11} fontStyle="italic" fill={INK}>the mirror</SvgText>
    </Svg>
  </Figure>
);

// ── The bow slips ───────────────────────────────────────────────────────────
const BowDown = () => (
  <Figure caption="Between two armies — and between two duties.">
    <Svg width="100%" height={160} viewBox="0 0 640 200">
      {/* two armies */}
      {[70, 100, 130].map(y => (
        <G key={`l${y}`}>
          <Line x1={40} y1={y} x2={150} y2={y} stroke={TEAL} strokeWidth={3} strokeLinecap="round" opacity={0.6} />
          <Line x1={490} y1={y} x2={600} y2={y} stroke={PINK} strokeWidth={3} strokeLinecap="round" opacity={0.6} />
        </G>
      ))}
      <SvgText x={95} y={54} textAnchor="middle" fontSize={10} fill={SOFT}>his brothers’ army</SvgText>
      <SvgText x={545} y={54} textAnchor="middle" fontSize={10} fill={SOFT}>teachers · cousins · kin</SvgText>
      {/* the chariot pole + the fallen bow */}
      <Line x1={320} y1={64} x2={320} y2={128} stroke={INK} strokeWidth={2.5} />
      <Circle cx={320} cy={56} r={8} fill="none" stroke={INK} strokeWidth={2.5} />
      <Path d="M290 156 Q320 178 350 156" fill="none" stroke={GOLD} strokeWidth={3.5} strokeLinecap="round" />
      <Line x1={292} y1={158} x2={348} y2={158} stroke={GOLD} strokeWidth={1.4} opacity={0.7} />
      <SvgText x={320} y={192} textAnchor="middle" fontSize={10} fill={SOFT}>the bow, laid down — Gita 1.47</SvgText>
    </Svg>
  </Figure>
);

// ── The guest is welcomed ───────────────────────────────────────────────────
const GuestLamp = () => (
  <Figure caption="Sixteen services — and every one is manners, not magic.">
    <Svg width="100%" height={150} viewBox="0 0 640 188">
      {[
        { x: 100, label: 'a seat', d: 'M-16 12 L-16 -8 L16 -8 L16 12 M-16 -8 L-16 -22 M16 -8 L16 -22' },
        { x: 250, label: 'water', d: 'M0 -20 q-11 16 -11 24 a11 11 0 0 0 22 0 q0 -8 -11 -24' },
        { x: 400, label: 'food', d: 'M-18 6 A18 10 0 0 0 18 6 M-22 6 L22 6' },
      ].map(s => (
        <G key={s.x}>
          <Circle cx={s.x} cy={70} r={34} fill={TEAL} opacity={0.1} />
          <G transform={`translate(${s.x}, 70)`}>
            <Path d={s.d} fill="none" stroke={TEAL} strokeWidth={2.5} strokeLinecap="round" />
          </G>
          <SvgText x={s.x} y={130} textAnchor="middle" fontSize={11} fill={SOFT}>{s.label}</SvgText>
        </G>
      ))}
      {/* the lamp */}
      <Circle cx={545} cy={70} r={34} fill={SAFFRON} opacity={0.12} />
      <Path d="M527 82 A18 9 0 0 0 563 82 M523 82 L567 82" fill="none" stroke={SAFFRON} strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M545 74 q-7 -12 0 -22 q7 10 0 22" fill={TURMERIC} />
      <SvgText x={545} y={130} textAnchor="middle" fontSize={11} fill={SOFT}>a lamp</SvgText>
      <SvgText x={320} y={168} textAnchor="middle" fontSize={10} fill={SOFT}>ṣoḍaśa upacāra — the sixteen services of puja</SvgText>
    </Svg>
  </Figure>
);

// ── The darshan loop ────────────────────────────────────────────────────────
const DarshanLoop = () => (
  <Figure caption="Give, see, be seen, receive, carry home. A loop — not a letter of requests.">
    <Svg width="100%" height={165} viewBox="0 0 640 206">
      {/* the loop */}
      <Circle cx={320} cy={100} r={62} fill="none" stroke={GOLD} strokeWidth={2} strokeDasharray="6 5" />
      <Path d="M320,32 L310,42 L322,44 Z" fill={GOLD} />
      {/* you and the murti */}
      <Circle cx={180} cy={100} r={16} fill="none" stroke={INK} strokeWidth={2.5} />
      <SvgText x={180} y={146} textAnchor="middle" fontSize={11} fontWeight="700" fill={INK}>you</SvgText>
      <Rect x={438} y={72} width={56} height={62} rx={5} fill={SAFFRON} opacity={0.16} />
      <Circle cx={466} cy={94} r={11} fill="none" stroke={SAFFRON} strokeWidth={2.5} />
      <SvgText x={466} y={152} textAnchor="middle" fontSize={11} fontWeight="700" fill={INK}>the murti</SvgText>
      {/* the two gazes */}
      <Line x1={202} y1={94} x2={430} y2={90} stroke={TEAL} strokeWidth={1.8} />
      <Path d="M436,90 L425,85 L426,95 Z" fill={TEAL} />
      <SvgText x={318} y={80} textAnchor="middle" fontSize={9.5} fill={TEAL}>you see — darśana</SvgText>
      <Line x1={430} y1={110} x2={202} y2={112} stroke={INDIGO} strokeWidth={1.8} />
      <Path d="M196,112 L207,107 L206,117 Z" fill={INDIGO} />
      <SvgText x={318} y={130} textAnchor="middle" fontSize={9.5} fill={INDIGO}>and are seen</SvgText>
      <SvgText x={320} y={196} textAnchor="middle" fontSize={10} fill={SOFT}>in: fruit, flowers · out: prasād, carried home</SvgText>
    </Svg>
  </Figure>
);

// ── The festival year ───────────────────────────────────────────────────────
const YearWheel = () => (
  <Figure caption="The year, read as a story — one festival per season.">
    <Svg width="100%" height={185} viewBox="0 0 640 232">
      <Circle cx={320} cy={116} r={74} fill="none" stroke={GOLD} strokeWidth={2.5} />
      {[
        { a: -90, name: 'Diwali', sub: 'Rama comes home', c: SAFFRON },
        { a: 0, name: 'Holi', sub: 'spring, forgiven', c: PINK },
        { a: 90, name: 'Janmashtami', sub: 'Krishna at midnight', c: INDIGO },
        { a: 180, name: 'Navaratri', sub: 'nine nights for Her', c: TEAL },
      ].map(f => {
        const rad = (f.a * Math.PI) / 180;
        const cx = 320 + Math.cos(rad) * 74;
        const cy = 116 + Math.sin(rad) * 74;
        const tx = 320 + Math.cos(rad) * 118;
        const ty = 116 + Math.sin(rad) * 108;
        return (
          <G key={f.name}>
            <Circle cx={cx} cy={cy} r={7} fill={f.c} />
            <SvgText x={tx} y={ty} textAnchor="middle" fontSize={12} fontWeight="700" fill={INK}>{f.name}</SvgText>
            <SvgText x={tx} y={ty + 15} textAnchor="middle" fontSize={9} fill={SOFT}>{f.sub}</SvgText>
          </G>
        );
      })}
      <SvgText x={320} y={112} textAnchor="middle" fontSize={10} fill={SOFT}>the whole cast,</SvgText>
      <SvgText x={320} y={127} textAnchor="middle" fontSize={10} fill={SOFT}>once a year, with food</SvgText>
    </Svg>
  </Figure>
);

// ── The wheel (Wave 0: full-bleed, rotating) ────────────────────────────────
// Just samsara: a spoked wheel turning endlessly through fixed birth (top) and
// death (bottom). Three stacked layers so the labels stay upright while the wheel
// spins — a static background, the rotating wheel (native-driver transform via
// useSpin — the app's SECOND sanctioned ambient loop, because endless turning IS
// the concept), then the static labels on top. The View's centre (195,140) is the
// hub, so the rotation pivots about the hub.
const SAMSARA_SPOKES: [number, number, number, number][] = [
  [195, 52, 195, 228],
  [107, 140, 283, 140],
  [133, 78, 257, 202],
  [257, 78, 133, 202],
  [119, 106, 271, 174],
  [271, 106, 119, 174],
];
const Samsara: React.FC<{ active?: boolean }> = ({ active }) => {
  const rotate = useSpin(active);
  return (
    <SceneFigure
      caption="The wheel turns, birth to death to birth. Samsara is the turning itself."
      active={active}
      animate={false}
    >
      <View style={{ width: '100%', aspectRatio: 390 / 280 }}>
        <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" viewBox="0 0 390 280">
          <Defs>
            <LinearGradient id="sam-bg" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#F7F1E6" />
              <Stop offset="1" stopColor="#EFE7D3" />
            </LinearGradient>
          </Defs>
          <Rect x={0} y={0} width={390} height={280} fill="url(#sam-bg)" />
        </Svg>
        <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ rotate }] }]}>
          <Svg width="100%" height="100%" viewBox="0 0 390 280">
            <Circle cx={195} cy={140} r={104} fill="none" stroke="#D8CBAE" strokeWidth={20} />
            <Circle cx={195} cy={140} r={104} fill="none" stroke={TEAL} strokeWidth={20} opacity={0.4} />
            {SAMSARA_SPOKES.map(([x1, y1, x2, y2]) => (
              <Line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#B7A377" strokeWidth={3} strokeLinecap="round" />
            ))}
            <Circle cx={195} cy={140} r={16} fill="#EFE7D3" stroke="#B7A377" strokeWidth={3} />
            <Circle cx={195} cy={36} r={8} fill={SAFFRON} />
          </Svg>
        </Animated.View>
        <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" viewBox="0 0 390 280" pointerEvents="none">
          <SvgText x={195} y={12} textAnchor="middle" fontSize={12} fontWeight="700" fill={INK}>birth</SvgText>
          <SvgText x={195} y={268} textAnchor="middle" fontSize={12} fontWeight="700" fill={INK}>death</SvgText>
        </Svg>
      </View>
    </SceneFigure>
  );
};

// ── Three jobs, not three ranks ─────────────────────────────────────────────
const Trimurti = () => (
  <Figure caption="Three jobs, not three ranks.">
    <Svg width="100%" height={180} viewBox="0 0 640 228">
      {[
        { d: 'M196 82 C260 42, 380 42, 444 82', tip: 'M450,84 L440,77 L444,88 Z' },
        { d: 'M452 114 C440 156, 392 184, 344 188', tip: 'M338,189 L349,183 L346,194 Z' },
        { d: 'M296 188 C248 184, 200 156, 188 114', tip: 'M186,108 L193,118 L182,117 Z' },
      ].map(a => (
        <G key={a.d}>
          <Path d={a.d} stroke={GOLD} strokeWidth={1.6} fill="none" opacity={0.7} />
          <Path d={a.tip} fill={GOLD} opacity={0.7} />
        </G>
      ))}
      <Circle cx={160} cy={98} r={42} fill={GREEN} opacity={0.13} />
      <SvgText x={160} y={94} textAnchor="middle" fontSize={13} fontWeight="700" fill={INK}>Brahma</SvgText>
      <SvgText x={160} y={112} textAnchor="middle" fontSize={10} fill={SOFT}>creates</SvgText>
      <SvgText x={160} y={158} textAnchor="middle" fontSize={9} fill={SOFT}>barely worshiped</SvgText>
      <Circle cx={480} cy={98} r={42} fill={TEAL} opacity={0.13} />
      <SvgText x={480} y={94} textAnchor="middle" fontSize={13} fontWeight="700" fill={INK}>Vishnu</SvgText>
      <SvgText x={480} y={112} textAnchor="middle" fontSize={10} fill={SOFT}>preserves</SvgText>
      <SvgText x={480} y={158} textAnchor="middle" fontSize={9} fill={SOFT}>comes down as Rama, Krishna</SvgText>
      <Circle cx={320} cy={194} r={42} fill={INDIGO} opacity={0.13} />
      <SvgText x={320} y={190} textAnchor="middle" fontSize={13} fontWeight="700" fill={INK}>Shiva</SvgText>
      <SvgText x={320} y={208} textAnchor="middle" fontSize={10} fill={SOFT}>dissolves</SvgText>
      <SvgText x={320} y={26} textAnchor="middle" fontSize={11} fontStyle="italic" fill={SOFT}>
        the universe breathes in, and out, and in
      </SvgText>
      <SvgText x={320} y={122} textAnchor="middle" fontSize={10} fill={SOFT}>destruction is not evil —</SvgText>
      <SvgText x={320} y={137} textAnchor="middle" fontSize={10} fill={SOFT}>it is what makes room</SvgText>
    </Svg>
  </Figure>
);

// ── Who's who, and how they're related ──────────────────────────────────────
const FamilyMap = () => (
  <Figure caption="Six names, and almost any Hindu story becomes readable.">
    <Svg width="100%" height={250} viewBox="0 0 640 318">
      <SvgText x={320} y={14} textAnchor="middle" fontSize={9} fontWeight="700" fill={SOFT}>
        EVERY GOD HAS A GODDESS — SHE IS THE POWER HE ACTS BY
      </SvgText>
      {[
        { x: 24, god: 'Brahma', role: 'creator', gc: GREEN, dev: 'Saraswati', drole: 'knowledge' },
        { x: 164, god: 'Vishnu', role: 'preserver', gc: TEAL, dev: 'Lakshmi', drole: 'abundance' },
        { x: 380, god: 'Shiva', role: 'destroyer', gc: INDIGO, dev: 'Parvati', drole: 'the Goddess' },
      ].map(p => (
        <G key={p.x}>
          <Rect x={p.x} y={38} width={104} height={42} rx={3} fill={p.gc} opacity={0.14} />
          <SvgText x={p.x + 52} y={56} textAnchor="middle" fontSize={12} fontWeight="700" fill={INK}>{p.god}</SvgText>
          <SvgText x={p.x + 52} y={72} textAnchor="middle" fontSize={9} fill={SOFT}>{p.role}</SvgText>
          <Line x1={p.x + 52} y1={84} x2={p.x + 52} y2={102} stroke={PINK} strokeWidth={1.6} />
          <Rect x={p.x} y={104} width={104} height={42} rx={3} fill="none" stroke={PINK} strokeWidth={1.4} />
          <SvgText x={p.x + 52} y={122} textAnchor="middle" fontSize={12} fontWeight="700" fill={INK}>{p.dev}</SvgText>
          <SvgText x={p.x + 52} y={138} textAnchor="middle" fontSize={9} fill={SOFT}>{p.drole}</SvgText>
        </G>
      ))}
      <Line x1={484} y1={125} x2={514} y2={125} stroke={PINK} strokeWidth={1.2} strokeDasharray="3 3" />
      <Rect x={516} y={104} width={100} height={42} rx={3} fill={PINK} opacity={0.1} />
      <SvgText x={566} y={121} textAnchor="middle" fontSize={11} fontWeight="700" fill={INK}>Durga · Kali</SvgText>
      <SvgText x={566} y={137} textAnchor="middle" fontSize={9} fill={SOFT}>same one, unleashed</SvgText>

      <Path d="M268 59 C300 59, 300 198, 268 198" stroke={TEAL} strokeWidth={1.6} fill="none" strokeDasharray="4 3" />
      <SvgText x={312} y={178} textAnchor="middle" fontSize={9.5} fontWeight="700" fill={TEAL}>comes down as</SvgText>
      <Rect x={120} y={194} width={98} height={40} rx={3} fill="none" stroke={TEAL} strokeWidth={1.4} />
      <SvgText x={169} y={211} textAnchor="middle" fontSize={12} fontWeight="700" fill={INK}>Rama</SvgText>
      <SvgText x={169} y={226} textAnchor="middle" fontSize={9} fill={SOFT}>the Ramayana</SvgText>
      <Rect x={228} y={194} width={98} height={40} rx={3} fill="none" stroke={TEAL} strokeWidth={1.4} />
      <SvgText x={277} y={211} textAnchor="middle" fontSize={12} fontWeight="700" fill={INK}>Krishna</SvgText>
      <SvgText x={277} y={226} textAnchor="middle" fontSize={9} fill={SOFT}>the Gita</SvgText>

      <Path d="M432 148 L432 170 L378 170 L378 192" stroke={INDIGO} strokeWidth={1.4} fill="none" />
      <Path d="M432 148 L432 170 L490 170 L490 192" stroke={INDIGO} strokeWidth={1.4} fill="none" />
      <Rect x={330} y={194} width={98} height={40} rx={3} fill="none" stroke={INDIGO} strokeWidth={1.4} />
      <SvgText x={379} y={211} textAnchor="middle" fontSize={12} fontWeight="700" fill={INK}>Ganesha</SvgText>
      <SvgText x={379} y={226} textAnchor="middle" fontSize={9} fill={SOFT}>greeted first</SvgText>
      <Rect x={442} y={194} width={98} height={40} rx={3} fill="none" stroke={INDIGO} strokeWidth={1.4} opacity={0.55} />
      <SvgText x={491} y={211} textAnchor="middle" fontSize={12} fontWeight="700" fill={SOFT}>Kartikeya</SvgText>
      <SvgText x={491} y={226} textAnchor="middle" fontSize={9} fill={SOFT}>his brother</SvgText>

      <Path d="M169 238 L169 266 L262 266" stroke={SAFFRON} strokeWidth={1.4} fill="none" />
      <Rect x={266} y={248} width={112} height={40} rx={3} fill={SAFFRON} opacity={0.1} />
      <SvgText x={322} y={265} textAnchor="middle" fontSize={12} fontWeight="700" fill={INK}>Hanuman</SvgText>
      <SvgText x={322} y={280} textAnchor="middle" fontSize={9} fill={SOFT}>serves Rama, wants nothing</SvgText>
    </Svg>
  </Figure>
);

// ── Two shelves ─────────────────────────────────────────────────────────────
const Shelves = () => (
  <Figure caption="Two shelves. Most Hindus live on the second one.">
    <Svg width="100%" height={185} viewBox="0 0 640 240">
      <SvgText x={150} y={20} textAnchor="middle" fontSize={13} fontWeight="700" fontStyle="italic" fill={INK}>śruti</SvgText>
      <SvgText x={150} y={37} textAnchor="middle" fontSize={10} fill={SOFT}>“heard” — received</SvgText>
      <SvgText x={490} y={20} textAnchor="middle" fontSize={13} fontWeight="700" fontStyle="italic" fill={INK}>smṛti</SvgText>
      <SvgText x={490} y={37} textAnchor="middle" fontSize={10} fill={SOFT}>“remembered” — retold</SvgText>

      <Rect x={30} y={56} width={240} height={26} rx={2} fill={GOLD} opacity={0.3} />
      <SvgText x={42} y={74} fontSize={11} fontWeight="600" fill={INK}>The Vedas</SvgText>
      <Rect x={30} y={88} width={240} height={26} rx={2} fill={GOLD} opacity={0.5} />
      <SvgText x={42} y={106} fontSize={11} fontWeight="700" fill={INK}>The Upanishads</SvgText>
      <Line x1={24} y1={120} x2={276} y2={120} stroke={GOLD} strokeWidth={3} />
      <SvgText x={150} y={146} textAnchor="middle" fontSize={10} fill={SOFT}>where Core Beliefs came from —</SvgText>
      <SvgText x={150} y={161} textAnchor="middle" fontSize={10} fill={SOFT}>brahman, atman, “you are that”</SvgText>

      <Rect x={370} y={56} width={240} height={26} rx={2} fill={SAFFRON} opacity={0.22} />
      <SvgText x={382} y={74} fontSize={11} fontWeight="600" fill={INK}>The Bhagavad Gita</SvgText>
      <Rect x={370} y={88} width={240} height={26} rx={2} fill={SAFFRON} opacity={0.22} />
      <SvgText x={382} y={106} fontSize={11} fontWeight="600" fill={INK}>Ramayana · Mahabharata</SvgText>
      <Rect x={370} y={120} width={240} height={26} rx={2} fill={SAFFRON} opacity={0.22} />
      <SvgText x={382} y={138} fontSize={11} fontWeight="600" fill={INK}>The Puranas</SvgText>
      <Line x1={364} y1={152} x2={616} y2={152} stroke={SAFFRON} strokeWidth={3} />
      <SvgText x={490} y={178} textAnchor="middle" fontSize={10} fill={SOFT}>the stories everybody knows</SvgText>

      <SvgText x={320} y={222} textAnchor="middle" fontSize={11} fontStyle="italic" fill={SOFT}>
        The top shelf has the authority. The bottom shelf has the audience.
      </SvgText>
    </Svg>
  </Figure>
);

// Figures accept an optional `active` (the section is the visible page) to trigger
// their build-in; the static ones simply ignore it.
export const FOUNDATIONS_FIGURES: Record<string, React.FC<{ active?: boolean }>> = {
  'f-name-river': Etymology,
  'f-thread-compare': Compare,
  'f-thread-streams': Streams,
  // Act 3 (depth rework, July 2026): every concept carries a figure. PotSpace
  // moved from f-claim-tat-tvam-asi to the support page that now tells its
  // story; RopeSerpent retired with the rope analogy (maya runs on the mirage).
  'f-claim-brahman': OceanWaves,
  'f-claim-brahman-faces': OneCurrentManyLamps,
  'f-claim-atman-drop': DropAndOcean,
  'f-claim-tta-salt': SaltDissolve,
  'f-claim-tta-pot': PotSpace,
  // 'f-claim-tta-so-what' (namaste) intentionally has no entry — deferred to
  // raster (see the note above), card stays text-only until the painting exists.
  'f-claim-maya': Mirage,
  'f-claim-prana-try': BreatheAlong,
  'f-claim-gunas': Gunas,
  // Acts 4–7 (depth rework): every concept carries a figure; new figures sit on
  // the support page that tells their story, existing ones stay on their cards.
  'f-wheel-samsara': Samsara,
  'f-wheel-seed': KarmaSeed,
  'f-wheel-roles': DharmaRoles,
  'f-wheel-surgeon': TwoKnives,
  'f-wheel-river': RiverToSea,
  'f-wheel-permission': FourAims,
  'f-wheel-mountain': FourPaths,
  'f-faces-trimurti': Trimurti,
  'f-faces-lifeguard': AvatarDescent,
  'f-faces-fire': FlameAndHeat,
  'f-faces-family': FamilyMap,
  'f-library-shelves': Shelves,
  'f-library-two-scenes': TwoEpics,
  'f-library-bow': BowDown,
  'f-living-guest': GuestLamp,
  'f-living-exchange': DarshanLoop,
  'f-living-year': YearWheel,
};
