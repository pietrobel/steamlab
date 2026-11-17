import React, { useState, useRef, useMemo } from 'react';
import {
  PawPrint,
  Volume2,
  Gamepad2,
  ExternalLink,
  RotateCw,
  Home,
  ArrowLeft,
  Maximize2,
  BookOpen,
  Tv,
  Monitor,
  Compass,
} from 'lucide-react';
import { profSauroImg, leoImg } from '../../data/mascots';

interface GliAnimaliAppProps {
  onBackToHome?: () => void;
}

interface AnimalItem {
  n: string;
  g: 'm' | 'f';
  e: string;
  dove: 'terra' | 'cielo' | 'mare';
  cibo: 'erba' | 'carne' | 'pesce' | 'frutta' | 'fiori' | 'insetti';
}

const ANIMALI_DATA: AnimalItem[] = [
  { n: 'cane', g: 'm', e: '🐶', dove: 'terra', cibo: 'carne' },
  { n: 'gatto', g: 'm', e: '🐱', dove: 'terra', cibo: 'carne' },
  { n: 'mucca', g: 'f', e: '🐮', dove: 'terra', cibo: 'erba' },
  { n: 'coniglio', g: 'm', e: '🐰', dove: 'terra', cibo: 'erba' },
  { n: 'cavallo', g: 'm', e: '🐴', dove: 'terra', cibo: 'erba' },
  { n: 'elefante', g: 'm', e: '🐘', dove: 'terra', cibo: 'erba' },
  { n: 'leone', g: 'm', e: '🦁', dove: 'terra', cibo: 'carne' },
  { n: 'scimmia', g: 'f', e: '🐒', dove: 'terra', cibo: 'frutta' },
  { n: 'rana', g: 'f', e: '🐸', dove: 'terra', cibo: 'insetti' },
  { n: 'ape', g: 'f', e: '🐝', dove: 'cielo', cibo: 'fiori' },
  { n: 'farfalla', g: 'f', e: '🦋', dove: 'cielo', cibo: 'fiori' },
  { n: 'uccello', g: 'm', e: '🐦', dove: 'cielo', cibo: 'insetti' },
  { n: 'aquila', g: 'f', e: '🦅', dove: 'cielo', cibo: 'carne' },
  { n: 'delfino', g: 'm', e: '🐬', dove: 'mare', cibo: 'pesce' },
  { n: 'squalo', g: 'm', e: '🦈', dove: 'mare', cibo: 'pesce' },
  { n: 'polpo', g: 'm', e: '🐙', dove: 'mare', cibo: 'pesce' },
  { n: 'maiale', g: 'm', e: '🐷', dove: 'terra', cibo: 'erba' },
  { n: 'gallina', g: 'f', e: '🐔', dove: 'terra', cibo: 'erba' },
  { n: 'pecora', g: 'f', e: '🐑', dove: 'terra', cibo: 'erba' },
  { n: 'topo', g: 'm', e: '🐭', dove: 'terra', cibo: 'frutta' },
  { n: 'orso', g: 'm', e: '🐻', dove: 'terra', cibo: 'frutta' },
  { n: 'giraffa', g: 'f', e: '🦒', dove: 'terra', cibo: 'erba' },
  { n: 'tartaruga', g: 'f', e: '🐢', dove: 'terra', cibo: 'erba' },
  { n: 'serpente', g: 'm', e: '🐍', dove: 'terra', cibo: 'carne' },
  { n: 'gufo', g: 'm', e: '🦉', dove: 'cielo', cibo: 'carne' },
  { n: 'pappagallo', g: 'm', e: '🦜', dove: 'cielo', cibo: 'frutta' },
  { n: 'coccinella', g: 'f', e: '🐞', dove: 'cielo', cibo: 'insetti' },
  { n: 'lumaca', g: 'f', e: '🐌', dove: 'terra', cibo: 'erba' },
  { n: 'riccio', g: 'm', e: '🦔', dove: 'terra', cibo: 'insetti' },
  { n: 'scoiattolo', g: 'm', e: '🐿️', dove: 'terra', cibo: 'frutta' },
  { n: 'ragno', g: 'm', e: '🕷️', dove: 'terra', cibo: 'insetti' },
  { n: 'granchio', g: 'm', e: '🦀', dove: 'mare', cibo: 'pesce' },
  { n: 'balena', g: 'f', e: '🐳', dove: 'mare', cibo: 'pesce' },
  { n: 'aragosta', g: 'f', e: '🦞', dove: 'mare', cibo: 'pesce' },
  { n: 'iguana', g: 'f', e: '🦎', dove: 'terra', cibo: 'erba' },
  { n: 'canguro', g: 'm', e: '🦘', dove: 'terra', cibo: 'erba' },
  { n: 'koala', g: 'm', e: '🐨', dove: 'terra', cibo: 'erba' },
  { n: 'lupo', g: 'm', e: '🐺', dove: 'terra', cibo: 'carne' },
  { n: 'volpe', g: 'f', e: '🦊', dove: 'terra', cibo: 'carne' },
  { n: 'cammello', g: 'm', e: '🐫', dove: 'terra', cibo: 'erba' },
  { n: 'rinoceronte', g: 'm', e: '🦏', dove: 'terra', cibo: 'erba' },
  { n: 'zebra', g: 'f', e: '🦓', dove: 'terra', cibo: 'erba' },
  { n: 'panda', g: 'm', e: '🐼', dove: 'terra', cibo: 'erba' },
  { n: 'pipistrello', g: 'm', e: '🦇', dove: 'cielo', cibo: 'insetti' },
  { n: 'grillo', g: 'm', e: '🦗', dove: 'terra', cibo: 'insetti' },
  { n: 'orca', g: 'f', e: '🐋', dove: 'mare', cibo: 'pesce' },
  { n: 'tonno', g: 'm', e: '🐟', dove: 'mare', cibo: 'pesce' },
];

