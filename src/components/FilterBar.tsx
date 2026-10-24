import React from 'react';
import { Search, X, LayoutGrid, List, Filter, Sparkles } from 'lucide-react';
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
  availableTags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  totalFilteredCount: number;
}

const GRADE_OPTIONS: Array<GradeLevel | 'Tutte'> = [
  'Tutte',
  'Classe 1ª',
  'Classe 2ª',
  'Classe 3ª',
  'Laboratorio STEAM',
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
  availableTags,
  selectedTag,
  onSelectTag,
  totalFilteredCount,
}) => {
  return (
    <div className="bg-slate-900/80 backdrop-blur border-b border-slate-800 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Top Controls: Search + Grade + View Switch */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cerca per titolo, argomento (es. Pitagora, DNA, Coding)..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-white rounded-md"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 justify-between sm:justify-end">
            {/* Grade Level Selector */}
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
              <select
                value={selectedGrade}
                onChange={(e) => onGradeChange(e.target.value as GradeLevel | 'Tutte')}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
              >
                {GRADE_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g === 'Tutte' ? 'Tutte le Classi' : g}
                  </option>
                ))}
              </select>
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

        {/* Category Tabs */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSubjectChange('tutti')}
              className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-semibold transition-all shrink-0 ${
                selectedSubject === 'tutti'
                  ? 'bg-slate-100 text-slate-900 shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Tutte le sezioni
            </button>

            <button
              onClick={() => onSubjectChange('matematica')}
              className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                selectedSubject === 'matematica'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-indigo-950/40 text-indigo-300 hover:bg-indigo-900/50 border border-indigo-800/40'
              }`}
            >
              <span>📐 Matematica</span>
            </button>

            <button
              onClick={() => onSubjectChange('scienze')}
              className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                selectedSubject === 'scienze'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 border border-emerald-800/40'
              }`}
            >
              <span>🔬 Scienze</span>
            </button>

            <button
              onClick={() => onSubjectChange('informatica')}
              className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                selectedSubject === 'informatica'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50 border border-cyan-800/40'
              }`}
            >
              <span>💻 Informatica</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 shrink-0 font-medium">
            <span>{totalFilteredCount} {totalFilteredCount === 1 ? 'risultato' : 'risultati'}</span>
          </div>
        </div>

        {/* Tag pills filter if tags available */}
        {availableTags.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 text-xs">
            <span className="text-slate-500 font-medium text-[11px] shrink-0 mr-1">Argomenti:</span>
            {selectedTag && (
              <button
                onClick={() => onSelectTag(null)}
                className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1 shrink-0 font-medium"
              >
                <span>Tutti</span>
                <X className="w-3 h-3" />
              </button>
            )}
            {availableTags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                onClick={() => onSelectTag(selectedTag === tag ? null : tag)}
                className={`px-2 py-0.5 rounded-md shrink-0 font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
