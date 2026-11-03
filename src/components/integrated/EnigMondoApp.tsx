import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCw,
  Lightbulb,
  HelpCircle,
  Trophy,
  Dices,
  Puzzle,
  ArrowRight,
  BrainCircuit,
  Gamepad2,
  Check,
} from 'lucide-react';
import { profIpaziaImg, samuImg } from '../../data/mascots';

interface EnigMondoAppProps {
  onBackToHome?: () => void;
}

export const EnigMondoApp: React.FC<EnigMondoAppProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'quadrato' | 'bilancia' | 'sequenze' | 'indovinelli'>('quadrato');

  // --- GAME 1: QUADRATO MAGICO 3x3 (Somma = 15) ---
  // Solution:
  // 8 1 6
  // 3 5 7
  // 4 9 2
  const [magicGrid, setMagicGrid] = useState<(number | null)[]>([
    8, 1, 6,
    3, 5, null,
    4, null, 2,
  ]);
  const [selectedCell, setSelectedCell] = useState<number | null>(5); // start with empty cell (index 5)
  const [magicFeedback, setMagicFeedback] = useState<string | null>(null);

  // Check magic square validity
  const checkMagicSquare = () => {
    // Check if filled
    if (magicGrid.some((c) => c === null)) {
      setMagicFeedback('Riempi tutte le celle con i numeri da 1 a 9!');
      return;
    }
    const g = magicGrid as number[];
    // Check distinct numbers 1-9
    const set = new Set(g);
    if (set.size !== 9) {
      setMagicFeedback('Ogni numero da 1 a 9 deve comparire esattamente una volta!');
      return;
    }

    const r1 = g[0] + g[1] + g[2];
    const r2 = g[3] + g[4] + g[5];
    const r3 = g[6] + g[7] + g[8];

    const c1 = g[0] + g[3] + g[6];
    const c2 = g[1] + g[4] + g[7];
    const c3 = g[2] + g[5] + g[8];

    const d1 = g[0] + g[4] + g[8];
    const d2 = g[2] + g[4] + g[6];

    if (
      r1 === 15 && r2 === 15 && r3 === 15 &&
      c1 === 15 && c2 === 15 && c3 === 15 &&
      d1 === 15 && d2 === 15
    ) {
      setMagicFeedback('VITTORIA! 🎉 Quadrato Magico completato con successo! Ogni somma fa 15!');
    } else {
      setMagicFeedback('Attenzione: una riga, colonna o diagonale non somma a 15. Riprova!');
    }
  };

  const handlePlaceNumber = (num: number) => {
    if (selectedCell === null) return;
    const next = [...magicGrid];
    next[selectedCell] = num;
    setMagicGrid(next);
    setMagicFeedback(null);
  };

  const handleClearCell = () => {
    if (selectedCell === null) return;
    const next = [...magicGrid];
    next[selectedCell] = null;
    setMagicGrid(next);
    setMagicFeedback(null);
  };

  const handleResetMagicSquare = () => {
    setMagicGrid([
      8, 1, 6,
      3, 5, null,
      4, null, 2,
    ]);
    setSelectedCell(5);
    setMagicFeedback(null);
  };

  // --- GAME 2: BILANCIA DELLE FORME (EQUAZIONI LOGICO-VISIVE) ---
  const PUZZLES = [
    {
      id: 1,
      title: 'Livello 1: Le Figure Geometriche',
      clues: [
        '⭐ + ⭐ = 10',
        '⭐ + 🔺 = 9',
        '🔺 - 🔵 = 1',
      ],
      question: 'Quanto vale: ⭐ + 🔺 × 🔵 ?',
      options: [17, 27, 18, 22],
      correct: 17, // Star = 5, Tri = 4, Circle = 3. 5 + 4 * 3 = 5 + 12 = 17 (precedenza alla moltiplicazione!)
      explanation: '⭐ = 5. Da 5 + 🔺 = 9 ricaviamo 🔺 = 4. Da 4 - 🔵 = 1 ricaviamo 🔵 = 3. Attenzione alla precedenza delle operazioni: ⭐ + (🔺 × 🔵) = 5 + (4 × 3) = 5 + 12 = 17!',
    },
    {
      id: 2,
      title: 'Livello 2: La Frutta Matematica',
      clues: [
        '🍎 + 🍎 + 🍎 = 30',
        '🍎 + 🍌 + 🍌 = 18',
        '🍌 - 🥥 = 2',
      ],
      question: 'Quanto vale: 🥥 + 🍎 + 🍌 ?',
      options: [16, 18, 20, 14],
      correct: 16, // Mela = 10, Banana = 4, Cocco = 2. 2 + 10 + 4 = 16
      explanation: '🍎 = 10 (perché 30 : 3 = 10). Da 10 + 2 banane = 18, le 2 banane valgono 8, quindi 🍌 = 4. Da 4 - 🥥 = 2 ricaviamo 🥥 = 2. Infine: 2 + 10 + 4 = 16!',
    },
    {
      id: 3,
      title: 'Livello 3: Gli Animali di ScienzaLab',
      clues: [
        '🦖 + 🦖 = 20',
        '🦖 × 🦉 = 30',
        '🦉 + 🦊 = 8',
      ],
      question: 'Quanto vale: (🦖 + 🦊) × 🦉 ?',
      options: [45, 39, 50, 42],
      correct: 45, // Dino = 10, Civetta = 3, Volpe = 5. (10 + 5) * 3 = 15 * 3 = 45
      explanation: '🦖 = 10. Da 10 × 🦉 = 30, la civetta 🦉 = 3. Da 3 + 🦊 = 8, la volpe 🦊 = 5. Infine con le parentesi: (10 + 5) × 3 = 15 × 3 = 45!',
    },
  ];
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [selectedPuzzleAnswer, setSelectedPuzzleAnswer] = useState<number | null>(null);
  const currentPuzzle = PUZZLES[puzzleIndex];

  // --- GAME 3: SEQUENZE NUMERICHE MISTERIOSE ---
  const SEQUENCES = [
    {
      title: 'La Regola del Raddoppio',
      seq: [3, 6, 12, 24, 48, '?'],
      rule: 'Ogni numero è il doppio del precedente (× 2)',
      answer: 96,
      options: [96, 60, 72, 84],
      hint: 'Cosa succede da 3 a 6, da 6 a 12, da 12 a 24?',
    },
    {
      title: 'I Numeri Quadrati',
      seq: [1, 4, 9, 16, 25, '?'],
      rule: '1², 2², 3², 4², 5², 6² (oppure +3, +5, +7, +9, +11)',
      answer: 36,
      options: [30, 36, 49, 35],
      hint: '1×1=1, 2×2=4, 3×3=9, 4×4=16, 5×5=25...',
    },
    {
      title: 'La Serie di Fibonacci',
      seq: [1, 1, 2, 3, 5, 8, 13, '?'],
      rule: 'Ogni termine è la somma dei due che lo precedono (5+8=13, 8+13=?)',
      answer: 21,
      options: [19, 20, 21, 25],
      hint: 'Somma gli ultimi due numeri: 8 + 13 = ?',
    },
    {
      title: 'Alternanza di Operazioni',
      seq: [2, 6, 4, 12, 10, '?'],
      rule: 'Moltiplica per 3, poi sottrai 2 (×3, -2, ×3, -2, ×3)',
      answer: 30,
      options: [20, 30, 15, 25],
      hint: '2 × 3 = 6; 6 - 2 = 4; 4 × 3 = 12; 12 - 2 = 10; 10 × 3 = ?',
    },
  ];
  const [seqIndex, setSeqIndex] = useState(0);
  const [selectedSeqAnswer, setSelectedSeqAnswer] = useState<number | null>(null);
  const currentSeq = SEQUENCES[seqIndex];

  // --- GAME 4: INDOVINELLI LOGICI DI SAMU & IPAZIA ---
  const RIDDLES = [
    {
      title: 'L\'età delle due sorelle',
      text: 'Quando Sara aveva 6 anni, sua sorella Elena aveva la metà dei suoi anni. Oggi Sara compie 50 anni. Quanti anni ha Elena?',
      hint: 'La differenza di età tra due persone non cambia mai nel tempo!',
      solution: 'Elena ha 47 anni! Quando Sara aveva 6 anni, Elena ne aveva 3 (6 - 3 = 3 anni di differenza). Oggi Sara ha 50 anni, quindi Elena ne ha 50 - 3 = 47 (e non 25)!',
    },
    {
      title: 'Le candele accese nella stanza',
      text: 'Su un tavolo ci sono 10 candele accese. Un colpo di vento improvviso ne spegne 3. Più tardi il vento ne spegne altre 2. Alla fine della giornata, quante candele rimangono sul tavolo?',
      hint: 'Cosa succede alle candele che continuano a bruciare?',
      solution: 'Rimangono 5 candele! Le 5 candele spente dal vento non si sono consumate e rimangono intatte sul tavolo. Le altre 5 hanno continuato a bruciare fino a sciogliersi completamente in cera!',
    },
    {
      title: 'Il mattone e il suo peso',
      text: 'Un mattone pesa 1 kg più mezzo mattone. Quanto pesa un mattone intero?',
      hint: 'Immagina una bilancia: se togli mezzo mattone da entrambi i lati, cosa resta?',
      solution: 'Pesa 2 kg! Se un mattone = 1 kg + mezzo mattone, significa che mezzo mattone pesa esattamente 1 kg. Quindi il mattone intero pesa 1 kg × 2 = 2 kg!',
    },
  ];
  const [riddleIndex, setRiddleIndex] = useState(0);
  const [showRiddleSolution, setShowRiddleSolution] = useState(false);

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* App Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-purple-950/90 via-slate-900 to-indigo-950/90 border border-purple-500/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-2xl shadow-inner">
            🧩
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Palestra di Giochi Matematici
              </span>
              <span className="text-xs text-slate-400 font-medium">Scuola Media • Tutte le Classi</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
              <span>EnigMondo: Giochi & Rompicapi</span>
              <span className="text-xs font-normal text-purple-300 font-mono hidden sm:inline">enigmondo.vercel.app</span>
            </h2>
            <p className="text-xs text-slate-300">
              Rompicapi logici, quadrati magici, bilance algebriche visive e sfide matematiche guidate da <strong className="text-white">Samu</strong> e dalla <strong className="text-white">Prof.ssa Ipazia</strong>.
            </p>
          </div>
        </div>

        {/* Mascot badge */}
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs shrink-0 self-end md:self-center">
          <img src={profIpaziaImg} alt="Prof.ssa Ipazia" className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-400" />
          <img src={samuImg} alt="Samu" className="w-8 h-8 rounded-full object-cover ring-2 ring-yellow-400" />
          <div className="pr-1">
            <span className="font-bold text-white block text-[11px]">Enigmi & Logica</span>
            <span className="text-purple-300 text-[10px]">Prof.ssa Ipazia & Samu</span>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto pb-1.5 scrollbar-none touch-pan-x">
        <button
          onClick={() => setActiveTab('quadrato')}
          className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 active:scale-95 touch-manipulation whitespace-nowrap ${
            activeTab === 'quadrato'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Puzzle className="w-4 h-4 text-purple-300" />
          <span>1. Il Quadrato Magico (Somma 15)</span>
        </button>

        <button
          onClick={() => setActiveTab('bilancia')}
          className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 active:scale-95 touch-manipulation whitespace-nowrap ${
            activeTab === 'bilancia'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-cyan-300" />
          <span>2. La Bilancia delle Forme</span>
        </button>

        <button
          onClick={() => setActiveTab('sequenze')}
          className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 active:scale-95 touch-manipulation whitespace-nowrap ${
            activeTab === 'sequenze'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Dices className="w-4 h-4 text-amber-300" />
          <span>3. Sequenze Misteriose</span>
        </button>

        <button
          onClick={() => setActiveTab('indovinelli')}
          className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 active:scale-95 touch-manipulation whitespace-nowrap ${
            activeTab === 'indovinelli'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Lightbulb className="w-4 h-4 text-emerald-300" />
          <span>4. Gli Indovinelli di Samu</span>
        </button>
      </div>

      {/* --- TAB 1: IL QUADRATO MAGICO 3x3 --- */}
      {activeTab === 'quadrato' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  Antico Gioco Matematico (Lo Shu)
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  Completa il Quadrato Magico 3×3 (La Costante Magica è 15!)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Inserisci i numeri mancanti da 1 a 9 senza ripeterli. La somma di ogni riga, ogni colonna e le due diagonali deve fare sempre <strong className="text-purple-300">15</strong>!
                </p>
              </div>

              <button
                onClick={handleResetMagicSquare}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-all self-start sm:self-center shrink-0 active:scale-95"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Ricomincia</span>
              </button>
            </div>

            {/* Split: Grid + Numeric keypad */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* The 3x3 Grid */}
              <div className="md:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                <div className="grid grid-cols-3 gap-3 w-64 h-64">
                  {magicGrid.map((val, idx) => {
                    const isSelected = selectedCell === idx;
                    const isPrefilled = idx !== 5 && idx !== 7; // cells 5 and 7 are empty in the initial puzzle

                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedCell(idx)}
                        className={`rounded-2xl text-2xl font-black font-mono flex items-center justify-center transition-all border ${
                          isSelected
                            ? 'bg-purple-600 text-white ring-4 ring-purple-400 border-white shadow-lg'
                            : val !== null
                            ? isPrefilled
                              ? 'bg-slate-850 text-slate-300 border-slate-700'
                              : 'bg-indigo-950/80 text-cyan-300 border-cyan-500/50 shadow-inner'
                            : 'bg-slate-900 text-slate-600 border-dashed border-slate-700 hover:border-purple-400'
                        }`}
                      >
                        {val !== null ? val : '?'}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 text-xs text-slate-400">
                  Tocca una casella con <strong className="text-white">?</strong> e seleziona il numero da inserire.
                </div>
              </div>

              {/* Number Keypad & Verification */}
              <div className="md:col-span-6 space-y-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-bold text-slate-300 block mb-3">
                    Seleziona il numero per la casella selezionata:
                  </span>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                      const isUsed = magicGrid.includes(num);
                      return (
                        <button
                          key={num}
                          onClick={() => handlePlaceNumber(num)}
                          disabled={isUsed}
                          className={`min-h-[44px] rounded-xl text-base font-black font-mono transition-all border active:scale-95 touch-manipulation ${
                            isUsed
                              ? 'bg-slate-900 text-slate-600 border-slate-800 opacity-40 cursor-not-allowed'
                              : 'bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white border-purple-500/40 shadow-sm'
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                    <button
                      onClick={handleClearCell}
                      className="min-h-[44px] rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 active:scale-95"
                    >
                      Canc
                    </button>
                  </div>
                </div>

                {/* Check Button */}
                <button
                  onClick={checkMagicSquare}
                  className="w-full min-h-[48px] py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-950/60 transition-all active:scale-95 touch-manipulation flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  <span>Verifica il Quadrato Magico</span>
                </button>

                {magicFeedback && (
                  <div className={`p-4 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-fade-in ${
                    magicFeedback.includes('VITTORIA')
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                      : 'bg-amber-950/80 border-amber-500 text-amber-300'
                  }`}>
                    {magicFeedback.includes('VITTORIA') ? (
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                    ) : (
                      <Lightbulb className="w-5 h-5 shrink-0 text-amber-400" />
                    )}
                    <span>{magicFeedback}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: LA BILANCIA DELLE FORME (EQUAZIONI VISIVE) --- */}
      {activeTab === 'bilancia' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Problem Solving & Pre-Algebra
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  La Bilancia delle Forme: {currentPuzzle.title}
                </h3>
              </div>

              {/* Puzzle Level Switcher */}
              <div className="flex items-center gap-1.5">
                {PUZZLES.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPuzzleIndex(idx);
                      setSelectedPuzzleAnswer(null);
                    }}
                    className={`min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      puzzleIndex === idx
                        ? 'bg-cyan-600 text-white ring-2 ring-cyan-400'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    Livello {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Clues Box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {currentPuzzle.clues.map((clue, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center font-mono text-lg font-black text-cyan-300 shadow-inner flex items-center justify-center"
                >
                  {clue}
                </div>
              ))}
            </div>

            {/* Question Card */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center mb-6">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block mb-1">
                La Sfida da Risolvere:
              </span>
              <div className="text-xl sm:text-2xl font-black font-mono text-white">
                {currentPuzzle.question}
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {currentPuzzle.options.map((opt) => {
                const isSelected = selectedPuzzleAnswer === opt;
                const isCorrect = opt === currentPuzzle.correct;

                let btnStyle = 'bg-slate-800 hover:bg-slate-750 text-white border-slate-700';
                if (selectedPuzzleAnswer !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/50';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300 ring-2 ring-rose-500/50';
                  } else {
                    btnStyle = 'bg-slate-900 text-slate-600 border-slate-800 opacity-40';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => setSelectedPuzzleAnswer(opt)}
                    disabled={selectedPuzzleAnswer !== null}
                    className={`min-h-[52px] p-3 rounded-2xl border text-xl font-black font-mono transition-all active:scale-95 touch-manipulation flex items-center justify-center gap-2 ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedPuzzleAnswer !== null && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {selectedPuzzleAnswer !== null && (
              <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-500/40 text-xs sm:text-sm text-indigo-200 leading-relaxed animate-fade-in flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Spiegazione del ragionamento:</strong>
                  {currentPuzzle.explanation}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- TAB 3: SEQUENZE NUMERICHE MISTERIOSE --- */}
      {activeTab === 'sequenze' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Logica & Pensiero Sequenziale
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  Trova il Numero Mancante: {currentSeq.title}
                </h3>
              </div>

              {/* Sequence Selector */}
              <div className="flex items-center gap-1.5">
                {SEQUENCES.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSeqIndex(idx);
                      setSelectedSeqAnswer(null);
                    }}
                    className={`min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      seqIndex === idx
                        ? 'bg-amber-600 text-white ring-2 ring-amber-400'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    Enigma {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Sequence Boxes */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 mb-6 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              {currentSeq.seq.map((item, idx) => {
                const isTarget = item === '?';
                return (
                  <div
                    key={idx}
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl border flex items-center justify-center font-black font-mono text-lg sm:text-2xl shadow-md ${
                      isTarget
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500 ring-2 ring-amber-400/40 animate-pulse'
                        : 'bg-slate-900 text-white border-slate-700'
                    }`}
                  >
                    {isTarget && selectedSeqAnswer !== null ? selectedSeqAnswer : item}
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-slate-400 text-center mb-6">
              💡 Indizio di Samu: <strong className="text-slate-300">{currentSeq.hint}</strong>
            </p>

            {/* Answer Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {currentSeq.options.map((opt) => {
                const isSelected = selectedSeqAnswer === opt;
                const isCorrect = opt === currentSeq.answer;

                let btnStyle = 'bg-slate-800 hover:bg-slate-750 text-white border-slate-700';
                if (selectedSeqAnswer !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/50';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300 ring-2 ring-rose-500/50';
                  } else {
                    btnStyle = 'bg-slate-900 text-slate-600 border-slate-800 opacity-40';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => setSelectedSeqAnswer(opt)}
                    disabled={selectedSeqAnswer !== null}
                    className={`min-h-[52px] p-3 rounded-2xl border text-xl font-black font-mono transition-all active:scale-95 touch-manipulation flex items-center justify-center gap-2 ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedSeqAnswer !== null && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Rule reveal */}
            {selectedSeqAnswer !== null && (
              <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-500/40 text-xs sm:text-sm text-indigo-200 leading-relaxed animate-fade-in flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Regola della Sequenza:</strong>
                  {currentSeq.rule}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- TAB 4: GLI INDOVINELLI DI SAMU --- */}
      {activeTab === 'indovinelli' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Logica Laterale & Curiosità
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  Gli Indovinelli di Samu: {RIDDLES[riddleIndex].title}
                </h3>
              </div>

              {/* Riddle Switcher */}
              <div className="flex items-center gap-1.5">
                {RIDDLES.map((r, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setRiddleIndex(idx);
                      setShowRiddleSolution(false);
                    }}
                    className={`min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      riddleIndex === idx
                        ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    Indovinello {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Riddle text card */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 mb-6">
              <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
                "{RIDDLES[riddleIndex].text}"
              </p>
              <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-amber-300 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Indizio: {RIDDLES[riddleIndex].hint}</span>
              </div>
            </div>

            {/* Reveal Button */}
            {!showRiddleSolution ? (
              <button
                onClick={() => setShowRiddleSolution(true)}
                className="w-full min-h-[48px] py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/50 transition-all active:scale-95 touch-manipulation flex items-center justify-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Ho pensato alla risposta! Mostra la soluzione</span>
              </button>
            ) : (
              <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-xs sm:text-sm text-emerald-200 leading-relaxed animate-fade-in space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Soluzione & Spiegazione:</span>
                </div>
                <p>{RIDDLES[riddleIndex].solution}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
