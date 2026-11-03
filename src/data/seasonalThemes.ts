export type SeasonId =
  | 'auto'
  | 'standard'
  | 'halloween'
  | 'natale'
  | 'inverno'
  | 'carnevale'
  | 'primavera'
  | 'earthday'
  | 'estate'
  | 'autunno';

export type ConcreteSeasonId = Exclude<SeasonId, 'auto'>;

export interface SeasonalTheme {
  id: SeasonId;
  name: string;
  shortName: string;
  emoji: string;
  subtitle: string;
  bannerTag: string;
  mascotGreeting: string;
  mascotAuthor: string;
  glowColors: {
    orb1: string;
    orb2: string;
    orb3: string;
  };
  headerBorder: string;
  badgeBg: string;
  badgeText: string;
  accentGradient: string;
  particleType?: 'pumpkin' | 'snow' | 'confetti' | 'flower' | 'leaf' | 'sun';
}

export const SEASONAL_THEMES: Record<Exclude<SeasonId, 'auto'>, SeasonalTheme> = {
  standard: {
    id: 'standard',
    name: 'ScienzaLab Quotidiano (Normale)',
    shortName: 'Quotidiano',
    emoji: '🏫',
    subtitle: 'Aspetto predefinito per le lezioni ordinarie: pulito, concentrato e privo di distrazioni festive.',
    bannerTag: 'Anno Scolastico Ordinario 🏫🔬',
    mascotGreeting: '«La scienza e la tecnologia non sono formule da memorizzare, ma gli strumenti per comprendere e migliorare il nostro pianeta!»',
    mascotAuthor: 'Prof. Sauro, Ipazia, Rita & Ada',
    glowColors: {
      orb1: 'bg-indigo-500/10',
      orb2: 'bg-cyan-500/10',
      orb3: 'bg-emerald-500/5',
    },
    headerBorder: 'border-slate-800/80',
    badgeBg: 'bg-emerald-500/20',
    badgeText: 'text-emerald-300 border-emerald-500/30',
    accentGradient: 'from-emerald-300 via-cyan-300 to-indigo-300',
  },
  halloween: {
    id: 'halloween',
    name: 'Halloween Spettrale',
    shortName: 'Halloween',
    emoji: '🎃',
    subtitle: 'Pozioni chimiche, scheletri di tirannosauro e misteriosi enigmi matematici!',
    bannerTag: 'Edizione Speciale Halloween 🎃👻',
    mascotGreeting: '«Sapevi che i fossili di dinosauro sono i veri scheletri giganti di Halloween? Niente paura per la matematica: è solo un incantesimo di logica!»',
    mascotAuthor: 'Prof. Sauro lo Scienziato Spettrale',
    glowColors: {
      orb1: 'bg-orange-600/20',
      orb2: 'bg-purple-600/20',
      orb3: 'bg-amber-500/10',
    },
    headerBorder: 'border-orange-500/40',
    badgeBg: 'bg-orange-500/20',
    badgeText: 'text-orange-300 border-orange-500/40',
    accentGradient: 'from-orange-400 via-amber-300 to-purple-400',
    particleType: 'pumpkin',
  },
  natale: {
    id: 'natale',
    name: 'Natale & Festività',
    shortName: 'Natale',
    emoji: '🎄',
    subtitle: 'Luci scintillanti, abeti addobbati, regali scientifici, calore festivo e chimica delle stelle.',
    bannerTag: 'Feste di Natale & Capodanno 🎄🎁⭐',
    mascotGreeting: '«Buone Feste da tutta la squadra di ScienzaLab! Che questo Natale porti tanta curiosità scientifica, scoperte e doni educativi!»',
    mascotAuthor: 'La Squadra di ScienzaLab in Festa',
    glowColors: {
      orb1: 'bg-red-600/25',
      orb2: 'bg-emerald-600/25',
      orb3: 'bg-amber-400/20',
    },
    headerBorder: 'border-red-500/50',
    badgeBg: 'bg-red-500/25',
    badgeText: 'text-red-200 border-red-500/50',
    accentGradient: 'from-red-400 via-amber-300 to-emerald-400',
    particleType: 'snow',
  },
  inverno: {
    id: 'inverno',
    name: 'Inverno Polare & Ghiaccio',
    shortName: 'Inverno',
    emoji: '❄️',
    subtitle: 'Zero termico, fisica delle basse temperature, cristalli esagonali ed espansione anomala dell\'acqua.',
    bannerTag: 'Inverno Polare & Fisica del Freddo ❄️🧊🌌',
    mascotGreeting: '«Nel gelo dell\'inverno l\'acqua si comporta in modo straordinario: a 4°C ha la massima densità, perciò il ghiaccio galleggia e protegge la vita sul fondo dei laghi!»',
    mascotAuthor: 'Prof. Sauro & Prof.ssa Ipazia dei Ghiacci',
    glowColors: {
      orb1: 'bg-cyan-500/25',
      orb2: 'bg-sky-600/20',
      orb3: 'bg-blue-800/25',
    },
    headerBorder: 'border-cyan-500/50',
    badgeBg: 'bg-cyan-500/25',
    badgeText: 'text-cyan-200 border-cyan-500/50',
    accentGradient: 'from-cyan-300 via-sky-200 to-indigo-400',
    particleType: 'snow',
  },
  carnevale: {
    id: 'carnevale',
    name: 'Carnevale Scientifico',
    shortName: 'Carnevale',
    emoji: '🎭',
    subtitle: 'Scherzi della fisica, giochi di specchi ottici, reazioni effervescenti e coding a colori!',
    bannerTag: 'Carnevale della Scienza 🎭🎉',
    mascotGreeting: '«A Carnevale ogni scherzo vale, ma le leggi della fisica non mentono mai! Divertiti a sperimentare tra luci e maschere!»',
    mascotAuthor: 'Mia & Leo in Maschera',
    glowColors: {
      orb1: 'bg-fuchsia-600/20',
      orb2: 'bg-amber-500/20',
      orb3: 'bg-cyan-500/15',
    },
    headerBorder: 'border-fuchsia-500/40',
    badgeBg: 'bg-fuchsia-500/20',
    badgeText: 'text-fuchsia-300 border-fuchsia-500/40',
    accentGradient: 'from-fuchsia-400 via-amber-300 to-cyan-400',
    particleType: 'confetti',
  },
  primavera: {
    id: 'primavera',
    name: 'Primavera in Fiore',
    shortName: 'Primavera',
    emoji: '🌸',
    subtitle: 'Fotosintesi, risveglio della natura, biodiversità e germogli di nuova conoscenza.',
    bannerTag: 'Risveglio di Primavera 🌸🌱',
    mascotGreeting: '«Con l\'equinozio di primavera le ore di luce superano quelle di buio: la fotosintesi accelera e la curiosità rifiorisce!»',
    mascotAuthor: 'Prof.ssa Ada & Leo',
    glowColors: {
      orb1: 'bg-emerald-500/20',
      orb2: 'bg-pink-500/15',
      orb3: 'bg-amber-300/10',
    },
    headerBorder: 'border-emerald-500/40',
    badgeBg: 'bg-emerald-500/20',
    badgeText: 'text-emerald-300 border-emerald-500/40',
    accentGradient: 'from-emerald-300 via-pink-300 to-amber-200',
    particleType: 'flower',
  },
  earthday: {
    id: 'earthday',
    name: 'Earth Day & Settimana della Terra',
    shortName: 'Earth Day',
    emoji: '🌍',
    subtitle: 'Salvaguardia del pianeta, biodiversità, energie rinnovabili, riciclo ed ecologia integrale.',
    bannerTag: 'Settimana Mondiale della Terra 🌍🌱♻️',
    mascotGreeting: '«La Terra non è un\'eredità dei nostri padri, ma un prestito dei nostri figli: usiamo la scienza, la chimica verde e le tecnologie pulite per proteggerla!»',
    mascotAuthor: 'Chiara, Prof. Sauro & Prof.ssa Rita',
    glowColors: {
      orb1: 'bg-emerald-500/25',
      orb2: 'bg-cyan-500/20',
      orb3: 'bg-teal-500/15',
    },
    headerBorder: 'border-emerald-500/50',
    badgeBg: 'bg-emerald-500/25',
    badgeText: 'text-emerald-200 border-emerald-500/50',
    accentGradient: 'from-emerald-300 via-teal-200 to-cyan-400',
    particleType: 'flower',
  },
  estate: {
    id: 'estate',
    name: 'Estate Solare',
    shortName: 'Estate',
    emoji: '☀️',
    subtitle: 'Solstizio estivo, raggi ultravioletti, energie rinnovabili solari e astronomia notturna.',
    bannerTag: 'Estate Scientifica & Solare ☀️🏖️',
    mascotGreeting: '«Il Sole produce un\'infinita quantità di energia per fusione nucleare: catturiamola con i pannelli fotovoltaici e la fisica!»',
    mascotAuthor: 'Prof. Sauro sotto il Sole',
    glowColors: {
      orb1: 'bg-amber-500/20',
      orb2: 'bg-orange-500/15',
      orb3: 'bg-cyan-400/10',
    },
    headerBorder: 'border-amber-500/40',
    badgeBg: 'bg-amber-500/20',
    badgeText: 'text-amber-300 border-amber-500/40',
    accentGradient: 'from-amber-300 via-orange-300 to-yellow-200',
    particleType: 'sun',
  },
  autunno: {
    id: 'autunno',
    name: 'Autunno Dorato',
    shortName: 'Autunno',
    emoji: '🍂',
    subtitle: 'Caduta delle foglie, degradazione della clorofilla, carotenoidi e nuovi progetti scolastici.',
    bannerTag: 'Stagione Autunnale dei Laboratori 🍂',
    mascotGreeting: '«Le foglie ingialliscono perché la clorofilla verde si ritira, svelando i meravigliosi carotenoidi giallo-arancio!»',
    mascotAuthor: 'Prof.ssa Ipazia & Team',
    glowColors: {
      orb1: 'bg-amber-600/20',
      orb2: 'bg-orange-600/15',
      orb3: 'bg-red-600/10',
    },
    headerBorder: 'border-amber-600/40',
    badgeBg: 'bg-amber-600/20',
    badgeText: 'text-amber-300 border-amber-600/40',
    accentGradient: 'from-amber-400 via-orange-300 to-red-400',
    particleType: 'leaf',
  },
};

