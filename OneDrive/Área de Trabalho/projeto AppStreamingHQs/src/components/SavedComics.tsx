import React from 'react';
import { Bookmark, Play, Trash2, ArrowRight } from 'lucide-react';
import { Comic } from '../types';

interface SavedComicsProps {
  comics: Comic[];
  onComicSelect: (comic: Comic) => void;
  onComicRead: (comic: Comic) => void;
  onBookmarkRemove: (comicId: string) => void;
  onNavigateHome: () => void;
}

export default function SavedComics({
  comics,
  onComicSelect,
  onComicRead,
  onBookmarkRemove,
  onNavigateHome
}: SavedComicsProps) {
  const savedList = comics.filter((c) => c.isSaved);

  return (
    <div className="space-y-10 pb-24">
      <div>
        <h3 className="font-display text-lg lg:text-xl font-bold text-white flex items-center gap-2">
          <Bookmark className="text-brand-gold" size={20} />
          Seus Quadrinhos Salvos
        </h3>
        <p className="text-xs text-on-surface-variant opacity-60 font-normal">
          Você salvou {savedList.length} quadrinhos na sua estante pessoal.
        </p>
      </div>

      {savedList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {savedList.map((comic) => (
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

                {/* Overlays tools action */}
                <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onComicRead(comic);
                    }}
                    className="w-12 h-12 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                    title="Ler agora"
                  >
                    <Play size={18} fill="currentColor" className="ml-1" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookmarkRemove(comic.id);
                    }}
                    className="w-10 h-10 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all active:scale-95"
                    title="Remover da lista de salvos"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="absolute top-2.5 right-2.5 bg-brand-gold text-brand-dark p-1.5 rounded-full shadow-lg z-10">
                  <Bookmark size={12} fill="currentColor" />
                </div>
              </div>

              {/* Cover text detail layout */}
              <h4 className="font-display text-sm font-extrabold text-white truncate leading-tight group-hover:text-brand-gold transition-colors">
                {comic.title}
              </h4>
              <p className="text-[11px] text-on-surface-variant opacity-60 mt-1 font-medium truncate font-sans">
                {comic.author}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-brand-surface rounded-2xl border border-dashed border-white/5 flex flex-col items-center justify-center p-8 select-none">
          <div className="w-16 h-16 rounded-full bg-brand-container border border-white/5 flex items-center justify-center mb-4">
            <Bookmark size={24} className="text-on-surface-variant opacity-45" />
          </div>
          <h4 className="font-display text-base font-extrabold text-white mb-2">Sua lista está vazia</h4>
          <p className="text-xs text-on-surface-variant opacity-60 max-w-sm mb-6 leading-relaxed">
            Navegue pela nossa vitrine de novidades da Marvel, DC Comics e indies para favoritar seus quadrinhos preferidos.
          </p>
          <button
            onClick={onNavigateHome}
            className="px-6 py-3 bg-brand-gold hover:bg-brand-gold/95 text-brand-dark font-sans font-bold text-xs rounded-xl shadow-lg shadow-brand-gold/10 flex items-center gap-2 transition-all cursor-pointer"
          >
            Explorar Novidades
            <ArrowRight size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