const HABITAT_LABEL: Record<AnimalItem['dove'], { emoji: string; label: string }> = {
  terra: { emoji: '🌳', label: 'Sulla terra' },
  cielo: { emoji: '☁️', label: 'In cielo' },
  mare: { emoji: '🌊', label: 'In mare' },
};

const DIET_LABEL: Record<AnimalItem['cibo'], { emoji: string; label: string }> = {
  erba: { emoji: '🌿', label: 'Erba' },
  carne: { emoji: '🍖', label: 'Carne' },
  pesce: { emoji: '🐟', label: 'Pesce' },
  frutta: { emoji: '🍎', label: 'Frutta' },
  fiori: { emoji: '🌸', label: 'Fiori' },
  insetti: { emoji: '🪲', label: 'Insetti' },
};

const GIOCHI_LIST = [
  {
    id: 'riconosci',
    name: 'Trova l\'Animale',
    emoji: '🔍',
    desc: 'Ascolta il nome dell\'animale richiesto e riconosci l\'immagine corrispondente tra 6 opzioni.',
  },
  {
    id: 'dove',
    name: 'Dove Vive?',
    emoji: '🗺️',
    desc: 'Associa ogni animale al suo ambiente naturale principale: cielo, mare o terraferma.',
  },
  {
    id: 'cibo',
    name: 'Cosa Mangia?',
    emoji: '🍽️',
    desc: 'Individua l\'alimentazione corretta di ogni specie tra erbivori, carnivori, frugivori e insettivori.',
  },
  {
    id: 'vero',
    name: 'Vero o Falso',
    emoji: '✅',
    desc: 'Ascolta o leggi l\'affermazione sull\'habitat dell\'animale e decidi se è vera o falsa.',
  },
];

