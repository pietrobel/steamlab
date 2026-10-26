// Banco Dati Completo "Il Maestro dei Problemi"
// Conforme alle Indicazioni Nazionali MIUR per il Curricolo
// 5 Classi: 4ª Primaria, 5ª Primaria, 1ª Media, 2ª Media, 3ª Media
// 200 Problemi rigorosi per classe = 1.000 Problemi totali

export type GradeId = '4_primaria' | '5_primaria' | '1_media' | '2_media' | '3_media';

export interface GradeInfo {
  id: GradeId;
  label: string;
  subLabel: string;
  schoolStage: 'Scuola Primaria' | 'Scuola Secondaria I Grado';
  ageRange: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  topics: string[];
}

export interface BarModelInfo {
  type: 'somma_diff' | 'parti_uguali' | 'frazione' | 'compravendita' | 'geometria' | 'proporzione' | 'pitagora' | 'solido' | 'cinematica' | 'equazione';
  labels: string[];
  unitValues?: number[];
  unitText?: string;
  totalLabel?: string;
  diffLabel?: string;
  note?: string;
}

export interface ProblemItem {
  id: string;
  gradeId: GradeId;
  gradeLabel: string;
  topic: string;
  difficulty: 'Base' | 'Intermedio' | 'Avanzato';
  title: string;
  text: string;
  question: string;
  correctAnswer: number;
  unit: string;
  hint1: string;
  hint2: string;
  solutionSteps: string[];
  barModel: BarModelInfo;
}

export const GRADES_CONFIG: Record<GradeId, GradeInfo> = {
  '4_primaria': {
    id: '4_primaria',
    label: '4ª Primaria',
    subLabel: 'Quarta Scuola Primaria',
    schoolStage: 'Scuola Primaria',
    ageRange: '9 - 10 anni',
    color: 'text-amber-400',
    badgeBg: 'bg-amber-500/15 text-amber-300',
    badgeBorder: 'border-amber-500/30',
    topics: [
      'Le 4 Operazioni e Resto',
      'Euro e Compravendita',
      'Perimetri di Rettangoli e Quadrati',
      'Frazioni Semplici',
      'Misure e Conversioni',
      'Problemi a Più Passaggi',
    ],
  },
  '5_primaria': {
    id: '5_primaria',
    label: '5ª Primaria',
    subLabel: 'Quinta Scuola Primaria',
    schoolStage: 'Scuola Primaria',
    ageRange: '10 - 11 anni',
    color: 'text-orange-400',
    badgeBg: 'bg-orange-500/15 text-orange-300',
    badgeBorder: 'border-orange-500/30',
    topics: [
      'Frazioni e Frazione Complementare',
      'Problema Inverso con Frazioni',
      'Percentuali di Base e Sconti',
      'Peso Netto, Lordo e Tara',
      'Aree dei Poligoni (Rettangolo, Triangolo, Rombo, Trapezio)',
      'Perimetro della Circonferenza',
    ],
  },
  '1_media': {
    id: '1_media',
    label: '1ª Media',
    subLabel: 'Prima Secondaria di I Grado',
    schoolStage: 'Scuola Secondaria I Grado',
    ageRange: '11 - 12 anni',
    color: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/15 text-emerald-300',
    badgeBorder: 'border-emerald-500/30',
    topics: [
      'Metodo Segmenti: Somma e Differenza',
      'Metodo Segmenti: Somma e Multiplo',
      'Metodo Segmenti: Differenza e Multiplo',
      'MCD e mcm in Problemi Pratici',
      'Frazioni come Operatori e Frazione di Frazione',
      'Geometria degli Angoli e Triangoli',
      'Perimetri con Lati Frazionari',
    ],
  },
  '2_media': {
    id: '2_media',
    label: '2ª Media',
    subLabel: 'Seconda Secondaria di I Grado',
    schoolStage: 'Scuola Secondaria I Grado',
    ageRange: '12 - 13 anni',
    color: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/15 text-cyan-300',
    badgeBorder: 'border-cyan-500/30',
    topics: [
      'Rapporti e Proporzioni',
      'Proprietà del Comporre e Scomporre',
      'Proporzionalità Diretta e Inversa (Tre Semplice)',
      'Percentuali Avanzate e Variazioni',
      'Teorema di Pitagora nel Triangolo Rettangolo',
      'Pitagora applicato a Rettangolo, Rombo e Trapezio',
      'Area del Cerchio e Raggio',
    ],
  },
  '3_media': {
    id: '3_media',
    label: '3ª Media',
    subLabel: 'Terza Secondaria di I Grado',
    schoolStage: 'Scuola Secondaria I Grado',
    ageRange: '13 - 14 anni',
    color: 'text-indigo-400',
    badgeBg: 'bg-indigo-500/15 text-indigo-300',
    badgeBorder: 'border-indigo-500/30',
    topics: [
      'Equazioni di 1° Grado e Problemi Numerici',
      'Equazioni applicate alla Geometria',
      'Cinematica: Moto Rettilineo Uniforme (s = v · t)',
      'Cinematica: Velocità Media e Incontro',
      'Geometria Solida: Prismi e Parallelepipedi',
      'Geometria Solida: Piramide e Apotema',
      'Geometria Solida: Cilindro e Solidi di Rotazione',
      'Peso Specifico, Massa e Volume',
      'Statistica e Probabilità di Base',
    ],
  },
};

// --- Helper deterministic generator to create 200 rich problems per class ---

const NAMES = [
  'Marco', 'Sofia', 'Luca', 'Giulia', 'Matteo', 'Elena', 'Davide', 'Chiara',
  'Alessio', 'Beatrice', 'Leonardo', 'Francesca', 'Gabriele', 'Sara', 'Tommaso',
  'Alice', 'Lorenzo', 'Emma', 'Federico', 'Noemi', 'Riccardo', 'Martina',
  'Christian', 'Vittoria', 'Samuele', 'Giorgia', 'Diego', 'Camilla', 'Pietro', 'Greta',
];

const ITEMS_4 = [
  { item: 'figurine dei calciatori', box: 'bustine', single: 'figurina' },
  { item: 'biscotti al cioccolato', box: 'pacchi', single: 'biscotto' },
  { item: 'matite colorate', box: 'astucci', single: 'matita' },
  { item: 'biglie di vetro', box: 'sacchetti', single: 'biglia' },
  { item: 'caramelle alla frutta', box: 'scatole', single: 'caramella' },
  { item: 'pagine del libro di fiabe', box: 'capitoli', single: 'pagina' },
];

