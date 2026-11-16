import React, { useState, useMemo } from 'react';
import {
  Atom,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw,
  Home,
  ArrowLeft,
  Eye,
  BookOpen,
  Table2,
  Plus,
  Minus,
  Copy,
  Check,
  Eraser,
  Lightbulb,
} from 'lucide-react';
import { profSauroImg, samuImg } from '../../data/mascots';

interface StrutturaAtomoAppProps {
  onBackToHome?: () => void;
}

interface ElementData {
  z: number;
  symbol: string;
  name: string;
  commonMass: number;
  altMasses?: number[];
  commonCharges: number[];
}

const ELEMENTS_DB: ElementData[] = [
  { z: 1, symbol: 'H', name: 'Idrogeno', commonMass: 1, altMasses: [2, 3], commonCharges: [0, 1, -1] },
  { z: 2, symbol: 'He', name: 'Elio', commonMass: 4, commonCharges: [0] },
  { z: 3, symbol: 'Li', name: 'Litio', commonMass: 7, altMasses: [6], commonCharges: [0, 1] },
  { z: 4, symbol: 'Be', name: 'Berillio', commonMass: 9, commonCharges: [0, 2] },
  { z: 5, symbol: 'B', name: 'Boro', commonMass: 11, altMasses: [10], commonCharges: [0] },
  { z: 6, symbol: 'C', name: 'Carbonio', commonMass: 12, altMasses: [13, 14], commonCharges: [0] },
  { z: 7, symbol: 'N', name: 'Azoto', commonMass: 14, altMasses: [15], commonCharges: [0, -3] },
  { z: 8, symbol: 'O', name: 'Ossigeno', commonMass: 16, altMasses: [17, 18], commonCharges: [0, -2] },
  { z: 9, symbol: 'F', name: 'Fluoro', commonMass: 19, commonCharges: [0, -1] },
  { z: 10, symbol: 'Ne', name: 'Neon', commonMass: 20, altMasses: [22], commonCharges: [0] },
  { z: 11, symbol: 'Na', name: 'Sodio', commonMass: 23, commonCharges: [0, 1] },
  { z: 12, symbol: 'Mg', name: 'Magnesio', commonMass: 24, altMasses: [25, 26], commonCharges: [0, 2] },
  { z: 13, symbol: 'Al', name: 'Alluminio', commonMass: 27, commonCharges: [0, 3] },
  { z: 14, symbol: 'Si', name: 'Silicio', commonMass: 28, altMasses: [29], commonCharges: [0] },
  { z: 15, symbol: 'P', name: 'Fosforo', commonMass: 31, commonCharges: [0, -3] },
  { z: 16, symbol: 'S', name: 'Zolfo', commonMass: 32, altMasses: [34], commonCharges: [0, -2] },
  { z: 17, symbol: 'Cl', name: 'Cloro', commonMass: 35, altMasses: [37], commonCharges: [0, -1] },
  { z: 18, symbol: 'Ar', name: 'Argon', commonMass: 40, commonCharges: [0] },
  { z: 19, symbol: 'K', name: 'Potassio', commonMass: 39, altMasses: [41], commonCharges: [0, 1] },
  { z: 20, symbol: 'Ca', name: 'Calcio', commonMass: 40, altMasses: [42, 44], commonCharges: [0, 2] },
];

type FieldKey = 'symbol' | 'name' | 'protons' | 'electrons' | 'neutrons' | 'massNumber' | 'charge';

interface AtomExerciseRow {
  id: number;
  solution: {
    symbol: string;
    name: string;
    protons: number;
    electrons: number;
    neutrons: number;
    massNumber: number;
    charge: string; // e.g. '0', '+2', '-1'
  };
  given: FieldKey[];
}

function formatCharge(q: number): string {
  if (q === 0) return '0';
  return q > 0 ? `+${q}` : `${q}`;
}

