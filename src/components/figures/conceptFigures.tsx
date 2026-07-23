// Section figures for the Module 1 concepts — the other half of the registry
// that `SectionFigure.tsx` assembles (Foundations' half is `FoundationFigure.tsx`).
//
// House style, per docs/dharma-illustration-spec.md:
//  • Authored 1:1 — SceneFigure at 390 wide (full-bleed), InsetFigure at 342.
//  • No tap-to-enlarge: at 1:1 the labels are readable on glass.
//  • Arrival staging only, via BuildIn. No ambient loops.
//  • react-native-svg renders gradients and layered opacity but NOT SVG filters —
//    glow is stacked translucent shapes and radial gradients.
//
// Every figure has a stated job: "this makes visible that ___" or "this stops the
// reader thinking ___". A figure that can only be described as "a picture of X"
// is decoration and does not belong here.
import React from 'react';
import Svg, {
  Rect,
  Circle,
  Path,
  Line,
  G,
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';
import { SceneFigure, InsetFigure, INK, SOFT, GOLD, TEAL, INDIGO, SAFFRON, GREEN } from './figurePrimitives';
import { DharmaRolesSvg } from '../FoundationFigure';

// Warm grounds shared by the full-bleed scenes. Kept local rather than in the
// design system: these are illustration-only values from the illustration spec.
const PARCHMENT_TOP = '#FCF7E8';
const PARCHMENT_BOT = '#F1E7CE';
const ROAD_LIGHT = '#E4C66B';
const ROAD_MID = '#C9A233';
const ROAD_DARK = '#96741F';
const ROAD_SHEEN = '#F6E9BE';
const SILHOUETTE = '#2A2318';
const KRISHNA_BLUE = '#2A3E6B'; // peacock-blue held even at silhouette scale (spec Part 1)
const EARTH = '#6B5A38';
const LABEL_WARM = '#8A6A1E';
const SAFFRON_INK = '#B4541E';
const TEAL_INK = '#1F5E55';

/** Shared parchment ground + road gradients. `id` must be unique per figure. */
const Grounds: React.FC<{ id: string }> = ({ id }) => (
  <Defs>
    <LinearGradient id={`${id}-ground`} x1="0" y1="0" x2="0" y2="1">
      <Stop offset="0" stopColor={PARCHMENT_TOP} />
      <Stop offset="1" stopColor={PARCHMENT_BOT} />
    </LinearGradient>
    <LinearGradient id={`${id}-road`} x1="0" y1="0" x2="0" y2="1">
      <Stop offset="0" stopColor={ROAD_LIGHT} />
      <Stop offset="0.4" stopColor={ROAD_MID} />
      <Stop offset="1" stopColor={ROAD_DARK} />
    </LinearGradient>
  </Defs>
);

// ════════════════════════════════════════════════════════════════════════════
// dharma-meaning — LOAD TEST
// Job: make visible what dharma *does*, by showing the same scene without it.
// Pays off the Manusmriti openingVerse sitting at the top of this same card:
// "dharma destroys those who destroy it; dharma protects those who protect it".
// ════════════════════════════════════════════════════════════════════════════
const Shelter: React.FC<{ x: number; held: boolean }> = ({ x, held }) => (
  <G>
    {held ? (
      <>
        <Path d={`M${x + 22} 108 L${x + 88} 74 L${x + 154} 108 Z`} fill={LABEL_WARM} opacity={0.32} />
        <Rect x={x + 26} y={108} width={124} height={13} rx={2} fill={GOLD} stroke={LABEL_WARM} strokeWidth={1} />
        <Rect x={x + 36} y={121} width={10} height={76} fill={EARTH} />
        <Rect x={x + 130} y={121} width={10} height={76} fill={EARTH} />
      </>
    ) : (
      <>
        <Rect
          x={x + 26}
          y={108}
          width={124}
          height={13}
          rx={2}
          fill="none"
          stroke={LABEL_WARM}
          strokeWidth={1.1}
          strokeDasharray="4 4"
          opacity={0.55}
        />
        <G transform={`rotate(-14 ${x + 41} 197)`}>
          <Rect x={x + 36} y={121} width={10} height={76} fill={EARTH} />
        </G>
        <G transform={`rotate(12 ${x + 135} 197)`}>
          <Rect x={x + 130} y={121} width={10} height={76} fill={EARTH} />
        </G>
      </>
    )}
    <Circle cx={x + 88} cy={158} r={9.5} fill={SILHOUETTE} />
    <Path
      d={`M${x + 77} 197 L${x + 77} 177 Q${x + 77} 168 ${x + 88} 168 Q${x + 99} 168 ${x + 99} 177 L${x + 99} 197 Z`}
      fill={SILHOUETTE}
    />
    <Line x1={x + 14} y1={197} x2={x + 162} y2={197} stroke={LABEL_WARM} strokeWidth={1.6} opacity={0.5} />
  </G>
);

const DharmaMeaning: React.FC<{ active?: boolean }> = ({ active }) => (
  <SceneFigure
    caption="Dharma is whatever, when you take it away, the thing stops standing."
    active={active}
  >
    <Svg width="100%" height={300} viewBox="0 0 390 300">
      <Grounds id="dm" />
      <Rect x={0} y={0} width={390} height={300} fill="url(#dm-ground)" />

      <SvgText x={195} y={24} textAnchor="middle" fontSize={10} fontWeight="700" letterSpacing={1.8} fill={LABEL_WARM}>
        TAKE IT AWAY AND SEE
      </SvgText>

      <Rect x={12} y={36} width={176} height={192} rx={10} fill={TEAL} opacity={0.07} />
      <Rect x={12} y={36} width={176} height={192} rx={10} fill="none" stroke={TEAL} strokeWidth={1} opacity={0.25} />
      <Shelter x={12} held />
      <SvgText x={100} y={219} textAnchor="middle" fontSize={12} fontWeight="700" fill={TEAL_INK}>held</SvgText>

      <Rect x={202} y={36} width={176} height={192} rx={10} fill={SAFFRON} opacity={0.07} />
      <Rect x={202} y={36} width={176} height={192} rx={10} fill="none" stroke={SAFFRON} strokeWidth={1} opacity={0.25} />
      <Shelter x={202} held={false} />
      <SvgText x={290} y={219} textAnchor="middle" fontSize={12} fontWeight="700" fill={SAFFRON_INK}>let go</SvgText>

      <SvgText x={195} y={256} textAnchor="middle" fontSize={12.5} fontWeight="700" fill={SILHOUETTE}>
        धृ  dhṛ — to hold
      </SvgText>
      <SvgText x={195} y={277} textAnchor="middle" fontSize={10.5} fontStyle="italic" fill={EARTH}>
        “Dharma protects those who protect it.”
      </SvgText>
      <SvgText x={195} y={292} textAnchor="middle" fontSize={9} fill={SOFT}>
        Manusmriti 8.15 — the verse at the top of this card
      </SvgText>
    </Svg>
  </SceneFigure>
);

// ════════════════════════════════════════════════════════════════════════════
// dharma-personal — INSTANCE ARRAY (recall of Foundations' f-wheel-roles)
// Job: make visible that one person owes different things at different hours.
// ════════════════════════════════════════════════════════════════════════════
const DharmaPersonal: React.FC<{ active?: boolean }> = ({ active }) => (
  <InsetFigure
    caption="Not a rule copied from a book — the shape of who is leaning on you."
    active={active}
  >
    <DharmaRolesSvg />
  </InsetFigure>
);

// ════════════════════════════════════════════════════════════════════════════
// dharma-stages — MAP / JOURNEY
// Job: make visible that the answer moves while the question doesn't.
// Deliberately NOT the four ashramas: naming brahmacharya/grihastha/vanaprastha/
// sannyasa would put four unglossed Sanskrit terms on a card that glosses none
// (product-spec §8b).
// ════════════════════════════════════════════════════════════════════════════
const CLAIM_LINES: [number, number, number][] = [
  [216, 78, 279],
  [249, 76, 280],
  [282, 76, 282],
  [315, 76, 284],
  [348, 78, 285],
];

const DharmaStages: React.FC<{ active?: boolean }> = ({ active }) => (
  <SceneFigure caption="Same question, different place on the road — different right answer." active={active}>
    <Svg width="100%" height={300} viewBox="0 0 390 300">
      <Grounds id="ds" />
      <Rect x={0} y={0} width={390} height={300} fill="url(#ds-ground)" />

      <SvgText x={195} y={24} textAnchor="middle" fontSize={10} fontWeight="700" letterSpacing={1.7} fill={LABEL_WARM}>
        THE SAME QUESTION, FURTHER ALONG
      </SvgText>

      {/* at twenty — one voice arrives */}
      <SvgText x={110} y={50} textAnchor="middle" fontSize={9.5} fontWeight="700" letterSpacing={1.1} fill={TEAL_INK}>
        AT TWENTY
      </SvgText>
      <Rect x={56} y={60} width={108} height={28} rx={14} fill={TEAL} opacity={0.15} />
      <Rect x={56} y={60} width={108} height={28} rx={14} fill="none" stroke={TEAL} strokeWidth={1.2} opacity={0.6} />
      <SvgText x={110} y={79} textAnchor="middle" fontSize={11} fontWeight="600" fill={TEAL_INK}>your father</SvgText>
      <Line x1={110} y1={90} x2={110} y2={134} stroke={TEAL} strokeWidth={1.6} />
      <Path d="M110,142 L105,131 L115,131 Z" fill={TEAL} />

      {/* at forty — five claims arrive */}
      <SvgText x={282} y={50} textAnchor="middle" fontSize={9.5} fontWeight="700" letterSpacing={1.1} fill={SAFFRON_INK}>
        AT FORTY
      </SvgText>
      <SvgText x={282} y={68} textAnchor="middle" fontSize={9.5} fill={SOFT}>
        partner · children · parents · work
      </SvgText>
      {CLAIM_LINES.map(([x1, y1, x2]) => (
        <Line key={x1} x1={x1} y1={y1} x2={x2} y2={136} stroke={SAFFRON} strokeWidth={1.2} opacity={0.6} />
      ))}
      <Circle cx={282} cy={141} r={5} fill={SAFFRON} />

      {/* the road */}
      <Rect x={0} y={158} width={390} height={13} fill="url(#ds-road)" />
      <Rect x={0} y={158} width={390} height={1.6} fill={ROAD_SHEEN} opacity={0.7} />
      <Rect x={104} y={146} width={12} height={16} rx={2} fill={EARTH} />
      <Rect x={276} y={146} width={12} height={16} rx={2} fill={EARTH} />
      {/* the walker sits PAST the second station, not between the two — mid-road he
          reads as a phantom third station rather than as the road continuing */}
      <Circle cx={346} cy={141} r={5.5} fill={SILHOUETTE} opacity={0.75} />
      <Path
        d="M340 158 L340 149 Q340 144 346 144 Q352 144 352 149 L352 158 Z"
        fill={SILHOUETTE}
        opacity={0.75}
      />

      {/* the identical question, two different answers */}
      <SvgText x={110} y={192} textAnchor="middle" fontSize={10} fontStyle="italic" fill={EARTH}>
        “what is right?”
      </SvgText>
      <SvgText x={110} y={213} textAnchor="middle" fontSize={12} fontWeight="700" fill={INK}>one voice</SvgText>
      <SvgText x={110} y={231} textAnchor="middle" fontSize={9.5} fill={SOFT}>the answer is handed to you</SvgText>

      <SvgText x={282} y={192} textAnchor="middle" fontSize={10} fontStyle="italic" fill={EARTH}>
        “what is right?”
      </SvgText>
      <SvgText x={282} y={213} textAnchor="middle" fontSize={12} fontWeight="700" fill={INK}>no single voice</SvgText>
      <SvgText x={282} y={231} textAnchor="middle" fontSize={9.5} fill={SOFT}>you have to weigh them</SvgText>

      <SvgText x={195} y={272} textAnchor="middle" fontSize={12} fontWeight="700" fill={SILHOUETTE}>
        The question never changes. Where you stand does.
      </SvgText>
    </Svg>
  </SceneFigure>
);

// ════════════════════════════════════════════════════════════════════════════
// dharma-differences — COMPARISON PAIR
// Job: stop the reader thinking one of the two must be wrong. Everything is held
// constant but one variable (their nature); the two green checks are the argument.
// ════════════════════════════════════════════════════════════════════════════
const ARMY_MARKS: [number, number, number][] = [
  [18, 66, 10], [30, 62, 14], [42, 68, 8], [56, 64, 12], [70, 67, 9],
  [300, 65, 11], [314, 61, 15], [328, 68, 8], [342, 64, 12], [356, 67, 9],
];

const Tick: React.FC<{ cx: number; cy: number }> = ({ cx, cy }) => (
  <Path
    d={`M${cx - 8} ${cy} l5 6 l11 -13`}
    fill="none"
    stroke={GREEN}
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

const DharmaDifferences: React.FC<{ active?: boolean }> = ({ active }) => (
  <SceneFigure caption="Same field, same morning. Neither is doing the other's job." active={active}>
    <Svg width="100%" height={300} viewBox="0 0 390 300">
      <Defs>
        <LinearGradient id="dd-ground" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={PARCHMENT_TOP} />
          <Stop offset="1" stopColor="#F2E9D2" />
        </LinearGradient>
        <LinearGradient id="dd-sky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FBEBC4" />
          <Stop offset="1" stopColor="#F6DCA4" />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={390} height={300} fill="url(#dd-ground)" />

      {/* the shared situation — the variable that does NOT change */}
      <Rect x={0} y={0} width={390} height={88} fill="url(#dd-sky)" />
      <Circle cx={195} cy={74} r={22} fill={SAFFRON} opacity={0.28} />
      <Line x1={0} y1={76} x2={390} y2={76} stroke={GOLD} strokeWidth={1} opacity={0.5} />
      {ARMY_MARKS.map(([x, y, h]) => (
        <Rect key={`${x}-${y}`} x={x} y={y} width={3} height={h} fill={LABEL_WARM} opacity={0.4} />
      ))}
      <SvgText x={195} y={26} textAnchor="middle" fontSize={10} fontWeight="700" letterSpacing={1.6} fill={LABEL_WARM}>
        ONE BATTLEFIELD, ONE MORNING
      </SvgText>

      <Line x1={195} y1={98} x2={195} y2={246} stroke={LABEL_WARM} strokeWidth={1} strokeDasharray="4 5" opacity={0.5} />

      {/* Arjuna — a warrior by nature */}
      <Circle cx={96} cy={122} r={11} fill={SILHOUETTE} />
      <Path d="M84 180 L84 145 Q84 136 96 136 Q108 136 108 145 L108 180 Z" fill={SILHOUETTE} />
      <Path d="M132 110 C146 132 146 152 132 174" fill="none" stroke={LABEL_WARM} strokeWidth={2.6} />
      <Line x1={132} y1={110} x2={132} y2={174} stroke={EARTH} strokeWidth={1} />
      <Line x1={106} y1={146} x2={129} y2={143} stroke={SILHOUETTE} strokeWidth={4.5} strokeLinecap="round" />
      <SvgText x={96} y={202} textAnchor="middle" fontSize={10} fill={SOFT}>a warrior by nature</SvgText>
      <Rect x={44} y={212} width={104} height={28} rx={14} fill={TEAL} opacity={0.16} />
      <Rect x={44} y={212} width={104} height={28} rx={14} fill="none" stroke={TEAL} strokeWidth={1.2} />
      <SvgText x={96} y={231} textAnchor="middle" fontSize={13} fontWeight="700" fill={INK}>he fights</SvgText>
      <Tick cx={96} cy={254} />

      {/* Krishna — a guide by nature */}
      <Circle cx={282} cy={122} r={11} fill={KRISHNA_BLUE} />
      <Path d="M270 180 L270 145 Q270 136 282 136 Q294 136 294 145 L294 180 Z" fill={KRISHNA_BLUE} />
      <Line x1={293} y1={146} x2={336} y2={158} stroke={EARTH} strokeWidth={1.6} />
      <Line x1={293} y1={152} x2={336} y2={168} stroke={EARTH} strokeWidth={1.6} />
      <Circle cx={344} cy={170} r={15} fill="none" stroke={LABEL_WARM} strokeWidth={2} />
      <Path
        d="M344 155 L344 185 M329 170 L359 170 M334 160 L354 180 M354 160 L334 180"
        stroke={LABEL_WARM}
        strokeWidth={0.9}
      />
      <SvgText x={282} y={202} textAnchor="middle" fontSize={10} fill={SOFT}>a guide by nature</SvgText>
      <Rect x={230} y={212} width={104} height={28} rx={14} fill={INDIGO} opacity={0.14} />
      <Rect x={230} y={212} width={104} height={28} rx={14} fill="none" stroke={INDIGO} strokeWidth={1.2} />
      <SvgText x={282} y={231} textAnchor="middle" fontSize={13} fontWeight="700" fill={INK}>he drives</SvgText>
      <Tick cx={282} cy={254} />

      <SvgText x={195} y={286} textAnchor="middle" fontSize={11.5} fontWeight="700" fill={SILHOUETTE}>
        Not one rule for two men — each judged by his own.
      </SvgText>
    </Svg>
  </SceneFigure>
);

// ════════════════════════════════════════════════════════════════════════════
// dharma-imperfection — MAP / JOURNEY
// Job: make visible that dharma is a direction, not a record. One continuous
// track makes "direction" literal — it never restarts, it only wanders and
// rejoins. Sits ABOVE the card's three bullets, which stay.
// ════════════════════════════════════════════════════════════════════════════
const STUMBLES: { x: number; y: number; who: string; what: string }[] = [
  { x: 84, y: 148, who: 'Rama', what: 'banishes Sita on rumor' },
  { x: 196, y: 168, who: 'Yudhishthira', what: 'gambles the family away' },
  { x: 304, y: 142, who: 'Arjuna', what: 'refuses to fight' },
];

const TRACK =
  'M0 78 L38 78 C60 78 60 126 84 126 C108 126 108 78 130 78 ' +
  'L148 78 C172 78 172 146 196 146 C220 146 220 78 242 78 ' +
  'L258 78 C282 78 282 120 304 120 C326 120 326 78 348 78 L390 78';

const DharmaImperfection: React.FC<{ active?: boolean }> = ({ active }) => (
  <SceneFigure caption="Not a spotless record — a road they kept returning to." active={active}>
    <Svg width="100%" height={220} viewBox="0 0 390 220">
      <Grounds id="di" />
      <Rect x={0} y={0} width={390} height={220} fill="url(#di-ground)" />

      <SvgText x={195} y={26} textAnchor="middle" fontSize={10} fontWeight="700" letterSpacing={1.7} fill={LABEL_WARM}>
        THEY ALL LEFT THE ROAD
      </SvgText>

      <SvgText x={14} y={64} fontSize={9.5} fontWeight="700" letterSpacing={1} fill={LABEL_WARM}>DHARMA</SvgText>
      <Rect x={0} y={72} width={390} height={13} fill="url(#di-road)" />
      <Rect x={0} y={72} width={390} height={1.6} fill={ROAD_SHEEN} opacity={0.7} />

      <Path d={TRACK} fill="none" stroke={TEAL} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      {[130, 242, 348].map(cx => (
        <Circle key={cx} cx={cx} cy={78} r={3.6} fill={TEAL} />
      ))}

      {STUMBLES.map(s => (
        <G key={s.who}>
          <SvgText x={s.x} y={s.y} textAnchor="middle" fontSize={11} fontWeight="700" fill={INK}>{s.who}</SvgText>
          <SvgText x={s.x} y={s.y + 14} textAnchor="middle" fontSize={9} fill={SOFT}>{s.what}</SvgText>
        </G>
      ))}

      {/* still walking it */}
      <Circle cx={366} cy={56} r={6} fill={SILHOUETTE} opacity={0.8} />
      <Path d="M360 72 L360 64 Q360 60 366 60 Q372 60 372 64 L372 72 Z" fill={SILHOUETTE} opacity={0.8} />

      <SvgText x={195} y={206} textAnchor="middle" fontSize={12} fontWeight="700" fill={SILHOUETTE}>
        Every one of them came back.
      </SvgText>
    </Svg>
  </SceneFigure>
);

export const CONCEPT_FIGURES: Record<string, React.FC<{ active?: boolean }>> = {
  'dharma-meaning': DharmaMeaning,
  'dharma-personal': DharmaPersonal,
  'dharma-stages': DharmaStages,
  'dharma-differences': DharmaDifferences,
  'dharma-imperfection': DharmaImperfection,
};
