import React from 'react';
import {
  ExternalLink,
  Eye,
  Heart,
  Sparkles,
  Play,
} from 'lucide-react';
import { LinkItem } from '../types';
import { SUBJECT_METAS } from '../data/defaultLinks';
import { DynamicIcon } from './DynamicIcon';

interface LinkCardProps {
  item: LinkItem;
  viewMode: 'grid' | 'list';
  onPreview: (item: LinkItem) => void;
  onLaunchInternal: (item: LinkItem) => void;
  onToggleFavorite: (id: string) => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({
  item,
  viewMode,
  onPreview,
  onLaunchInternal,
  onToggleFavorite,
}) => {
  const meta = SUBJECT_METAS[item.subject] || SUBJECT_METAS.matematica;
  const isVercelHost = item.isVercel || item.url.includes('vercel.app');
  const isInternal = Boolean(item.internalAppId);

  if (viewMode === 'list') {
    return (
      <div className="group relative bg-slate-850 hover:bg-slate-800/90 rounded-xl p-3.5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-md hover:shadow-lg">
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          {/* Icon Box */}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${meta.bgLight} ${meta.borderLight} border ${meta.color}`}
          >
            <DynamicIcon name={item.iconName} className="w-5 h-5" />
          </div>

          {/* Title & info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${meta.badgeBg} ${meta.badgeText}`}
              >
                {meta.name}
              </span>
              {isInternal && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  App Integrata
                </span>
              )}
              {isVercelHost && !isInternal && (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Vercel App
                </span>
              )}
              <span className="text-[11px] font-medium text-slate-400">
                {item.gradeLevel}
              </span>
            </div>

            <h4 className="text-sm md:text-base font-bold text-white group-hover:text-cyan-300 transition-colors truncate mt-0.5">
              {item.title}
            </h4>
            <p className="text-xs text-slate-400 truncate mt-0.5 max-w-2xl">
              {item.description}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          <button
            onClick={() => onToggleFavorite(item.id)}
            className={`p-1.5 rounded-lg border transition-all ${
              item.isFavorite
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                : 'text-slate-400 hover:text-rose-400 bg-slate-800/60 border-slate-700/60'
            }`}
            title={item.isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
          >
            <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-rose-400' : ''}`} />
          </button>

          {isInternal ? (
            <button
              onClick={() => onLaunchInternal(item)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-md shadow-emerald-900/30 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Avvia App</span>
            </button>
          ) : (
            <button
              onClick={() => onPreview(item)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
              title="Anteprima rapida nell'app"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Anteprima</span>
            </button>
          )}

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-all"
            title="Apri link esterno"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  // Grid Card View
  return (
    <div className="group relative flex flex-col justify-between bg-slate-900/90 hover:bg-slate-850 rounded-2xl p-5 border border-slate-800/80 hover:border-slate-700 hover:shadow-xl hover:shadow-slate-950/60 transition-all duration-300">
      {/* Top row: Subject & Favorite */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${meta.badgeBg} ${meta.badgeText}`}
            >
              {meta.name}
            </span>
            {isInternal && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                App Integrata
              </span>
            )}
            {isVercelHost && !isInternal && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Vercel
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleFavorite(item.id)}
              className={`p-1.5 rounded-lg transition-all ${
                item.isFavorite
                  ? 'bg-rose-500/20 text-rose-400'
                  : 'text-slate-500 hover:text-rose-400 hover:bg-slate-800'
              }`}
              title={item.isFavorite ? 'Rimuovi dai preferiti' : 'Salva nei preferiti'}
            >
              <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-rose-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-3.5 mb-2.5">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${meta.bgLight} ${meta.borderLight} border ${meta.color} shadow-sm group-hover:scale-105 transition-transform`}
          >
            <DynamicIcon name={item.iconName} className="w-5 h-5" />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
              {item.title}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50">
                {item.gradeLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-800/70 text-slate-300 border border-slate-700/40"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        {isInternal ? (
          <>
            <button
              onClick={() => onLaunchInternal(item)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Avvia App Integrata</span>
            </button>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-all shrink-0"
              title="Apri link esterno"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </>
        ) : (
          <>
            <button
              onClick={() => onPreview(item)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-all shadow-sm"
              title="Anteprima applicazione"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Anteprima</span>
            </button>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-md shadow-indigo-900/20 transition-all"
            >
              <span>Apri Applicazione</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </>
        )}
      </div>
    </div>
  );
};
