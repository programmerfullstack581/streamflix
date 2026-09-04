import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import DownloadsView from './components/DownloadsView';
import LibraryView from './components/LibraryView';
import Player from './components/Player';
import DownloadModal from './components/DownloadModal';
import InstallModal from './components/InstallModal';
import { 
  MusicStorage, 
  CURATED_TOP_HITS 
} from './services/musicService';
import { Zap } from 'lucide-react';

export default function App() {
  // Navigation tab state: 'inicio' | 'buscar' | 'descargar-url' | 'descargas' | 'favoritos' | 'playlist-detail'
  const [activeTab, setActiveTab] = useState('inicio');
  const [searchQuery, setSearchQuery] = useState('');

  // Player & Queue state
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState(CURATED_TOP_HITS);

  // Storage and User Collections states
  const [likedTracks, setLikedTracks] = useState([]);
  const [customPlaylists, setCustomPlaylists] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  // Modals and Toasts
  const [downloadModalTrack, setDownloadModalTrack] = useState(null);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Cargar datos locales iniciales
    setLikedTracks(MusicStorage.getLikedTracks());
    setCustomPlaylists(MusicStorage.getCustomPlaylists());
    setDownloads(MusicStorage.getDownloads());

    const handlePrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handlePrompt);
    return () => window.removeEventListener('beforeinstallprompt', handlePrompt);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ── Reproducción de Canciones y Control de Cola ──────────────────────────────
  const handlePlayTrack = (track) => {
    if (!track) return;
    if (currentTrack?.videoId === track.videoId) {
      setIsPlaying(!isPlaying);
      return;
    }
    setCurrentTrack(track);
    setIsPlaying(true);

    // Asegurar que la canción esté en la cola
    if (!queue.some((t) => t.videoId === track.videoId)) {
      setQueue([track, ...queue]);
    }
  };

  const handlePlayAll = (tracksList) => {
    if (!tracksList || tracksList.length === 0) return;
    setQueue(tracksList);
    setCurrentTrack(tracksList[0]);
    setIsPlaying(true);
  };

  const handleNext = (isShuffle = false) => {
    if (queue.length === 0) return;
    if (isShuffle) {
      const randIdx = Math.floor(Math.random() * queue.length);
      setCurrentTrack(queue[randIdx]);
      return;
    }
    const currIdx = queue.findIndex((t) => t.videoId === currentTrack?.videoId);
    const nextIdx = (currIdx + 1) % queue.length;
    setCurrentTrack(queue[nextIdx]);
  };

  const handlePrev = () => {
    if (queue.length === 0) return;
    const currIdx = queue.findIndex((t) => t.videoId === currentTrack?.videoId);
    const prevIdx = currIdx <= 0 ? queue.length - 1 : currIdx - 1;
    setCurrentTrack(queue[prevIdx]);
  };

  // ── Manejo de Favoritos (Likes) y Playlists ──────────────────────────────────
  const handleToggleLike = (track) => {
    const { updated, isLiked } = MusicStorage.toggleLikeTrack(track);
    setLikedTracks(updated);
    showToast(isLiked ? '❤️ Agregado a Favoritos' : '💔 Eliminado de Favoritos');
  };

  const handleCreatePlaylist = (name) => {
    const updated = MusicStorage.createPlaylist(name);
    setCustomPlaylists(updated);
    showToast(`🎵 Playlist "${name}" creada`);
  };

  const handleRefreshDownloads = () => {
    setDownloads(MusicStorage.getDownloads());
  };

  // ── Atajos de Navegación ───────────────────────────────────────────────────
  const handleSelectGenre = (genreName) => {
    setSearchQuery(genreName);
    setActiveTab('buscar');
  };

  const handleSelectArtist = (artistName) => {
    setSearchQuery(artistName);
    setActiveTab('buscar');
  };

  const handleOpenDownload = (track) => {
    setDownloadModalTrack(track);
  };

  const handleDirectInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setIsInstallModalOpen(false);
      });
    }
  };

  const likedTrackIds = likedTracks.map((t) => t.videoId);
  const isCurrentLiked = currentTrack ? likedTrackIds.includes(currentTrack.videoId) : false;

  return (
    <div className="min-h-screen bg-[#070707] text-white flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* Contenedor Principal con Barra Lateral y Cuerpo */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Barra Lateral de Navegación (Sidebar Desktop) */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          likedCount={likedTracks.length}
          downloadsCount={downloads.length}
          customPlaylists={customPlaylists}
          onCreatePlaylist={handleCreatePlaylist}
          onSelectPlaylist={(pl) => {
            setSelectedPlaylist(pl);
            setActiveTab('playlist-detail');
          }}
        />

        {/* Área Central de Vistas */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          
          {/* Barra Superior (Navbar) */}
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            likedCount={likedTracks.length}
            downloadsCount={downloads.length}
            onOpenQuickDownload={() => setActiveTab('descargar-url')}
          />

          {/* Vistas Dinámicas */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8 pb-32">
            
            {/* VISTA 1: INICIO (HOME) */}
            {activeTab === 'inicio' && (
              <HomeView
                onPlayTrack={handlePlayTrack}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onToggleLike={handleToggleLike}
                likedTrackIds={likedTrackIds}
                onOpenDownload={handleOpenDownload}
                onSelectGenre={handleSelectGenre}
                onSelectArtist={handleSelectArtist}
                onGoToUrlDownload={() => setActiveTab('descargar-url')}
              />
            )}

            {/* VISTA 2: BUSCAR & EXPLORAR */}
            {activeTab === 'buscar' && (
              <SearchView
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onPlayTrack={handlePlayTrack}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onToggleLike={handleToggleLike}
                likedTrackIds={likedTrackIds}
                onOpenDownload={handleOpenDownload}
                onSelectGenre={handleSelectGenre}
              />
            )}

            {/* VISTA 3: DESCARGADOR CON URL & ÉXITOS POPULARES */}
            {(activeTab === 'descargar-url' || activeTab === 'descargas') && (
              <DownloadsView
                downloads={downloads}
                onOpenDownloadModal={handleOpenDownload}
                onRefreshDownloads={handleRefreshDownloads}
              />
            )}

            {/* VISTA 4: FAVORITOS & BIBLIOTECA */}
            {(activeTab === 'favoritos' || activeTab === 'playlist-detail') && (
              <LibraryView
                viewType={activeTab === 'favoritos' ? 'favoritos' : 'playlist'}
                likedTracks={likedTracks}
                selectedPlaylist={selectedPlaylist}
                onPlayTrack={handlePlayTrack}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onToggleLike={handleToggleLike}
                likedTrackIds={likedTrackIds}
                onOpenDownload={handleOpenDownload}
                onPlayAll={handlePlayAll}
              />
            )}

          </main>

        </div>

      </div>

      {/* Reproductor Multimedia Global Fijo en la Parte Inferior */}
      {currentTrack && (
        <Player
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onNext={handleNext}
          onPrev={handlePrev}
          onToggleLike={handleToggleLike}
          isLiked={isCurrentLiked}
          onOpenDownload={handleOpenDownload}
          queue={queue}
          onSelectQueueTrack={handlePlayTrack}
        />
      )}

      {/* Modal de Descarga Multiformato */}
      {downloadModalTrack && (
        <DownloadModal
          track={downloadModalTrack}
          onClose={() => setDownloadModalTrack(null)}
          onDownloadRecorded={handleRefreshDownloads}
        />
      )}

      {/* Modal de Instalación PWA */}
      <InstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        deferredPrompt={deferredPrompt}
        onDirectInstall={handleDirectInstall}
      />

      {/* Notificación Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white font-black px-5 py-3 rounded-full shadow-red-neon flex items-center space-x-2 animate-fadeIn border border-white/20">
          <Zap className="w-4 h-4 fill-white" />
          <span className="text-xs sm:text-sm">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
