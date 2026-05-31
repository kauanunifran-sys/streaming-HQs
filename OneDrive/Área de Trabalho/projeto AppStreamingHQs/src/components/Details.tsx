import React from 'react';
import { 
  Star, 
  Bookmark, 
  Plus, 
  User, 
  ArrowLeft, 
  BookOpen, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { Comic } from '../types';

interface DetailsProps {
  comic: Comic;
  onBack: () => void;
  onRead: (comic: Comic) => void;
  onBookmarkToggle: (comicId: string) => void;
  allComics: Comic[];
  onComicSelect: (comic: Comic) => void;
}

export default function Details({
  comic,
  onBack,
  onRead,
  onBookmarkToggle,
  allComics,
  onComicSelect
}: DetailsProps) {
  // Classic suggestions: similar publisher/genres, excluding current
  const suggestions = allComics
    .filter((c) => c.id !== comic.id && (c.publisher === comic.publisher || c.rating >= 4.8))
    .slice(0, 6);

  // Render starts matching ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={`${
            i <= fullStars ? 'text-brand-gold fill-brand-gold' : 'text-on-surface-variant opacity-40'
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="relative z-10 px-12 py-10 select-none">
      {/* Background Atmosphere Glow */}
      <div className="absolute inset-0 -z-10 opacity-25 blur-[120px] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-gold rounded-full mix-blend-screen animate-pulse duration-[8s]" />
      </div>

      {/* Back button */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors group cursor-pointer text-xs font-semibold font-sans uppercase tracking-widest bg-white/5 py-2.5 px-4 rounded-full border border-white/5"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para a Biblioteca
        </button>
      </div>

      {/* Main Details Grid */}
      <div className="flex flex-col md:flex-row gap-16 mb-16">
        {/* Left Side: Comic Cover */}
        <div className="w-full md:w-[380px] flex-shrink-0 group">
          <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-brand-gold/30 gold-rim shadow-2xl transition-transform duration-500 group-hover:scale-[1.015]">
            <img
              alt={comic.title}
              className="w-full h-full object-cover"
              src={comic.coverUrl}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>

        {/* Right Side: Metadata Description */}
        <div className="flex-1 pt-4">
          <span className="text-xs font-sans font-bold text-brand-gold uppercase tracking-widest block mb-1">
            {comic.publisher} COMICS
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tighter leading-none">
            {comic.title}
          </h2>

          {/* Rating stars */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex gap-1">
              {renderStars(comic.rating)}
            </div>
            <span className="text-on-surface-variant font-sans text-xs font-semibold opacity-70">
              Nota: {comic.rating.toFixed(1)} / 5.0
            </span>
          </div>

          {/* Description */}
          <div className="max-w-2xl mb-10">
            <p className="font-sans text-base leading-relaxed text-on-surface-variant/90">
              {comic.description}
            </p>
          </div>

          {/* Primary Operations Actions */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={() => onRead(comic)}
              className="bg-brand-gold text-brand-dark px-10 py-4 rounded-xl font-display font-extrabold text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer shadow-xl shadow-brand-gold/10"
            >
              <BookOpen size={18} />
              Começar Leitura
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => onBookmarkToggle(comic.id)}
                className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-all cursor-pointer group active:scale-95 ${
                  comic.isSaved
                    ? 'bg-brand-gold/10 border-brand-gold text-brand-gold'
                    : 'bg-white/5 border-white/5 text-on-surface-variant hover:text-white hover:bg-white/10'
                }`}
                title={comic.isSaved ? "Salvo" : "Salvar na minha lista"}
              >
                <Bookmark size={20} fill={comic.isSaved ? "currentColor" : "none"} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Meta Chips */}
          <div className="flex flex-wrap gap-4 select-none">
            <div className="px-4 py-2.5 bg-brand-container border border-white/5 rounded-lg flex items-center gap-2">
              <span className="text-[11px] text-on-surface-variant opacity-50 font-sans font-medium">Escritor:</span>
              <span className="text-brand-gold font-bold text-xs font-sans">{comic.author}</span>
            </div>

            {comic.artist && (
              <div className="px-4 py-2.5 bg-brand-container border border-white/5 rounded-lg flex items-center gap-2">
                <span className="text-[11px] text-on-surface-variant opacity-50 font-sans font-medium">Ilustrador:</span>
                <span className="text-brand-gold font-bold text-xs font-sans">{comic.artist}</span>
              </div>
            )}

            <div className="px-4 py-2.5 bg-brand-container border border-white/5 rounded-lg flex items-center gap-2">
              <Calendar size={13} className="text-brand-gold" />
              <span className="text-[11px] text-on-surface-variant opacity-50 font-sans font-medium">Publicado:</span>
              <span className="text-white font-bold text-xs font-sans">{comic.year}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions Section */}
      <section className="mt-20">
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
          <h3 className="font-display text-lg lg:text-xl font-bold text-white flex items-center gap-2">
            Sugestões de Clássicos
          </h3>
          <span className="text-xs text-brand-gold font-semibold font-sans uppercase tracking-wider opacity-90 block">
            Poderia gostar de
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {suggestions.map((c) => (
            <div
              key={c.id}
              onClick={() => onComicSelect(c)}
              className="space-y-3 group cursor-pointer"
            >
              <div className="aspect-[2/3] bg-brand-surface rounded-xl overflow-hidden border border-white/5 transition-all duration-300 group-hover:-translate-y-2 group-hover:border-brand-gold/40 shadow-md">
                <img
                  alt={c.title}
                  className="w-full h-full object-cover"
                  src={c.coverUrl}
                />
              </div>
              <div className="px-1">
                <h4 className="font-sans text-xs font-bold text-white truncate group-hover:text-brand-gold transition-colors">
                  {c.title}
                </h4>
                <p className="text-[10px] text-on-surface-variant opacity-55 font-sans mt-0.5 font-medium">
                  {c.publisher} Comics
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