// GENERATOR: 4ª PRIMARIA (200 Problemi)
function generateGrade4Problems(): ProblemItem[] {
  const problems: ProblemItem[] = [];
  let idCount = 1;

  // 1. Divisione con Resto e Confezionamento (35 problemi)
  for (let i = 0; i < 35; i++) {
    const name = NAMES[i % NAMES.length];
    const itemData = ITEMS_4[i % ITEMS_4.length];
    const boxCap = 6 + (i % 7); // 6 to 12 per confezione
    const numBoxes = 8 + i * 2; // 8 to 76
    const remainder = 1 + (i % (boxCap - 1));
    const total = numBoxes * boxCap + remainder;

    const askRemainder = i % 2 === 0;
    const title = askRemainder
      ? `${name} e le confezioni di ${itemData.item}`
      : `Il laboratorio di ${name}: distribuzione in ${itemData.box}`;

    problems.push({
      id: `p4-${String(idCount++).padStart(3, '0')}`,
      gradeId: '4_primaria',
      gradeLabel: '4ª Primaria',
      topic: 'Le 4 Operazioni e Resto',
      difficulty: i < 12 ? 'Base' : i < 26 ? 'Intermedio' : 'Avanzato',
      title,
      text: `${name} ha raccolto in tutto ${total} ${itemData.item}. Vuole sistemarli in ${itemData.box} inserendo esattamente ${boxCap} unità in ciascuna.`,
      question: askRemainder
        ? `Quante unità di ${itemData.single} rimangono fuori dalle confezioni complete (resto)?`
        : `Quante ${itemData.box} complete riesce a riempire ${name}?`,
      correctAnswer: askRemainder ? remainder : numBoxes,
      unit: askRemainder ? itemData.single : itemData.box,
      hint1: `Esegui la divisione con resto: ${total} : ${boxCap}.`,
      hint2: `Il quoziente indica le scatole piene intere, il resto indica ciò che avanza.`,
      solutionSteps: [
        `Totale da dividere = ${total} ${itemData.item}`,
        `Capienza per confezione = ${boxCap}`,
        `Divisione: ${total} : ${boxCap} = ${numBoxes} con resto ${remainder}`,
        askRemainder
          ? `Risposta: Rimangono fuori ${remainder} unità.`
          : `Risposta: Si riempiono ${numBoxes} ${itemData.box} piene.`,
      ],
      barModel: {
        type: 'parti_uguali',
        labels: [`${numBoxes} confezioni da ${boxCap}`, `Resto non confezionato`],
        unitValues: [numBoxes * boxCap, remainder],
        unitText: itemData.single,
        totalLabel: `Totale = ${total}`,
      },
    });
  }

  // 2. Euro e Compravendita: Spesa, Ricavo, Guadagno (35 problemi)
  for (let i = 0; i < 35; i++) {
    const name = NAMES[(i + 5) % NAMES.length];
    const cost = 15 + i * 3; // spesa
    const profit = 5 + (i % 8) * 2; // guadagno
    const revenue = cost + profit; // ricavo

    const askProfit = i % 3 === 0;
    const askRevenue = i % 3 === 1;

    problems.push({
      id: `p4-${String(idCount++).padStart(3, '0')}`,
      gradeId: '4_primaria',
      gradeLabel: '4ª Primaria',
      topic: 'Euro e Compravendita',
      difficulty: i < 12 ? 'Base' : i < 25 ? 'Intermedio' : 'Avanzato',
      title: `Il mercatino scolastico di ${name}`,
      text: `${name} prepara e vende oggetti artigianali per la fiera di beneficenza. Per realizzare i suoi prodotti ha sostenuto una spesa iniziale di ${cost} €. ` +
        (askRevenue
          ? `Dalla vendita ottiene un guadagno netto di ${profit} €.`
          : askProfit
          ? `Al termine della giornata ha incassato un ricavo complessivo di ${revenue} €.`
          : `Ha incassato ${revenue} € e ottenuto un guadagno di ${profit} €.`),
      question: askRevenue
        ? `Qual è stato il ricavo totale ottenuto dalla vendita (in euro)?`
        : askProfit
        ? `A quanto ammonta il guadagno netto di ${name} (in euro)?`
        : `A quanto ammontava la spesa iniziale sostenuta da ${name} (in euro)?`,
      correctAnswer: askRevenue ? revenue : askProfit ? profit : cost,
      unit: '€',
      hint1: `Ricorda la formula economica di base: Ricavo = Spesa + Guadagno.`,
      hint2: askRevenue
        ? `Somma la spesa sostenuta e il guadagno voluto.`
        : askProfit
        ? `Sottrai la spesa dal ricavo complessivo: Ricavo - Spesa.`
        : `Sottrai il guadagno dal ricavo: Ricavo - Guadagno.`,
      solutionSteps: [
        askRevenue
          ? `Ricavo = Spesa + Guadagno = ${cost} € + ${profit} € = ${revenue} €`
          : askProfit
          ? `Guadagno = Ricavo - Spesa = ${revenue} € - ${cost} € = ${profit} €`
          : `Spesa = Ricavo - Guadagno = ${revenue} € - ${profit} € = ${cost} €`,
      ],
      barModel: {
        type: 'compravendita',
        labels: [`Spesa: ${cost} €`, `Guadagno: ${profit} €`],
        unitValues: [cost, profit],
        unitText: '€',
        totalLabel: `Ricavo Totale = ${revenue} €`,
      },
    });
  }

  // 3. Perimetro del Rettangolo e Quadrato (35 problemi)
  for (let i = 0; i < 35; i++) {
    const isSquare = i % 2 === 0;
    if (isSquare) {
      const side = 8 + i;
      const perimeter = side * 4;
      const askSide = i % 4 === 0;

      problems.push({
        id: `p4-${String(idCount++).padStart(3, '0')}`,
        gradeId: '4_primaria',
        gradeLabel: '4ª Primaria',
        topic: 'Perimetri di Rettangoli e Quadrati',
        difficulty: i < 15 ? 'Base' : 'Intermedio',
        title: `La recinzione quadrata del giardino`,
        text: askSide
          ? `Un'aiuola quadrata nel cortile della scuola è circondata da una staccionata lunga complessivamente ${perimeter} metri.`
          : `Un cortile quadrato ha ciascun lato che misura ${side} metri.`,
        question: askSide
          ? `Quanto misura la lunghezza di ciascun lato del quadrato (in metri)?`
          : `Qual è il perimetro complessivo del cortile quadrato (in metri)?`,
        correctAnswer: askSide ? side : perimeter,
        unit: 'metri',
        hint1: `Un quadrato ha 4 lati perfettamente uguali.`,
        hint2: askSide ? `Dividi il perimetro per 4: P : 4.` : `Moltiplica la misura del lato per 4: Lato × 4.`,
        solutionSteps: [
          askSide
            ? `Formula inversa: Lato = Perimetro : 4 = ${perimeter} : 4 = ${side} metri`
            : `Formula diretta: Perimetro = Lato × 4 = ${side} × 4 = ${perimeter} metri`,
        ],
        barModel: {
          type: 'geometria',
          labels: ['Lato 1', 'Lato 2', 'Lato 3', 'Lato 4'],
          unitValues: [side, side, side, side],
          unitText: 'm',
          totalLabel: `Perimetro = ${perimeter} m`,
        },
      });
    } else {
      const base = 12 + i;
      const height = 7 + (i % 9);
      const perimeter = (base + height) * 2;
      const semiPerimeter = base + height;

      problems.push({
        id: `p4-${String(idCount++).padStart(3, '0')}`,
        gradeId: '4_primaria',
        gradeLabel: '4ª Primaria',
        topic: 'Perimetri di Rettangoli e Quadrati',
        difficulty: i < 15 ? 'Base' : 'Intermedio',
        title: `Il campo da gioco rettangolare`,
        text: `Un campo rettangolare ha la base di ${base} metri e l'altezza di ${height} metri. Si vuole recintarlo con una rete metallica.`,
        question: `Quanti metri di rete occorrono per l'intero perimetro del campo?`,
        correctAnswer: perimeter,
        unit: 'metri',
        hint1: `Il perimetro del rettangolo è formato da due basi e due altezze: (Base + Altezza) × 2.`,
        hint2: `Calcola prima il semiperimetro (${base} + ${height} = ${semiPerimeter}) e poi raddoppialo.`,
        solutionSteps: [
          `Base = ${base} m, Altezza = ${height} m`,
          `Semiperimetro = ${base} + ${height} = ${semiPerimeter} m`,
          `Perimetro = ${semiPerimeter} × 2 = ${perimeter} metri`,
        ],
        barModel: {
          type: 'geometria',
          labels: [`Base (${base} m)`, `Altezza (${height} m)`, `Base (${base} m)`, `Altezza (${height} m)`],
          unitValues: [base, height, base, height],
          unitText: 'm',
          totalLabel: `Perimetro = ${perimeter} m`,
        },
      });
    }
  }

  // 4. Frazioni Semplici di una Quantità (35 problemi)
  for (let i = 0; i < 35; i++) {
    const name = NAMES[(i + 8) % NAMES.length];
    const den = [2, 3, 4, 5, 6, 8, 10][i % 7];
    const num = 1 + (i % (den - 1 || 1));
    const unitPart = 4 + i * 2;
    const total = unitPart * den;
    const result = unitPart * num;

    problems.push({
      id: `p4-${String(idCount++).padStart(3, '0')}`,
      gradeId: '4_primaria',
      gradeLabel: '4ª Primaria',
      topic: 'Frazioni Semplici',
      difficulty: i < 15 ? 'Base' : 'Intermedio',
      title: `${name} e la suddivisione delle figurine`,
      text: `${name} possiede una collezione di ${total} figurine adesive. Decide di regalarne i ${num}/${den} ai suoi compagni di classe.`,
      question: `Quante figurine regala in tutto ${name}?`,
      correctAnswer: result,
      unit: 'figurine',
      hint1: `Dividi il totale (${total}) per il denominatore (${den}) per trovare il valore di 1 parte.`,
      hint2: `Moltiplica il valore di una parte per il numeratore (${num}).`,
      solutionSteps: [
        `Totale collezione = ${total} figurine`,
        `Frazione da calcolare = ${num}/${den}`,
        `1 unità frazionaria (1/${den}) = ${total} : ${den} = ${unitPart} figurine`,
        `Valore di ${num}/${den} = ${unitPart} × ${num} = ${result} figurine`,
      ],
      barModel: {
        type: 'frazione',
        labels: [`Parti considerate (${num}/${den})`, `Parti rimanenti (${den - num}/${den})`],
        unitValues: [result, total - result],
        unitText: 'figurine',
        totalLabel: `Totale (${den}/${den}) = ${total}`,
      },
    });
  }

  // 5. Misure e Conversioni (30 problemi)
  for (let i = 0; i < 30; i++) {
    const km = 2 + (i % 8);
    const m = 350 + i * 50;
    const totalMeters = km * 1000 + m;

    problems.push({
      id: `p4-${String(idCount++).padStart(3, '0')}`,
      gradeId: '4_primaria',
      gradeLabel: '4ª Primaria',
      topic: 'Misure e Conversioni',
      difficulty: 'Base',
      title: `La corsa campestre degli studenti`,
      text: `Durante una gara podistica scolastica, gli atleti percorrono un primo tratto di ${km} chilometri e un secondo tratto di ${m} metri.`,
      question: `Quanti metri percorrono in totale gli atleti?`,
      correctAnswer: totalMeters,
      unit: 'metri',
      hint1: `Ricorda che 1 chilometro equivale a 1.000 metri.`,
      hint2: `Converti prima ${km} km in metri moltiplicando per 1.000, poi aggiungi ${m} m.`,
      solutionSteps: [
        `${km} km = ${km} × 1.000 = ${km * 1000} m`,
        `Distanza totale = ${km * 1000} m + ${m} m = ${totalMeters} metri`,
      ],
      barModel: {
        type: 'parti_uguali',
        labels: [`Primo tratto (${km} km = ${km * 1000} m)`, `Secondo tratto (${m} m)`],
        unitValues: [km * 1000, m],
        unitText: 'm',
        totalLabel: `Totale = ${totalMeters} m`,
      },
    });
  }

  // 6. Problemi a Più Passaggi con Spesa e Resto (30 problemi per arrivare a 200)
  for (let i = 0; i < 30; i++) {
    const name = NAMES[(i + 12) % NAMES.length];
    const qty1 = 3 + (i % 4);
    const price1 = 2 + (i % 3);
    const qty2 = 2 + (i % 3);
    const price2 = 4 + (i % 4);
    const totalCost = qty1 * price1 + qty2 * price2;
    const banknote = totalCost <= 20 ? 20 : totalCost <= 50 ? 50 : 100;
    const change = banknote - totalCost;

    problems.push({
      id: `p4-${String(idCount++).padStart(3, '0')}`,
      gradeId: '4_primaria',
      gradeLabel: '4ª Primaria',
      topic: 'Problemi a Più Passaggi',
      difficulty: 'Intermedio',
      title: `${name} in cartoleria per l'inizio dell'anno`,
      text: `${name} acquista ${qty1} quaderni a ${price1} € ciascuno e ${qty2} confezioni di pennarelli a ${price2} € ciascuna. Paga alla cassa con una banconota da ${banknote} €.`,
      question: `Quanto riceve di resto ${name} (in euro)?`,
      correctAnswer: change,
      unit: '€',
      hint1: `Calcola prima la spesa dei quaderni (${qty1} × ${price1}) e quella dei pennarelli (${qty2} × ${price2}).`,
      hint2: `Somma le due spese e sottrai l'importo totale dalla banconota da ${banknote} €.`,
      solutionSteps: [
        `Spesa quaderni = ${qty1} × ${price1} € = ${qty1 * price1} €`,
        `Spesa pennarelli = ${qty2} × ${price2} € = ${qty2 * price2} €`,
        `Spesa totale = ${qty1 * price1} + ${qty2 * price2} = ${totalCost} €`,
        `Resto = ${banknote} € - ${totalCost} € = ${change} €`,
      ],
      barModel: {
        type: 'compravendita',
        labels: [`Quaderni (${qty1 * price1} €)`, `Pennarelli (${qty2 * price2} €)`, `Resto (${change} €)`],
        unitValues: [qty1 * price1, qty2 * price2, change],
        unitText: '€',
        totalLabel: `Banconota versata = ${banknote} €`,
      },
    });
  }

  return problems;
}

