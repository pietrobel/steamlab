import React from 'react';
import {
  Compass,
  Triangle,
  PieChart,
  Scale,
  BarChart3,
  Grid,
  Dices,
  Box,
  Atom,
  Orbit,
  HeartPulse,
  Microscope,
  Zap,
  Dna,
  CloudRain,
  Flame,
  Puzzle,
  GitFork,
  Binary,
  Cpu,
  Layout,
  ShieldCheck,
  Terminal,
  Bot,
  Calculator,
  Code2,
  Globe,
  Sparkles,
  BookOpen,
  BrainCircuit,
  HelpCircle,
  LucideProps,
} from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  Compass,
  Triangle,
  PieChart,
  Scale,
  BarChart3,
  Grid,
  Dices,
  Box,
  Atom,
  Orbit,
  HeartPulse,
  Microscope,
  Zap,
  Dna,
  CloudRain,
  Flame,
  Puzzle,
  GitFork,
  Binary,
  Cpu,
  Layout,
  ShieldCheck,
  Terminal,
  Bot,
  Calculator,
  Code2,
  Globe,
  Sparkles,
  BookOpen,
  BrainCircuit,
};

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  const IconComponent = ICON_MAP[name] || HelpCircle;
  return <IconComponent {...props} />;
};
