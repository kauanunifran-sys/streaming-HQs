import React, { useState } from 'react';
import { comicsList } from './comicsData';
import { Comic, ActiveTab, DashboardSection } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Details from './components/Details';
import Reader from './components/Reader';
import Auth from './components/Auth';
import SavedComics from './components/SavedComics';
import { User, ShieldAlert, Sparkles, X, Settings as SettingsIcon, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Global React state sessions
  const [comics, setComics] = useState<Comic[]>(comicsList);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const [readingComic, setReadingComic] = useState<Comic | null>(null);
  
  // Search parameters
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState<DashboardSection>('novidades');
  const [selectedPublisher, setSelectedPublisher] = useState<string | null>(null);

  // Authentication states
  const [currentUser, setCurrentUser] = useState<string | null>('Peter Parker');

  // Mini account Configuration Dialog state
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsNewName, setSettingsNewName] = useState(currentUser || '');
  const [showSaveToast, setShowSaveToast] = useState(false);

  // Toggle saving bookmark on a comic
  const handleBookmarkToggle = (comicId: string) => {
    setComics((prevComics) =>
      prevComics.map((c) => {
        if (c.id === comicId) {
          return { ...c, isSaved: !c.isSaved };
        }
        return c;
      })
    );

    // Update active details state synchronously if it is selected
    if (selectedComic && selectedComic.id === comicId) {
      setSelectedComic((prev) => prev ? { ...prev, isSaved: !prev.isSaved } : null);
    }
  };

  // Launch a comic reader view modal
  const handleComicRead = (comic: Comic) => {
    setReadingComic(comic);
    setActiveTab('reading');
  };

  // Select a comic detailed card page cover
  const handleComicSelect = (comic: Comic) => {
    setSelectedComic(comic);
    setActiveTab('details');
  };

  const handleAuthSuccess = (username: string) => {
    setCurrentUser(username);
    setSettingsNewName(username);
    setActiveTab('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSettingsNewName('');
    setActiveTab('home');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (settingsNewName.trim()) {
      setCurrentUser(settingsNewName.trim());
      setShowSaveToast(true);
      setTimeout(() => {
        setShowSaveToast(false);
        setShowSettingsModal(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans flex flex-row overflow-x-hidden antialiased">
      {/* Sidebar Controls Layout */}
      {activeTab !== 'reading' && (
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedPublisher={selectedPublisher}
          setSelectedPublisher={setSelectedPublisher}
          currentUsername={currentUser}
          onLogout={handleLogout}
        />
      )}

      {/* Main content viewport space */}
      <div className={`flex-1 min-h-screen flex flex-col ${activeTab !== 'reading' ? 'pl-64' : 'pl-0'}`}>
        {/* Dynamic header navigation inside general dashboards */}
        {activeTab !== 'reading' && activeTab !== 'register' && activeTab !== 'login' && (
          <Header
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            currentUsername={currentUser}
            onAuthTrigger={() => setActiveTab('login')}
            onSettingsTrigger={() => {
              setSettingsNewName(currentUser || '');
              setShowSettingsModal(true);
            }}
          />
        )}

        {/* Core application tabs switches */}
        <main className="flex-grow">
          {activeTab === 'home' && (
            <div className="px-12 py-10">
              <Dashboard
                comics={comics}
                selectedPublisher={selectedPublisher}
                activeSection={activeSection}
                searchTerm={searchTerm}
                onComicSelect={handleComicSelect}
                onComicRead={handleComicRead}
                onBookmarkToggle={handleBookmarkToggle}
              />
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="px-12 py-10">
              <SavedComics
                comics={comics}
                onComicSelect={handleComicSelect}
                onComicRead={handleComicRead}
                onBookmarkRemove={handleBookmarkToggle}
                onNavigateHome={() => setActiveTab('home')}
              />
            </div>
          )}

          {activeTab === 'details' && selectedComic && (
            <Details
              comic={selectedComic}
              onBack={() => setActiveTab('home')}
              onRead={handleComicRead}
              onBookmarkToggle={handleBookmarkToggle}
              allComics={comics}
              onComicSelect={handleComicSelect}
            />
          )}

          {activeTab === 'reading' && readingComic && (
            <Reader
              comic={readingComic}
              onBack={() => {
                setActiveTab(selectedComic ? 'details' : 'home');
                setReadingComic(null);
              }}
              currentUser={currentUser}
            />
          )}

          {(activeTab === 'register' || activeTab === 'login') && (
            <Auth
              initialMode={activeTab === 'register' ? 'register' : 'login'}
              onSuccess={handleAuthSuccess}
              onExit={() => setActiveTab('home')}
            />
          )}
        </main>
      </div>

      {/* FOOTER GENERAL BRANDING CREDITS ON BACKGROUND */}
      {activeTab !== 'reading' && (
        <span className="fixed bottom-4 right-4 z-0 text-[10px] text-white/5 opacity-20 pointer-events-none select-none">
          hqstream.online.premium-platform
        </span>
      )}

      {/* ACCOUNT SETTINGS MODAL */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/85 backdrop-blur-md p-6 select-none animate-fade-in">
          <div className="relative w-full max-w-sm bg-brand-container border border-white/5 rounded-2xl shadow-2xl p-6 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold" />
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display font-extrabold text-white text-base flex items-center gap-2">
                <SettingsIcon size={16} className="text-brand-gold animate-spin-slow" />
                Configurar Perfil VIP
              </h3>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="text-on-surface-variant opacity-60 hover:opacity-100 cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">
                  Apelido de Membro
                </label>
                <input
                  type="text"
                  required
                  value={settingsNewName}
                  onChange={(e) => setSettingsNewName(e.target.value)}
                  className="w-full bg-brand-highest border-0 rounded-lg py-2.5 px-3 text-xs text-white focus:ring-1 focus:ring-brand-gold outline-none"
                  placeholder="Nome do assinante"
                />
              </div>

              {showSaveToast ? (
                <div className="p-3 bg-brand-gold/15 border border-brand-gold/25 rounded-xl flex items-center gap-2.5 text-xs text-brand-gold">
                  <CheckCircle2 size={14} />
                  <span>Perfil atualizado com sucesso!</span>
                </div>
              ) : (
                <div className="pt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSettingsModal(false)}
                    className="flex-1 py-2.5 bg-brand-highest hover:bg-white/5 text-white/80 font-sans font-semibold text-xs rounded-xl cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-brand-gold hover:brightness-110 text-brand-dark font-sans font-extrabold text-xs rounded-xl cursor-pointer"
                  >
                    Salvar Mudanças
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
