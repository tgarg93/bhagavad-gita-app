// Shared pronunciation dictionary for the ElevenLabs generators (Foundations +
// Ramayana). ONE source of truth so the two readers never drift apart again.
//
// Scheme (natural, correct Indian pronunciation): CAPS = stressed syllable;
// `aa` = long a (father), `uh` = short a/schwa, `ee`/`oo` = long i/u, `oh`/`oa`
// = o; aspirates kept (bh, dh, th, kh, gh). Mirrors the key in
// docs/foundations-narration-script.md — keep the two in sync.
//
// applyPronunciation() replaces each term (whole-word, case-insensitive,
// longest phrases first) with its respelling, and reports any capitalized
// word it did NOT recognise so gaps can be caught before spending credits.

// Multi-word phrases MUST come before their single-word parts.
export const PRONUNCIATION = {
  // ── multi-word (applied first) ──
  'sanatana dharma': 'suh-NAA-tuh-nuh DHUR-muh',
  'tat tvam asi': 'tut-tvum-UH-see',
  'bhagavad gita': 'BHUH-guh-vud GEE-taa',
  'shodasha upachara': 'SHOH-duh-shuh oo-puh-CHAA-ruh',
  'ishta-devata': 'ISH-tuh DEV-uh-taa',
  'ram rajya': 'RAAM RAAJ-yuh',
  'gau mata': 'GOW MAA-taa',
  'uttar pradesh': 'OOT-tuhr pruh-DAYSH',

  // ── concepts ──
  brahman: 'BRUH-mun', atman: 'AAT-mun', dharma: 'DHUR-muh', karma: 'KUR-muh',
  moksha: 'MOAK-shuh', maya: 'MAA-yaa', prana: 'PRAA-nuh', gunas: 'GOO-nuhz',
  guna: 'GOO-nuh', triguna: 'tree-GOO-nuh', sattva: 'SUHT-tvuh', rajas: 'RUH-juss',
  tamas: 'TUH-muss', samsara: 'sum-SAA-ruh', ahimsa: 'uh-HING-saa', himsa: 'HING-saa',
  purusharthas: 'poo-roo-SHAAR-thuhz', purushartha: 'poo-roo-SHAAR-thuh',
  artha: 'UR-thuh', kama: 'KAA-muh', jnana: 'GYAA-nuh', bhakti: 'BHUH-ktee',
  trimurti: 'tri-MOOR-tee', avatar: 'UH-vuh-taar', avatara: 'uh-vuh-TAA-ruh',
  shakti: 'SHUHK-tee', shruti: 'SHROO-tee', smriti: 'SMRI-tee', murti: 'MOOR-tee',
  puja: 'POO-jaa', prasad: 'pruh-SAAD', darshan: 'DUR-shun', namaste: 'nuh-muh-STAY',
  mrigatrishna: 'mri-guh-TRISH-naa', sharanagati: 'shuh-ruh-NAA-guh-tee',
  vedas: 'VAY-duhz', veda: 'VAY-duh', upanishads: 'oo-PUH-ni-shudz',
  upanishad: 'oo-PUH-ni-shud', puranas: 'poo-RAA-nuhz', purana: 'poo-RAA-nuh',
  sindhu: 'SIN-dhoo', sanskrit: 'SUNS-krit', samskrita: 'SUNS-kri-tuh',
  payasam: 'PAAY-uh-sum', putrakameshti: 'poo-truh-kaa-MESH-tee',
  shloka: 'SHLOH-kuh', shoka: 'SHOH-kuh', kanda: 'KAAN-duh', yojana: 'YOH-juh-nuh',
  yojanas: 'YOH-juh-nuhz', shudras: 'SHOO-druhz', vratis: 'VRUH-teez',

  // ── deities & figures ──
  shiva: 'SHIH-vuh', vishnu: 'VISH-noo', brahma: 'BRUH-maa', krishna: 'KRISH-nuh',
  rama: 'RAA-muh', ganesha: 'guh-NAY-shuh', hanuman: 'HUH-noo-maan',
  parvati: 'PAAR-vuh-tee', durga: 'DOOR-gaa', kali: 'KAA-lee', sita: 'SEE-taa',
  ravana: 'RAA-vuh-nuh', arjuna: 'AR-joo-nuh', devi: 'DAY-vee', lakshmi: 'LUCK-shmee',
  saraswati: 'SUH-rus-vuh-tee', kartikeya: 'kaar-tih-KAY-yuh', nataraja: 'nuh-tuh-RAA-juh',
  vibhishana: 'vih-BHEE-shuh-nuh', mahishasura: 'muh-hih-SHAA-soo-ruh',
  uddalaka: 'ood-DAA-luh-kuh', shvetaketu: 'shvay-tuh-KAY-too', chandogya: 'chaan-DOHG-yuh',
  mundaka: 'MOON-duh-kuh', bhishma: 'BHEESH-muh', drona: 'DROH-nuh',
  vaishnava: 'VUYSH-nuh-vuh', shaiva: 'SHY-vuh', shakta: 'SHAAK-tuh', smarta: 'SMAAR-tuh',
  // Ramayana cast
  dasharatha: 'duh-SHUH-ruh-tuh', kaushalya: 'kow-SHUL-yaa', kaikeyi: 'KY-kay-ee',
  manthara: 'MUN-thuh-raa', lakshmana: 'LUCK-shmuh-nuh', shatrughna: 'shuh-TROOG-nuh',
  bharata: 'BHUH-ruh-tuh', janaka: 'JUH-nuh-kuh', vishwamitra: 'vish-waa-MIT-ruh',
  vasishtha: 'vuh-SISH-tuh', tataka: 'TAA-tuh-kaa', ahalya: 'uh-HULL-yaa',
  kamsa: 'KUMS-uh', devaki: 'DAY-vuh-kee', vasudeva: 'VAA-soo-DAY-vuh',
  surpanakha: 'shoorp-uh-NUH-khaa', maricha: 'MAA-ree-chuh', jatayu: 'juh-TAA-yoo',
  sugriva: 'soo-GREE-vuh', vali: 'VAA-lee', jambavan: 'JAAM-buh-vaan',
  vaisya: 'VUYSH-yuh', valmiki: 'vaal-MEE-kee', narada: 'NAA-ruh-duh',
  ikshvaku: 'ick-SHVAA-koo', dhanvantari: 'dhun-VUN-tuh-ree', mohini: 'moh-HEE-nee',
  rahu: 'RAA-hoo', vasuki: 'VAA-soo-kee', kurma: 'KOOR-muh', halahala: 'HUH-luh-huhl',
  kumbhakarna: 'koomb-huh-KUR-nuh', meghnada: 'MEGH-naad', lava: 'LUH-vuh', kusha: 'KOO-shuh',
  tulsidas: 'TOOL-see-daas', durvasa: 'door-VAA-suh',

  // ── places ──
  ayodhya: 'uh-YOADH-yaa', mithila: 'MITH-ih-laa', lanka: 'LUNG-kaa',
  kailash: 'ky-LAASH', vrindavan: 'VRIN-daa-vun', govardhan: 'go-VUR-dhun',
  kishkindha: 'kish-KIN-dhaa', mathura: 'MUTH-oo-raa', kashi: 'KAA-shee',
  yamuna: 'YUH-moo-naa', uttar: 'OOT-tuhr', pradesh: 'pruh-DAYSH',
  vanara: 'VAA-nuh-ruh', vanaras: 'VAA-nuh-ruhz',
  rakshasa: 'RAAK-shuh-suh', rakshasas: 'RAAK-shuh-suhz', ashoka: 'uh-SHOH-kuh',

  // ── more deities / kanda names / terms surfaced by the dry-run ──
  indra: 'IN-druh', yama: 'YUH-muh', uma: 'OO-maa', agni: 'UG-nee',
  sundara: 'SOON-duh-ruh', uttara: 'OOT-tuh-ruh', bala: 'BAA-luh',
  adi: 'AA-dee', kavya: 'KAAV-yuh', ganesh: 'guh-NAYSH', chaturthi: 'chuh-TOOR-tee',
  chalisa: 'chaa-LEE-saa', gopis: 'GOH-peez', gopi: 'GOH-pee', lila: 'LEE-laa',
  aranya: 'uh-RUN-yuh', kaustubha: 'KOWS-too-buh', kamadhenu: 'kaa-muh-DHAY-noo',
  airavata: 'eye-RAA-vuh-tuh', amrita: 'UM-ree-tuh', navratri: 'nuh-vuh-RAAT-ree',

  // ── texts & festivals ──
  mahabharata: 'muh-haa-BHAA-rut', ramayana: 'raa-MAA-yuh-nuh', gita: 'GEE-taa',
  diwali: 'dee-VAA-lee', holi: 'HOH-lee', navaratri: 'nuh-vuh-RAAT-ree',
  janmashtami: 'junm-AASH-tuh-mee', mandara: 'MUN-duh-ruh', setu: 'SAY-too',
  ganga: 'GUNG-gaa', neelakantha: 'nee-luh-KUN-tuh',
};

