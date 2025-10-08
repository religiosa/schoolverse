import { useState } from 'react';
import { motion } from 'motion/react';
import { ColorSelection, PlayerData } from './SettingsView';
import { Button } from './ui/button';
import blackhair from '../images/black_hair.png';
import orangehair from '../images/orange_hair.png';
import redhair from '../images/red_hair.png';
import brownhair from '../images/brown_hair.png';
import cyanhair from '../images/cyan_hair.png';
import greenhair from '../images/green_hair.png';
import blondehair from '../images/light_hair.png';
import purplehair from '../images/purple_hair.png';
import cyanshirt from '../images/cyan_shirt.png';
import blueshirt from '../images/blue_shirt.png';
import greenshirt from '../images/green_shirt.png';
import pinkshirt from '../images/pink_shirt.png';
import whiteshirt from '../images/white_shirt.png';
import blackshirt from '../images/black_shirt.png';
import orangeshirt from '../images/orange_shirt.png';
import purpleshirt from '../images/purple_shirt.png';
import yellowshirt from '../images/yellow_shirt.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CharacterCustomizerProps {
  playerData: PlayerData;
  onUpdatePlayerData: (data: Partial<PlayerData>) => void;
}

function combineImages(imgUrl1: string, imgUrl2: string) {
  var canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvas) {
    <ImageWithFallback 
      src={imgUrl1}
      alt="Player Avatar"
      className="w-full h-full object-cover"
    />
  } else {
    var context = canvas.getContext('2d');
    var img1 = new Image();
    var img2 = new Image();

    img1.onload = () => {
      canvas.width = img1.width*0.5;
      canvas.height = img1.height*0.5;
      context?.scale(0.5, 0.5);
      img2.src = imgUrl2;
    };
    img2.onload = () => {
      context.globalAlpha = 1.0;
      context.drawImage(img1, 0, 0);
      context.drawImage(img2, 0, 0);
    };        
  img1.src = imgUrl1;
  }
}

export function CharacterCustomizer({ playerData, onUpdatePlayerData }: CharacterCustomizerProps) {
  const hairColors: ColorSelection[] = [
    { name: 'Black', image: blackhair, color: 'from-gray-900 to-gray-800' },
    { name: 'Brown', image: brownhair, color: 'from-amber-800 to-amber-700' },
    { name: 'Blonde', image: blondehair, color: 'from-yellow-400 to-yellow-300' },
    { name: 'Red', image: redhair, color: 'from-red-900 to-red-800' },
    { name: 'Cyan', image: cyanhair, color: 'from-cyan-500 to-cyan-600' },
    { name: 'Purple', image: purplehair, color: 'from-purple-500 to-purple-700' },
    { name: 'Orange', image: orangehair, color: 'from-orange-400 to-orange-500' },
    { name: 'Green', image: greenhair, color: 'from-green-500 to-green-600'},
  ];

  const shirtColors: ColorSelection[] = [
    { name: 'Pink', image: pinkshirt, color: 'from-pink-500 to-pink-600' },
    { name: 'Blue', image: blueshirt, color: 'from-blue-400 to-blue-500' },
    { name: 'Green', image: greenshirt, color: 'from-green-400 to-green-500' },
    { name: 'Yellow', image: yellowshirt, color: 'from-yellow-400 to-yellow-500' },
    { name: 'Purple', image: purpleshirt, color: 'from-purple-400 to-purple-500' },
    { name: 'Orange', image: orangeshirt, color: 'from-orange-400 to-orange-500' },
    { name: 'Cyan', image: cyanshirt, color: 'from-cyan-500 to-cyan-600' },
    { name: 'Black', image: blackshirt, color: 'from-gray-900 to-gray-800' },
    { name: 'White', image: whiteshirt, color: 'from-white to-gray-100'},
  ];

  return (
    <div className="space-y-6">
      {/* Character Preview */}
      <div className="bg-white/10 rounded-lg border-3 border-gray-700 p-6">
        <h3 className="text-white mb-4 text-center">Character Preview</h3>
        <div className="flex justify-center">
            {/* Avatar */}
            <canvas id="canvas"></canvas>
            {combineImages(playerData.hairColor.image, playerData.shirtColor.image)}
        </div>
      </div>

      {/* Customization Options */}
      <div className="space-y-4">
        {/* Hair Color */}
        <div className="bg-white/10 rounded-lg border-2 border-gray-700 p-4">
          <h4 className="text-white mb-3">Hair Color</h4>
          <div className="grid grid-cols-6 gap-2">
            {hairColors.map((hair) => (
              <button
                key={hair.name}
                onClick={() => onUpdatePlayerData({ hairColor: hair })}
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
                onClick={() => onUpdatePlayerData({ shirtColor: shirt })}
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
