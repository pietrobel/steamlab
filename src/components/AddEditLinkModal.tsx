import React, { useState, useEffect } from 'react';
import { X, Check, Globe, HelpCircle } from 'lucide-react';
import { LinkItem, Subject, GradeLevel } from '../types';

interface AddEditLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (link: Omit<LinkItem, 'id' | 'addedAt'>, editId?: string) => void;
  editingItem: LinkItem | null;
  defaultSubject?: Subject;
}

const AVAILABLE_ICONS = [
  'Calculator',
  'Compass',
  'Triangle',
  'PieChart',
  'Scale',
  'BarChart3',
  'Grid',
  'Dices',
  'Box',
  'Atom',
  'Orbit',
  'HeartPulse',
  'Microscope',
  'Zap',
  'Dna',
  'CloudRain',
  'Flame',
  'Code2',
  'Puzzle',
  'GitFork',
  'Binary',
  'Cpu',
  'Layout',
  'ShieldCheck',
  'Terminal',
  'Bot',
  'Globe',
  'Sparkles',
  'BookOpen',
];

export const AddEditLinkModal: React.FC<AddEditLinkModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingItem,
  defaultSubject = 'matematica',
}) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState<Subject>(defaultSubject);
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('Tutte');
  const [tagsInput, setTagsInput] = useState('');
  const [iconName, setIconName] = useState('Globe');
  const [isVercel, setIsVercel] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      setUrl(editingItem.url);
      setDescription(editingItem.description);
      setSubject(editingItem.subject);
      setGradeLevel(editingItem.gradeLevel);
      setTagsInput(editingItem.tags.join(', '));
      setIconName(editingItem.iconName);
      setIsVercel(editingItem.isVercel || editingItem.url.includes('vercel.app'));
    } else {
      setTitle('');
      setUrl('');
      setDescription('');
      setSubject(defaultSubject);
      setGradeLevel('Tutte');
      setTagsInput('');
      setIconName(
        defaultSubject === 'matematica'
          ? 'Calculator'
          : defaultSubject === 'scienze'
          ? 'Atom'
          : 'Code2'
      );
      setIsVercel(false);
    }
    setError('');
  }, [editingItem, defaultSubject, isOpen]);

  // Auto-detect Vercel and suggest icon/subject when URL changes
  const handleUrlChange = (value: string) => {
    setUrl(value);
    const lower = value.toLowerCase();
    if (lower.includes('vercel.app')) {
      setIsVercel(true);
    }
    // Auto-detect subject if creating new
    if (!editingItem) {
      if (lower.includes('math') || lower.includes('pitagora') || lower.includes('geometria') || lower.includes('algebra')) {
        setSubject('matematica');
      } else if (lower.includes('bio') || lower.includes('scienz') || lower.includes('chem') || lower.includes('solar') || lower.includes('atom')) {
        setSubject('scienze');
      } else if (lower.includes('code') || lower.includes('scratch') || lower.includes('flowchart') || lower.includes('python') || lower.includes('web')) {
        setSubject('informatica');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Inserisci un titolo per la risorsa.');
      return;
    }
    if (!url.trim()) {
      setError('Inserisci l\'indirizzo web (URL).');
      return;
    }

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    onSave(
      {
        title: title.trim(),
        url: formattedUrl,
        description: description.trim() || 'Risorsa didattica interattiva per la scuola.',
        subject,
        gradeLevel,
        tags: tags.length > 0 ? tags : ['STEAM', subject],
        iconName,
        isVercel: isVercel || formattedUrl.includes('vercel.app'),
        isFavorite: editingItem?.isFavorite ?? false,
      },
      editingItem?.id
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {editingItem ? 'Modifica Risorsa STEAM' : 'Aggiungi Nuovo Link'}
              </h3>
              <p className="text-xs text-slate-400">
                Inserisci i dati della web app o risorsa didattica
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Titolo dell'applicazione / risorsa *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="es. Laboratorio Geometria Dinamica"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Indirizzo Web (URL) *
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="es. https://progetto.vercel.app oppure www.sito.it"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
            <div className="flex items-center gap-2 mt-2">
              <label className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isVercel}
                  onChange={(e) => setIsVercel(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
                <span>Applicazione ospitata su Vercel (badge dedicato)</span>
              </label>
            </div>
          </div>

          {/* Section Distribution (Matematica, Scienze, Informatica) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Sezione Didattica (Distribuisci in) *
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSubject('matematica')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                  subject === 'matematica'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                📐 Matematica
              </button>
              <button
                type="button"
                onClick={() => setSubject('scienze')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                  subject === 'scienze'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                🔬 Scienze
              </button>
              <button
                type="button"
                onClick={() => setSubject('informatica')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                  subject === 'informatica'
                    ? 'bg-cyan-600 text-white border-cyan-500 shadow-md shadow-cyan-600/30'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                💻 Informatica
              </button>
            </div>
          </div>

          {/* Grade Level */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Livello / Destinatari
            </label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value as GradeLevel)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="Tutte">Tutte le Classi</option>
              <option value="Classe 1ª">Classe 1ª (Primo Anno)</option>
              <option value="Classe 2ª">Classe 2ª (Secondo Anno)</option>
              <option value="Classe 3ª">Classe 3ª (Terzo Anno / Esame)</option>
              <option value="Laboratorio STEAM">Laboratorio STEAM / Avanzato</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Descrizione o istruzioni d'uso
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Spiega brevemente cosa permette di fare questa applicazione per la classe..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Tag / Argomenti (separati da virgola)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="es. Geometria, Triangoli, Simulazione"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Icon Picker preview */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Icona
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 rounded-xl bg-slate-800/80 border border-slate-700">
              {AVAILABLE_ICONS.map((ic) => (
                <button
                  type="button"
                  key={ic}
                  onClick={() => setIconName(ic)}
                  className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                    iconName === ic
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>{editingItem ? 'Salva Modifiche' : 'Inserisci Link'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
