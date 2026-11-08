import React, { useState } from 'react';
import {
  Sparkles,
  Eye,
  Ear,
  Smile,
  Hand,
  Volume2,
  Gamepad2,
  ExternalLink,
  RotateCw,
  Home,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Maximize2,
  BookOpen,
} from 'lucide-react';
import { profSauroImg, chiaraImg } from '../../data/mascots';

interface CinqueSensiAppProps {
  onBackToHome?: () => void;
}

export const CinqueSensiApp: React.FC<CinqueSensiAppProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'app' | 'schede' | 'giochi'>('app');
  const [iframeKey, setIframeKey] = useState(0);
  const [selectedSense, setSelectedSense] = useState<string>('vista');

  const SENSI_DETAILS = [
    {
      id: 'vista',
      name: 'La Vista',
      organ: 'Occhi',
      emoji: '👁️',
      color: 'from-rose-500/20 to-red-600/20 border-rose-500/40 text-rose-300',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      description: 'Ci permettono di percepire la luce, distinguere i colori, riconoscere le forme, i dettagli e la distanza degli oggetti nello spazio circostante.',
      examples: [
        { emoji: '🌈', text: 'I colori di un arcobaleno' },
        { emoji: '🔺', text: 'Le forme geometriche' },
        { emoji: '🚦', text: 'Il semaforo verde e rosso' },
        { emoji: '📚', text: 'Le parole e i disegni di un libro' },
      ],
      curiosity: 'Gli occhi umani possono distinguere circa 10 milioni di tonalità di colore diverse!',
    },
    {
      id: 'udito',
      name: 'L\'Udito',
      organ: 'Orecchie',
      emoji: '👂',
      color: 'from-teal-500/20 to-cyan-600/20 border-teal-500/40 text-teal-300',
      badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      description: 'Catturano le vibrazioni e le onde sonore nell\'aria, permettendoci di ascoltare voci, musica, canti della natura e suoni di allarme.',
      examples: [
        { emoji: '🎵', text: 'La melodia di una canzone' },
        { emoji: '🔔', text: 'Il suono della campanella' },
        { emoji: '🌧️', text: 'Il rumore rilassante della pioggia' },
        { emoji: '🐦', text: 'Il cinguettio degli uccellini' },
      ],
      curiosity: 'Il timpano è una membrana sottilissima che vibra come la pelle di un tamburo quando viene colpita dal suono.',
    },
    {
      id: 'olfatto',
      name: 'L\'Olfatto',
      organ: 'Naso',
      emoji: '👃',
      color: 'from-amber-500/20 to-yellow-600/20 border-amber-500/40 text-amber-300',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      description: 'I recettori olfattivi identificano le microscopiche particelle odorose trasportate dall\'aria, avvisandoci di profumi deliziosi o pericoli.',
      examples: [
        { emoji: '🌹', text: 'Il profumo dolce di una rosa' },
        { emoji: '🥐', text: 'Il profumo del pane appena sfornato' },
        { emoji: '🌲', text: 'L\'odore resinoso del bosco di pini' },
        { emoji: '🍊', text: 'L\'aroma fresco dell\'arancia' },
      ],
      curiosity: 'L\'olfatto è strettamente collegato alla memoria: un solo odore può risvegliare ricordi lontani della nostra infanzia!',
    },
    {
      id: 'gusto',
      name: 'Il Gusto',
      organ: 'Lingua e papille gustative',
      emoji: '👅',
      color: 'from-emerald-500/20 to-green-600/20 border-emerald-500/40 text-emerald-300',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      description: 'La lingua riconosce le quattro categorie fondamentali di sapore (dolce, salato, amaro, aspro) più l\'umami attraverso le papille gustative.',
      examples: [
        { emoji: '🍯', text: 'Il sapore dolce del miele' },
        { emoji: '🥨', text: 'Il sapore salato del pretzel' },
        { emoji: '🍋', text: 'Il sapore aspro del limone' },
        { emoji: '🫒', text: 'Il sapore amaro dell\'oliva cruda' },
      ],
      curiosity: 'Gusto e olfatto lavorano in squadra: quando abbiamo il raffreddore i cibi ci sembrano quasi senza sapore!',
    },
    {
      id: 'tatto',
      name: 'Il Tatto',
      organ: 'Pelle e mani',
      emoji: '✋',
      color: 'from-purple-500/20 to-indigo-600/20 border-purple-500/40 text-purple-300',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      description: 'La pelle è l\'organo più esteso del corpo umano: ci fa percepire temperatura (caldo/freddo), consistenza (morbido/duro) e tessitura (liscio/ruvido).',
      examples: [
        { emoji: '🧊', text: 'Il freddo gelido di un cubetto di ghiaccio' },
        { emoji: '🧸', text: 'La morbidezza di un peluche' },
        { emoji: '🪨', text: 'La durezza di una roccia o pietra' },
        { emoji: '🪵', text: 'La ruvidità del legno grezzo' },
      ],
      curiosity: 'I polpastrelli delle dita e le labbra sono tra le zone più ricche di recettori tattili di tutto il corpo umano.',
    },
  ];

  const GIOCHI_LIST = [
    {
      id: 'indovina',
      name: 'Indovina il Senso',
      emoji: '❓',
      color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      desc: 'Osserva l\'oggetto e un\'azione specifica: quale senso utilizzi per scoprirla?',
    },
    {
      id: 'organo',
      name: 'Trova l\'Organo',
      emoji: '🔍',
      color: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      desc: 'Leggi la situazione proposta e associa l\'organo di senso corretto tra occhi, orecchie, naso, lingua e pelle.',
    },
    {
      id: 'associa',
      name: 'Quale Immagine?',
      emoji: '🧩',
      color: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      desc: 'Dato un senso e il suo organo, trova l\'unica immagine tra le opzioni che può essere percepita da esso.',
    },
    {
      id: 'percepisco',
      name: 'Che cosa percepisco?',
      emoji: '🤔',
      color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      desc: 'Spesso usiamo più sensi contemporaneamente (ad esempio mangiando una pizza o guardando il mare): seleziona tutti i sensi coinvolti!',
    },
    {
      id: 'vero',
      name: 'Vero o Falso',
      emoji: '✅',
      color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      desc: 'Valuta se l\'affermazione che collega l\'azione al senso proposto è corretta o errata.',
    },
  ];

  return (
    <div className="space-y-6 text-slate-100">
      {/* Top Banner Header with Prof. Sauro & Chiara */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/50 border border-emerald-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-emerald-500/80 shadow-lg shadow-emerald-500/20 bg-slate-900 shrink-0">
              <img
                src={profSauroImg}
                alt="Prof. Dino Sauro"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full overflow-hidden ring-2 ring-teal-400 bg-slate-900">
              <img
                src={chiaraImg}
                alt="Chiara"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Scienze • Il Corpo Umano</span>
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Classe 1ª & 2ª Media
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              I Cinque Sensi: Laboratorio Didattico Interattivo
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-0.5">
              Esplora la vista, l'udito, l'olfatto, il gusto e il tatto. Con la mappa del viso, 5 giochi didattici e la sintesi vocale guidata per tutti gli studenti!
            </p>
          </div>
        </div>

        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-750 text-cyan-300 hover:text-white border border-slate-700 transition-all shrink-0 active:scale-95 shadow-sm"
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
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 ${
            activeTab === 'app'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>App Interattiva & Giochi</span>
        </button>

        <button
          onClick={() => setActiveTab('schede')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 ${
            activeTab === 'schede'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Guida ai 5 Sensi & Organi</span>
        </button>

        <button
          onClick={() => setActiveTab('giochi')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 ${
            activeTab === 'giochi'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>I 5 Giochi Inclusi</span>
        </button>
      </div>

      {/* TAB 1: THE INTERACTIVE APPLICATION RUNNER */}
      {activeTab === 'app' && (
        <div className="space-y-4 animate-fade-in">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-semibold">
                Applicazione Attiva: <strong className="text-white">I Cinque Sensi (Fase 4)</strong>
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Volume2 className="w-3 h-3" />
                Sintesi Vocale Inclusa
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIframeKey((k) => k + 1)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-all flex items-center gap-1.5 text-xs font-semibold active:scale-95"
                title="Ricarica l'applicazione"
              >
                <RotateCw className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ricarica</span>
              </button>

              <a
                href="/cinque-sensi.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md shadow-emerald-900/30 flex items-center gap-1.5 text-xs active:scale-95"
                title="Apri l'app a schermo intero in una nuova scheda"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Schermo Intero</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Embedded App Frame */}
          <div className="relative w-full h-[680px] sm:h-[740px] md:h-[800px] rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl bg-slate-950">
            <iframe
              key={iframeKey}
              src="/cinque-sensi.html"
              title="I Cinque Sensi - Applicazione Didattica Interattiva"
              className="w-full h-full border-0 bg-[#fff7e6] dark:bg-[#1d1b2e]"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              loading="lazy"
            />
          </div>

          {/* Bottom Helpful Callout */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
            <Volume2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-white">Suggerimento per docenti e studenti:</strong> All'inizio puoi inserire il nome dell'alunno/alunna per ricevere complimenti personalizzati con la sintesi vocale. Tocca il pulsante <span className="text-emerald-300 font-bold">«ASCOLTA LA SPIEGAZIONE»</span> o <span className="text-amber-300 font-bold">«ASCOLTA LA DOMANDA»</span> per far leggere al computer ogni contenuto ad alta voce.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: SENSES & ORGANS GUIDE */}
      {activeTab === 'schede' && (
        <div className="space-y-6 animate-fade-in">
          {/* Sense Selection Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {SENSI_DETAILS.map((s) => {
              const isSelected = selectedSense === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSense(s.id)}
                  className={`p-3.5 rounded-2xl border text-center transition-all active:scale-95 flex flex-col items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-400 ring-2 ring-emerald-400/30 shadow-lg text-white'
                      : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/80 text-slate-300'
                  }`}
                >
                  <span className="text-3xl">{s.emoji}</span>
                  <span className="text-sm font-bold">{s.name}</span>
                  <span className="text-[11px] text-slate-400">{s.organ}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Sense Detailed Card */}
          {(() => {
            const current = SENSI_DETAILS.find((s) => s.id === selectedSense) || SENSI_DETAILS[0];
            return (
              <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${current.color} border shadow-2xl`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">{current.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-black text-white">{current.name}</h3>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${current.badge}`}>
                        Organo: {current.organ}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 mt-1">{current.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Esempi di percezione nella vita quotidiana:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {current.examples.map((ex, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200">
                          <span className="text-xl">{ex.emoji}</span>
                          <span>{ex.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Curiosità Scientifica del Prof. Dino Sauro:</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {current.curiosity}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('app')}
                      className="mt-4 w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all text-center flex items-center justify-center gap-1.5 shadow"
                    >
                      <Gamepad2 className="w-4 h-4" />
                      <span>Esercitati con questo senso nell'App Interattiva</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 3: THE 5 GAMES INCLUDED */}
      {activeTab === 'giochi' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-2">
              Le 5 Modalità di Gioco Incluse
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              L'applicazione include 5 tipologie di quiz e giochi progressivi, studiati per stimolare il pensiero critico e la comprensione multisensoriale:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GIOCHI_LIST.map((g) => (
              <div key={g.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
                <span className="text-3xl shrink-0 p-2 rounded-2xl bg-slate-800/80 border border-slate-700">{g.emoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white">{g.name}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${g.color}`}>
                      Modalità
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-cyan-950/50 border border-emerald-500/30 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h4 className="text-sm font-bold text-white">Pronto a metterti alla prova?</h4>
              <p className="text-xs text-slate-300">Apri l'app e scegli "GIOCHIAMO" per avviare una sessione di 15 domande!</p>
            </div>
            <button
              onClick={() => setActiveTab('app')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-900/30 flex items-center gap-2"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Avvia i Giochi Adesso</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
