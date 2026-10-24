import React, { useRef, useState } from 'react';
import { X, Download, Upload, RotateCcw, Check, AlertCircle } from 'lucide-react';
import { LinkItem } from '../types';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  links: LinkItem[];
  onRestoreDefault: () => void;
  onImportBackup: (importedLinks: LinkItem[]) => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  isOpen,
  onClose,
  links,
  onRestoreDefault,
  onImportBackup,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(links, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `steam-lab-risorse-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setStatusMessage('Backup esportato con successo!');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportBackup(parsed);
          setStatusMessage(`Ripristinati con successo ${parsed.length} link!`);
          setTimeout(() => {
            setStatusMessage(null);
            onClose();
          }, 1500);
        } else {
          alert('Il file non contiene un elenco valido di risorse JSON.');
        }
      } catch (err) {
        alert('Errore nella lettura del file JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850">
          <h3 className="text-lg font-bold text-white">
            Gestione Dati & Backup
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {statusMessage && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{statusMessage}</span>
            </div>
          )}

          <p className="text-xs text-slate-400 leading-relaxed">
            I link aggiunti e modificati vengono salvati automaticamente nel tuo browser.
            Puoi esportarli per condividerli o conservarne una copia.
          </p>

          <div className="space-y-3">
            {/* Export */}
            <button
              onClick={handleExportJSON}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:text-white transition-all text-left"
            >
              <div>
                <div className="text-sm font-bold flex items-center gap-2">
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Esporta Backup (JSON)</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Scarica tutti i {links.length} link attuali sul tuo computer
                </p>
              </div>
            </button>

            {/* Import */}
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".json"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:text-white transition-all text-left"
              >
                <div>
                  <div className="text-sm font-bold flex items-center gap-2">
                    <Upload className="w-4 h-4 text-indigo-400" />
                    <span>Importa Backup (JSON)</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Carica un file JSON precedentemente salvato
                  </p>
                </div>
              </button>
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                if (confirm('Sei sicuro di voler ripristinare i link predefiniti della biblioteca STEAM? Le modifiche personalizzate verranno sovrascritte.')) {
                  onRestoreDefault();
                  setStatusMessage('Ripristinati i link iniziali STEAM!');
                  setTimeout(() => {
                    setStatusMessage(null);
                    onClose();
                  }, 1500);
                }
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 hover:bg-rose-950/30 border border-slate-800 hover:border-rose-900/50 text-slate-400 hover:text-rose-300 transition-all text-left"
            >
              <div>
                <div className="text-sm font-bold flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-rose-400" />
                  <span>Ripristina Risorse Iniziali</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Ricarica l'elenco standard di Matematica, Scienze e Informatica
                </p>
              </div>
            </button>
          </div>
        </div>

        <div className="px-6 py-3 border-t border-slate-800 bg-slate-850 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
