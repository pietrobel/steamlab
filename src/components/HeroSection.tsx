import React from 'react';
import { Calculator, Atom, Code2, ArrowUpRight, GraduationCap } from 'lucide-react';
import { Subject } from '../types';
import { heroTeamImg, profSauroImg, leoImg, miaImg } from '../data/mascots';

interface HeroSectionProps {
  counts: Record<Subject, number>;
  activeSubject: Subject | 'tutti';
  onSelectSubject: (sub: Subject | 'tutti') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  counts,
  activeSubject,
  onSelectSubject,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 md:pt-12 md:pb-14 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-b border-slate-800/80">
      {/* Background Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ScienzaLab Mascot Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs md:text-sm font-medium text-slate-300 shadow-inner">
            <img
              src={profSauroImg}
              alt="Prof. Sauro"
              className="w-5 h-5 rounded-full object-cover ring-1 ring-emerald-400"
              referrerPolicy="no-referrer"
            />
            <span className="text-emerald-300 font-bold">ScienzaLab</span>
            <span className="text-slate-500">•</span>
            <span>Il Laboratorio con Prof. Sauro, Leo & Mia</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400" />
            <span>scienzalab.vercel.app</span>
          </div>
        </div>

        {/* Hero Split Grid: Text & Mascot Cinematic Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Laboratorio <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300">ScienzaLab</span>:{' '}
              <span className="text-slate-100 font-extrabold block sm:inline">
                Matematica, Scienze e Informatica
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
              Benvenuti nel laboratorio digitale! Insieme al <strong className="text-emerald-300">Prof. Sauro</strong> (il nostro dinosauro scienziato) e ai giovani studenti <strong className="text-amber-300">Leo</strong> e <strong className="text-rose-300">Mia</strong>, esplora simulatori interattivi, modelli 3D, problemi con il metodo a barre e sfide di logica per la scuola media.
            </p>

            {/* Quick Trio Avatars Pill */}
            <div className="flex flex-wrap items-center gap-3 p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 max-w-fit">
              <div className="flex -space-x-2">
                <img
                  src={profSauroImg}
                  alt="Prof. Sauro"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500"
                  referrerPolicy="no-referrer"
                />
                <img
                  src={leoImg}
                  alt="Leo la Volpe"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-500"
                  referrerPolicy="no-referrer"
                />
                <img
                  src={miaImg}
                  alt="Mia il Panda Rosso"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-rose-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">Docente & Studenti STEAM</span>
                <span className="text-slate-400 text-[11px]">Consigli, trucchi e laboratori guidati</span>
              </div>
            </div>
          </div>

          {/* Cinematic Lab Mascot Banner */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-2xl group bg-slate-900">
              <img
                src={heroTeamImg}
                alt="Prof. Sauro, Leo e Mia nel laboratorio ScienzaLab"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-white bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <span>Prof. Sauro & la classe in laboratorio</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillar Subject Quick Cards with Mascot Recommendations */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {/* Card Matematica */}
          <button
            onClick={() => onSelectSubject(activeSubject === 'matematica' ? 'tutti' : 'matematica')}
            className={`group text-left p-5 rounded-2xl transition-all duration-300 border relative overflow-hidden ${
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
              Il Maestro dei Problemi a barre, proprietà delle operazioni, GeoGebra Classico, frazioni e algebra.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 text-[11px] text-rose-300">
              <img
                src={miaImg}
                alt="Mia"
                className="w-4 h-4 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="font-medium">Consigliata da Mia</span>
            </div>
          </button>

          {/* Card Scienze */}
          <button
            onClick={() => onSelectSubject(activeSubject === 'scienze' ? 'tutti' : 'scienze')}
            className={`group text-left p-5 rounded-2xl transition-all duration-300 border relative overflow-hidden ${
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
              Cinematica e moto, Food Quest alimentazione, PhET gioco delle leve, stati della materia e tavola periodica.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 text-[11px] text-emerald-300">
              <img
                src={profSauroImg}
                alt="Prof. Sauro"
                className="w-4 h-4 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="font-medium">Laboratorio del Prof. Sauro</span>
            </div>
          </button>

          {/* Card Informatica */}
          <button
            onClick={() => onSelectSubject(activeSubject === 'informatica' ? 'tutti' : 'informatica')}
            className={`group text-left p-5 rounded-2xl transition-all duration-300 border relative overflow-hidden ${
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
              Tinkercad circuiti e 3D, sfide Bebras di pensiero computazionale, Scratch Studio e coding web.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 text-[11px] text-amber-300">
              <img
                src={leoImg}
                alt="Leo"
                className="w-4 h-4 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="font-medium">Sfide preferite di Leo</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
