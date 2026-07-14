// The Foundations diagrams. Keyed on the card's section id, so a card carries
// no figure config — if a figure exists for that id, it renders; if not, the
// card is text-only and nothing breaks.
//
// Arrowheads are drawn as explicit <Path> triangles rather than SVG <Marker>,
// which react-native-svg supports unevenly across platforms.
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Circle, Ellipse, Path, Line, G, Text as SvgText } from 'react-native-svg';
import { DharmaDesignSystem } from '../constants/DharmaDesignSystem';

const C = DharmaDesignSystem.colors;
const INK = C.neutrals.charcoalBlack;
const SOFT = C.neutrals.softAsh;
const GOLD = '#B8912F';
const TEAL = C.primary.peacockTeal;
const INDIGO = C.primary.indigoBlue;
const SAFFRON = C.primary.deepSaffron;
const PINK = C.sacred.lotusPink;
const GREEN = C.sacred.banyanGreen;
const TURMERIC = C.primary.turmericYellow;
const RULE = 'rgba(0,0,0,0.14)';

const Caption: React.FC<{ children: string }> = ({ children }) => (
  <Text style={styles.caption}>{children}</Text>
);

const Figure: React.FC<{ caption: string; children: React.ReactNode }> = ({ caption, children }) => (
  <View style={styles.figure}>
    {children}
    <Caption>{caption}</Caption>
  </View>
);

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
  ['You join by', 'Practising', 'Birth or covenant', 'Professing faith', 'The shahada'],
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
const Streams = () => (
  <Figure caption="Not sects at war. Four answers to “which face do you love?”">
    <Svg width="100%" height={190} viewBox="0 0 640 244">
      <Path d="M320 244 L320 166" stroke={GOLD} strokeWidth={9} strokeLinecap="round" fill="none" />
      {[
        { d: 'M320 170 C320 138, 120 148, 92 104', c: TEAL, cx: 92, name: 'Vaishnava', god: 'Vishnu', foot: 'Rama · Krishna' },
        { d: 'M320 170 C320 138, 240 146, 232 102', c: INDIGO, cx: 232, name: 'Shaiva', god: 'Shiva', foot: 'the ascetic' },
        { d: 'M320 170 C320 138, 400 146, 408 102', c: PINK, cx: 408, name: 'Shakta', god: 'the Goddess', foot: 'Durga · Kali' },
        { d: 'M320 170 C320 138, 520 148, 548 104', c: GREEN, cx: 548, name: 'Smarta', god: 'all of them', foot: 'five at once' },
      ].map(b => (
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
  </Figure>
);

// ── The pot and the space ───────────────────────────────────────────────────
const PotSpace = () => (
  <Figure caption="The pot has walls. The space does not.">
    <Svg width="100%" height={190} viewBox="0 0 640 244">
      <Rect x={0} y={0} width={640} height={244} fill={INDIGO} opacity={0.07} rx={4} />
      {[[70, 38], [180, 24], [300, 46], [430, 28], [560, 50], [612, 94], [40, 118], [520, 126]].map(([cx, cy]) => (
        <Circle key={`${cx}`} cx={cx} cy={cy} r={1.4} fill={GOLD} opacity={0.6} />
      ))}
      <Path
        d="M250 114 C238 146, 244 196, 268 210 L372 210 C396 196, 402 146, 390 114 Z"
        fill={INDIGO}
        opacity={0.28}
      />
      <Path
        d="M250 114 C238 146, 244 196, 268 210 L372 210 C396 196, 402 146, 390 114"
        fill="none"
        stroke="#B07050"
        strokeWidth={7}
        strokeLinecap="round"
      />
      <Ellipse cx={320} cy={114} rx={70} ry={12} fill="none" stroke="#B07050" strokeWidth={3} opacity={0.55} strokeDasharray="3 4" />
      <SvgText x={320} y={168} textAnchor="middle" fontSize={13} fontWeight="700" fontStyle="italic" fill={INK}>ātman</SvgText>
      <SvgText x={320} y={186} textAnchor="middle" fontSize={10} fill={SOFT}>the space inside</SvgText>
      <SvgText x={118} y={82} fontSize={13} fontWeight="700" fontStyle="italic" fill={INK}>brahman</SvgText>
      <SvgText x={118} y={100} fontSize={10} fill={SOFT}>the space everywhere</SvgText>
      <SvgText x={320} y={237} textAnchor="middle" fontSize={11} fontStyle="italic" fill={SOFT}>
        Break the pot and nothing is released.
      </SvgText>
    </Svg>
  </Figure>
);

// ── The rope and the serpent ────────────────────────────────────────────────
const RopeSerpent = () => (
  <Figure caption="Maya isn’t “the world is fake.” The rope was always a rope.">
    <Svg width="100%" height={180} viewBox="0 0 640 236">
      <Rect x={0} y={0} width={640} height={236} fill={INDIGO} opacity={0.1} rx={4} />
      {/* One continuous coil: rope where the light falls, serpent where it doesn't */}
      <Path
        d="M60 176 C120 120, 200 200, 268 152 C336 104, 380 190, 452 150 C500 124, 520 92, 540 70"
        fill="none"
        stroke="#A87C4F"
        strokeWidth={13}
        strokeLinecap="round"
      />
      <Path
        d="M340 168 C380 190, 400 176, 452 150 C500 124, 520 92, 540 70"
        fill="none"
        stroke={INDIGO}
        strokeWidth={13}
        strokeLinecap="round"
        opacity={0.7}
      />
      <G stroke="#7A5636" strokeWidth={1.4} opacity={0.65}>
        <Line x1={86} y1={150} x2={94} y2={164} />
        <Line x1={112} y1={136} x2={120} y2={150} />
        <Line x1={140} y1={132} x2={146} y2={147} />
        <Line x1={170} y1={142} x2={175} y2={157} />
        <Line x1={200} y1={158} x2={204} y2={173} />
      </G>
      {/* serpent head */}
      <Path d="M540 70 C556 60, 572 64, 578 76 C583 87, 574 96, 560 94 C548 92, 540 84, 540 70 Z" fill={INDIGO} opacity={0.85} />
      <Circle cx={566} cy={76} r={2.4} fill={TURMERIC} />
      <Path d="M578 76 L594 70" stroke={INDIGO} strokeWidth={1.6} opacity={0.85} />
      <Path d="M578 78 L594 84" stroke={INDIGO} strokeWidth={1.6} opacity={0.85} />
      <SvgText x={110} y={210} fontSize={12} fontWeight="700" fill={INK}>rope</SvgText>
      <SvgText x={110} y={226} fontSize={10} fill={SOFT}>where the light falls</SvgText>
      <SvgText x={500} y={210} fontSize={12} fontWeight="700" fill={INK}>serpent</SvgText>
      <SvgText x={500} y={226} fontSize={10} fill={SOFT}>where it doesn’t</SvgText>
      <SvgText x={320} y={30} textAnchor="middle" fontSize={12} fontStyle="italic" fontWeight="600" fill={INK}>
        One object. Two readings.
      </SvgText>
    </Svg>
  </Figure>
);

// ── The three strands ───────────────────────────────────────────────────────
const Gunas = () => (
  <Figure caption="Not three types of people. Three threads in every person.">
    <Svg width="100%" height={170} viewBox="0 0 640 214">
      <Path d="M20 60 C130 60, 130 154, 240 154 C350 154, 350 60, 460 60 C540 60, 580 82, 620 96" fill="none" stroke={GOLD} strokeWidth={5} strokeLinecap="round" />
      <Path d="M20 107 L620 107" fill="none" stroke={SAFFRON} strokeWidth={5} strokeLinecap="round" />
      <Path d="M20 154 C130 154, 130 60, 240 60 C350 60, 350 154, 460 154 C540 154, 580 132, 620 118" fill="none" stroke={INDIGO} strokeWidth={5} strokeLinecap="round" />
      <Circle cx={20} cy={60} r={5} fill={GOLD} />
      <Circle cx={20} cy={107} r={5} fill={SAFFRON} />
      <Circle cx={20} cy={154} r={5} fill={INDIGO} />
      <SvgText x={20} y={186} fontSize={12} fontWeight="700" fontStyle="italic" fill={INK}>sattva</SvgText>
      <SvgText x={20} y={203} fontSize={10} fill={SOFT}>clarity · light</SvgText>
      <SvgText x={255} y={186} fontSize={12} fontWeight="700" fontStyle="italic" fill={INK}>rajas</SvgText>
      <SvgText x={255} y={203} fontSize={10} fill={SOFT}>heat · drive</SvgText>
      <SvgText x={480} y={186} fontSize={12} fontWeight="700" fontStyle="italic" fill={INK}>tamas</SvgText>
      <SvgText x={480} y={203} fontSize={10} fill={SOFT}>inertia · fog</SvgText>
      <SvgText x={630} y={28} textAnchor="end" fontSize={9.5} fontWeight="700" fill={SOFT}>
        ALL THREE, ALWAYS — ONLY THE RATIO MOVES
      </SvgText>
    </Svg>
  </Figure>
);

// ── The wheel, and the way off it ───────────────────────────────────────────
const Samsara = () => (
  <Figure caption="Everything turns. The whole point is to stop turning.">
    <Svg width="100%" height={200} viewBox="0 0 640 266">
      <Circle cx={290} cy={133} r={94} fill="none" stroke={RULE} strokeWidth={26} />
      <Circle
        cx={290}
        cy={133}
        r={94}
        fill="none"
        stroke={TEAL}
        strokeWidth={26}
        opacity={0.5}
        strokeDasharray="444 147"
        transform="rotate(-90 290 133)"
      />
      <Circle cx={290} cy={39} r={7} fill={GREEN} />
      <SvgText x={290} y={22} textAnchor="middle" fontSize={11} fontWeight="700" fill={INK}>birth</SvgText>
      <Circle cx={384} cy={133} r={7} fill={SAFFRON} />
      <SvgText x={402} y={137} fontSize={11} fontWeight="700" fill={INK}>a life</SvgText>
      <Circle cx={290} cy={227} r={7} fill={INDIGO} />
      <SvgText x={290} y={248} textAnchor="middle" fontSize={11} fontWeight="700" fill={INK}>death</SvgText>
      <Circle cx={196} cy={133} r={7} fill={PINK} />
      <SvgText x={178} y={137} textAnchor="end" fontSize={11} fontWeight="700" fill={INK}>again</SvgText>
      <SvgText x={290} y={126} textAnchor="middle" fontSize={10} fill={SOFT}>what you did</SvgText>
      <SvgText x={290} y={144} textAnchor="middle" fontSize={13} fontWeight="700" fontStyle="italic" fill={INK}>karma</SvgText>
      <SvgText x={290} y={161} textAnchor="middle" fontSize={10} fill={SOFT}>steers the wheel</SvgText>
      <Path d="M390 94 C468 58, 518 60, 564 72" stroke={GOLD} strokeWidth={2} fill="none" strokeDasharray="5 4" />
      <Circle cx={570} cy={74} r={16} fill="none" stroke={GOLD} strokeWidth={2} />
      <Circle cx={570} cy={74} r={4} fill={GOLD} />
      <SvgText x={570} y={110} textAnchor="middle" fontSize={12} fontWeight="700" fontStyle="italic" fill={INK}>moksha</SvgText>
      <SvgText x={570} y={127} textAnchor="middle" fontSize={10} fill={SOFT}>the way off</SvgText>
    </Svg>
  </Figure>
);

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
      <SvgText x={160} y={158} textAnchor="middle" fontSize={9} fill={SOFT}>barely worshipped</SvgText>
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
      <SvgText x={150} y={146} textAnchor="middle" fontSize={10} fill={SOFT}>where Act Three came from —</SvgText>
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

const FIGURES: Record<string, React.FC> = {
  'f-name-river': Etymology,
  'f-thread-compare': Compare,
  'f-thread-streams': Streams,
  'f-claim-tat-tvam-asi': PotSpace,
  'f-claim-maya': RopeSerpent,
  'f-claim-gunas': Gunas,
  'f-wheel-samsara': Samsara,
  'f-faces-trimurti': Trimurti,
  'f-faces-family': FamilyMap,
  'f-library-shelves': Shelves,
};

const FoundationFigure: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const Fig = FIGURES[sectionId];
  return Fig ? <Fig /> : null;
};

const styles = StyleSheet.create({
  figure: {
    marginTop: 4,
    marginBottom: 20,
  },
  caption: {
    fontSize: 11.5,
    lineHeight: 16,
    color: C.neutrals.softAsh,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  table: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: RULE,
  },
  tr: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: RULE,
    paddingVertical: 9,
  },
  thead: {
    borderBottomWidth: 1,
    borderBottomColor: RULE,
  },
  th: {
    flex: 1,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '700',
    color: C.neutrals.softAsh,
  },
  td: {
    flex: 1,
    fontSize: 10.5,
    lineHeight: 15,
    color: C.neutrals.softAsh,
    paddingRight: 4,
  },
  colLabel: { flex: 0.85 },
  colUs: { flex: 1.15 },
  rowLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: C.neutrals.softAsh,
  },
  tdUs: {
    color: C.neutrals.charcoalBlack,
    fontWeight: '600',
  },
});

export default FoundationFigure;
