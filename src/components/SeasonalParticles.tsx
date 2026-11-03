import React, { useMemo } from 'react';
import { SeasonId } from '../data/seasonalThemes';

interface SeasonalParticlesProps {
  season: SeasonId;
  enabled: boolean;
}

export const SeasonalParticles: React.FC<SeasonalParticlesProps> = ({ season, enabled }) => {
  if (!enabled || season === 'standard') return null;

  const particles = useMemo(() => {
    let charList = ['✨'];

    if (season === 'halloween') {
      charList = ['🎃', '👻', '🦇', '✨'];
    } else if (season === 'natale') {
      // Tema natalizio: regali, alberi, stelle dorate, fiocchi e campanelle
      charList = ['🎄', '⭐', '🎁', '❄️', '🔔', '✨'];
    } else if (season === 'inverno') {
      // Tema invernale / polare: cristalli di ghiaccio esagonali, cubetti di ghiaccio, brina e neve fredda
      charList = ['❄️', '🧊', '🌨️', '💠', '✨'];
    } else if (season === 'carnevale') {
      charList = ['🎭', '🎉', '🎊', '🎈', '✨'];
    } else if (season === 'primavera') {
      charList = ['🌸', '🌺', '🌱', '🦋', '🌷'];
    } else if (season === 'earthday') {
      // Tema Earth Day: pianeta Terra, germogli, foglie, riciclo, gocce d'acqua e sole pulito
      charList = ['🌍', '🌱', '🌿', '♻️', '💧', '☀️', '✨'];
    } else if (season === 'estate') {
      charList = ['☀️', '🏖️', '🌊', '🌻', '⭐'];
    } else if (season === 'autunno') {
      charList = ['🍂', '🍁', '🌰', '🍄'];
    }

    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      char: charList[i % charList.length],
      left: `${(i * 7.1 + 2) % 96}%`,
      animationDuration: `${7 + (i % 5) * 2}s`,
      animationDelay: `${(i % 7) * 1.1}s`,
      fontSize: `${14 + (i % 4) * 4}px`,
      opacity: 0.25 + (i % 3) * 0.1,
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
