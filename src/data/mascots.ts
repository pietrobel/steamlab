import profSauroImg from '../assets/images/prof_sauro_mascot_1792934227759.jpg';
import leoImg from '../assets/images/student_male_mascot_1792934228385.jpg';
import miaImg from '../assets/images/student_female_mascot_1792934231526.jpg';
import heroTeamImg from '../assets/images/scienzalab_hero_team_1792934230733.jpg';
import { Subject } from '../types';

export interface Mascot {
  id: 'sauro' | 'leo' | 'mia';
  name: string;
  role: string;
  species: string;
  tagline: string;
  avatar: string;
  preferredSubject: Subject | 'tutti';
  favApps: string[];
  quotes: {
    text: string;
    context: string;
  }[];
  badgeColor: string;
  accentBorder: string;
  bgGlow: string;
}

export const MASCOTS_DATA: Mascot[] = [
  {
    id: 'sauro',
    name: 'Prof. Sauro',
    role: 'Docente & Scienziato Guida',
    species: 'Dinosauro Paleoscienziato',
    tagline: '«La scienza non è memorizzare formule, ma scoprire come funziona l\'Universo!»',
    avatar: profSauroImg,
    preferredSubject: 'tutti',
    favApps: ['sci-cinematica', 'mat-maestro-problemi', 'sci-phet-leve'],
    quotes: [
      {
        text: 'Niente paura per i problemi complessi: scomponeteli in segmenti semplici, proprio come facciamo con i fossili!',
        context: 'Consiglio di Matematica',
      },
      {
        text: 'Nel laboratorio di fisica provate a spostare il fulcro nelle leve PhET: noterete come la distanza amplifica la forza!',
        context: 'Esperimento di Scienze',
      },
      {
        text: 'Anche i dinosauri usavano la logica: il coding è l\'evoluzione moderna del problem solving!',
        context: 'Pensiero Computazionale',
      },
    ],
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    accentBorder: 'border-emerald-500/40 hover:border-emerald-400',
    bgGlow: 'from-emerald-500/10 to-teal-500/5',
  },
  {
    id: 'leo',
    name: 'Leo',
    role: 'Studente Esploratore (2ª Media)',
    species: 'Volpe Curiosa',
    tagline: '«Amo capire come si muovono le cose, i pianeti e l\'equilibrio delle forze!»',
    avatar: leoImg,
    preferredSubject: 'scienze',
    favApps: ['sci-cinematica', 'sci-phet-leve', 'sci-phet-stati-materia'],
    quotes: [
      {
        text: 'Ho usato il simulatore di cinematica e finalmente ho capito la differenza tra velocità costante e accelerazione!',
        context: 'Diario di Laboratorio',
      },
      {
        text: 'La sfida delle leve mi ha insegnato perché una carriola o una forbice rendono facili compiti pesanti.',
        context: 'Fisica Pratica',
      },
      {
        text: 'Gli stati della materia con le particelle che vibrano ad alta temperatura sono spettacolari!',
        context: 'Chimica & Materia',
      },
    ],
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    accentBorder: 'border-amber-500/40 hover:border-amber-400',
    bgGlow: 'from-amber-500/10 to-orange-500/5',
  },
  {
    id: 'mia',
    name: 'Mia',
    role: 'Studentessa Tech & Problem Solver',
    species: 'Panda Rosso Ingegnere',
    tagline: '«Dai problemi con i segmenti al coding: se puoi immaginarlo, puoi risolverlo!»',
    avatar: miaImg,
    preferredSubject: 'informatica',
    favApps: ['mat-maestro-problemi', 'inf-tinkercad', 'inf-bebras'],
    quotes: [
      {
        text: 'Il Maestro dei Problemi con il modello a barre è fantastico: vedi la somma e la differenza ad occhio nudo!',
        context: 'Trucco per la Matematica',
      },
      {
        text: 'Su Tinkercad ho progettato un circuito con LED e sensore di temperatura senza rischiare di bruciare niente.',
        context: 'Robotica & 3D',
      },
      {
        text: 'Le sfide Bebras sono come enigmi da videogioco: alleni il cervello divertendoti con la logica!',
        context: 'Informatica & Algoritmi',
      },
    ],
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    accentBorder: 'border-rose-500/40 hover:border-rose-400',
    bgGlow: 'from-rose-500/10 to-pink-500/5',
  },
];

export { profSauroImg, leoImg, miaImg, heroTeamImg };
