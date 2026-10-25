import React from 'react';
import { X, Sparkles, ExternalLink, Home, ArrowLeft } from 'lucide-react';
import { ProprietaOperazioniApp } from './ProprietaOperazioniApp';
import { CinematicaApp } from './CinematicaApp';
import { FoodQuestApp } from './FoodQuestApp';
import { MaestroProblemiApp } from './MaestroProblemiApp';
import { LinkItem } from '../../types';

interface IntegratedAppModalProps {
  item: LinkItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const IntegratedAppModal: React.FC<IntegratedAppModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !item || !item.internalAppId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-hidden animate-fade-in">
      <div className="relative w-full max-w-6xl h-[94vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-900/95 shrink-0 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Primary Return to Home Button */}
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 transition-all shadow-sm shrink-0"
              title="Chiudi l'app e torna alla directory di ScienzaLab"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Torna a ScienzaLab</span>
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ⚡ App Integrata Nativa
                </span>
                <span className="text-xs text-slate-400 font-semibold truncate hidden md:inline">
                  {item.gradeLevel}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white truncate">
                {item.title}
              </h3>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-all"
                title="Apri link esterno"
              >
                <span>Link Esterno</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-all"
              title="Chiudi applicazione e torna alla home"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container with Integrated App */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950">
          <div className="max-w-5xl mx-auto">
            {item.internalAppId === 'proprieta-operazioni' && (
              <ProprietaOperazioniApp onBackToHome={onClose} />
            )}
            {item.internalAppId === 'cinematica' && (
              <CinematicaApp onBackToHome={onClose} />
            )}
            {item.internalAppId === 'food-quest' && (
              <FoodQuestApp onBackToHome={onClose} />
            )}
            {item.internalAppId === 'maestro-problemi' && (
              <MaestroProblemiApp onBackToHome={onClose} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
