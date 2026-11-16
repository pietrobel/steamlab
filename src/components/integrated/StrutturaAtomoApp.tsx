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
    charge: string;
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

// High-Contrast Light-Background Bohr Atomic Diagram
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

  const nucleons = useMemo(() => {
    const total = Math.min(protons + neutrons, 44);
    const items: { x: number; y: number; isProton: boolean }[] = [];
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
        const angle = i * 2.39996;
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
      <div className="p-2 rounded-2xl bg-slate-50 border border-slate-200">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full max-w-[260px] h-auto select-none"
          role="img"
          aria-label={`Modello atomico di ${name}: ${protons} protoni, ${neutrons} neutroni, ${electrons} elettroni`}
        >
          <defs>
            <radialGradient id="nucleusGlowLight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={cx} cy={cy} r={48} fill="url(#nucleusGlowLight)" />

          {shells.map((count, sIdx) => {
            const r = 52 + sIdx * 23;
            return (
              <g key={`shell-${sIdx}`}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  strokeDasharray={sIdx % 2 === 1 ? '5 4' : undefined}
                />
                {Array.from({ length: count }).map((_, eIdx) => {
                  const angle = (eIdx / count) * Math.PI * 2 - Math.PI / 2 + sIdx * 0.4;
                  const ex = cx + Math.cos(angle) * r;
                  const ey = cy + Math.sin(angle) * r;
                  return (
                    <g key={`e-${sIdx}-${eIdx}`}>
                      <circle cx={ex} cy={ey} r={6} fill="#0369a1" stroke="#ffffff" strokeWidth="1.5" />
                      <text
                        x={ex}
                        y={ey + 0.5}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="8"
                        fontWeight="bold"
                        fill="#ffffff"
                      >
                        −
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {nucleons.map((nuc, idx) => (
            <circle
              key={`nuc-${idx}`}
              cx={nuc.x}
              cy={nuc.y}
              r={4.5}
              fill={nuc.isProton ? '#e11d48' : '#64748b'}
              stroke="#ffffff"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      {/* High-contrast Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700 mt-3">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-600 inline-block border border-rose-800/30" />
          <span className="tabular-nums">Protoni ({protons})</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-slate-500 inline-block border border-slate-700/30" />
          <span className="tabular-nums">Neutroni ({neutrons})</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-sky-700 inline-block border border-sky-900/30" />
          <span className="tabular-nums">Elettroni ({electrons})</span>
        </span>
      </div>

      {/* Element Notation Badge */}
      <div className="mt-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 flex items-center gap-3.5 shadow-xs">
        <div className="flex flex-col text-right leading-tight font-mono text-xs font-bold text-slate-600 tabular-nums">
          <span>{protons + neutrons}</span>
          <span>{protons}</span>
        </div>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {symbol}
          {charge !== '0' && (
            <sup className="text-sm font-mono font-bold text-amber-700 ml-0.5">
              {charge === '+1' ? '+' : charge === '-1' ? '−' : charge.replace('-', '−')}
            </sup>
          )}
        </div>
        <div className="text-left border-l border-slate-300 pl-3">
          <div className="text-sm font-bold text-slate-900">{name}</div>
          <div className="text-xs font-medium text-slate-600">
            {charge === '0' ? 'Atomo neutro' : charge.startsWith('+') ? 'Catione (+)' : 'Anione (−)'}
          </div>
        </div>
      </div>
    </div>
  );
};

export const StrutturaAtomoApp: React.FC<StrutturaAtomoAppProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'scheda' | 'simulatore' | 'formule'>('scheda');

  const [levelKey, setLevelKey] = useState<'livello1' | 'livello2' | 'livello3' | 'casuale'>('livello1');
  const [rows, setRows] = useState<AtomExerciseRow[]>(() => PRESET_LEVELS.livello1.rows);
  const [answers, setAnswers] = useState<Record<number, Partial<Record<FieldKey, string>>>>({});
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedRowId, setSelectedRowId] = useState<number>(1);
  const [hintRowId, setHintRowId] = useState<number | null>(null);
  const [copiedMd, setCopiedMd] = useState(false);

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
    <div className="space-y-6 bg-slate-50 text-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
      {/* Light Editorial Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start sm:items-center gap-4 min-w-0">
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-600/70 bg-slate-100">
              <img src={profSauroImg} alt="Prof. Dino Sauro" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full overflow-hidden border-2 border-white bg-slate-100 shadow-xs">
              <img src={samuImg} alt="Samu" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 flex-wrap">
              <span className="font-bold text-emerald-700">Scienze</span>
              <span aria-hidden="true">·</span>
              <span>Seconda secondaria di primo grado</span>
              <span aria-hidden="true">·</span>
              <span>Chimica e struttura della materia</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5 tracking-tight">
              La struttura dell'atomo
            </h2>
            <p className="text-sm text-slate-700 mt-1 max-w-2xl leading-relaxed">
              Completa la tabella interattiva degli esercizi ricavando Z, numero di massa A e carica, oppure esplora gli atomi nel simulatore 2D.
            </p>
          </div>
        </div>

        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-colors shrink-0 whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4 text-slate-700" />
            <Home className="w-4 h-4 text-sky-700" />
            <span>Torna a ScienzaLab</span>
          </button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-xl border border-slate-200 overflow-x-auto scrollbar-none shadow-xs">
        <button
          onClick={() => setActiveTab('scheda')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-colors shrink-0 whitespace-nowrap ${
            activeTab === 'scheda'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
          }`}
        >
          <Table2 className="w-4 h-4" />
          <span>Scheda Esercizi (Tabella)</span>
        </button>

        <button
          onClick={() => setActiveTab('simulatore')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-colors shrink-0 whitespace-nowrap ${
            activeTab === 'simulatore'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
          }`}
        >
          <Atom className="w-4 h-4" />
          <span>Simulatore Atomo 2D</span>
        </button>

        <button
          onClick={() => setActiveTab('formule')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-colors shrink-0 whitespace-nowrap ${
            activeTab === 'formule'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
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
            <div className="lg:col-span-7 p-4 sm:p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
              <div className="text-sm font-bold text-slate-900">
                Istruzioni della scheda
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Le celle <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-950 border border-sky-300 font-bold">evidenziate</span> sono i dati forniti. Completa le celle vuote. Usa il simbolo della carica con il segno: <code className="font-mono font-bold text-slate-900 bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded">0</code>, <code className="font-mono font-bold text-slate-900 bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded">+2</code>, <code className="font-mono font-bold text-slate-900 bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded">-1</code>.
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-600">
                Suggerimento: prima trova il numero di protoni (Z), poi ricava il resto con le formule.
              </p>
            </div>

            <div className="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-white border border-slate-200 flex flex-col justify-center space-y-2 text-xs sm:text-sm font-mono shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-700 font-sans font-semibold">Numero atomico Z</span>
                <span className="text-emerald-800 font-bold">Z = numero di protoni</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-700 font-sans font-semibold">Numero di massa A</span>
                <span className="text-sky-800 font-bold">A = protoni + neutroni</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700 font-sans font-semibold">Carica elettrica</span>
                <span className="text-amber-800 font-bold">Carica = protoni − elettroni</span>
              </div>
            </div>
          </div>

          {/* Level Selector & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 overflow-x-auto shadow-xs">
              <button
                onClick={() => loadLevel('livello1')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  levelKey === 'livello1' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Livello 1 · Neutri
              </button>
              <button
                onClick={() => loadLevel('livello2')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  levelKey === 'livello2' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Livello 2 · Ioni
              </button>
              <button
                onClick={() => loadLevel('livello3')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  levelKey === 'livello3' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Livello 3 · Isotopi
              </button>
              <button
                onClick={() => loadLevel('casuale')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  levelKey === 'casuale' ? 'bg-emerald-700 text-white' : 'text-emerald-800 hover:bg-emerald-50'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Nuova Scheda Casuale</span>
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleCopyMarkdown}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 transition-colors whitespace-nowrap shadow-xs"
                title="Copia la tabella in formato Markdown"
              >
                {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                <span>{copiedMd ? 'Tabella copiata' : 'Copia Markdown'}</span>
              </button>

              <button
                onClick={handleResetAnswers}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 transition-colors whitespace-nowrap shadow-xs"
              >
                <Eraser className="w-3.5 h-3.5 text-slate-600" />
                <span>Svuota</span>
              </button>

              <button
                onClick={handleShowSolutions}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors whitespace-nowrap shadow-xs"
              >
                <Eye className="w-3.5 h-3.5 text-amber-700" />
                <span>Soluzioni</span>
              </button>

              <button
                onClick={() => setChecked(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors whitespace-nowrap shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verifica Risposte</span>
              </button>
            </div>
          </div>

          {/* Feedback Banner when checked */}
          {checked && (
            <div
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm ${
                scoreSummary.totalCorrect === scoreSummary.totalBlank
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                  : 'bg-amber-50 border-amber-400 text-slate-900'
              }`}
              role="status"
            >
              <div className="flex items-center gap-2.5 font-semibold">
                {scoreSummary.totalCorrect === scoreSummary.totalBlank ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    <span>Ottimo lavoro! Tutte le {scoreSummary.totalBlank} celle sono corrette.</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-5 h-5 text-amber-700 shrink-0" />
                    <span className="tabular-nums">
                      Risposte esatte: <strong>{scoreSummary.totalCorrect}</strong> su <strong>{scoreSummary.totalBlank}</strong> celle da completare. Controlla le celle contrassegnate con ✗.
                    </span>
                  </>
                )}
              </div>
              <span className="text-xs font-medium text-slate-700">
                Ricorda il segno per la carica (<code className="font-mono font-bold">+1</code>, <code className="font-mono font-bold">-2</code>, <code className="font-mono font-bold">0</code>)
              </span>
            </div>
          )}

          {/* High-Contrast Exercise Table */}
          <div className="rounded-xl border border-slate-300 bg-white overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b-2 border-slate-200 bg-slate-100 text-xs font-bold uppercase tracking-wider text-slate-700">
                    <th className="py-3.5 px-3 text-center w-12">N.</th>
                    <th className="py-3.5 px-2.5 w-24">Simbolo</th>
                    <th className="py-3.5 px-2.5 w-36">Nome</th>
                    <th className="py-3.5 px-2.5 text-center w-24">Protoni</th>
                    <th className="py-3.5 px-2.5 text-center w-24">Elettroni</th>
                    <th className="py-3.5 px-2.5 text-center w-24">Neutroni</th>
                    <th className="py-3.5 px-2.5 text-center w-32">N° di massa A</th>
                    <th className="py-3.5 px-2.5 text-center w-24">Carica</th>
                    <th className="py-3.5 px-3 text-center w-20">Aiuto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  {rows.map((row) => {
                    const isSelected = selectedRow?.id === row.id;
                    const rowOk = checked && isRowCompleteAndCorrect(row);
                    const fields: FieldKey[] = ['symbol', 'name', 'protons', 'electrons', 'neutrons', 'massNumber', 'charge'];

                    return (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedRowId(row.id)}
                        className={`transition-colors cursor-pointer ${
                          isSelected ? 'bg-sky-50/60' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-2.5 px-3 text-center font-mono tabular-nums text-sm font-bold text-slate-700">
                          <div className="flex items-center justify-center gap-1">
                            <span>{row.id}</span>
                            {rowOk && <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-label="Riga corretta" />}
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
                              <td key={field} className="py-2.5 px-2">
                                <div
                                  className={`px-3 py-2.5 rounded-lg bg-sky-100/90 border border-sky-300 text-sky-950 font-bold text-sm sm:text-base ${
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
                            <td key={field} className="py-2.5 px-2">
                              <div className="relative flex items-center">
                                <input
                                  type="text"
                                  inputMode={field === 'protons' || field === 'electrons' || field === 'neutrons' || field === 'massNumber' ? 'numeric' : 'text'}
                                  value={val}
                                  onChange={(e) => handleCellChange(row.id, field, e.target.value)}
                                  placeholder={field === 'charge' ? '0, +1' : field === 'symbol' ? 'Es. C' : field === 'name' ? 'Nome' : '?'}
                                  aria-label={`Riga ${row.id}, ${field}`}
                                  className={`w-full px-3 py-2.5 rounded-lg border text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                                    isNumeric ? 'text-center font-mono tabular-nums' : 'text-left'
                                  } ${
                                    ok
                                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 focus:ring-emerald-500/30 pr-7'
                                      : bad
                                      ? 'bg-rose-50 border-rose-600 text-rose-950 focus:ring-rose-500/30 pr-7'
                                      : 'bg-white border-slate-300 focus:border-sky-600 focus:ring-sky-500/25'
                                  }`}
                                />
                                {ok && (
                                  <CheckCircle2
                                    className="w-4 h-4 text-emerald-700 absolute right-2 pointer-events-none"
                                    aria-label="Corretto"
                                  />
                                )}
                                {bad && (
                                  <XCircle
                                    className="w-4 h-4 text-rose-700 absolute right-2 pointer-events-none"
                                    aria-label="Errato o mancante"
                                  />
                                )}
                              </div>
                            </td>
                          );
                        })}

                        <td className="py-2.5 px-3 text-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setHintRowId((prev) => (prev === row.id ? null : row.id));
                            }}
                            className={`p-2 rounded-lg border transition-colors ${
                              hintRowId === row.id
                                ? 'bg-amber-100 text-amber-900 border-amber-400'
                                : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-800 border-slate-300'
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
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-sm font-medium text-amber-950 flex items-start gap-2.5 shadow-xs">
              <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <span>{getHintText(rows.find((r) => r.id === hintRowId) || rows[0])}</span>
            </div>
          )}

          {/* Selected Row Atomic Visualizer */}
          {selectedRow && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 sm:p-6 rounded-xl bg-white border border-slate-200 items-center shadow-xs">
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="text-xs font-bold uppercase tracking-wide text-slate-600 mb-2">
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
                  <div className="py-8 px-5 text-center space-y-2.5 max-w-xs rounded-2xl bg-slate-50 border border-slate-200">
                    <Atom className="w-12 h-12 text-slate-500 mx-auto" />
                    <div className="text-sm font-bold text-slate-900">
                      Esercizio N. {selectedRow.id} selezionato
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Completa tutte le celle della riga {selectedRow.id} e premi <strong>Verifica Risposte</strong> per visualizzare il modello di Bohr dell'atomo corrispondente.
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-7 space-y-3">
                <h3 className="text-base font-bold text-slate-900">
                  Procedimento passo dopo passo per la riga {selectedRow.id}
                </h3>
                <div className="space-y-2.5 text-sm text-slate-800">
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <strong className="text-emerald-800">1. Individua Z (Protoni):</strong>{' '}
                    Usa il simbolo, il nome o il numero di protoni fornito per identificare l'atomo nella tavola degli elementi.
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <strong className="text-sky-800">2. Calcola A o i Neutroni:</strong>{' '}
                    Applica <code className="font-mono font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">A = protoni + neutroni</code> oppure <code className="font-mono font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">neutroni = A − protoni</code>.
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <strong className="text-amber-800">3. Determina Carica o Elettroni:</strong>{' '}
                    Ricorda <code className="font-mono font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">Carica = protoni − elettroni</code>. Se neutro scrivi <code className="font-mono font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">0</code>; altrimenti scrivi sempre <code className="font-mono font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">+</code> o <code className="font-mono font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">-</code>.
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
          {/* Left / Main Zone: Interactive Bohr Diagram */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center min-h-[420px] shadow-xs">
            <div className="w-full flex items-center justify-between mb-3 text-xs font-semibold text-slate-600">
              <span>Modello a gusci elettronici (Bohr)</span>
              <span className="font-mono tabular-nums text-slate-800">
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
            <div className="w-full grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-200 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-semibold text-slate-600">Numero Atomico Z</div>
                <div className="text-lg font-extrabold font-mono tabular-nums text-rose-700 mt-0.5">
                  {simProtons}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-semibold text-slate-600">Massa A (p⁺ + n⁰)</div>
                <div className="text-lg font-extrabold font-mono tabular-nums text-sky-800 mt-0.5">
                  {simProtons} + {simNeutrons} = {simProtons + simNeutrons}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-semibold text-slate-600">Carica (p⁺ − e⁻)</div>
                <div className="text-lg font-extrabold font-mono tabular-nums text-amber-800 mt-0.5">
                  {simChargeStr}
                </div>
              </div>
            </div>
          </div>

          {/* Right Zone: Particle Controllers */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 space-y-5 shadow-xs">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Controllo Particelle Subatomiche</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Modifica protoni, neutroni ed elettroni per osservare come cambiano elemento, isotopo e carica netta.
              </p>
            </div>

            {/* Protons control */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <label htmlFor="slider-protons" className="text-xs sm:text-sm font-bold text-rose-800">
                  Protoni (p⁺) · Elemento
                </label>
                <span className="font-mono tabular-nums text-base font-extrabold text-slate-900">{simProtons}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSimProtons((p) => Math.max(1, p - 1))}
                  className="p-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 shadow-xs"
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
                  className="flex-1 accent-rose-600"
                />
                <button
                  type="button"
                  onClick={() => setSimProtons((p) => Math.min(20, p + 1))}
                  className="p-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 shadow-xs"
                  aria-label="Aumenta protoni"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Neutrons control */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <label htmlFor="slider-neutrons" className="text-xs sm:text-sm font-bold text-slate-700">
                  Neutroni (n⁰) · Isotopi
                </label>
                <span className="font-mono tabular-nums text-base font-extrabold text-slate-900">{simNeutrons}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSimNeutrons((n) => Math.max(0, n - 1))}
                  className="p-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 shadow-xs"
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
                  className="flex-1 accent-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setSimNeutrons((n) => Math.min(24, n + 1))}
                  className="p-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 shadow-xs"
                  aria-label="Aumenta neutroni"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Electrons control */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <label htmlFor="slider-electrons" className="text-xs sm:text-sm font-bold text-sky-800">
                  Elettroni (e⁻) · Carica
                </label>
                <span className="font-mono tabular-nums text-base font-extrabold text-slate-900">{simElectrons}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSimElectrons((el) => Math.max(0, el - 1))}
                  className="p-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 shadow-xs"
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
                  className="flex-1 accent-sky-700"
                />
                <button
                  type="button"
                  onClick={() => setSimElectrons((el) => Math.min(22, el + 1))}
                  className="p-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 shadow-xs"
                  aria-label="Aumenta elettroni"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-bold text-slate-700">Esempi rapidi notevoli:</div>
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
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 border border-slate-300 transition-colors"
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
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-xs">
              <div className="text-xs font-bold text-emerald-700">Formula 1 · Identità</div>
              <h3 className="text-base font-bold text-slate-900">Numero Atomico (Z)</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Indica il numero di <strong>protoni</strong> nel nucleo. È la carta d'identità dell'elemento chimico.
              </p>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 font-mono text-sm font-bold text-emerald-950 text-center">
                Z = protoni
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-xs">
              <div className="text-xs font-bold text-sky-700">Formula 2 · Nucleo</div>
              <h3 className="text-base font-bold text-slate-900">Numero di Massa (A)</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Somma di tutte le particelle pesanti presenti nel nucleo: <strong>protoni + neutroni</strong>.
              </p>
              <div className="p-3 rounded-lg bg-sky-50 border border-sky-200 font-mono text-sm font-bold text-sky-950 text-center">
                A = p⁺ + n⁰ &nbsp;·&nbsp; n⁰ = A − p⁺
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-xs">
              <div className="text-xs font-bold text-amber-800">Formula 3 · Bilancio Elettrico</div>
              <h3 className="text-base font-bold text-slate-900">Carica Elettrica</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Differenza tra cariche positive e negative. È <code className="font-mono font-bold text-slate-900">0</code> se l'atomo è neutro.
              </p>
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 font-mono text-sm font-bold text-amber-950 text-center">
                Carica = p⁺ − e⁻
              </div>
            </div>
          </div>

          {/* Quick Periodic Table Reference (Z = 1..20) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Tavola Rapida di Riferimento (Primi 20 Elementi)
                </h3>
                <p className="text-sm text-slate-600">
                  Usa questa tabella per trovare il numero atomico Z partendo dal simbolo o dal nome italiano.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
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
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-400 text-left transition-colors group shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600 font-mono tabular-nums">
                    <span>Z = {el.z}</span>
                    <span>A ≈ {el.commonMass}</span>
                  </div>
                  <div className="text-xl font-extrabold text-slate-900 group-hover:text-sky-800 mt-1">
                    {el.symbol}
                  </div>
                  <div className="text-xs font-semibold text-slate-700 truncate">{el.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
