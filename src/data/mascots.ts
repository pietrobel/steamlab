import profSauroImg from '../assets/images/prof_sauro_mascot_1792934227759.jpg';
import profIpaziaImg from '../assets/images/prof_ipazia_math_1793040720170.jpg';
import profRitaImg from '../assets/images/prof_rita_tech_1793448204886.jpg';
import profAdaImg from '../assets/images/prof_ada_coding_1793040737533.jpg';
import leoImg from '../assets/images/student_male_mascot_1792934228385.jpg';
import miaImg from '../assets/images/student_female_mascot_1792934231526.jpg';
import heroTeamImg from '../assets/images/scienzalab_hero_team_1792934230733.jpg';
import { Subject } from '../types';

export type MascotId = 'sauro' | 'ipazia' | 'rita' | 'ada' | 'leo' | 'mia';

export interface Mascot {
  id: MascotId;
  name: string;
  role: string;
  species: string;
  isTeacher: boolean;
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
    role: 'Docente di Scienze & Fisica',
    species: 'Dinosauro Paleoscienziato',
    isTeacher: true,
    tagline: '«La scienza non è memorizzare formule, ma scoprire come funziona l\'Universo!»',
    avatar: profSauroImg,
    preferredSubject: 'scienze',
    favApps: ['sci-cinematica', 'sci-phet-leve', 'sci-food-quest'],
    quotes: [
      {
        text: 'Nel laboratorio di fisica PhET "Balancing Act" il fulcro è fisso al centro: per equilibrare l\'asta spostiamo gli oggetti a distanze diverse dal fulcro!',
        context: 'Fisica & Leve PhET',
      },
      {
        text: 'Niente paura per i problemi complessi: scomponeteli in segmenti semplici, proprio come facciamo con i fossili!',
        context: 'Consiglio Scientifico',
      },
      {
        text: 'Anche i dinosauri usavano la logica: il metodo sperimentale è l\'evoluzione moderna della curiosità umana!',
        context: 'Metodo Sperimentale',
      },
    ],
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    accentBorder: 'border-emerald-500/40 hover:border-emerald-400',
    bgGlow: 'from-emerald-500/10 to-teal-500/5',
  },
  {
    id: 'ipazia',
    name: 'Prof.ssa Ipazia',
    role: 'Docente di Matematica & Geometria',
    species: 'Lince Geometra & Logica',
    isTeacher: true,
    tagline: '«La matematica non è un labirinto di formule, ma la lente più limpida per cogliere l\'armonia delle forme!»',
    avatar: profIpaziaImg,
    preferredSubject: 'matematica',
    favApps: ['mat-maestro-problemi', 'mat-proprieta-operazioni', 'mat-geogebra-classico'],
    quotes: [
      {
        text: 'Davanti a un problema difficile non tentare calcoli a caso: disegna il modello a barre o una figura geometrica chiara!',
        context: 'Metodo delle Barre',
      },
      {
        text: 'La proprietà invariantiva e la proprietà distributiva sono due superpoteri che semplificano qualsiasi calcolo a mente.',
        context: 'Aritmetica Intelligente',
      },
      {
        text: 'Il Teorema di Pitagora non è solo un\'equazione: è la magia che lega le aree dei quadrati costruiti sui lati di ogni triangolo rettangolo.',
        context: 'Geometria Visiva',
      },
    ],
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    accentBorder: 'border-indigo-500/40 hover:border-indigo-400',
    bgGlow: 'from-indigo-500/10 to-purple-500/5',
  },
  {
    id: 'rita',
    name: 'Prof.ssa Rita',
    role: 'Docente di Tecnologia, Disegno & Energie',
    species: 'Civetta Ingegnere & Progettista',
    isTeacher: true,
    tagline: '«La tecnologia trasforma le leggi della scienza in soluzioni concrete per l\'umanità: dal disegno tecnico alle energie rinnovabili!»',
    avatar: profRitaImg,
    preferredSubject: 'tecnologia',
    favApps: ['tec-disegno-3d', 'tec-solidi-3d', 'tec-energia-rinnovabile', 'tec-circuiti-cc', 'tec-ponti-strutture'],
    quotes: [
      {
        text: 'Nelle proiezioni ortogonali guarda l\'oggetto con metodo: il Piano Orizzontale mostra la vista dall\'alto, il Piano Verticale il fronte e il Piano Laterale il profilo!',
        context: 'Disegno Tecnico & PO',
      },
      {
        text: 'Nelle strutture il triangolo è l\'unica figura geometrica indeformabile: ecco perché capriate, gru e ponti sono composti da reticoli triangolari!',
        context: 'Statica & Strutture',
      },
      {
        text: 'L\'energia solare fotovoltaica converte direttamente la radiazione luminosa in corrente elettrica continua: è la base della transizione ecologica.',
        context: 'Energie Rinnovabili',
      },
    ],
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    accentBorder: 'border-amber-500/40 hover:border-amber-400',
    bgGlow: 'from-amber-500/10 to-yellow-500/5',
  },
  {
    id: 'ada',
    name: 'Prof.ssa Ada',
    role: 'Docente di Informatica & Coding',
    species: 'Volpe Cybernetica',
    isTeacher: true,
    tagline: '«Non limitarti a usare le app: impara a crearle! Con il coding trasformi la logica in superpoteri digitali.»',
    avatar: profAdaImg,
    preferredSubject: 'informatica',
    favApps: ['inf-coding-adventure', 'inf-scratch', 'inf-bebras', 'inf-tinkercad'],
    quotes: [
      {
        text: 'Un bug non è un fallimento: è un prezioso indizio che ti mostra esattamente dove il computer ha interpretato diversamente la tua istruzione!',
        context: 'L\'Arte del Debugging',
      },
      {
        text: 'Prima di scrivere blocchi o codice, ragiona sul flusso logico: quali sono gli input, le condizioni e le ripetizioni necessarie?',
        context: 'Pensiero Computazionale',
      },
      {
        text: 'Nei circuiti di Tinkercad o nelle sfide di Coding Adventure, procedi a piccoli passi verificando il risultato ad ogni comando!',
        context: 'Coding & Robotica',
      },
    ],
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    accentBorder: 'border-cyan-500/40 hover:border-cyan-400',
    bgGlow: 'from-cyan-500/10 to-blue-500/5',
  },
  {
    id: 'leo',
    name: 'Leo',
    role: 'Studente Esploratore (2ª Media)',
    species: 'Volpe Curiosa',
    isTeacher: false,
    tagline: '«Amo capire come si muovono le cose, i pianeti e l\'equilibrio delle forze!»',
    avatar: leoImg,
    preferredSubject: 'scienze',
    favApps: ['sci-cinematica', 'sci-phet-leve', 'sci-alimentazione'],
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
    isTeacher: false,
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

export interface SauroTip {
  id: number;
  text: string;
  category: 'Matematica' | 'Geometria' | 'Fisica' | 'Chimica' | 'Biologia' | 'Informatica' | 'Metodo';
  title: string;
}

export const PROF_SAURO_50_TIPS: SauroTip[] = [
  {
    id: 1,
    title: 'Leve PhET e Fulcro Fisso',
    category: 'Fisica',
    text: 'Nel laboratorio di fisica PhET "Balancing Act" il fulcro è fisso al centro: per equilibrare l\'asta dobbiamo spostare gli oggetti a distanze diverse. La legge dell\'equilibrio dice che Forza × Braccio deve essere uguale da entrambi i lati!',
  },
  {
    id: 2,
    title: 'Frazioni a Colpo d\'Occhio',
    category: 'Matematica',
    text: 'Quando affronti un problema con le frazioni, disegna sempre una barra rettangolare divisa in parti uguali: l\'occhio percepisce subito le proporzioni che la mente fatica a calcolare al buio!',
  },
  {
    id: 3,
    title: 'Grafico Spazio-Tempo',
    category: 'Fisica',
    text: 'Nel moto rettilineo uniforme (MRU), la pendenza della retta nel grafico Spazio-Tempo corrisponde esattamente alla velocità: più la retta è ripida, più il corpo si sposta velocemente!',
  },
  {
    id: 4,
    title: 'Regola d\'Oro delle Macchine Semplici',
    category: 'Fisica',
    text: 'Nelle leve e nelle macchine semplici il lavoro non si regala: raddoppiando il braccio della forza motrice rispetto al fulcro, dimezzi lo sforzo necessario per equilibrare il carico!',
  },
  {
    id: 5,
    title: 'Somma e Differenza con i Segmenti',
    category: 'Matematica',
    text: 'Hai la somma e la differenza di due quantità incognite? Fai (Somma - Differenza) : 2 per trovare il valore minore, poi aggiungi la differenza per ottenere il maggiore!',
  },
  {
    id: 6,
    title: 'I Tre Nutrienti Chiave',
    category: 'Biologia',
    text: 'La nutrizione è chimica applicata: i carboidrati sono il carburante immediato, le proteine i mattoncini per costruire muscoli e tessuti, e le vitamine i catalizzatori dei processi vitali!',
  },
  {
    id: 7,
    title: 'Massa contro Peso',
    category: 'Fisica',
    text: 'Non confondere mai massa e peso! La massa misura la quantità di materia (kg) ed è uguale sulla Terra come sulla Luna; il peso è una forza (Newton) e dipende dall\'accelerazione di gravità!',
  },
  {
    id: 8,
    title: 'Il Segreto di Pitagora',
    category: 'Geometria',
    text: 'Nel Teorema di Pitagora l\'ipotenusa è sempre opposta all\'angolo retto ed è il lato maggiore: la somma delle aree dei quadrati costruiti sui cateti è uguale all\'area del quadrato costruito sull\'ipotenusa!',
  },
  {
    id: 9,
    title: 'Decomposizione nel Coding',
    category: 'Informatica',
    text: 'Quando scrivi un algoritmo in Scratch o Blockly, dividi la missione in blocchi elementari: questa tecnica fondamentale degli ingegneri si chiama "decomposizione computazionale"!',
  },
  {
    id: 10,
    title: 'Accelerazione e Spazio',
    category: 'Fisica',
    text: 'Nel moto uniformemente accelerato (MRUA), la velocità aumenta regolarmente, ma lo spazio percorso cresce con il quadrato del tempo: raddoppiando il tempo di frenata, lo spazio quadruplica!',
  },
  {
    id: 11,
    title: 'Densità e Galleggiamento',
    category: 'Chimica',
    text: 'La densità è il rapporto massa/volume (d = m/V). Il ferro affonda nell\'acqua perché ha una densità di circa 7,8 g/cm³, mentre il legno con densità 0,6 g/cm³ galleggia!',
  },
  {
    id: 12,
    title: 'Proporzioni e Catene Logiche',
    category: 'Matematica',
    text: 'In qualsiasi proporzione A : B = C : D, il prodotto dei medi (B × C) è sempre identico al prodotto degli estremi (A × D). Con questa proprietà ricavi qualsiasi termine incognito!',
  },
  {
    id: 13,
    title: 'Il Numero Magico Pi Greco',
    category: 'Geometria',
    text: 'Il Pi Greco (π ≈ 3,14159) non è una formula astratta: è il rapporto fisso tra la lunghezza di qualsiasi circonferenza e il suo diametro, da una monetina al pianeta Giove!',
  },
  {
    id: 14,
    title: 'Galileo e la Caduta dei Gravi',
    category: 'Fisica',
    text: 'Nel vuoto tutti i corpi cadono con la stessa identica accelerazione (g ≈ 9,81 m/s²), indipendentemente dalla loro massa, come dimostrò Galileo Galilei superando le convinzioni aristoteliche!',
  },
  {
    id: 15,
    title: 'Percentuali a Mente',
    category: 'Matematica',
    text: 'Per calcolare al volo il 20% di una cifra, trova prima il 10% spostando la virgola a sinistra di una posizione, poi raddoppia il risultato: un trucco infallibile per gli sconti nei negozi!',
  },
  {
    id: 16,
    title: 'Acqua e Concentrazione',
    category: 'Biologia',
    text: 'Il nostro corpo è fatto per circa il 65-70% d\'acqua: bere regolarmente aiuta i neuroni a trasmettere i segnali elettrici e migliora i riflessi logici durante i test scientifici!',
  },
  {
    id: 17,
    title: 'Criterio di Divisibilità per 3',
    category: 'Matematica',
    text: 'Un numero è divisibile per 3 se la somma di tutte le sue cifre è un multiplo di 3. Esempio per 438: 4 + 3 + 8 = 15, e 15 è nella tabellina del 3, quindi 438 è divisibile per 3!',
  },
  {
    id: 18,
    title: 'Legge di Lavoisier',
    category: 'Chimica',
    text: 'Nulla si crea, nulla si distrugge, tutto si trasforma: in una reazione chimica la massa totale delle sostanze di partenza è rigorosamente uguale alla massa totale dei prodotti finali!',
  },
  {
    id: 19,
    title: 'Velocità della Luce',
    category: 'Fisica',
    text: 'La luce viaggia nel vuoto a ben 300.000 chilometri al secondo: i fotoni emessi dalla superficie del Sole impiegano poco più di 8 minuti per raggiungere i nostri occhi sulla Terra!',
  },
  {
    id: 20,
    title: 'MCD per Suddividere',
    category: 'Matematica',
    text: 'Usa il Massimo Comune Divisore (MCD) quando un problema ti chiede di raggruppare oggetti diversi in confezioni uguali con il massimo numero di elementi possibile senza avanzi!',
  },
  {
    id: 21,
    title: 'mcm per Incontri Periodici',
    category: 'Matematica',
    text: 'Usa il minimo comune multiplo (mcm) quando devi calcolare tra quanti giorni o secondi due eventi ciclici (come due campane, due navette o due semafori) accadranno insieme di nuovo!',
  },
  {
    id: 22,
    title: 'Calore Latente e Passaggi di Stato',
    category: 'Chimica',
    text: 'Mentre il ghiaccio fonde in acqua a 0°C, la temperatura non sale fino a quando l\'ultimo cubetto non si è sciolto: il calore fornito serve a rompere i legami reticolari cristallini!',
  },
  {
    id: 23,
    title: 'Somma Angoli di un Triangolo',
    category: 'Geometria',
    text: 'La somma degli angoli interni di qualsiasi triangolo piano è sempre uguale a 180°: se conosci due angoli, basta sottrarli da 180° per scoprire il terzo istantaneamente!',
  },
  {
    id: 24,
    title: 'Conversione km/h in m/s',
    category: 'Fisica',
    text: 'Per passare da km/h a metri al secondo si divide per 3,6! Un\'auto che viaggia a 72 km/h sta percorrendo esattamente 20 metri in ogni singolo secondo!',
  },
  {
    id: 25,
    title: 'La Piramide della Dieta Mediterranea',
    category: 'Biologia',
    text: 'Alla base della piramide alimentare troviamo l\'attività fisica, tanta acqua, verdura, frutta e cereali integrali; in cima, da consumare con moderazione, ci sono zuccheri raffinati e grassi saturi!',
  },
  {
    id: 26,
    title: 'Pitagora nel Rombo',
    category: 'Geometria',
    text: 'Le due diagonali di un rombo sono perpendicolari e si dimezzano a vicenda: formano 4 triangoli rettangoli i cui cateti sono le semidiagonali e l\'ipotenusa è il lato del rombo!',
  },
  {
    id: 27,
    title: 'Priorità delle Operazioni',
    category: 'Matematica',
    text: 'In un\'espressione senza parentesi, moltiplicazioni e divisioni hanno sempre la precedenza su addizioni e sottrazioni; se ci sono parentesi, si risolvono prima le tonde, poi le quadre e infine le graffe!',
  },
  {
    id: 28,
    title: 'Divisione per Zero',
    category: 'Matematica',
    text: 'Mentre 0 diviso qualsiasi numero fa 0, dividere un numero per 0 è privo di significato matematico (impossibile), perché nessun numero moltiplicato per 0 può dare un valore diverso da zero!',
  },
  {
    id: 29,
    title: 'La Struttura dell\'Atomo',
    category: 'Chimica',
    text: 'L\'atomo ha un nucleo centrale denso formato da protoni (positivi) e neutroni (neutri), circondato da una nube di elettroni (negativi) leggeri che ruotano a velocità impressionanti!',
  },
  {
    id: 30,
    title: 'Velocità Media Reale',
    category: 'Fisica',
    text: 'Attenzione: la velocità media non è la media matematica delle velocità! Si calcola rigorosamente come Spazio Totale diviso Tempo Totale (v_med = Δs / Δt)!',
  },
  {
    id: 31,
    title: 'Peso Specifico dei Materiali',
    category: 'Fisica',
    text: 'Il peso specifico indica il peso dell\'unità di volume: se un decimetro cubo d\'acqua pesa 1 kg, lo stesso decimetro cubo d\'oro pesa ben 19,3 kg!',
  },
  {
    id: 32,
    title: 'Principio di Equivalenza nelle Equazioni',
    category: 'Matematica',
    text: 'Un\'equazione è come una bilancia a due piatti: puoi aggiungere o togliere la stessa quantità da entrambi i lati senza alterare l\'equilibrio per isolare la tua incognita x!',
  },
  {
    id: 33,
    title: 'Forbici: Leva di 1° Genere',
    category: 'Fisica',
    text: 'Le forbici hanno il fulcro nel perno centrale, tra la forza motrice impressa dalla mano e la resistenza del materiale da tagliare: sono leve vantaggiose o svantaggiose in base alla lunghezza delle lame!',
  },
  {
    id: 34,
    title: 'Carriola: Leva Sempre Vantaggiosa',
    category: 'Fisica',
    text: 'Nella carriola il carico (resistenza) si trova in mezzo tra la ruota anteriore (fulcro) e le impugnature (forza motrice): essendo di 2° genere, è sempre vantaggiosa per la schiena!',
  },
  {
    id: 35,
    title: 'Pinzette: Precisione di 3° Genere',
    category: 'Fisica',
    text: 'Nelle pinzette la forza motrice delle dita si applica in mezzo tra il punto d\'unione posteriore (fulcro) e le punte: sono leve di 3° genere, sempre svantaggiose in forza ma perfette per la massima precisione!',
  },
  {
    id: 36,
    title: 'I Giganti del Sistema Solare',
    category: 'Fisica',
    text: 'Giove possiede una massa pari a due volte e mezzo quella di tutti gli altri pianeti del sistema solare sommati insieme, e la sua celebre Grande Macchia Rossa è una tempesta attiva da secoli!',
  },
  {
    id: 37,
    title: 'Potenze con Base Uguale',
    category: 'Matematica',
    text: 'Per moltiplicare due potenze con la stessa base mantieni la base e sommi gli esponenti (a³ × a² = a⁵); per dividerle sottrai gli esponenti (a⁵ : a² = a³)!',
  },
  {
    id: 38,
    title: 'Geometria Solida: Formule dei Volumi',
    category: 'Geometria',
    text: 'Il volume di qualsiasi prisma retto o cilindro è Area di Base per Altezza (V = Ab × h); per le piramidi e i coni si divide per 3 perché occupano un terzo del volume del rispettivo prisma!',
  },
  {
    id: 39,
    title: 'Cristalli e Geometria Naturale',
    category: 'Chimica',
    text: 'I minerali in natura assumono forme poliedriche perfette grazie alla disposizione periodica degli atomi: il salgemma (sale da cucina) cristallizza in cubi millimetrici perfetti!',
  },
  {
    id: 40,
    title: 'Cosa Fare Davanti a un Bug',
    category: 'Informatica',
    text: 'Quando un programma non funziona al primo colpo, non cancellare tutto! Fai "dry-run": segui le istruzioni riga per riga con carta e penna annotando il valore di ogni variabile ad ogni passo!',
  },
  {
    id: 41,
    title: 'Area del Trapezio Visiva',
    category: 'Geometria',
    text: 'Perché l\'area del trapezio è [(Base maggiore + Base minore) × Altezza] : 2? Perché affiancando un trapezio identico capovolto ottieni un grande parallelogramma con base uguale alla somma delle due basi!',
  },
  {
    id: 42,
    title: 'Pressione e Superficie di Contatto',
    category: 'Fisica',
    text: 'La pressione è Forza / Superficie. Sugli sci galleggiamo sulla neve soffice perché il nostro peso si distribuisce su un\'ampia superficie, mentre a piedi sprofonderemmo subito!',
  },
  {
    id: 43,
    title: 'Composizione dell\'Aria',
    category: 'Chimica',
    text: 'Contrariamente a quanto si crede, l\'atmosfera terrestre non è fatta solo di ossigeno: è composta per circa il 78% da azoto molecolare, per il 21% da ossigeno e per l\'1% da argon, CO2 e vapori!',
  },
  {
    id: 44,
    title: 'Il Metodo Sperimentale Galileiano',
    category: 'Metodo',
    text: 'Osservazione del fenomeno, formulazione dell\'ipotesi, esperimento in condizioni controllate, raccolta dati e legge matematica: questo ciclo è il motore di tutto il progresso umano!',
  },
  {
    id: 45,
    title: 'Angoli Alterni Interni',
    category: 'Geometria',
    text: 'Quando due rette parallele sono intersecate da una trasversale, formano angoli alterni interni congruenti: se ne conosci uno, ricavi tutti gli 8 angoli per simmetria!',
  },
  {
    id: 46,
    title: 'La Pompa Cardiaca',
    category: 'Biologia',
    text: 'Il muscolo cardiaco lavora senza mai fermarsi: compie circa 100.000 battiti ogni giorno spingendo sangue ossigenato verso ogni singola cellula del nostro organismo!',
  },
  {
    id: 47,
    title: 'La Compravendita Commerciale',
    category: 'Matematica',
    text: 'Nei problemi di economia pratica: Ricavo = Spesa + Guadagno. Se vendi a un prezzo inferiore a quanto hai speso per produrre o comprare, avrai una Perdita = Spesa - Ricavo!',
  },
  {
    id: 48,
    title: 'Verifica della Plausibilità',
    category: 'Metodo',
    text: 'Dopo aver calcolato il risultato di un problema, chiediti sempre: "Ha senso nella vita reale?". Se una bicicletta risulta viaggiare a 800 km/h o un sacchetto pesa 50 tonnellate, c\'è un errore nelle unità!',
  },
  {
    id: 49,
    title: 'La Tavola Periodica di Mendeleev',
    category: 'Chimica',
    text: 'Mendeleev intuì la periodicità chimica lasciando caselle vuote per elementi che non erano ancora stati scoperti: la tavola moderna ordina gli elementi per numero crescente di protoni!',
  },
  {
    id: 50,
    title: 'Il Valore dell\'Errore',
    category: 'Metodo',
    text: 'Sbagliare un calcolo o un esperimento non è un fallimento: è una bussola che ti segnala esattamente quale passaggio necessita di maggiore chiarezza e attenzione!',
  },
  {
    id: 51,
    title: 'Percentuale come Frazione Decimale',
    category: 'Matematica',
    text: 'Ogni percentuale è una frazione con denominatore 100: il 25% equivale a 25/100, ovvero esattamente a un quarto (1/4); il 50% alla metà esatta (1/2)!',
  },
  {
    id: 52,
    title: 'Energia Cinetica e Velocità',
    category: 'Fisica',
    text: 'L\'energia cinetica di un corpo in movimento dipende dal quadrato della velocità (Ek = ½ m v²): se raddoppi la velocità della tua bicicletta, la tua energia cinetica si quadruplica!',
  },
  {
    id: 53,
    title: 'Similitudine e Rapporto di Scala',
    category: 'Geometria',
    text: 'Se due figure geometriche sono simili con rapporto di scala k tra i lati corrispondenti, il rapporto tra i loro perimetri è k, ma il rapporto tra le loro aree è k²!',
  },
  {
    id: 54,
    title: 'Pensiero Computazionale e Variabili',
    category: 'Informatica',
    text: 'Una variabile nella programmazione è come una scatola etichettata: può contenere un numero, una parola o un valore logico (vero/falso), e il suo contenuto può essere aggiornato durante l\'esecuzione!',
  },
];

export interface TeacherTip {
  id: number;
  title: string;
  category: string;
  text: string;
}

export const PROF_IPAZIA_TIPS: TeacherTip[] = [
  {
    id: 1,
    title: 'Modello a Barre: Somma e Differenza',
    category: 'Metodo & Problemi',
    text: 'Quando conosci la somma e la differenza di due quantità, disegna due barre: togliendo la differenza dalla somma ottieni due segmenti identici. Dividi per 2 e trovi il minore!',
  },
  {
    id: 2,
    title: 'Proprietà Invariantiva',
    category: 'Aritmetica',
    text: 'Aggiungendo o sottraendo lo stesso numero a entrambi i termini di una sottrazione, la differenza resta identica (es. 73 - 28 = 75 - 30 = 45): è la scorciatoia per i calcoli mentali rapidi!',
  },
  {
    id: 3,
    title: 'Proprietà Distributiva nel Calcolo Veloce',
    category: 'Aritmetica',
    text: 'Per calcolare 17 × 8 a mente, scompone 17 in (10 + 7): calcola (10 × 8) + (7 × 8) = 80 + 56 = 136. La moltiplicazione si distribuisce sull\'addizione!',
  },
  {
    id: 4,
    title: 'Frazioni Complementari',
    category: 'Frazioni',
    text: 'Due frazioni sono complementari se la loro somma forma l\'intero (1). Se hai letto i 3/7 di un libro, ti restano da leggere esattamente i 4/7 delle pagine!',
  },
  {
    id: 5,
    title: 'Le Terne Pitagoriche Famose',
    category: 'Geometria',
    text: 'Ricorda a memoria le terne pitagoriche fondamentali: (3, 4, 5), (5, 12, 13) e (8, 15, 17) con tutti i loro multipli. Risolvi i problemi sui triangoli rettangoli in 3 secondi!',
  },
  {
    id: 6,
    title: 'Perché l\'Area del Cerchio è π × r²',
    category: 'Geometria',
    text: 'Immagina di tagliare una pizza in tantissimi spicchi sottili e incastrarli alternati: formano un parallelogramma con altezza pari al raggio (r) e base pari a metà circonferenza (π × r)!',
  },
  {
    id: 7,
    title: 'Regola del Trasporto nelle Equazioni',
    category: 'Algebra',
    text: 'In un\'equazione puoi spostare un termine da un membro all\'altro purché cambi il suo segno: è una diretta conseguenza del primo principio di equivalenza (togliere o aggiungere la stessa quantità)!',
  },
  {
    id: 8,
    title: 'Criterio di Divisibilità per 9',
    category: 'Aritmetica',
    text: 'Come per il 3, un numero è divisibile per 9 se la somma delle sue cifre è un multiplo di 9. Esempio per 765: 7 + 6 + 5 = 18, e 18 è 9 × 2, quindi 765 è divisibile per 9!',
  },
  {
    id: 9,
    title: 'La Regola del Tre Semplice',
    category: 'Proporzioni',
    text: 'Nelle proporzioni dirette (più compri, più spendi), imposta la proporzione a frecce concordi. Nelle proporzioni inverse (più operai lavorano, meno tempo impiegano), il prodotto resta costante!',
  },
  {
    id: 10,
    title: 'Media, Mediana e Moda',
    category: 'Statistica',
    text: 'La media è la somma divisa per il numero dei dati; la moda è il valore che compare più spesso; la mediana è il valore che si trova esattamente al centro dopo aver ordinato i dati in ordine crescente!',
  },
  {
    id: 11,
    title: 'Apotema e Poligoni Regolari',
    category: 'Geometria',
    text: 'L\'apotema è il raggio della circonferenza inscritta nel poligono: l\'area di qualsiasi poligono regolare si ottiene facendo (Perimetro × Apotema) : 2!',
  },
  {
    id: 12,
    title: 'Frazioni Proprie, Improprie e Apparenti',
    category: 'Frazioni',
    text: 'Una frazione è propria se il numeratore è minore del denominatore (< 1), impropria se è maggiore (> 1), apparente se il numeratore è un multiplo esatto del denominatore (vale un numero intero)!',
  },
  {
    id: 13,
    title: 'I Segni nei Numeri Relativi',
    category: 'Algebra',
    text: 'Nella moltiplicazione e divisione tra numeri interi relativi: segni concordi danno sempre Più (+), segni discordi danno sempre Meno (-). "Il nemico del mio nemico è mio amico"!',
  },
  {
    id: 14,
    title: 'Numeri Primi Gemelli',
    category: 'Aritmetica',
    text: 'Due numeri primi si dicono gemelli se differiscono solo di 2 unità, come (3, 5), (11, 13), (17, 19) o (41, 43): affascinano i matematici da oltre duemila anni!',
  },
  {
    id: 15,
    title: 'Diagonali di un Poligono',
    category: 'Geometria',
    text: 'Quante diagonali ha un poligono di n lati? La formula esatta è [n × (n - 3)] : 2. Un pentagono ne ha 5, un esagono ne ha 9, un ottagono ne ha ben 20!',
  },
  {
    id: 16,
    title: 'Percentuale di Sconto Reale',
    category: 'Matematica Quotidiana',
    text: 'Se un capo costa 60€ con il 30% di sconto, non serve calcolare lo sconto e poi sottrarlo: calcola direttamente il 70% di 60€ (60 × 0,7 = 42€) in un solo passaggio!',
  },
  {
    id: 17,
    title: 'Il Secondo Teorema di Euclide',
    category: 'Geometria',
    text: 'In un triangolo rettangolo, il quadrato costruito sull\'altezza relativa all\'ipotenusa è equivalente al rettangolo che ha per dimensioni le proiezioni dei due cateti sull\'ipotenusa!',
  },
  {
    id: 18,
    title: 'La Notazione Scientifica',
    category: 'Aritmetica',
    text: 'Per gestire numeri giganteschi come le distanze astronomiche usiamo la forma a × 10ⁿ, con "a" compreso tra 1 e 10. La distanza Terra-Sole di 150 milioni di km si scrive 1,5 × 10⁸ km!',
  },
  {
    id: 19,
    title: 'Calcolo Letterale: Monomi Simili',
    category: 'Algebra',
    text: 'Puoi sommare o sottrarre tra loro solo monomi che hanno la stessa identica parte letterale: 3a²b + 5a²b = 8a²b, ma 3a²b + 2ab² non si possono sommare!',
  },
  {
    id: 20,
    title: 'I Cinque Poliedri Platonici',
    category: 'Geometria Solida',
    text: 'Nello spazio esistono solo 5 solidi regolari perfetti: Tetraedro (4 facce), Cubo (6 facce), Ottaedro (8 facce), Dodecaedro (12 facce) e Icosaedro (20 facce)!',
  },
];

export const PROF_ADA_TIPS: TeacherTip[] = [
  {
    id: 1,
    title: 'Cos\'è un Algoritmo',
    category: 'Algoritmi',
    text: 'Un algoritmo è una sequenza finita, ordinata e non ambigua di istruzioni che, eseguite passo dopo passo, portano alla risoluzione di un problema o al compimento di un compito.',
  },
  {
    id: 2,
    title: 'Il Potere delle Variabili',
    category: 'Coding Base',
    text: 'Pensa a una variabile come a una scatola etichettata con un nome (es. "punteggio", "vite", "risposta"). Puoi leggere cosa contiene, cambiare il valore o aumentarlo durante il gioco!',
  },
  {
    id: 3,
    title: 'Cicli: Ripetere Senza Fatica',
    category: 'Strutture di Controllo',
    text: 'Invece di scrivere 100 volte "fai un passo", usa un blocco "Ripeti 100 volte". Il computer è velocissimo ed instancabile nelle operazioni ripetitive: questo è il superpotere del loop!',
  },
  {
    id: 4,
    title: 'Decisioni Logiche (If - Else)',
    category: 'Logica Booleana',
    text: 'Con i blocchi condizionali "Se... allora... altrimenti" il programma prende decisioni: "Se vite = 0 allora Game Over, altrimenti continua il livello"!',
  },
  {
    id: 5,
    title: 'L\'Origine del termine "Bug"',
    category: 'Storia dell\'Informatica',
    text: 'Nel 1947 la pioniera Grace Hopper trovò una vera falena (bug) incastrata tra i relè del computer Mark II a Harvard, bloccando i circuiti. Da allora cerchiamo ed eliminiamo i bug!',
  },
  {
    id: 6,
    title: 'Pixel e Risoluzione',
    category: 'Grafica Digitale',
    text: 'Ogni immagine sullo schermo è composta da una griglia di minuscoli quadratini luminosi detti pixel: una risoluzione Full HD 1920×1080 significa oltre 2 milioni di pixel controllati istante per istante!',
  },
  {
    id: 7,
    title: 'Il Linguaggio Segreto dei Computer: Il Binario',
    category: 'Architettura',
    text: 'I microchip riconoscono solo due stati elettrici: passaggio di corrente (1) o assenza di corrente (0). Con combinazioni di soli 0 e 1 (bit) possiamo codificare numeri, lettere, foto e musica!',
  },
  {
    id: 8,
    title: 'Messaggi Broadcast in Scratch',
    category: 'Coding con Blocchi',
    text: 'Usa "invia a tutti messaggio" per coordinare diversi personaggi: quando il pulsante Start viene premuto, trasmette il messaggio e tutti i personaggi si attivano insieme!',
  },
  {
    id: 9,
    title: 'Coordinate Cartesiane nei Videogiochi',
    category: 'Game Design',
    text: 'Sul palco di Scratch il centro ha coordinate (x: 0, y: 0). Se il personaggio si sposta a destra aumenta la X, se va a sinistra diminuisce; se salta in alto aumenta la Y, se scende diminuisce!',
  },
  {
    id: 10,
    title: 'Gravità Simulata',
    category: 'Fisica nel Coding',
    text: 'Per far saltare un personaggio in modo realistico, crea una variabile "velocità Y": quando salta impostala a +15, poi in un ciclo continuo riducila di 1 ogni frazione di secondo (accelerazione di gravità)!',
  },
  {
    id: 11,
    title: 'Password Forti e Cibersicurezza',
    category: 'Sicurezza Digitale',
    text: 'Una password sicura deve contenere almeno 12 caratteri con lettere maiuscole, minuscole, numeri e simboli speciali: evita date di nascita o nomi propri che i bot scoprono in frazioni di secondo!',
  },
  {
    id: 12,
    title: 'Sensori e Attuatori nella Robotica',
    category: 'Robotica & IoT',
    text: 'I sensori sono i "sensi" del robot (sensore di distanza a ultrasuoni, sensore di luce, termometro); gli attuatori sono i suoi "muscoli" (motori, servomotori, buzzer, luci LED)!',
  },
  {
    id: 13,
    title: 'Funzioni e Principio DRY',
    category: 'Ingegneria del Software',
    text: 'DRY sta per "Don\'t Repeat Yourself": se devi fare la stessa operazione in più punti del programma, racchiudila in un blocco personalizzato (funzione) e richiamalo al momento opportuno!',
  },
  {
    id: 14,
    title: 'Operatori Logici AND, OR, NOT',
    category: 'Logica Booleana',
    text: 'AND richiede che entrambe le condizioni siano vere per attivarsi; OR si attiva se almeno una è vera; NOT inverte il risultato (vero diventa falso e viceversa)!',
  },
  {
    id: 15,
    title: 'Il Pensiero Computazionale Quotidiano',
    category: 'Metodo',
    text: 'Il pensiero computazionale non serve solo per programmare: ti allena a trovare pattern comuni, ignorare i dettagli irrilevanti (astrazione) e pianificare strategie efficaci per qualsiasi studio!',
  },
  {
    id: 16,
    title: 'Come Funziona il Web: Client e Server',
    category: 'Reti & Internet',
    text: 'Quando scrivi un indirizzo nel browser, il tuo computer (Client) invia una richiesta attraverso la rete a un computer remoto (Server) che custodisce la pagina web e te la restituisce in millisecondi!',
  },
  {
    id: 17,
    title: 'Circuiti Virtuali su Tinkercad',
    category: 'Makers & Elettronica',
    text: 'Ricorda sempre di inserire una resistenza (es. da 220 Ohm o 330 Ohm) in serie con il LED prima di collegarlo alla batteria: senza resistenza troppa corrente attraverserebbe il diodo rischiando di bruciarlo!',
  },
  {
    id: 18,
    title: 'Liste e Array: Lo Scaffale dei Dati',
    category: 'Strutture Dati',
    text: 'Una lista è una collezione ordinata di elementi. Puoi memorizzare la classifica dei punteggi, l\'inventario degli oggetti raccolti in un gioco o l\'elenco delle parole di un quiz!',
  },
  {
    id: 19,
    title: 'Intelligenza Artificiale: Dati ed Esempi',
    category: 'AI & Machine Learning',
    text: 'I modelli di machine learning imparano riconoscendo regolarità statistiche in milioni di esempi: la qualità e l\'accuratezza dell\'AI dipendono direttamente dalla qualità dei dati su cui è stata allenata!',
  },
  {
    id: 20,
    title: 'La Visione di Ada Lovelace',
    category: 'Ispirazione STEM',
    text: 'Nel 1843 Ada Lovelace intuì che la Macchina Analitica di Babbage non avrebbe manipolato solo numeri, ma qualsiasi entità trasformabile in simboli (persino la musica e l\'arte): è la madre di tutti i computer!',
  },
];

export const PROF_RITA_TIPS: TeacherTip[] = [
  {
    id: 1,
    title: 'I Tre Piani delle Proiezioni Ortogonali',
    category: 'Disegno Tecnico',
    text: 'Nelle proiezioni ortogonali (PO, PV, PL) immaginiamo l\'oggetto racchiuso in un triedro: dall\'alto proietti sul Piano Orizzontale, di fronte sul Piano Verticale e di lato sul Piano Laterale. La linea di terra (LT) separa il sopra dal sotto!',
  },
  {
    id: 2,
    title: 'Assonometria Isometrica vs Cavaliera',
    category: 'Disegno Tecnico',
    text: 'Nell\'assonometria isometrica gli assi x e y formano entrambi un angolo di 30° con l\'orizzontale (misure reali sui 3 assi); nella cavaliera l\'asse z è a 45° e la profondità si dimezza (rapporto 1:2) per non deformare la vista!',
  },
  {
    id: 3,
    title: 'Scale di Riduzione e Ingrandimento',
    category: 'Disegno Tecnico',
    text: 'Una scala 1:50 significa che 1 centimetro disegnato sul foglio corrisponde a 50 cm nella realtà. Per oggetti microscopici usiamo scale di ingrandimento come 5:1 (5 cm sul foglio per 1 cm reale)!',
  },
  {
    id: 4,
    title: 'La Capriata e l\'Indeformabilità del Triangolo',
    category: 'Strutture ed Edilizia',
    text: 'Se spingi sui vertici di un quadrilatero, questo si deforma in un romboide. Se invece colleghi tre aste a triangolo, la figura è geometricamente rigida e indeformabile: ecco il segreto delle capriate dei tetti e delle gru da cantiere!',
  },
  {
    id: 5,
    title: 'Forze Strutturali: Trazione e Compressione',
    category: 'Ingegneria & Ponti',
    text: 'Nei ponti sospesi i cavi d\'acciaio lavorano a trazione (vengono tirati e allungati), mentre i massicci piloni verticali lavorano a compressione (vengono schiacciati verso le fondamenta)!',
  },
  {
    id: 6,
    title: 'Energia Solare: Fotovoltaico vs Termico',
    category: 'Energie Rinnovabili',
    text: 'Non confonderli mai! I pannelli fotovoltaici contengono celle di silicio che trasformano la luce direttamente in elettroni (elettricità); i pannelli solari termici scaldano un fluido per produrre acqua calda sanitaria!',
  },
  {
    id: 7,
    title: 'La Portanza delle Pale Eoliche',
    category: 'Energie Rinnovabili',
    text: 'Le pale delle turbine eoliche moderne non funzionano a "spinta" come i vecchi mulini, ma per "portanza" aerodinamica, proprio come l\'ala di un aereo. Questo garantisce un rendimento energetico altissimo anche con brezze leggere!',
  },
  {
    id: 8,
    title: 'Il Ciclo di Vita (LCA) e l\'Alluminio Infinito',
    category: 'Materiali & Riciclo',
    text: 'L\'alluminio è un materiale magico: può essere riciclato all\'infinito senza perdere le sue proprietà meccaniche, e riciclarlo richiede il 95% in meno di energia rispetto all\'estrazione dalla bauxite!',
  },
  {
    id: 9,
    title: 'La Legge di Ohm (V = R × I)',
    category: 'Elettrotecnica',
    text: 'La tensione (Volt) è la "forza" che spinge gli elettroni, la corrente (Ampere) è la quantità di elettroni che scorre, e la resistenza (Ohm) è l\'ostacolo che incontrano. Aumentando la resistenza, la corrente diminuisce!',
  },
  {
    id: 10,
    title: 'Il Calibro Ventesimale',
    category: 'Misure e Strumenti',
    text: 'Il calibro a corsoio permette di misurare diametri esterni (becchi principali), diametri interni (becchi superiori) e profondità di fori (astina posteriore) con una precisione millimetrica fino a 0,05 mm grazie al nonio!',
  },
  {
    id: 11,
    title: 'Le Matite Tecniche: Guida alla Durezza',
    category: 'Disegno Tecnico',
    text: 'La matita 2H o 3H (dura) serve per le linee di costruzione sottili e le proiezioni; la matita HB per le quotature e i testi; la matita 2B o B (morbida) per ripassare i contorni definitivi dell\'oggetto in vista!',
  },
  {
    id: 12,
    title: 'Rapporto di Trasmissione negli Ingranaggi',
    category: 'Meccanica',
    text: 'Se una ruota motrice con 10 denti ingrana una ruota condotta con 30 denti, il rapporto è 1:3: la ruota grande gira 3 volte più lenta, ma fornisce una forza (coppia motrice) 3 volte superiore per superare le salite!',
  },
  {
    id: 13,
    title: 'Le Centrali Idroelettriche di Pompaggio',
    category: 'Energie Rinnovabili',
    text: 'Di notte, quando c\'è surplus di energia sulla rete, l\'acqua viene pompata dal bacino inferiore a quello superiore. Di giorno, quando la richiesta di picco sale, l\'acqua scende azionando le turbine: una gigantesca batteria naturale!',
  },
  {
    id: 14,
    title: 'Plastiche Termoplastiche vs Termoindurenti',
    category: 'Materiali & Sostenibilità',
    text: 'I polimeri termoplastici (come PET, PE, PP delle bottiglie e contenitori) rammolliscono con il calore e possono essere rimodellati molte volte; i termoindurenti con il calore carbonizzano e non possono essere rifusi!',
  },
  {
    id: 15,
    title: 'Il Segreto del Calcestruzzo Armato',
    category: 'Strutture ed Edilizia',
    text: 'Il calcestruzzo (cemento, sabbia, ghiaia e acqua) è imbattibile a compressione ma debolissimo a trazione. Inserendo barre di acciaio nervato all\'interno, otteniamo un materiale composito resistente a qualsiasi sollecitazione sismica!',
  },
  {
    id: 16,
    title: 'Manifattura Sottrattiva vs Additiva',
    category: 'Makers & Fabbricazione',
    text: 'La fresatrice o il tornio lavorano in modo "sottrattivo", asportando trucioli da un blocco grezzo. La stampante 3D lavora in modo "additivo", depositando materiale strato su strato solo dove serve: zero sprechi!',
  },
  {
    id: 17,
    title: 'Pulegge e Cinghie di Trasmissione',
    category: 'Meccanica',
    text: 'Due pulegge collegate da una cinghia aperta ruotano nello stesso verso. Se incrociamo la cinghia a figura a 8, la puleggia secondaria ruota nel verso opposto, invertendo la direzione del movimento!',
  },
  {
    id: 18,
    title: 'Il Cappotto Termico negli Edifici',
    category: 'Efficienza Energetica',
    text: 'Applicare pannelli isolanti (sughero, lana di roccia, EPS) sulle pareti esterne elimina i ponti termici: la casa trattiene il calore d\'inverno e il fresco d\'estate, tagliando fino al 50% le bollette e le emissioni!',
  },
  {
    id: 19,
    title: 'Il Salvavita (Interruttore Differenziale)',
    category: 'Sicurezza Elettrica',
    text: 'Il salvavita confronta istante per istante la corrente che entra nella fase con quella che esce dal neutro. Se c\'è una differenza anche di soli 30 milliampere (dispersione verso terra o contatto umano), apre il circuito in millisecondi!',
  },
  {
    id: 20,
    title: 'Progettare per il Futuro (Ecodesign)',
    category: 'Innovazione & Ambiente',
    text: 'Il buon tecnologo progetta pensando fin dal primo schizzo a come l\'oggetto verrà smontato, riparato e riciclato a fine vita. L\'ecodesign è l\'unione di intelligenza tecnica, estetica e responsabilità verso il pianeta!',
  },
];

export {
  profSauroImg,
  profIpaziaImg,
  profRitaImg,
  profAdaImg,
  leoImg,
  miaImg,
  heroTeamImg,
};


