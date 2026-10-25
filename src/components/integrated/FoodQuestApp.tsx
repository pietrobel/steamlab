import React, { useState } from 'react';
import { HeartPulse, Apple, Utensils, Award, CheckCircle2, AlertCircle, Sparkles, Home } from 'lucide-react';
import { profSauroImg, miaImg } from '../../data/mascots';

interface FoodItem {
  id: string;
  name: string;
  category: 'carboidrati' | 'proteine' | 'frutta_verdura' | 'grassi' | 'dolci';
  calories: number;
  icon: string;
}

interface FoodQuestAppProps {
  onBackToHome?: () => void;
}

const AVAILABLE_FOODS: FoodItem[] = [
  { id: 'f1', name: 'Pasta Integrale (80g)', category: 'carboidrati', calories: 280, icon: '🍝' },
  { id: 'f2', name: 'Riso con Verdure (80g)', category: 'carboidrati', calories: 270, icon: '🍚' },
  { id: 'f3', name: 'Pane Integrale (50g)', category: 'carboidrati', calories: 130, icon: '🍞' },
  { id: 'f4', name: 'Petto di Pollo ai Ferri', category: 'proteine', calories: 165, icon: '🍗' },
  { id: 'f5', name: 'Salmone al Forno', category: 'proteine', calories: 200, icon: '🐟' },
  { id: 'f6', name: 'Uova Sode (2)', category: 'proteine', calories: 140, icon: '🥚' },
  { id: 'f7', name: 'Insalata Mista Fresca', category: 'frutta_verdura', calories: 35, icon: '🥗' },
  { id: 'f8', name: 'Mela o Pera Fresca', category: 'frutta_verdura', calories: 70, icon: '🍎' },
  { id: 'f9', name: 'Pomodori & Carote', category: 'frutta_verdura', calories: 40, icon: '🥕' },
  { id: 'f10', name: 'Olio Extravergine (1 cucchiaio)', category: 'grassi', calories: 90, icon: '🫒' },
  { id: 'f11', name: 'Frutta Secca (Mandorle 20g)', category: 'grassi', calories: 120, icon: '🥜' },
  { id: 'f12', name: 'Muffin al Cioccolato', category: 'dolci', calories: 360, icon: '🧁' },
  { id: 'f13', name: 'Bibita Gassata Zuccherata', category: 'dolci', calories: 150, icon: '🥤' },
];

