import React from 'react';

export default function AudioVisualizer({ isPlaying }) {
  const bars = [16, 28, 45, 60, 35, 75, 90, 65, 40, 80, 50, 70, 30, 55, 85, 40, 65, 95, 50, 30];

  return (
    <div className="flex items-end justify-center space-x-1 sm:space-x-1.5 h-10 px-4 py-1 bg-red-950/20 border border-red-500/20 rounded-2xl">
      {bars.map((height, i) => (
        <div
          key={i}
          className="w-1 sm:w-1.5 bg-gradient-to-t from-red-600 via-[#FF0033] to-white rounded-full transition-all duration-300"
          style={{
            height: isPlaying ? `${Math.max(15, (height * ((i % 3 + 1) * 0.35)).toFixed(0))}%` : '20%',
            animation: isPlaying ? `equalizer ${(0.4 + (i % 5) * 0.15)}s ease-in-out infinite alternate` : 'none',
            boxShadow: isPlaying ? '0 0 8px rgba(255, 0, 51, 0.6)' : 'none'
          }}
        />
      ))}
    </div>
  );
}
