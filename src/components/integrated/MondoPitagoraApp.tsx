import React, { useState, useMemo } from 'react';
import {
  Compass,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  RefreshCw,
  BookOpen,
  Calculator,
  HelpCircle,
  Shapes,
  Maximize2,
  Check,
} from 'lucide-react';
import { profIpaziaImg, samuImg } from '../../data/mascots';

interface MondoPitagoraAppProps {
  onBackToHome?: () => void;
}

export const MondoPitagoraApp: React.FC<MondoPitagoraAppProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'visuale' | 'terne' | 'applicazioni' | 'quiz'>('visuale');

  // Triangle Visual Calculator State
  const [mode, setMode] = useState<'trova_ipotenusa' | 'trova_cateto'>('trova_ipotenusa');
  const [catetoA, setCatetoA] = useState<number>(3);
  const [catetoB, setCatetoB] = useState<number>(4);
  const [ipotenusaC, setIpotenusaC] = useState<number>(5);

  // Triple multiplier
  const [tripleMultiplier, setTripleMultiplier] = useState<number>(1);
  const [selectedTripleIndex, setSelectedTripleIndex] = useState<number>(0);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Calculation for Visual Tab
  const calculatedResult = useMemo(() => {
    if (mode === 'trova_ipotenusa') {
      const a = Math.max(1, catetoA);
      const b = Math.max(1, catetoB);
      const areaA = a * a;
      const areaB = b * b;
      const sumAreas = areaA + areaB;
      const c = Math.sqrt(sumAreas);
      return {
        a,
        b,
        c: parseFloat(c.toFixed(2)),
        areaA,
        areaB,
        areaC: sumAreas,
        isValid: true,
      };
    } else {
      const c = Math.max(2, ipotenusaC);
      const b = Math.min(c - 0.5, Math.max(1, catetoB));
      const areaC = c * c;
      const areaB = b * b;
      const diff = areaC - areaB;
      const a = diff > 0 ? Math.sqrt(diff) : 0;
      return {
        a: parseFloat(a.toFixed(2)),
        b,
        c,
        areaA: parseFloat(diff.toFixed(2)),
        areaB,
        areaC,
        isValid: diff > 0,
      };
    }
  }, [mode, catetoA, catetoB, ipotenusaC]);

  // FAMOUS TRIPLES
  const BASE_TRIPLES = [
    { a: 3, b: 4, c: 5, name: 'Terna Egizia (3, 4, 5)', desc: 'La più celebre terna dell\'antichità, usata anche dai geometri egizi per tracciare angoli retti perfetti.' },
    { a: 5, b: 12, c: 13, name: 'Terna (5, 12, 13)', desc: 'Molto frequente nei problemi di 2ª e 3ª media: 25 + 144 = 169 (13²).' },
    { a: 8, b: 15, c: 17, name: 'Terna (8, 15, 17)', desc: '64 + 225 = 289 (17²). Comodissima per verificare triangoli con ipotenusa 17 o 34.' },
    { a: 7, b: 24, c: 25, name: 'Terna (7, 24, 25)', desc: '49 + 576 = 625 (25²). Una terna con cateto minore dispari.' },
    { a: 20, b: 21, c: 29, name: 'Terna (20, 21, 29)', desc: '400 + 441 = 841 (29²). I due cateti sono quasi uguali!' },
  ];

  // REAL LIFE APPLICATIONS
  const APPLICATIONS = [
    {
      title: 'La Scala Appoggiata al Muro',
      scenario: 'Una scala da muratore lunga 5 metri è appoggiata a una parete verticale. Se la base della scala dista 3 metri dal muro, a che altezza da terra tocca la parete?',
      formula: 'h = √(lunghezza² - distanza²)',
      steps: [
        'Ipotenusa (scala) = 5 m',
        'Cateto noto (distanza) = 3 m',
        'Cateto incognito (altezza) = √(5² - 3²) = √(25 - 9) = √16 = 4 metri!',
      ],
      result: '4 metri',
    },
    {
      title: 'La Diagonale di uno Schermo TV o Rettangolo',
      scenario: 'Un monitor ha una base di 80 cm e un\'altezza di 60 cm. Quanti centimetri misura la sua diagonale?',
      formula: 'd = √(base² + altezza²)',
      steps: [
        'Cateto 1 (base) = 80 cm',
        'Cateto 2 (altezza) = 60 cm',
        'Diagonale = √(80² + 60²) = √(6400 + 3600) = √10000 = 100 cm (circa 40 pollici)!',
      ],
      result: '100 cm',
    },
    {
      title: 'L\'Altezza del Triangolo Isoscele',
      scenario: 'Un triangolo isoscele ha i lati obliqui di 10 cm e la base di 12 cm. Trova l\'altezza relativa alla base per calcolarne l\'area.',
      formula: 'h = √(lato² - (base/2)²)',
      steps: [
        'L\'altezza divide il triangolo isoscele in due triangoli rettangoli identici!',
        'Ipotenusa = lato obliquo = 10 cm',
        'Cateto di base = 12 : 2 = 6 cm',
        'Altezza = √(10² - 6²) = √(100 - 36) = √64 = 8 cm!',
      ],
      result: '8 cm (Area = 12 × 8 : 2 = 48 cm²)',
    },
    {
      title: 'Il Lato del Rombo dalle Diagonali',
      scenario: 'Un rombo ha la diagonale maggiore di 24 cm e la diagonale minore di 10 cm. Calcola la misura del lato del rombo.',
      formula: 'l = √((d₁/2)² + (d₂/2)²)',
      steps: [
        'Le diagonali del rombo sono perpendicolari e si dimezzano!',
        'Semidiagonale maggiore = 24 : 2 = 12 cm',
        'Semidiagonale minore = 10 : 2 = 5 cm',
        'Lato = √(12² + 5²) = √(144 + 25) = √169 = 13 cm!',
      ],
      result: '13 cm (Perimetro = 13 × 4 = 52 cm)',
    },
  ];

  // QUIZ QUESTIONS
  const QUIZ_QUESTIONS = [
    {
      question: 'In quale tipologia di triangoli è applicabile il Teorema di Pitagora?',
      options: ['In qualsiasi triangolo', 'Solo nei triangoli equilateri', 'Esclusivamente nei triangoli rettangoli', 'Solo nei triangoli ottusangoli'],
      correct: 2,
      explanation: 'Il Teorema di Pitagora vale rigorosamente solo per i triangoli rettangoli (che contengono un angolo retto di 90°).',
    },
    {
      question: 'Se i due cateti misurano 6 cm e 8 cm, quanto misura l\'ipotenusa?',
      options: ['14 cm', '10 cm', '12 cm', '48 cm'],
      correct: 1,
      explanation: 'c = √(6² + 8²) = √(36 + 64) = √100 = 10 cm (è il doppio della terna 3, 4, 5!).',
    },
    {
      question: 'L\'area del quadrato costruito sull\'ipotenusa è uguale a:',
      options: [
        'Alla differenza delle aree dei quadrati costruiti sui cateti',
        'Alla somma delle aree dei quadrati costruiti sui cateti',
        'Al prodotto dei due cateti',
        'Al doppio del cateto maggiore',
      ],
      correct: 1,
      explanation: 'Enunciato classico: Q(c) = Q(a) + Q(b), ovvero c² = a² + b².',
    },
    {
      question: 'Quale delle seguenti terne di numeri costituisce una terna pitagorica primitiva?',
      options: ['(5, 12, 13)', '(4, 5, 6)', '(2, 3, 4)', '(7, 10, 12)'],
      correct: 0,
      explanation: '5² + 12² = 25 + 144 = 169 = 13². È una celebre terna pitagorica!',
    },
    {
      question: 'Un triangolo rettangolo ha l\'ipotenusa di 25 cm e un cateto di 20 cm. Quanto misura l\'altro cateto?',
      options: ['5 cm', '15 cm', '22 cm', '12 cm'],
      correct: 1,
      explanation: 'Cateto = √(25² - 20²) = √(625 - 400) = √225 = 15 cm.',
    },
    {
      question: 'In una stanza quadrata di lato 4 metri, qual è la lunghezza della diagonale calpestabile?',
      options: ['8 metri', 'circa 5,66 metri (4 × √2)', '16 metri', '6 metri'],
      correct: 1,
      explanation: 'Nel quadrato la diagonale è d = lato × √2 = 4 × 1,414... ≈ 5,66 metri.',
    },
  ];

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === QUIZ_QUESTIONS[quizIndex].correct) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* App Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-2xl shadow-inner">
            📐
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Modulo Didattico Interattivo
              </span>
              <span className="text-xs text-slate-400 font-medium">Classe 2ª & 3ª Media</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
              <span>Il Mondo di Pitagora</span>
              <span className="text-xs font-normal text-indigo-300 font-mono">c² = a² + b²</span>
            </h2>
            <p className="text-xs text-slate-300">
              Dimostrazioni geometriche visuali, calcolatore dei quadrati sui lati, terne pitagoriche e problemi guidati.
            </p>
          </div>
        </div>

        {/* Mascot badge */}
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs shrink-0">
          <img src={profIpaziaImg} alt="Prof.ssa Ipazia" className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-400" />
          <img src={samuImg} alt="Samu" className="w-8 h-8 rounded-full object-cover ring-2 ring-yellow-400" />
          <div className="pr-1">
            <span className="font-bold text-white block text-[11px]">Cattedra di Geometria</span>
            <span className="text-indigo-300 text-[10px]">Prof.ssa Ipazia & Samu</span>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('visuale')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'visuale'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Shapes className="w-4 h-4" />
          <span>Dimostrazione & Calcolatore Visuale</span>
        </button>

        <button
          onClick={() => setActiveTab('terne')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'terne'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Terne Pitagoriche Famose</span>
        </button>

        <button
          onClick={() => setActiveTab('applicazioni')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'applicazioni'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Problemi Reali & Figure</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'quiz'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>Sfida Quiz & Verifica</span>
        </button>
      </div>

      {/* TAB 1: VISUALE & CALCOLATORE */}
      {activeTab === 'visuale' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Box */}
          <div className="lg:col-span-5 p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                Obiettivo del Calcolo
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode('trova_ipotenusa')}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                    mode === 'trova_ipotenusa'
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  Trova Ipotenusa (c)
                </button>
                <button
                  onClick={() => setMode('trova_cateto')}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                    mode === 'trova_cateto'
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  Trova Cateto (a)
                </button>
              </div>
            </div>

            {/* Input Sliders */}
            {mode === 'trova_ipotenusa' ? (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-emerald-400">Cateto 1 (a):</span>
                    <span className="text-white font-mono text-sm">{catetoA} cm</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.5"
                    value={catetoA}
                    onChange={(e) => setCatetoA(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-400 block mt-0.5">Area quadrato A = {catetoA * catetoA} cm²</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-cyan-400">Cateto 2 (b):</span>
                    <span className="text-white font-mono text-sm">{catetoB} cm</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.5"
                    value={catetoB}
                    onChange={(e) => setCatetoB(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-400 block mt-0.5">Area quadrato B = {catetoB * catetoB} cm²</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-purple-400">Ipotenusa (c):</span>
                    <span className="text-white font-mono text-sm">{ipotenusaC} cm</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="30"
                    step="0.5"
                    value={ipotenusaC}
                    onChange={(e) => setIpotenusaC(parseFloat(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-400 block mt-0.5">Area quadrato C = {ipotenusaC * ipotenusaC} cm²</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-cyan-400">Cateto noto (b):</span>
                    <span className="text-white font-mono text-sm">{catetoB} cm</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max={Math.max(1, ipotenusaC - 0.5)}
                    step="0.5"
                    value={Math.min(catetoB, ipotenusaC - 0.5)}
                    onChange={(e) => setCatetoB(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-400 block mt-0.5">Area quadrato B = {catetoB * catetoB} cm²</span>
                </div>
              </div>
            )}

            {/* Formula Step-by-Step Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
              <span className="font-bold text-indigo-300 block">Passaggi Matematici:</span>
              {mode === 'trova_ipotenusa' ? (
                <>
                  <div className="font-mono text-slate-300">c² = a² + b² = {calculatedResult.areaA} + {calculatedResult.areaB} = {calculatedResult.areaC}</div>
                  <div className="font-mono text-emerald-400 font-bold text-sm">c = √{calculatedResult.areaC} = {calculatedResult.c} cm</div>
                </>
              ) : (
                <>
                  <div className="font-mono text-slate-300">a² = c² - b² = {calculatedResult.areaC} - {calculatedResult.areaB} = {calculatedResult.areaA}</div>
                  <div className="font-mono text-emerald-400 font-bold text-sm">a = √{calculatedResult.areaA} = {calculatedResult.a} cm</div>
                </>
              )}
            </div>

            {/* Quick Presets (3-4-5, 5-12-13, 6-8-10) */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 block mb-1.5">Preset Rapidi da Testare:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setMode('trova_ipotenusa'); setCatetoA(3); setCatetoB(4); }}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono"
                >
                  3 - 4 - 5
                </button>
                <button
                  onClick={() => { setMode('trova_ipotenusa'); setCatetoA(5); setCatetoB(12); }}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono"
                >
                  5 - 12 - 13
                </button>
                <button
                  onClick={() => { setMode('trova_ipotenusa'); setCatetoA(8); setCatetoB(15); }}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono"
                >
                  8 - 15 - 17
                </button>
                <button
                  onClick={() => { setMode('trova_ipotenusa'); setCatetoA(6); setCatetoB(8); }}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono"
                >
                  6 - 8 - 10
                </button>
              </div>
            </div>
          </div>

          {/* Geometric Visual Canvas Showcase */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-between min-h-[460px]">
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span>Rappresentazione Geometrica Euclidea</span>
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                Area A + Area B = Area C
              </span>
            </div>

            {/* SVG Interactive Geometry Graphic */}
            <div className="relative w-full max-w-md h-72 sm:h-80 my-4 flex items-center justify-center bg-slate-950/60 rounded-2xl border border-slate-800/80 p-2 overflow-hidden shadow-inner">
              <svg viewBox="0 0 400 320" className="w-full h-full select-none">
                {/* Coordinates baseline: Right angle at (140, 220) */}
                {/* Cateto A: vertical upwards to (140, 220 - aScaled) */}
                {/* Cateto B: horizontal rightwards to (140 + bScaled, 220) */}
                {(() => {
                  const scale = Math.min(6, 120 / Math.max(calculatedResult.a, calculatedResult.b, 6));
                  const aScaled = calculatedResult.a * scale;
                  const bScaled = calculatedResult.b * scale;

                  const pCornerX = 150;
                  const pCornerY = 200;
                  const pTopX = pCornerX;
                  const pTopY = pCornerY - aScaled;
                  const pRightX = pCornerX + bScaled;
                  const pRightY = pCornerY;

                  // Square on Cateto A (built to the left)
                  const sqAPoints = `${pCornerX},${pCornerY} ${pCornerX - aScaled},${pCornerY} ${pCornerX - aScaled},${pTopY} ${pTopX},${pTopY}`;

                  // Square on Cateto B (built downwards)
                  const sqBPoints = `${pCornerX},${pCornerY} ${pRightX},${pRightY} ${pRightX},${pCornerY + bScaled} ${pCornerX},${pCornerY + bScaled}`;

                  // Angle calculation for hypotenuse square
                  const angle = Math.atan2(pRightY - pTopY, pRightX - pTopX);
                  const cLen = Math.sqrt((pRightX - pTopX) ** 2 + (pRightY - pTopY) ** 2);
                  const nx = -Math.sin(angle) * cLen;
                  const ny = Math.cos(angle) * cLen;

                  const sqCPoints = `${pTopX},${pTopY} ${pRightX},${pRightY} ${pRightX - nx},${pRightY - ny} ${pTopX - nx},${pTopY - ny}`;

                  return (
                    <g>
                      {/* Grid background lines */}
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />

                      {/* Square on A (Emerald) */}
                      <polygon points={sqAPoints} fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" strokeWidth="2" />
                      <text x={pCornerX - aScaled / 2} y={pCornerY - aScaled / 2} fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                        A² = {calculatedResult.areaA}
                      </text>

                      {/* Square on B (Cyan) */}
                      <polygon points={sqBPoints} fill="rgba(6, 182, 212, 0.25)" stroke="#06b6d4" strokeWidth="2" />
                      <text x={pCornerX + bScaled / 2} y={pCornerY + bScaled / 2 + 5} fill="#22d3ee" fontSize="11" fontWeight="bold" textAnchor="middle">
                        B² = {calculatedResult.areaB}
                      </text>

                      {/* Square on C (Purple/Indigo) */}
                      <polygon points={sqCPoints} fill="rgba(168, 85, 247, 0.22)" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 2" />
                      <text x={pTopX + (pRightX - pTopX) / 2 - nx / 2} y={pTopY + (pRightY - pTopY) / 2 - ny / 2} fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">
                        C² = {calculatedResult.areaC}
                      </text>

                      {/* Main Right Triangle (White/Amber fill) */}
                      <polygon points={`${pCornerX},${pCornerY} ${pTopX},${pTopY} ${pRightX},${pRightY}`} fill="rgba(245, 158, 11, 0.35)" stroke="#f59e0b" strokeWidth="2.5" />

                      {/* Right angle symbol square */}
                      <rect x={pCornerX} y={pCornerY - 10} width="10" height="10" fill="none" stroke="#f59e0b" strokeWidth="1.5" />

                      {/* Side Labels */}
                      <text x={pCornerX + 6} y={pCornerY - aScaled / 2} fill="#ffffff" fontSize="11" fontWeight="bold">
                        a = {calculatedResult.a}
                      </text>
                      <text x={pCornerX + bScaled / 2} y={pCornerY - 6} fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                        b = {calculatedResult.b}
                      </text>
                      <text x={pCornerX + bScaled / 2 + 10} y={pCornerY - aScaled / 2 - 10} fill="#fcd34d" fontSize="12" fontWeight="black" textAnchor="middle">
                        c = {calculatedResult.c}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Quick Educational Card */}
            <div className="w-full p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Regola d'oro:</strong> La somma delle aree dei due quadrati minori verdi e azzurri riempie esattamente l'area del quadrato viola dell'ipotenusa!
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TERNE PITAGORICHE */}
      {activeTab === 'terne' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <span>Le Terne Pitagoriche Primitive e i loro Multipli</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Una <strong>terna pitagorica</strong> è una terna di numeri interi positivi $(a, b, c)$ che soddisfano rigorosamente l'equazione $a^2 + b^2 = c^2$. Memorizzare le terne base ti permette di risolvere i problemi scolastici a mente in 3 secondi senza usare la radice quadrata!
            </p>

            <div className="mt-4 flex items-center gap-4 flex-wrap bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-300">Moltiplicatore k:</span>
                <span className="text-sm font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded">×{tripleMultiplier}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={tripleMultiplier}
                onChange={(e) => setTripleMultiplier(parseInt(e.target.value))}
                className="w-48 accent-amber-500 cursor-pointer"
              />
              <span className="text-xs text-slate-400">
                (Se moltiplichi una terna per k, la nuova terna resta SEMPRE pitagorica!)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BASE_TRIPLES.map((t, idx) => {
              const mA = t.a * tripleMultiplier;
              const mB = t.b * tripleMultiplier;
              const mC = t.c * tripleMultiplier;
              const isSelected = selectedTripleIndex === idx;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedTripleIndex(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-850 border-indigo-500 ring-2 ring-indigo-500/40 shadow-lg'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">{t.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                      Primitiva
                    </span>
                  </div>

                  <div className="my-3 p-3 rounded-xl bg-slate-950 flex items-center justify-around font-mono text-center">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Cateto a</span>
                      <span className="text-sm font-bold text-emerald-400">{mA}</span>
                    </div>
                    <span className="text-slate-600 font-bold">+</span>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Cateto b</span>
                      <span className="text-sm font-bold text-cyan-400">{mB}</span>
                    </div>
                    <span className="text-slate-600 font-bold">=</span>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Ipotenusa c</span>
                      <span className="text-base font-black text-amber-400">{mC}</span>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 text-center">
                    {mA}² + {mB}² = {mA * mA} + {mB * mB} = {mC * mC} ({mC}²)
                  </div>

                  <p className="text-xs text-slate-400 mt-2.5 pt-2.5 border-t border-slate-800">
                    {t.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: APPLICAZIONI REALI */}
      {activeTab === 'applicazioni' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            Il Teorema di Pitagora non si applica solo al triangolo rettangolo isolato! Si usa per risolvere figure geometriche complesse tracciando altezze o diagonali che creano triangoli rettangoli interni.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {APPLICATIONS.map((app, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs">
                      {i + 1}
                    </span>
                    <span>{app.title}</span>
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {app.formula}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  {app.scenario}
                </p>

                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-400 text-[11px] uppercase tracking-wider block">Risoluzione guidata:</span>
                  {app.steps.map((st, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-slate-300">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-between">
                  <span>Risultato Finale:</span>
                  <span className="text-white font-mono">{app.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: QUIZ E SFIDA */}
      {activeTab === 'quiz' && (
        <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          {!quizFinished ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-indigo-400">
                  Domanda {quizIndex + 1} di {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-xs font-mono font-bold text-slate-300">
                  Punteggio: {quizScore}/{quizIndex}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {QUIZ_QUESTIONS[quizIndex].question}
              </h3>

              <div className="space-y-2.5">
                {QUIZ_QUESTIONS[quizIndex].options.map((opt, i) => {
                  const isChosen = selectedAnswer === i;
                  const isCorrect = i === QUIZ_QUESTIONS[quizIndex].correct;

                  let btnStyle = 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200';
                  if (selectedAnswer !== null) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                    } else if (isChosen) {
                      btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 line-through';
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={selectedAnswer !== null}
                      onClick={() => handleAnswerSelect(i)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {selectedAnswer !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {selectedAnswer !== null && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {selectedAnswer !== null && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-3">
                  <p>
                    <strong className="text-white">Spiegazione:</strong> {QUIZ_QUESTIONS[quizIndex].explanation}
                  </p>
                  <button
                    onClick={handleNextQuiz}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>{quizIndex < QUIZ_QUESTIONS.length - 1 ? 'Domanda Successiva' : 'Visualizza Risultato Finale'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-3xl">
                🏆
              </div>
              <h3 className="text-xl font-black text-white">Quiz di Pitagora Completato!</h3>
              <p className="text-sm text-slate-300">
                Hai totalizzato <strong className="text-indigo-400 text-base">{quizScore}</strong> su <strong className="text-white text-base">{QUIZ_QUESTIONS.length}</strong> risposte corrette.
              </p>
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 max-w-sm mx-auto italic">
                {quizScore >= 5
                  ? '«Bravissimo! Conosci il Teorema di Pitagora come un vero geometra!» — Prof.ssa Ipazia'
                  : '«Ottimo allenamento! Ripassa le terne pitagoriche e le formule inverse per ottenere il massimo punteggio!» — Samu'}
              </div>
              <button
                onClick={handleResetQuiz}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Riprova il Quiz</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
