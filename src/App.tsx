import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { SectionHeader } from './components/SectionHeader';
import { LinkCard } from './components/LinkCard';
import { PreviewModal } from './components/PreviewModal';
import { IntegratedAppModal } from './components/integrated/IntegratedAppModal';
import { MascotSpotlight } from './components/MascotSpotlight';
import { LinkItem, Subject, GradeLevel } from './types';
import { INITIAL_LINKS } from './data/defaultLinks';
import { profSauroImg, profIpaziaImg, profRitaImg, profAdaImg, leoImg, miaImg } from './data/mascots';
import { Search, Heart } from 'lucide-react';
import { SeasonId, ConcreteSeasonId, SEASONAL_THEMES, getAutoSeasonalTheme } from './data/seasonalThemes';
import { SeasonalParticles } from './components/SeasonalParticles';

const FAVORITES_STORAGE_KEY = 'scienzalab_favorites_v2';
const SEASON_STORAGE_KEY = 'scienzalab_seasonal_theme_v1';
const PARTICLES_STORAGE_KEY = 'scienzalab_seasonal_particles_v1';

export default function App() {
  // Favorites persistence in LocalStorage
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading favorites from localStorage', e);
    }
    // Default favorites from initial links
    return INITIAL_LINKS.filter((l) => l.isFavorite).map((l) => l.id);
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (e) {
      console.error('Error saving favorites to localStorage', e);
    }
  }, [favoriteIds]);

  // Combine static curated links with favorite state
  const links: LinkItem[] = useMemo(() => {
    return INITIAL_LINKS.map((item) => ({
      ...item,
      isFavorite: favoriteIds.includes(item.id),
    }));
  }, [favoriteIds]);

  // Seasonal Theme state (auto by default, or manual override)
  const [season, setSeason] = useState<SeasonId>(() => {
    try {
      const saved = localStorage.getItem(SEASON_STORAGE_KEY);
      if (saved && (saved === 'auto' || saved in SEASONAL_THEMES)) {
        return saved as SeasonId;
      }
    } catch {
      // ignore
    }
    return 'auto';
  });

  const [showSeasonalParticles, setShowSeasonalParticles] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(PARTICLES_STORAGE_KEY);
      if (saved !== null) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return true;
  });

  useEffect(() => {
    try {
      localStorage.setItem(SEASON_STORAGE_KEY, season);
    } catch (e) {
      console.error('Error saving seasonal theme', e);
    }
  }, [season]);

  useEffect(() => {
    try {
      localStorage.setItem(PARTICLES_STORAGE_KEY, JSON.stringify(showSeasonalParticles));
    } catch (e) {
      console.error('Error saving particle setting', e);
    }
  }, [showSeasonalParticles]);

  const effectiveSeason: ConcreteSeasonId = useMemo(() => {
    if (season === 'auto') {
      return getAutoSeasonalTheme();
    }
    return season;
  }, [season]);

  const seasonalMeta = SEASONAL_THEMES[effectiveSeason] || SEASONAL_THEMES.standard;

  // Filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'tutti'>('tutti');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'Tutte'>('Tutte');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Preview modal state
  const [previewItem, setPreviewItem] = useState<LinkItem | null>(null);
  const [internalAppItem, setInternalAppItem] = useState<LinkItem | null>(null);

  // Computed counts
  const counts = useMemo(() => {
    return {
      matematica: links.filter((l) => l.subject === 'matematica').length,
      scienze: links.filter((l) => l.subject === 'scienze').length,
      tecnologia: links.filter((l) => l.subject === 'tecnologia').length,
      informatica: links.filter((l) => l.subject === 'informatica').length,
    };
  }, [links]);

  const favoritesCount = useMemo(() => {
    return favoriteIds.length;
  }, [favoriteIds]);

  // Filtered links
  const filteredLinks = useMemo(() => {
    return links.filter((item) => {
      // Favorite filter
      if (showFavoritesOnly && !item.isFavorite) {
        return false;
      }

      // Subject filter
      if (selectedSubject !== 'tutti' && item.subject !== selectedSubject) {
        return false;
      }

      // Grade level filter (allows items specifically for the class or foundational tools for all classes)
      if (selectedGrade !== 'Tutte') {
        const matchesExactGrade = item.gradeLevel === selectedGrade;
        const matchesAllGrades = item.gradeLevel === 'Tutte';
        if (!matchesExactGrade && !matchesAllGrades) {
          return false;
        }
      }

      // Search query - supports subjects, topics, and grade queries (e.g. "classe 1", "prima", "moti", "leve", "3D")
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();

        // Check if query targets a grade
        const isGrade1Query = ['1', '1a', '1ª', 'prima', 'classe 1', 'classe 1a', 'classe 1ª', '1 media', '1ª media'].includes(q);
        const isGrade2Query = ['2', '2a', '2ª', 'seconda', 'classe 2', 'classe 2a', 'classe 2ª', '2 media', '2ª media'].includes(q);
        const isGrade3Query = ['3', '3a', '3ª', 'terza', 'classe 3', 'classe 3a', 'classe 3ª', '3 media', '3ª media'].includes(q);

        let matchesGradeQuery = false;
        if (isGrade1Query) {
          matchesGradeQuery = item.gradeLevel === 'Classe 1ª' || item.gradeLevel === 'Tutte';
        } else if (isGrade2Query) {
          matchesGradeQuery = item.gradeLevel === 'Classe 2ª' || item.gradeLevel === 'Tutte';
        } else if (isGrade3Query) {
          matchesGradeQuery = item.gradeLevel === 'Classe 3ª' || item.gradeLevel === 'Tutte';
        }

        const inTitle = item.title.toLowerCase().includes(q);
        const inDesc = item.description.toLowerCase().includes(q);
        const inSubject = item.subject.toLowerCase().includes(q);
        const inGrade = item.gradeLevel.toLowerCase().includes(q);
        const inTags = item.tags.some((t) => t.toLowerCase().includes(q));

        if (!inTitle && !inDesc && !inSubject && !inGrade && !inTags && !matchesGradeQuery) {
          return false;
        }
      }

      return true;
    });
  }, [links, showFavoritesOnly, selectedSubject, selectedGrade, searchQuery]);

  // Group filtered links by subject
  const groupedLinks = useMemo(() => {
    return {
      matematica: filteredLinks.filter((l) => l.subject === 'matematica'),
      scienze: filteredLinks.filter((l) => l.subject === 'scienze'),
      tecnologia: filteredLinks.filter((l) => l.subject === 'tecnologia'),
      informatica: filteredLinks.filter((l) => l.subject === 'informatica'),
    };
  }, [filteredLinks]);

  // Favorite toggle handler
  const handleToggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSubject('tutti');
    setSelectedGrade('Tutte');
    setShowFavoritesOnly(false);
  };

  // Render sections to display
  const sectionsToRender: Subject[] =
    selectedSubject === 'tutti'
      ? ['matematica', 'scienze', 'tecnologia', 'informatica']
      : [selectedSubject];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 relative">
      {/* Floating Seasonal Decorative Particles (Pumpkins, Snow, Confetti, Flowers, Leaves, Sun) */}
      <SeasonalParticles
        season={effectiveSeason}
        enabled={showSeasonalParticles}
      />

      {/* Top Sticky Navigation */}
      <Navbar
        totalCount={links.length}
        favCount={favoritesCount}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={() => setShowFavoritesOnly((prev) => !prev)}
        currentSeason={season}
        onSelectSeason={setSeason}
        showParticles={showSeasonalParticles}
        onToggleParticles={() => setShowSeasonalParticles((prev) => !prev)}
      />

      {/* Hero Banner with ScienzaLab focus and Seasonal Theme */}
      <HeroSection
        counts={counts}
        activeSubject={selectedSubject}
        onSelectSubject={setSelectedSubject}
        theme={seasonalMeta}
      />

      {/* Filter and Search Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSubject={selectedSubject}
        onSubjectChange={setSelectedSubject}
        selectedGrade={selectedGrade}
        onGradeChange={setSelectedGrade}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalFilteredCount={filteredLinks.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Interactive Mascot Spotlight & Advice */}
        <MascotSpotlight
          onSelectSubject={setSelectedSubject}
          activeSubject={selectedSubject}
        />

        {/* Active Filter Pill / Favorites Notice */}
        {showFavoritesOnly && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between gap-3 text-rose-300 text-sm">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
              <span>Stai visualizzando solo le risorse salvate nei tuoi preferiti ({favoritesCount}).</span>
            </div>
            <button
              onClick={() => setShowFavoritesOnly(false)}
              className="text-xs font-bold underline hover:text-white"
            >
              Mostra tutte
            </button>
          </div>
        )}

        {/* If no items match */}
        {filteredLinks.length === 0 ? (
          <div className="text-center py-16 px-4 bg-slate-900/40 rounded-3xl border border-slate-800">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400">
              <Search className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Nessuna risorsa trovata
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              Nessun link corrisponde ai criteri di ricerca o ai filtri applicati.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all shadow-md"
            >
              Azzera tutti i filtri
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {sectionsToRender.map((subj) => {
              const items = groupedLinks[subj];
              if (items.length === 0 && selectedSubject === 'tutti') {
                return null;
              }

              return (
                <section key={subj} className="relative">
                  {/* Section Title Header */}
                  <SectionHeader
                    subject={subj}
                    count={items.length}
                  />

                  {/* Cards Grid or List */}
                  {items.length === 0 ? (
                    <div className="p-8 text-center bg-slate-900/30 rounded-2xl border border-dashed border-slate-800 text-slate-400 text-sm">
                      Nessun elemento presente in questa sezione con i filtri attuali.
                    </div>
                  ) : (
                    <div
                      className={
                        viewMode === 'grid'
                          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
                          : 'space-y-3'
                      }
                    >
                      {items.map((item) => (
                        <LinkCard
                          key={item.id}
                          item={item}
                          viewMode={viewMode}
                          onPreview={(it) => setPreviewItem(it)}
                          onLaunchInternal={(it) => setInternalAppItem(it)}
                          onToggleFavorite={handleToggleFavorite}
                        />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-8 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <img
                src={profIpaziaImg}
                alt="Prof.ssa Ipazia"
                title="Prof.ssa Ipazia (Matematica)"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500 bg-slate-800"
                referrerPolicy="no-referrer"
              />
              <img
                src={profSauroImg}
                alt="Prof. Sauro"
                title="Prof. Sauro (Scienze)"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500 bg-slate-800"
                referrerPolicy="no-referrer"
              />
              <img
                src={profRitaImg}
                alt="Prof.ssa Rita"
                title="Prof.ssa Rita (Tecnologia)"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-500 bg-slate-800"
                referrerPolicy="no-referrer"
              />
              <img
                src={profAdaImg}
                alt="Prof.ssa Ada"
                title="Prof.ssa Ada (Informatica)"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-500 bg-slate-800"
                referrerPolicy="no-referrer"
              />
              <img
                src={leoImg}
                alt="Leo"
                title="Leo (Studente)"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-500 bg-slate-800"
                referrerPolicy="no-referrer"
              />
              <img
                src={miaImg}
                alt="Mia"
                title="Mia (Studentessa)"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-rose-500 bg-slate-800"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">ScienzaLab</span>
                <span className="text-slate-600">|</span>
                <span className="text-emerald-400 font-semibold">Team Docenti & Studenti</span>
              </div>
              <p className="text-[11px] text-slate-400">Prof.ssa Ipazia • Prof. Sauro • Prof.ssa Rita • Prof.ssa Ada • Leo & Mia</p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center text-xs text-slate-400">
            <span className="text-emerald-400 font-bold">ScienzaLab</span>
            <span className="text-slate-600">•</span>
            <span>Didattica Digitale & Risorse Interattive</span>
          </div>
        </div>
      </footer>

      {/* Preview Modal for external sites */}
      <PreviewModal
        item={previewItem}
        isOpen={!!previewItem}
        onClose={() => setPreviewItem(null)}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Native Integrated Application Modal */}
      <IntegratedAppModal
        item={internalAppItem}
        isOpen={!!internalAppItem}
        onClose={() => setInternalAppItem(null)}
      />
    </div>
  );
}
