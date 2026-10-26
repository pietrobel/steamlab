import React, { useState, useEffect } from 'react';
import { ExternalLink, Link2, ArrowLeft, Home, RefreshCw, CheckCircle2, AlertCircle, Laptop } from 'lucide-react';
import { profSauroImg, profIpaziaImg, profAdaImg, leoImg, miaImg } from '../../data/mascots';

interface ExternalAppConnectorProps {
  appId: 'cinematica' | 'food-quest' | 'proprieta-operazioni' | 'maestro-problemi' | 'coding-adventure' | string;
  title: string;
  description: string;
  defaultUrl?: string;
  onBackToHome?: () => void;
}

export const ExternalAppConnector: React.FC<ExternalAppConnectorProps> = ({
  appId,
  title,
  description,
  defaultUrl = '',
  onBackToHome,
}) => {
  const storageKey = `scienzalab_custom_app_url_${appId}`;
  const [iframeKey, setIframeKey] = useState(0);
  const [appUrl, setAppUrl] = useState<string>(() => {
    const saved = localStorage.getItem(storageKey);
    // Sanitize any previous nonexistent / placeholder URLs
    if (
      !saved ||
      !saved.startsWith('http') ||
      saved.includes('scienzalab.vercel.app') ||
      saved.includes('cinematica.vercel.app') ||
      saved.includes('food-quest.vercel.app')
    ) {
      if (defaultUrl) {
        localStorage.setItem(storageKey, defaultUrl);
      }
      return defaultUrl;
    }
    return saved;
  });
  const [inputUrl, setInputUrl] = useState<string>(appUrl || defaultUrl);
  const [isEditing, setIsEditing] = useState<boolean>(!appUrl && !defaultUrl);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    // If defaultUrl was updated and current appUrl is either empty or matches an obsolete domain, sync it
    if (
      defaultUrl &&
      (!appUrl ||
        appUrl.includes('scienzalab.vercel.app') ||
        appUrl.includes('cinematica.vercel.app') ||
        appUrl.includes('food-quest.vercel.app'))
    ) {
      setAppUrl(defaultUrl);
      setInputUrl(defaultUrl);
      setIsEditing(false);
      localStorage.setItem(storageKey, defaultUrl);
    }
  }, [defaultUrl, appUrl, storageKey]);

  useEffect(() => {
    if (appUrl) {
      localStorage.setItem(storageKey, appUrl);
    }
  }, [appUrl, storageKey]);

  const handleSaveUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    let formatted = inputUrl.trim();
    if (formatted && !/^https?:\/\//i.test(formatted)) {
      formatted = `https://${formatted}`;
    }
    setAppUrl(formatted);
    setIsEditing(false);
    setIframeError(false);
  };

  const handleClearUrl = () => {
    localStorage.removeItem(storageKey);
    setAppUrl('');
    setInputUrl('');
    setIsEditing(true);
  };

  const handleResetToDefault = () => {
    if (defaultUrl) {
      setAppUrl(defaultUrl);
      setInputUrl(defaultUrl);
      localStorage.setItem(storageKey, defaultUrl);
      setIsEditing(false);
      setIframeError(false);
    } else {
      handleClearUrl();
    }
  };

  const isMath = appId === 'maestro-problemi' || appId === 'proprieta-operazioni';
  const isCoding = appId === 'coding-adventure';
  const teacherImg = isMath ? profIpaziaImg : isCoding ? profAdaImg : profSauroImg;
  const teacherName = isMath ? 'Prof.ssa Ipazia' : isCoding ? 'Prof.ssa Ada' : 'Prof. Sauro';
  const studentImg = isMath ? miaImg : leoImg;
  const studentName = isMath ? 'Mia' : 'Leo';

  return (
    <div className="space-y-6 text-slate-100">
      {/* Top Bar with Home Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
            <Laptop className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Web App Originale Integrata
              </span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[11px] text-slate-300">
                <img src={teacherImg} alt={teacherName} className="w-4 h-4 rounded-full object-cover ring-1 ring-cyan-400" />
                <img src={studentImg} alt={studentName} className="w-4 h-4 rounded-full object-cover ring-1 ring-amber-400" />
                <span>{teacherName} & {studentName}</span>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              {title}
            </h2>
            <p className="text-xs text-slate-400 line-clamp-1">{description}</p>
          </div>
        </div>

        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700 hover:border-cyan-500 transition-all shadow-sm shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <Home className="w-4 h-4 text-cyan-400" />
            <span>Torna a ScienzaLab</span>
          </button>
        )}
      </div>

      {/* Main Content Area */}
      {appUrl && !isEditing ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-slate-400 shrink-0 hidden sm:inline">App collegata:</span>
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline font-mono truncate"
              >
                {appUrl}
              </a>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIframeKey((k) => k + 1)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-all flex items-center gap-1 text-xs"
                title="Ricarica applicazione"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Ricarica</span>
              </button>
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-all shadow-sm"
              >
                <span>Apri a Schermo Intero</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold border border-slate-700 transition-all"
              >
                Modifica URL
              </button>
            </div>
          </div>

          {/* Embedded iFrame */}
          <div className="relative w-full h-[74vh] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
            <iframe
              key={iframeKey}
              src={appUrl}
              title={title}
              className="w-full h-full border-0 bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
              onError={() => setIframeError(true)}
            />
            {iframeError && (
              <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center">
                <AlertCircle className="w-12 h-12 text-amber-400 mb-3" />
                <h4 className="text-lg font-bold text-white mb-2">
                  Protezione di Incorporamento (X-Frame-Options)
                </h4>
                <p className="text-sm text-slate-300 max-w-md mb-4">
                  Il server di questa applicazione impedisce la visualizzazione in un riquadro interno (iframe). Puoi aprirla direttamente a schermo intero con un clic:
                </p>
                <a
                  href={appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg transition-all"
                >
                  <span>Apri Applicazione Originale a Schermo Intero</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Setup / URL Connection Card */
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center">
              <Link2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Collega la tua applicazione originale
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
              Per visualizzare la tua applicazione originale completa di tutte le sue funzionalità senza app sintetiche, inserisci qui sotto l'indirizzo web (URL) o la repository dell'app.
            </p>
          </div>

          <form onSubmit={handleSaveUrl} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                Indirizzo Web dell'App (URL):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Es. https://mia-app-didattica.it o indirizzo web..."
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              {appUrl && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                >
                  Annulla
                </button>
              )}
              {appUrl && (
                <button
                  type="button"
                  onClick={handleClearUrl}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40"
                >
                  Rimuovi Collegamento
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Collega e Visualizza App</span>
              </button>
            </div>
          </form>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <img src={profSauroImg} alt="Prof. Sauro" className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <span className="font-bold text-emerald-400 block">Nota del Prof. Sauro:</span>
              <p>
                Abbiamo rimosso le simulazioni sintetiche temporanee per fare spazio alla tua vera applicazione. Appena indichi il link nella chat o lo incolli qui sopra, si collegherà all'istante per tutti i tuoi studenti!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
