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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white border border-sky-100 rounded-3xl shadow-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sky-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-md shadow-sky-500/20 text-white">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">Ecualizador & Bass Booster</h3>
              <p className="text-[10px] text-slate-500">Personaliza la salida de audio</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Track info */}
        <div className="p-3 bg-sky-50/60 rounded-2xl border border-sky-100 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
            <FileAudio className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-black text-slate-900 truncate">{track.title}</h4>
            <p className="text-[11px] text-slate-500 truncate">{track.artist}</p>
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
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
                      ? 'bg-sky-50 border-sky-400 shadow-sm ring-1 ring-sky-300'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <span className="text-lg flex-shrink-0">{preset.icon}</span>
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-slate-900 truncate">{preset.name}</h5>
                      <p className="text-[10px] text-slate-500 truncate">{preset.desc}</p>
                    </div>
                  </div>

                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-sky-500 bg-sky-600 text-white' : 'border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Volume booster slider */}
        <div className="p-3.5 bg-sky-50/60 rounded-2xl border border-sky-100 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 flex items-center space-x-1.5">
              <Volume2 className="w-4 h-4 text-sky-600" />
              <span>Nivel de Ganancia / Potencia:</span>
            </span>
            <span className="font-mono font-black text-sky-800 bg-sky-100 px-2 py-0.5 rounded-md border border-sky-200">
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
            className="w-full accent-sky-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 pt-1">
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl text-xs font-black shadow-md shadow-sky-500/20 transition-transform hover:scale-[1.02] cursor-pointer flex items-center justify-center space-x-1.5"
          >
            <Zap className="w-4 h-4" />
            <span>APLICAR Y DESCARGAR</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
}
