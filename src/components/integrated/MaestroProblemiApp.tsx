import React, { useState, useMemo, useEffect } from 'react';
import {
  BrainCircuit,
  Home,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Sparkles,
  BarChart2,
  Scale,
  RotateCcw,
  Target,
  Search,
  Filter,
  Dices,
  Award,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { profSauroImg, miaImg, leoImg } from '../../data/mascots';
import {
  GradeId,
  ProblemItem,
  BarModelInfo,
  GRADES_CONFIG,
  PROBLEMS_BY_GRADE,
  ALL_PROBLEMS,
} from '../../data/problemBank';

interface MaestroProblemiAppProps {
  onBackToHome?: () => void;
}

export const MaestroProblemiApp: React.FC<MaestroProblemiAppProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'palestra' | 'risolutore' | 'metodo' | 'dizionario'>('palestra');

  // --- PALESTRA STATE (1.000 PROBLEMS) ---
  const [selectedGrade, setSelectedGrade] = useState<GradeId | 'all'>('1_media');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(0);

  // User interaction state for current problem
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Saved solved problem IDs in localStorage
  const [solvedIds, setSolvedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('scienzalab_maestro_solved_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('scienzalab_maestro_solved_ids', JSON.stringify(solvedIds));
    } catch {
      // ignore storage errors
    }
  }, [solvedIds]);

  // Filtered problems list
  const filteredProblems = useMemo(() => {
    let list = selectedGrade === 'all' ? ALL_PROBLEMS : PROBLEMS_BY_GRADE[selectedGrade];

    if (selectedTopic !== 'all') {
      list = list.filter((p) => p.topic === selectedTopic);
    }

    if (selectedDifficulty !== 'all') {
      list = list.filter((p) => p.difficulty === selectedDifficulty);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.text.toLowerCase().includes(q) ||
          p.topic.toLowerCase().includes(q)
      );
    }

    return list;
  }, [selectedGrade, selectedTopic, selectedDifficulty, searchQuery]);

  // Reset index when filters change
  useEffect(() => {
    setCurrentProblemIndex(0);
    setUserAnswer('');
    setShowHint1(false);
    setShowHint2(false);
    setShowSolution(false);
    setFeedback(null);
  }, [selectedGrade, selectedTopic, selectedDifficulty, searchQuery]);

  const activeProblem: ProblemItem | undefined = filteredProblems[currentProblemIndex] || filteredProblems[0];

  const handleNextProblem = () => {
    if (currentProblemIndex < filteredProblems.length - 1) {
      setCurrentProblemIndex((prev) => prev + 1);
      setUserAnswer('');
      setShowHint1(false);
      setShowHint2(false);
      setShowSolution(false);
      setFeedback(null);
    }
  };

  const handlePrevProblem = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex((prev) => prev - 1);
      setUserAnswer('');
      setShowHint1(false);
      setShowHint2(false);
      setShowSolution(false);
      setFeedback(null);
    }
  };

  const handleRandomProblem = () => {
    if (filteredProblems.length <= 1) return;
    const rand = Math.floor(Math.random() * filteredProblems.length);
    setCurrentProblemIndex(rand);
    setUserAnswer('');
    setShowHint1(false);
    setShowHint2(false);
    setShowSolution(false);
    setFeedback(null);
  };

  const handleCheckAnswer = () => {
    if (!activeProblem) return;
    const parsed = parseFloat(userAnswer.trim().replace(',', '.'));
    if (isNaN(parsed)) return;

    if (Math.abs(parsed - activeProblem.correctAnswer) < 0.05) {
      setFeedback('correct');
      if (!solvedIds.includes(activeProblem.id)) {
        setSolvedIds((prev) => [...prev, activeProblem.id]);
      }
    } else {
      setFeedback('wrong');
    }
  };

  // Grade topic list for filter dropdown
  const availableTopics = useMemo(() => {
    if (selectedGrade === 'all') {
      const set = new Set<string>();
      ALL_PROBLEMS.forEach((p) => set.add(p.topic));
      return Array.from(set);
    }
    return GRADES_CONFIG[selectedGrade]?.topics || [];
  }, [selectedGrade]);

  // Progress stats
  const gradeSolvedCount = useMemo(() => {
    const list = selectedGrade === 'all' ? ALL_PROBLEMS : PROBLEMS_BY_GRADE[selectedGrade];
    return list.filter((p) => solvedIds.includes(p.id)).length;
  }, [selectedGrade, solvedIds]);

  // --- RISOLUTORE LIBERO A SEGMENTI STATE ---
  const [segmentCase, setSegmentCase] = useState<'somma_diff' | 'somma_multiplo' | 'diff_multiplo' | 'frazione'>('somma_diff');
  const [sumVal, setSumVal] = useState(48);
  const [diffVal, setDiffVal] = useState(12);
  const [multiSum, setMultiSum] = useState(60);
  const [multiplier, setMultiplier] = useState(3);
  const [diffMulti, setDiffMulti] = useState(30);
  const [diffFactor, setDiffFactor] = useState(4);
  const [fractionNum, setFractionNum] = useState(3);
  const [fractionDen, setFractionDen] = useState(5);
  const [fractionTotal, setFractionTotal] = useState(45);

  return (
    <div className="space-y-6 text-slate-100">
      {/* Top Banner with Home Button & Mascot Spotlight */}
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
                1.000 Problemi • 5 Classi MIUR
              </span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
                <img src={profSauroImg} alt="Prof. Sauro" className="w-4 h-4 rounded-full object-cover" />
                <img src={miaImg} alt="Mia" className="w-4 h-4 rounded-full object-cover" />
                <span>Prof. Sauro & Mia</span>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Il Maestro dei Problemi
            </h2>
            <p className="text-xs text-slate-400">
              Palestra completa con 200 problemi per classe (dalla 4ª primaria alla 3ª media) con modello a barre e metodo guidato
            </p>
          </div>
        </div>

        {/* Action: Return to ScienzaLab Home & Live Vercel Link */}
        <div className="flex items-center gap-2 flex-wrap">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700 hover:border-cyan-500 transition-all shadow-sm"
              title="Torna alla Home Page di ScienzaLab"
            >
              <ArrowLeft className="w-4 h-4" />
              <Home className="w-4 h-4 text-cyan-400" />
              <span>Torna alla Home</span>
            </button>
          )}

          <a
            href="https://ilmaestrodeiproblemi.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 hover:text-white border border-emerald-500/40 hover:border-emerald-400 transition-all shadow-sm"
            title="Apri l'app originale su Vercel (https://ilmaestrodeiproblemi.vercel.app/)"
          >
            <span>App Originale su Vercel</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-800/80 rounded-xl border border-slate-700/80">
            <button
              onClick={() => setActiveTab('palestra')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'palestra'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Palestra 1.000 Problemi
            </button>
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

      {/* ======================================================== */}
      {/* TAB 1: PALESTRA 1.000 PROBLEMI SULLE 5 CLASSI           */}
      {/* ======================================================== */}
      {activeTab === 'palestra' && (
        <div className="space-y-6">
          {/* Class Selection Ribbon */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Seleziona la Classe (200 problemi dedicati per classe):
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-slate-300">
                  Risolti:{' '}
                  <strong className="text-emerald-400 font-bold">{gradeSolvedCount}</strong> /{' '}
                  {selectedGrade === 'all' ? ALL_PROBLEMS.length : 200}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {(
                [
                  { id: '4_primaria', label: '4ª Primaria', tag: 'Primaria' },
                  { id: '5_primaria', label: '5ª Primaria', tag: 'Primaria' },
                  { id: '1_media', label: '1ª Media', tag: 'Secondaria' },
                  { id: '2_media', label: '2ª Media', tag: 'Secondaria' },
                  { id: '3_media', label: '3ª Media', tag: 'Secondaria' },
                  { id: 'all', label: 'Tutte le Classi', tag: '1.000 Problemi' },
                ] as const
              ).map((tab) => {
                const isSelected = selectedGrade === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSelectedGrade(tab.id);
                      setSelectedTopic('all');
                    }}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-indigo-400 shadow-md ring-2 ring-indigo-500/40'
                        : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/70 text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-extrabold truncate">{tab.label}</div>
                    <div className="text-[10px] text-slate-400 opacity-80">{tab.tag}</div>
                  </button>
                );
              })}
            </div>

            {/* Filter Bar: Topic, Difficulty, Search, Random */}
            <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
                {/* Topic Selector */}
                <div className="relative">
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="all">Tutti gli argomenti ({availableTopics.length})</option>
                    {availableTopics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty */}
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="all">Difficoltà: Tutte</option>
                  <option value="Base">Base</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzato">Avanzato</option>
                </select>

                {/* Search */}
                <div className="relative flex-1 min-w-[140px] max-w-xs">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cerca problema..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Randomizer & Total Count */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRandomProblem}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-all shadow-sm"
                  title="Estrai un problema casuale dalla selezione"
                >
                  <Dices className="w-3.5 h-3.5" />
                  <span>Casuale</span>
                </button>
                <span className="text-xs text-slate-400 font-medium">
                  {filteredProblems.length} disponibili
                </span>
              </div>
            </div>
          </div>

          {/* Active Problem Card */}
          {activeProblem ? (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
              {/* Problem Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                    {activeProblem.gradeLabel}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    {activeProblem.topic}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                      activeProblem.difficulty === 'Base'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : activeProblem.difficulty === 'Intermedio'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    Livello {activeProblem.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-mono">
                    Problema {currentProblemIndex + 1} di {filteredProblems.length} ({activeProblem.id})
                  </span>
                  {solvedIds.includes(activeProblem.id) && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Risolto!
                    </span>
                  )}
                </div>
              </div>

              {/* Problem Title & Narrative Text */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {activeProblem.title}
                </h3>
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  {activeProblem.text}
                </div>
              </div>

              {/* Visual Bar Model Representation */}
              {activeProblem.barModel && (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <BarChart2 className="w-4 h-4" />
                      Modello a Barre & Rappresentazione Grafica
                    </span>
                    <span className="text-[11px] text-slate-400">Ragionamento Visivo</span>
                  </div>

                  {/* Render Visual Bars */}
                  <div className="space-y-2.5 pt-2">
                    {activeProblem.barModel.labels.map((label, idx) => {
                      const val = activeProblem.barModel.unitValues?.[idx];
                      const maxVal = Math.max(...(activeProblem.barModel.unitValues || [100]));
                      const pct = val && maxVal ? Math.max(15, Math.min(100, (val / maxVal) * 100)) : 70;
                      const colors = [
                        'bg-emerald-600 border-emerald-500 text-white',
                        'bg-cyan-600 border-cyan-500 text-white',
                        'bg-indigo-600 border-indigo-500 text-white',
                        'bg-amber-600 border-amber-500 text-slate-950',
                      ];
                      const c = colors[idx % colors.length];

                      return (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-slate-300">
                            <span className="font-semibold">{label}</span>
                            {val !== undefined && (
                              <span className="font-mono text-cyan-300 font-bold">{val}</span>
                            )}
                          </div>
                          <div
                            className={`h-7 rounded-lg border flex items-center px-3 text-xs font-bold shadow-md transition-all ${c}`}
                            style={{ width: `${pct}%` }}
                          >
                            {val !== undefined ? `${val} ${activeProblem.barModel.unitText || ''}` : label}
                          </div>
                        </div>
                      );
                    })}

                    {activeProblem.barModel.totalLabel && (
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-indigo-300 font-semibold">
                        <span>{activeProblem.barModel.totalLabel}</span>
                        {activeProblem.barModel.diffLabel && (
                          <span className="text-amber-300">{activeProblem.barModel.diffLabel}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Question & Interactive Answer Input */}
              <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/30 border border-indigo-900/40 space-y-3">
                <label className="text-xs sm:text-sm font-bold text-white block">
                  🎯 Domanda: <span className="text-amber-300">{activeProblem.question}</span>
                </label>

                <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                  <div className="relative flex-1 min-w-[200px]">
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer()}
                      placeholder="Scrivi la risposta numerica..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  {activeProblem.unit && (
                    <span className="text-xs font-bold text-slate-300 px-2 py-1 bg-slate-800/80 rounded-lg border border-slate-700">
                      {activeProblem.unit}
                    </span>
                  )}
                  <button
                    onClick={handleCheckAnswer}
                    className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/40 transition-all shrink-0"
                  >
                    Verifica Risposta
                  </button>
                </div>

                {/* Feedback Banner */}
                {feedback === 'correct' && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-fade-in">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>
                      Eccellente! Risposta esatta: {activeProblem.correctAnswer} {activeProblem.unit}. Ottimo lavoro!
                    </span>
                  </div>
                )}
                {feedback === 'wrong' && (
                  <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 animate-fade-in">
                    <span>Non corrisponde. Consulta i suggerimenti qui sotto per trovare la strada corretta!</span>
                    <button
                      onClick={() => setShowHint1(true)}
                      className="text-xs underline text-amber-300 hover:text-white shrink-0 font-bold"
                    >
                      Apri Suggerimento
                    </button>
                  </div>
                )}
              </div>

              {/* Progressive Hints & Step-by-Step Guided Solution */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setShowHint1((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition-all"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{showHint1 ? 'Nascondi Suggerimento 1' : 'Suggerimento 1 (Come impostare)'}</span>
                  </button>

                  <button
                    onClick={() => setShowHint2((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 transition-all"
                  >
                    <Target className="w-3.5 h-3.5" />
                    <span>{showHint2 ? 'Nascondi Suggerimento 2' : 'Suggerimento 2 (Operazione chiave)'}</span>
                  </button>

                  <button
                    onClick={() => setShowSolution((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all ml-auto"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{showSolution ? 'Nascondi Soluzione a Passi' : 'Mostra Risoluzione Completa'}</span>
                  </button>
                </div>

                {showHint1 && (
                  <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs sm:text-sm text-amber-200 animate-fade-in flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-amber-300">Suggerimento 1 (Prof. Sauro):</strong>
                      <p>{activeProblem.hint1}</p>
                    </div>
                  </div>
                )}

                {showHint2 && (
                  <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs sm:text-sm text-cyan-200 animate-fade-in flex items-start gap-2">
                    <Target className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-cyan-300">Suggerimento 2 (Mia):</strong>
                      <p>{activeProblem.hint2}</p>
                    </div>
                  </div>
                )}

                {showSolution && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-indigo-900/60 text-xs sm:text-sm space-y-2.5 animate-fade-in">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold">
                      <Sparkles className="w-4 h-4" />
                      <span>Risoluzione Guidata Passo per Passo:</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-1.5 text-slate-200 pl-1">
                      {activeProblem.solutionSteps.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                    <div className="pt-2 border-t border-slate-800 text-xs text-emerald-400 font-bold">
                      Risposta Finale: {activeProblem.correctAnswer} {activeProblem.unit}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Controls: Prev / Next */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={handlePrevProblem}
                  disabled={currentProblemIndex === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white border border-slate-700 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Problema Precedente</span>
                </button>

                <div className="text-xs text-slate-400 font-mono hidden sm:inline">
                  {currentProblemIndex + 1} / {filteredProblems.length}
                </div>

                <button
                  onClick={handleNextProblem}
                  disabled={currentProblemIndex >= filteredProblems.length - 1}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow transition-all"
                >
                  <span>Problema Successivo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 text-slate-400 space-y-3">
              <Search className="w-10 h-10 mx-auto text-slate-600" />
              <p className="text-sm font-semibold text-white">Nessun problema trovato con i filtri attuali.</p>
              <button
                onClick={() => {
                  setSelectedTopic('all');
                  setSelectedDifficulty('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white"
              >
                Reimposta Filtri
              </button>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: RISOLUTORE INTERATTIVO A SEGMENTI (SANDBOX)       */}
      {/* ======================================================== */}
      {activeTab === 'risolutore' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Box */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-2">
                1. Scegli la Tipologia di Problema
              </span>
              <div className="space-y-2">
                {[
                  { id: 'somma_diff', label: 'Somma e Differenza' },
                  { id: 'somma_multiplo', label: 'Somma e Multiplo (Uno è N volte)' },
                  { id: 'diff_multiplo', label: 'Differenza e Multiplo' },
                  { id: 'frazione', label: 'Frazione di una Quantità' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSegmentCase(item.id as any)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all ${
                      segmentCase === item.id
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md ring-1 ring-indigo-400'
                        : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs based on case */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-amber-300 block">
                2. Inserisci i tuoi dati (del compito o libro):
              </span>

              {segmentCase === 'somma_diff' && (
                <>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Somma dei due valori (s): {sumVal}</label>
                    <input
                      type="number"
                      value={sumVal}
                      onChange={(e) => setSumVal(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Differenza tra i due valori (d): {diffVal}</label>
                    <input
                      type="number"
                      value={diffVal}
                      onChange={(e) => setDiffVal(Number(e.target.value))}
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
                      onChange={(e) => setMultiSum(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Fattore di moltiplicazione (es. 3 per triplo): {multiplier}</label>
                    <input
                      type="number"
                      min="2"
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
                    <label className="text-xs text-slate-400 block mb-1">Differenza tra i due valori: {diffMulti}</label>
                    <input
                      type="number"
                      value={diffMulti}
                      onChange={(e) => setDiffMulti(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Fattore multiplo (es. 4 per quadruplo): {diffFactor}</label>
                    <input
                      type="number"
                      min="2"
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
                      <label className="text-xs text-slate-400 block mb-1">Numeratore: {fractionNum}</label>
                      <input
                        type="number"
                        min="1"
                        value={fractionNum}
                        onChange={(e) => setFractionNum(Math.max(1, Number(e.target.value)))}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Denominatore: {fractionDen}</label>
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

          {/* Visual Model & Step-by-Step Solver Output */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Rappresentazione Grafica a Segmenti
                </span>
                <span className="text-xs text-slate-400">Risoluzione Istantanea</span>
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

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Quantità Minore:</span>
                          <span className="font-mono text-emerald-400 font-bold">{minor.toFixed(1)}</span>
                        </div>
                        <div
                          className="h-7 bg-emerald-600 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow"
                          style={{ width: `${Math.max(20, Math.min(100, (minor / (major || 1)) * 80))}%` }}
                        >
                          {minor.toFixed(1)}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Quantità Maggiore:</span>
                          <span className="font-mono text-cyan-400 font-bold">{major.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className="h-7 bg-emerald-600 rounded-l-lg flex items-center justify-center text-xs font-bold text-white shadow"
                            style={{ width: `${Math.max(20, Math.min(100, (minor / (major || 1)) * 80))}%` }}
                          >
                            {minor.toFixed(1)}
                          </div>
                          <div className="h-7 bg-amber-500 rounded-r-lg flex items-center justify-center text-xs font-bold text-slate-950 shadow px-3">
                            +{diffVal}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs sm:text-sm space-y-2">
                      <span className="font-bold text-amber-300 block">Passaggi Guidati del Maestro:</span>
                      <p>
                        1. Togliamo la differenza dalla somma: <strong className="text-white font-mono">{sumVal} - {diffVal} = {sumVal - diffVal}</strong> (due parti uguali al minore).
                      </p>
                      <p>
                        2. Dividiamo per 2 per trovare il minore: <strong className="text-emerald-400 font-mono">({sumVal} - {diffVal}) : 2 = {minor.toFixed(1)}</strong>
                      </p>
                      <p>
                        3. Aggiungiamo la differenza per trovare il maggiore: <strong className="text-cyan-400 font-mono">{minor.toFixed(1)} + {diffVal} = {major.toFixed(1)}</strong>
                      </p>
                      <p className="text-slate-400 pt-1 border-t border-slate-700">
                        Verifica: {minor.toFixed(1)} + {major.toFixed(1)} = {sumVal} ✓
                      </p>
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
                      Problema di Somma e Multiplo: <span className="text-indigo-400">Somma = {multiSum}, Rapporto = {multiplier} volte</span>
                    </h3>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                      <div className="text-xs text-slate-400">
                        Totale parti uguali: 1 + {multiplier} = <strong className="text-white">{totalParts} unità</strong>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-20 bg-emerald-600 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow">
                          1 unità
                        </div>
                        <span className="text-xs text-slate-300 font-mono">Minore = {unitPart.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {Array.from({ length: multiplier }).map((_, i) => (
                          <div key={i} className="h-7 w-16 bg-cyan-600 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow">
                            1 unità
                          </div>
                        ))}
                        <span className="text-xs text-slate-300 font-mono pl-2">Maggiore = {majorPart.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs sm:text-sm space-y-2">
                      <span className="font-bold text-amber-300 block">Passaggi Guidati del Maestro:</span>
                      <p>
                        1. Calcola le parti totali: 1 + {multiplier} = <strong className="text-white">{totalParts} parti</strong>
                      </p>
                      <p>
                        2. Valore di 1 unità: <strong className="text-emerald-400 font-mono">{multiSum} : {totalParts} = {unitPart.toFixed(1)}</strong>
                      </p>
                      <p>
                        3. Quantità maggiore: <strong className="text-cyan-400 font-mono">{unitPart.toFixed(1)} × {multiplier} = {majorPart.toFixed(1)}</strong>
                      </p>
                      <p className="text-slate-400 pt-1 border-t border-slate-700">
                        Verifica: {unitPart.toFixed(1)} + {majorPart.toFixed(1)} = {multiSum} ✓
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* CASE 3: DIFF E MULTIPLO */}
              {segmentCase === 'diff_multiplo' && (() => {
                const diffUnits = diffFactor - 1;
                const unitVal = diffMulti / diffUnits;
                const majorVal = unitVal * diffFactor;
                return (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">
                      Problema di Differenza e Multiplo: <span className="text-indigo-400">Diff = {diffMulti}, Rapporto = {diffFactor} volte</span>
                    </h3>
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs sm:text-sm space-y-2">
                      <p>
                        1. Le parti di differenza sono: {diffFactor} - 1 = <strong className="text-white">{diffUnits} parti</strong>
                      </p>
                      <p>
                        2. Valore di 1 unità (minore): <strong className="text-emerald-400 font-mono">{diffMulti} : {diffUnits} = {unitVal.toFixed(1)}</strong>
                      </p>
                      <p>
                        3. Quantità maggiore: <strong className="text-cyan-400 font-mono">{unitVal.toFixed(1)} × {diffFactor} = {majorVal.toFixed(1)}</strong>
                      </p>
                      <p className="text-slate-400 pt-1 border-t border-slate-700">
                        Verifica: {majorVal.toFixed(1)} - {unitVal.toFixed(1)} = {diffMulti} ✓
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* CASE 4: FRAZIONE */}
              {segmentCase === 'frazione' && (() => {
                const onePart = fractionTotal / fractionDen;
                const result = onePart * fractionNum;
                return (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">
                      Frazione di un Numero: <span className="text-indigo-400">{fractionNum}/{fractionDen} di {fractionTotal}</span>
                    </h3>
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs sm:text-sm space-y-2">
                      <p>
                        1. Trova l'unità frazionaria (1/{fractionDen}): <strong className="text-emerald-400 font-mono">{fractionTotal} : {fractionDen} = {onePart.toFixed(1)}</strong>
                      </p>
                      <p>
                        2. Moltiplica per il numeratore: <strong className="text-cyan-400 font-mono">{onePart.toFixed(1)} × {fractionNum} = {result.toFixed(1)}</strong>
                      </p>
                      <p className="text-slate-400 pt-1 border-t border-slate-700">
                        Risultato: {fractionNum}/{fractionDen} di {fractionTotal} = <strong className="text-white">{result.toFixed(1)}</strong> ✓
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-300">
              💡 Cambia i numeri a sinistra per verificare i tuoi calcoli e comprendere la logica visiva!
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: IL METODO IN 4 FASI                              */}
      {/* ======================================================== */}
      {activeTab === 'metodo' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Il Metodo a 4 Fasi del Maestro dei Problemi</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Il matematico George Pólya ha dimostrato che per risolvere qualsiasi problema matematico non servono formule magiche, ma una strategia ordinata in 4 tappe fondamentali:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-900/40 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                    1
                  </span>
                  <h4 className="font-bold text-white">Comprendere il Problema</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Leggi il testo almeno 2 volte. Evidenzia i dati noti (numeri, unità di misura), isola l'obiettivo finale e individua le parole chiave.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-900/40 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                    2
                  </span>
                  <h4 className="font-bold text-white">Rappresentare (Modello a Barre)</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Trasforma le parole in rettangoli e segmenti proporzionali. Visualizza la somma totale, le differenze e i rapporti frazionari.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-900/40 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-cyan-600 text-white font-bold flex items-center justify-center text-sm">
                    3
                  </span>
                  <h4 className="font-bold text-white">Pianificare le Operazioni</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Stabilisci la sequenza logica dei passaggi: trova prima l'unità frazionaria o rimuovi la differenza, poi moltiplica o somma.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-900/40 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-amber-600 text-slate-950 font-bold flex items-center justify-center text-sm">
                    4
                  </span>
                  <h4 className="font-bold text-white">Risolvere e Verificare</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Esegui i calcoli con cura e verifica sempre il risultato inserendolo nei dati iniziali per accertarti che tutto torni!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: DIZIONARIO E PAROLE CHIAVE                       */}
      {/* ======================================================== */}
      {activeTab === 'dizionario' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>Dizionario Matematico: Parole Chiave nei Testi</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Le parole nei problemi nascondono precise operazioni matematiche. Ecco la guida rapida di Prof. Sauro & Mia per tradurle all'istante:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { term: 'In più, Aggiungere, Insieme, Totale, Complessivo', op: 'Addizione (+)', color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300' },
                { term: 'In meno, Restano, Differenza, Supera di, Rimangono', op: 'Sottrazione (-)', color: 'border-rose-500/40 bg-rose-950/20 text-rose-300' },
                { term: 'Il doppio (×2), Il triplo (×3), Ognuno, Ciascuno', op: 'Moltiplicazione (×)', color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300' },
                { term: 'Distribuire, Suddividere, La metà (:2), La terza parte (:3)', op: 'Divisione (:)', color: 'border-amber-500/40 bg-amber-950/20 text-amber-300' },
                { term: 'Spesa, Ricavo, Guadagno, Perdita', op: 'Compravendita (Ricavo = Spesa + Guadagno)', color: 'border-indigo-500/40 bg-indigo-950/20 text-indigo-300' },
                { term: 'Peso Lordo, Peso Netto, Tara', op: 'Misure (Lordo = Netto + Tara)', color: 'border-purple-500/40 bg-purple-950/20 text-purple-300' },
              ].map((item, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${item.color} space-y-1`}>
                  <div className="text-xs font-bold uppercase tracking-wider">{item.op}</div>
                  <div className="text-sm font-medium text-white">{item.term}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