const PRESET_LEVELS: Record<'livello1' | 'livello2' | 'livello3', { title: string; subtitle: string; rows: AtomExerciseRow[] }> = {
  livello1: {
    title: 'Livello 1 · Atomi Neutri',
    subtitle: 'Parti dal numero atomico Z e ricava protoni, elettroni, neutroni e numero di massa A.',
    rows: [
      {
        id: 1,
        solution: { symbol: 'He', name: 'Elio', protons: 2, electrons: 2, neutrons: 2, massNumber: 4, charge: '0' },
        given: ['symbol', 'neutrons', 'charge'],
      },
      {
        id: 2,
        solution: { symbol: 'C', name: 'Carbonio', protons: 6, electrons: 6, neutrons: 6, massNumber: 12, charge: '0' },
        given: ['name', 'massNumber', 'charge'],
      },
      {
        id: 3,
        solution: { symbol: 'O', name: 'Ossigeno', protons: 8, electrons: 8, neutrons: 8, massNumber: 16, charge: '0' },
        given: ['protons', 'neutrons', 'charge'],
      },
      {
        id: 4,
        solution: { symbol: 'Na', name: 'Sodio', protons: 11, electrons: 11, neutrons: 12, massNumber: 23, charge: '0' },
        given: ['symbol', 'massNumber', 'electrons'],
      },
      {
        id: 5,
        solution: { symbol: 'Al', name: 'Alluminio', protons: 13, electrons: 13, neutrons: 14, massNumber: 27, charge: '0' },
        given: ['name', 'electrons', 'neutrons'],
      },
      {
        id: 6,
        solution: { symbol: 'Ca', name: 'Calcio', protons: 20, electrons: 20, neutrons: 20, massNumber: 40, charge: '0' },
        given: ['protons', 'massNumber', 'charge'],
      },
    ],
  },
  livello2: {
    title: 'Livello 2 · Ioni Positivi e Negativi',
    subtitle: 'Esercitati con cationi (+) e anioni (−): ricorda di scrivere sempre il segno nella carica (+2, -1, 0).',
    rows: [
      {
        id: 1,
        solution: { symbol: 'Na', name: 'Sodio', protons: 11, electrons: 10, neutrons: 12, massNumber: 23, charge: '+1' },
        given: ['symbol', 'neutrons', 'charge'],
      },
      {
        id: 2,
        solution: { symbol: 'Cl', name: 'Cloro', protons: 17, electrons: 18, neutrons: 18, massNumber: 35, charge: '-1' },
        given: ['name', 'electrons', 'massNumber'],
      },
      {
        id: 3,
        solution: { symbol: 'Mg', name: 'Magnesio', protons: 12, electrons: 10, neutrons: 12, massNumber: 24, charge: '+2' },
        given: ['protons', 'neutrons', 'charge'],
      },
      {
        id: 4,
        solution: { symbol: 'O', name: 'Ossigeno', protons: 8, electrons: 10, neutrons: 8, massNumber: 16, charge: '-2' },
        given: ['symbol', 'electrons', 'massNumber'],
      },
      {
        id: 5,
        solution: { symbol: 'Al', name: 'Alluminio', protons: 13, electrons: 10, neutrons: 14, massNumber: 27, charge: '+3' },
        given: ['name', 'neutrons', 'electrons'],
      },
      {
        id: 6,
        solution: { symbol: 'N', name: 'Azoto', protons: 7, electrons: 10, neutrons: 7, massNumber: 14, charge: '-3' },
        given: ['protons', 'massNumber', 'charge'],
      },
    ],
  },
  livello3: {
    title: 'Livello 3 · Isotopi e Sfida Completa',
    subtitle: 'Atomi con diverso numero di neutroni (isotopi come C-14 e Cl-37) e dati misti da ricavare.',
    rows: [
      {
        id: 1,
        solution: { symbol: 'C', name: 'Carbonio', protons: 6, electrons: 6, neutrons: 8, massNumber: 14, charge: '0' },
        given: ['symbol', 'massNumber', 'charge'],
      },
      {
        id: 2,
        solution: { symbol: 'Cl', name: 'Cloro', protons: 17, electrons: 18, neutrons: 20, massNumber: 37, charge: '-1' },
        given: ['protons', 'neutrons', 'electrons'],
      },
      {
        id: 3,
        solution: { symbol: 'H', name: 'Idrogeno', protons: 1, electrons: 0, neutrons: 1, massNumber: 2, charge: '+1' },
        given: ['name', 'neutrons', 'charge'],
      },
      {
        id: 4,
        solution: { symbol: 'K', name: 'Potassio', protons: 19, electrons: 18, neutrons: 22, massNumber: 41, charge: '+1' },
        given: ['symbol', 'massNumber', 'electrons'],
      },
      {
        id: 5,
        solution: { symbol: 'S', name: 'Zolfo', protons: 16, electrons: 18, neutrons: 18, massNumber: 34, charge: '-2' },
        given: ['protons', 'neutrons', 'charge'],
      },
      {
        id: 6,
        solution: { symbol: 'Ca', name: 'Calcio', protons: 20, electrons: 18, neutrons: 24, massNumber: 44, charge: '+2' },
        given: ['name', 'electrons', 'massNumber'],
      },
    ],
  },
};

function generateRandomRows(): AtomExerciseRow[] {
  const pool = [...ELEMENTS_DB].sort(() => Math.random() - 0.5).slice(0, 6);
  const patterns: FieldKey[][] = [
    ['symbol', 'neutrons', 'charge'],
    ['name', 'massNumber', 'charge'],
    ['protons', 'neutrons', 'electrons'],
    ['symbol', 'massNumber', 'electrons'],
    ['protons', 'massNumber', 'charge'],
    ['name', 'electrons', 'neutrons'],
  ];
  return pool.map((el, idx) => {
    const useAlt = el.altMasses && el.altMasses.length > 0 && Math.random() < 0.35;
    const massNumber = useAlt ? el.altMasses![Math.floor(Math.random() * el.altMasses!.length)] : el.commonMass;
    const neutrons = massNumber - el.z;
    const chargeNum = el.commonCharges[Math.floor(Math.random() * el.commonCharges.length)];
    const electrons = el.z - chargeNum;
    const given = patterns[(idx + Math.floor(Math.random() * patterns.length)) % patterns.length];
    return {
      id: idx + 1,
      solution: {
        symbol: el.symbol,
        name: el.name,
        protons: el.z,
        electrons,
        neutrons,
        massNumber,
        charge: formatCharge(chargeNum),
      },
      given,
    };
  });
}

