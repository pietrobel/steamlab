import React, { useState } from 'react';
import { Calculator, CheckCircle2, XCircle, ArrowRight, Sparkles, RefreshCw, BookOpen, Home } from 'lucide-react';
import { miaImg, profSauroImg } from '../../data/mascots';

interface ProprietaOperazioniAppProps {
  onBackToHome?: () => void;
}

export const ProprietaOperazioniApp: React.FC<ProprietaOperazioniAppProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'teoria' | 'calcolatore' | 'quiz'>('calcolatore');
  const [selectedProperty, setSelectedProperty] = useState<'commutativa' | 'associativa' | 'distributiva' | 'invariantiva'>('commutativa');

  // Calculator inputs
  const [numA, setNumA] = useState(12);
  const [numB, setNumB] = useState(8);
  const [numC, setNumC] = useState(5);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const QUIZ_QUESTIONS = [
    {
      question: 'Quale proprietà è espressa dall\'uguaglianza: 15 + 27 = 27 + 15 ?',
      options: ['Proprietà Associativa', 'Proprietà Commutativa', 'Proprietà Distributiva', 'Proprietà Invariantiva'],
      correct: 1,
      explanation: 'La proprietà commutativa afferma che cambiando l\'ordine degli addendi la somma non cambia.',
    },
    {
      question: 'In quale operazione si applica la proprietà distributiva della moltiplicazione?',
      options: [
        '5 × (10 + 4) = 5 × 10 + 5 × 4',
        '(8 + 2) + 6 = 8 + (2 + 6)',
        '45 - 15 = (45 + 5) - (15 + 5)',
        '100 : 20 = (100 : 10) : (20 : 10)',
      ],
      correct: 0,
      explanation: 'La moltiplicazione si distribuisce sui singoli termini dell\'addizione o della sottrazione.',
    },
    {
      question: 'La proprietà invariantiva della sottrazione stabilisce che la differenza non cambia se:',
      options: [
        'Scambiamo minuendo e sottraendo',
        'Aggiungiamo o sottraiamo uno stesso numero a entrambi i termini',
        'Moltiplichiamo solo il minuendo',
        'Sostituiamo due termini con la loro somma',
      ],
      correct: 1,
      explanation: 'Esempio: 24 - 14 = (24 + 6) - (14 + 6) = 30 - 20 = 10.',
    },
    {
      question: 'Calcolare (18 + 12) + 25 = 18 + (12 + 25) è un esempio di:',
      options: ['Proprietà Distributiva', 'Proprietà Invariantiva', 'Proprietà Associativa', 'Elemento Neutro'],
      correct: 2,
      explanation: 'Sostituire due o più addendi con la loro somma è la proprietà associativa dell\'addizione.',
    },
  ];

  const handleAnswer = (optionIdx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIdx);
    if (optionIdx === QUIZ_QUESTIONS[quizIndex].correct) {
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
    <div className="space-y-6 text-slate-100">
      {/* App Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
              <Calculator className="w-3.5 h-3.5" />
              <span>Matematica • Aritmetica per la Scuola Secondaria</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-750 text-[11px] text-slate-300">
              <img src={profSauroImg} alt="Prof. Sauro" className="w-4 h-4 rounded-full object-cover" />
              <img src={miaImg} alt="Mia" className="w-4 h-4 rounded-full object-cover" />
              <span>Con Prof. Sauro & Mia</span>
            </div>
          </div>
          <h2 className="text-2xl font-black text-white">
            Proprietà delle Operazioni
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Esplora, calcola e verifica visivamente le proprietà di addizione, moltiplicazione, sottrazione e divisione.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700 hover:border-cyan-500 transition-all shadow-sm"
            >
              <Home className="w-3.5 h-3.5 text-cyan-400" />
              <span>Torna a ScienzaLab</span>
            </button>
          )}

          {/* Tab switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700/80">
          <button
            onClick={() => setActiveTab('calcolatore')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'calcolatore'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Calcolatore Dinamico
          </button>
          <button
            onClick={() => setActiveTab('teoria')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'teoria'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Schede & Formule
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Quiz & Palestra
          </button>
        </div>
      </div>
    </div>

      {/* Tab: Calcolatore Dinamico */}
      {activeTab === 'calcolatore' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Scegli la Proprietà
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedProperty('commutativa')}
                className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                  selectedProperty === 'commutativa'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                1. Commutativa
              </button>
              <button
                onClick={() => setSelectedProperty('associativa')}
                className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                  selectedProperty === 'associativa'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                2. Associativa
              </button>
              <button
                onClick={() => setSelectedProperty('distributiva')}
                className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                  selectedProperty === 'distributiva'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                3. Distributiva
              </button>
              <button
                onClick={() => setSelectedProperty('invariantiva')}
                className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                  selectedProperty === 'invariantiva'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                4. Invariantiva
              </button>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Imposta i Numeri
              </h4>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Valore A: {numA}</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={numA}
                  onChange={(e) => setNumA(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Valore B: {numB}</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={numB}
                  onChange={(e) => setNumB(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
              {(selectedProperty === 'associativa' || selectedProperty === 'distributiva' || selectedProperty === 'invariantiva') && (
                <div>
                  <label className="text-xs text-slate-400 block mb-1">
                    {selectedProperty === 'invariantiva' ? 'Fattore K aggiunto/moltiplicato: ' : 'Valore C: '}
                    {numC}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={numC}
                    onChange={(e) => setNumC(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Demonstration Board */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Dimostrazione Grafica
                </span>
                <span className="text-xs text-slate-400">Passo dopo passo</span>
              </div>

              {/* Property Details Display */}
              {selectedProperty === 'commutativa' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">
                    Proprietà Commutativa: <span className="text-indigo-400">a + b = b + a</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Cambiando l'ordine degli addendi (o dei fattori), il risultato non cambia.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                      <span className="text-xs text-slate-400 block mb-1">Ordine Standard</span>
                      <span className="text-xl font-mono font-bold text-white">
                        {numA} + {numB} = <span className="text-emerald-400">{numA + numB}</span>
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/80 border border-indigo-500/40 text-center">
                      <span className="text-xs text-indigo-300 block mb-1">Ordine Commutato</span>
                      <span className="text-xl font-mono font-bold text-white">
                        {numB} + {numA} = <span className="text-emerald-400">{numB + numA}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 text-center">
                    <span className="text-xs text-slate-400 block mb-1">Anche per la moltiplicazione:</span>
                    <span className="font-mono text-base text-cyan-300">
                      {numA} × {numB} = {numA * numB} &nbsp; ⟷ &nbsp; {numB} × {numA} = {numB * numA}
                    </span>
                  </div>
                </div>
              )}

              {selectedProperty === 'associativa' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">
                    Proprietà Associativa: <span className="text-indigo-400">(a + b) + c = a + (b + c)</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    La somma di tre o più numeri non cambia se si sostituiscono due o più addendi con la loro somma.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                      <span className="text-xs text-slate-400 block mb-1">Prima calcola (A + B)</span>
                      <span className="text-lg font-mono font-bold text-white block">
                        ({numA} + {numB}) + {numC}
                      </span>
                      <span className="text-sm font-mono text-slate-400 mt-1 block">
                        = {numA + numB} + {numC} = <span className="text-emerald-400 font-bold">{numA + numB + numC}</span>
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/80 border border-indigo-500/40 text-center">
                      <span className="text-xs text-indigo-300 block mb-1">Prima calcola (B + C)</span>
                      <span className="text-lg font-mono font-bold text-white block">
                        {numA} + ({numB} + {numC})
                      </span>
                      <span className="text-sm font-mono text-slate-400 mt-1 block">
                        = {numA} + {numB + numC} = <span className="text-emerald-400 font-bold">{numA + numB + numC}</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {selectedProperty === 'distributiva' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">
                    Proprietà Distributiva: <span className="text-indigo-400">a × (b + c) = (a × b) + (a × c)</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Per moltiplicare un numero per una somma, si moltiplica quel numero per ciascun addendo e poi si sommano i prodotti parziali.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                      <span className="text-xs text-slate-400 block mb-1">Forma Raccolta</span>
                      <span className="text-lg font-mono font-bold text-white block">
                        {numA} × ({numB} + {numC})
                      </span>
                      <span className="text-sm font-mono text-slate-400 mt-1 block">
                        = {numA} × {numB + numC} = <span className="text-emerald-400 font-bold">{numA * (numB + numC)}</span>
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/80 border border-indigo-500/40 text-center">
                      <span className="text-xs text-indigo-300 block mb-1">Forma Distribuita</span>
                      <span className="text-lg font-mono font-bold text-white block">
                        ({numA} × {numB}) + ({numA} × {numC})
                      </span>
                      <span className="text-sm font-mono text-slate-400 mt-1 block">
                        = {numA * numB} + {numA * numC} = <span className="text-emerald-400 font-bold">{numA * (numB + numC)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {selectedProperty === 'invariantiva' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">
                    Proprietà Invariantiva: <span className="text-indigo-400">(a - b) = (a + k) - (b + k)</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Nella sottrazione, la differenza non cambia se si aggiunge o toglie uno stesso numero a entrambi i termini. Nella divisione, moltiplicando o dividendo per lo stesso numero (diverso da zero) il quoziente non cambia.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                      <span className="text-xs text-slate-400 block mb-1">Sottrazione Base</span>
                      <span className="text-lg font-mono font-bold text-white block">
                        {Math.max(numA, numB)} - {Math.min(numA, numB)}
                      </span>
                      <span className="text-sm font-mono text-emerald-400 font-bold mt-1 block">
                        = {Math.max(numA, numB) - Math.min(numA, numB)}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/80 border border-indigo-500/40 text-center">
                      <span className="text-xs text-indigo-300 block mb-1">Aggiungendo {numC} a entrambi</span>
                      <span className="text-lg font-mono font-bold text-white block">
                        ({Math.max(numA, numB)} + {numC}) - ({Math.min(numA, numB)} + {numC})
                      </span>
                      <span className="text-sm font-mono text-emerald-400 font-bold mt-1 block">
                        = {Math.max(numA, numB) + numC} - {Math.min(numA, numB) + numC} = {Math.max(numA, numB) - Math.min(numA, numB)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-300 flex items-center justify-between">
              <span>💡 Suggerimento: Cambia i valori con gli slider a sinistra per testare altri esempi.</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Teoria */}
      {activeTab === 'teoria' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">Addizione & Moltiplicazione</span>
            <h4 className="text-base font-bold text-white mb-2">Proprietà Commutativa</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cambiando l'ordine dei termini il risultato finale non subisce modifiche.
            </p>
            <div className="mt-3 p-3 rounded-xl bg-slate-800/60 font-mono text-xs text-indigo-300">
              a + b = b + a <br />
              a · b = b · a
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">Addizione & Moltiplicazione</span>
            <h4 className="text-base font-bold text-white mb-2">Proprietà Associativa</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              In una sequenza di operazioni, è possibile raggruppare i termini senza modificare il risultato.
            </p>
            <div className="mt-3 p-3 rounded-xl bg-slate-800/60 font-mono text-xs text-emerald-300">
              (a + b) + c = a + (b + c) <br />
              (a · b) · c = a · (b · c)
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">Moltiplicazione su Somma</span>
            <h4 className="text-base font-bold text-white mb-2">Proprietà Distributiva</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              La moltiplicazione di un fattore per una parentesi si distribuisce su ogni addendo.
            </p>
            <div className="mt-3 p-3 rounded-xl bg-slate-800/60 font-mono text-xs text-cyan-300">
              a · (b + c) = a · b + a · c <br />
              a · (b - c) = a · b - a · c
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">Sottrazione & Divisione</span>
            <h4 className="text-base font-bold text-white mb-2">Proprietà Invariantiva</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Utile per semplificare il calcolo a mente aggiungendo o moltiplicando per una quantità opportuna.
            </p>
            <div className="mt-3 p-3 rounded-xl bg-slate-800/60 font-mono text-xs text-amber-300">
              a - b = (a + k) - (b + k) <br />
              a : b = (a · k) : (b · k) con k ≠ 0
            </div>
          </div>
        </div>
      )}

      {/* Tab: Quiz */}
      {activeTab === 'quiz' && (
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-slate-900 border border-slate-800">
          {!quizFinished ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                <span>Domanda {quizIndex + 1} di {QUIZ_QUESTIONS.length}</span>
                <span>Punteggio attuale: <strong className="text-indigo-400">{quizScore}</strong></span>
              </div>

              <h3 className="text-lg font-bold text-white leading-snug">
                {QUIZ_QUESTIONS[quizIndex].question}
              </h3>

              <div className="space-y-2.5">
                {QUIZ_QUESTIONS[quizIndex].options.map((option, idx) => {
                  let style = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750';
                  if (selectedAnswer !== null) {
                    if (idx === QUIZ_QUESTIONS[quizIndex].correct) {
                      style = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                    } else if (idx === selectedAnswer) {
                      style = 'bg-rose-500/20 border-rose-500 text-rose-300';
                    } else {
                      style = 'bg-slate-800/40 border-slate-800 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedAnswer !== null}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full text-left p-3.5 rounded-xl text-sm border transition-all flex items-center justify-between ${style}`}
                    >
                      <span>{option}</span>
                      {selectedAnswer !== null && idx === QUIZ_QUESTIONS[quizIndex].correct && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {selectedAnswer !== null && idx === selectedAnswer && idx !== QUIZ_QUESTIONS[quizIndex].correct && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedAnswer !== null && (
                <div className="p-3.5 rounded-xl bg-slate-800 text-xs text-slate-300 border border-slate-700 space-y-2">
                  <p>{QUIZ_QUESTIONS[quizIndex].explanation}</p>
                  <button
                    onClick={handleNextQuiz}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                  >
                    <span>{quizIndex < QUIZ_QUESTIONS.length - 1 ? 'Prossima Domanda' : 'Vedi Risultato'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white">Quiz Completato!</h3>
              <p className="text-slate-300 text-sm">
                Hai totalizzato <strong className="text-indigo-400">{quizScore}</strong> punti su <strong className="text-white">{QUIZ_QUESTIONS.length}</strong>.
              </p>
              <button
                onClick={handleResetQuiz}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Riprova il Quiz</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
