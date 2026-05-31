import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Menu, 
  BookOpen, 
  Info, 
  MessageSquare, 
  History as HistoryIcon,
  ChevronLeft,
  ChevronRight,
  User,
  Send
} from 'lucide-react';
import { Comic, UserComment } from '../types';
import { commentsMock } from '../comicsData';

interface ReaderProps {
  comic: Comic;
  onBack: () => void;
  currentUser: string | null;
}

type SidebarTab = 'chapters' | 'metadata' | 'comments' | 'history';

export default function Reader({ comic, onBack, currentUser }: ReaderProps) {
  // Page index state
  const [pageIndex, setPageIndex] = useState(0);
  
  // Side bar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>('comments');

  // Zoom size multiplier (100% to 150%)
  const [zoomLevel, setZoomLevel] = useState(100);

  // Comments state starting from the mock data
  const [comments, setComments] = useState<UserComment[]>(commentsMock);
  const [newCommentText, setNewCommentText] = useState('');

  // Total pages
  const totalPages = comic.pages.length;
  const currentPageUrl = comic.pages[pageIndex] || comic.pages[0];

  const handleNextPage = () => {
    if (pageIndex < totalPages - 1) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 80));
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const added: UserComment = {
      id: `custom-c-${Date.now()}`,
      userName: currentUser || 'Leitor Anônimo',
      date: 'Hoje',
      text: newCommentText,
      likes: 0
    };

    setComments([added, ...comments]);
    setNewCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-brand-dark/95 flex flex-col font-sans select-none select-duration-300">
      
      {/* 1. TOP APP BAR PANEL */}
      <header className="fixed top-0 left-0 w-full z-50 bg-brand-dark/90 backdrop-blur-md border-b border-white/5 flex justify-between items-center h-16 px-12">
        <div className="flex items-center gap-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-semibold uppercase tracking-wider font-sans">Voltar</span>
          </button>
          
          <h1 className="font-display text-sm font-bold text-brand-gold uppercase tracking-widest hidden md:block">
            HQ Stream
          </h1>

          <div className="h-5 w-px bg-white/10 hidden md:block" />
          
          <span className="text-xs text-white opacity-85 font-medium max-w-[200px] md:max-w-[400px] truncate">
            {comic.title}
          </span>
        </div>

        {/* Action Controls Tabs */}
        <nav className="flex gap-6 items-center">
          <div className="hidden md:flex gap-6">
            <button 
              onClick={() => { setIsSidebarOpen(true); setActiveSidebarTab('chapters'); }}
              className={`text-xs uppercase tracking-wider font-semibold cursor-pointer ${activeSidebarTab === 'chapters' && isSidebarOpen ? 'text-brand-gold' : 'text-on-surface-variant hover:text-white'}`}
            >
              Capítulos
            </button>
            <button 
              onClick={() => { setIsSidebarOpen(true); setActiveSidebarTab('comments'); }}
              className={`text-xs uppercase tracking-wider font-semibold cursor-pointer ${activeSidebarTab === 'comments' && isSidebarOpen ? 'text-brand-gold' : 'text-on-surface-variant hover:text-white'}`}
            >
              Comentários
            </button>
          </div>

          <div className="h-5 w-px bg-white/10 hidden md:block" />

          {/* Interactive Zoom Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-2 text-on-surface-variant hover:text-white active:scale-95 transition-short cursor-pointer"
              title="Reduzir Zoom"
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-[10px] bg-white/5 text-white/50 px-2 py-0.5 rounded-md font-mono">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 text-on-surface-variant hover:text-white active:scale-95 transition-short cursor-pointer"
              title="Aumentar Zoom"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={handleFullscreen}
              className="p-2 text-on-surface-variant hover:text-white active:scale-95 transition-short cursor-pointer ml-1"
              title="Tela Cheia"
            >
              <Maximize size={16} />
            </button>
          </div>
        </nav>
      </header>

      {/* 2. MAIN READING FRAME & SIDEBAR CANVAS CONTAINER */}
      <div className="flex-1 w-full flex flex-row pt-16 pb-20 overflow-hidden relative">
        
        {/* Floating Hotspots Left / Right page checkers */}
        <div 
          onClick={handlePrevPage}
          className="absolute left-0 top-16 bottom-20 w-16 z-20 cursor-pointer hidden sm:block" 
          title="Página Anterior (Hotspot)"
        />
        <div 
          onClick={handleNextPage}
          className="absolute right-0 top-16 bottom-20 w-16 z-20 cursor-pointer hidden sm:block" 
          title="Próxima Página (Hotspot)"
        />

        {/* centered responsive viewport area */}
        <div className="flex-1 h-full overflow-y-auto overflow-x-hidden flex justify-center items-start py-8 px-4 bg-[#0a0a0a]">
          <div 
            className="shadow-2xl max-w-3xl w-full rounded-lg overflow-hidden border border-white/5 bg-brand-dark transition-all duration-300"
            style={{ 
              transform: `scale(${zoomLevel / 100})`, 
              transformOrigin: 'top center' 
            }}
          >
            <img
              alt={`HQ stream page ${pageIndex + 1}`}
              className="w-full h-auto object-contain select-none"
              src={currentPageUrl}
              onDoubleClick={() => setZoomLevel((prev) => prev === 100 ? 120 : 100)}
            />
          </div>
        </div>

        {/* Toggle Right Side Menu Trigger */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-brand-gold text-brand-dark p-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-90 transition-transform cursor-pointer"
          title={isSidebarOpen ? "Fechar detalhes da história" : "Abrir detalhes e comentários"}
        >
          <Menu size={20} />
        </button>

        {/* 3. TOGGLEABLE RIGHT NAVIGATION VIEWPORT */}
        <aside 
          className={`h-full bg-brand-container border-l border-white/5 flex flex-col pt-4 transition-transform duration-300 relative select-none shrink-0 ${
            isSidebarOpen ? 'w-80 translate-x-0' : 'w-0 translate-x-full absolute right-0'
          }`}
        >
          {isSidebarOpen && (
            <div className="h-full flex flex-col overflow-hidden">
              {/* Cover thumbnail and header series info */}
              <div className="px-6 mb-6">
                <div className="aspect-[2/3] w-28 bg-brand-highest rounded-lg mb-4 overflow-hidden border border-white/5 shadow-md">
                  <img
                    alt={comic.title}
                    className="w-full h-full object-cover"
                    src={comic.coverUrl}
                  />
                </div>
                <h2 className="font-display font-extrabold text-sm text-brand-gold leading-none">
                  {comic.publisher} COMICS
                </h2>
                <span className="font-sans text-xs text-white opacity-80 mt-1 font-medium block truncate max-w-[200px]">
                  {comic.title}
                </span>
                <p className="font-sans text-[11px] text-on-surface-variant opacity-50 mt-0.5">
                  Escritor por: {comic.author}
                </p>
              </div>

              {/* Side navbar menu filters */}
              <div className="flex border-b border-white/5 px-2">
                {[
                  { id: 'chapters', icon: BookOpen, label: 'Refs' },
                  { id: 'metadata', icon: Info, label: 'Ficha' },
                  { id: 'comments', icon: MessageSquare, label: 'Chat' },
                  { id: 'history', icon: HistoryIcon, label: 'Log' },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSidebarTab(tab.id as SidebarTab)}
                      className={`flex-1 flex flex-col items-center py-2.5 rounded-t-lg text-[10px] font-sans font-bold transition-all relative cursor-pointer ${
                        activeSidebarTab === tab.id
                          ? 'text-brand-gold bg-white/5 border-b-2 border-brand-gold'
                          : 'text-on-surface-variant opacity-60 hover:opacity-100 hover:bg-white/5'
                      }`}
                    >
                      <Icon size={14} className="mb-1" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic scrollable tab views */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                
                {activeSidebarTab === 'chapters' && (
                  <div className="space-y-2">
                    <h3 className="text-xs uppercase tracking-widest text-[#ffd700] mb-3 font-semibold">Índice de Capítulos</h3>
                    <div className="p-3 bg-white/5 rounded-lg border border-brand-gold/20 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-white">Capítulo Único</p>
                        <p className="text-[10px] text-on-surface-variant opacity-60">História Completa</p>
                      </div>
                      <span className="px-2 py-0.5 bg-brand-gold text-brand-dark rounded text-[10px] font-bold">Ativo</span>
                    </div>

                    <div className="p-3 hover:bg-white/5 rounded-lg opacity-40 transition-colors flex items-center justify-between text-xs cursor-not-allowed">
                      <div>
                        <p className="font-bold text-white">Capítulo 02</p>
                        <p className="text-[10px] text-on-surface-variant">Conteúdo Próxima Edição</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSidebarTab === 'metadata' && (
                  <div className="space-y-4 text-xs font-sans">
                    <h3 className="text-xs uppercase tracking-widest text-[#ffd700] mb-3 font-semibold">Ficha Técnica</h3>
                    <div className="space-y-2.5">
                      <div className="pb-2 border-b border-white/5">
                        <span className="text-[11px] text-on-surface-variant opacity-50 block font-medium">Saga / Título</span>
                        <p className="text-white font-bold">{comic.title}</p>
                      </div>
                      <div className="pb-2 border-b border-white/5">
                        <span className="text-[11px] text-on-surface-variant opacity-50 block font-medium">Escritor</span>
                        <p className="text-white font-bold">{comic.author}</p>
                      </div>
                      {comic.artist && (
                        <div className="pb-2 border-b border-white/5">
                          <span className="text-[11px] text-on-surface-variant opacity-50 block font-medium">Ilustrador / Arte</span>
                          <p className="text-white font-bold">{comic.artist}</p>
                        </div>
                      )}
                      <div className="pb-2 border-b border-white/5">
                        <span className="text-[11px] text-on-surface-variant opacity-50 block font-medium">Editora</span>
                        <p className="text-[#ffd700] font-extrabold">{comic.publisher} Comics</p>
                      </div>
                      <div className="pb-2">
                        <span className="text-[11px] text-on-surface-variant opacity-50 block font-medium">Ano de Lançamento</span>
                        <p className="text-white font-semibold">{comic.year}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSidebarTab === 'comments' && (
                  <div className="h-full flex flex-col overflow-hidden">
                    {/* written inputs form */}
                    <form onSubmit={handlePostComment} className="flex gap-2 mb-4 shrink-0">
                      <input
                        type="text"
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        placeholder="Escrever opinião..."
                        className="flex-1 bg-brand-highest border-0 rounded-lg py-2 px-3 text-xs text-white placeholder:text-on-surface-variant/40 outline-none focus:ring-1 focus:ring-brand-gold"
                      />
                      <button
                        type="submit"
                        className="p-2 aspect-square bg-brand-gold text-brand-dark rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                      >
                        <Send size={12} />
                      </button>
                    </form>

                    {/* Chat Comments list feed */}
                    <div className="flex-1 space-y-4 overflow-y-auto max-h-[300px] pr-1.5 custom-scrollbar pb-6 text-xs">
                      {comments.map((cmt) => (
                        <div key={cmt.id} className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                          <div className="flex justify-between items-center mb-1 select-none">
                            <span className="font-bold text-brand-gold truncate max-w-[120px]">{cmt.userName}</span>
                            <span className="text-[9px] text-on-surface-variant opacity-50">{cmt.date}</span>
                          </div>
                          <p className="text-white/80 leading-relaxed font-sans">{cmt.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSidebarTab === 'history' && (
                  <div className="space-y-4 text-xs font-sans">
                    <h3 className="text-xs uppercase tracking-widest text-[#ffd700] mb-3 font-semibold">Registro de Atividades</h3>
                    <div className="space-y-2">
                      <div className="p-2.5 bg-white/5 rounded-lg border border-white/5 text-[11px] flex gap-2.5">
                        <span className="text-brand-gold font-bold">1/2</span>
                        <p className="text-white/70">Começou a leitura em 31/05/2026</p>
                      </div>
                      <div className="p-2.5 bg-white/5 rounded-lg border border-white/5 text-[11px] flex gap-2.5">
                        <span className="text-brand-gold font-bold">2/2</span>
                        <p className="text-white/70">Avançou até a página atual de progresso</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom active profile user info */}
              <div className="p-4 border-t border-white/5 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center font-bold text-brand-gold text-sm">
                    {currentUser ? currentUser.substring(0, 2).toUpperCase() : 'LE'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{currentUser || 'Convidado Reader'}</p>
                    <p className="text-[10px] text-brand-gold font-medium">Membro Premium</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* 4. FOOTER TRACK PROGRESS BAR BAR */}
      <footer className="fixed bottom-0 left-0 w-full z-50 bg-brand-dark/95 backdrop-blur-md border-t border-white/5 flex justify-between items-center h-20 px-12">
        <button
          onClick={handlePrevPage}
          disabled={pageIndex === 0}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white disabled:opacity-30 disabled:hover:text-white/50 cursor-pointer disabled:cursor-not-allowed bg-white/5 py-2 px-3 rounded-xl transition-colors"
        >
          <ChevronLeft size={16} />
          Anterior
        </button>

        {/* progress slider track visual */}
        <div className="flex-1 max-w-2xl px-8 flex flex-col gap-1 text-center select-none">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider mb-0.5">
            <span className="text-brand-gold font-bold">Progresso de Leitura</span>
            <span className="text-on-surface-variant opacity-60">Pág. {pageIndex + 1} de {totalPages}</span>
          </div>
          
          <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-brand-gold transition-all duration-[300ms] shadow-[0_0_8px_rgba(255,215,0,0.6)]"
              style={{ width: `${((pageIndex + 1) / totalPages) * 100}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={handleNextPage}
          disabled={pageIndex === totalPages - 1}
          className="flex items-center gap-1.5 text-xs font-bold text-brand-dark bg-brand-gold hover:bg-brand-gold/90 transition-colors py-2 px-3 rounded-xl cursor-pointer disabled:opacity-30 disabled:text-neutral-500 disabled:bg-neutral-800 disabled:cursor-not-allowed"
        >
          Próximo
          <ChevronRight size={16} />
        </button>
      </footer>

    </div>
  );
}
