import { useState } from 'react';
import { motion } from 'motion/react';
import { PlayerData } from './SettingsView';
import { Button } from './ui/button';

interface CharacterCustomizerProps {
  playerData: PlayerData;
  onUpdatePlayerData: (data: Partial<PlayerData>) => void;
}

export function CharacterCustomizer({ playerData, onUpdatePlayerData }: CharacterCustomizerProps) {
  const skinColors = [
    { name: 'Light', color: 'from-orange-200 to-orange-300' },
    { name: 'Tan', color: 'from-yellow-200 to-yellow-300' },
    { name: 'Medium', color: 'from-amber-200 to-amber-300' },
    { name: 'Dark', color: 'from-rose-200 to-rose-300' },
  ];

  const hairStyles = [
    { name: 'Short', icon: '👦' },
    { name: 'Long', icon: '👧' },
    { name: 'Curly', icon: '🧑‍🦱' },
    { name: 'Buzz', icon: '👨‍🦲' },
  ];

  const hairColors = [
    { name: 'Black', color: 'from-gray-900 to-gray-800' },
    { name: 'Brown', color: 'from-amber-800 to-amber-700' },
    { name: 'Blonde', color: 'from-yellow-400 to-yellow-300' },
    { name: 'Red', color: 'from-red-900 to-red-800' },
    { name: 'Blue', color: 'from-blue-600 to-blue-500' },
    { name: 'Purple', color: 'from-purple-900 to-purple-800' },
  ];

  const shirtColors = [
    { name: 'Red', color: 'from-red-400 to-red-500' },
    { name: 'Blue', color: 'from-blue-400 to-blue-500' },
    { name: 'Green', color: 'from-green-400 to-green-500' },
    { name: 'Yellow', color: 'from-yellow-400 to-yellow-500' },
    { name: 'Purple', color: 'from-purple-400 to-purple-500' },
    { name: 'Orange', color: 'from-orange-400 to-orange-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Character Preview */}
      <div className="bg-white/10 rounded-lg border-3 border-gray-700 p-6">
        <h3 className="text-white mb-4 text-center">Character Preview</h3>
        <div className="flex justify-center">
          <div className="relative w-20 h-40 flex flex-col items-center">
            {/* Head */}
            <div className={`w-12 h-12 rounded border-3 border-amber-600 mb-2 shadow-lg bg-gradient-to-b ${playerData.skinColor}`}>
              {/* Hair */}
              <div className={`w-full h-5 bg-gradient-to-b ${playerData.hairColor} rounded-t`}></div>
              {/* Eyes */}
              <div className="absolute top-5 left-2 w-1.5 h-1.5 bg-black rounded-full"></div>
              <div className="absolute top-5 right-2 w-1.5 h-1.5 bg-black rounded-full"></div>
              {/* Nose */}
              <div className="absolute top-6.5 left-4.5 w-1 h-1.5 bg-orange-400 rounded-sm"></div>
              {/* Mouth */}
              <div className="absolute top-8 left-4 w-3 h-1 bg-red-400 rounded-sm"></div>
              
              {/* Decoration */}
              {playerData.selectedDecoration && (
                <div className="absolute -top-2 -right-2 text-lg">
                  {playerData.selectedDecoration}
                </div>
              )}
            </div>
            
            {/* Body */}
            <div className={`w-16 h-20 rounded-sm border-3 shadow-lg bg-gradient-to-b ${playerData.shirtColor} flex items-center justify-center relative`}>
              <div className="absolute top-2 w-10 h-3 bg-white/30 rounded-sm"></div>
              <div className="absolute bottom-2 w-12 h-2 bg-black/20 rounded-sm"></div>
            </div>
            
            {/* Arms */}
            <div className={`absolute top-15 -left-3 w-5 h-10 bg-gradient-to-b ${playerData.skinColor} rounded border-2 border-orange-400 shadow-md transform -rotate-12`}></div>
            <div className={`absolute top-15 -right-3 w-5 h-10 bg-gradient-to-b ${playerData.skinColor} rounded border-2 border-orange-400 shadow-md transform rotate-12`}></div>
            
            {/* Legs */}
            <div className="absolute bottom-0 left-2 w-5 h-10 bg-gradient-to-b from-gray-600 to-gray-700 rounded-sm border-2 border-gray-800 shadow-md"></div>
            <div className="absolute bottom-0 right-2 w-5 h-10 bg-gradient-to-b from-gray-600 to-gray-700 rounded-sm border-2 border-gray-800 shadow-md"></div>
            
            {/* Feet */}
            <div className="absolute -bottom-2 left-1 w-6 h-3 bg-black rounded-sm shadow-md"></div>
            <div className="absolute -bottom-2 right-1 w-6 h-3 bg-black rounded-sm shadow-md"></div>
          </div>
        </div>
      </div>

      {/* Customization Options */}
      <div className="space-y-4">
        {/* Skin Color */}
        <div className="bg-white/10 rounded-lg border-2 border-gray-700 p-4">
          <h4 className="text-white mb-3">Skin Color</h4>
          <div className="grid grid-cols-4 gap-2">
            {skinColors.map((skin) => (
              <button
                key={skin.name}
                onClick={() => onUpdatePlayerData({ skinColor: skin.color })}
                className={`h-12 rounded-lg border-3 transition-all ${
                  playerData.skinColor === skin.color
                    ? 'border-yellow-400 scale-105'
                    : 'border-gray-600 hover:border-gray-400'
                } bg-gradient-to-b ${skin.color}`}
              >
                <span className="sr-only">{skin.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Hair Color */}
        <div className="bg-white/10 rounded-lg border-2 border-gray-700 p-4">
          <h4 className="text-white mb-3">Hair Color</h4>
          <div className="grid grid-cols-6 gap-2">
            {hairColors.map((hair) => (
              <button
                key={hair.name}
                onClick={() => onUpdatePlayerData({ hairColor: hair.color })}
                className={`h-12 rounded-lg border-3 transition-all ${
                  playerData.hairColor === hair.color
                    ? 'border-yellow-400 scale-105'
                    : 'border-gray-600 hover:border-gray-400'
                } bg-gradient-to-b ${hair.color}`}
              >
                <span className="sr-only">{hair.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Shirt Color */}
        <div className="bg-white/10 rounded-lg border-2 border-gray-700 p-4">
          <h4 className="text-white mb-3">Shirt Color</h4>
          <div className="grid grid-cols-6 gap-2">
            {shirtColors.map((shirt) => (
              <button
                key={shirt.name}
                onClick={() => onUpdatePlayerData({ shirtColor: shirt.color })}
                className={`h-12 rounded-lg border-3 transition-all ${
                  playerData.shirtColor === shirt.color
                    ? 'border-yellow-400 scale-105'
                    : 'border-gray-600 hover:border-gray-400'
                } bg-gradient-to-b ${shirt.color}`}
              >
                <span className="sr-only">{shirt.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Owned Decorations */}
        {playerData.ownedDecorations.length > 0 && (
          <div className="bg-white/10 rounded-lg border-2 border-gray-700 p-4">
            <h4 className="text-white mb-3">Your Decorations</h4>
            <div className="grid grid-cols-6 gap-2">
              {playerData.ownedDecorations.map((decoration) => (
                <button
                  key={decoration}
                  onClick={() => onUpdatePlayerData({ 
                    selectedDecoration: playerData.selectedDecoration === decoration ? null : decoration 
                  })}
                  className={`h-12 rounded-lg border-3 transition-all flex items-center justify-center text-2xl ${
                    playerData.selectedDecoration === decoration
                      ? 'border-yellow-400 bg-yellow-400/30 scale-105'
                      : 'border-gray-600 hover:border-gray-400 bg-white/10'
                  }`}
                >
                  {decoration}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
