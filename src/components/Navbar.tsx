import React, { useState } from 'react';
import { Heart, Layers, Menu, X, Sparkles, BookOpen, Compass, Sparkle } from 'lucide-react';
import { profSauroImg } from '../data/mascots';
import { SeasonalThemeSelector } from './SeasonalThemeSelector';
import { SeasonId, ConcreteSeasonId, SEASONAL_THEMES, getAutoSeasonalTheme } from '../data/seasonalThemes';
import { Subject } from '../types';

interface NavbarProps {
  totalCount: number;
  favCount: number;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  currentSeason: SeasonId;
  onSelectSeason: (season: SeasonId) => void;
  showParticles: boolean;
  onToggleParticles: () => void;
  selectedSubject?: Subject | 'tutti';
  onSelectSubject?: (subject: Subject | 'tutti') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalCount,
  favCount,
  showFavoritesOnly,
  onToggleFavorites,
  currentSeason,
  onSelectSeason,
  showParticles,
  onToggleParticles,
  selectedSubject = 'tutti',
  onSelectSubject,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const autoSeasonId: ConcreteSeasonId = getAutoSeasonalTheme();
  const effectiveSeasonId: ConcreteSeasonId = currentSeason === 'auto' ? autoSeasonId : currentSeason;
  const activeMeta = SEASONAL_THEMES[effectiveSeasonId] || SEASONAL_THEMES.standard;

