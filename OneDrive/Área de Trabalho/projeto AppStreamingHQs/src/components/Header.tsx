import React, { useState } from 'react';
import { Search, SlidersHorizontal, Bell, User } from 'lucide-react';
import { DashboardSection } from '../types';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeSection: DashboardSection;
  setActiveSection: (section: DashboardSection) => void;
  currentUsername: string | null;
  onAuthTrigger: () => void;
  onSettingsTrigger: () => void;
}

export default function Header({
  searchTerm,
  setSearchTerm,
  activeSection,
  setActiveSection,
  currentUsername,
  onAuthTrigger,
  onSettingsTrigger
}: HeaderProps) {
  const [showBellToast, setShowBellToast] = useState(false);

  // Quick navigation items
  const navItems: { label: string; value: DashboardSection }[] = [
    { label: 'Novidades', value: 'novidades' },
    { label: 'Populares', value: 'populares' },
    { label: 'Explorar', value: 'explorar' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-dark/80 backdrop-blur-xl flex justify-between items-center px-12 py-5 border-b border-white/5">
      {/* Sub Tabs Row */}
      <div className="flex items-center gap-8">
        <nav className="flex gap-8">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setActiveSection(item.value)}
              className={`text-base font-title font-semibold duration-200 cursor-pointer pb-1.5 transition-all outline-none ${
                activeSection === item.value
                  ? 'text-brand-gold border-b-2 border-brand-gold'
                  : 'text-on-surface-variant hover:text-brand-gold/80'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-6">
        {/* Rounded Input Field */}
        <div className="relative w-80">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50">
            <Search size={18} />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-brand-highest border-0 rounded-full py-2.5 pl-12 pr-12 focus:ring-1 focus:ring-brand-gold text-sm text-white placeholder:text-on-surface-variant/40 transition-all font-sans"
            placeholder="Buscar heróis, autores ou sagas..."
          />
          <button 
            type="button" 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60 hover:text-brand-gold transition-colors"
            title="Filtros avançados"
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowBellToast(true);
              setTimeout(() => setShowBellToast(false), 3000);
            }}
            className="p-2.5 hover:bg-brand-highest text-on-surface-variant hover:text-brand-gold rounded-full transition-colors relative"
            title="Notificações"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-gold rounded-full ring-2 ring-brand-dark"></span>
          </button>

          {showBellToast && (
            <div className="absolute right-0 mt-3 w-64 p-3 bg-brand-container border border-brand-gold/30 rounded-xl shadow-2xl text-xs text-white z-50 animate-fade-in">
              <p className="font-bold text-brand-gold">HQ Stream VIP</p>
              <p className="mt-1 font-light opacity-85">Você tem 2 novos quadrinhos da Marvel disponíveis no seu feed!</p>
            </div>
          )}
        </div>

        {/* Profile Avatar Trigger */}
        <button
          onClick={currentUsername ? onSettingsTrigger : onAuthTrigger}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-highest hover:border-brand-gold transition-all transition-duration-300 relative group flex items-center justify-center bg-brand-container"
          title={currentUsername ? `Ver perfil (${currentUsername})` : 'Entrar na minha conta'}
        >
          {currentUsername ? (
            <img
              alt="User profile avatar"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7V-bo1R7lRcgrxEJ0vVlQ4gix27bZ5t6sPW2Igq4SYM_YNHaRHmiSrZZYmIT3jmojWxBwBG11-doLkkfT852MCN0R-imy_r1Erm4FiHF-GsII_DaKGEijz0RD005qaW7v9_UuYH7rVofT9NNFg6mKKN4dh5_iv3uytcXuvuyPlRieJNq0ybfgO1E3lDyN_zMAXDjHPEvUBX-CIoPu_CgdVnjogo8XL5whQ8xQiwOtBl2cpi_kcQFA8TiLvz1EeFhTdeuVtI8u-bE"
            />
          ) : (
            <User size={18} className="text-on-surface-variant group-hover:text-brand-gold transition-colors" />
          )}
        </button>
      </div>
    </header>
  );
}
