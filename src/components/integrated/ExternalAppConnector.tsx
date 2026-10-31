import React, { useState } from 'react';
import { ExternalLink, ArrowLeft, Home, RefreshCw, AlertCircle, Laptop, ShieldCheck } from 'lucide-react';
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
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeError, setIframeError] = useState(false);

  // Directly and safely use the curated educator URL without allowing student tampering
  const appUrl = defaultUrl;

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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Web App Ufficiale Verificata</span>
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
      {appUrl ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-slate-400 shrink-0 hidden sm:inline">Indirizzo verificato:</span>
              <span className="text-cyan-400 font-mono truncate select-all">
                {appUrl}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIframeKey((k) => k + 1)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-all flex items-center gap-1.5 text-xs font-semibold"
                title="Ricarica l'applicazione per vedere subito gli ultimi aggiornamenti"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ricarica App</span>
              </button>
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-all shadow-sm text-xs"
              >
                <span>Apri a Schermo Intero</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Embedded iFrame */}
          <div className="relative w-full h-[75vh] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
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
                  Il server di questa applicazione impedisce la visualizzazione in un riquadro interno. Puoi comunque aprirla direttamente a schermo intero con un clic:
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
        <div className="p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800">
          <p className="text-sm text-slate-400">Nessun indirizzo configurato per questa applicazione.</p>
        </div>
      )}
    </div>
  );
};
