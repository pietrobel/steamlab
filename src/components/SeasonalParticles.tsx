import React, { useMemo } from 'react';
import { SeasonId } from '../data/seasonalThemes';

interface SeasonalParticlesProps {
  season: SeasonId;
  enabled: boolean;
}

export const SeasonalParticles: React.FC<SeasonalParticlesProps> = ({ season, enabled }) => {
  if (!enabled || season === 'standard') return null;

  const particles = useMemo(() => {
    let char = '✨';
    if (season === 'halloween') char = '🎃';
    else if (season === 'natale' || season === 'inverno') char = '❄️';
    else if (season === 'carnevale') char = '🎉';
    else if (season === 'primavera') char = '🌸';
    else if (season === 'estate') char = '☀️';
    else if (season === 'autunno') char = '🍂';

    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      char,
      left: `${(i * 8.3 + 3) % 96}%`,
      animationDuration: `${7 + (i % 5) * 2}s`,
      animationDelay: `${(i % 6) * 1.2}s`,
      fontSize: `${14 + (i % 4) * 4}px`,
      opacity: 0.2 + (i % 3) * 0.1,
    }));
  }, [season]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      <style>{`
        @keyframes floatDown {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: var(--particle-opacity);
          }
          85% {
            opacity: var(--particle-opacity);
          }
          100% {
            transform: translateY(105vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
      {particles.map((p) => (
        <span
          key={p.id}
          style={
            {
              position: 'absolute',
              left: p.left,
              top: '-30px',
              fontSize: p.fontSize,
              '--particle-opacity': p.opacity,
              animation: `floatDown ${p.animationDuration} linear infinite`,
              animationDelay: p.animationDelay,
            } as React.CSSProperties
          }
        >
          {p.char}
        </span>
      ))}
    </div>
  );
};
