import React from 'react';
import { 
  Home, 
  PlayCircle, 
  Bookmark, 
  Sparkles, 
  Shield, 
  Zap, 
  Compass, 
  Settings, 
  LogOut, 
  UserPlus
} from 'lucide-react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedPublisher: string | null;
  setSelectedPublisher: (publisher: string | null) => void;
  currentUsername: string | null;
  onLogout: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  selectedPublisher,
  setSelectedPublisher,
  currentUsername,
  onLogout
}: SidebarProps) {
  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    // Reset publisher filter when exiting standard main paths if appropriate
    if (tab !== 'home') {
      setSelectedPublisher(null);
    }
  };

  const handlePublisherClick = (publisher: string) => {
    setActiveTab('home');
    setSelectedPublisher(selectedPublisher === publisher ? null : publisher);
  };

  const publisherList = [
    { name: 'Marvel', icon: Sparkles, color: 'text-brand-gold' },
    { name: 'DC', icon: Shield, color: 'text-blue-500' },
    { name: 'Dark Horse', icon: Zap, color: 'text-amber-500' },
    { name: 'Image Comics', icon: Compass, color: 'text-teal-400' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-brand-surface border-r border-white/5 flex flex-col py-6 z-50 select-none">
      {/* Brand Header */}
      <div className="px-6 mb-10 mt-2">
        <h1 className="font-display text-[26px] font-extrabold text-brand-gold tracking-tighter leading-none">
          HQ Stream
        </h1>
        <p className="text-xs font-sans text-on-surface-variant opacity-60 uppercase tracking-widest mt-1.5 font-medium">
          Premium Reader
        </p>
      </div>

      <nav className="flex-1 px-3 space-y-7 overflow-y-auto">
        {/* Core Navigation Section */}
        <div className="space-y-1">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full flex items-center gap-4 py-3 px-4 rounded-lg font-medium transition-all duration-200 text-left ${
              activeTab === 'home' && !selectedPublisher
                ? 'text-white border-l-4 border-brand-gold bg-white/5 font-bold'
                : 'text-on-surface-variant opacity-65 hover:opacity-100 hover:bg-white/5'
            }`}
          >
            <Home size={19} className={activeTab === 'home' && !selectedPublisher ? 'text-brand-gold' : ''} />
            <span className="text-sm font-sans">Home</span>
          </button>

          <button
            onClick={() => handleNavClick('home')} // Just filters dashboard in this implementation
            className={`w-full flex items-center gap-4 py-3 px-4 rounded-lg font-medium transition-all duration-200 text-left text-on-surface-variant opacity-65 hover:opacity-100 hover:bg-white/5`}
          >
            <PlayCircle size={19} />
            <span className="text-sm font-sans">Continuar Lendo</span>
          </button>

          <button
            onClick={() => handleNavClick('saved')}
            className={`w-full flex items-center gap-4 py-3 px-4 rounded-lg font-medium transition-all duration-200 text-left ${
              activeTab === 'saved'
                ? 'text-white border-l-4 border-brand-gold bg-white/5 font-bold'
                : 'text-on-surface-variant opacity-65 hover:opacity-100 hover:bg-white/5'
            }`}
          >
            <Bookmark size={19} className={activeTab === 'saved' ? 'text-brand-gold' : ''} />
            <span className="text-sm font-sans">Salvos</span>
          </button>
        </div>

        {/* Editoras (Publishers) Section */}
        <div>
          <h2 className="px-4 mb-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant opacity-40">
            Editoras
          </h2>
          <div className="space-y-1">
            {publisherList.map((pub) => {
              const IconComponent = pub.icon;
              const isSelected = selectedPublisher === pub.name && activeTab === 'home';
              return (
                <button
                  key={pub.name}
                  onClick={() => handlePublisherClick(pub.name)}
                  className={`w-full flex items-center gap-4 py-3 px-4 rounded-lg font-medium transition-all duration-200 text-left ${
                    isSelected
                      ? 'text-white border-l-4 border-brand-gold bg-white/5 font-bold'
                      : 'text-on-surface-variant opacity-65 hover:opacity-100 hover:bg-white/5'
                  }`}
                >
                  <IconComponent size={19} className={isSelected ? 'text-brand-gold' : pub.color} />
                  <span className="text-sm font-sans">{pub.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Sidebar Footer Account Info / Actions */}
      <div className="mt-auto px-3 pt-4 border-t border-white/5 space-y-1">
        {currentUsername ? (
          <>
            <div className="px-4 py-3 text-xs mb-2 bg-white/5 rounded-lg border border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-gold/25 border border-brand-gold/40 flex items-center justify-center font-bold text-brand-gold">
                {currentUsername.substring(0, 2).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-white font-bold truncate leading-none">{currentUsername}</p>
                <span className="text-[10px] text-brand-gold font-medium tracking-wide">Membro Premium</span>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-4 py-3 px-4 rounded-lg text-sm font-medium text-red-400 opacity-80 hover:opacity-100 hover:bg-red-500/10 transition-all text-left"
            >
              <LogOut size={18} />
              <span className="font-sans">Sair</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleNavClick('login')}
              className={`w-full flex items-center gap-4 py-3 px-4 rounded-lg text-sm font-medium transition-all text-left ${
                activeTab === 'login' 
                  ? 'text-brand-gold bg-white/5' 
                  : 'text-on-surface-variant opacity-70 hover:opacity-100 hover:bg-white/5'
              }`}
            >
              <LogOut size={18} className="rotate-180" />
              <span className="font-sans">Entrar</span>
            </button>

            <button
              onClick={() => handleNavClick('register')}
              className={`w-full flex items-center gap-4 py-3 px-4 rounded-lg text-sm font-medium transition-all text-left ${
                activeTab === 'register' 
                  ? 'text-brand-gold bg-white/5' 
                  : 'text-on-surface-variant opacity-70 hover:opacity-100 hover:bg-white/5'
              }`}
            >
              <UserPlus size={18} />
              <span className="font-sans">Registrar-se</span>
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
