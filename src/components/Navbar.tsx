import React from 'react';
import { Sparkles, ExternalLink, Heart, Layers } from 'lucide-react';

interface NavbarProps {
  totalCount: number;
  favCount: number;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalCount,
  favCount,
  showFavoritesOnly,
  onToggleFavorites,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-3">
          {/* Logo & Brand Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-cyan-400 to-emerald-400 p-[2px] shadow-lg shadow-cyan-500/20 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-cyan-300 animate-pulse" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-1">
                  <span>Scienza</span>
                  <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                    Lab
                  </span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Officina Digitale
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate hidden md:block">
                Matematica • Scienze • Informatica • Simulazioni & Web App
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Total resources badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs font-medium text-slate-300">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>{totalCount} risorse attive</span>
            </div>

            {/* Favorite Filter Toggle Button */}
            <button
              onClick={onToggleFavorites}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
                showFavoritesOnly
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-rose-900/20'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
              }`}
              title="Filtra solo preferiti"
            >
              <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-rose-400 text-rose-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Preferiti</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-slate-700/60 text-slate-200">
                {favCount}
              </span>
            </button>

            {/* Vercel Dashboard External Link */}
            <a
              href="https://vercel.com/icbdpp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600 transition-all shadow-sm"
              title="Apri la console progetti su Vercel"
            >
              <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 1155 1000">
                <path d="m577.3 0 577.4 1000H0z" />
              </svg>
              <span className="hidden sm:inline">Progetti Vercel</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
