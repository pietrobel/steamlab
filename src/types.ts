export type Subject = 'matematica' | 'scienze' | 'informatica';

export type GradeLevel = 'Tutte' | 'Classe 1ª' | 'Classe 2ª' | 'Classe 3ª' | 'Laboratorio ScienzaLab';

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  subject: Subject;
  tags: string[];
  gradeLevel: GradeLevel;
  iconName: string;
  isVercel?: boolean;
  isFavorite?: boolean;
  addedAt: string;
  featured?: boolean;
  internalAppId?: 'proprieta-operazioni' | 'cinematica' | 'food-quest' | 'maestro-problemi';
}

export interface SubjectMeta {
  id: Subject;
  name: string;
  shortName: string;
  color: string;
  bgLight: string;
  borderLight: string;
  badgeBg: string;
  badgeText: string;
  gradient: string;
  icon: string;
  description: string;
}
