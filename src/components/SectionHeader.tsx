import React from 'react';
import { Subject } from '../types';
import { SUBJECT_METAS } from '../data/defaultLinks';
import { DynamicIcon } from './DynamicIcon';

interface SectionHeaderProps {
  subject: Subject;
  count: number;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  subject,
  count,
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
    </div>
  );
};
