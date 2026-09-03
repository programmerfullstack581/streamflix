import React, { useState, useEffect } from 'react';
import { Search, Bell, Tv, Film, Download, Bookmark, Sparkles, User, Menu, X, PlusCircle, Smartphone, Settings, Music } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  watchlistCount, 
  downloadsCount,
  onOpenImporter,
  onOpenApiSettings
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
    } else {
      alert('Para instalar StreamFlix como App Nativa, abre el menú de tu navegador y selecciona "Agregar a la pantalla de inicio" o "Instalar aplicación".');
    }
  };

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Sparkles },
    { id: 'peliculas', label: 'Películas', icon: Film },
    { id: 'tv-envivo', label: 'TV en Vivo', icon: Tv, badge: 'EN VIVO', badgeColor: 'bg-red-600' },
    { id: 'musica', label: 'Música', icon: Music, badge: 'MP3', badgeColor: 'bg-green-600' },
    { id: 'mi-lista', label: 'Mi Lista', icon: Bookmark, count: watchlistCount },
    { id: 'descargas', label: 'Descargas', icon: Download, count: downloadsCount },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-colors duration-300 ${isScrolled ? 'bg-[#141414]/95 backdrop-blur-md shadow-2xl border-b border-white/5' : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => setActiveTab('inicio')}
              className="flex items-center space-x-2 group text-left focus:outline-none"
            >
              <span className="text-3xl sm:text-4xl font-black tracking-tighter text-red-600 group-hover:scale-105 transition-transform duration-200">
                STREAM<span className="text-white font-bold">FLIX</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-red-600/20 text-red-500 border border-red-500/30 rounded-full hidden sm:inline-block">
                PRO
              </span>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                      isActive 
                        ? 'text-white bg-white/10 shadow-lg font-semibold' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-red-500' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[9px] font-black text-white px-1.5 py-0.5 rounded-full ${item.badgeColor} animate-pulse`}>
                        {item.badge}
                      </span>
                    )}
                    {item.count > 0 && (
                      <span className="text-[10px] font-bold text-white px-1.5 py-0.2 bg-red-600 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* API Settings Button */}
            <button
              onClick={onOpenApiSettings}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-extrabold transition-all shadow-lg"
              title="Configurar API de Películas Gratis"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">⚙️ API Películas</span>
            </button>

            {/* Import IPTV Channel */}
            <button
              onClick={onOpenImporter}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-400 rounded-xl text-xs font-bold transition-all shadow-md"
              title="Importar lista .m3u8 de canales"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Canal IPTV</span>
            </button>

            {/* Install PWA Button */}
            <button
              onClick={handleInstallPWA}
              className="hidden sm:flex items-center space-x-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all border border-white/10"
              title="Instalar como App Nativa"
            >
              <Smartphone className="w-4 h-4 text-green-400" />
              <span>Instalar App</span>
            </button>

            {/* Search Input */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-black/80 border border-red-500/50 rounded-full px-3 py-1.5 w-48 sm:w-64 transition-all duration-300">
                  <Search className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Buscar películas, canales..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="bg-transparent text-xs sm:text-sm text-white focus:outline-none w-full placeholder-gray-400"
                  />
                  <button 
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                    className="text-gray-400 hover:text-white ml-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  title="Buscar"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* User Profile Avatar */}
            <div className="flex items-center space-x-2 border-l border-white/10 pl-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-600 to-purple-600 p-[2px] cursor-pointer hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#141414] rounded-[6px] flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white rounded-lg focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#141414]/98 border-b border-white/10 px-4 pt-2 pb-4 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive ? 'bg-red-600 text-white font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-black text-white px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
                {item.count > 0 && (
                  <span className="text-xs font-bold bg-white text-black px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 flex flex-col space-y-2 border-t border-white/10">
            <button
              onClick={() => { onOpenApiSettings(); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl"
            >
              <Settings className="w-4 h-4" />
              <span>⚙️ Configurar API Películas</span>
            </button>

            <button
              onClick={() => { onOpenImporter(); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 bg-red-950/60 border border-red-500/40 text-red-400 font-bold text-xs rounded-xl"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Importar Canal IPTV (.m3u)</span>
            </button>

            <button
              onClick={() => { handleInstallPWA(); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 bg-white/10 text-white font-bold text-xs rounded-xl"
            >
              <Smartphone className="w-4 h-4 text-green-400" />
              <span>Instalar como App Nativa</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