export const FoodQuestApp: React.FC<FoodQuestAppProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'piatto' | 'piramide' | 'nutrienti' | 'quiz'>('piatto');
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([AVAILABLE_FOODS[0], AVAILABLE_FOODS[3], AVAILABLE_FOODS[6], AVAILABLE_FOODS[9]]);
  const [activePyramidTier, setActivePyramidTier] = useState<number>(1);

  // Meal balance calculation
  const totalCalories = selectedFoods.reduce((acc, f) => acc + f.calories, 0);
  const countCarbs = selectedFoods.filter((f) => f.category === 'carboidrati').length;
  const countProt = selectedFoods.filter((f) => f.category === 'proteine').length;
  const countVeg = selectedFoods.filter((f) => f.category === 'frutta_verdura').length;
  const countFats = selectedFoods.filter((f) => f.category === 'grassi').length;
  const countSweets = selectedFoods.filter((f) => f.category === 'dolci').length;

  const isBalanced = countCarbs >= 1 && countProt >= 1 && countVeg >= 1 && countSweets === 0;

  const toggleFood = (item: FoodItem) => {
    if (selectedFoods.some((f) => f.id === item.id)) {
      setSelectedFoods(selectedFoods.filter((f) => f.id !== item.id));
    } else {
      if (selectedFoods.length >= 6) return;
      setSelectedFoods([...selectedFoods, item]);
    }
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Scienze & Salute • Educazione Alimentare</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-750 text-[11px] text-slate-300">
              <img src={profSauroImg} alt="Prof. Sauro" className="w-4 h-4 rounded-full object-cover" />
              <img src={miaImg} alt="Mia" className="w-4 h-4 rounded-full object-cover" />
              <span>Guida del Prof. Sauro & Mia</span>
            </div>
          </div>
          <h2 className="text-2xl font-black text-white">
            Food Quest: Nutrizione & Stili di Vita
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Scopri i principi nutritivi, esplora la piramide alimentare della Dieta Mediterranea e componi il tuo piatto bilanciato.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-750 text-cyan-300 hover:text-white border border-slate-700 hover:border-cyan-500 transition-all shadow-sm"
            >
              <Home className="w-3.5 h-3.5 text-cyan-400" />
              <span>Torna a ScienzaLab</span>
            </button>
          )}

          {/* Tab switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700/80 flex-wrap">
          <button
            onClick={() => setActiveTab('piatto')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'piatto'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Piatto Sano
          </button>
          <button
            onClick={() => setActiveTab('piramide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'piramide'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Piramide Alimentare
          </button>
          <button
            onClick={() => setActiveTab('nutrienti')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'nutrienti'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            I 5 Nutrienti
          </button>
        </div>
      </div>
    </div>

      {/* Tab: Piatto Sano Interattivo */}
      {activeTab === 'piatto' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Food Selection Pantry */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Dispensa Alimenti
              </h3>
              <span className="text-[11px] text-slate-400">Clicca per aggiungere/togliere</span>
            </div>

            <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
              {AVAILABLE_FOODS.map((food) => {
                const isSelected = selectedFoods.some((f) => f.id === food.id);
                return (
                  <button
                    key={food.id}
                    onClick={() => toggleFood(food)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-medium border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-600/30 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base">{food.icon}</span>
                      <span className="truncate">{food.name}</span>
                    </div>
                    <span className="font-mono text-[11px] text-slate-400 shrink-0">
                      {food.calories} kcal
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Plate & Balance Visualizer */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Il Tuo Pasto Selezionato ({selectedFoods.length} alimenti)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Modello del Piatto Sano di Harvard: 50% Vegetali, 25% Cereali integrali, 25% Proteine buone.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Calorie Totali</span>
                  <span className="text-xl font-mono font-bold text-emerald-400">
                    {totalCalories} <span className="text-xs text-slate-300">kcal</span>
                  </span>
                </div>
              </div>

              {/* Graphic Plate */}
              <div className="relative w-64 h-64 mx-auto my-4 rounded-full border-4 border-slate-700 bg-slate-950 p-4 shadow-2xl flex flex-wrap items-center justify-center gap-2">
                {selectedFoods.length === 0 ? (
                  <span className="text-xs text-slate-500 text-center px-4">
                    Il piatto è vuoto. Seleziona gli alimenti dalla dispensa a sinistra.
                  </span>
                ) : (
                  selectedFoods.map((f) => (
                    <div
                      key={f.id}
                      className="flex flex-col items-center bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700 text-center animate-fade-in"
                    >
                      <span className="text-xl">{f.icon}</span>
                      <span className="text-[10px] text-white truncate max-w-[70px]">{f.name.split(' ')[0]}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Balance Checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-xs">
                <div className={`p-2.5 rounded-xl border text-center ${countVeg >= 1 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-800/40 border-slate-800 text-slate-500'}`}>
                  <span>Frutta & Verdura: {countVeg >= 1 ? '✓ Presente' : 'Mancante'}</span>
                </div>
                <div className={`p-2.5 rounded-xl border text-center ${countCarbs >= 1 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-800/40 border-slate-800 text-slate-500'}`}>
                  <span>Cereali: {countCarbs >= 1 ? '✓ Presente' : 'Mancante'}</span>
                </div>
                <div className={`p-2.5 rounded-xl border text-center ${countProt >= 1 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-800/40 border-slate-800 text-slate-500'}`}>
                  <span>Proteine: {countProt >= 1 ? '✓ Presente' : 'Mancante'}</span>
                </div>
                <div className={`p-2.5 rounded-xl border text-center ${countSweets === 0 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'}`}>
                  <span>Dolci/Zuccheri: {countSweets === 0 ? '✓ Equilibrato' : 'Eccesso'}</span>
                </div>
              </div>
            </div>

            {/* Assessment banner */}
            <div className={`p-3.5 rounded-xl border text-xs flex items-center gap-3 ${isBalanced ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-amber-950/40 border-amber-500/40 text-amber-300'}`}>
              {isBalanced ? <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" /> : <AlertCircle className="w-5 h-5 shrink-0 text-amber-400" />}
              <div>
                <span className="font-bold block">
                  {isBalanced ? 'Ottimo lavoro! Il tuo pasto è completo e bilanciato.' : 'Consiglio nutrizionale:'}
                </span>
                <span>
                  {isBalanced
                    ? 'Contiene tutte le classi fondamentali di macronutrienti con basso apporto di zuccheri semplici.'
                    : 'Assicurati di includere almeno una fonte di verdure, una di carboidrati complessi e una di proteine magre, limitando dolci e bibite.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Piramide Alimentare */}
      {activeTab === 'piramide' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Livelli della Piramide
            </h3>
            {[
              { level: 4, name: 'Vertice: Dolci & Grassi Saturi', freq: 'Uso occasionale e moderato' },
              { level: 3, name: 'Piano 3: Latticini & Uova, Pesce, Carni', freq: 'Settimanale (1-3 volte)' },
              { level: 2, name: 'Piano 2: Olio Extravergine & Frutta Secca', freq: 'Giornaliero moderato' },
              { level: 1, name: 'Base: Cereali Integrali, Frutta & Verdura', freq: 'A ogni pasto principale' },
            ].map((p) => (
              <button
                key={p.level}
                onClick={() => setActivePyramidTier(p.level)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                  activePyramidTier === p.level
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                <div className="font-bold">{p.name}</div>
                <div className="text-[11px] opacity-80 mt-0.5">{p.freq}</div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Dettaglio Livello {activePyramidTier}
            </span>

            {activePyramidTier === 1 && (
              <div className="space-y-3">
                <h4 className="text-xl font-bold text-white">La Base: Idratazione, Frutta, Verdura & Cereali</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Forniscono carboidrati complessi (energia a lento rilascio), fibra alimentare (fondamentale per la salute intestinale),
                  vitamine (A, C, acido folico) e sali minerali.
                </p>
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300 space-y-1">
                  <p><strong>Porzioni consigliate:</strong> Almeno 5 porzioni al giorno tra frutta e verdura fresca di stagione (i 5 colori del benessere).</p>
                  <p><strong>Bere acqua:</strong> Almeno 1,5 - 2 litri di acqua ogni giorno.</p>
                </div>
              </div>
            )}

            {activePyramidTier === 2 && (
              <div className="space-y-3">
                <h4 className="text-xl font-bold text-white">Grassi Buoni: Olio Extravergine di Oliva & Semi</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  L'olio EVO è il pilastro della Dieta Mediterranea: ricco di acidi grassi monoinsaturi e polifenoli antiossidanti che proteggono cuore e vasi sanguigni.
                </p>
              </div>
            )}

            {activePyramidTier === 3 && (
              <div className="space-y-3">
                <h4 className="text-xl font-bold text-white">Proteine: Legumi, Pesce, Uova e Latticini</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Le proteine svolgono funzione plastica (costruzione e riparazione dei tessuti muscolari e cellulari).
                  Privilegiare legumi (fagioli, lenticchie, ceci) e pesce azzurro ricco di Omega-3.
                </p>
              </div>
            )}

            {activePyramidTier === 4 && (
              <div className="space-y-3">
                <h4 className="text-xl font-bold text-white">Il Vertice: Zuccheri Semplici, Carni Rosse & Salumi</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Questi cibi apportano calorie rapide ma scarsi micronutrienti ("calorie vuote"). Vanno consumati con parsimonia
                  per prevenire carie, obesità e sbalzi glicemici.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: I 5 Nutrienti */}
      {activeTab === 'nutrienti' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs font-bold text-cyan-400 block mb-1">Funzione Energetica</span>
            <h4 className="text-base font-bold text-white mb-2">Carboidrati & Lipidi</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              I carboidrati forniscono energia immediata (4 kcal/g); i lipidi sono la riserva energetica concentrata del corpo (9 kcal/g).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs font-bold text-emerald-400 block mb-1">Funzione Plastica</span>
            <h4 className="text-base font-bold text-white mb-2">Proteine</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              I mattoni fondamentali del nostro corpo: costruiscono muscoli, pelle, ormoni, enzimi e anticorpi del sistema immunitario.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs font-bold text-indigo-400 block mb-1">Funzione Regolatrice</span>
            <h4 className="text-base font-bold text-white mb-2">Vitamine & Sali Minerali</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Non forniscono calorie ma regolano tutte le reazioni chimiche e biochimiche vitali dell'organismo.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
