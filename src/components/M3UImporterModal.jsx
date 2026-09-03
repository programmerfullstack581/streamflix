import React, { useState } from 'react';
import { X, Tv, Plus, Link, Check, Radio } from 'lucide-react';

export default function M3UImporterModal({ onClose, onAddCustomChannel }) {
  const [name, setName] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [category, setCategory] = useState('Deportes');
  const [country, setCountry] = useState('🇨🇴 Colombia');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !streamUrl.trim()) return;

    const newChannel = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      category: category,
      country: country,
      logo: 'https://raw.githubusercontent.com/iptv-org/iptv/master/logos/WinSports.co.png',
      streamUrl: streamUrl.trim(),
      embedUrl: streamUrl.trim().includes('.m3u8') ? `https://m3u8player.org/player.html?url=${encodeURIComponent(streamUrl.trim())}` : streamUrl.trim(),
      isLive: true,
      viewers: 'Custom'
    };

    onAddCustomChannel(newChannel);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn select-none">
      <div className="relative bg-[#181818] border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-600/20 text-red-500 rounded-xl">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Importar Canal / Lista IPTV</h2>
              <p className="text-xs text-gray-400">Agrega canales en vivo mediante enlace .m3u8 u HLS</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-300">Nombre del Canal</label>
            <input
              type="text"
              placeholder="Ej: Win Sports 2, ESPN Premium, TV Local"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-300">URL de Transmisión (.m3u8 u HLS)</label>
            <div className="relative">
              <Link className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="url"
                placeholder="https://ejemplo.com/stream/index.m3u8"
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                required
                className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-300">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="Deportes">⚽ Deportes</option>
                <option value="Nacional">🇨🇴 Nacional</option>
                <option value="Noticias">📰 Noticias</option>
                <option value="Entretenimiento">🎬 Entretenimiento</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-300">País / Región</label>
              <input
                type="text"
                placeholder="🇨🇴 Colombia"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Guardar Canal en Vivo</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
