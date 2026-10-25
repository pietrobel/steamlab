import React, { useState, useEffect, useRef } from 'react';
import { Zap, Play, Pause, RotateCcw, Activity, LineChart, Info, HelpCircle, Home } from 'lucide-react';
import { leoImg, profSauroImg } from '../../data/mascots';

interface CinematicaAppProps {
  onBackToHome?: () => void;
}

export const CinematicaApp: React.FC<CinematicaAppProps> = ({ onBackToHome }) => {
  const [motionType, setMotionType] = useState<'mru' | 'mrua'>('mru');
  const [initialPos, setInitialPos] = useState(0); // metri
  const [initialVel, setInitialVel] = useState(10); // m/s
  const [acceleration, setAcceleration] = useState(2); // m/s²

  // Simulation state
  const [simTime, setSimTime] = useState(0); // secondi
  const [isRunning, setIsRunning] = useState(false);
  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Current calculated values
  const currentPos = motionType === 'mru'
    ? initialPos + initialVel * simTime
    : initialPos + initialVel * simTime + 0.5 * acceleration * simTime * simTime;

  const currentVel = motionType === 'mru'
    ? initialVel
    : initialVel + acceleration * simTime;

  // Max track length in meters for visualization
  const MAX_TRACK_METERS = 100;
  const clampedPos = Math.min(Math.max(currentPos, 0), MAX_TRACK_METERS);
  const progressPercent = (clampedPos / MAX_TRACK_METERS) * 100;

  useEffect(() => {
    if (isRunning) {
      const step = (now: number) => {
        if (lastTimeRef.current !== null) {
          const deltaSec = (now - lastTimeRef.current) / 1000;
          setSimTime((prev) => {
            const next = prev + deltaSec;
            if (next >= 10 || (motionType === 'mru' && initialPos + initialVel * next >= MAX_TRACK_METERS)) {
              setIsRunning(false);
              return next;
            }
            return next;
          });
        }
        lastTimeRef.current = now;
        animRef.current = requestAnimationFrame(step);
      };
      lastTimeRef.current = performance.now();
      animRef.current = requestAnimationFrame(step);
    } else {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      lastTimeRef.current = null;
    }

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isRunning, motionType, initialPos, initialVel, acceleration]);

  const handleReset = () => {
    setIsRunning(false);
    setSimTime(0);
  };

  // Generate Graph Points
  const generateGraphPoints = () => {
    const pointsS: { t: number; s: number }[] = [];
    const pointsV: { t: number; v: number }[] = [];
    for (let t = 0; t <= 10; t += 0.5) {
      const s = motionType === 'mru'
        ? initialPos + initialVel * t
        : initialPos + initialVel * t + 0.5 * acceleration * t * t;
      const v = motionType === 'mru'
        ? initialVel
        : initialVel + acceleration * t;
      pointsS.push({ t, s: Math.max(0, s) });
      pointsV.push({ t, v: Math.max(0, v) });
    }
    return { pointsS, pointsV };
  };

  const { pointsS, pointsV } = generateGraphPoints();
  const maxS = Math.max(...pointsS.map((p) => p.s), 10);
  const maxV = Math.max(...pointsV.map((p) => p.v), 10);

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>Fisica & Scienze • Laboratorio di Cinematica</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-750 text-[11px] text-slate-300">
              <img src={profSauroImg} alt="Prof. Sauro" className="w-4 h-4 rounded-full object-cover" />
              <img src={leoImg} alt="Leo" className="w-4 h-4 rounded-full object-cover" />
              <span>Laboratorio con Prof. Sauro & Leo</span>
            </div>
          </div>
          <h2 className="text-2xl font-black text-white">
            Cinematica: Studio del Moto
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simula il moto dei corpi in tempo reale, esplora la legge oraria e osserva i grafici spazio-tempo e velocità-tempo.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700 hover:border-cyan-500 transition-all shadow-sm"
            >
              <Home className="w-3.5 h-3.5 text-cyan-400" />
              <span>Torna a ScienzaLab</span>
            </button>
          )}

          {/* Motion Type Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700/80">
          <button
            onClick={() => {
              setMotionType('mru');
              handleReset();
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              motionType === 'mru'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            MRU (Velocità Costante)
          </button>
          <button
            onClick={() => {
              setMotionType('mrua');
              handleReset();
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              motionType === 'mrua'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            MRUA (Accelerato)
          </button>
        </div>
      </div>
    </div>

      {/* Track & Vehicle Animation Canvas Area */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Tracciato di Prova (0 - 100 metri)
          </span>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span>Tempo: <strong className="text-cyan-400">{simTime.toFixed(2)} s</strong></span>
            <span>Spazio s(t): <strong className="text-emerald-400">{currentPos.toFixed(1)} m</strong></span>
            <span>Velocità v(t): <strong className="text-amber-400">{currentVel.toFixed(1)} m/s</strong> ({(currentVel * 3.6).toFixed(1)} km/h)</span>
          </div>
        </div>

        {/* Visual Graded Track */}
        <div className="relative h-28 bg-slate-950/80 rounded-xl border border-slate-800 overflow-hidden flex flex-col justify-end p-4">
          {/* Finish Line */}
          <div className="absolute right-6 top-0 bottom-6 w-1 border-r-2 border-dashed border-red-500/60 flex items-center justify-center">
            <span className="text-[10px] text-red-400 -rotate-90 origin-center whitespace-nowrap">Traguardo 100m</span>
          </div>

          {/* Cart Vehicle Animated */}
          <div
            className="absolute bottom-6 transition-all duration-75 flex flex-col items-center pointer-events-none"
            style={{ left: `calc(${progressPercent}% * 0.88 + 12px)` }}
          >
            <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 font-bold mb-1 shadow">
              {currentPos.toFixed(1)}m
            </div>
            {/* SVG Cart */}
            <div className="w-12 h-7 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg shadow-lg shadow-emerald-500/20 flex items-center justify-center text-slate-950 font-bold text-[10px] relative">
              🚗
              <div className="absolute -bottom-1.5 left-2 w-3 h-3 rounded-full bg-slate-900 border-2 border-slate-400 animate-spin" />
              <div className="absolute -bottom-1.5 right-2 w-3 h-3 rounded-full bg-slate-900 border-2 border-slate-400 animate-spin" />
            </div>
          </div>

          {/* Track Road */}
          <div className="w-full h-3 bg-slate-800 rounded-full border-t border-slate-700 relative">
            {/* Meter marks */}
            {[0, 20, 40, 60, 80, 100].map((m) => (
              <div
                key={m}
                className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
                style={{ left: `${m}%` }}
              >
                <div className="w-0.5 h-2 bg-slate-600" />
                <span className="text-[9px] text-slate-500 mt-0.5">{m}m</span>
              </div>
            ))}
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Metti in Pausa' : 'Avvia Simulazione'}</span>
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Azzera</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 hidden sm:block">
            Legge oraria:{' '}
            <strong className="text-white font-mono">
              {motionType === 'mru' ? 's = s₀ + v·t' : 's = s₀ + v₀·t + ½·a·t²'}
            </strong>
          </div>
        </div>
      </div>

      {/* Parameters & Graphs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parametri Sliders */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Parametri Iniziali
          </h3>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Posizione iniziale (s₀)</span>
              <span className="font-bold text-white font-mono">{initialPos} m</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={initialPos}
              disabled={isRunning}
              onChange={(e) => {
                setInitialPos(Number(e.target.value));
                setSimTime(0);
              }}
              className="w-full accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Velocità iniziale (v₀)</span>
              <span className="font-bold text-cyan-300 font-mono">{initialVel} m/s</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={initialVel}
              disabled={isRunning}
              onChange={(e) => {
                setInitialVel(Number(e.target.value));
                setSimTime(0);
              }}
              className="w-full accent-emerald-500"
            />
          </div>

          {motionType === 'mrua' && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Accelerazione (a)</span>
                <span className="font-bold text-amber-300 font-mono">{acceleration} m/s²</span>
              </div>
              <input
                type="range"
                min="-5"
                max="10"
                value={acceleration}
                disabled={isRunning}
                onChange={(e) => {
                  setAcceleration(Number(e.target.value));
                  setSimTime(0);
                }}
                className="w-full accent-emerald-500"
              />
            </div>
          )}

          {/* Physics Formulas card */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs space-y-2 mt-4">
            <span className="font-bold text-white block">Formule Chiave:</span>
            <div className="font-mono text-[11px] text-emerald-300 space-y-1">
              <p>v = Δs / Δt (Velocità media)</p>
              <p>a = Δv / Δt (Accelerazione)</p>
              <p>1 m/s = 3.6 km/h</p>
            </div>
          </div>
        </div>

        {/* Real-time SVG Graphs */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <LineChart className="w-4 h-4 text-emerald-400" />
              <span>Grafici del Moto (0 - 10s)</span>
            </h3>
            <span className="text-xs text-slate-400">Tracciamento teorico</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Graph s(t) */}
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              <div className="flex justify-between text-[11px] text-slate-400 mb-2">
                <span className="font-bold text-emerald-300">Spazio-Tempo: s(t)</span>
                <span>Max: {maxS.toFixed(0)}m</span>
              </div>
              <svg className="w-full h-32 overflow-visible" viewBox="0 0 200 100">
                <line x1="20" y1="10" x2="20" y2="90" stroke="#334155" strokeWidth="1" />
                <line x1="20" y1="90" x2="190" y2="90" stroke="#334155" strokeWidth="1" />
                {/* Curve */}
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  points={pointsS
                    .map((p) => {
                      const x = 20 + (p.t / 10) * 170;
                      const y = 90 - (p.s / Math.max(maxS, 1)) * 80;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
                {/* Current Time Dot */}
                <circle
                  cx={20 + (Math.min(simTime, 10) / 10) * 170}
                  cy={90 - (Math.min(currentPos, maxS) / Math.max(maxS, 1)) * 80}
                  r="4"
                  fill="#38bdf8"
                />
              </svg>
              <div className="flex justify-between text-[9px] text-slate-500 mt-1">
                <span>0s</span>
                <span>5s</span>
                <span>10s</span>
              </div>
            </div>

            {/* Graph v(t) */}
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              <div className="flex justify-between text-[11px] text-slate-400 mb-2">
                <span className="font-bold text-amber-300">Velocità-Tempo: v(t)</span>
                <span>Max: {maxV.toFixed(0)}m/s</span>
              </div>
              <svg className="w-full h-32 overflow-visible" viewBox="0 0 200 100">
                <line x1="20" y1="10" x2="20" y2="90" stroke="#334155" strokeWidth="1" />
                <line x1="20" y1="90" x2="190" y2="90" stroke="#334155" strokeWidth="1" />
                {/* Curve */}
                <polyline
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  points={pointsV
                    .map((p) => {
                      const x = 20 + (p.t / 10) * 170;
                      const y = 90 - (p.v / Math.max(maxV, 1)) * 80;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
                {/* Current Time Dot */}
                <circle
                  cx={20 + (Math.min(simTime, 10) / 10) * 170}
                  cy={90 - (Math.min(currentVel, maxV) / Math.max(maxV, 1)) * 80}
                  r="4"
                  fill="#38bdf8"
                />
              </svg>
              <div className="flex justify-between text-[9px] text-slate-500 mt-1">
                <span>0s</span>
                <span>5s</span>
                <span>10s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
