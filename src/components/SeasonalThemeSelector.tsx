import React, { useState } from 'react';
import { Sparkles, Calendar, Check, X, SlidersHorizontal } from 'lucide-react';
import { SeasonId, ConcreteSeasonId, SEASONAL_THEMES, getAutoSeasonalTheme } from '../data/seasonalThemes';

interface SeasonalThemeSelectorProps {
  currentSeason: SeasonId;
  onSelectSeason: (season: SeasonId) => void;
  showParticles: boolean;
  onToggleParticles: () => void;
}

export const SeasonalThemeSelector: React.FC<SeasonalThemeSelectorProps> = ({
  currentSeason,
  onSelectSeason,
  showParticles,
  onToggleParticles,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const autoSeasonId: ConcreteSeasonId = getAutoSeasonalTheme();
  const effectiveSeasonId: ConcreteSeasonId = currentSeason === 'auto' ? autoSeasonId : currentSeason;
  const activeMeta = SEASONAL_THEMES[effectiveSeasonId] || SEASONAL_THEMES.standard;

  return (
    <>
      {/* Seasonal Pill Button in Navbar */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800/80 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700/80 transition-all shadow-sm hover:scale-[1.02]"
        title="Personalizza l'aspetto stagionale del portale (Halloween, Natale, Carnevale, Primavera, Estate, Autunno)"
      >
        <span className="text-sm">{activeMeta.emoji}</span>
        <span className="hidden lg:inline">{activeMeta.shortName}</span>
        {currentSeason === 'auto' && (
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-750 text-cyan-300 font-mono">
            Auto
          </span>
        )}
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 text-slate-100">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-purple-500/20 to-cyan-500/20 border border-slate-700 flex items-center justify-center text-xl">
                  🎨
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Temi & Aspetto Stagionale</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Scegli l'aspetto del portale a seconda del periodo dell'anno
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Auto Mode Option Card */}
            <div className="mb-4">
              <button
                onClick={() => {
                  onSelectSeason('auto');
                  setIsOpen(false);
                }}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  currentSeason === 'auto'
                    ? 'bg-gradient-to-r from-cyan-950/50 to-indigo-950/50 border-cyan-500 ring-1 ring-cyan-500/40 shadow-lg'
                    : 'bg-slate-800/40 hover:bg-slate-800/80 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 text-base">
                    🔄
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        Automatico in base alla data
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                        Consigliato
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Attualmente: <strong className="text-white">{SEASONAL_THEMES[autoSeasonId]?.name}</strong> ({SEASONAL_THEMES[autoSeasonId]?.emoji})
                    </p>
                  </div>
                </div>

                {currentSeason === 'auto' && (
                  <Check className="w-5 h-5 text-cyan-400 shrink-0" />
                )}
              </button>
            </div>

            {/* List of Seasonal Themes */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
              {(Object.keys(SEASONAL_THEMES) as Array<Exclude<SeasonId, 'auto'>>).map((id) => {
                const theme = SEASONAL_THEMES[id];
                const isSelected = currentSeason === id;

                return (
                  <button
                    key={id}
                    onClick={() => {
                      onSelectSeason(id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-slate-850 border-cyan-500 ring-1 ring-cyan-500/40 text-white'
                        : 'bg-slate-800/30 hover:bg-slate-800/80 border-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xl shrink-0">{theme.emoji}</span>
                      <div className="min-w-0">
                        <span className="text-xs sm:text-sm font-bold block truncate text-white">
                          {theme.name}
                        </span>
                        <span className="text-[11px] text-slate-400 block truncate">
                          {theme.subtitle}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Floating Particles Toggle Option */}
            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-slate-300 font-medium">
                  Effetti stagionali decorativi (fiocchi, foglie, stelle)
                </span>
              </div>
              <button
                onClick={onToggleParticles}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  showParticles ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    showParticles ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
