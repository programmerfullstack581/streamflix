import React, { useState, useEffect } from 'react';
import { X, Key, Server, Check, Sparkles, Globe, ShieldCheck } from 'lucide-react';

export const DEFAULT_API_PROVIDERS = [
  {
    id: 'vidsrc-cc',
    name: 'VidSrc Pro API (Recomendado)',
    baseUrl: 'https://vidsrc.cc/v2/embed/movie/',
    description: 'Películas completas en HD en español y subtituladas. Servidor rápido.'
  },
  {
    id: 'embed-su',
    name: 'EmbedSU Movie API',
    baseUrl: 'https://embed.su/embed/movie/',
    description: 'Excelente calidad 1080p sin límite de velocidad.'
  },
  {
    id: 'multiembed',
    name: 'SuperEmbed Global API',
    baseUrl: 'https://multiembed.mov/?video_id=',
    description: 'Servidor internacional con múltiples idiomas.'
  },
  {
    id: 'custom',
    name: '⚙️ API Personalizada / Servidor Propio',
    baseUrl: '',
    description: 'Ingresa la URL base de tu propia API o servidor de películas privado.'
  }
];

export default function ApiSettingsModal({ onClose, onSaveConfig, currentConfig }) {
  const [selectedProviderId, setSelectedProviderId] = useState(currentConfig?.providerId || 'vidsrc-cc');
  const [customApiUrl, setCustomApiUrl] = useState(currentConfig?.customApiUrl || '');

  const handleSave = (e) => {
    e.preventDefault();
    const activeProvider = DEFAULT_API_PROVIDERS.find(p => p.id === selectedProviderId);
    
    const newConfig = {
      providerId: selectedProviderId,
      providerName: activeProvider?.name || 'API Personalizada',
      baseUrl: selectedProviderId === 'custom' ? customApiUrl : activeProvider?.baseUrl,
      customApiUrl: customApiUrl
    };

    onSaveConfig(newConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn select-none">
      <div className="relative bg-[#181818] border border-white/10 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-red-600/20 text-red-500 rounded-2xl border border-red-500/30">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <span>Conector de APIs de Películas</span>
                <span className="text-[10px] bg-red-600 text-white font-black px-2 py-0.5 rounded-full">PRO</span>
              </h2>
              <p className="text-xs text-gray-400">Selecciona o configura la API para cargar películas completas gratis</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Providers Selection Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">APIs Disponibles</label>

            {DEFAULT_API_PROVIDERS.map((provider) => {
              const isSelected = selectedProviderId === provider.id;
              return (
                <div
                  key={provider.id}
                  onClick={() => setSelectedProviderId(provider.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-red-950/40 border-red-500 ring-2 ring-red-500/40 shadow-xl' 
                      : 'bg-black/40 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-red-500 bg-red-600' : 'border-gray-500'}`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-white">{provider.name}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{provider.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Custom API Input Field */}
                  {provider.id === 'custom' && isSelected && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-1">
                      <label className="text-[11px] text-gray-300 font-mono">URL Base de tu API / Servidor:</label>
                      <input
                        type="url"
                        placeholder="https://tu-servidor-de-peliculas.com/embed/"
                        value={customApiUrl}
                        onChange={(e) => setCustomApiUrl(e.target.value)}
                        required={selectedProviderId === 'custom'}
                        className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex items-center space-x-3">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-xl"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Guardar Configuración de API</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
