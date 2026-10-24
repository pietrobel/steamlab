import React from 'react';
import { PlusCircle, ExternalLink } from 'lucide-react';
import { Subject } from '../types';
import { SUBJECT_METAS } from '../data/defaultLinks';
import { DynamicIcon } from './DynamicIcon';

interface SectionHeaderProps {
  subject: Subject;
  count: number;
  onAddInSubject: (subject: Subject) => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  subject,
  count,
  onAddInSubject,
}) => {
  const meta = SUBJECT_METAS[subject];

  return (
    <div
      id={`section-${subject}`}
      className="scroll-mt-24 pt-6 pb-4 border-b border-slate-800/80 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${meta.bgLight} ${meta.borderLight} border ${meta.color} shadow-sm`}
        >
          <DynamicIcon name={meta.icon} className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {meta.name}
            </h3>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${meta.badgeBg} ${meta.badgeText}`}
            >
              {count} {count === 1 ? 'risorsa' : 'risorse'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {meta.description}
          </p>
        </div>
      </div>

      <button
        onClick={() => onAddInSubject(subject)}
        className="inline-flex items-center gap-1.5 self-start sm:self-center px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-all shrink-0"
      >
        <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
        <span>Aggiungi a {meta.name}</span>
      </button>
    </div>
  );
};
