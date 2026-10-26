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
        text: 'Nel laboratorio di fisica PhET "Balancing Act" il fulcro è fisso al centro: per equilibrare l\'asta spostiamo gli oggetti a distanze diverse dal fulcro!',
        context: 'Fisica & Leve PhET',
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

export { profSauroImg, leoImg, miaImg, heroTeamImg };