/**
 * Calcola automaticamente il tema in base alla data corrente:
 * I temi speciali/stagionali si attivano SOLO nei periodi iniziali della stagione o festività,
 * mentre per tutti gli altri giorni ordinari dell'anno si attiva il tema normale predefinito "ScienzaLab Quotidiano".
 */
export function getAutoSeasonalTheme(date: Date = new Date()): ConcreteSeasonId {
  const month = date.getMonth(); // 0 = Gennaio, 11 = Dicembre
  const day = date.getDate();

  // 1. Halloween: solo nel periodo della festa (24 Ottobre - 3 Novembre)
  if ((month === 9 && day >= 24) || (month === 10 && day <= 3)) {
    return 'halloween';
  }

  // 2. Natale & Capodanno & Epifania: solo nel periodo festivo (15 Dicembre - 6 Gennaio)
  if ((month === 11 && day >= 15) || (month === 0 && day <= 6)) {
    return 'natale';
  }

  // 3. Inizio Inverno Polare: solo nelle prime due settimane post-feste (7 Gennaio - 21 Gennaio)
  if (month === 0 && day >= 7 && day <= 21) {
    return 'inverno';
  }

  // 4. Carnevale scientifico: solo nella finestra di Carnevale (8 Febbraio - 22 Febbraio)
  if (month === 1 && day >= 8 && day <= 22) {
    return 'carnevale';
  }

  // 5. Inizio Primavera & Pasqua: solo nelle prime due settimane dall'equinozio (21 Marzo - 7 Aprile)
  if ((month === 2 && day >= 21) || (month === 3 && day <= 7)) {
    return 'primavera';
  }

  // 6. Earth Day & Settimana Mondiale della Terra: TUTTA LA SETTIMANA dal 18 al 26 Aprile (22 Aprile Earth Day)
  if (month === 3 && day >= 18 && day <= 26) {
    return 'earthday';
  }

  // 7. Inizio Estate & Fine Anno Scolastico: solo nelle prime settimane di giugno (1 Giugno - 21 Giugno)
  if (month === 5 && day >= 1 && day <= 21) {
    return 'estate';
  }

  // 8. Inizio Autunno & Rientro a Scuola: solo nelle prime settimane di avvio anno (10 Settembre - 30 Settembre)
  if (month === 8 && day >= 10 && day <= 30) {
    return 'autunno';
  }

  // In TUTTI gli altri giorni dell'anno senza festività (la maggior parte dei mesi di scuola):
  // Tema normale predefinito "ScienzaLab Quotidiano", pulito e didattico.
  return 'standard';
}

export function getTheme(id: SeasonId): SeasonalTheme {
  const key: ConcreteSeasonId = id === 'auto' ? getAutoSeasonalTheme() : id;
  return SEASONAL_THEMES[key] || SEASONAL_THEMES.standard;
}
