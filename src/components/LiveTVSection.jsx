import React, { useState } from 'react';
import { Tv, Radio, Users, Play, Globe, Sparkles, Volume2, ShieldCheck, Trophy, Calendar, Zap } from 'lucide-react';
import { LIVE_MATCHES } from '../services/api';

export default function LiveTVSection({ channels, onSelectChannel, activeChannel }) {
  const [selectedCategory, setSelectedCategory] = useState('🇨🇴 Colombia');
  const [activeTab, setActiveTab] = useState('canales');

  const categories = ['🇨🇴 Colombia', '⚽ Deportes', 'Nacional', 'Todas las Señales'];

  const filteredChannels = selectedCategory === 'Todas las Señales' 
    ? channels 
    : selectedCategory === '🇨🇴 Colombia'
    ? channels.filter(ch => ch.country.includes('Colombia'))
    : selectedCategory === '⚽ Deportes'
    ? channels.filter(ch => ch.category === 'Deportes')
    : channels.filter(ch => ch.category === selectedCategory);

  const currentChannel = activeChannel || channels[0];

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 select-none">
      
      {/* Super TV Header */}
      <div className="bg-gradient-to-r from-red-950/80 via-black to-netflix-card p-6 sm:p-8 rounded-3xl border border-red-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full flex items-center shadow-lg animate-pulse">
                <Radio className="w-4 h-4 mr-1.5" />
                SUPER TV EN VIVO 100% REAL
              </span>
              <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 text-xs font-extrabold px-3 py-1 rounded-full">
                🇨🇴 Colombia & Deportes HD
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Señal Satelital en Vivo y Fútbol Libre
            </h1>

            <p className="text-gray-300 text-sm max-w-2xl">
              Acceso directo a los principales canales de televisión de Colombia (Caracol, RCN, Win Sports+) y señales deportivas internacionales (ESPN, DSports, TyC Sports) sin interrupciones.
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center p-1.5 bg-black/60 rounded-2xl border border-white/10 flex-shrink-0">
            <button
              onClick={() => setActiveTab('canales')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'canales' 
                  ? 'bg-red-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Tv className="w-4 h-4" />
              <span>Canales de TV</span>
            </button>

            <button
              onClick={() => setActiveTab('partidos')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'partidos' 
                  ? 'bg-red-600 text-white shadow-lg animate-pulse' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>Partidos del Día (Fútbol Libre)</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        {activeTab === 'canales' && (
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-2 border-t border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-white text-black font-extrabold shadow-lg scale-105' 
                    : 'bg-gray-900/80 text-gray-300 hover:bg-gray-800 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* VIEW: Partidos del Día */}
      {activeTab === 'partidos' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center space-x-3 text-red-500 font-bold text-lg">
            <Trophy className="w-6 h-6 fill-red-500" />
            <h2>Partidos Destacados de Hoy (Liga BetPlay & Copas)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LIVE_MATCHES.map((match) => (
              <div
                key={match.id}
                className="bg-netflix-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-red-500/80 transition-all transform hover:-translate-y-1"
              >
                <div className="bg-gradient-to-r from-red-950 to-black px-4 py-2.5 flex items-center justify-between border-b border-white/10">
                  <span className="text-xs font-black text-yellow-400">{match.tournament}</span>
                  <span className="text-[10px] font-extrabold bg-red-600 text-white px-2 py-0.5 rounded-full animate-pulse">
                    {match.status}
                  </span>
                </div>

                <div className="p-6 flex items-center justify-between space-x-4">
                  <div className="text-center space-y-2 flex-1">
                    <img 
                      src={match.homeLogo} 
                      alt={match.homeTeam} 
                      className="w-14 h-14 object-contain mx-auto group-hover:scale-110 transition-transform" 
                    />
                    <p className="text-xs font-bold text-white line-clamp-1">{match.homeTeam}</p>
                  </div>

                  <div className="text-center">
                    <span className="text-2xl font-black text-white bg-black/60 px-3 py-1.5 rounded-xl border border-white/10 font-mono">
                      {match.score}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-1">{match.channel}</p>
                  </div>

                  <div className="text-center space-y-2 flex-1">
                    <img 
                      src={match.awayLogo} 
                      alt={match.awayTeam} 
                      className="w-14 h-14 object-contain mx-auto group-hover:scale-110 transition-transform" 
                    />
                    <p className="text-xs font-bold text-white line-clamp-1">{match.awayTeam}</p>
                  </div>
                </div>

                <div className="p-4 bg-black/40 border-t border-white/5">
                  <button
                    onClick={() => onSelectChannel({
                      id: match.id,
                      name: `${match.homeTeam} vs ${match.awayTeam} (${match.tournament})`,
                      category: 'Deportes',
                      country: match.tournament,
                      streamUrl: match.streamUrl,
                      isLive: true
                    })}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-xl"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    <span>VER PARTIDO EN VIVO</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: Canales de TV */}
      {activeTab === 'canales' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Main Channel Preview */}
          {currentChannel && (
            <div className="bg-netflix-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                
                {/* Player Screen */}
                <div className="lg:col-span-2 aspect-video bg-black relative flex items-center justify-center group">
                  <img
                    src={currentChannel.logo}
                    alt={currentChannel.name}
                    className="w-56 h-36 object-contain opacity-60 group-hover:scale-105 transition-transform duration-300 drop-shadow-2xl"
                  />
                  
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center space-y-4">
                    <button
                      onClick={() => onSelectChannel(currentChannel)}
                      className="flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white font-black px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-all"
                    >
                      <Play className="w-7 h-7 fill-white" />
                      <span>SINTONIZAR SEÑAL EN DIRECTO</span>
                    </button>

                    <p className="text-xs text-gray-300 bg-black/80 px-4 py-1.5 rounded-full border border-white/10 flex items-center">
                      <Zap className="w-3.5 h-3.5 text-yellow-400 mr-1.5" />
                      Transmisión HD Única e Independiente
                    </p>
                  </div>

                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full flex items-center shadow-lg animate-pulse">
                      <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                      EN VIVO
                    </span>
                    <span className="bg-black/90 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                      {currentChannel.country}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 bg-black/90 text-gray-300 text-xs px-3 py-1 rounded-full flex items-center border border-white/10 font-bold">
                    <Users className="w-3.5 h-3.5 mr-1.5 text-red-500" />
                    <span>{currentChannel.viewers} personas viendo</span>
                  </div>
                </div>

                {/* Channel Details */}
                <div className="p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#1c1c1c] to-[#141414]">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-16 bg-gray-900 rounded-2xl p-2 flex items-center justify-center shadow-2xl flex-shrink-0 border border-white/20 overflow-hidden">
                        <img 
                          src={currentChannel.logo} 
                          alt={currentChannel.name} 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-white">{currentChannel.name}</h2>
                        <span className="text-xs font-bold text-red-500 bg-red-950/60 px-2.5 py-0.5 rounded-md border border-red-500/30">
                          {currentChannel.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed">
                      {currentChannel.description || 'Transmisión directa satelital en alta definición con servidores globales sin límite de usuarios.'}
                    </p>

                    <div className="space-y-2 pt-2 text-xs">
                      <div className="flex items-center justify-between text-gray-400 py-1.5 border-b border-white/5">
                        <span>Origen</span>
                        <span className="text-white font-bold">{currentChannel.country}</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-400 py-1.5 border-b border-white/5">
                        <span>Calidad</span>
                        <span className="text-green-400 font-bold">Full HD 1080p 60FPS</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-400 py-1.5">
                        <span>Estado</span>
                        <span className="text-green-400 font-bold flex items-center">
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span> 100% Online
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => onSelectChannel(currentChannel)}
                      className="w-full bg-white hover:bg-gray-200 text-black font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-2xl"
                    >
                      <Play className="w-5 h-5 fill-black" />
                      <span>Sintonizar Ahora</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Channels Grid */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Tv className="w-5 h-5 text-red-500" />
              <span>Lista de Canales Oficiales ({filteredChannels.length})</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredChannels.map((channel) => {
                const isSelected = currentChannel?.id === channel.id;
                return (
                  <div
                    key={channel.id}
                    onClick={() => onSelectChannel(channel)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer group flex items-center space-x-4 ${
                      isSelected 
                        ? 'bg-red-950/40 border-red-500 ring-2 ring-red-500/50 shadow-2xl scale-[1.02]' 
                        : 'bg-netflix-card border-white/5 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    {/* SVG Vectorial Inline Container */}
                    <div className="w-20 h-14 rounded-xl bg-gray-900 p-1 flex items-center justify-center border border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform shadow-md overflow-hidden">
                      <img
                        src={channel.logo}
                        alt={channel.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                        <h3 className="text-sm font-black text-white truncate group-hover:text-red-400 transition-colors">
                          {channel.name}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{channel.country}</p>
                      <span className="text-[10px] font-bold text-red-400 bg-red-950/40 px-1.5 py-0.2 rounded mt-1 inline-block">
                        {channel.category}
                      </span>
                    </div>

                    <div className="text-right">
                      <Play className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