// GENERATOR: 5ª PRIMARIA (200 Problemi)
function generateGrade5Problems(): ProblemItem[] {
  const problems: ProblemItem[] = [];
  let idCount = 1;

  // 1. Frazione di un Numero e Frazione Complementare (35 problemi)
  for (let i = 0; i < 35; i++) {
    const name = NAMES[i % NAMES.length];
    const den = [5, 6, 7, 8, 9, 10][i % 6];
    const spentNum = 1 + (i % (den - 2 || 1));
    const remNum = den - spentNum;
    const unitVal = 6 + i * 3;
    const total = unitVal * den;
    const remValue = unitVal * remNum;

    problems.push({
      id: `p5-${String(idCount++).padStart(3, '0')}`,
      gradeId: '5_primaria',
      gradeLabel: '5ª Primaria',
      topic: 'Frazioni e Frazione Complementare',
      difficulty: i < 15 ? 'Base' : 'Intermedio',
      title: `I risparmi del salvadanaio di ${name}`,
      text: `${name} possedeva ${total} € nel proprio salvadanaio. Ne spende i ${spentNum}/${den} per comprare un libro scientifico illustrato.`,
      question: `Quanti euro rimangono nel salvadanaio di ${name}?`,
      correctAnswer: remValue,
      unit: '€',
      hint1: `La frazione complementare rimanente è ${den}/${den} - ${spentNum}/${den} = ${remNum}/${den}.`,
      hint2: `Calcola 1 parte (${total} : ${den}) e moltiplicala per ${remNum}.`,
      solutionSteps: [
        `Frazione spesa = ${spentNum}/${den}`,
        `Frazione rimanente = ${den}/${den} - ${spentNum}/${den} = ${remNum}/${den}`,
        `Valore di 1 unità frazionaria = ${total} : ${den} = ${unitVal} €`,
        `Denaro rimasto = ${unitVal} × ${remNum} = ${remValue} €`,
      ],
      barModel: {
        type: 'frazione',
        labels: [`Speso (${spentNum}/${den} = ${unitVal * spentNum} €)`, `Rimasto (${remNum}/${den} = ${remValue} €)`],
        unitValues: [unitVal * spentNum, remValue],
        unitText: '€',
        totalLabel: `Totale iniziale = ${total} €`,
      },
    });
  }

  // 2. Problema Inverso con le Frazioni (35 problemi)
  for (let i = 0; i < 35; i++) {
    const name = NAMES[(i + 4) % NAMES.length];
    const den = [4, 5, 6, 7, 8][i % 5];
    const num = 2 + (i % (den - 2 || 1));
    const unitVal = 10 + i * 2;
    const partialVal = unitVal * num;
    const totalVal = unitVal * den;

    problems.push({
      id: `p5-${String(idCount++).padStart(3, '0')}`,
      gradeId: '5_primaria',
      gradeLabel: '5ª Primaria',
      topic: 'Problema Inverso con Frazioni',
      difficulty: i < 15 ? 'Intermedio' : 'Avanzato',
      title: `La lettura del libro di scienze di ${name}`,
      text: `${name} ha letto ${partialVal} pagine di un appassionante libro di astronomia, che corrispondono esattamente ai ${num}/${den} dell'intero volume.`,
      question: `Di quante pagine è composto l'intero libro?`,
      correctAnswer: totalVal,
      unit: 'pagine',
      hint1: `Le ${partialVal} pagine lette corrispondono a ${num} parti uguali su ${den}.`,
      hint2: `Trova quanto vale 1 parte dividendo per ${num} (${partialVal} : ${num}), poi moltiplica per ${den}.`,
      solutionSteps: [
        `${num} parti su ${den} equivalgono a ${partialVal} pagine`,
        `1 unità frazionaria (1/${den}) = ${partialVal} : ${num} = ${unitVal} pagine`,
        `Totale pagine del libro (${den}/${den}) = ${unitVal} × ${den} = ${totalVal} pagine`,
      ],
      barModel: {
        type: 'frazione',
        labels: [`Lette: ${num}/${den} (${partialVal} pag)`, `Da leggere: ${den - num}/${den} (${unitVal * (den - num)} pag)`],
        unitValues: [partialVal, unitVal * (den - num)],
        unitText: 'pag',
        totalLabel: `Intero libro = ${totalVal} pag`,
      },
    });
  }

  // 3. Percentuali di Base e Sconti Commerciali (35 problemi)
  for (let i = 0; i < 35; i++) {
    const percentages = [10, 20, 25, 30, 40, 50];
    const pct = percentages[i % percentages.length];
    const origPrice = 40 + i * 10;
    const discount = (origPrice * pct) / 100;
    const finalPrice = origPrice - discount;

    const askFinal = i % 2 === 0;

    problems.push({
      id: `p5-${String(idCount++).padStart(3, '0')}`,
      gradeId: '5_primaria',
      gradeLabel: '5ª Primaria',
      topic: 'Percentuali di Base e Sconti',
      difficulty: i < 15 ? 'Base' : 'Intermedio',
      title: `Saldi di stagione nel negozio sportivo`,
      text: `Una giacca a vento per escursioni in montagna costa originariamente ${origPrice} €. Durante i saldi invernali viene applicato uno sconto speciale del ${pct}%.`,
      question: askFinal
        ? `Qual è il prezzo finale scontato della giacca (in euro)?`
        : `A quanti euro ammonta il risparmio dello sconto applicato?`,
      correctAnswer: askFinal ? finalPrice : discount,
      unit: '€',
      hint1: `Calcola il valore dello sconto: (${origPrice} × ${pct}) : 100.`,
      hint2: askFinal ? `Sottrai lo sconto trovato dal prezzo di partenza: ${origPrice} - Sconto.` : `Lo sconto è la percentuale calcolata sul prezzo.`,
      solutionSteps: [
        `Prezzo di listino = ${origPrice} €`,
        `Sconto del ${pct}% = (${origPrice} × ${pct}) : 100 = ${discount} €`,
        askFinal
          ? `Prezzo finale scontato = ${origPrice} € - ${discount} € = ${finalPrice} €`
          : `Risparmio = ${discount} €`,
      ],
      barModel: {
        type: 'compravendita',
        labels: [`Prezzo scontato: ${finalPrice} €`, `Sconto ${pct}%: ${discount} €`],
        unitValues: [finalPrice, discount],
        unitText: '€',
        totalLabel: `Prezzo di listino = ${origPrice} €`,
      },
    });
  }

  // 4. Peso Netto, Peso Lordo e Tara (35 problemi)
  for (let i = 0; i < 35; i++) {
    const tare = 2 + (i % 4) * 0.5; // 2, 2.5, 3, 3.5 kg
    const netWeight = 15 + i * 2; // 15, 17, 19...
    const grossWeight = netWeight + tare;

    const askNet = i % 2 === 0;

    problems.push({
      id: `p5-${String(idCount++).padStart(3, '0')}`,
      gradeId: '5_primaria',
      gradeLabel: '5ª Primaria',
      topic: 'Peso Netto, Lordo e Tara',
      difficulty: 'Base',
      title: `La cassetta di frutta dell'ortofrutta`,
      text: askNet
        ? `Una cassetta di mele appena colte ha un peso lordo complessivo di ${grossWeight} kg. La tara della cassetta vuota di legno pesa ${tare} kg.`
        : `Un commerciante riempie una cassetta vuota da ${tare} kg con ${netWeight} kg di pesche nettarine.`,
      question: askNet
        ? `Qual è il peso netto delle sole mele (in kg)?`
        : `Qual è il peso lordo della cassetta piena (in kg)?`,
      correctAnswer: askNet ? netWeight : grossWeight,
      unit: 'kg',
      hint1: `Ricorda le formule del peso: Peso Lordo = Peso Netto + Tara.`,
      hint2: askNet ? `Peso Netto = Peso Lordo - Tara.` : `Somma peso netto e tara.`,
      solutionSteps: [
        askNet
          ? `Peso Netto = Peso Lordo - Tara = ${grossWeight} kg - ${tare} kg = ${netWeight} kg`
          : `Peso Lordo = Peso Netto + Tara = ${netWeight} kg + ${tare} kg = ${grossWeight} kg`,
      ],
      barModel: {
        type: 'compravendita',
        labels: [`Peso Netto (${netWeight} kg)`, `Tara (${tare} kg)`],
        unitValues: [netWeight, tare],
        unitText: 'kg',
        totalLabel: `Peso Lordo = ${grossWeight} kg`,
      },
    });
  }

  // 5. Aree dei Poligoni (Triangolo, Rombo, Trapezio) (35 problemi)
  for (let i = 0; i < 35; i++) {
    const shapeType = i % 3; // 0 = Triangolo, 1 = Rombo, 2 = Trapezio
    if (shapeType === 0) {
      const base = 10 + i;
      const height = 8 + (i % 6);
      const area = (base * height) / 2;

      problems.push({
        id: `p5-${String(idCount++).padStart(3, '0')}`,
        gradeId: '5_primaria',
        gradeLabel: '5ª Primaria',
        topic: 'Aree dei Poligoni (Rettangolo, Triangolo, Rombo, Trapezio)',
        difficulty: 'Intermedio',
        title: `L'aiuola triangolare del parco`,
        text: `Un'aiuola a forma di triangolo ha la base che misura ${base} metri e l'altezza relativa di ${height} metri.`,
        question: `Qual è l'area dell'aiuola triangolare (in m²)?`,
        correctAnswer: area,
        unit: 'm²',
        hint1: `La formula dell'area del triangolo è: (Base × Altezza) : 2.`,
        hint2: `Moltiplica ${base} per ${height} e poi dividi per 2.`,
        solutionSteps: [
          `Base = ${base} m, Altezza = ${height} m`,
          `Area = (Base × Altezza) : 2 = (${base} × ${height}) : 2 = ${base * height} : 2 = ${area} m²`,
        ],
        barModel: {
          type: 'geometria',
          labels: [`Base: ${base} m`, `Altezza: ${height} m`],
          unitText: 'm',
          note: `Area = (b × h) / 2 = ${area} m²`,
        },
      });
    } else if (shapeType === 1) {
      const D = 16 + i * 2;
      const d = 10 + (i % 5) * 2;
      const area = (D * d) / 2;

      problems.push({
        id: `p5-${String(idCount++).padStart(3, '0')}`,
        gradeId: '5_primaria',
        gradeLabel: '5ª Primaria',
        topic: 'Aree dei Poligoni (Rettangolo, Triangolo, Rombo, Trapezio)',
        difficulty: 'Intermedio',
        title: `L'aquilone a forma di rombo`,
        text: `Per costruire un aquilone a forma di rombo si usano due bacchette di legno come diagonali, lunghe rispettivamente ${D} cm e ${d} cm.`,
        question: `Qual è la superficie di tela necessaria per coprire il rombo (area in cm²)?`,
        correctAnswer: area,
        unit: 'cm²',
        hint1: `L'area del rombo si calcola moltiplicando le due diagonali e dividendo per 2: (D × d) : 2.`,
        hint2: `Calcola (${D} × ${d}) : 2.`,
        solutionSteps: [
          `Diagonale maggiore D = ${D} cm, Diagonale minore d = ${d} cm`,
          `Area = (D × d) : 2 = (${D} × ${d}) : 2 = ${D * d} : 2 = ${area} cm²`,
        ],
        barModel: {
          type: 'geometria',
          labels: [`Diagonale Magg: ${D} cm`, `Diagonale Min: ${d} cm`],
          unitText: 'cm',
          note: `Area = (D × d) / 2 = ${area} cm²`,
        },
      });
    } else {
      const B = 20 + i;
      const b = 12 + (i % 6);
      const h = 8 + (i % 4);
      const sumB = B + b;
      const area = (sumB * h) / 2;

      problems.push({
        id: `p5-${String(idCount++).padStart(3, '0')}`,
        gradeId: '5_primaria',
        gradeLabel: '5ª Primaria',
        topic: 'Aree dei Poligoni (Rettangolo, Triangolo, Rombo, Trapezio)',
        difficulty: 'Avanzato',
        title: `Il piano del tavolo a forma di trapezio`,
        text: `Il piano di un tavolo a trapezio ha la base maggiore di ${B} dm, la base minore di ${b} dm e l'altezza di ${h} dm.`,
        question: `Qual è l'area della superficie del tavolo (in dm²)?`,
        correctAnswer: area,
        unit: 'dm²',
        hint1: `Area del trapezio = [(Base maggiore + Base minore) × Altezza] : 2.`,
        hint2: `Somma prima le due basi (${B} + ${b} = ${sumB}), moltiplica per ${h} e dividi per 2.`,
        solutionSteps: [
          `Somma delle basi = ${B} + ${b} = ${sumB} dm`,
          `Area = (${sumB} × ${h}) : 2 = ${sumB * h} : 2 = ${area} dm²`,
        ],
        barModel: {
          type: 'geometria',
          labels: [`Base Maggiore: ${B} dm`, `Base Minore: ${b} dm`, `Altezza: ${h} dm`],
          unitText: 'dm',
          note: `Area = [(B + b) × h] / 2 = ${area} dm²`,
        },
      });
    }
  }

  // 6. Perimetro della Circonferenza (25 problemi per completare a 200)
  for (let i = 0; i < 25; i++) {
    const radius = 5 + i * 2; // raggio: 5, 7, 9, 11...
    const diameter = radius * 2;
    // Usiamo pi greco standard scolastico per primaria = 3,14
    const circ = Math.round(diameter * 3.14 * 10) / 10;

    problems.push({
      id: `p5-${String(idCount++).padStart(3, '0')}`,
      gradeId: '5_primaria',
      gradeLabel: '5ª Primaria',
      topic: 'Perimetro della Circonferenza',
      difficulty: 'Intermedio',
      title: `La pista circolare per macchinine`,
      text: `Una pista circolare giocattolo ha un raggio di ${radius} cm (considera π ≈ 3,14).`,
      question: `Quanto misura la lunghezza dell'intera circonferenza della pista (in cm)?`,
      correctAnswer: circ,
      unit: 'cm',
      hint1: `La formula della circonferenza è C = 2 × π × raggio (oppure diametro × 3,14).`,
      hint2: `Calcola il diametro (${radius} × 2 = ${diameter}) e moltiplicalo per 3,14.`,
      solutionSteps: [
        `Raggio r = ${radius} cm, Diametro d = 2 × r = ${diameter} cm`,
        `Circonferenza C = diametro × 3,14 = ${diameter} × 3,14 = ${circ} cm`,
      ],
      barModel: {
        type: 'geometria',
        labels: [`Raggio: ${radius} cm`, `Diametro: ${diameter} cm`],
        unitText: 'cm',
        note: `C = 2 · π · r = ${circ} cm`,
      },
    });
  }

  return problems;
}

