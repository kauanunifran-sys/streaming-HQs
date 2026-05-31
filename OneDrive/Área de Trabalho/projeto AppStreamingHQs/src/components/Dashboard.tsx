import React, { useState } from 'react';
import { 
  Play, 
  Bookmark, 
  History, 
  ArrowRight, 
  Sparkles, 
  Plus, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { Comic, DashboardSection } from '../types';

interface DashboardProps {
  comics: Comic[];
  selectedPublisher: string | null;
  activeSection: DashboardSection;
  searchTerm: string;
  onComicSelect: (comic: Comic) => void;
  onComicRead: (comic: Comic) => void;
  onBookmarkToggle: (comicId: string) => void;
}

export default function Dashboard({
  comics,
  selectedPublisher,
  activeSection,
  searchTerm,
  onComicSelect,
  onComicRead,
  onBookmarkToggle
}: DashboardProps) {
  // Current featured state
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [filterPublisherTag, setFilterPublisherTag] = useState<string>('Tudo');

  // Recommendation Modal
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendedComic, setRecommendedComic] = useState<Comic | null>(null);

  // Filter comics based on sidebar, topbar search, and tag selectors
  const filteredComics = comics.filter((comic) => {
    // 1. Search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchesTitle = comic.title.toLowerCase().includes(term);
      const matchesAuthor = comic.author.toLowerCase().includes(term);
      const matchesPublisher = comic.publisher.toLowerCase().includes(term);
      if (!matchesTitle && !matchesAuthor && !matchesPublisher) return false;
    }

    // 2. Sidebar selected publisher
    if (selectedPublisher && comic.publisher !== selectedPublisher) {
      return false;
    }

    // 3. Tag Selector
    if (filterPublisherTag !== 'Tudo') {
      if (filterPublisherTag === 'Marvel' && comic.publisher !== 'Marvel') return false;
      if (filterPublisherTag === 'DC Comics' && comic.publisher !== 'DC') return false;
      if (filterPublisherTag === 'Indie' && (comic.publisher === 'Marvel' || comic.publisher === 'DC')) return false;
    }

    // 4. Section specific logic
    if (activeSection === 'populares') {
      return comic.rating >= 4.8;
    } else if (activeSection === 'explorar') {
      // return a subset or custom order
      return true;
    }

    return true;
  });

  // Featured comics (asymmetric slides)
  const featuredComics = comics.filter((c) => c.id === 'spider-last-hunt' || c.id === 'vingadores-ultron');
  const activeFeatured = featuredComics[featuredIndex] || featuredComics[0];

  // Continue reading segment (any with progress)
  const continueReadingList = comics.filter((c) => c.progressPage && c.progressPage > 0);

  // Random Recommendation logic
  const handleRandomRecommend = () => {
    const randomIndex = Math.floor(Math.random() * comics.length);
    setRecommendedComic(comics[randomIndex]);
    setShowRecommendation(true);
  };

  return (
    <div className="space-y-12 pb-24">
      {/* 1. HERO FEATURE CAROUSEL (Asymmetric Hero Highlight) */}
      {!searchTerm && !selectedPublisher && (
        <section className="relative w-full h-[450px] rounded-xl overflow-hidden group select-none shadow-2xl border border-white/5 bg-brand-dark">
          {/* Cover image backdrop transition */}
          <img
            alt={activeFeatured.title}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            src={activeFeatured.coverUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/20 to-transparent"></div>

          {/* Featured badge & content info */}
          <div className="absolute bottom-12 left-12 max-w-2xl z-10">
            <span className="bg-brand-gold text-brand-dark text-[11px] font-sans font-bold tracking-widest px-3.5 py-1 rounded-full mb-4 inline-block shadow-lg">
              {activeFeatured.id === 'spider-last-hunt' ? 'SAGA DO MÊS' : 'DESTAQUE DA SEMANA'}
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-[1.1] tracking-tight">
              {activeFeatured.title}
            </h2>
            <p className="text-on-surface-variant text-sm font-sans mb-7 leading-relaxed max-w-lg font-normal opacity-90 line-clamp-2">
              {activeFeatured.description}
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={() => onComicRead(activeFeatured)}
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-sans font-extrabold text-sm px-8 py-3.5 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
              >
                <Play size={16} fill="currentColor" />
                Ler Agora
              </button>
              <button
                onClick={() => onComicSelect(activeFeatured)}
                className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-sans font-semibold text-sm px-8 py-3.5 rounded-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95 text-center"
              >
                Detalhes
              </button>
            </div>
          </div>

          {/* Carousel Sliders Indicators */}
          <div className="absolute bottom-12 right-12 flex gap-2">
            {featuredComics.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setFeaturedIndex(index)}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                  featuredIndex === index ? 'bg-brand-gold w-8' : 'bg-white/30 hover:bg-white/55'
                }`}
                title={`Ver destaque ${index + 1}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* 2. CONTINUE READING ROW (With Progress Indicators) */}
      {continueReadingList.length > 0 && !searchTerm && !selectedPublisher && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display text-lg lg:text-xl font-bold flex items-center gap-2 text-white">
              <History className="text-brand-gold" size={20} />
              Continuar Lendo
            </h3>
            <span className="text-xs text-on-surface-variant font-medium opacity-60">
              {continueReadingList.length} Quadrinhos em andamento
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {continueReadingList.map((comic) => (
              <div
                key={comic.id}
                onClick={() => onComicRead(comic)}
                className="bg-brand-surface rounded-xl overflow-hidden flex flex-row h-36 group cursor-pointer border border-white/5 hover:border-brand-gold/30 transition-all transition-duration-300"
              >
                {/* Covers thumb */}
                <div className="w-1/3 relative h-full bg-brand-highest">
                  <img
                    alt={comic.title}
                    className="w-full h-full object-cover"
                    src={comic.coverUrl}
                  />
                  {/* Miniature progress track */}
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-brand-dark/50">
                    <div 
                      className="h-full bg-brand-gold shadow-[0_0_8px_rgba(255,215,0,0.6)]"
                      style={{ width: `${comic.progressPercent || 30}%` }}
                    ></div>
                  </div>
                </div>

                {/* Info block */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block mb-1">
                      {comic.publisher}
                    </span>
                    <h4 className="font-display text-sm font-extrabold text-white line-clamp-1 leading-snug">
                      {comic.title}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant opacity-60 mt-0.5 font-medium">
                      Pág. {comic.progressPage} de {comic.pagesCount}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-on-surface-variant opacity-40 italic text-[10px]">
                    <Clock size={11} />
                    <span>Lido recentemente</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. MAIN SECTION GRID: Recently Added or Filtered Grid */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-display text-lg lg:text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="text-brand-gold" size={20} />
              {selectedPublisher ? `${selectedPublisher}` : 'Adicionados Recentemente'}
            </h3>
            <p className="text-xs text-on-surface-variant opacity-60 font-normal">
              Mostrando {filteredComics.length} quadrinhos {selectedPublisher ? `da ${selectedPublisher}` : 'na vitrine'}
            </p>
          </div>

          {/* Quick tab filters row */}
          {!selectedPublisher && (
            <div className="flex gap-2.5 self-start">
              {['Tudo', 'Marvel', 'DC Comics', 'Indie'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilterPublisherTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold border transition-all cursor-pointer ${
                    filterPublisherTag === tag
                      ? 'bg-brand-gold text-brand-dark border-brand-gold shadow-md'
                      : 'bg-brand-highest border-white/5 text-on-surface-variant hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Comics Cards Grid */}
        {filteredComics.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredComics.map((comic) => (
              <div 
                key={comic.id} 
                className="flex flex-col group comic-card-hover cursor-pointer"
                onClick={() => onComicSelect(comic)}
              >
                {/* Aspect covers container */}
                <div className="relative aspect-[2/3] bg-brand-surface rounded-xl overflow-hidden mb-3.5 border border-white/5 shadow-md">
                  <img
                    alt={comic.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={comic.coverUrl}
                  />

                  {/* Desktop Play & Bookmark hover overlays */}
                  <div className="absolute inset-0 bg-brand-dark/65 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onComicRead(comic);
                      }}
                      className="w-12 h-12 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                      title="Abrir no Leitor"
                    >
                      <Play size={18} fill="currentColor" className="ml-1" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookmarkToggle(comic.id);
                      }}
                      className="w-10 h-10 rounded-full bg-brand-highest/90 text-white flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-all active:scale-95"
                      title={comic.isSaved ? "Remover dos Salvor" : "Salvar Quadrinho"}
                    >
                      <Bookmark size={15} fill={comic.isSaved ? "currentColor" : "none"} />
                    </button>
                  </div>

                  {/* Active saves ribbon badge */}
                  {comic.isSaved && (
                    <div className="absolute top-2.5 right-2.5 bg-brand-gold text-brand-dark p-1.5 rounded-full shadow-lg z-10">
                      <Bookmark size={12} fill="currentColor" />
                    </div>
                  )}

                  {/* Comic micro track tracker inside cards */}
                  {comic.progressPercent && comic.progressPercent > 0 ? (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-gold"></div>
                  ) : null}
                </div>

                {/* Details layout */}
                <h4 className="font-display text-sm font-extrabold text-white truncate leading-tight group-hover:text-brand-gold transition-colors">
                  {comic.title}
                </h4>
                <div className="flex justify-between items-center mt-1.5 select-none opacity-60">
                  <span className="text-[11px] font-sans text-on-surface-variant font-medium truncate max-w-[70%]">
                    {comic.author}
                  </span>
                  <span className="text-[10px] font-sans font-bold bg-brand-highest text-brand-gold px-1.5 py-0.5 rounded leading-none">
                    {comic.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-brand-surface rounded-xl border border-dashed border-white/5 flex flex-col items-center justify-center p-6">
            <AlertCircle size={36} className="text-on-surface-variant opacity-40 mb-3" />
            <h4 className="font-display text-base font-extrabold text-white mb-1">Nenhum quadrinho encontrado</h4>
            <p className="text-xs text-on-surface-variant opacity-60 max-w-sm">
              Tente alterar os termos da busca ou ajustar a editora filtrada na barra lateral.
            </p>
          </div>
        )}
      </section>

      {/* FLOAT IN ACTION Recommendation Trigger SPOTLIGHT */}
      <button
        onClick={handleRandomRecommend}
        className="fixed bottom-10 right-10 w-16 h-16 bg-brand-gold text-brand-dark rounded-full shadow-2xl shadow-brand-gold/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40 cursor-pointer group"
        title="Recomendação Inteligente de HQ"
      >
        <Flame size={24} className="group-hover:rotate-12 transition-transform" />
      </button>

      {/* SPOTLIGHT MODAL */}
      {showRecommendation && recommendedComic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/80 backdrop-blur-md p-6">
          <div className="relative w-full max-w-md bg-brand-container border border-brand-gold/30 rounded-2xl shadow-2xl p-6 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-gold" />
            
            <h3 className="font-display text-lg font-extrabold text-white mb-2 flex items-center gap-2">
              <Sparkles className="text-brand-gold" size={18} />
              Recomendação Instantânea!
            </h3>
            <p className="text-xs text-on-surface-variant opacity-70 mb-5">
              Escolhemos esta clássica aventura baseada nas HQs em alta:
            </p>

            <div className="flex gap-4 mb-6">
              <div className="w-1/3 aspect-[2/3] bg-brand-highest rounded-lg overflow-hidden flex-shrink-0">
                <img
                  alt={recommendedComic.title}
                  className="w-full h-full object-cover"
                  src={recommendedComic.coverUrl}
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-extrabold text-white text-base leading-tight">
                    {recommendedComic.title}
                  </h4>
                  <p className="text-xs text-brand-gold font-bold mt-1 uppercase">
                    {recommendedComic.publisher} • {recommendedComic.year}
                  </p>
                  <p className="text-xs text-on-surface-variant opacity-80 mt-2 line-clamp-3 leading-relaxed">
                    {recommendedComic.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRecommendation(false);
                  onComicRead(recommendedComic);
                }}
                className="flex-1 py-3 bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-sans font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Ler Agora
              </button>
              <button
                onClick={() => {
                  setShowRecommendation(false);
                  onComicSelect(recommendedComic);
                }}
                className="flex-1 py-3 bg-brand-highest hover:bg-white/10 text-white font-sans font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Detalhes
              </button>
            </div>

            <button
              onClick={() => setShowRecommendation(false)}
              className="absolute top-4 right-4 text-on-surface-variant opacity-60 hover:opacity-100 text-sm font-bold font-sans cursor-pointer"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
