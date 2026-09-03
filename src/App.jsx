import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MovieRow from './components/MovieRow';
import LiveTVSection from './components/LiveTVSection';
import VideoPlayerModal from './components/VideoPlayerModal';
import MovieDetailsModal from './components/MovieDetailsModal';
import M3UImporterModal from './components/M3UImporterModal';
import ApiSettingsModal from './components/ApiSettingsModal';
import DownloadsSection from './components/DownloadsSection';
import MusicSection from './components/MusicSection';
import { 
  FEATURED_HERO, 
  COLOMBIA_TV_CHANNELS, 
  StorageService,
  fetchTrendingMoviesTMDB,
  searchMoviesTMDB,
  fetchPopularByGenre,
  fetchLiveIPTVChannels,
  getSavedApiConfig,
  FALLBACK_REAL_MOVIES
} from './services/api';
import { Play, Sparkles, Film, Bookmark, Search, Tv, Music } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMedia, setActiveMedia] = useState(null);
  const [selectedMovieDetail, setSelectedMovieDetail] = useState(null);
  const [isImporterOpen, setIsImporterOpen] = useState(false);
  const [isApiSettingsOpen, setIsApiSettingsOpen] = useState(false);
  const [apiConfig, setApiConfig] = useState(getSavedApiConfig());
  const [watchlist, setWatchlist] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [customChannels, setCustomChannels] = useState([]);
  const [apiLiveChannels, setApiLiveChannels] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(28);
  const [toastMessage, setToastMessage] = useState(null);

  // TMDB Real Movies State
  const [trendingMovies, setTrendingMovies] = useState(FALLBACK_REAL_MOVIES);
  const [actionMovies, setActionMovies] = useState(FALLBACK_REAL_MOVIES);
  const [sciFiMovies, setSciFiMovies] = useState(FALLBACK_REAL_MOVIES);
  const [genreFilteredMovies, setGenreFilteredMovies] = useState([]);
  const [searchResultsMovies, setSearchResultsMovies] = useState([]);
  const [isSearchingTMDB, setIsSearchingTMDB] = useState(false);

  const genres = [
    { id: 28, name: '⚡ Acción' },
    { id: 878, name: '🛸 Ciencia Ficción' },
    { id: 35, name: '😂 Comedia' },
    { id: 27, name: '👻 Terror' },
    { id: 16, name: '🎨 Animación' },
    { id: 18, name: '🎭 Drama' },
  ];

  useEffect(() => {
    setWatchlist(StorageService.getWatchlist());
    setDownloads(StorageService.getDownloads());

    try {
      const savedCustom = localStorage.getItem('streamflix_custom_channels');
      if (savedCustom) setCustomChannels(JSON.parse(savedCustom));
    } catch {}

    fetchLiveIPTVChannels().then(channels => {
      if (channels && channels.length > 0) setApiLiveChannels(channels);
    });

    fetchTrendingMoviesTMDB().then(movies => {
      if (movies && movies.length > 0) setTrendingMovies(movies);
    });

    fetchPopularByGenre(28).then(movies => {
      if (movies && movies.length > 0) setActionMovies(movies);
    });

    fetchPopularByGenre(878).then(movies => {
      if (movies && movies.length > 0) setSciFiMovies(movies);
    });
  }, []);

  useEffect(() => {
    fetchPopularByGenre(selectedGenreId).then(movies => {
      if (movies && movies.length > 0) setGenreFilteredMovies(movies);
    });
  }, [selectedGenreId]);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      setSearchResultsMovies([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingTMDB(true);
      const results = await searchMoviesTMDB(searchQuery);
      setSearchResultsMovies(results);
      setIsSearchingTMDB(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveApiConfig = (newConfig) => {
    setApiConfig(newConfig);
    localStorage.setItem('streamflix_api_config', JSON.stringify(newConfig));
    showToast(`API "${newConfig.providerName}" guardada con éxito`);
  };

  const handleToggleWatchlist = (movie) => {
    const isSaved = watchlist.some(i => i.id === movie.id);
    if (isSaved) {
      const updated = StorageService.removeFromWatchlist(movie.id);
      setWatchlist(updated);
      showToast(`Quitado de Mi Lista`);
    } else {
      const updated = StorageService.addToWatchlist(movie);
      setWatchlist(updated);
      showToast(`Guardado en Mi Lista`);
    }
  };

  const handleDownload = (movie) => {
    const isDownloaded = downloads.some(i => i.id === movie.id);
    if (!isDownloaded) {
      const updated = StorageService.addDownload(movie);
      setDownloads(updated);
      showToast(`Descargado con éxito para ver offline`);
    } else {
      showToast(`Esta película ya está guardada en tus descargas`);
    }
  };

  const handleDeleteDownload = (id) => {
    const updated = StorageService.removeDownload(id);
    setDownloads(updated);
    showToast(`Descarga eliminada`);
  };

  const handleAddCustomChannel = (channel) => {
    const updated = [channel, ...customChannels];
    setCustomChannels(updated);
    localStorage.setItem('streamflix_custom_channels', JSON.stringify(updated));
    showToast(`Canal "${channel.name}" agregado con éxito`);
  };

  const savedIds = watchlist.map(m => m.id);
  const allChannels = [...customChannels, ...COLOMBIA_TV_CHANNELS, ...apiLiveChannels];

  const searchResultsChannels = searchQuery.trim()
    ? allChannels.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.category.toLowerCase().includes(searchQuery.toLowerCase()) || c.country.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const heroMovie = trendingMovies[0] || FEATURED_HERO;

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col font-sans selection:bg-red-600">
      
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        watchlistCount={watchlist.length}
        downloadsCount={downloads.length}
        onOpenImporter={() => setIsImporterOpen(true)}
        onOpenApiSettings={() => setIsApiSettingsOpen(true)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-600 text-white font-bold px-4 py-3 rounded-xl shadow-2xl animate-bounce flex items-center space-x-2 border border-white/20">
          <Sparkles className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Views */}
      <main className="flex-grow">
        
        {/* Dynamic Search View */}
        {searchQuery.trim() !== '' ? (
          <div className="pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Search className="w-6 h-6 text-red-500" />
              <span>Resultados para "{searchQuery}"</span>
            </h1>

            {/* Movies Results */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-300">Películas Reales ({searchResultsMovies.length})</h2>
                {isSearchingTMDB && <span className="text-xs text-red-400 font-bold animate-pulse">Buscando en catálogo mundial...</span>}
              </div>

              {searchResultsMovies.length === 0 && !isSearchingTMDB ? (
                <p className="text-sm text-gray-400">No se encontraron películas con ese título.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {searchResultsMovies.map((movie) => (
                    <div 
                      key={movie.id}
                      onClick={() => setSelectedMovieDetail(movie)}
                      className="bg-netflix-card border border-white/10 rounded-lg overflow-hidden cursor-pointer group hover:border-red-500 transition-colors"
                    >
                      <div className="aspect-[2/3] relative bg-gray-900">
                        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-10 h-10 fill-white text-white" />
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="text-xs font-bold truncate text-white">{movie.title}</h3>
                        <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1">
                          <span className="text-green-400 font-bold">{movie.year}</span>
                          <span>{movie.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TV Channels Results */}
            {searchResultsChannels.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h2 className="text-lg font-bold text-gray-300">Canales de TV ({searchResultsChannels.length})</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {searchResultsChannels.map((channel) => (
                    <div
                      key={channel.id}
                      onClick={() => setActiveMedia(channel)}
                      className="p-3 bg-netflix-card border border-white/10 rounded-xl cursor-pointer flex items-center space-x-3 hover:border-red-500 transition-colors"
                    >
                      <img src={channel.logo} alt={channel.name} className="w-10 h-10 object-contain bg-white p-1 rounded-lg" />
                      <div>
                        <h3 className="text-sm font-bold text-white">{channel.name}</h3>
                        <p className="text-xs text-red-400 font-bold">{channel.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* TAB: INICIO */}
            {activeTab === 'inicio' && (
              <div className="space-y-4">
                <HeroBanner
                  movie={heroMovie}
                  onPlay={(m) => setSelectedMovieDetail(m)}
                  onDownload={handleDownload}
                  isSaved={savedIds.includes(heroMovie.id)}
                  onToggleWatchlist={handleToggleWatchlist}
                />

                <div className="-mt-16 sm:-mt-24 relative z-20 space-y-6 pb-16">
                  <MovieRow
                    title="🔥 Tendencias Mundiales Hoy (Películas Reales)"
                    movies={trendingMovies}
                    onPlay={(m) => setSelectedMovieDetail(m)}
                    onDownload={handleDownload}
                    savedIds={savedIds}
                    onToggleWatchlist={handleToggleWatchlist}
                  />

                  <MovieRow
                    title="⚡ Películas de Acción e Intensa Adrenalina"
                    movies={actionMovies}
                    onPlay={(m) => setSelectedMovieDetail(m)}
                    onDownload={handleDownload}
                    savedIds={savedIds}
                    onToggleWatchlist={handleToggleWatchlist}
                  />

                  <MovieRow
                    title="🛸 Ciencia Ficción y Futuro"
                    movies={sciFiMovies}
                    onPlay={(m) => setSelectedMovieDetail(m)}
                    onDownload={handleDownload}
                    savedIds={savedIds}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                </div>
              </div>
            )}

            {/* TAB: PELICULAS */}
            {activeTab === 'peliculas' && (
              <div className="pt-24 space-y-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="space-y-3">
                  <h1 className="text-3xl font-black text-white">Catálogo de Películas por Género</h1>
                  <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-2 border-b border-white/10">
                    {genres.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setSelectedGenreId(g.id)}
                        className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                          selectedGenreId === g.id 
                            ? 'bg-red-600 text-white shadow-lg scale-105' 
                            : 'bg-netflix-card text-gray-300 hover:bg-gray-800 hover:text-white border border-white/10'
                        }`}
                      >
                        {g.name}
                      </button>
                    ))}
                  </div>
                </div>

                <MovieRow
                  title={`Películas Destacadas`}
                  movies={genreFilteredMovies.length > 0 ? genreFilteredMovies : trendingMovies}
                  onPlay={(m) => setSelectedMovieDetail(m)}
                  onDownload={handleDownload}
                  savedIds={savedIds}
                  onToggleWatchlist={handleToggleWatchlist}
                />

                <MovieRow
                  title="🔥 Películas Más Vistas"
                  movies={trendingMovies}
                  onPlay={(m) => setSelectedMovieDetail(m)}
                  onDownload={handleDownload}
                  savedIds={savedIds}
                  onToggleWatchlist={handleToggleWatchlist}
                />
              </div>
            )}

            {/* TAB: TV EN VIVO */}
            {activeTab === 'tv-envivo' && (
              <LiveTVSection
                channels={allChannels}
                onSelectChannel={(ch) => setActiveMedia(ch)}
                activeChannel={null}
              />
            )}

            {/* TAB: MUSICA */}
            {activeTab === 'musica' && (
              <MusicSection />
            )}

            {/* TAB: MI LISTA */}
            {activeTab === 'mi-lista' && (
              <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h1 className="text-3xl font-black text-white flex items-center space-x-2">
                    <Bookmark className="w-7 h-7 text-red-500" />
                    <span>Mi Lista de Favoritos</span>
                  </h1>
                </div>

                {watchlist.length === 0 ? (
                  <div className="py-20 text-center text-gray-400 bg-netflix-card/40 rounded-2xl border border-white/5">
                    <p className="text-lg">Aún no has agregado películas a tu lista.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {watchlist.map((movie) => (
                      <div
                        key={movie.id}
                        className="bg-netflix-card border border-white/10 rounded-lg overflow-hidden group hover:border-red-500 transition-colors"
                      >
                        <div className="aspect-[2/3] relative">
                          <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => setSelectedMovieDetail(movie)}
                              className="p-3 bg-red-600 text-white rounded-full shadow-lg"
                            >
                              <Play className="w-6 h-6 fill-white" />
                            </button>
                          </div>
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <h3 className="text-xs font-bold truncate flex-1">{movie.title}</h3>
                          <button
                            onClick={() => handleToggleWatchlist(movie)}
                            className="text-red-500 hover:text-white text-xs font-bold ml-2"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: DESCARGAS */}
            {activeTab === 'descargas' && (
              <DownloadsSection
                downloads={downloads}
                onPlay={(m) => setSelectedMovieDetail(m)}
                onDelete={handleDeleteDownload}
              />
            )}
          </>
        )}

      </main>

      {/* Movie Details Modal */}
      {selectedMovieDetail && (
        <MovieDetailsModal
          movie={selectedMovieDetail}
          onClose={() => setSelectedMovieDetail(null)}
          onPlay={(m) => setActiveMedia(m)}
          onDownload={handleDownload}
          isSaved={savedIds.includes(selectedMovieDetail.id)}
          onToggleWatchlist={handleToggleWatchlist}
        />
      )}

      {/* API Config Settings Modal */}
      {isApiSettingsOpen && (
        <ApiSettingsModal
          onClose={() => setIsApiSettingsOpen(false)}
          onSaveConfig={handleSaveApiConfig}
          currentConfig={apiConfig}
        />
      )}

      {/* IPTV Custom Channel Importer Modal */}
      {isImporterOpen && (
        <M3UImporterModal
          onClose={() => setIsImporterOpen(false)}
          onAddCustomChannel={handleAddCustomChannel}
        />
      )}

      {/* Video Player Modal */}
      {activeMedia && (
        <VideoPlayerModal
          item={activeMedia}
          onClose={() => setActiveMedia(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-8 px-4 text-center text-xs text-gray-500 space-y-2">
        <p className="font-bold text-gray-400">STREAMFLIX PRO 🇨🇴 — Conectado a API Active: {apiConfig.providerName}</p>
        <p>Servidores HLS redundantes preparados para alta concurrencia de usuarios.</p>
      </footer>

    </div>
  );
}
