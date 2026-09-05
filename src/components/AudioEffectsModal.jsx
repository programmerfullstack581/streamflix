import React, { useState } from 'react';
import { X, Sliders, Volume2, Sparkles, Check, FileAudio, Zap } from 'lucide-react';

export default function AudioEffectsModal({ track, onClose, onApplyEffect }) {
  const [selectedPreset, setSelectedPreset] = useState('bass_boost');
  const [volumeLevel, setVolumeLevel] = useState(120);

  if (!track) return null;

  const PRESETS = [
    { id: 'normal', name: 'Original HD (320 kbps)', desc: 'Sonido de estudio plano original sin modificaciones', icon: '🎧' },
    { id: 'bass_boost', name: 'Bass Boost (+6dB)', desc: 'Graves profundos y potentes para parlantes y autos', icon: '🔊' },
    { id: 'vocal_boost', name: 'Voces Claras & Acústico', desc: 'Realza la voz del cantante y reduce ruidos de fondo', icon: '🎤' },
    { id: 'loudness_max', name: 'Potencia Máxima (+200%)', desc: 'Sube el volumen al doble para audífonos o autos con volumen bajo', icon: '⚡' },
    { id: 'stereo_3d', name: 'Efecto Estéreo Envolvente', desc: 'Experiencia inmersiva espacial 8D / 360°', icon: '✨' }
  ];

  const handleSave = () => {
    const presetObj = PRESETS.find(p => p.id === selectedPreset);
    if (onApplyEffect) {
      onApplyEffect({
        preset: presetObj?.name || 'Bass Boost',
        volume: volumeLevel
      });
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-[#121216] border border-red-500/40 rounded-3xl shadow-red-neon overflow-hidden p-6 space-y-5"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center shadow-red-neon">
              <Sliders className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Ecualizador & Bass Booster</h3>
              <p className="text-[10px] text-gray-400">Personaliza la salida de audio</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/10 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Track info */}
        <div className="p-3 bg-[#0a0a0d] rounded-2xl border border-white/5 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center flex-shrink-0">
            <FileAudio className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-black text-white truncate">{track.title}</h4>
            <p className="text-[11px] text-gray-400 truncate">{track.artist}</p>
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-wider text-gray-400 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>Selecciona el Perfil de Audio:</span>
          </label>

          <div className="space-y-1.5">
            {PRESETS.map((preset) => {
              const isSelected = selectedPreset === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-red-950/60 border-red-500 shadow-md ring-1 ring-red-500/30'
                      : 'bg-[#18181f] hover:bg-[#202028] border-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <span className="text-lg flex-shrink-0">{preset.icon}</span>
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-white truncate">{preset.name}</h5>
                      <p className="text-[10px] text-gray-400 truncate">{preset.desc}</p>
                    </div>
                  </div>

                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-red-500 bg-red-600 text-white' : 'border-white/20'
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Volume booster slider */}
        <div className="p-3.5 bg-[#0a0a0d] rounded-2xl border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-gray-300 flex items-center space-x-1.5">
              <Volume2 className="w-4 h-4 text-red-400" />
              <span>Nivel de Ganancia / Potencia:</span>
            </span>
            <span className="font-mono font-black text-red-400 bg-red-950/80 px-2 py-0.5 rounded-md border border-red-500/30">
              {volumeLevel}%
            </span>
          </div>
          <input
            type="range"
            min="100"
            max="200"
            step="10"
            value={volumeLevel}
            onChange={(e) => setVolumeLevel(parseInt(e.target.value, 10))}
            className="w-full accent-red-600 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 pt-1">
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl text-xs font-black shadow-red-neon transition-transform hover:scale-[1.02] cursor-pointer flex items-center justify-center space-x-1.5"
          >
            <Zap className="w-4 h-4" />
            <span>APLICAR Y DESCARGAR</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
}
