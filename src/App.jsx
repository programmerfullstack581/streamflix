import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import LibraryView from './components/LibraryView';
import DownloadsView from './components/DownloadsView';
import Player from './components/Player';
import DownloadModal from './components/DownloadModal';
import { 
  MusicStorage, 
  CURATED_TOP_HITS 
} from './services/musicService';
import { Sparkles, Heart, Download } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Audio state
  const [currentTrack, setCurrentTrack] = useState(CURATED_TOP_HITS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState(CURATED_TOP_HITS);
  
  // Download Modal state
  const [downloadModalTrack, setDownloadModalTrack] = useState(null);

  // Storage states
  const [likedTracks, setLikedTracks] = useState([]);
  const [customPlaylists, setCustomPlaylists] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    setLikedTracks(MusicStorage.getLikedTracks());
    setCustomPlaylists(MusicStorage.getCustomPlaylists());
    setDownloads(MusicStorage.getDownloads());
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePlayAll = (tracks) => {
    if (tracks && tracks.length > 0) {
      setQueue(tracks);
      setCurrentTrack(tracks[0]);
      setIsPlaying(true);
      showToast(`Reproduciendo lista (${tracks.length} canciones)`);
    }
  };

  const handleNextTrack = (isShuffle = false) => {
    if (!queue || queue.length === 0) return;
    if (isShuffle) {
      const randomIdx = Math.floor(Math.random() * queue.length);
      setCurrentTrack(queue[randomIdx]);
    } else {
      const idx = queue.findIndex(t => t.videoId === currentTrack.videoId);
      const nextIdx = (idx + 1) % queue.length;
      setCurrentTrack(queue[nextIdx]);
    }
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    if (!queue || queue.length === 0) return;
    const idx = queue.findIndex(t => t.videoId === currentTrack.videoId);
    const prevIdx = (idx - 1 + queue.length) % queue.length;
    setCurrentTrack(queue[prevIdx]);
    setIsPlaying(true);
  };

  const handleToggleLike = (track) => {
    const { updated, isLiked } = MusicStorage.toggleLikeTrack(track);
    setLikedTracks(updated);
    showToast(isLiked ? '❤️ Guardado en tus canciones que te gustan' : 'Eliminado de tus favoritos');
  };

  const handleCreatePlaylist = (name) => {
    const updated = MusicStorage.createPlaylist(name);
    setCustomPlaylists(updated);
    showToast(`Playlist "${name}" creada`);
  };

  const handleOpenDownload = (track) => {
    setDownloadModalTrack(track);
  };

  const handleRefreshDownloads = () => {
    setDownloads(MusicStorage.getDownloads());
  };

  const handleSelectGenreOrArtist = (query) => {
    setSearchQuery(query);
    setActiveTab('buscar');
  };

  const likedTrackIds = likedTracks.map(t => t.videoId);

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col font-sans overflow-hidden select-none">
      
      {/* Main App Container */}
      <div className="flex flex-1 overflow-hidden p-2 gap-2">
        
        {/* Desktop Spotify Sidebar */}
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

        {/* Main Content Area */}
        <div className="flex-1 bg-[#121212] rounded-xl flex flex-col overflow-hidden relative">
          
          {/* Top Navbar */}
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            likedCount={likedTracks.length}
            downloadsCount={downloads.length}
            onOpenQuickDownload={() => setActiveTab('descargas')}
          />

          {/* Dynamic Scrollable Views */}
          <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
            
            {/* View: INICIO */}
            {activeTab === 'inicio' && (
              <HomeView
                onPlayTrack={handlePlayTrack}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onToggleLike={handleToggleLike}
                likedTrackIds={likedTrackIds}
                onOpenDownload={handleOpenDownload}
                onSelectGenre={handleSelectGenreOrArtist}
                onSelectArtist={handleSelectGenreOrArtist}
              />
            )}

            {/* View: BUSCAR */}
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
                onSelectGenre={handleSelectGenreOrArtist}
              />
            )}

            {/* View: FAVORITOS (Canciones que te gustan) */}
            {activeTab === 'favoritos' && (
              <LibraryView
                viewType="favoritos"
                likedTracks={likedTracks}
                onPlayTrack={handlePlayTrack}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onToggleLike={handleToggleLike}
                likedTrackIds={likedTrackIds}
                onOpenDownload={handleOpenDownload}
                onPlayAll={handlePlayAll}
              />
            )}

            {/* View: PLAYLIST DETAIL */}
            {activeTab === 'playlist-detail' && (
              <LibraryView
                viewType="playlist-detail"
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

            {/* View: BIBLIOTECA GENERAL */}
            {activeTab === 'biblioteca' && (
              <LibraryView
                viewType="favoritos"
                likedTracks={likedTracks}
                onPlayTrack={handlePlayTrack}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onToggleLike={handleToggleLike}
                likedTrackIds={likedTrackIds}
                onOpenDownload={handleOpenDownload}
                onPlayAll={handlePlayAll}
              />
            )}

            {/* View: DESCARGAS */}
            {activeTab === 'descargas' && (
              <DownloadsView
                downloads={downloads}
                onPlayTrack={handlePlayTrack}
                onOpenDownloadModal={handleOpenDownload}
                onRefreshDownloads={handleRefreshDownloads}
              />
            )}

          </main>

        </div>

      </div>

      {/* Persistent Bottom Spotify Player Bar */}
      <Player
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onNext={handleNextTrack}
        onPrev={handlePrevTrack}
        onToggleLike={handleToggleLike}
        isLiked={likedTrackIds.includes(currentTrack?.videoId)}
        onOpenDownload={handleOpenDownload}
        queue={queue}
        onSelectQueueTrack={handlePlayTrack}
      />

      {/* Multi-Format Download Modal */}
      {downloadModalTrack && (
        <DownloadModal
          track={downloadModalTrack}
          onClose={() => setDownloadModalTrack(null)}
          onDownloadRecorded={handleRefreshDownloads}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#1DB954] text-black font-black px-5 py-3 rounded-full shadow-2xl flex items-center space-x-2 animate-fadeIn border border-black/20">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs sm:text-sm">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