// Compute electron shells (2, 8, 8, 2 for Z <= 20)
function getShellDistribution(electrons: number): number[] {
  const caps = [2, 8, 8, 2];
  const shells: number[] = [];
  let rem = Math.max(0, electrons);
  for (const cap of caps) {
    if (rem <= 0) break;
    const count = Math.min(rem, cap);
    shells.push(count);
    rem -= count;
  }
  if (rem > 0) shells.push(rem);
  return shells;
}

// Crisp SVG Bohr Atomic Model
const BohrAtomDiagram: React.FC<{
  protons: number;
  neutrons: number;
  electrons: number;
  symbol: string;
  name: string;
  charge: string;
}> = ({ protons, neutrons, electrons, symbol, name, charge }) => {
  const shells = getShellDistribution(electrons);
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;

  // Deterministic nucleon coordinates inside nucleus
  const nucleons = useMemo(() => {
    const total = Math.min(protons + neutrons, 44);
    const items: { x: number; y: number; isProton: boolean }[] = [];
    // Interleave protons and neutrons evenly
    let pLeft = protons;
    let nLeft = neutrons;
    for (let i = 0; i < total; i++) {
      let isProton = false;
      if (pLeft > 0 && nLeft > 0) {
        isProton = i % 2 === 0;
      } else if (pLeft > 0) {
        isProton = true;
      }
      if (isProton) pLeft--;
      else nLeft--;

      if (i === 0) {
        items.push({ x: cx, y: cy, isProton });
      } else {
        const angle = i * 2.39996; // Golden angle
        const radius = Math.min(26, 4.2 * Math.sqrt(i));
        items.push({
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          isProton,
        });
      }
    }
    return items;
  }, [protons, neutrons, cx, cy]);

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[270px] h-auto select-none"
        role="img"
        aria-label={`Modello atomico di ${name}: ${protons} protoni, ${neutrons} neutroni, ${electrons} elettroni`}
      >
        <defs>
          <radialGradient id="nucleusGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Subtle nucleus glow */}
        <circle cx={cx} cy={cy} r={52} fill="url(#nucleusGlow)" />

        {/* Electron shells */}
        {shells.map((count, sIdx) => {
          const r = 52 + sIdx * 23;
          return (
            <g key={`shell-${sIdx}`}>
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="#334155"
                strokeWidth="1.25"
                strokeDasharray={sIdx % 2 === 1 ? '4 3' : undefined}
              />
              {Array.from({ length: count }).map((_, eIdx) => {
                const angle = (eIdx / count) * Math.PI * 2 - Math.PI / 2 + sIdx * 0.4;
                const ex = cx + Math.cos(angle) * r;
                const ey = cy + Math.sin(angle) * r;
                return (
                  <g key={`e-${sIdx}-${eIdx}`}>
                    <circle cx={ex} cy={ey} r={5.5} fill="#0284c7" stroke="#bae6fd" strokeWidth="1.2" />
                    <text
                      x={ex}
                      y={ey + 0.5}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="7"
                      fontWeight="bold"
                      fill="#ffffff"
                    >
                      -
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Nucleus particles */}
        {nucleons.map((nuc, idx) => (
          <circle
            key={`nuc-${idx}`}
            cx={nuc.x}
            cy={nuc.y}
            r={4.2}
            fill={nuc.isProton ? '#e11d48' : '#64748b'}
            stroke="#0f172a"
            strokeWidth="0.9"
          />
        ))}
      </svg>

      {/* Diagram Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300 mt-1">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-600 inline-block border border-rose-300/40" />
          <span className="tabular-nums">Protoni ({protons})</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-slate-500 inline-block border border-slate-300/40" />
          <span className="tabular-nums">Neutroni ({neutrons})</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-sky-600 inline-block border border-sky-200/60" />
          <span className="tabular-nums">Elettroni ({electrons})</span>
        </span>
      </div>

      {/* Element Notation Badge */}
      <div className="mt-3 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
        <div className="flex flex-col text-right leading-none font-mono text-xs text-slate-400 tabular-nums">
          <span>{protons + neutrons}</span>
          <span>{protons}</span>
        </div>
        <div className="text-2xl font-bold text-white tracking-tight">
          {symbol}
          {charge !== '0' && (
            <sup className="text-sm font-mono text-amber-400 ml-0.5">
              {charge === '+1' ? '+' : charge === '-1' ? '−' : charge.replace('-', '−')}
            </sup>
          )}
        </div>
        <div className="text-left">
          <div className="text-sm font-semibold text-white">{name}</div>
          <div className="text-xs text-slate-400">
            {charge === '0' ? 'Atomo neutro' : charge.startsWith('+') ? 'Catione (+)' : 'Anione (−)'}
          </div>
        </div>
      </div>
    </div>
  );
};

export const StrutturaAtomoApp: React.FC<StrutturaAtomoAppProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'scheda' | 'simulatore' | 'formule'>('scheda');

  // Tab 1: Exercise Worksheet state
  const [levelKey, setLevelKey] = useState<'livello1' | 'livello2' | 'livello3' | 'casuale'>('livello1');
  const [rows, setRows] = useState<AtomExerciseRow[]>(() => PRESET_LEVELS.livello1.rows);
  const [answers, setAnswers] = useState<Record<number, Partial<Record<FieldKey, string>>>>({});
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedRowId, setSelectedRowId] = useState<number>(1);
  const [hintRowId, setHintRowId] = useState<number | null>(null);
  const [copiedMd, setCopiedMd] = useState(false);

  // Tab 2: 2D Atom Simulator state
  const [simProtons, setSimProtons] = useState<number>(6);
  const [simNeutrons, setSimNeutrons] = useState<number>(6);
  const [simElectrons, setSimElectrons] = useState<number>(6);

  const loadLevel = (key: 'livello1' | 'livello2' | 'livello3' | 'casuale') => {
    setLevelKey(key);
    const newRows = key === 'casuale' ? generateRandomRows() : PRESET_LEVELS[key].rows;
    setRows(newRows);
    setAnswers({});
    setChecked(false);
    setHintRowId(null);
    setSelectedRowId(1);
  };

  const handleCellChange = (rowId: number, field: FieldKey, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [rowId]: {
        ...(prev[rowId] || {}),
        [field]: value,
      },
    }));
    if (checked) setChecked(false);
  };

  const normalizeInput = (field: FieldKey, raw: string): string => {
    const v = raw.trim();
    if (field === 'symbol') return v.toLowerCase();
    if (field === 'name') return v.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (field === 'charge') {
      return v.replace(/\s+/g, '').replace('−', '-');
    }
    return v;
  };

  const isCellCorrect = (row: AtomExerciseRow, field: FieldKey): boolean => {
    if (row.given.includes(field)) return true;
    const raw = answers[row.id]?.[field] ?? '';
    if (!raw.trim()) return false;
    const expected = String(row.solution[field]);
    if (field === 'charge') {
      return normalizeInput('charge', raw) === expected;
    }
    return normalizeInput(field, raw) === normalizeInput(field, expected);
  };

  const isRowCompleteAndCorrect = (row: AtomExerciseRow): boolean => {
    const fields: FieldKey[] = ['symbol', 'name', 'protons', 'electrons', 'neutrons', 'massNumber', 'charge'];
    return fields.every((f) => isCellCorrect(row, f));
  };

  const scoreSummary = useMemo(() => {
    const fields: FieldKey[] = ['symbol', 'name', 'protons', 'electrons', 'neutrons', 'massNumber', 'charge'];
    let totalBlank = 0;
    let totalCorrect = 0;
    rows.forEach((row) => {
      fields.forEach((f) => {
        if (!row.given.includes(f)) {
          totalBlank++;
          if (isCellCorrect(row, f)) totalCorrect++;
        }
      });
    });
    return { totalBlank, totalCorrect };
  }, [rows, answers]);

  const handleShowSolutions = () => {
    const filled: Record<number, Partial<Record<FieldKey, string>>> = {};
    rows.forEach((row) => {
      filled[row.id] = {
        symbol: row.solution.symbol,
        name: row.solution.name,
        protons: String(row.solution.protons),
        electrons: String(row.solution.electrons),
        neutrons: String(row.solution.neutrons),
        massNumber: String(row.solution.massNumber),
        charge: row.solution.charge,
      };
    });
    setAnswers(filled);
    setChecked(true);
  };

  const handleResetAnswers = () => {
    setAnswers({});
    setChecked(false);
    setHintRowId(null);
  };

  const handleCopyMarkdown = () => {
    const header = [
      '# La struttura dell\'atomo',
      '',
      'Scheda di esercizi · Scienze, seconda secondaria di primo grado',
      '',
      'Le celle `evidenziate` sono i dati forniti. Completa le celle vuote. Usa il simbolo della carica con il segno: `0`, `+2`, `-1`.',
      '',
      '| N. | Simbolo | Nome | Protoni | Elettroni | Neutroni | Numero di massa A | Carica |',
      '| --- | --- | --- | --- | --- | --- | --- | --- |',
    ];
    const body = rows.map((r) => {
      const cell = (f: FieldKey) => {
        const val = r.given.includes(f) ? `\`${r.solution[f]}\`` : (answers[r.id]?.[f] || ' ');
        return val;
      };
      return `| ${r.id} | ${cell('symbol')} | ${cell('name')} | ${cell('protons')} | ${cell('electrons')} | ${cell('neutrons')} | ${cell('massNumber')} | ${cell('charge')} |`;
    });
    const text = [...header, ...body].join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 2000);
    }).catch(() => {});
  };

  const selectedRow = rows.find((r) => r.id === selectedRowId) || rows[0];
  const simElement = ELEMENTS_DB.find((e) => e.z === simProtons) || ELEMENTS_DB[0];
  const simChargeNum = simProtons - simElectrons;
  const simChargeStr = formatCharge(simChargeNum);

  const getHintText = (row: AtomExerciseRow): string => {
    if (row.given.includes('protons')) {
      return `Riga ${row.id}: conosci già i protoni (${row.solution.protons}), che coincidono con il numero atomico Z. Trova l'elemento con Z = ${row.solution.protons} nella tavola rapida.`;
    }
    if (row.given.includes('symbol')) {
      return `Riga ${row.id}: partendo dal simbolo "${row.solution.symbol}", individua l'elemento (${row.solution.name}) e il suo numero atomico Z = ${row.solution.protons} = numero di protoni.`;
    }
    return `Riga ${row.id}: partendo dal nome "${row.solution.name}", trova il suo numero atomico Z = ${row.solution.protons} = numero di protoni, poi applica A = protoni + neutroni e Carica = protoni − elettroni.`;
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4 min-w-0">
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-500/60 bg-slate-950">
              <img src={profSauroImg} alt="Prof. Dino Sauro" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full overflow-hidden border-2 border-slate-900 bg-slate-950">
              <img src={samuImg} alt="Samu" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
              <span className="font-semibold text-emerald-400">Scienze</span>
              <span aria-hidden="true">·</span>
              <span>Seconda secondaria di primo grado</span>
              <span aria-hidden="true">·</span>
              <span>Chimica e struttura della materia</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5 tracking-tight">
              La struttura dell'atomo
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Completa la tabella interattiva degli esercizi ricavando Z, numero di massa A e carica, oppure costruisci gli atomi nel simulatore 2D.
            </p>
          </div>
        </div>

        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-cyan-300 hover:text-white border border-slate-700 transition-colors shrink-0 whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4" />
            <Home className="w-4 h-4 text-cyan-400" />
            <span>Torna a ScienzaLab</span>
          </button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('scheda')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors shrink-0 whitespace-nowrap ${
            activeTab === 'scheda'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Table2 className="w-4 h-4" />
          <span>Scheda Esercizi (Tabella)</span>
        </button>

        <button
          onClick={() => setActiveTab('simulatore')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors shrink-0 whitespace-nowrap ${
            activeTab === 'simulatore'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Atom className="w-4 h-4" />
          <span>Simulatore Atomo 2D</span>
        </button>

        <button
          onClick={() => setActiveTab('formule')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors shrink-0 whitespace-nowrap ${
            activeTab === 'formule'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Formule & Tavola Elementi</span>
        </button>
      </div>

      {/* TAB 1: WORKSHEET TABLE */}
      {activeTab === 'scheda' && (
        <div className="space-y-5 animate-fade-in">
          {/* Instructions & Core Formulas Strip */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-slate-200">
                Istruzioni della scheda
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Le celle <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium">evidenziate</span> sono i dati forniti. Completa le celle vuote. Usa il simbolo della carica con il segno: <code className="font-mono text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded">0</code>, <code className="font-mono text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded">+2</code>, <code className="font-mono text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded">-1</code>.
              </p>
              <p className="text-xs text-slate-400">
                Suggerimento: prima trova il numero di protoni (Z), poi ricava il resto con le formule.
              </p>
            </div>

            <div className="lg:col-span-5 p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-center space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400 font-sans">Numero atomico Z</span>
                <span className="text-emerald-300 font-semibold">Z = numero di protoni</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400 font-sans">Numero di massa A</span>
                <span className="text-cyan-300 font-semibold">A = protoni + neutroni</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-sans">Carica elettrica</span>
                <span className="text-amber-300 font-semibold">Carica = protoni − elettroni</span>
              </div>
            </div>
          </div>

          {/* Level Selector & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto">
              <button
                onClick={() => loadLevel('livello1')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  levelKey === 'livello1' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Livello 1 · Neutri
              </button>
              <button
                onClick={() => loadLevel('livello2')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  levelKey === 'livello2' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Livello 2 · Ioni
              </button>
              <button
                onClick={() => loadLevel('livello3')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  levelKey === 'livello3' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Livello 3 · Isotopi
              </button>
              <button
                onClick={() => loadLevel('casuale')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  levelKey === 'casuale' ? 'bg-emerald-600 text-white' : 'text-emerald-400 hover:bg-slate-800'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Nuova Scheda Casuale</span>
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleCopyMarkdown}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors whitespace-nowrap"
                title="Copia la tabella in formato Markdown"
              >
                {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMd ? 'Tabella copiata' : 'Copia Markdown'}</span>
              </button>

              <button
                onClick={handleResetAnswers}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors whitespace-nowrap"
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>Svuota</span>
              </button>

              <button
                onClick={handleShowSolutions}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 transition-colors whitespace-nowrap"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Soluzioni</span>
              </button>

              <button
                onClick={() => setChecked(true)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors whitespace-nowrap shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verifica Risposte</span>
              </button>
            </div>
          </div>

          {/* Feedback Banner when checked */}
          {checked && (
            <div
              className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm ${
                scoreSummary.totalCorrect === scoreSummary.totalBlank
                  ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                  : 'bg-slate-900 border-slate-700 text-slate-200'
              }`}
              role="status"
            >
              <div className="flex items-center gap-2 font-medium">
                {scoreSummary.totalCorrect === scoreSummary.totalBlank ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Ottimo lavoro! Tutte le {scoreSummary.totalBlank} celle sono corrette.</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="tabular-nums">
                      Risposte esatte: <strong>{scoreSummary.totalCorrect}</strong> su <strong>{scoreSummary.totalBlank}</strong> celle da completare. Controlla le celle contrassegnate con ✗.
                    </span>
                  </>
                )}
              </div>
              <span className="text-xs text-slate-400">
                Ricorda il segno per la carica (<code className="font-mono">+1</code>, <code className="font-mono">-2</code>, <code className="font-mono">0</code>)
              </span>
            </div>
          )}

          {/* Exercise Table */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[780px]">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/70 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-3 text-center w-12">N.</th>
                    <th className="py-3 px-2.5 w-24">Simbolo</th>
                    <th className="py-3 px-2.5 w-36">Nome</th>
                    <th className="py-3 px-2.5 text-center w-24">Protoni</th>
                    <th className="py-3 px-2.5 text-center w-24">Elettroni</th>
                    <th className="py-3 px-2.5 text-center w-24">Neutroni</th>
                    <th className="py-3 px-2.5 text-center w-28">N° di massa A</th>
                    <th className="py-3 px-2.5 text-center w-24">Carica</th>
                    <th className="py-3 px-3 text-center w-20">Aiuto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-sm">
                  {rows.map((row) => {
                    const isSelected = selectedRow?.id === row.id;
                    const rowOk = checked && isRowCompleteAndCorrect(row);
                    const fields: FieldKey[] = ['symbol', 'name', 'protons', 'electrons', 'neutrons', 'massNumber', 'charge'];

                    return (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedRowId(row.id)}
                        className={`transition-colors cursor-pointer ${
                          isSelected ? 'bg-slate-800/40' : 'hover:bg-slate-800/20'
                        }`}
                      >
                        <td className="py-2.5 px-3 text-center font-mono tabular-nums text-xs text-slate-400">
                          <div className="flex items-center justify-center gap-1">
                            <span>{row.id}</span>
                            {rowOk && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-label="Riga corretta" />}
                          </div>
                        </td>

                        {fields.map((field) => {
                          const isGiven = row.given.includes(field);
                          const isNumeric = field !== 'symbol' && field !== 'name';
                          const val = isGiven ? String(row.solution[field]) : (answers[row.id]?.[field] ?? '');
                          const ok = checked && !isGiven && isCellCorrect(row, field);
                          const bad = checked && !isGiven && !isCellCorrect(row, field);

                          if (isGiven) {
                            return (
                              <td key={field} className="py-2 px-2">
                                <div
                                  className={`px-2.5 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/35 text-emerald-200 font-semibold text-xs sm:text-sm ${
                                    isNumeric ? 'text-center font-mono tabular-nums' : 'text-left'
                                  }`}
                                  title="Dato fornito"
                                >
                                  {val}
                                </div>
                              </td>
                            );
                          }

                          return (
                            <td key={field} className="py-2 px-2">
                              <div className="relative flex items-center">
                                <input
                                  type="text"
                                  inputMode={field === 'protons' || field === 'electrons' || field === 'neutrons' || field === 'massNumber' ? 'numeric' : 'text'}
                                  value={val}
                                  onChange={(e) => handleCellChange(row.id, field, e.target.value)}
                                  placeholder={field === 'charge' ? '0, +1, -2' : field === 'symbol' ? 'Es. C' : field === 'name' ? 'Elemento' : '?'}
                                  aria-label={`Riga ${row.id}, ${field}`}
                                  className={`w-full px-2.5 py-2 rounded-lg bg-slate-950 border text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 transition-colors ${
                                    isNumeric ? 'text-center font-mono tabular-nums' : 'text-left'
                                  } ${
                                    ok
                                      ? 'border-emerald-500/70 focus:ring-emerald-500/30 pr-6'
                                      : bad
                                      ? 'border-rose-500/70 focus:ring-rose-500/30 pr-6'
                                      : 'border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20'
                                  }`}
                                />
                                {ok && (
                                  <CheckCircle2
                                    className="w-3.5 h-3.5 text-emerald-400 absolute right-1.5 pointer-events-none"
                                    aria-label="Corretto"
                                  />
                                )}
                                {bad && (
                                  <XCircle
                                    className="w-3.5 h-3.5 text-rose-400 absolute right-1.5 pointer-events-none"
                                    aria-label="Errato o mancante"
                                  />
                                )}
                              </div>
                            </td>
                          );
                        })}

                        <td className="py-2 px-3 text-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setHintRowId((prev) => (prev === row.id ? null : row.id));
                            }}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              hintRowId === row.id
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : 'bg-slate-800 text-slate-400 hover:text-amber-300 border-slate-700'
                            }`}
                            title={`Suggerimento per riga ${row.id}`}
                          >
                            <Lightbulb className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inline Row Hint */}
          {hintRowId && (
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs sm:text-sm text-amber-100 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{getHintText(rows.find((r) => r.id === hintRowId) || rows[0])}</span>
            </div>
          )}

          {/* Selected Row Atomic Visualizer */}
          {selectedRow && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 rounded-xl bg-slate-900 border border-slate-800 items-center">
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="text-xs font-medium text-slate-400 mb-1">
                  Anteprima modello atomico · Esercizio N. {selectedRow.id}
                </div>
                {checked && isRowCompleteAndCorrect(selectedRow) ? (
                  <BohrAtomDiagram
                    protons={selectedRow.solution.protons}
                    neutrons={selectedRow.solution.neutrons}
                    electrons={selectedRow.solution.electrons}
                    symbol={selectedRow.solution.symbol}
                    name={selectedRow.solution.name}
                    charge={selectedRow.solution.charge}
                  />
                ) : (
                  <div className="py-8 px-4 text-center space-y-2 max-w-xs">
                    <Atom className="w-12 h-12 text-slate-600 mx-auto" />
                    <div className="text-sm font-semibold text-slate-200">
                      Esercizio N. {selectedRow.id} selezionato
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Completa tutte le celle della riga {selectedRow.id} e premi <strong>Verifica Risposte</strong> per visualizzare il modello di Bohr dell'atomo corrispondente.
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-7 space-y-3">
                <h3 className="text-sm font-semibold text-white">
                  Procedimento passo dopo passo per la riga {selectedRow.id}
                </h3>
                <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <strong className="text-emerald-400">1. Individua Z (Protoni):</strong>{' '}
                    Usa il simbolo, il nome o il numero di protoni fornito per identificare l'atomo nella tavola degli elementi.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <strong className="text-cyan-400">2. Calcola A o i Neutroni:</strong>{' '}
                    Applica <code className="font-mono text-white">A = protoni + neutroni</code> oppure <code className="font-mono text-white">neutroni = A − protoni</code>.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <strong className="text-amber-400">3. Determina Carica o Elettroni:</strong>{' '}
                    Ricorda <code className="font-mono text-white">Carica = protoni − elettroni</code>. Se neutro scrivi <code className="font-mono text-white">0</code>; altrimenti scrivi sempre <code className="font-mono text-white">+</code> o <code className="font-mono text-white">-</code>.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: 2D ATOM SIMULATOR SANDBOX */}
      {activeTab === 'simulatore' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          {/* Left / Main Zone: Interactive Bohr Diagram (60%+) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center min-h-[420px]">
            <div className="w-full flex items-center justify-between mb-2 text-xs text-slate-400">
              <span>Modello a gusci elettronici (Bohr)</span>
              <span className="font-mono tabular-nums">
                Z = {simProtons} · A = {simProtons + simNeutrons}
              </span>
            </div>

            <BohrAtomDiagram
              protons={simProtons}
              neutrons={simNeutrons}
              electrons={simElectrons}
              symbol={simElement.symbol}
              name={simElement.name}
              charge={simChargeStr}
            />

            {/* Formula Readout */}
            <div className="w-full grid grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-slate-800 text-center">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-400">Numero Atomico Z</div>
                <div className="text-base font-bold font-mono tabular-nums text-rose-400 mt-0.5">
                  {simProtons}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-400">Massa A (p⁺ + n⁰)</div>
                <div className="text-base font-bold font-mono tabular-nums text-cyan-400 mt-0.5">
                  {simProtons} + {simNeutrons} = {simProtons + simNeutrons}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-400">Carica (p⁺ − e⁻)</div>
                <div className="text-base font-bold font-mono tabular-nums text-amber-400 mt-0.5">
                  {simChargeStr}
                </div>
              </div>
            </div>
          </div>

          {/* Right Zone: Particle Controllers */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <div>
              <h3 className="text-base font-bold text-white">Controllo Particelle Subatomiche</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Modifica protoni, neutroni ed elettroni per osservare come cambiano elemento, isotopo e carica netta.
              </p>
            </div>

            {/* Protons control */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <label htmlFor="slider-protons" className="text-xs font-semibold text-rose-300">
                  Protoni (p⁺) · Determinano l'elemento
                </label>
                <span className="font-mono tabular-nums text-sm font-bold text-white">{simProtons}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSimProtons((p) => Math.max(1, p - 1))}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  aria-label="Diminuisci protoni"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  id="slider-protons"
                  type="range"
                  min={1}
                  max={20}
                  value={simProtons}
                  onChange={(e) => setSimProtons(Number(e.target.value))}
                  className="flex-1 accent-rose-500"
                />
                <button
                  type="button"
                  onClick={() => setSimProtons((p) => Math.min(20, p + 1))}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  aria-label="Aumenta protoni"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Neutrons control */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <label htmlFor="slider-neutrons" className="text-xs font-semibold text-slate-300">
                  Neutroni (n⁰) · Determinano gli isotopi
                </label>
                <span className="font-mono tabular-nums text-sm font-bold text-white">{simNeutrons}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSimNeutrons((n) => Math.max(0, n - 1))}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  aria-label="Diminuisci neutroni"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  id="slider-neutrons"
                  type="range"
                  min={0}
                  max={24}
                  value={simNeutrons}
                  onChange={(e) => setSimNeutrons(Number(e.target.value))}
                  className="flex-1 accent-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setSimNeutrons((n) => Math.min(24, n + 1))}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  aria-label="Aumenta neutroni"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Electrons control */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <label htmlFor="slider-electrons" className="text-xs font-semibold text-sky-300">
                  Elettroni (e⁻) · Determinano la carica
                </label>
                <span className="font-mono tabular-nums text-sm font-bold text-white">{simElectrons}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSimElectrons((el) => Math.max(0, el - 1))}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  aria-label="Diminuisci elettroni"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  id="slider-electrons"
                  type="range"
                  min={0}
                  max={22}
                  value={simElectrons}
                  onChange={(e) => setSimElectrons(Number(e.target.value))}
                  className="flex-1 accent-sky-500"
                />
                <button
                  type="button"
                  onClick={() => setSimElectrons((el) => Math.min(22, el + 1))}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  aria-label="Aumenta elettroni"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-semibold text-slate-300">Esempi rapidi notevoli:</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Carbonio-12 (Neutro)', p: 6, n: 6, e: 6 },
                  { label: 'Carbonio-14 (Isotopo)', p: 6, n: 8, e: 6 },
                  { label: 'Ione Sodio Na⁺', p: 11, n: 12, e: 10 },
                  { label: 'Ione Cloruro Cl⁻', p: 17, n: 18, e: 18 },
                  { label: 'Ione Ossido O²⁻', p: 8, n: 8, e: 10 },
                ].map((ex) => (
                  <button
                    key={ex.label}
                    type="button"
                    onClick={() => {
                      setSimProtons(ex.p);
                      setSimNeutrons(ex.n);
                      setSimElectrons(ex.e);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-colors"
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FORMULAS & PERIODIC REFERENCE */}
      {activeTab === 'formule' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-emerald-400">Formula 1 · Identità</div>
              <h3 className="text-base font-bold text-white">Numero Atomico (Z)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Indica il numero di <strong>protoni</strong> nel nucleo. È la carta d'identità dell'elemento chimico.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 text-center">
                Z = protoni
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-cyan-400">Formula 2 · Nucleo</div>
              <h3 className="text-base font-bold text-white">Numero di Massa (A)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Somma di tutte le particelle pesanti presenti nel nucleo: <strong>protoni + neutroni</strong>.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 text-center">
                A = p⁺ + n⁰ &nbsp;·&nbsp; n⁰ = A − p⁺
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-amber-400">Formula 3 · Bilancio Elettrico</div>
              <h3 className="text-base font-bold text-white">Carica Elettrica</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Differenza tra cariche positive e negative. È <code className="font-mono text-white">0</code> se l'atomo è neutro.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300 text-center">
                Carica = p⁺ − e⁻
              </div>
            </div>
          </div>

          {/* Quick Periodic Table Reference (Z = 1..20) */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white">
                  Tavola Rapida di Riferimento (Primi 20 Elementi)
                </h3>
                <p className="text-xs text-slate-400">
                  Usa questa tabella per trovare il numero atomico Z partendo dal simbolo o dal nome italiano.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
              {ELEMENTS_DB.map((el) => (
                <button
                  key={el.z}
                  type="button"
                  onClick={() => {
                    setSimProtons(el.z);
                    setSimNeutrons(el.commonMass - el.z);
                    setSimElectrons(el.z);
                    setActiveTab('simulatore');
                  }}
                  className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-left transition-colors group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono tabular-nums">
                    <span>Z = {el.z}</span>
                    <span>A ≈ {el.commonMass}</span>
                  </div>
                  <div className="text-lg font-bold text-white group-hover:text-emerald-300 mt-0.5">
                    {el.symbol}
                  </div>
                  <div className="text-xs text-slate-300 truncate">{el.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