// GENERATOR: 1ª MEDIA (200 Problemi)
function generateGrade1MediaProblems(): ProblemItem[] {
  const problems: ProblemItem[] = [];
  let idCount = 1;

  // 1. Segmenti: Somma e Differenza (35 problemi)
  for (let i = 0; i < 35; i++) {
    const nameA = NAMES[i % NAMES.length];
    const nameB = NAMES[(i + 3) % NAMES.length];
    const minor = 14 + i * 2;
    const diff = 8 + (i % 7) * 2;
    const major = minor + diff;
    const sum = minor + major;

    problems.push({
      id: `p1m-${String(idCount++).padStart(3, '0')}`,
      gradeId: '1_media',
      gradeLabel: '1ª Media',
      topic: 'Metodo Segmenti: Somma e Differenza',
      difficulty: i < 12 ? 'Base' : i < 25 ? 'Intermedio' : 'Avanzato',
      title: `Le figurine di ${nameA} e ${nameB}`,
      text: `${nameA} e ${nameB} hanno complessivamente ${sum} figurine. ${nameA} ne possiede ${diff} in più di ${nameB}.`,
      question: `Quante figurine possiede ${nameB} (la quantità minore)?`,
      correctAnswer: minor,
      unit: 'figurine',
      hint1: `Disegna i due segmenti: quello di ${nameA} è lungo quanto quello di ${nameB} più un pezzo di ${diff}.`,
      hint2: `Togli la differenza dalla somma (${sum} - ${diff}) e dividi per 2: Segmento minore = (S - D) : 2.`,
      solutionSteps: [
        `Somma S = ${sum}, Differenza D = ${diff}`,
        `Togliamo la differenza: ${sum} - ${diff} = ${sum - diff}`,
        `Quantità minore (${nameB}) = ${sum - diff} : 2 = ${minor} figurine`,
        `Quantità maggiore (${nameA}) = ${minor} + ${diff} = ${major} figurine`,
        `Verifica: ${minor} + ${major} = ${sum}!`,
      ],
      barModel: {
        type: 'somma_diff',
        labels: [`Segmento Minore (${nameB}): ${minor}`, `Segmento Maggiore (${nameA}): ${minor} + ${diff}`],
        unitValues: [minor, minor, diff],
        unitText: 'figurine',
        totalLabel: `Somma = ${sum}`,
        diffLabel: `Differenza = ${diff}`,
      },
    });
  }

  // 2. Segmenti: Somma e Multiplo (35 problemi)
  for (let i = 0; i < 35; i++) {
    const nameA = NAMES[(i + 2) % NAMES.length];
    const nameB = NAMES[(i + 7) % NAMES.length];
    const multiple = 2 + (i % 4); // 2, 3, 4, 5
    const unitPart = 12 + i * 2;
    const sum = unitPart * (1 + multiple);
    const major = unitPart * multiple;

    problems.push({
      id: `p1m-${String(idCount++).padStart(3, '0')}`,
      gradeId: '1_media',
      gradeLabel: '1ª Media',
      topic: 'Metodo Segmenti: Somma e Multiplo',
      difficulty: 'Intermedio',
      title: `La raccolta di libri di ${nameA} e ${nameB}`,
      text: `In una libreria ci sono due ripiani con ${sum} libri in totale. Il ripiano superiore contiene il ${multiple === 2 ? 'doppio' : multiple === 3 ? 'triplo' : multiple === 4 ? 'quadruplo' : 'quintuplo'} dei libri del ripiano inferiore.`,
      question: `Quanti libri ci sono sul ripiano inferiore (1 unità frazionaria)?`,
      correctAnswer: unitPart,
      unit: 'libri',
      hint1: `Rappresenta il ripiano inferiore con 1 segmento e il superiore con ${multiple} segmenti identici.`,
      hint2: `In tutto ci sono 1 + ${multiple} = ${1 + multiple} parti uguali. Dividi il totale (${sum}) per ${1 + multiple}.`,
      solutionSteps: [
        `Ripiano inferiore = 1 parte`,
        `Ripiano superiore = ${multiple} parti`,
        `Totale parti uguali = 1 + ${multiple} = ${1 + multiple} parti`,
        `Valore di 1 parte = ${sum} : ${1 + multiple} = ${unitPart} libri`,
        `Ripiano superiore = ${unitPart} × ${multiple} = ${major} libri`,
      ],
      barModel: {
        type: 'parti_uguali',
        labels: [`Ripiano inf. (1 parte = ${unitPart})`, `Ripiano sup. (${multiple} parti = ${major})`],
        unitValues: [unitPart, major],
        unitText: 'libri',
        totalLabel: `Totale = ${sum} libri`,
      },
    });
  }

  // 3. Segmenti: Differenza e Multiplo (30 problemi)
  for (let i = 0; i < 30; i++) {
    const factor = 3 + (i % 3); // 3, 4, 5
    const unitVal = 8 + i * 2;
    const diff = unitVal * (factor - 1);
    const numMajor = unitVal * factor;

    problems.push({
      id: `p1m-${String(idCount++).padStart(3, '0')}`,
      gradeId: '1_media',
      gradeLabel: '1ª Media',
      topic: 'Metodo Segmenti: Differenza e Multiplo',
      difficulty: 'Intermedio',
      title: `I risparmi a confronto di due fratelli`,
      text: `Due fratelli hanno una differenza di risparmi di ${diff} €. Il fratello maggiore ha accumulato esattamente il ${factor === 3 ? 'triplo' : factor === 4 ? 'quadruplo' : 'quintuplo'} del denaro del minore.`,
      question: `Quanti euro possiede il fratello minore?`,
      correctAnswer: unitVal,
      unit: '€',
      hint1: `La differenza (${diff} €) corrisponde a ${factor} - 1 = ${factor - 1} parti uguali.`,
      hint2: `Dividi la differenza per il numero di parti di scarto: ${diff} : ${factor - 1}.`,
      solutionSteps: [
        `Parti di differenza = ${factor} - 1 = ${factor - 1} parti`,
        `Valore di 1 parte (fratello minore) = ${diff} : ${factor - 1} = ${unitVal} €`,
        `Fratello maggiore = ${unitVal} × ${factor} = ${numMajor} €`,
      ],
      barModel: {
        type: 'somma_diff',
        labels: [`Minore (1 parte = ${unitVal} €)`, `Differenza (${factor - 1} parti = ${diff} €)`],
        unitValues: [unitVal, diff],
        unitText: '€',
        diffLabel: `Differenza = ${diff} €`,
      },
    });
  }

  // 4. MCD e mcm in Problemi Pratici (35 problemi)
  for (let i = 0; i < 35; i++) {
    const isMCD = i % 2 === 0;
    if (isMCD) {
      const gcd = 4 + (i % 5) * 2; // 4, 6, 8, 10, 12
      const a = gcd * (3 + (i % 3));
      const b = gcd * (5 + (i % 3));

      problems.push({
        id: `p1m-${String(idCount++).padStart(3, '0')}`,
        gradeId: '1_media',
        gradeLabel: '1ª Media',
        topic: 'MCD e mcm in Problemi Pratici',
        difficulty: 'Intermedio',
        title: `La preparazione dei sacchetti regalo di beneficenza`,
        text: `Un gruppo scout ha a disposizione ${a} penne e ${b} quaderni. Vuole preparare il maggior numero possibile di sacchetti regalo identici, ciascuno con lo stesso numero di oggetti, senza che avanzi nulla.`,
        question: `Qual è il numero massimo di sacchetti identici che si possono confezionare (MCD)?`,
        correctAnswer: gcd,
        unit: 'sacchetti',
        hint1: `Poiché si cerca il "maggior numero possibile" senza avanzi, devi calcolare il Massimo Comune Divisore (MCD).`,
        hint2: `Scomponi ${a} e ${b} in fattori primi e prendi i fattori comuni con il minimo esponente.`,
        solutionSteps: [
          `Quantità: penne = ${a}, quaderni = ${b}`,
          `Cerchiamo il Massimo Comune Divisore: MCD(${a}, ${b})`,
          `MCD(${a}, ${b}) = ${gcd}`,
          `Si possono confezionare al massimo ${gcd} sacchetti identici.`,
        ],
        barModel: {
          type: 'parti_uguali',
          labels: [`Penne (${a} diviso ${gcd} = ${a / gcd})`, `Quaderni (${b} diviso ${gcd} = ${b / gcd})`],
          unitText: 'pezzi',
          note: `MCD = ${gcd} sacchetti`,
        },
      });
    } else {
      const p1 = [6, 8, 10, 12, 15][i % 5];
      const p2 = [4, 6, 9, 10, 8][(i + 1) % 5];
      // calculate lcm
      const gcdCalc = (x: number, y: number): number => y === 0 ? x : gcdCalc(y, x % y);
      const lcm = (p1 * p2) / gcdCalc(p1, p2);

      problems.push({
        id: `p1m-${String(idCount++).padStart(3, '0')}`,
        gradeId: '1_media',
        gradeLabel: '1ª Media',
        topic: 'MCD e mcm in Problemi Pratici',
        difficulty: 'Intermedio',
        title: `La partenza sincronizzata dei traghetti dal porto`,
        text: `Dal molo di una città portuale partono due traghetti: il primo effettua una corsa ogni ${p1} minuti, il secondo ogni ${p2} minuti. Se partono insieme alle 8:00 del mattino, tra quanti minuti partiranno di nuovo contemporaneamente?`,
        question: `Dopo quanti minuti si verificherà la prossima partenza simultanea (mcm)?`,
        correctAnswer: lcm,
        unit: 'minuti',
        hint1: `Per trovare la ricorrenza comune di due eventi ciclici si calcola il minimo comune multiplo (mcm).`,
        hint2: `Calcola mcm(${p1}, ${p2}) considerando tutti i fattori primi comuni e non comuni con il massimo esponente.`,
        solutionSteps: [
          `Frequenze: Traghetto A ogni ${p1} min, Traghetto B ogni ${p2} min`,
          `Calcoliamo il minimo comune multiplo: mcm(${p1}, ${p2})`,
          `mcm(${p1}, ${p2}) = ${lcm}`,
          `I due traghetti partiranno di nuovo insieme dopo ${lcm} minuti.`,
        ],
        barModel: {
          type: 'parti_uguali',
          labels: [`Traghetto A: cicli da ${p1} min`, `Traghetto B: cicli da ${p2} min`],
          unitText: 'min',
          note: `Coincidenza = mcm(${p1}, ${p2}) = ${lcm} min`,
        },
      });
    }
  }

  // 5. Geometria degli Angoli e Triangoli (35 problemi)
  for (let i = 0; i < 35; i++) {
    const isIsosceles = i % 2 === 0;
    if (isIsosceles) {
      const vertexAngle = 30 + (i % 15) * 4; // 30, 34, 38...
      const baseAnglesSum = 180 - vertexAngle;
      const baseAngle = baseAnglesSum / 2;

      problems.push({
        id: `p1m-${String(idCount++).padStart(3, '0')}`,
        gradeId: '1_media',
        gradeLabel: '1ª Media',
        topic: 'Geometria degli Angoli e Triangoli',
        difficulty: 'Base',
        title: `Gli angoli del triangolo isoscele`,
        text: `In un triangolo isoscele l'angolo al vertice misura ${vertexAngle}°.`,
        question: `Quanto misura ciascuno dei due angoli congruenti alla base (in gradi)?`,
        correctAnswer: baseAngle,
        unit: 'gradi',
        hint1: `La somma degli angoli interni di un qualsiasi triangolo è sempre 180°.`,
        hint2: `Sottrai l'angolo al vertice (${180} - ${vertexAngle} = ${baseAnglesSum}°) e dividi per 2 perché gli angoli alla base sono uguali.`,
        solutionSteps: [
          `Somma angoli interni = 180°`,
          `Somma dei due angoli alla base = 180° - ${vertexAngle}° = ${baseAnglesSum}°`,
          `Ciascun angolo alla base = ${baseAnglesSum}° : 2 = ${baseAngle}°`,
        ],
        barModel: {
          type: 'geometria',
          labels: [`Angolo Vertice: ${vertexAngle}°`, `Angolo Base 1: ${baseAngle}°`, `Angolo Base 2: ${baseAngle}°`],
          unitValues: [vertexAngle, baseAngle, baseAngle],
          unitText: '°',
          totalLabel: `Somma = 180°`,
        },
      });
    } else {
      const angle1 = 40 + (i % 10) * 3;
      const angle2 = 50 + (i % 8) * 4;
      const angle3 = 180 - (angle1 + angle2);

      problems.push({
        id: `p1m-${String(idCount++).padStart(3, '0')}`,
        gradeId: '1_media',
        gradeLabel: '1ª Media',
        topic: 'Geometria degli Angoli e Triangoli',
        difficulty: 'Base',
        title: `Calcolo dell'angolo incognito del triangolo`,
        text: `In un triangolo scaleno due angoli misurano rispettivamente ${angle1}° e ${angle2}°.`,
        question: `Quanto misura l'ampiezza del terzo angolo (in gradi)?`,
        correctAnswer: angle3,
        unit: 'gradi',
        hint1: `La somma degli angoli interni di ogni triangolo è 180°.`,
        hint2: `Somma i primi due angoli (${angle1}° + ${angle2}°) e sottrai il risultato da 180°.`,
        solutionSteps: [
          `Somma dei due angoli noti = ${angle1}° + ${angle2}° = ${angle1 + angle2}°`,
          `Terzo angolo = 180° - ${angle1 + angle2}° = ${angle3}°`,
        ],
        barModel: {
          type: 'geometria',
          labels: [`Angolo A: ${angle1}°`, `Angolo B: ${angle2}°`, `Angolo C: ${angle3}°`],
          unitValues: [angle1, angle2, angle3],
          unitText: '°',
          totalLabel: `Somma totale = 180°`,
        },
      });
    }
  }

  // 6. Perimetri con Lati Frazionari (30 problemi per arrivare a 200)
  for (let i = 0; i < 30; i++) {
    const num = 2 + (i % 3); // 2, 3, 4
    const den = num + 1; // 3, 4, 5
    const unitSide = 6 + i * 2;
    const base = unitSide * den;
    const height = unitSide * num;
    const semiPerimeter = base + height;
    const perimeter = semiPerimeter * 2;

    problems.push({
      id: `p1m-${String(idCount++).padStart(3, '0')}`,
      gradeId: '1_media',
      gradeLabel: '1ª Media',
      topic: 'Perimetri con Lati Frazionari',
      difficulty: 'Avanzato',
      title: `Il rettangolo con dimensioni in rapporto frazionario`,
      text: `Il perimetro di un rettangolo misura ${perimeter} cm. Sapendo che l'altezza è i ${num}/${den} della base, calcola la misura della base.`,
      question: `Quanto misura la base del rettangolo (in cm)?`,
      correctAnswer: base,
      unit: 'cm',
      hint1: `Calcola prima il semiperimetro (Base + Altezza) = ${perimeter} : 2 = ${semiPerimeter} cm.`,
      hint2: `La base è formata da ${den} parti e l'altezza da ${num} parti: in tutto ${den + num} parti uguali. Dividi ${semiPerimeter} per ${den + num}.`,
      solutionSteps: [
        `Semiperimetro (Base + Altezza) = ${perimeter} : 2 = ${semiPerimeter} cm`,
        `Totale parti frazionarie = ${den} + ${num} = ${den + num} parti`,
        `1 unità frazionaria = ${semiPerimeter} : ${den + num} = ${unitSide} cm`,
        `Base = ${unitSide} × ${den} = ${base} cm`,
        `Altezza = ${unitSide} × ${num} = ${height} cm`,
      ],
      barModel: {
        type: 'parti_uguali',
        labels: [`Base (${den} parti = ${base} cm)`, `Altezza (${num} parti = ${height} cm)`],
        unitValues: [base, height],
        unitText: 'cm',
        totalLabel: `Semiperimetro = ${semiPerimeter} cm`,
      },
    });
  }

  return problems;
}

