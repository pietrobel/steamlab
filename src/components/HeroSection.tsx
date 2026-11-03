import React from 'react';
import { Calculator, Atom, Code2, Cog, ArrowUpRight, GraduationCap, Sparkles } from 'lucide-react';
import { Subject } from '../types';
import { SeasonalTheme } from '../data/seasonalThemes';
import {
  heroTeamImg,
  profSauroImg,
  profIpaziaImg,
  profRitaImg,
  profAdaImg,
  leoImg,
  miaImg,
  samuImg,
  chiaraImg,
} from '../data/mascots';

interface HeroSectionProps {
  counts: Record<Subject, number>;
  activeSubject: Subject | 'tutti';
  onSelectSubject: (sub: Subject | 'tutti') => void;
  theme: SeasonalTheme;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  counts,
  activeSubject,
  onSelectSubject,
  theme,
}) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-8 sm:pt-8 sm:pb-10 md:pt-12 md:pb-14 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-b border-slate-800/80">
      {/* Background Glow Orbs */}
      <div className={`absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 ${theme.glowColors.orb1} rounded-full blur-3xl pointer-events-none transition-all duration-700`} />
      <div className={`absolute top-10 right-1/4 w-72 sm:w-96 h-72 sm:h-96 ${theme.glowColors.orb2} rounded-full blur-3xl pointer-events-none transition-all duration-700`} />
      <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-full sm:w-3/4 h-32 ${theme.glowColors.orb3} rounded-full blur-2xl pointer-events-none transition-all duration-700`} />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        {/* ScienzaLab Mascot Header Badge & Seasonal Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs sm:text-sm font-medium text-slate-300 shadow-inner">
            <img
              src={profSauroImg}
              alt="Prof. Sauro"
              className="w-5 h-5 rounded-full object-cover ring-1 ring-emerald-400"
              referrerPolicy="no-referrer"
            />
            <span className="text-emerald-300 font-bold">ScienzaLab</span>
            <span className="text-slate-500">•</span>
            <span className="truncate">Team Docenti & Studenti</span>
          </div>

          {/* Seasonal Theme Badge */}
          <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full text-xs font-bold ${theme.badgeBg} ${theme.badgeText} transition-all`}>
            <span>{theme.emoji}</span>
            <span>{theme.bannerTag}</span>
          </div>
        </div>

        {/* Hero Split Grid: Text & Mascot Cinematic Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center mb-8 sm:mb-10">
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3 sm:mb-4">
              Laboratorio <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>ScienzaLab</span>:{' '}
              <span className="text-slate-100 font-extrabold block sm:inline">
                Matematica, Scienze, Tecnologia e Informatica
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed mb-4">
              Benvenuti nel laboratorio digitale della scuola media! Esplora simulatori e laboratori guidati dal nostro team: la <strong className="text-indigo-300">Prof.ssa Ipazia</strong> per la Matematica, il <strong className="text-emerald-300">Prof. Dino Sauro</strong> per le Scienze, la <strong className="text-amber-300">Prof.ssa Rita Ingranaggi</strong> per la Tecnologia, la <strong className="text-cyan-300">Prof.ssa Ada Byte</strong> per l'Informatica, insieme agli studenti <strong className="text-amber-300">Leo</strong>, <strong className="text-rose-300">Mia</strong>, <strong className="text-yellow-300">Samu</strong> e <strong className="text-emerald-300">Chiara</strong>.
            </p>

            {/* Seasonal Mascot Greeting Callout */}
            {theme.id !== 'standard' && (
              <div className="mb-5 sm:mb-6 p-3 sm:p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5 sm:gap-3 shadow-inner">
                <span className="text-xl sm:text-2xl shrink-0 select-none">{theme.emoji}</span>
                <div className="text-xs">
                  <div className="font-bold text-white mb-0.5">{theme.mascotAuthor}:</div>
                  <div className="text-slate-300 italic">{theme.mascotGreeting}</div>
                </div>
              </div>
            )}

            {/* Quick 8 Avatars Pill (4 Teachers + 4 Students) */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 w-full sm:max-w-fit">
              <div className="flex -space-x-1.5 sm:-space-x-2 shrink-0">
                <img
                  src={profIpaziaImg}
                  alt="Prof.ssa Ipazia (Matematica)"
                  title="Prof.ssa Ipazia - Matematica"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-indigo-500"
                  referrerPolicy="no-referrer"
                />
                <img
                  src={profSauroImg}
                  alt="Prof. Sauro (Scienze)"
                  title="Prof. Sauro - Scienze"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-emerald-500"
                  referrerPolicy="no-referrer"
                />
                <img
                  src={profRitaImg}
                  alt="Prof.ssa Rita (Tecnologia)"
                  title="Prof.ssa Rita - Tecnologia"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-amber-500"
                  referrerPolicy="no-referrer"
                />
                <img
                  src={profAdaImg}
                  alt="Prof.ssa Ada (Informatica)"
                  title="Prof.ssa Ada - Informatica"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-cyan-500"
                  referrerPolicy="no-referrer"
                />
                <img
                  src={leoImg}
                  alt="Leo (Studente)"
                  title="Leo - Studente (2ª Media)"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-amber-500"
                  referrerPolicy="no-referrer"
                />
                <img
                  src={miaImg}
                  alt="Mia (Studentessa)"
                  title="Mia - Studentessa (3ª Media)"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-rose-500"
                  referrerPolicy="no-referrer"
                />
                <img
                  src={samuImg}
                  alt="Samu (Studente)"
                  title="Samu - Studente (1ª Media)"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-yellow-400"
                  referrerPolicy="no-referrer"
                />
                <img
                  src={chiaraImg}
                  alt="Chiara (Studentessa)"
                  title="Chiara - Studentessa (3ª Media)"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-emerald-400"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-xs min-w-0">
                <span className="font-bold text-white block truncate">Docenti & Studenti ScienzaLab</span>
                <span className="text-slate-400 text-[11px] block truncate">4 Docenti e 4 Studenti per la scuola media</span>
              </div>
            </div>
          </div>

          {/* Cinematic Lab Mascot Banner */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-2xl group bg-slate-900 max-h-72 sm:max-h-80 lg:max-h-none">
              <img
                src={heroTeamImg}
                alt="La squadra didattica nel laboratorio ScienzaLab"
                className="w-full h-full max-h-72 sm:max-h-80 lg:max-h-none object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-3 sm:p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-white bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <span>Team didattico ScienzaLab</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillar Subject Quick Cards with Dedicated Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
          {/* Card Matematica */}
          <button
            onClick={() => onSelectSubject(activeSubject === 'matematica' ? 'tutti' : 'matematica')}
            className={`group text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 border relative overflow-hidden active:scale-[0.99] touch-manipulation ${
              activeSubject === 'matematica'
                ? 'bg-indigo-950/70 border-indigo-500 ring-2 ring-indigo-500/40 shadow-xl shadow-indigo-950/50'
                : 'bg-slate-800/40 hover:bg-slate-800/80 border-slate-800 hover:border-indigo-500/50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {counts.matematica} risorse
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
              <span>Matematica</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-2">
              EnigMondo giochi matematici, Il Mondo di Pitagora, Il Maestro dei Problemi, frazioni e proprietà.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 text-[11px] text-indigo-300">
              <img
                src={profIpaziaImg}
                alt="Prof.ssa Ipazia"
                className="w-5 h-5 rounded-full object-cover ring-1 ring-indigo-400"
                referrerPolicy="no-referrer"
              />
              <span className="font-semibold">Cattedra: Prof.ssa Ipazia</span>
            </div>
          </button>

          {/* Card Scienze */}
          <button
            onClick={() => onSelectSubject(activeSubject === 'scienze' ? 'tutti' : 'scienze')}
            className={`group text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 border relative overflow-hidden active:scale-[0.99] touch-manipulation ${
              activeSubject === 'scienze'
                ? 'bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-500/40 shadow-xl shadow-emerald-950/50'
                : 'bg-slate-800/40 hover:bg-slate-800/80 border-slate-800 hover:border-emerald-500/50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                <Atom className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {counts.scienze} risorse
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
              <span>Scienze</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-2">
              Simulazione moti, Food Quest alimentazione corretta, PhET leve e bilance, chimica e gravità.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 text-[11px] text-emerald-300">
              <img
                src={profSauroImg}
                alt="Prof. Dino Sauro"
                className="w-5 h-5 rounded-full object-cover ring-1 ring-emerald-400"
                referrerPolicy="no-referrer"
              />
              <span className="font-semibold">Cattedra: Prof. Dino Sauro</span>
            </div>
          </button>

          {/* Card Tecnologia */}
          <button
            onClick={() => onSelectSubject(activeSubject === 'tecnologia' ? 'tutti' : 'tecnologia')}
            className={`group text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 border relative overflow-hidden active:scale-[0.99] touch-manipulation ${
              activeSubject === 'tecnologia'
                ? 'bg-amber-950/70 border-amber-500 ring-2 ring-amber-500/40 shadow-xl shadow-amber-950/50'
                : 'bg-slate-800/40 hover:bg-slate-800/80 border-slate-800 hover:border-amber-500/50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 group-hover:scale-110 transition-transform">
                <Cog className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {counts.tecnologia} risorse
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
              <span>Tecnologia</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-2">
              Disegno tecnico 3D, solidi e assonometrie, energie rinnovabili, circuiti in CC e sostenibilità.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 text-[11px] text-amber-300">
              <img
                src={profRitaImg}
                alt="Prof.ssa Rita Ingranaggi"
                className="w-5 h-5 rounded-full object-cover ring-1 ring-amber-400"
                referrerPolicy="no-referrer"
              />
              <span className="font-semibold">Cattedra: Prof.ssa Rita Ingranaggi</span>
            </div>
          </button>

          {/* Card Informatica */}
          <button
            onClick={() => onSelectSubject(activeSubject === 'informatica' ? 'tutti' : 'informatica')}
            className={`group text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 border relative overflow-hidden active:scale-[0.99] touch-manipulation ${
              activeSubject === 'informatica'
                ? 'bg-cyan-950/70 border-cyan-500 ring-2 ring-cyan-500/40 shadow-xl shadow-cyan-950/50'
                : 'bg-slate-800/40 hover:bg-slate-800/80 border-slate-800 hover:border-cyan-500/50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {counts.informatica} risorse
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
              <span>Informatica</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-2">
              Coding Adventure, sfide logiche Bebras, Scratch studio, algoritmi a blocchi e web coding.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 text-[11px] text-cyan-300">
              <img
                src={profAdaImg}
                alt="Prof.ssa Ada Byte"
                className="w-5 h-5 rounded-full object-cover ring-1 ring-cyan-400"
                referrerPolicy="no-referrer"
              />
              <span className="font-semibold">Cattedra: Prof.ssa Ada Byte</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