export const GliAnimaliApp: React.FC<GliAnimaliAppProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'app' | 'enciclopedia' | 'giochi'>('app');
  const [iframeKey, setIframeKey] = useState(0);
  const [isLimRatio, setIsLimRatio] = useState<boolean>(true);
  const [habitatFilter, setHabitatFilter] = useState<'tutti' | 'terra' | 'cielo' | 'mare'>('tutti');
  const frameContainerRef = useRef<HTMLDivElement>(null);

  const handleToggleFullscreen = () => {
    if (frameContainerRef.current) {
      if (!document.fullscreenElement) {
        frameContainerRef.current.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const filteredAnimals = useMemo(() => {
    if (habitatFilter === 'tutti') return ANIMALI_DATA;
    return ANIMALI_DATA.filter((a) => a.dove === habitatFilter);
  }, [habitatFilter]);

  return (
    <div className="space-y-6 text-slate-100">
      {/* Top Banner Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/50 border border-emerald-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-emerald-500/80 shadow-lg bg-slate-900">
              <img src={profSauroImg} alt="Prof. Dino Sauro" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full overflow-hidden ring-2 ring-teal-400 bg-slate-900">
              <img src={leoImg} alt="Leo" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
              <span className="font-semibold text-emerald-400">Scienze</span>
              <span aria-hidden="true">·</span>
              <span>Zoologia ed Ecosistemi</span>
              <span aria-hidden="true">·</span>
              <span>Classe 1ª Media</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              Gli Animali: Habitat, Alimentazione & Giochi
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-0.5">
              Esplora 47 schede zoologiche illustrate con sintesi vocale automatica, scopri dove vivono e cosa mangiano gli animali e sfida te stesso nei 4 giochi interattivi.
            </p>
          </div>
        </div>

        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-750 text-cyan-300 hover:text-white border border-slate-700 transition-all shrink-0 active:scale-95 whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4" />
            <Home className="w-4 h-4 text-cyan-400" />
            <span>Torna a ScienzaLab</span>
          </button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('app')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 whitespace-nowrap ${
            activeTab === 'app'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>App Interattiva & Giochi</span>
        </button>

        <button
          onClick={() => setActiveTab('enciclopedia')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 whitespace-nowrap ${
            activeTab === 'enciclopedia'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Schede dei 47 Animali</span>
        </button>

        <button
          onClick={() => setActiveTab('giochi')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 whitespace-nowrap ${
            activeTab === 'giochi'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>I 4 Giochi Inclusi</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE APPLICATION RUNNER */}
      {activeTab === 'app' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <PawPrint className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300 font-semibold">
                Applicazione Attiva: <strong className="text-white">Gli Animali</strong>
              </span>
              <span className="text-slate-500" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-emerald-300 font-medium">
                <Tv className="w-3.5 h-3.5 text-emerald-400" />
                Ottimizzato LIM 16:9
              </span>
              <span className="hidden md:inline text-slate-500" aria-hidden="true">·</span>
              <span className="hidden md:inline-flex items-center gap-1 text-cyan-300 font-medium">
                <Volume2 className="w-3.5 h-3.5" />
                Audio & Avanzamento Automatico
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap shrink-0">
              <button
                onClick={() => setIsLimRatio((prev) => !prev)}
                className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold active:scale-95 touch-manipulation whitespace-nowrap ${
                  isLimRatio
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isLimRatio ? 'Rapporto LIM (16:9) ON' : 'Formato Libero'}</span>
              </button>

              <button
                onClick={() => setIframeKey((k) => k + 1)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-all flex items-center gap-1.5 text-xs font-semibold active:scale-95 touch-manipulation whitespace-nowrap"
              >
                <RotateCw className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ricarica</span>
              </button>

              <button
                onClick={handleToggleFullscreen}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold transition-all shadow-md flex items-center gap-1.5 text-xs active:scale-95 touch-manipulation whitespace-nowrap"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Schermo Intero LIM</span>
              </button>

              <a
                href="/gli-animali.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 font-semibold transition-all flex items-center gap-1.5 text-xs active:scale-95 whitespace-nowrap"
              >
                <ExternalLink className="w-3 h-3 text-cyan-400" />
                <span className="hidden sm:inline">Nuova Scheda</span>
              </a>
            </div>
          </div>

          <div
            ref={frameContainerRef}
            className={`relative w-full rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl bg-[#eef9f1] dark:bg-[#1d2a24] transition-all duration-300 ${
              isLimRatio
                ? 'aspect-[16/9] min-h-[440px] max-h-[85vh]'
                : 'h-[720px] sm:h-[800px]'
            }`}
          >
            <iframe
              key={iframeKey}
              src="/gli-animali.html"
              title="Gli Animali - Applicazione Didattica Interattiva"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* TAB 2: 47 ANIMALS ENCYCLOPEDIA */}
      {activeTab === 'enciclopedia' && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-white">Catalogo Zoologico (47 Specie)</h3>
              <p className="text-xs text-slate-400">
                Filtra gli animali in base all'ambiente in cui vivono e scopri la loro alimentazione.
              </p>
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
              {([
                { id: 'tutti', label: `Tutti (${ANIMALI_DATA.length})` },
                { id: 'terra', label: '🌳 Terra' },
                { id: 'cielo', label: '☁️ Cielo' },
                { id: 'mare', label: '🌊 Mare' },
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setHabitatFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                    habitatFilter === tab.id
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredAnimals.map((a) => {
              const hab = HABITAT_LABEL[a.dove];
              const diet = DIET_LABEL[a.cibo];
              return (
                <div
                  key={a.n}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col items-center text-center gap-2 hover:border-emerald-500/40 transition-colors"
                >
                  <span className="text-4xl" aria-hidden="true">{a.e}</span>
                  <div className="text-sm font-bold text-white capitalize">{a.n}</div>
                  <div className="text-[11px] text-slate-300 space-y-0.5">
                    <div>{hab.emoji} {hab.label}</div>
                    <div className="text-slate-400">{diet.emoji} {diet.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: INCLUDED GAMES */}
      {activeTab === 'giochi' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-1">Le 4 Modalità di Gioco Incluse</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Ogni modalità propone 15 domande casuali bilanciate tra terra, cielo e mare, con voce automatica e passaggio diretto tra un gioco e il successivo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GIOCHI_LIST.map((g) => (
              <div key={g.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
                <span className="text-3xl shrink-0 p-2 rounded-2xl bg-slate-800/80 border border-slate-700">{g.emoji}</span>
                <div>
                  <h4 className="text-base font-bold text-white">{g.name}</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-cyan-950/50 border border-emerald-500/30 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h4 className="text-sm font-bold text-white">Pronto a esplorare il mondo animale?</h4>
              <p className="text-xs text-slate-300">Avvia l'app interattiva e premi «GIOCHIAMO» per iniziare la sfida!</p>
            </div>
            <button
              onClick={() => setActiveTab('app')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md flex items-center gap-2"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Avvia l'App Interattiva</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