  const handleSubjectClick = (subj: Subject | 'tutti') => {
    if (onSelectSubject) {
      onSelectSubject(subj);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-2 sm:gap-3">
          {/* Logo & Brand Title with Prof. Sauro Avatar */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleSubjectClick('tutti');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-2xl overflow-hidden ring-2 ring-emerald-500/80 shadow-lg shadow-emerald-500/20 shrink-0 bg-slate-900 active:scale-95 transition-transform"
              title="Torna all'inizio del portale ScienzaLab"
            >
              <img
                src={profSauroImg}
                alt="Prof. Sauro"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </a>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubjectClick('tutti');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-0.5 hover:opacity-90 transition-opacity"
                >
                  <span>Scienza</span>
                  <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                    Lab
                  </span>
                </a>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  con Prof. Dino Sauro
                </span>
              </div>
              <p className="text-[11px] md:text-xs text-slate-400 truncate hidden md:block">
                Matematica • Scienze • Tecnologia • Informatica • Didattica Digitale
              </p>
            </div>
          </div>

          {/* Desktop & Tablet Navigation Controls */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
            {/* Seasonal Theme Button */}
            <SeasonalThemeSelector
              currentSeason={currentSeason}
              onSelectSeason={onSelectSeason}
              showParticles={showParticles}
              onToggleParticles={onToggleParticles}
            />

            {/* Total resources badge */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs font-medium text-slate-300">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>{totalCount} risorse</span>
            </div>

            {/* Favorite Filter Toggle Button */}
            <button
              onClick={onToggleFavorites}
              className={`min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all active:scale-95 touch-manipulation ${
                showFavoritesOnly
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-rose-900/20'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
              }`}
              title="Filtra solo preferiti"
            >
              <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-rose-400 text-rose-400' : 'text-slate-400'}`} />
              <span>Preferiti</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-700/80 text-slate-200">
                {favCount}
              </span>
            </button>
          </div>

          {/* Mobile Right Controls: Compact Theme + Fav + Hamburger Menu */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            {/* Seasonal Theme Trigger (Compact on mobile) */}
            <SeasonalThemeSelector
              currentSeason={currentSeason}
              onSelectSeason={onSelectSeason}
              showParticles={showParticles}
              onToggleParticles={onToggleParticles}
            />

            {/* Mobile Favorite Button (Large touch target >= 44px) */}
            <button
              onClick={onToggleFavorites}
              className={`min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl border transition-all active:scale-95 touch-manipulation ${
                showFavoritesOnly
                  ? 'bg-rose-500/25 text-rose-300 border-rose-500/50'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700'
              }`}
              aria-label="Filtra preferiti"
              title="Preferiti"
            >
              <div className="relative">
                <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-rose-400 text-rose-400' : 'text-slate-400'}`} />
                {favCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-rose-600 text-[9px] font-bold text-white flex items-center justify-center">
                    {favCount}
                  </span>
                )}
              </div>
            </button>

            {/* Mobile Hamburger / Close Drawer Toggle (Large touch target >= 44px) */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl bg-slate-800/80 text-slate-200 hover:text-white border border-slate-700 active:scale-95 transition-all touch-manipulation"
              aria-label={mobileMenuOpen ? 'Chiudi menu' : 'Apri menu principale'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-slate-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/98 px-4 py-4 space-y-4 animate-fade-in shadow-2xl">
          {/* Quick Info & Resource Counter */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-slate-300">Risorse didattiche</span>
            </div>
            <span className="text-xs font-bold text-white px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
              {totalCount} schede
            </span>
          </div>

          {/* Quick Subject Jump Buttons */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Naviga per Materia
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSubjectClick('matematica')}
                className={`min-h-[44px] p-2.5 rounded-xl border text-left text-xs font-bold flex items-center gap-2 transition-all active:scale-95 ${
                  selectedSubject === 'matematica'
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-800/60 text-indigo-300 border-indigo-900/40 hover:bg-slate-800'
                }`}
              >
                <span className="text-base">📐</span>
                <span>Matematica</span>
              </button>

              <button
                onClick={() => handleSubjectClick('scienze')}
                className={`min-h-[44px] p-2.5 rounded-xl border text-left text-xs font-bold flex items-center gap-2 transition-all active:scale-95 ${
                  selectedSubject === 'scienze'
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-slate-800/60 text-emerald-300 border-emerald-900/40 hover:bg-slate-800'
                }`}
              >
                <span className="text-base">🔬</span>
                <span>Scienze</span>
              </button>

              <button
                onClick={() => handleSubjectClick('tecnologia')}
                className={`min-h-[44px] p-2.5 rounded-xl border text-left text-xs font-bold flex items-center gap-2 transition-all active:scale-95 ${
                  selectedSubject === 'tecnologia'
                    ? 'bg-amber-600 text-white border-amber-500'
                    : 'bg-slate-800/60 text-amber-300 border-amber-900/40 hover:bg-slate-800'
                }`}
              >
                <span className="text-base">⚙️</span>
                <span>Tecnologia</span>
              </button>

              <button
                onClick={() => handleSubjectClick('informatica')}
                className={`min-h-[44px] p-2.5 rounded-xl border text-left text-xs font-bold flex items-center gap-2 transition-all active:scale-95 ${
                  selectedSubject === 'informatica'
                    ? 'bg-cyan-600 text-white border-cyan-500'
                    : 'bg-slate-800/60 text-cyan-300 border-cyan-900/40 hover:bg-slate-800'
                }`}
              >
                <span className="text-base">💻</span>
                <span>Informatica</span>
              </button>
            </div>

            <button
              onClick={() => handleSubjectClick('tutti')}
              className={`w-full mt-2 min-h-[44px] py-2 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                selectedSubject === 'tutti'
                  ? 'bg-slate-100 text-slate-900 border-white'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              Tutte le sezioni & Risorse
            </button>
          </div>

          {/* Seasonal Theme & Particles Quick Info */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span>Tema:</span>
              <strong className="text-white">{activeMeta.emoji} {activeMeta.shortName}</strong>
            </div>

            <button
              onClick={onToggleParticles}
              className="min-h-[40px] px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-medium text-slate-300 hover:text-white border border-slate-700 active:scale-95"
            >
              Effetti: <span className={showParticles ? 'text-emerald-400 font-bold' : 'text-slate-500'}>{showParticles ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
