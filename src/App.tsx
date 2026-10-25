import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { SectionHeader } from './components/SectionHeader';
import { LinkCard } from './components/LinkCard';
import { PreviewModal } from './components/PreviewModal';
import { IntegratedAppModal } from './components/integrated/IntegratedAppModal';
import { MascotSpotlight } from './components/MascotSpotlight';
import { profSauroImg, leoImg, miaImg } from './data/mascots';
import { LinkItem, Subject, GradeLevel } from './types';
import { INITIAL_LINKS } from './data/defaultLinks';
import { Sparkles, Search, ExternalLink, Heart } from 'lucide-react';

const FAVORITES_STORAGE_KEY = 'scienzalab_favorites_v2';

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

  // Filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'tutti'>('tutti');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'Tutte'>('Tutte');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
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
      informatica: links.filter((l) => l.subject === 'informatica').length,
    };
  }, [links]);

  const favoritesCount = useMemo(() => {
    return favoriteIds.length;
  }, [favoriteIds]);

  // Available tags across all links
  const availableTags = useMemo(() => {
    const set = new Set<string>();
    links.forEach((l) => l.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [links]);

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

      // Grade level filter
      if (selectedGrade !== 'Tutte' && item.gradeLevel !== selectedGrade && item.gradeLevel !== 'Tutte') {
        return false;
      }

      // Tag filter
      if (selectedTag && !item.tags.includes(selectedTag)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = item.title.toLowerCase().includes(q);
        const inDesc = item.description.toLowerCase().includes(q);
        const inUrl = item.url.toLowerCase().includes(q);
        const inTags = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inUrl && !inTags) {
          return false;
        }
      }

      return true;
    });
  }, [links, showFavoritesOnly, selectedSubject, selectedGrade, selectedTag, searchQuery]);

  // Group filtered links by subject
  const groupedLinks = useMemo(() => {
    return {
      matematica: filteredLinks.filter((l) => l.subject === 'matematica'),
      scienze: filteredLinks.filter((l) => l.subject === 'scienze'),
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
    setSelectedTag(null);
    setShowFavoritesOnly(false);
  };

  // Render sections to display
  const sectionsToRender: Subject[] =
    selectedSubject === 'tutti'
      ? ['matematica', 'scienze', 'informatica']
      : [selectedSubject];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Sticky Navigation */}
      <Navbar
        totalCount={links.length}
        favCount={favoritesCount}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={() => setShowFavoritesOnly((prev) => !prev)}
      />

      {/* Hero Banner with ScienzaLab focus */}
      <HeroSection
        counts={counts}
        activeSubject={selectedSubject}
        onSelectSubject={setSelectedSubject}
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
        availableTags={availableTags}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
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
                src={profSauroImg}
                alt="Prof. Sauro"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500 bg-slate-800"
                referrerPolicy="no-referrer"
              />
              <img
                src={leoImg}
                alt="Leo"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-500 bg-slate-800"
                referrerPolicy="no-referrer"
              />
              <img
                src={miaImg}
                alt="Mia"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-rose-500 bg-slate-800"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">ScienzaLab</span>
                <span className="text-slate-600">|</span>
                <span className="text-emerald-400 font-semibold">Prof. Sauro, Leo & Mia</span>
              </div>
              <p className="text-[11px] text-slate-400">Matematica • Scienze • Informatica per la Scuola Media</p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href="https://scienzalab.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1"
            >
              <span>scienzalab.vercel.app</span>
              <ExternalLink className="w-3 h-3" />
            </a>
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
