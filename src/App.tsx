import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { SectionHeader } from './components/SectionHeader';
import { LinkCard } from './components/LinkCard';
import { AddEditLinkModal } from './components/AddEditLinkModal';
import { BulkImportModal } from './components/BulkImportModal';
import { PreviewModal } from './components/PreviewModal';
import { BackupModal } from './components/BackupModal';
import { LinkItem, Subject, GradeLevel } from './types';
import { INITIAL_LINKS } from './data/defaultLinks';
import { Sparkles, Layers, Search, RefreshCw, ExternalLink, Heart, PlusCircle } from 'lucide-react';

const STORAGE_KEY = 'steam_lab_resources_list_v3_clean';

export default function App() {
  // Main links state with LocalStorage persistence
  const [links, setLinks] = useState<LinkItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading links from localStorage', e);
    }
    return INITIAL_LINKS;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    } catch (e) {
      console.error('Error saving links to localStorage', e);
    }
  }, [links]);

  // Filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'tutti'>('tutti');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'Tutte'>('Tutte');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modal states
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LinkItem | null>(null);
  const [modalDefaultSubject, setModalDefaultSubject] = useState<Subject>('matematica');

  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<LinkItem | null>(null);
  const [isBackupOpen, setIsBackupOpen] = useState(false);

  // Computed counts
  const counts = useMemo(() => {
    return {
      matematica: links.filter((l) => l.subject === 'matematica').length,
      scienze: links.filter((l) => l.subject === 'scienze').length,
      informatica: links.filter((l) => l.subject === 'informatica').length,
    };
  }, [links]);

  const favoritesCount = useMemo(() => {
    return links.filter((l) => l.isFavorite).length;
  }, [links]);

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

  // Handlers
  const handleToggleFavorite = (id: string) => {
    setLinks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    const item = links.find((l) => l.id === id);
    if (!item) return;
    if (confirm(`Sei sicuro di voler rimuovere "${item.title}"?`)) {
      setLinks((prev) => prev.filter((l) => l.id !== id));
      if (previewItem?.id === id) {
        setPreviewItem(null);
      }
    }
  };

  const handleSaveLink = (
    linkData: Omit<LinkItem, 'id' | 'addedAt'>,
    editId?: string
  ) => {
    if (editId) {
      setLinks((prev) =>
        prev.map((item) =>
          item.id === editId
            ? { ...item, ...linkData }
            : item
        )
      );
    } else {
      const newItem: LinkItem = {
        ...linkData,
        id: 'link-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        addedAt: new Date().toISOString().split('T')[0],
      };
      setLinks((prev) => [newItem, ...prev]);
    }
  };

  const handleBulkAdd = (newLinks: Omit<LinkItem, 'id' | 'addedAt'>[]) => {
    const createdItems: LinkItem[] = newLinks.map((l, index) => ({
      ...l,
      id: `bulk-${Date.now()}-${index}`,
      addedAt: new Date().toISOString().split('T')[0],
    }));
    setLinks((prev) => [...createdItems, ...prev]);
  };

  const handleOpenAddForSubject = (subject: Subject) => {
    setModalDefaultSubject(subject);
    setEditingItem(null);
    setIsAddEditOpen(true);
  };

  const handleEditItem = (item: LinkItem) => {
    setEditingItem(item);
    setModalDefaultSubject(item.subject);
    setIsAddEditOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSubject('tutti');
    setSelectedGrade('Tutte');
    setSelectedTag(null);
    setShowFavoritesOnly(false);
  };

  const handleRestoreDefault = () => {
    setLinks(INITIAL_LINKS);
  };

  const handleImportBackup = (imported: LinkItem[]) => {
    setLinks(imported);
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
        onOpenAddModal={() => {
          setEditingItem(null);
          setIsAddEditOpen(true);
        }}
        onOpenBulkModal={() => setIsBulkOpen(true)}
        onOpenBackupModal={() => setIsBackupOpen(true)}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={() => setShowFavoritesOnly((prev) => !prev)}
      />

      {/* Hero Banner with STEAM focus */}
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
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
              >
                Azzera tutti i filtri
              </button>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setIsAddEditOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Aggiungi questa risorsa</span>
              </button>
            </div>
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
                    onAddInSubject={handleOpenAddForSubject}
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
                          onToggleFavorite={handleToggleFavorite}
                          onEdit={handleEditItem}
                          onDelete={handleDelete}
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
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-400 to-indigo-500 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              </div>
            </div>
            <span className="font-bold text-white text-sm">STEAM Lab</span>
            <span className="text-slate-600">|</span>
            <span>Matematica • Scienze • Informatica</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href="https://vercel.com/icbdpp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <span>Repository Progetti Vercel</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-600">•</span>
            <button
              onClick={() => setIsBackupOpen(true)}
              className="hover:text-cyan-300 transition-colors"
            >
              Backup & Ripristino
            </button>
            <span className="text-slate-600">•</span>
            <span>Didattica Digitale & Percorsi STEAM</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AddEditLinkModal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        onSave={handleSaveLink}
        editingItem={editingItem}
        defaultSubject={modalDefaultSubject}
      />

      <BulkImportModal
        isOpen={isBulkOpen}
        onClose={() => setIsBulkOpen(false)}
        onBulkAdd={handleBulkAdd}
      />

      <PreviewModal
        item={previewItem}
        isOpen={!!previewItem}
        onClose={() => setPreviewItem(null)}
        onToggleFavorite={handleToggleFavorite}
      />

      <BackupModal
        isOpen={isBackupOpen}
        onClose={() => setIsBackupOpen(false)}
        links={links}
        onRestoreDefault={handleRestoreDefault}
        onImportBackup={handleImportBackup}
      />
    </div>
  );
}
