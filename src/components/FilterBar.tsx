import React from 'react';
import { Search, X, LayoutGrid, List, GraduationCap } from 'lucide-react';
import { Subject, GradeLevel } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSubject: Subject | 'tutti';
  onSubjectChange: (sub: Subject | 'tutti') => void;
  selectedGrade: GradeLevel | 'Tutte';
  onGradeChange: (grade: GradeLevel | 'Tutte') => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalFilteredCount: number;
}

const GRADE_BUTTONS: Array<GradeLevel | 'Tutte'> = [
  'Tutte',
  'Classe 1ª',
  'Classe 2ª',
  'Classe 3ª',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedSubject,
  onSubjectChange,
  selectedGrade,
  onGradeChange,
  viewMode,
  onViewModeChange,
  totalFilteredCount,
}) => {
  return (
    <div className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-3.5">
        {/* Row 1: Search + View Switch */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cerca per materia, argomento o simulazione (es. moti, leve, circuiti, 3D, equazioni)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
                title="Cancella ricerca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View mode & count */}
          <div className="flex items-center gap-3 justify-between sm:justify-end">
            <div className="text-xs text-slate-400 font-medium hidden md:block">
              <span className="font-bold text-white">{totalFilteredCount}</span>{' '}
              {totalFilteredCount === 1 ? 'risorsa trovata' : 'risorse trovate'}
            </div>

            {/* Grid / List Switch */}
            <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/80">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-slate-700 text-cyan-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Vista a schede"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-slate-700 text-cyan-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Vista elenco compatto"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Direct Class Selector + Subject Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1 border-t border-slate-800/60">
          {/* Subject Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => onSubjectChange('tutti')}
              className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 ${
                selectedSubject === 'tutti'
                  ? 'bg-slate-100 text-slate-900 shadow-sm'
                  : 'bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Tutte le sezioni
            </button>

            <button
              onClick={() => onSubjectChange('matematica')}
              className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                selectedSubject === 'matematica'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-indigo-950/40 text-indigo-300 hover:bg-indigo-900/50 border border-indigo-800/40'
              }`}
            >
              <span>📐 Matematica</span>
            </button>

            <button
              onClick={() => onSubjectChange('scienze')}
              className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                selectedSubject === 'scienze'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 border border-emerald-800/40'
              }`}
            >
              <span>🔬 Scienze</span>
            </button>

            <button
              onClick={() => onSubjectChange('tecnologia')}
              className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                selectedSubject === 'tecnologia'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'bg-amber-950/40 text-amber-300 hover:bg-amber-900/50 border border-amber-800/40'
              }`}
            >
              <span>⚙️ Tecnologia</span>
            </button>

            <button
              onClick={() => onSubjectChange('informatica')}
              className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                selectedSubject === 'informatica'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50 border border-cyan-800/40'
              }`}
            >
              <span>💻 Informatica</span>
            </button>
          </div>

          {/* Dedicated Grade Level Direct Buttons */}
          <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1 shrink-0">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Classe:</span>
            </span>

            {GRADE_BUTTONS.map((g) => {
              const isActive = selectedGrade === g;
              const label = g === 'Tutte' ? 'Tutte' : g.replace('Classe ', '');
              return (
                <button
                  key={g}
                  onClick={() => onGradeChange(g)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-md shadow-cyan-500/25 ring-1 ring-cyan-300'
                      : 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/60'
                  }`}
                  title={g === 'Tutte' ? 'Visualizza tutte le classi' : `Filtra per ${g} Scuola Media`}
                >
                  {g === 'Tutte' ? 'Tutte le Classi' : `Classe ${label}`}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
