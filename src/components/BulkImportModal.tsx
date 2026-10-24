import React, { useState } from 'react';
import { X, Upload, ExternalLink, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { LinkItem, Subject, GradeLevel } from '../types';

interface BulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBulkAdd: (links: Omit<LinkItem, 'id' | 'addedAt'>[]) => void;
}

export const BulkImportModal: React.FC<BulkImportModalProps> = ({
  isOpen,
  onClose,
  onBulkAdd,
}) => {
  const [inputText, setInputText] = useState('');
  const [defaultSubject, setDefaultSubject] = useState<Subject | 'auto'>('auto');
  const [defaultGrade, setDefaultGrade] = useState<GradeLevel>('Tutte');

  if (!isOpen) return null;

  // Parsing logic
  const parseLines = () => {
    const lines = inputText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const parsedItems: Omit<LinkItem, 'id' | 'addedAt'>[] = [];

    lines.forEach((line) => {
      // Find URL in line
      const urlMatch = line.match(/(https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.vercel\.app[^\s]*)/i);
      let rawUrl = urlMatch ? urlMatch[0] : '';
      let remainingText = line;

      if (rawUrl) {
        remainingText = line.replace(rawUrl, '').replace(/^[-—:|]+|[-—:|]+$/g, '').trim();
      } else if (line.includes('.')) {
        // Maybe naked domain
        rawUrl = line;
        remainingText = '';
      }

      if (!rawUrl) return;

      if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
        rawUrl = 'https://' + rawUrl;
      }

      // Title extraction
      let title = remainingText;
      if (!title) {
        try {
          const parsed = new URL(rawUrl);
          title = parsed.hostname.replace('.vercel.app', '').replace('www.', '').replace(/[-_]/g, ' ');
          title = title.charAt(0).toUpperCase() + title.slice(1);
        } catch {
          title = rawUrl;
        }
      }

      // Subject heuristic detection
      let detectedSubject: Subject = 'matematica';
      const fullText = (title + ' ' + rawUrl).toLowerCase();

      if (defaultSubject !== 'auto') {
        detectedSubject = defaultSubject;
      } else {
        if (
          fullText.includes('scienz') ||
          fullText.includes('bio') ||
          fullText.includes('chim') ||
          fullText.includes('chem') ||
          fullText.includes('atom') ||
          fullText.includes('solar') ||
          fullText.includes('pianet') ||
          fullText.includes('astro') ||
          fullText.includes('fisic') ||
          fullText.includes('corpo') ||
          fullText.includes('cellul') ||
          fullText.includes('dna') ||
          fullText.includes('clima') ||
          fullText.includes('terremot') ||
          fullText.includes('vulcan')
        ) {
          detectedSubject = 'scienze';
        } else if (
          fullText.includes('info') ||
          fullText.includes('code') ||
          fullText.includes('coding') ||
          fullText.includes('scratch') ||
          fullText.includes('python') ||
          fullText.includes('flowchart') ||
          fullText.includes('algoritm') ||
          fullText.includes('binar') ||
          fullText.includes('logic') ||
          fullText.includes('circuit') ||
          fullText.includes('web') ||
          fullText.includes('html') ||
          fullText.includes('css') ||
          fullText.includes('robot') ||
          fullText.includes('cyber') ||
          fullText.includes('sicurezza')
        ) {
          detectedSubject = 'informatica';
        } else {
          detectedSubject = 'matematica';
        }
      }

      parsedItems.push({
        title,
        url: rawUrl,
        description: `Applicazione didattica STEAM distribuita su Vercel per la sezione ${detectedSubject}.`,
        subject: detectedSubject,
        gradeLevel: defaultGrade,
        tags: [detectedSubject, 'Vercel', 'STEAM'],
        iconName:
          detectedSubject === 'matematica'
            ? 'Calculator'
            : detectedSubject === 'scienze'
            ? 'Atom'
            : 'Code2',
        isVercel: rawUrl.includes('vercel.app'),
        isFavorite: false,
      });
    });

    return parsedItems;
  };

  const previewList = parseLines();

  const handleImport = () => {
    if (previewList.length === 0) return;
    onBulkAdd(previewList);
    onClose();
  };

  const handlePasteExample = () => {
    setInputText(
      `https://matematica-interattiva-demo.vercel.app - Simulatore Aritmetica e Frazioni\n` +
      `https://scienze-laboratorio-virtuale.vercel.app - Chimica e Reazioni Virtuali\n` +
      `https://informatica-coding-quiz.vercel.app - Quiz di Logica e Algoritmi\n` +
      `https://geometria-solidi.vercel.app - Figure Solide e Formule\n` +
      `https://astronomia-esplora.vercel.app - Esplorazione delle Stelle e Costellazioni`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Importazione Rapida da Vercel
              </h3>
              <p className="text-xs text-slate-400">
                Incolla uno o più link di progetti e distribuiscili nelle sezioni
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* External Vercel Helper Banner */}
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start justify-between gap-3 text-xs text-slate-300">
            <div>
              <span className="font-semibold text-white block mb-0.5">
                Hai link sulla tua dashboard Vercel?
              </span>
              <span>
                Puoi copiare gli indirizzi dei tuoi deployment da Vercel e incollarli qui sotto (uno per riga).
              </span>
            </div>
            <a
              href="https://vercel.com/icbdpp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium shrink-0 transition-all"
            >
              <span>Apri Dashboard Vercel</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Configuration Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Distribuzione Sezioni
              </label>
              <select
                value={defaultSubject}
                onChange={(e) => setDefaultSubject(e.target.value as Subject | 'auto')}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="auto">✨ Rilevamento Automatico (Smart)</option>
                <option value="matematica">📐 Forza su Matematica</option>
                <option value="scienze">🔬 Forza su Scienze</option>
                <option value="informatica">💻 Forza su Informatica</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Livello Classe
              </label>
              <select
                value={defaultGrade}
                onChange={(e) => setDefaultGrade(e.target.value as GradeLevel)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Tutte">Tutte le Classi</option>
                <option value="Classe 1ª">Classe 1ª</option>
                <option value="Classe 2ª">Classe 2ª</option>
                <option value="Classe 3ª">Classe 3ª</option>
                <option value="Laboratorio STEAM">Laboratorio STEAM</option>
              </select>
            </div>
          </div>

          {/* Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Incolla qui i tuoi link (uno per riga)
              </label>
              <button
                type="button"
                onClick={handlePasteExample}
                className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium"
              >
                Carica esempio
              </button>
            </div>
            <textarea
              rows={5}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="https://mio-progetto-matematica.vercel.app&#10;https://simulatore-scienze.vercel.app - Titolo Personalizzato&#10;https://coding-lab.vercel.app"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 font-mono text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Parsed Preview Table */}
          {previewList.length > 0 && (
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Anteprima link rilevati ({previewList.length}):
              </span>
              <div className="max-h-40 overflow-y-auto space-y-1.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                {previewList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-800/80 text-xs"
                  >
                    <div className="truncate min-w-0 flex-1">
                      <span className="font-bold text-white">{item.title}</span>
                      <span className="text-slate-400 block truncate">{item.url}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                        item.subject === 'matematica'
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : item.subject === 'scienze'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {item.subject}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              {previewList.length} link pronti da distribuire
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                Annulla
              </button>
              <button
                type="button"
                disabled={previewList.length === 0}
                onClick={handleImport}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:pointer-events-none text-white shadow-lg shadow-indigo-600/30 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Importa {previewList.length} Link</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