// GENERATOR: 2ª MEDIA (200 Problemi)
function generateGrade2MediaProblems(): ProblemItem[] {
  const problems: ProblemItem[] = [];
  let idCount = 1;

  // 1. Rapporti e Proporzioni (35 problemi)
  for (let i = 0; i < 35; i++) {
    const a = 3 + (i % 6) * 2;
    const factor = 4 + (i % 5);
    const b = a * factor;
    const c = 5 + (i % 4) * 3;
    const x = c * factor; // a : b = c : x => x = (b * c) / a

    problems.push({
      id: `p2m-${String(idCount++).padStart(3, '0')}`,
      gradeId: '2_media',
      gradeLabel: '2ª Media',
      topic: 'Rapporti e Proporzioni',
      difficulty: 'Base',
      title: `Calcolo del termine incognito nella proporzione`,
      text: `Risolvi la seguente proporzione matematica determinando il valore dell'incognita x:  ${a} : ${b} = ${c} : x`,
      question: `Qual è il valore numerico dell'estremo incognito x?`,
      correctAnswer: x,
      unit: '',
      hint1: `Proprietà fondamentale delle proporzioni: il prodotto dei medi è uguale al prodotto degli estremi.`,
      hint2: `x = (${b} × ${c}) : ${a}.`,
      solutionSteps: [
        `Proporzione: ${a} : ${b} = ${c} : x`,
        `Applico la proprietà fondamentale: ${a} · x = ${b} · ${c}`,
        `x = (${b} × ${c}) : ${a} = ${b * c} : ${a} = ${x}`,
      ],
      barModel: {
        type: 'proporzione',
        labels: [`Primo rapporto: ${a} : ${b}`, `Secondo rapporto: ${c} : x (${x})`],
        note: `Prodotto medi (${b} × ${c}) = Prodotto estremi (${a} × ${x}) = ${b * c}`,
      },
    });
  }

  // 2. Proprietà del Comporre e Scomporre (35 problemi)
  for (let i = 0; i < 35; i++) {
    const p1 = 3 + (i % 4); // 3, 4, 5, 6
    const p2 = 2; // 3:2, 4:2, etc.
    const unitPart = 8 + i * 2;
    const x = p1 * unitPart;
    const y = p2 * unitPart;
    const sum = x + y;

    problems.push({
      id: `p2m-${String(idCount++).padStart(3, '0')}`,
      gradeId: '2_media',
      gradeLabel: '2ª Media',
      topic: 'Proprietà del Comporre e Scomporre',
      difficulty: 'Intermedio',
      title: `Ripartizione con la proprietà del comporre`,
      text: `Due grandezze incognite x e y sono nel rapporto di ${p1} a ${p2} (x : y = ${p1} : ${p2}) e la loro somma è uguale a ${sum}. Calcola il valore di x (il termine maggiore).`,
      question: `Quanto vale x?`,
      correctAnswer: x,
      unit: '',
      hint1: `Applica la proprietà del comporre: (x + y) : x = (${p1} + ${p2}) : ${p1}.`,
      hint2: `Sostituisci la somma nota (${sum}): ${sum} : x = ${p1 + p2} : ${p1}.`,
      solutionSteps: [
        `x : y = ${p1} : ${p2} con x + y = ${sum}`,
        `Proprietà del comporre: (x + y) : x = (${p1} + ${p2}) : ${p1}`,
        `${sum} : x = ${p1 + p2} : ${p1}`,
        `x = (${sum} × ${p1}) : ${p1 + p2} = ${sum * p1} : ${p1 + p2} = ${x}`,
      ],
      barModel: {
        type: 'proporzione',
        labels: [`x (${p1} parti = ${x})`, `y (${p2} parti = ${y})`],
        unitValues: [x, y],
        totalLabel: `Somma x + y = ${sum}`,
      },
    });
  }

  // 3. Proporzionalità Inversa (Tre Semplice Inverso) (30 problemi)
  for (let i = 0; i < 30; i++) {
    const workers1 = 3 + (i % 4); // 3, 4, 5, 6 operai
    const days1 = 12 + (i % 6) * 4; // giorni
    const totalManDays = workers1 * days1;
    const workers2 = [2, 4, 6, 8, 9, 12][i % 6];
    // assure clean division
    const adjustedTotal = Math.ceil(totalManDays / workers2) * workers2;
    const adjustedDays1 = adjustedTotal / workers1;
    const days2 = adjustedTotal / workers2;

    problems.push({
      id: `p2m-${String(idCount++).padStart(3, '0')}`,
      gradeId: '2_media',
      gradeLabel: '2ª Media',
      topic: 'Proporzionalità Diretta e Inversa (Tre Semplice)',
      difficulty: 'Intermedio',
      title: `I lavori di ristrutturazione della scuola`,
      text: `${workers1} operai impiegano ${adjustedDays1} giorni per completare la tinteggiatura di un edificio scolastico. Quanti giorni impiegherebbero ${workers2} operai con lo stesso ritmo di lavoro?`,
      question: `Quanti giorni occorrono a ${workers2} operai?`,
      correctAnswer: days2,
      unit: 'giorni',
      hint1: `Attenzione: all'aumentare degli operai, i giorni necessari diminuiscono! È una proporzionalità inversa.`,
      hint2: `Il prodotto (Operai × Giorni) rimane costante: ${workers1} × ${adjustedDays1} = ${workers2} × x.`,
      solutionSteps: [
        `Proporzionalità inversa: costante k = ${workers1} × ${adjustedDays1} = ${adjustedTotal} giornate-uomo`,
        `Giorni per ${workers2} operai: x = ${adjustedTotal} : ${workers2} = ${days2} giorni`,
      ],
      barModel: {
        type: 'proporzione',
        labels: [`${workers1} operai × ${adjustedDays1} gg`, `${workers2} operai × ${days2} gg`],
        note: `Lavoro costante = ${adjustedTotal} giornate-lavoro`,
      },
    });
  }

  // 4. Teorema di Pitagora nel Triangolo Rettangolo (40 problemi con terne pitagoriche)
  const PYTH_TRIPLES = [
    { a: 3, b: 4, c: 5 },
    { a: 5, b: 12, c: 13 },
    { a: 8, b: 15, c: 17 },
    { a: 7, b: 24, c: 25 },
    { a: 9, b: 40, c: 41 },
    { a: 20, b: 21, c: 29 },
  ];

  for (let i = 0; i < 40; i++) {
    const tripleBase = PYTH_TRIPLES[i % PYTH_TRIPLES.length];
    const k = 1 + Math.floor(i / PYTH_TRIPLES.length);
    const cat1 = tripleBase.a * k;
    const cat2 = tripleBase.b * k;
    const hyp = tripleBase.c * k;

    const askHyp = i % 2 === 0;

    problems.push({
      id: `p2m-${String(idCount++).padStart(3, '0')}`,
      gradeId: '2_media',
      gradeLabel: '2ª Media',
      topic: 'Teorema di Pitagora nel Triangolo Rettangolo',
      difficulty: k > 2 ? 'Intermedio' : 'Base',
      title: `Teorema di Pitagora nel triangolo rettangolo`,
      text: askHyp
        ? `In un triangolo rettangolo i due cateti misurano rispettivamente ${cat1} cm e ${cat2} cm.`
        : `In un triangolo rettangolo l'ipotenusa misura ${hyp} cm e uno dei cateti misura ${cat1} cm.`,
      question: askHyp
        ? `Quanto misura la lunghezza dell'ipotenusa (in cm)?`
        : `Quanto misura la lunghezza dell'altro cateto (in cm)?`,
      correctAnswer: askHyp ? hyp : cat2,
      unit: 'cm',
      hint1: askHyp
        ? `Teorema di Pitagora: Ipotenusa = √(Cateto₁² + Cateto₂²).`
        : `Formula inversa: Cateto = √(Ipotenusa² - Cateto₁²).`,
      hint2: askHyp
        ? `Calcola √(${cat1}² + ${cat2}²) = √(${cat1 * cat1} + ${cat2 * cat2}).`
        : `Calcola √(${hyp}² - ${cat1}²) = √(${hyp * hyp} - ${cat1 * cat1}).`,
      solutionSteps: [
        askHyp
          ? `Cateto₁ = ${cat1} cm, Cateto₂ = ${cat2} cm`
          : `Ipotenusa = ${hyp} cm, Cateto₁ = ${cat1} cm`,
        askHyp
          ? `Ipotenusa = √(${cat1}² + ${cat2}²) = √(${cat1 * cat1} + ${cat2 * cat2}) = √(${hyp * hyp}) = ${hyp} cm`
          : `Cateto₂ = √(${hyp}² - ${cat1}²) = √(${hyp * hyp} - ${cat1 * cat1}) = √(${cat2 * cat2}) = ${cat2} cm`,
      ],
      barModel: {
        type: 'pitagora',
        labels: [`Cateto a: ${cat1} cm`, `Cateto b: ${cat2} cm`, `Ipotenusa c: ${hyp} cm`],
        unitValues: [cat1, cat2, hyp],
        note: `a² + b² = c² (${cat1 * cat1} + ${cat2 * cat2} = ${hyp * hyp})`,
      },
    });
  }

  // 5. Pitagora applicato al Rettangolo e Rombo (35 problemi)
  for (let i = 0; i < 35; i++) {
    const isRombo = i % 2 === 0;
    if (isRombo) {
      // rombo: semidiagonali formano triangolo rettangolo con il lato
      const semiD1 = 12 + (i % 6) * 3; // cateto 1
      const semiD2 = 9 + (i % 4) * 3; // cateto 2 (multiplo di 3-4-5)
      // let's use exact 3-4-5 scaling for clean integer side
      const scale = 2 + (i % 5);
      const d1Half = 3 * scale;
      const d2Half = 4 * scale;
      const side = 5 * scale;
      const D1 = d1Half * 2;
      const D2 = d2Half * 2;

      problems.push({
        id: `p2m-${String(idCount++).padStart(3, '0')}`,
        gradeId: '2_media',
        gradeLabel: '2ª Media',
        topic: 'Pitagora applicato a Rettangolo, Rombo e Trapezio',
        difficulty: 'Intermedio',
        title: `Pitagora applicato alle diagonali del rombo`,
        text: `Le diagonali di un rombo misurano rispettivamente ${D1} cm e ${D2} cm. Sapendo che le diagonali sono perpendicolari e si dimezzano reciprocamente, calcola la misura del lato del rombo.`,
        question: `Quanto misura il lato del rombo (in cm)?`,
        correctAnswer: side,
        unit: 'cm',
        hint1: `Le semidiagonali formano i cateti di uno dei 4 triangoli rettangoli interni: d₁/2 = ${d1Half} cm e d₂/2 = ${d2Half} cm.`,
        hint2: `Il lato del rombo è l'ipotenusa: Lato = √(semidiagonale₁² + semidiagonale₂²).`,
        solutionSteps: [
          `Semidiagonale 1 = ${D1} : 2 = ${d1Half} cm`,
          `Semidiagonale 2 = ${D2} : 2 = ${d2Half} cm`,
          `Lato rombo = √(${d1Half}² + ${d2Half}²) = √(${d1Half * d1Half} + ${d2Half * d2Half}) = √(${side * side}) = ${side} cm`,
        ],
        barModel: {
          type: 'pitagora',
          labels: [`Semidiag D/2: ${d1Half} cm`, `Semidiag d/2: ${d2Half} cm`, `Lato ipotenusa: ${side} cm`],
          note: `Lato = √(d₁/2)² + (d₂/2)² = ${side} cm`,
        },
      });
    } else {
      // rettangolo con diagonale (3-4-5 or 5-12-13)
      const scale = 2 + (i % 6);
      const b = 4 * scale;
      const h = 3 * scale;
      const diag = 5 * scale;

      problems.push({
        id: `p2m-${String(idCount++).padStart(3, '0')}`,
        gradeId: '2_media',
        gradeLabel: '2ª Media',
        topic: 'Pitagora applicato a Rettangolo, Rombo e Trapezio',
        difficulty: 'Intermedio',
        title: `La diagonale dello schermo rettangolare`,
        text: `Lo schermo rettangolare di un monitor ha la base di ${b} cm e l'altezza di ${h} cm. Calcola la lunghezza della diagonale dello schermo.`,
        question: `Quanto misura la diagonale dello schermo (in cm)?`,
        correctAnswer: diag,
        unit: 'cm',
        hint1: `La diagonale divide il rettangolo in due triangoli rettangoli in cui la diagonale è l'ipotenusa.`,
        hint2: `Diagonale = √(Base² + Altezza²) = √(${b}² + ${h}²).`,
        solutionSteps: [
          `Base = ${b} cm, Altezza = ${h} cm`,
          `Diagonale = √(${b}² + ${h}²) = √(${b * b} + ${h * h}) = √(${diag * diag}) = ${diag} cm`,
        ],
        barModel: {
          type: 'pitagora',
          labels: [`Base: ${b} cm`, `Altezza: ${h} cm`, `Diagonale: ${diag} cm`],
          note: `d = √(b² + h²) = ${diag} cm`,
        },
      });
    }
  }

  // 6. Area del Cerchio e Formule Inverse (25 problemi per arrivare a 200)
  for (let i = 0; i < 25; i++) {
    const r = 5 + i * 2;
    // Area = pi * r^2
    const area = Math.round(3.14 * r * r * 10) / 10;

    problems.push({
      id: `p2m-${String(idCount++).padStart(3, '0')}`,
      gradeId: '2_media',
      gradeLabel: '2ª Media',
      topic: 'Area del Cerchio e Raggio',
      difficulty: 'Intermedio',
      title: `L'area della piazza circolare`,
      text: `Una piazza circolare ha un raggio di ${r} metri. Considerando il valore di π ≈ 3,14, calcola la superficie totale della piazza.`,
      question: `Qual è l'area della piazza circolare (in m²)?`,
      correctAnswer: area,
      unit: 'm²',
      hint1: `La formula dell'area del cerchio è: Area = π × raggio².`,
      hint2: `Calcola il quadrato del raggio (${r} × ${r} = ${r * r}) e moltiplicalo per 3,14.`,
      solutionSteps: [
        `Raggio r = ${r} m`,
        `Area cerchio = π × r² = 3,14 × ${r}² = 3,14 × ${r * r} = ${area} m²`,
      ],
      barModel: {
        type: 'geometria',
        labels: [`Raggio: ${r} m`],
        unitText: 'm',
        note: `Area = π · r² = ${area} m²`,
      },
    });
  }

  return problems;
}

