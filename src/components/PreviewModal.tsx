import React, { useState } from 'react';
import { X, ExternalLink, RotateCw, AlertTriangle, ShieldCheck, Heart } from 'lucide-react';
import { LinkItem } from '../types';
import { SUBJECT_METAS } from '../data/defaultLinks';
import { DynamicIcon } from './DynamicIcon';

interface PreviewModalProps {
  item: LinkItem | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  item,
  isOpen,
  onClose,
  onToggleFavorite,
}) => {
  const [iframeKey, setIframeKey] = useState(0);

  if (!isOpen || !item) return null;

  const meta = SUBJECT_METAS[item.subject] || SUBJECT_METAS.matematica;

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-hidden animate-fade-in">
      <div className="relative w-full max-w-5xl h-[92vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-800 bg-slate-850 shrink-0 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${meta.bgLight} ${meta.borderLight} border ${meta.color}`}
            >
              <DynamicIcon name={item.iconName} className="w-4 h-4" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${meta.badgeBg} ${meta.badgeText}`}
                >
                  {meta.name}
                </span>
                <span className="text-xs text-slate-400 font-semibold truncate hidden sm:inline">
                  {item.gradeLevel}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white truncate">
                {item.title}
              </h3>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleFavorite(item.id)}
              className={`p-2 rounded-xl border transition-all ${
                item.isFavorite
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  : 'text-slate-400 hover:text-rose-400 bg-slate-800 border-slate-700'
              }`}
              title={item.isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
            >
              <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-rose-400' : ''}`} />
            </button>

            <button
              onClick={handleRefresh}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-all"
              title="Ricarica anteprima"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-md shadow-cyan-900/20"
            >
              <span>Apri a tutto schermo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-all"
              title="Chiudi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Browser URL Simulation Bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-950/70 border-b border-slate-800/80 text-xs text-slate-400 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-mono truncate select-all text-slate-300 flex-1">
            {item.url}
          </span>
          <span className="text-[11px] text-slate-500 hidden md:inline">
            Anteprima in sandbox
          </span>
        </div>

        {/* Embedded Iframe Area */}
        <div className="relative flex-1 bg-slate-950 overflow-hidden">
          <iframe
            key={iframeKey}
            src={item.url}
            title={item.title}
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            loading="lazy"
          />

          {/* Iframe Fallback helper ribbon at bottom */}
          <div className="absolute bottom-3 left-4 right-4 p-3 rounded-xl bg-slate-900/95 border border-slate-800 text-xs text-slate-300 shadow-xl flex items-center justify-between gap-3 backdrop-blur pointer-events-auto">
            <div className="flex items-center gap-2 min-w-0">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">
                Schermata vuota o protetta da policy X-Frame? Alcuni siti consentono l'accesso solo in scheda separata.
              </span>
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-cyan-300 font-bold border border-slate-700 shrink-0"
            >
              Apri in nuova scheda →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
