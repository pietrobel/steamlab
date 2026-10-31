export type SeasonId =
  | 'auto'
  | 'standard'
  | 'halloween'
  | 'natale'
  | 'inverno'
  | 'carnevale'
  | 'primavera'
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
    name: 'ScienzaLab Classico',
    shortName: 'Classico',
    emoji: '🔬',
    subtitle: 'Il laboratorio digitale di matematica, scienze, tecnologia e informatica per la scuola media.',
    bannerTag: 'Laboratorio Digitale Permanente',
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
    subtitle: 'Cristalli di neve esagonali, termodinamica del freddo e luci scintillanti per le feste!',
    bannerTag: 'Edizione Festività Natalizie 🎄❄️',
    mascotGreeting: '«Ogni fiocco di neve ha una simmetria esagonale perfetta grazie ai legami molecolari dell\'acqua. Buone feste scientifiche a tutti!»',
    mascotAuthor: 'Prof.ssa Ipazia & Prof. Sauro Natalizio',
    glowColors: {
      orb1: 'bg-red-600/15',
      orb2: 'bg-emerald-600/15',
      orb3: 'bg-amber-400/10',
    },
    headerBorder: 'border-red-500/40',
    badgeBg: 'bg-red-500/20',
    badgeText: 'text-red-300 border-red-500/40',
    accentGradient: 'from-red-400 via-emerald-300 to-amber-300',
    particleType: 'snow',
  },
  inverno: {
    id: 'inverno',
    name: 'Inverno & Ghiaccio',
    shortName: 'Inverno',
    emoji: '❄️',
    subtitle: 'Stati della materia, zero termico, aurore boreali e fisica delle basse temperature.',
    bannerTag: 'Stagione Invernale dei Laboratori ❄️',
    mascotGreeting: '«A zero gradi l\'acqua ghiaccia e aumenta di volume: un\'anomalia chimica che salva la vita nei laghi ghiacciati!»',
    mascotAuthor: 'Prof. Sauro dei Ghiacci',
    glowColors: {
      orb1: 'bg-sky-500/15',
      orb2: 'bg-cyan-500/15',
      orb3: 'bg-indigo-500/10',
    },
    headerBorder: 'border-sky-500/40',
    badgeBg: 'bg-sky-500/20',
    badgeText: 'text-sky-300 border-sky-500/40',
    accentGradient: 'from-sky-300 via-cyan-300 to-indigo-300',
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
 * Automatically calculates the seasonal theme based on current calendar date.
 */
export function getAutoSeasonalTheme(date: Date = new Date()): ConcreteSeasonId {
  const month = date.getMonth(); // 0 = Jan, 11 = Dec
  const day = date.getDate();

  // Halloween: 20 Oct - 5 Nov
  if ((month === 9 && day >= 20) || (month === 10 && day <= 5)) {
    return 'halloween';
  }

  // Natale & Capodanno & Epifania: 1 Dec - 6 Jan
  if (month === 11 || (month === 0 && day <= 6)) {
    return 'natale';
  }

  // Carnevale: indicativamente 7 Feb - 28 Feb
  if (month === 1 && day >= 7 && day <= 28) {
    return 'carnevale';
  }

  // Inverno rimanente: 7 Gen - 6 Feb
  if ((month === 0 && day > 6) || (month === 1 && day < 7)) {
    return 'inverno';
  }

  // Primavera: 21 Mar - 31 May
  if ((month === 2 && day >= 21) || month === 3 || month === 4) {
    return 'primavera';
  }

  // Estate: 1 Jun - 31 Aug
  if (month === 5 || month === 6 || month === 7) {
    return 'estate';
  }

  // Autunno: 1 Sep - 19 Oct e 6 Nov - 30 Nov
  if (month === 8 || (month === 9 && day < 20) || (month === 10 && day > 5)) {
    return 'autunno';
  }

  return 'standard';
}

export function getTheme(id: SeasonId): SeasonalTheme {
  const key: ConcreteSeasonId = id === 'auto' ? getAutoSeasonalTheme() : id;
  return SEASONAL_THEMES[key] || SEASONAL_THEMES.standard;
}