// GENERATOR: 3ª MEDIA (200 Problemi)
function generateGrade3MediaProblems(): ProblemItem[] {
  const problems: ProblemItem[] = [];
  let idCount = 1;

  // 1. Equazioni di 1° Grado e Problemi Numerici / Età (35 problemi)
  for (let i = 0; i < 35; i++) {
    const isAge = i % 2 === 0;
    if (isAge) {
      // Padre e figlio: Padre = 36 + i*2, Figlio = 8 + i
      // Fra quanti anni x il padre avrà il doppio del figlio?
      // P + x = 2 * (F + x) => P + x = 2F + 2x => x = P - 2F
      const F = 8 + (i % 6);
      const x = 4 + (i % 7) * 2; // anni futuri
      const P = 2 * (F + x) - x;

      problems.push({
        id: `p3m-${String(idCount++).padStart(3, '0')}`,
        gradeId: '3_media',
        gradeLabel: '3ª Media',
        topic: 'Equazioni di 1° Grado e Problemi Numerici',
        difficulty: 'Intermedio',
        title: `Il problema algebrico delle età`,
        text: `Un genitore ha attualmente ${P} anni e suo figlio ne ha ${F}. Fra quanti anni l'età del genitore sarà esattamente il doppio di quella del figlio?`,
        question: `Fra quanti anni accadrà (valore dell'incognita x)?`,
        correctAnswer: x,
        unit: 'anni',
        hint1: `Imposta un'equazione indicando con x gli anni che devono trascorrere: ${P} + x = 2 · (${F} + x).`,
        hint2: `Sviluppa la parentesi: ${P} + x = ${2 * F} + 2x, poi isola l'incognita x.`,
        solutionSteps: [
          `Età attuale genitore = ${P}, età figlio = ${F}`,
          `Equazione: ${P} + x = 2 · (${F} + x)`,
          `${P} + x = ${2 * F} + 2x`,
          `2x - x = ${P} - ${2 * F} => x = ${x} anni`,
          `Verifica: fra ${x} anni il genitore avrà ${P + x} anni e il figlio ${F + x} (${(F + x) * 2} = ${P + x})!`,
        ],
        barModel: {
          type: 'equazione',
          labels: [`Genitore: ${P} + x`, `Figlio raddoppiato: 2 · (${F} + x)`],
          note: `Equazione: ${P} + x = 2(${F} + x) => x = ${x}`,
        },
      });
    } else {
      // 3x + k = total
      const x = 7 + i * 2;
      const k = 5 + (i % 5) * 3;
      const total = 3 * x + k;

      problems.push({
        id: `p3m-${String(idCount++).padStart(3, '0')}`,
        gradeId: '3_media',
        gradeLabel: '3ª Media',
        topic: 'Equazioni di 1° Grado e Problemi Numerici',
        difficulty: 'Base',
        title: `L'enigma del numero misterioso`,
        text: `Se al triplo di un numero incognito x si aggiunge ${k}, si ottiene come risultato ${total}. Trova il valore del numero x.`,
        question: `Qual è il numero incognito x?`,
        correctAnswer: x,
        unit: '',
        hint1: `Traduci il testo in equazione: 3x + ${k} = ${total}.`,
        hint2: `Sottrai ${k} da entrambi i membri (3x = ${total - k}) e dividi per 3.`,
        solutionSteps: [
          `Equazione: 3x + ${k} = ${total}`,
          `3x = ${total} - ${k} = ${total - k}`,
          `x = ${total - k} : 3 = ${x}`,
        ],
        barModel: {
          type: 'equazione',
          labels: [`3x (${3 * x})`, `Costante (${k})`],
          unitValues: [3 * x, k],
          totalLabel: `Totale = ${total}`,
        },
      });
    }
  }

  // 2. Cinematica: Moto Rettilineo Uniforme (s = v · t) (35 problemi)
  for (let i = 0; i < 35; i++) {
    const speed = 60 + (i % 8) * 10; // km/h (60, 70, 80, 90, 100, 110, 120, 130)
    const hours = 2 + (i % 4); // ore
    const distance = speed * hours;

    const askSpeed = i % 3 === 0;
    const askTime = i % 3 === 1;

    problems.push({
      id: `p3m-${String(idCount++).padStart(3, '0')}`,
      gradeId: '3_media',
      gradeLabel: '3ª Media',
      topic: 'Cinematica: Moto Rettilineo Uniforme (s = v · t)',
      difficulty: 'Base',
      title: `Il viaggio in autostrada a velocità costante`,
      text: askSpeed
        ? `Un treno ad alta velocità percorre ${distance} chilometri in un tempo di ${hours} ore a velocità costante.`
        : askTime
        ? `Un'automobile viaggia a una velocità costante di ${speed} km/h per percorrere un tragitto di ${distance} km.`
        : `Un motociclista viaggia in autostrada alla velocità costante di ${speed} km/h per ${hours} ore.`,
      question: askSpeed
        ? `Qual è la velocità media del treno (in km/h)?`
        : askTime
        ? `Quante ore impiega l'automobile a compiere l'intero tragitto?`
        : `Quanti chilometri percorre in tutto il motociclista?`,
      correctAnswer: askSpeed ? speed : askTime ? hours : distance,
      unit: askSpeed ? 'km/h' : askTime ? 'ore' : 'km',
      hint1: `Formula fondamentale della cinematica del moto rettilineo uniforme: Spazio = Velocità × Tempo (s = v · t).`,
      hint2: askSpeed
        ? `Velocità = Spazio : Tempo (${distance} : ${hours}).`
        : askTime
        ? `Tempo = Spazio : Velocità (${distance} : ${speed}).`
        : `Spazio = ${speed} × ${hours}.`,
      solutionSteps: [
        askSpeed
          ? `Velocità v = s / t = ${distance} km : ${hours} h = ${speed} km/h`
          : askTime
          ? `Tempo t = s / v = ${distance} km : ${speed} km/h = ${hours} ore`
          : `Spazio s = v × t = ${speed} km/h × ${hours} h = ${distance} km`,
      ],
      barModel: {
        type: 'cinematica',
        labels: [`Velocità: ${speed} km/h`, `Tempo: ${hours} h`],
        note: `Legge oraria: s = v · t = ${distance} km`,
      },
    });
  }

  // 3. Geometria Solida: Parallelepipedo Rettangolo e Prisma (35 problemi)
  for (let i = 0; i < 35; i++) {
    const a = 6 + (i % 5) * 2; // spigolo base 1
    const b = 5 + (i % 4) * 2; // spigolo base 2
    const h = 8 + (i % 6) * 2; // altezza
    const areaBase = a * b;
    const volume = areaBase * h;
    const perimBase = (a + b) * 2;
    const areaLat = perimBase * h;
    const areaTot = areaLat + areaBase * 2;

    const askVolume = i % 2 === 0;

    problems.push({
      id: `p3m-${String(idCount++).padStart(3, '0')}`,
      gradeId: '3_media',
      gradeLabel: '3ª Media',
      topic: 'Geometria Solida: Prismi e Parallelepipedi',
      difficulty: 'Intermedio',
      title: `Il solido a forma di parallelepipedo rettangolo`,
      text: `Un blocco di marmo a forma di parallelepipedo rettangolo ha le dimensioni di base di ${a} cm e ${b} cm, e un'altezza di ${h} cm.`,
      question: askVolume
        ? `Qual è il volume del blocco di marmo (in cm³)?`
        : `Qual è la superficie totale del blocco (in cm²)?`,
      correctAnswer: askVolume ? volume : areaTot,
      unit: askVolume ? 'cm³' : 'cm²',
      hint1: askVolume
        ? `Il volume del parallelepipedo è dato dal prodotto delle tre dimensioni: a × b × h (oppure Area di Base × Altezza).`
        : `Superficie Totale = Superficie Laterale + 2 × Area di Base.`,
      hint2: askVolume
        ? `Calcola ${a} × ${b} × ${h}.`
        : `Area base = ${a} × ${b} = ${areaBase}. Perimetro base = 2 × (${a} + ${b}) = ${perimBase}. Sup. lat = ${perimBase} × ${h} = ${areaLat}.`,
      solutionSteps: [
        `Dimensioni: a = ${a} cm, b = ${b} cm, h = ${h} cm`,
        `Area di base Ab = ${a} × ${b} = ${areaBase} cm²`,
        askVolume
          ? `Volume V = Ab × h = ${areaBase} × ${h} = ${volume} cm³`
          : `Area Totale = ${areaLat} + 2 × ${areaBase} = ${areaTot} cm²`,
      ],
      barModel: {
        type: 'solido',
        labels: [`Base: ${a} × ${b} cm`, `Altezza: ${h} cm`],
        note: `V = Ab · h = ${volume} cm³ | Stot = ${areaTot} cm²`,
      },
    });
  }

  // 4. Geometria Solida: Cilindro e Solidi di Rotazione (35 problemi)
  for (let i = 0; i < 35; i++) {
    const r = 4 + (i % 5) * 2; // raggio base
    const h = 10 + (i % 6) * 2; // altezza
    // V = pi * r^2 * h
    const areaBase = Math.round(3.14 * r * r * 10) / 10;
    const volume = Math.round(3.14 * r * r * h * 10) / 10;

    problems.push({
      id: `p3m-${String(idCount++).padStart(3, '0')}`,
      gradeId: '3_media',
      gradeLabel: '3ª Media',
      topic: 'Geometria Solida: Cilindro e Solidi di Rotazione',
      difficulty: 'Intermedio',
      title: `Il serbatoio d'acqua cilindrico`,
      text: `Un serbatoio cilindrico ha un raggio di base di ${r} metri e un'altezza di ${h} metri (considera π ≈ 3,14).`,
      question: `Qual è la capienza volumetrica del cilindro (in m³)?`,
      correctAnswer: volume,
      unit: 'm³',
      hint1: `Il volume del cilindro è uguale all'Area di base per l'Altezza: V = π · r² · h.`,
      hint2: `Calcola prima l'area del cerchio di base (3,14 × ${r}² = ${areaBase}) e moltiplica per l'altezza ${h}.`,
      solutionSteps: [
        `Raggio r = ${r} m, Altezza h = ${h} m`,
        `Area di base Ab = π · r² = 3,14 × ${r * r} = ${areaBase} m²`,
        `Volume V = Ab × h = ${areaBase} × ${h} = ${volume} m³`,
      ],
      barModel: {
        type: 'solido',
        labels: [`Raggio base: ${r} m`, `Altezza: ${h} m`],
        note: `V = π · r² · h = ${volume} m³`,
      },
    });
  }

  // 5. Peso Specifico, Massa e Densità (35 problemi)
  for (let i = 0; i < 35; i++) {
    const materials = [
      { name: 'ferro', ps: 7.8 },
      { name: 'rame', ps: 8.9 },
      { name: 'alluminio', ps: 2.7 },
      { name: 'marmo', ps: 2.5 },
      { name: 'legno di quercia', ps: 0.8 },
    ];
    const mat = materials[i % materials.length];
    const volume = 10 + i * 5; // dm³
    const mass = Math.round(volume * mat.ps * 10) / 10; // kg

    problems.push({
      id: `p3m-${String(idCount++).padStart(3, '0')}`,
      gradeId: '3_media',
      gradeLabel: '3ª Media',
      topic: 'Peso Specifico, Massa e Volume',
      difficulty: 'Intermedio',
      title: `Massa e peso specifico di un blocco di ${mat.name}`,
      text: `Un blocco pieno di ${mat.name} ha un volume di ${volume} dm³. Sapendo che il peso specifico del ${mat.name} è pari a ${mat.ps} kg/dm³, calcola la massa del blocco.`,
      question: `Qual è la massa complessiva del blocco (in kg)?`,
      correctAnswer: mass,
      unit: 'kg',
      hint1: `La formula che lega massa, volume e peso specifico è: Massa = Volume × Peso Specifico (M = V · ps).`,
      hint2: `Moltiplica il volume (${volume} dm³) per il peso specifico (${mat.ps} kg/dm³).`,
      solutionSteps: [
        `Volume V = ${volume} dm³`,
        `Peso Specifico ps = ${mat.ps} kg/dm³`,
        `Massa = Volume × ps = ${volume} × ${mat.ps} = ${mass} kg`,
      ],
      barModel: {
        type: 'solido',
        labels: [`Volume: ${volume} dm³`, `Peso Specifico: ${mat.ps} kg/dm³`],
        note: `Massa = V · ps = ${mass} kg`,
      },
    });
  }

  // 6. Statistica e Probabilità di Base (25 problemi per completare a 200)
  for (let i = 0; i < 25; i++) {
    const isDice = i % 2 === 0;
    if (isDice) {
      // probabilità con urna di palline colorate
      const red = 4 + (i % 5);
      const blue = 6 + (i % 4);
      const green = 5 + (i % 3);
      const totalBalls = red + blue + green;
      // P(rossa) = red / total
      const pct = Math.round((red / totalBalls) * 100);

      problems.push({
        id: `p3m-${String(idCount++).padStart(3, '0')}`,
        gradeId: '3_media',
        gradeLabel: '3ª Media',
        topic: 'Statistica e Probabilità di Base',
        difficulty: 'Base',
        title: `L'estrazione casuale dall'urna di palline`,
        text: `In un'urna sono contenute ${red} palline rosse, ${blue} palline blu e ${green} palline verdi. Si estrae una pallina a caso.`,
        question: `Qual è il numero totale di casi possibili nell'estrazione (totale palline nell'urna)?`,
        correctAnswer: totalBalls,
        unit: 'palline',
        hint1: `I casi possibili corrispondono al numero totale di elementi contenuti nell'urna.`,
        hint2: `Somma le palline rosse (${red}), blu (${blue}) e verdi (${green}).`,
        solutionSteps: [
          `Casi favorevoli (rosse) = ${red}`,
          `Casi possibili = ${red} + ${blue} + ${green} = ${totalBalls}`,
          `Probabilità P = ${red}/${totalBalls} ≈ ${pct}%`,
        ],
        barModel: {
          type: 'parti_uguali',
          labels: [`Rosse (${red})`, `Blu (${blue})`, `Verdi (${green})`],
          unitValues: [red, blue, green],
          unitText: 'palline',
          totalLabel: `Totale = ${totalBalls}`,
        },
      });
    } else {
      // media aritmetica di 4 voti
      const v1 = 6 + (i % 4);
      const v2 = 7 + (i % 3);
      const v3 = 8 + (i % 3);
      const v4 = 9 - (i % 3);
      const sum = v1 + v2 + v3 + v4;
      const avg = Math.round((sum / 4) * 10) / 10;

      problems.push({
        id: `p3m-${String(idCount++).padStart(3, '0')}`,
        gradeId: '3_media',
        gradeLabel: '3ª Media',
        topic: 'Statistica e Probabilità di Base',
        difficulty: 'Base',
        title: `La media aritmetica delle verifiche di scienze`,
        text: `Durante il quadrimestre uno studente ha riportato nelle prove scritte di scienze i seguenti 4 voti: ${v1}, ${v2}, ${v3} e ${v4}.`,
        question: `Qual è la media aritmetica esatta dei suoi voti?`,
        correctAnswer: avg,
        unit: '',
        hint1: `La media aritmetica si ottiene sommando tutti i valori e dividendo per il loro numero (4).`,
        hint2: `Somma ${v1} + ${v2} + ${v3} + ${v4} = ${sum}, poi dividi per 4.`,
        solutionSteps: [
          `Somma voti = ${v1} + ${v2} + ${v3} + ${v4} = ${sum}`,
          `Numero prove = 4`,
          `Media = ${sum} : 4 = ${avg}`,
        ],
        barModel: {
          type: 'parti_uguali',
          labels: [`Voto 1: ${v1}`, `Voto 2: ${v2}`, `Voto 3: ${v3}`, `Voto 4: ${v4}`],
          unitValues: [v1, v2, v3, v4],
          totalLabel: `Somma = ${sum} | Media = ${avg}`,
        },
      });
    }
  }

  return problems;
}

// CACHE OF 1.000 PROBLEMS (200 per grade)
export const PROBLEMS_BY_GRADE: Record<GradeId, ProblemItem[]> = {
  '4_primaria': generateGrade4Problems(),
  '5_primaria': generateGrade5Problems(),
  '1_media': generateGrade1MediaProblems(),
  '2_media': generateGrade2MediaProblems(),
  '3_media': generateGrade3MediaProblems(),
};

export const ALL_PROBLEMS: ProblemItem[] = [
  ...PROBLEMS_BY_GRADE['4_primaria'],
  ...PROBLEMS_BY_GRADE['5_primaria'],
  ...PROBLEMS_BY_GRADE['1_media'],
  ...PROBLEMS_BY_GRADE['2_media'],
  ...PROBLEMS_BY_GRADE['3_media'],
];
