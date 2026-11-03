import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  RotateCw,
  Compass,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Waves,
  Lightbulb,
  PieChart,
  Shapes,
  Sparkles,
} from 'lucide-react';
import { profIpaziaImg } from '../../data/mascots';

interface StoriaIpaziaSectionProps {
  onBackToDirectory?: () => void;
  isStandaloneModal?: boolean;
}

export const StoriaIpaziaSection: React.FC<StoriaIpaziaSectionProps> = ({
  onBackToDirectory,
}) => {
  const [activeTab, setActiveTab] = useState<'storia' | 'frazioni' | 'angoli' | 'idroscopio' | 'quiz'>('storia');

  // Interactive Fractions state (1ª Media Aritmetica)
  const [numerator, setNumerator] = useState<number>(3);
  const [denominator, setDenominator] = useState<number>(4);

  // Interactive Angles & Triangles state (1ª Media Geometria)
  const [angleDegrees, setAngleDegrees] = useState<number>(90);
  const [triangleAngleA, setTriangleAngleA] = useState<number>(60);
  const [triangleAngleB, setTriangleAngleB] = useState<number>(70);
  const triangleAngleC = Math.max(10, 180 - triangleAngleA - triangleAngleB);

  // Interactive Hydrometer (Idroscopio) state (1ª Media Scienze)
  const [selectedLiquid, setSelectedLiquid] = useState<'olio' | 'acqua' | 'mare' | 'miele'>('acqua');

  // Quiz State
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Fraction analysis for 1ª Media
  const fractionAnalysis = useMemo(() => {
    const n = Math.max(1, numerator);
    const d = Math.max(1, denominator);
    const value = n / d;

    let type = '';
    let description = '';
    let badgeColor = '';

    if (n < d) {
      type = 'Frazione Propria';
      description = 'Il numeratore è minore del denominatore: rappresenta una quantità minore di 1 intero (meno di una pizza intera!).';
      badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    } else if (n % d === 0) {
      type = 'Frazione Apparente';
      description = `Il numeratore è un multiplo esatto del denominatore: rappresenta esattamente ${n / d} intero/i completo/i!`;
      badgeColor = 'bg-purple-500/20 text-purple-300 border-purple-500/40';
    } else {
      type = 'Frazione Impropria';
      description = 'Il numeratore è maggiore del denominatore: rappresenta più di un intero (serve più di una pizza per rappresentarla!).';
      badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }

    return { n, d, value, type, description, badgeColor };
  }, [numerator, denominator]);

  // Angle classification for 1ª Media
  const angleClassification = useMemo(() => {
    const deg = angleDegrees;
    if (deg === 0) {
      return {
        name: 'Angolo Nullo (0°)',
        desc: 'I due lati sono sovrapposti e non c\'è ampiezza.',
        color: 'text-slate-400',
        badge: 'bg-slate-800 text-slate-300',
      };
    } else if (deg < 90) {
      return {
        name: `Angolo Acuto (${deg}°)`,
        desc: 'È più stretto di un angolo retto (minore di 90°). Lo trovi nella punta di una freccia, nel becco degli uccelli o nei triangoli acutangoli!',
        color: 'text-cyan-400',
        badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      };
    } else if (deg === 90) {
      return {
        name: 'Angolo Retto (90°)',
        desc: 'È l\'angolo fondamentale della geometria! I due lati sono perfettamente perpendicolari tra loro, come gli spigoli di un foglio, di un banco o di una porta.',
        color: 'text-emerald-400',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      };
    } else if (deg < 180) {
      return {
        name: `Angolo Ottuso (${deg}°)`,
        desc: 'È più ampio di un angolo retto ma minore di un angolo piatto (compreso tra 90° e 180°). Lo trovi nelle lancette dell\'orologio alle 10:10 o in un ombrello aperto!',
        color: 'text-amber-400',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      };
    } else if (deg === 180) {
      return {
        name: 'Angolo Piatto (180°)',
        desc: 'I due lati sono due semirette opposte che formano una linea retta continua. Vale esattamente 2 angoli retti (90° + 90° = 180°)!',
        color: 'text-indigo-400',
        badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
      };
    } else if (deg === 360) {
      return {
        name: 'Angolo Giro (360°)',
        desc: 'Un giro completo! Vale 4 angoli retti (90° × 4 = 360°) ed è la rotazione completa di una ruota o di un compasso.',
        color: 'text-rose-400',
        badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      };
    } else {
      return {
        name: `Angolo Concavo (${deg}°)`,
        desc: 'È maggiore di un angolo piatto (più di 180°). Contiene i prolungamenti dei suoi lati.',
        color: 'text-purple-400',
        badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      };
    }
  }, [angleDegrees]);

  // Liquid density properties for Idroscopio (1ª Media Scienze)
  const LIQUIDS_DATA = {
    olio: {
      name: 'Olio d\'Oliva',
      density: 0.92,
      floatBottom: 66, // Affonda: 82% immerso
      submergedPercent: '82% immerso',
      positionLabel: 'Affonda di più (asta quasi tutta immersa)',
      positionColor: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
      desc: 'Meno denso dell\'acqua (0.92 g/cm³). Riceve meno spinta idrostatica, quindi l\'idroscopio deve affondare maggiormente nell\'olio per raggiungere l\'equilibrio.',
      color: 'bg-amber-400/35 border-amber-500/50 text-amber-300',
    },
    acqua: {
      name: 'Acqua Dolce (Fiume Nilo)',
      density: 1.0,
      floatBottom: 80, // Livello di taratura centrale: 70% immerso
      submergedPercent: '70% immerso',
      positionLabel: 'Livello standard (tacca centrale 1.0)',
      positionColor: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
      desc: 'Densità di riferimento: 1.00 g/cm³. L\'idroscopio si stabilizza esattamente sulla tacca centrale della scala graduata.',
      color: 'bg-cyan-400/35 border-cyan-500/50 text-cyan-300',
    },
    mare: {
      name: 'Acqua Salata (Mar Mediterraneo)',
      density: 1.03,
      floatBottom: 86, // Circa 64% immerso, emerge di più dell'acqua dolce
      submergedPercent: '64% immerso',
      positionLabel: 'Emerge di più (sale a monte della taratura)',
      positionColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
      desc: 'Più densa dell\'acqua dolce per i sali disciolti (1.03 g/cm³). La maggiore spinta di Archimede fa emergere l\'asta di qualche millimetro in più rispetto all\'acqua dolce.',
      color: 'bg-emerald-400/35 border-emerald-500/50 text-emerald-300',
    },
    miele: {
      name: 'Miele d\'Alessandria',
      density: 1.42,
      floatBottom: 100, // Circa 52% immerso: emerge chiaramente ma mantiene il bulbo immerso per stabilità
      submergedPercent: '52% immerso',
      positionLabel: 'Emerge nettamente (spinta idrostatica elevata)',
      positionColor: 'text-orange-400 bg-orange-500/20 border-orange-500/30',
      desc: 'Densità elevata (1.42 g/cm³): la spinta idrostatica è circa il 42% maggiore rispetto all\'acqua. L\'idroscopio emerge con circa metà asta fuori, mantenendo il bulbo immerso per non ribaltarsi.',
      color: 'bg-orange-500/40 border-orange-500/50 text-orange-300',
    },
  };

  // QUIZ QUESTIONS FOCUSED SPECIFICALLY ON 1ª MEDIA
  const QUIZ_QUESTIONS = [
    {
      id: 1,
      question: 'In quale celebre città del mondo antico visse, studiò e insegnò Ipazia?',
      options: [
        'Atene, in Grecia',
        'Roma antica, in Italia',
        'Alessandria d\'Egitto, celebre per la Grande Biblioteca e il Faro',
        'Parigi, in Francia',
      ],
      correct: 2,
      explanation: 'Esatto! Ipazia visse ad Alessandria d\'Egitto (circa 370 - 415 d.C.), il porto e centro culturale più famoso del Mediterraneo antico.',
    },
    {
      id: 2,
      question: 'Che cosa significa la frazione 3/4 di una torta?',
      options: [
        'Mangiare 3 torte intere e buttarne via 4',
        'Dividere la torta in 4 parti uguali e prenderne 3',
        'Dividere la torta in 3 parti e aggiungerne 4',
        'Moltiplicare la torta per 7',
      ],
      correct: 1,
      explanation: 'Bravissimo! Il denominatore (4) indica in quante parti uguali è diviso l\'intero, e il numeratore (3) quante parti ne consideriamo.',
    },
    {
      id: 3,
      question: 'Quanto misura un angolo retto in geometria?',
      options: [
        '45 gradi',
        '90 gradi (esattamente come lo spigolo di un foglio di quaderno)',
        '180 gradi',
        '360 gradi',
      ],
      correct: 1,
      explanation: 'Perfetto! L\'angolo retto misura esattamente 90°. Due angoli retti uniti formano un angolo piatto da 180°!',
    },
    {
      id: 4,
      question: 'Quanto vale la somma di tutti gli angoli interni di QUALSIASI triangolo?',
      options: [
        'Sempre 90 gradi',
        'Dipende se il triangolo è grande o piccolo',
        'Sempre 180 gradi (ovvero la misura esatta di un angolo piatto!)',
        '360 gradi',
      ],
      correct: 2,
      explanation: 'Meraviglioso! Che sia equilatero, isoscele o scaleno, la somma dei tre angoli interni di un triangolo fa sempre e solo 180°.',
    },
    {
      id: 5,
      question: 'Quale strumento scientifico a galleggiamento progettò Ipazia per misurare la densità dei liquidi?',
      options: [
        'Il telescopio spaziale',
        'L\'idroscopio (un tubo graduato a galleggiamento basato sulla spinta di Archimede)',
        'Il cronometro digitale',
        'La bussola magnetica da tasca',
      ],
      correct: 1,
      explanation: 'Esatto! L\'idroscopio era un densimetro graduato con un peso di piombo che galleggiava a diverse altezze secondo la densità del liquido.',
    },
    {
      id: 6,
      question: 'Se una frazione ha il numeratore minore del denominatore (come 2/5), come si chiama?',
      options: [
        'Frazione propria (è minore di 1 intero)',
        'Frazione impropria',
        'Frazione apparente',
        'Frazione invisibile',
      ],
      correct: 0,
      explanation: 'Ottimo! Le frazioni con numeratore minore del denominatore si chiamano proprie perché rappresentano una porzione reale di un singolo intero.',
    },
    {
      id: 7,
      question: 'Quale grande insegnamento di Ipazia è fondamentale per tutti noi ancora oggi?',
      options: [
        'Copiare sempre dai compagni senza riflettere',
        '«Difendi il tuo diritto di pensare, perché anche pensare male è meglio che non pensare affatto.»',
        'La matematica non serve a niente nella vita reale',
        'Bisogna studiare solo il giorno prima della verifica',
      ],
      correct: 1,
      explanation: 'Parole indimenticabili! Ipazia ci insegna ad avere curiosità, a fare domande e a ragionare con la nostra testa con metodo e libertà.',
    },
  ];

  const handleSelectQuizOption = (index: number) => {
    if (hasAnswered) return;
    setSelectedOption(index);
    setHasAnswered(true);

    const isCorrect = index === QUIZ_QUESTIONS[quizIndex].correct;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Hero Header narrated by Prof.ssa Ipazia for 1ª Media */}
      <div className="relative p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-indigo-950/90 via-slate-900 to-purple-950/90 border border-indigo-500/40 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-4 ring-indigo-500/60 shadow-xl shadow-indigo-950/60 bg-slate-900">
                <img
                  src={profIpaziaImg}
                  alt="Prof.ssa Ipazia"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-md bg-indigo-600 text-[10px] font-black uppercase tracking-wider text-white border border-indigo-400">
                1ª Media
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  🏛️ Laboratorio di Matematica & Scienze
                </span>
                <span className="text-xs text-indigo-300 font-semibold">Ideale per la Classe 1ª Media</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">
                La Matematica di Ipazia ad Alessandria d'Egitto
              </h2>
              <p className="text-xs sm:text-sm text-indigo-200/90 max-w-2xl mt-1 leading-relaxed">
                Scopri con la <strong className="text-white">Prof.ssa Ipazia</strong> il mondo antico: frazioni visive con i papiri del Nilo, angoli e triangoli da 180°, l'idroscopio e la sfida a quiz per giovani scienziati!
              </p>
            </div>
          </div>

          {onBackToDirectory && (
            <button
              onClick={onBackToDirectory}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 transition-all shrink-0 active:scale-95 touch-manipulation self-end md:self-center"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Torna alla Directory</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Navigation (Touch scrollable) */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 overflow-x-auto pb-1.5 scrollbar-none touch-pan-x">
        <button
          onClick={() => setActiveTab('storia')}
          className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 active:scale-95 touch-manipulation whitespace-nowrap ${
            activeTab === 'storia'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <BookOpen className="w-4 h-4 text-indigo-300" />
          <span>1. Alessandria & La Vita</span>
        </button>

        <button
          onClick={() => setActiveTab('frazioni')}
          className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 active:scale-95 touch-manipulation whitespace-nowrap ${
            activeTab === 'frazioni'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <PieChart className="w-4 h-4 text-emerald-300" />
          <span>2. Frazioni & Papiri (Aritmetica)</span>
        </button>

        <button
          onClick={() => setActiveTab('angoli')}
          className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 active:scale-95 touch-manipulation whitespace-nowrap ${
            activeTab === 'angoli'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <Shapes className="w-4 h-4 text-cyan-300" />
          <span>3. Angoli & Triangoli da 180° (Geometria)</span>
        </button>

        <button
          onClick={() => setActiveTab('idroscopio')}
          className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 active:scale-95 touch-manipulation whitespace-nowrap ${
            activeTab === 'idroscopio'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <Waves className="w-4 h-4 text-amber-300" />
          <span>4. L'Idroscopio (Scienze & Densità)</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 active:scale-95 touch-manipulation whitespace-nowrap ${
            activeTab === 'quiz'
              ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg shadow-amber-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-300" />
          <span>5. La Sfida di Ipazia (Quiz 1ª Media)</span>
        </button>
      </div>

      {/* TAB 1: STORIA & VITA DI IPAZIA (1ª MEDIA) */}
      {activeTab === 'storia' && (
        <div className="space-y-6 animate-fade-in">
          {/* First-person narration card */}
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 relative">
            <div className="flex items-start gap-4">
              <span className="text-3xl shrink-0">📜</span>
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Benvenuti nella mia città: Alessandria d'Egitto!
                </h3>
                <blockquote className="text-sm sm:text-base text-slate-300 leading-relaxed italic border-l-4 border-indigo-500 pl-4 py-1">
                  «Ciao ragazze e ragazzi di prima media! Sono Ipazia. Più di 1600 anni fa vivevo ad Alessandria d'Egitto, una città magica tra il deserto e il Mar Mediterraneo. C'era un faro alto come un palazzo di quaranta piani e la più grande biblioteca del mondo antico, piena di rotoli di papiro scritti a mano. Mio padre Teone mi ha insegnato la matematica come un gioco appassionante: contare le stelle, misurare gli angoli dei monumenti e non aver mai paura di sbagliare o di fare domande curiose!»
                </blockquote>
              </div>
            </div>
          </div>

          {/* 3 Pillars for 1ª Media */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl mb-3">
                🏛️
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Il Faro e la Biblioteca</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Ad Alessandria confluivano studenti da tutto il mondo per imparare la geometria, l'astronomia e il calcolo delle frazioni. Ipazia teneva lezioni aperte a tutti, incoraggiando la collaborazione e l'amicizia tra i giovani.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl mb-3">
                🌿
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">La Mente e il Corpo</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Teone educò Ipazia non solo sui libri, ma anche con lo sport, la corsa e la cura della salute: «Una mente brillante ha bisogno di un corpo sano e allenato!».
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl mb-3">
                ✨
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Il Pensiero Libero</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                «Difendi il tuo diritto di pensare». Per Ipazia la matematica è il miglior allenamento per imparare a ragionare con la propria testa e diventare persone libere, giuste e coraggiose!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LE FRAZIONI VISIVE & I PAPIRI DI ALESSANDRIA (1ª MEDIA ARITMETICA) */}
      {activeTab === 'frazioni' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Aritmetica di 1ª Media
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Le Frazioni Visive: Dividere l'Intero con i Papiri di Ipazia
                </h3>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => { setNumerator(1); setDenominator(2); }}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 hover:text-white"
                >
                  Metà (1/2)
                </button>
                <button
                  onClick={() => { setNumerator(3); setDenominator(4); }}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 hover:text-white"
                >
                  Tre quarti (3/4)
                </button>
                <button
                  onClick={() => { setNumerator(5); setDenominator(4); }}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 hover:text-white"
                >
                  Impropria (5/4)
                </button>
                <button
                  onClick={() => { setNumerator(4); setDenominator(2); }}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 hover:text-white"
                >
                  Apparente (4/2 = 2)
                </button>
              </div>
            </div>

            {/* Split: Interactive Controllers + Visual Cake & Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Controllers & Fraction representation */}
              <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-5">
                <div className="text-center py-2">
                  <span className="text-xs text-slate-400 font-semibold block mb-2">Frazione selezionata:</span>
                  <div className="inline-flex flex-col items-center justify-center font-black font-mono text-3xl sm:text-4xl px-6 py-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner">
                    <span className="text-emerald-400">{numerator}</span>
                    <div className="w-16 h-1 bg-white my-1 rounded-full" />
                    <span className="text-indigo-400">{denominator}</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-400">
                    Valore decimale: <strong className="text-white">{(numerator / denominator).toFixed(2)}</strong>
                  </div>
                </div>

                {/* Slider Numeratore */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-bold">Numeratore (parti considerate):</span>
                    <span className="text-emerald-400 font-black font-mono text-sm">{numerator}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={numerator}
                    onChange={(e) => setNumerator(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 touch-manipulation"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>1</span><span>4</span><span>8</span>
                  </div>
                </div>

                {/* Slider Denominatore */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-bold">Denominatore (parti dell'intero):</span>
                    <span className="text-indigo-400 font-black font-mono text-sm">{denominator}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={denominator}
                    onChange={(e) => setDenominator(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 touch-manipulation"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>1</span><span>4</span><span>8</span>
                  </div>
                </div>
              </div>

              {/* Graphical Display: Circle Pie & Strip Bar */}
              <div className="lg:col-span-7 space-y-4">
                {/* Visual Pizza / Pie Chart representation */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center gap-6 justify-around">
                  {/* SVG Pie */}
                  <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {/* Background circle */}
                      <circle cx="50" cy="50" r="45" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                      {/* Colored slices */}
                      {Array.from({ length: denominator }).map((_, i) => {
                        const sliceAngle = 360 / denominator;
                        const startAngle = (i * sliceAngle * Math.PI) / 180;
                        const endAngle = ((i + 1) * sliceAngle * Math.PI) / 180;

                        const x1 = 50 + 45 * Math.cos(startAngle);
                        const y1 = 50 + 45 * Math.sin(startAngle);
                        const x2 = 50 + 45 * Math.cos(endAngle);
                        const y2 = 50 + 45 * Math.sin(endAngle);

                        const isColored = i < numerator;

                        return (
                          <path
                            key={i}
                            d={`M 50 50 L ${x1} ${y1} A 45 45 0 0 1 ${x2} ${y2} Z`}
                            fill={isColored ? '#10b981' : '#1e293b'}
                            stroke="#0f172a"
                            strokeWidth="1.5"
                            className="transition-colors duration-300"
                          />
                        );
                      })}
                    </svg>
                    <span className="absolute text-xs font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded shadow">
                      {numerator}/{denominator}
                    </span>
                  </div>

                  {/* Visual Strip / Papiro Bar */}
                  <div className="flex-1 w-full space-y-2">
                    <span className="text-xs font-bold text-slate-300 block">
                      Rappresentazione a striscia (Rotolo di papiro diviso in {denominator} parti):
                    </span>
                    <div className="w-full h-10 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 flex shadow-inner">
                      {Array.from({ length: denominator }).map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-full border-r border-slate-950 flex items-center justify-center text-xs font-bold transition-all ${
                            i < numerator ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          1/{denominator}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Classification Banner for 1ª media */}
                <div className={`p-4 rounded-2xl border ${fractionAnalysis.badgeColor} transition-all`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold uppercase tracking-wider text-white">
                      Tipo: {fractionAnalysis.type}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {fractionAnalysis.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GLI ANGOLI & I TRIANGOLI (1ª MEDIA GEOMETRIA) */}
      {activeTab === 'angoli' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Geometria di 1ª Media
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Il Goniometro di Ipazia & La Magia dei Triangoli da 180°
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Ad Alessandria d'Egitto, gli astronomi e i geometri misuravano gli angoli nel cielo con l'astrolabio. Scopri come si classificano gli angoli e perché tutti i triangoli del mondo hanno angoli che sommano a 180°!
              </p>
            </div>

            {/* Split: Interactive Goniometer + Triangles Theorem */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Goniometer Simulation */}
              <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                <span className="text-xs font-bold text-slate-400 mb-2">Goniometro Interattivo:</span>
                
                {/* SVG Protractor */}
                <div className="relative w-56 h-36 flex items-end justify-center">
                  <svg viewBox="0 0 200 110" className="w-full h-full">
                    {/* Semi-circle arc */}
                    <path d="M 10 100 A 90 90 0 0 1 190 100 Z" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                    
                    {/* Angle arc filled */}
                    {(() => {
                      const rad = (Math.min(180, angleDegrees) * Math.PI) / 180;
                      const x = 100 + 80 * Math.cos(Math.PI - rad);
                      const y = 100 - 80 * Math.sin(Math.PI - rad);
                      return (
                        <path
                          d={`M 100 100 L 180 100 A 80 80 0 0 0 ${x} ${y} Z`}
                          fill="#06b6d4"
                          opacity="0.35"
                        />
                      );
                    })()}

                    {/* Fixed base line */}
                    <line x1="100" y1="100" x2="190" y2="100" stroke="#94a3b8" strokeWidth="3" />

                    {/* Rotating ray */}
                    {(() => {
                      const rad = (Math.min(180, angleDegrees) * Math.PI) / 180;
                      const x = 100 + 85 * Math.cos(Math.PI - rad);
                      const y = 100 - 85 * Math.sin(Math.PI - rad);
                      return <line x1="100" y1="100" x2={x} y2={y} stroke="#38bdf8" strokeWidth="3" />;
                    })()}

                    {/* Center point */}
                    <circle cx="100" cy="100" r="4" fill="#f59e0b" />
                  </svg>
                </div>

                {/* Slider */}
                <div className="w-full mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span>0°</span>
                    <span className="text-white font-bold bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                      Ampiezza: {angleDegrees}°
                    </span>
                    <span>180°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    value={angleDegrees}
                    onChange={(e) => setAngleDegrees(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 touch-manipulation"
                  />
                </div>

                {/* Classification pill */}
                <div className="mt-3 text-center">
                  <span className={`text-sm font-bold block ${angleClassification.color}`}>
                    {angleClassification.name}
                  </span>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    {angleClassification.desc}
                  </p>
                </div>
              </div>

              {/* Triangle Sum 180° Demonstration */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                      Il Grande Teorema di Geometria
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    La Somma degli Angoli Interni di un Triangolo è SEMPRE 180°!
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Non importa come disegni il triangolo: se tagli i tre angoli e li metti uno accanto all'altro, formeranno sempre e senza eccezioni un perfetto <strong className="text-cyan-300">angolo piatto da 180°</strong>.
                  </p>

                  {/* Interactive triangle angles adjuster */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-indigo-400 font-bold">Angolo α: {triangleAngleA}°</span>
                      <span className="text-cyan-400 font-bold">Angolo β: {triangleAngleB}°</span>
                      <span className="text-emerald-400 font-bold">Angolo γ: {triangleAngleC}°</span>
                    </div>

                    {/* Sum visualization */}
                    <div className="w-full h-6 rounded-lg overflow-hidden flex border border-slate-700 font-mono text-[10px] font-bold text-slate-950 shadow">
                      <div style={{ width: `${(triangleAngleA / 180) * 100}%` }} className="bg-indigo-500 flex items-center justify-center">α</div>
                      <div style={{ width: `${(triangleAngleB / 180) * 100}%` }} className="bg-cyan-400 flex items-center justify-center">β</div>
                      <div style={{ width: `${(triangleAngleC / 180) * 100}%` }} className="bg-emerald-400 flex items-center justify-center">γ</div>
                    </div>

                    <div className="text-center text-xs font-bold text-white pt-1">
                      {triangleAngleA}° + {triangleAngleB}° + {triangleAngleC}° = <span className="text-emerald-400 text-sm">180° (Angolo Piatto)</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-indigo-200 leading-relaxed">
                    <strong className="text-white">Regola d'oro di prima media:</strong> se conosci due angoli di un triangolo (es. 50° e 60°), puoi sempre trovare il terzo facendo: <code className="bg-indigo-900/60 px-1.5 py-0.5 rounded text-white font-mono">180° - (50° + 60°) = 70°</code>!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: L'IDROSCOPIO & IL GALLEGGIAMENTO (1ª MEDIA SCIENZE) */}
      {activeTab === 'idroscopio' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-2">
              L'Idroscopio di Ipazia: La Scienza della Densità e del Galleggiamento
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Nelle scienze di prima media studiamo la materia, il volume e la densità. L'allievo di Ipazia, <strong className="text-indigo-300">Sinesio di Cirene</strong>, le chiese uno strumento per misurare quanto fosse "pesante" o "puro" un liquido. Ipazia costruì per lui un <strong className="text-cyan-300">idroscopio</strong> graduato!
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Esperimento Virtuale di Laboratorio
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">
                  Immergi l'Idroscopio in Liquidi Diversi:
                </h4>
              </div>

              {/* Liquid Picker Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                {(['olio', 'acqua', 'mare', 'miele'] as const).map((liq) => {
                  const isSelected = selectedLiquid === liq;
                  return (
                    <button
                      key={liq}
                      onClick={() => setSelectedLiquid(liq)}
                      className={`min-h-[42px] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 touch-manipulation ${
                        isSelected
                          ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-400'
                          : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                      }`}
                    >
                      {LIQUIDS_DATA[liq].name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Split: Vessel visualizer + Physic note */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Vessel Drawing */}
              <div className="md:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[300px]">
                {/* Visual Beaker Container */}
                <div className="relative w-44 h-64 border-x-4 border-b-4 border-slate-600 rounded-b-2xl overflow-hidden bg-slate-900/80 shadow-inner flex items-end justify-center">
                  {/* Liquid inside (Height 160px from floor) */}
                  <div
                    className={`w-full h-40 transition-colors duration-500 relative ${LIQUIDS_DATA[selectedLiquid].color}`}
                  >
                    {/* Waterline / Pelo libero del liquido */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/60 shadow-sm border-t border-white/80" />
                    <span className="absolute top-1.5 right-2 text-[9px] font-mono font-bold text-white/90 bg-slate-950/60 px-1.5 py-0.5 rounded">
                      Livello liquido
                    </span>
                  </div>

                  {/* Floating Hydrometer Tube (Corrected physics: floatBottom is higher for denser liquids) */}
                  <div
                    className="absolute w-6 bg-gradient-to-b from-amber-100 via-slate-100 to-amber-200 border-2 border-slate-800 rounded-full shadow-2xl transition-all duration-700 ease-out flex flex-col items-center justify-between py-1.5 z-10"
                    style={{
                      height: '115px',
                      bottom: `${LIQUIDS_DATA[selectedLiquid].floatBottom}px`,
                    }}
                  >
                    {/* Upper stem markings (low density graduations) */}
                    <div className="w-full flex flex-col items-center gap-1.5 pt-0.5">
                      <div className="w-3.5 h-0.5 bg-red-600" title="0.9 g/cm³" />
                      <div className="w-3.5 h-0.5 bg-cyan-700" title="1.0 g/cm³" />
                      <div className="w-3.5 h-0.5 bg-emerald-700" title="1.03 g/cm³" />
                      <div className="w-3.5 h-0.5 bg-purple-700" title="1.42 g/cm³" />
                    </div>

                    {/* Lead ballast bulb at the base */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-900 shadow-inner flex items-center justify-center text-[7px] text-slate-300 font-bold"
                        title="Zavorra di piombo di Ipazia"
                      >
                        Pb
                      </div>
                    </div>
                  </div>
                </div>

                {/* Density and Float State Badges */}
                <div className="mt-3.5 flex flex-col items-center gap-1.5 text-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">Densità:</span>
                    <strong className="text-sm text-white font-mono">{LIQUIDS_DATA[selectedLiquid].density} g/cm³</strong>
                  </div>
                  <div className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${LIQUIDS_DATA[selectedLiquid].positionColor}`}>
                    {LIQUIDS_DATA[selectedLiquid].positionLabel} • {LIQUIDS_DATA[selectedLiquid].submergedPercent}
                  </div>
                </div>
              </div>

              {/* Scientific Note */}
              <div className="md:col-span-7 space-y-3">
                {/* Core Physics Rule Highlight Box */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 via-cyan-950/30 to-slate-900 border border-emerald-500/40 shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                    <h5 className="text-xs sm:text-sm font-bold text-white">
                      Principio di Archimede & Densità: La Regola del Galleggiamento
                    </h5>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Secondo la <em>Spinta Idrostatica di Archimede</em> (<span className="font-mono text-cyan-300">F = d · V · g</span>), un corpo che galleggia sposta un peso di liquido pari al proprio peso totale.<br />
                    • Nei liquidi a <strong>maggiore densità</strong> (come l'acqua salata e il miele), la spinta verso l'alto per unità di volume è maggiore: serve immergere meno volume, quindi l'idrometro <strong>emerge e sta più in alto</strong>.<br />
                    • Nei liquidi a <strong>minore densità</strong> (come l'olio d'oliva), la spinta è inferiore: per compensare il proprio peso l'idrometro deve affondare di più, perciò <strong>sta più in basso</strong>.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <h6 className="text-xs font-bold text-amber-300 mb-1">
                    Comportamento con {LIQUIDS_DATA[selectedLiquid].name}:
                  </h6>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {LIQUIDS_DATA[selectedLiquid].desc}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-900/60 text-xs text-indigo-200 leading-relaxed">
                  <strong className="text-white block mb-0.5">La Lettera 15 di Sinesio a Ipazia:</strong>
                  «Ho urgente bisogno di un idroscopio per calcolare il peso specifico dell'acqua che bevo. Si tratta di un tubo cilindrico con sopra incise linee orizzontali e un peso sul fondo...». Grazie a questa lettera, gli storici hanno potuto ricostruire fedelmente lo strumento!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: IL QUIZ DI IPAZIA (1ª MEDIA) */}
      {activeTab === 'quiz' && (
        <div className="space-y-6 animate-fade-in">
          {!quizFinished ? (
            <div className="p-5 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 relative">
              {/* Header quiz progress */}
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                    {quizIndex + 1}
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    Domanda {quizIndex + 1} di {QUIZ_QUESTIONS.length} (Classe 1ª Media)
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-300">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Punti: {quizScore} / {QUIZ_QUESTIONS.length}</span>
                </div>
              </div>

              {/* Current Question */}
              <div className="mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {QUIZ_QUESTIONS[quizIndex].question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {QUIZ_QUESTIONS[quizIndex].options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === QUIZ_QUESTIONS[quizIndex].correct;

                  let btnStyle = 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700/80';
                  if (hasAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-2 ring-rose-500/50';
                    } else {
                      btnStyle = 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizOption(idx)}
                      disabled={hasAnswered}
                      className={`w-full min-h-[48px] p-3.5 sm:p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 active:scale-[0.99] touch-manipulation ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-900 text-slate-400 flex items-center justify-center text-xs font-bold shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {hasAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {hasAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation note by Ipazia after answering */}
              {hasAnswered && (
                <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 mb-6 flex items-start gap-3 animate-fade-in">
                  <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 ring-2 ring-indigo-400">
                    <img src={profIpaziaImg} alt="Prof.ssa Ipazia" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-xs sm:text-sm">
                    <span className="font-bold text-white block mb-0.5">Spiegazione di Prof.ssa Ipazia:</span>
                    <p className="text-indigo-200 leading-relaxed">
                      {QUIZ_QUESTIONS[quizIndex].explanation}
                    </p>
                  </div>
                </div>
              )}

              {/* Next Button */}
              {hasAnswered && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuizQuestion}
                    className="min-h-[44px] inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-950/50 transition-all active:scale-95 touch-manipulation"
                  >
                    <span>{quizIndex < QUIZ_QUESTIONS.length - 1 ? 'Prossima Domanda' : 'Vedi Risultati'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Celebration Completion Screen */
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center relative overflow-hidden animate-fade-in">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-4xl mb-4 border border-amber-500/40 shadow-xl shadow-amber-950/60">
                🌿
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Sfida Completata!
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Alloro Alessandrino di Ipazia (Classe 1ª Media)
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                Hai risposto correttamente a <strong className="text-emerald-400">{quizScore}</strong> su <strong className="text-white">{QUIZ_QUESTIONS.length}</strong> domande!
              </p>

              {/* Grade Certificate badge */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-indigo-950/50 border border-indigo-500/40 mb-8 text-left flex items-center gap-4">
                <img src={profIpaziaImg} alt="Ipazia" className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-400 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-white block text-sm">
                    {quizScore >= 6
                      ? 'Diploma: Campione di Matematica di Alessandria ⭐⭐⭐'
                      : quizScore >= 4
                      ? 'Diploma: Giovane Allievo di Ipazia ⭐⭐'
                      : 'Diploma: Esploratore Curioso della Scienza ⭐'}
                  </span>
                  <span className="text-indigo-200">
                    «Bravissimo! Con le frazioni, gli angoli e l'idroscopio hai fatto un inizio di scuola media eccezionale!» — Prof.ssa Ipazia
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 flex-wrap">
                <button
                  onClick={handleResetQuiz}
                  className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 transition-all active:scale-95 touch-manipulation"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Rigioca il Quiz</span>
                </button>

                <button
                  onClick={() => setActiveTab('storia')}
                  className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all active:scale-95 touch-manipulation"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Rileggi la Storia di Ipazia</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