// Longest keys first, so "sanatana dharma" wins over "dharma", etc.
const KEYS = Object.keys(PRONUNCIATION).sort((a, b) => b.length - a.length);

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Replace every dictionary term (whole-word, case-insensitive) with its
// respelling. Returns { text, unmapped } where `unmapped` is the set of
// capitalized words we did NOT recognise (candidates to add to the dict).
export function applyPronunciation(input) {
  let text = input;
  for (const key of KEYS) {
    // \b works for single words; for hyphenated/spaced phrases guard the edges.
    const re = new RegExp(`(^|[^A-Za-z-])(${escapeRe(key)})(?![A-Za-z-])`, 'gi');
    text = text.replace(re, (_m, pre) => `${pre}${PRONUNCIATION[key]}`);
  }
  return { text, unmapped: findUnmapped(input) };
}

// Flag capitalized, non-sentence-initial words that look Sanskrit and are not
// in the dictionary — a cheap way to catch names that would fall back to the
// voice's default (often Americanized) pronunciation.
const ENGLISH_OK = new Set([
  'India', 'Indian', 'Indus', 'Persian', 'Persians', 'Greek', 'Greeks', 'Delhi',
  'Tibet', 'Sri', 'Lanka', 'Kerala', 'Bengal', 'Bihar',
  'Himalayas', 'Christianity', 'Islam', 'Buddhism', 'Jesus', 'Muhammad', 'Buddha',
  'Gujarat', 'Gandhi', 'Ambedkar', 'Hindu', 'Hindu', 'Hindus', 'God', 'Book',
  'Diwali', 'Holi', 'Sanskrit', 'Constitution', 'Dalit', 'Dalits', 'Northeast',
]);
function findUnmapped(text) {
  const known = new Set(KEYS.flatMap((k) => k.split(/[\s-]/)));
  const out = new Set();
  // capitalized words that are not at the very start of a sentence
  const re = /(?<=[a-z,;:]\s|\*\*)([A-Z][a-zA-Z]{2,})/g;
  let m;
  while ((m = re.exec(text))) {
    const w = m[1];
    const lw = w.toLowerCase();
    if (known.has(lw) || PRONUNCIATION[lw] || ENGLISH_OK.has(w)) continue;
    out.add(w);
  }
  return out;
}
