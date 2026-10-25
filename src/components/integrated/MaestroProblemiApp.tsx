import React, { useState } from 'react';
import {
  BrainCircuit,
  Home,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Sparkles,
  BarChart2,
  Scale,
  RotateCcw,
  Target,
} from 'lucide-react';
import { profSauroImg, miaImg } from '../../data/mascots';

interface MaestroProblemiAppProps {
  onBackToHome?: () => void;
}

export const MaestroProblemiApp: React.FC<MaestroProblemiAppProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'risolutore' | 'metodo' | 'palestra' | 'dizionario'>('risolutore');
  const [segmentCase, setSegmentCase] = useState<'somma_diff' | 'somma_multiplo' | 'diff_multiplo' | 'frazione'>('somma_diff');

  // Input states for Segment Solver
  // Case A: Somma e Differenza
  const [sumVal, setSumVal] = useState(48);
  const [diffVal, setDiffVal] = useState(12);

  // Case B: Somma e Multiplo
  const [multiSum, setMultiSum] = useState(60);
  const [multiplier, setMultiplier] = useState(3);

  // Case C: Differenza e Multiplo
  const [diffMulti, setDiffMulti] = useState(30);
  const [diffFactor, setDiffFactor] = useState(4);

  // Case D: Frazione di un numero
  const [fractionNum, setFractionNum] = useState(3);
  const [fractionDen, setFractionDen] = useState(5);
  const [fractionTotal, setFractionTotal] = useState(45);

  // Challenge / Palestra state
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [solvedChallenges, setSolvedChallenges] = useState<number[]>([]);

  const CHALLENGES = [
    {
      id: 1,
      grade: 'Classe 1ª Media',
      title: 'Le Figurine di Marco e Sofia',
      text: 'Marco e Sofia hanno insieme 84 figurine. Sofia ne possiede 16 in più di Marco. Quante figurine ha ciascuno dei due ragazzi?',
      question: 'Quante figurine ha Marco (la quantità minore)?',
      correctAnswer: 34,
      unit: 'figurine',
      hint1: 'Disegna due segmenti: quello di Sofia è uguale a quello di Marco più un pezzetto di 16 figurine.',
      hint2: 'Togli la differenza (16) dalla somma totale (84): otterrai il doppio delle figurine di Marco. Poi dividi per 2.',
      solutionSteps: [
        'Somma totale = 84, Differenza = 16',
        'Togliamo la differenza: 84 - 16 = 68 figurine (corrispondono a 2 segmenti uguali)',
        'Figurine di Marco (segmento minore) = 68 : 2 = 34 figurine',
        'Figurine di Sofia = 34 + 16 = 50 figurine',
        'Verifica: 34 + 50 = 84 figurine! Perfetto.',
      ],
    },
    {
      id: 2,
      grade: 'Classe 1ª / 2ª Media',
      title: 'I Due Fratelli e i Libri',
      text: 'In una libreria ci sono due scaffali con 96 libri in totale. Il secondo scaffale contiene il triplo dei libri del primo scaffale.',
      question: 'Quanti libri ci sono sul primo scaffale?',
      correctAnswer: 24,
      unit: 'libri',
      hint1: 'Se il secondo scaffale ha il triplo dei libri, possiamo pensare al primo come 1 parte (unità) e al secondo come 3 parti.',
      hint2: 'In tutto ci sono 1 + 3 = 4 parti uguali. Dividi il totale dei libri (96) per 4.',
      solutionSteps: [
        'Primo scaffale = 1 unità frazionaria (1 segmento)',
        'Secondo scaffale = 3 unità frazionarie (3 segmenti uguali)',
        'Totale parti = 1 + 3 = 4 parti uguali',
        'Valore di 1 parte (primo scaffale) = 96 : 4 = 24 libri',
        'Secondo scaffale = 24 × 3 = 72 libri',
        'Verifica: 24 + 72 = 96 libri.',
      ],
    },
    {
      id: 3,
      grade: 'Classe 2ª Media',
      title: 'Il Campo Rettangolare da Calcio',
      text: 'Un campo da calcetto ha il perimetro di 120 metri. La lunghezza della base supera l\'altezza di 14 metri. Calcola la misura della base.',
      question: 'Quanto misura la base (lunghezza maggiore in metri)?',
      correctAnswer: 37,
      unit: 'metri',
      hint1: 'Il perimetro è formato da 2 basi e 2 altezze. Calcola prima il semiperimetro (base + altezza)!',
      hint2: 'Semiperimetro = 120 : 2 = 60 m. Ora hai la somma (60m) e la differenza (14m) delle due dimensioni.',
      solutionSteps: [
        'Semiperimetro (Base + Altezza) = 120 : 2 = 60 m',
        'Differenza tra Base e Altezza = 14 m',
        'Altezza = (60 - 14) : 2 = 46 : 2 = 23 m',
        'Base = 23 + 14 = 37 m (oppure (60 + 14) : 2 = 37 m)',
        'Verifica: (37 + 23) × 2 = 60 × 2 = 120 m!',
      ],
    },
    {
      id: 4,
      grade: 'Classe 2ª / 3ª Media',
      title: 'I Risparmi nel Salvadanaio',
      text: 'Luca ha speso i 3/7 dei suoi risparmi per comprare una calcolatrice scientifica e gli sono rimasti 64 euro. A quanto ammontavano i risparmi iniziali?',
      question: 'Qual era la somma iniziale contenuta nel salvadanaio (in euro)?',
      correctAnswer: 112,
      unit: 'euro',
      hint1: 'Se ha speso i 3/7, quale frazione gli è rimasta? 7/7 - 3/7 = 4/7!',
      hint2: 'I 64 euro rimasti corrispondono esattamente a 4 parti su 7. Calcola quanto vale 1 parte (64 : 4) e poi moltiplica per 7.',
      solutionSteps: [
        'Frazione rimanente = 7/7 - 3/7 = 4/7 del totale',
        'I 4/7 equivalgono a 64 €',
        'Unità frazionaria (1/7) = 64 : 4 = 16 €',
        'Totale risparmi iniziali (7/7) = 16 × 7 = 112 €',
        'Verifica: Spesa = 3/7 di 112 = (112 : 7) × 3 = 48 €. Rimasti = 112 - 48 = 64 €!',
      ],
    },
  ];

  const currentChallenge = CHALLENGES[challengeIndex];

  const handleCheckAnswer = () => {
    const val = parseFloat(userAnswer.trim().replace(',', '.'));
    if (isNaN(val)) return;

    if (Math.abs(val - currentChallenge.correctAnswer) < 0.01) {
      setFeedback('correct');
      if (!solvedChallenges.includes(currentChallenge.id)) {
        setSolvedChallenges([...solvedChallenges, currentChallenge.id]);
      }
    } else {
      setFeedback('wrong');
    }
  };

  const handleNextChallenge = () => {
    if (challengeIndex < CHALLENGES.length - 1) {
      setChallengeIndex((prev) => prev + 1);
      setUserAnswer('');
      setShowHint1(false);
      setShowHint2(false);
      setFeedback(null);
    }
  };

  const handlePrevChallenge = () => {
    if (challengeIndex > 0) {
      setChallengeIndex((prev) => prev - 1);
      setUserAnswer('');
      setShowHint1(false);
      setShowHint2(false);
      setFeedback(null);
    }
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Top Banner with Home Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-cyan-400 p-[2px] shrink-0 shadow-lg shadow-indigo-600/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-amber-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Matematica • Metodo Risolutivo
              </span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
                <img src={profSauroImg} alt="Prof. Sauro" className="w-4 h-4 rounded-full object-cover" />
                <img src={miaImg} alt="Mia" className="w-4 h-4 rounded-full object-cover" />
                <span>Consigli di Prof. Sauro & Mia</span>
              </div>
            </div>
            <h2 className="text-2xl font-black text-white">
              Il Maestro dei Problemi
            </h2>
            <p className="text-xs text-slate-400">
              Guida strategica, modello a barre e segmenti per risolvere qualsiasi problema aritmetico e geometrico
            </p>
          </div>
        </div>

        {/* Back to Home Button & Tab Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700 hover:border-cyan-500 transition-all shadow-sm"
            >
              <Home className="w-4 h-4 text-cyan-400" />
              <span>Torna alla Home Page di ScienzaLab</span>
            </button>
          )}

          <div className="flex items-center gap-1 p-1 bg-slate-800/80 rounded-xl border border-slate-700/80">
            <button
              onClick={() => setActiveTab('risolutore')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'risolutore'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Risolutore Segmenti
            </button>
            <button
              onClick={() => setActiveTab('palestra')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'palestra'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Palestra Sfide ({solvedChallenges.length}/{CHALLENGES.length})
            </button>
            <button
              onClick={() => setActiveTab('metodo')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'metodo'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Il Metodo in 4 Fasi
            </button>
            <button
              onClick={() => setActiveTab('dizionario')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'dizionario'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Parole Chiave
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: RISOLUTORE DINAMICO CON METODO DEI SEGMENTI */}
      {activeTab === 'risolutore' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Box */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Tipologia di Problema
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setSegmentCase('somma_diff')}
                className={`w-full text-left p-3 rounded-xl text-xs font-bold border transition-all ${
                  segmentCase === 'somma_diff'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                1. Somma e Differenza (s e d)
              </button>
              <button
                onClick={() => setSegmentCase('somma_multiplo')}
                className={`w-full text-left p-3 rounded-xl text-xs font-bold border transition-all ${
                  segmentCase === 'somma_multiplo'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                2. Somma e Multiplo (es. uno è il triplo)
              </button>
              <button
                onClick={() => setSegmentCase('diff_multiplo')}
                className={`w-full text-left p-3 rounded-xl text-xs font-bold border transition-all ${
                  segmentCase === 'diff_multiplo'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                3. Differenza e Multiplo
              </button>
              <button
                onClick={() => setSegmentCase('frazione')}
                className={`w-full text-left p-3 rounded-xl text-xs font-bold border transition-all ${
                  segmentCase === 'frazione'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                4. Frazione di una Quantità
              </button>
            </div>

            {/* Numerical inputs */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Inserisci i Tuoi Dati
              </h4>

              {segmentCase === 'somma_diff' && (
                <>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Somma dei due valori (s): {sumVal}</label>
                    <input
                      type="number"
                      value={sumVal}
                      onChange={(e) => setSumVal(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Differenza tra i due valori (d): {diffVal}</label>
                    <input
                      type="number"
                      value={diffVal}
                      onChange={(e) => setDiffVal(Math.max(0, Math.min(sumVal - 1, Number(e.target.value))))}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                    />
                  </div>
                </>
              )}

              {segmentCase === 'somma_multiplo' && (
                <>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Somma totale: {multiSum}</label>
                    <input
                      type="number"
                      value={multiSum}
                      onChange={(e) => setMultiSum(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Il primo è quante volte il secondo? (Moltiplicatore n): {multiplier}</label>
                    <input
                      type="number"
                      min="2"
                      max="10"
                      value={multiplier}
                      onChange={(e) => setMultiplier(Math.max(2, Number(e.target.value)))}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                    />
                  </div>
                </>
              )}

              {segmentCase === 'diff_multiplo' && (
                <>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Differenza nota: {diffMulti}</label>
                    <input
                      type="number"
                      value={diffMulti}
                      onChange={(e) => setDiffMulti(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Uno è quante volte l'altro? (n): {diffFactor}</label>
                    <input
                      type="number"
                      min="2"
                      max="10"
                      value={diffFactor}
                      onChange={(e) => setDiffFactor(Math.max(2, Number(e.target.value)))}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                    />
                  </div>
                </>
              )}

              {segmentCase === 'frazione' && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Numeratore (p):</label>
                      <input
                        type="number"
                        min="1"
                        value={fractionNum}
                        onChange={(e) => setFractionNum(Math.max(1, Number(e.target.value)))}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Denominatore (q):</label>
                      <input
                        type="number"
                        min="2"
                        value={fractionDen}
                        onChange={(e) => setFractionDen(Math.max(2, Number(e.target.value)))}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Quantità intera totale: {fractionTotal}</label>
                    <input
                      type="number"
                      min="1"
                      value={fractionTotal}
                      onChange={(e) => setFractionTotal(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Visual Bar Model & Step by Step Solution */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Rappresentazione Grafica a Segmenti
                </span>
                <span className="text-xs text-slate-400">Ragionamento Visivo</span>
              </div>

              {/* CASE 1: SOMMA E DIFFERENZA */}
              {segmentCase === 'somma_diff' && (() => {
                const minor = (sumVal - diffVal) / 2;
                const major = minor + diffVal;
                return (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">
                      Problema di Somma e Differenza: <span className="text-indigo-400">s = {sumVal}, d = {diffVal}</span>
                    </h3>

                    {/* Segment Graphic Visualizer */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Quantità Minore (b):</span>
                          <span className="font-mono text-emerald-400 font-bold">{minor.toFixed(1)}</span>
                        </div>
                        <div className="h-6 bg-emerald-600/80 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow" style={{ width: `${Math.max(20, (minor / major) * 80)}%` }}>
                          {minor.toFixed(1)}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Quantità Maggiore (a = b + d):</span>
                          <span className="font-mono text-cyan-400 font-bold">{major.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-6 bg-emerald-600/80 rounded-l-lg flex items-center justify-center text-xs font-bold text-white shadow" style={{ width: `${Math.max(20, (minor / major) * 80)}%` }}>
                            {minor.toFixed(1)}
                          </div>
                          <div className="h-6 bg-amber-500/80 rounded-r-lg flex items-center justify-center text-xs font-bold text-slate-950 shadow px-2">
                            +{diffVal} (diff)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step-by-Step Explanation */}
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs sm:text-sm space-y-2">
                      <span className="font-bold text-amber-300 block">Passaggi Guidati del Maestro:</span>
                      <p>1. Togliamo la differenza dalla somma: <strong className="text-white font-mono">{sumVal} - {diffVal} = {sumVal - diffVal}</strong> (otteniamo due segmenti uguali al minore).</p>
                      <p>2. Dividiamo per 2 per trovare il segmento minore: <strong className="text-emerald-400 font-mono">({sumVal} - {diffVal}) : 2 = {minor.toFixed(1)}</strong></p>
                      <p>3. Aggiungiamo la differenza per trovare il maggiore: <strong className="text-cyan-400 font-mono">{minor.toFixed(1)} + {diffVal} = {major.toFixed(1)}</strong></p>
                      <p className="text-slate-400 pt-1 border-t border-slate-700">Verifica: {minor.toFixed(1)} + {major.toFixed(1)} = {sumVal} ✓</p>
                    </div>
                  </div>
                );
              })()}

              {/* CASE 2: SOMMA E MULTIPLO */}
              {segmentCase === 'somma_multiplo' && (() => {
                const totalParts = 1 + multiplier;
                const unitPart = multiSum / totalParts;
                const majorPart = unitPart * multiplier;
                return (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">
                      Problema di Somma e Multiplo: <span className="text-indigo-400">Somma = {multiSum}, Uno è {multiplier} volte l'altro</span>
                    </h3>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                      <div className="text-xs text-slate-400">
                        Totale parti uguali (segmentini): 1 + {multiplier} = <strong className="text-white">{totalParts} parti</strong>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-6 w-16 bg-emerald-600 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow">
                          1 parte
                        </div>
                        <span className="text-xs text-slate-400">Minore = {unitPart.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: multiplier }).map((_, i) => (
                          <div key={i} className="h-6 w-16 bg-cyan-600 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow">
                            1 parte
                          </div>
                        ))}
                        <span className="text-xs text-slate-400">Maggiore ({multiplier} parti) = {majorPart.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs sm:text-sm space-y-2">
                      <span className="font-bold text-amber-300 block">Passaggi Guidati del Maestro:</span>
                      <p>1. Conta le parti totali: 1 + {multiplier} = <strong className="text-white">{totalParts} unità</strong></p>
                      <p>2. Trova il valore di 1 parte (unità frazionaria): <strong className="text-emerald-400 font-mono">{multiSum} : {totalParts} = {unitPart.toFixed(1)}</strong></p>
                      <p>3. Calcola il valore maggiore: <strong className="text-cyan-400 font-mono">{unitPart.toFixed(1)} × {multiplier} = {majorPart.toFixed(1)}</strong></p>
                      <p className="text-slate-400 pt-1 border-t border-slate-700">Verifica: {unitPart.toFixed(1)} + {majorPart.toFixed(1)} = {multiSum} ✓</p>
                    </div>
                  </div>
                );
              })()}

              {/* CASE 3: DIFFERENZA E MULTIPLO */}
              {segmentCase === 'diff_multiplo' && (() => {
                const diffUnits = diffFactor - 1;
                const unitVal = diffMulti / diffUnits;
                const majorVal = unitVal * diffFactor;
                return (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">
                      Problema di Differenza e Multiplo: <span className="text-indigo-400">Differenza = {diffMulti}, Rapporto = {diffFactor} volte</span>
                    </h3>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                      <p className="text-slate-300">
                        La differenza ({diffMulti}) corrisponde a <strong className="text-amber-400">{diffFactor} - 1 = {diffUnits} parti</strong>.
                      </p>
                      <p>Valore di 1 unità = {diffMulti} : {diffUnits} = <strong className="text-emerald-400 font-mono font-bold">{unitVal.toFixed(1)}</strong></p>
                      <p>Valore maggiore = {unitVal.toFixed(1)} × {diffFactor} = <strong className="text-cyan-400 font-mono font-bold">{majorVal.toFixed(1)}</strong></p>
                    </div>
                  </div>
                );
              })()}

              {/* CASE 4: FRAZIONE DI UNA QUANTITÀ */}
              {segmentCase === 'frazione' && (() => {
                const onePart = fractionTotal / fractionDen;
                const calculatedValue = onePart * fractionNum;
                return (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">
                      Calcolo di una Frazione: <span className="text-indigo-400">{fractionNum}/{fractionDen} di {fractionTotal}</span>
                    </h3>

                    {/* Fraction Bar Visualizer */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                      <span className="text-xs text-slate-400 block">Barra suddivisa in {fractionDen} parti uguali:</span>
                      <div className="grid grid-cols-5 sm:grid-cols-8 gap-1.5">
                        {Array.from({ length: fractionDen }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-all ${
                              i < fractionNum
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow'
                                : 'bg-slate-800/60 border-slate-700 text-slate-500'
                            }`}
                          >
                            1/{fractionDen}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-indigo-300 block font-medium">
                        {fractionNum} parti colorate su {fractionDen}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs sm:text-sm space-y-2">
                      <span className="font-bold text-amber-300 block">Regola d'Oro:</span>
                      <p>1. Dividi l'intero per il denominatore (trova l'unità frazionaria): <strong className="text-emerald-400 font-mono">{fractionTotal} : {fractionDen} = {onePart.toFixed(1)}</strong></p>
                      <p>2. Moltiplica il risultato per il numeratore: <strong className="text-cyan-400 font-mono">{onePart.toFixed(1)} × {fractionNum} = {calculatedValue.toFixed(1)}</strong></p>
                      <p className="text-slate-400 pt-1 border-t border-slate-700">Risultato: {fractionNum}/{fractionDen} di {fractionTotal} = <strong className="text-white">{calculatedValue.toFixed(1)}</strong></p>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-300">
              💡 Cambia i numeri a sinistra per risolvere istantaneamente i problemi assegnati per casa!
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PALESTRA DELLE SFIDE */}
      {activeTab === 'palestra' && (
        <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {currentChallenge.grade}
              </span>
              <span className="text-xs text-slate-400">Sfida {challengeIndex + 1} di {CHALLENGES.length}</span>
            </div>
            {solvedChallenges.includes(currentChallenge.id) && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                Risolto!
              </span>
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-2">{currentChallenge.title}</h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-slate-800/60 p-4 rounded-xl border border-slate-700/70">
              {currentChallenge.text}
            </p>
          </div>

          {/* Interactive Answer Input */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              {currentChallenge.question}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer()}
                placeholder="Inserisci il numero..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-xs text-slate-400 font-bold">{currentChallenge.unit}</span>
              <button
                onClick={handleCheckAnswer}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all"
              >
                Verifica
              </button>
            </div>

            {/* Feedback message */}
            {feedback === 'correct' && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Esatto! Bravissimo, la risposta corretta è proprio {currentChallenge.correctAnswer} {currentChallenge.unit}.</span>
              </div>
            )}
            {feedback === 'wrong' && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-2">
                <span>Riprova! Prova a leggere i suggerimenti qui sotto per trovare il percorso corretto.</span>
              </div>
            )}
          </div>

          {/* Progressive Hints */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHint1(!showHint1)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-amber-300 border border-slate-700"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showHint1 ? 'Nascondi Suggerimento 1' : '💡 Suggerimento 1 (Grafico)'}</span>
              </button>
              {showHint1 && (
                <button
                  onClick={() => setShowHint2(!showHint2)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-cyan-300 border border-slate-700"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{showHint2 ? 'Nascondi Suggerimento 2' : '💡 Suggerimento 2 (Operazioni)'}</span>
                </button>
              )}
            </div>

            {showHint1 && (
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 animate-fade-in">
                {currentChallenge.hint1}
              </div>
            )}
            {showHint2 && (
              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200 animate-fade-in">
                {currentChallenge.hint2}
              </div>
            )}
          </div>

          {/* Solution steps if solved */}
          {(feedback === 'correct' || solvedChallenges.includes(currentChallenge.id)) && (
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5 text-xs">
              <span className="font-bold text-emerald-400 block">Svolgimento Completo:</span>
              {currentChallenge.solutionSteps.map((step, idx) => (
                <p key={idx} className="text-slate-300">{step}</p>
              ))}
            </div>
          )}

          {/* Navigation between challenges */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={handlePrevChallenge}
              disabled={challengeIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-750 disabled:opacity-40"
            >
              ← Sfida Precedente
            </button>
            <button
              onClick={handleNextChallenge}
              disabled={challengeIndex === CHALLENGES.length - 1}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40"
            >
              Prossima Sfida →
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: IL METODO IN 4 FASI */}
      {activeTab === 'metodo' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h4 className="text-base font-bold text-white">Comprendere e Selezionare i Dati</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Leggi il testo almeno 2 volte. Evidenzia con colori diversi:
            </p>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li><strong className="text-emerald-400">Dati numerici espliciti</strong> (numeri chiari nel testo).</li>
              <li><strong className="text-amber-400">Dati impliciti</strong> (es. "doppio" = 2, "settimana" = 7 giorni).</li>
              <li><strong className="text-rose-400">L'incognita / Domanda</strong>: cosa ci chiede di calcolare?</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h4 className="text-base font-bold text-white">Rappresentare (Disegno o Segmenti)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trasforma le parole in immagini:
            </p>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li>Usa il <strong>modello a barre / segmenti</strong> per quantità ignote.</li>
              <li>Disegna la figura geometrica e inserisci lettere sui vertici e misure sui lati.</li>
              <li>Visivamente diventa chiaro quale pezzo manca!</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h4 className="text-base font-bold text-white">Pianificare le Operazioni</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Parti dalla domanda e fai il percorso a ritroso:
            </p>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li>"Per trovare l'Area mi serve la Base e l'Altezza."</li>
              <li>"Ho la base? Sì. Ho l'altezza? No, ma so che è la metà della base!"</li>
              <li>Scrivi l'espressione o le operazioni con le relative unità di misura.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h4 className="text-base font-bold text-white">Verificare e Rispondere</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Il controllo di plausibilità:
            </p>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li>Il risultato ha senso? (Se l'ipotenusa è minore del cateto c'è un errore!).</li>
              <li>Rileggi la domanda per assicurarti di aver risposto esattamente a ciò che chiedeva.</li>
              <li>Scrivi la risposta completa con soggetto e unità di misura.</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 4: PAROLE CHIAVE NEL TESTO */}
      {activeTab === 'dizionario' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">
            Dizionario Matematico: Dalle Parole alle Operazioni
          </h3>
          <p className="text-xs text-slate-400">
            Come tradurre le espressioni del linguaggio comune nelle 4 operazioni matematiche:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-700 space-y-1.5">
              <span className="font-bold text-emerald-400 text-sm block">➕ Addizione (+)</span>
              <p className="text-slate-300">• in tutto, complessivamente</p>
              <p className="text-slate-300">• aumentato di, aggiunto</p>
              <p className="text-slate-300">• guadagno, somma, totale</p>
              <p className="text-slate-300">• in più, maggiore di</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-700 space-y-1.5">
              <span className="font-bold text-rose-400 text-sm block">➖ Sottrazione (-)</span>
              <p className="text-slate-300">• la differenza, resta, rimane</p>
              <p className="text-slate-300">• in meno, diminuito di</p>
              <p className="text-slate-300">• spesa, perdita</p>
              <p className="text-slate-300">• quanto manca per...</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-700 space-y-1.5">
              <span className="font-bold text-cyan-400 text-sm block">✖️ Moltiplicazione (×)</span>
              <p className="text-slate-300">• il doppio (×2), il triplo (×3)</p>
              <p className="text-slate-300">• ciascuno, a testa (per tot volte)</p>
              <p className="text-slate-300">• n volte tanto</p>
              <p className="text-slate-300">• il prodotto</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-700 space-y-1.5">
              <span className="font-bold text-amber-400 text-sm block">➗ Divisione (:)</span>
              <p className="text-slate-300">• distribuire, dividere in parti uguali</p>
              <p className="text-slate-300">• la metà (:2), la terza parte (:3)</p>
              <p className="text-slate-300">• il quoziente, il rapporto</p>
              <p className="text-slate-300">• calcolare il costo unitario</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
