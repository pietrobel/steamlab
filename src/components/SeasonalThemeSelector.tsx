import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, Check, X, ChevronDown, Palette } from 'lucide-react';
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  const autoSeasonId: ConcreteSeasonId = getAutoSeasonalTheme();
  const effectiveSeasonId: ConcreteSeasonId = currentSeason === 'auto' ? autoSeasonId : currentSeason;
  const activeMeta = SEASONAL_THEMES[effectiveSeasonId] || SEASONAL_THEMES.standard;

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth < 640;

    // Anchor downwards right below the trigger button
    const top = Math.round(rect.bottom + 8);

    if (isMobile) {
      setMenuStyle({
        top: `${Math.max(64, top)}px`,
        left: '12px',
        right: '12px',
        maxWidth: '430px',
        margin: '0 auto',
      });
    } else {
      // Align with the right edge of the trigger button on desktop/tablet
      const right = Math.max(12, Math.round(window.innerWidth - rect.right));
      setMenuStyle({
        top: `${top}px`,
        right: `${right}px`,
        width: '400px',
        maxWidth: 'calc(100vw - 24px)',
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const handleResize = () => updatePosition();
      const handleScroll = () => updatePosition();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, updatePosition]);

  return (
    <>
      {/* Seasonal Pill Button in Navbar */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-800/80 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700/80 transition-all shadow-sm active:scale-95 touch-manipulation"
        title="Personalizza l'aspetto stagionale del portale (Halloween, Natale, Carnevale, Primavera, Estate, Autunno, Earth Day)"
        aria-label="Personalizza tema stagionale"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <span className="text-base">{activeMeta.emoji}</span>
        <span className="hidden sm:inline text-xs">{activeMeta.shortName}</span>
        {currentSeason === 'auto' && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-750 text-cyan-300 font-mono">
            Auto
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-cyan-400' : ''
          }`}
        />
      </button>

      {/* Downward Dropdown Menu via Portal to escape sticky/backdrop-blur clipping */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] pointer-events-auto">
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-200"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Dropdown Card - strictly opens downwards from the button */}
            <div
              style={menuStyle}
              role="dialog"
              aria-modal="true"
              aria-label="Menu selezione tema stagionale"
              className="fixed flex flex-col bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden text-slate-100 z-[10000] max-h-[calc(100vh-80px)] sm:max-h-[min(620px,calc(100vh-90px))] animate-in fade-in slide-in-from-top-2 duration-150 ring-1 ring-white/10"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-slate-800/80 bg-slate-900/95 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500/20 via-purple-500/20 to-cyan-500/20 border border-slate-700 flex items-center justify-center text-lg shrink-0">
                    <Palette className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5 truncate">
                      <span>Menu Temi & Aspetto</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate">
                      Apre verso il basso • Seleziona per la classe
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-750 border border-slate-700 transition-colors shrink-0 active:scale-95 touch-manipulation"
                  aria-label="Chiudi menu temi"
                  title="Chiudi"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable content container */}
              <div className="p-3 sm:p-4 overflow-y-auto space-y-3.5 flex-1 scrollbar-thin">
                {/* Auto Mode Option Card */}
                <div>
                  <button
                    onClick={() => {
                      onSelectSeason('auto');
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 min-h-[50px] touch-manipulation ${
                      currentSeason === 'auto'
                        ? 'bg-gradient-to-r from-cyan-950/60 to-indigo-950/60 border-cyan-500 ring-1 ring-cyan-500/50 shadow-md'
                        : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/80'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 text-base mt-0.5">
                        🔄
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs sm:text-sm font-bold text-white">
                            Automatico da calendario
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40">
                            Consigliato
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-0.5">
                          Attivo ora: <strong className="text-white">{SEASONAL_THEMES[autoSeasonId]?.name}</strong> ({SEASONAL_THEMES[autoSeasonId]?.emoji})
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Festività solo nei giorni iniziali; altrimenti tema Quotidiano ordinario.
                        </p>
                      </div>
                    </div>

                    {currentSeason === 'auto' && (
                      <Check className="w-5 h-5 text-cyan-400 shrink-0" />
                    )}
                  </button>
                </div>

                {/* List of Seasonal Themes */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                    Oppure scegli manualmente:
                  </div>

                  {(Object.keys(SEASONAL_THEMES) as Array<Exclude<SeasonId, 'auto'>>).map((id) => {
                    const theme = SEASONAL_THEMES[id];
                    const isSelected = currentSeason === id;
                    const isStandard = id === 'standard';

                    return (
                      <button
                        key={id}
                        onClick={() => {
                          onSelectSeason(id);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left p-2.5 sm:p-3 rounded-xl border transition-all flex items-center justify-between gap-2.5 min-h-[46px] touch-manipulation active:scale-[0.99] ${
                          isSelected
                            ? 'bg-cyan-950/40 border-cyan-400 ring-1 ring-cyan-400/40 text-white shadow-sm'
                            : isStandard
                            ? 'bg-slate-800/70 hover:bg-slate-800 border-slate-700/80 text-slate-200'
                            : 'bg-slate-800/35 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-xl shrink-0">{theme.emoji}</span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs sm:text-sm font-bold text-white truncate">
                                {theme.name}
                              </span>
                              {isStandard && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                                  Normale
                                </span>
                              )}
                            </div>
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
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3 min-h-[44px]">
                  <div className="flex items-center gap-2 min-w-0">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs text-slate-300 font-medium truncate">
                      Effetti visivi (neve, foglie, coriandoli)
                    </span>
                  </div>
                  <button
                    onClick={onToggleParticles}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none touch-manipulation ${
                      showParticles ? 'bg-cyan-500' : 'bg-slate-700'
                    }`}
                    aria-label="Attiva o disattiva effetti stagionali particelle"
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
          </div>,
          document.body
        )}
    </>
  );
};
