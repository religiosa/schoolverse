import { useState } from 'react';
import { motion } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CharacterCustomizer } from './CharacterCustomizer';
import { InterestsSelector } from './InterestsSelector';
import { ShopView } from './ShopView';
import { X } from 'lucide-react';
import { Button } from './ui/button';

export interface ColorSelection {
  name: string;
  image: string;
  color: string;
}

export interface PlayerData {
  gameCoins: number;
  interests: string[];
  ownedDecorations: string[];
  selectedDecoration: string | null;
  hairColor: ColorSelection;
  shirtColor: ColorSelection;
}

interface SettingsViewProps {
  onClose: () => void;
  playerData: PlayerData;
  onUpdatePlayerData: (data: Partial<PlayerData>) => void;
}

export function SettingsView({ onClose, playerData, onUpdatePlayerData }: SettingsViewProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 z-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-2xl h-[90vh] bg-gradient-to-br from-purple-600 to-blue-700 rounded-2xl border-4 border-gray-800 shadow-2xl overflow-hidden"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-6 py-4 border-b-4 border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                ⚙️
              </div>
              <h2 className="text-white">Asetukset & Avatar</h2>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Game Coins Display */}
              <div className="bg-yellow-400 px-4 py-2 rounded-lg border-3 border-yellow-600 flex items-center space-x-2">
                <span className="text-lg">🪙</span>
                <span className="text-gray-900">{playerData.gameCoins}</span>
              </div>
              
              <Button
                onClick={onClose}
                variant="ghost"
                className="text-white hover:bg-white/20 p-2"
              >
                <X size={24} />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-5rem)] overflow-y-auto p-6">
          <Tabs defaultValue="character" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/30 border-2 border-gray-700">
              <TabsTrigger value="character" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                👤 Avatar
              </TabsTrigger>
              <TabsTrigger value="interests" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                ⭐ Kiinnostuksenkohteet
              </TabsTrigger>
              <TabsTrigger value="shop" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white">
                🛒 Kauppa
              </TabsTrigger>
            </TabsList>

            <TabsContent value="character" className="mt-6">
              <CharacterCustomizer
                playerData={playerData}
                onUpdatePlayerData={onUpdatePlayerData}
              />
            </TabsContent>

            <TabsContent value="interests" className="mt-6">
              <InterestsSelector
                playerData={playerData}
                onUpdatePlayerData={onUpdatePlayerData}
              />
            </TabsContent>

            <TabsContent value="shop" className="mt-6">
              <ShopView
                playerData={playerData}
                onUpdatePlayerData={onUpdatePlayerData}
              />
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </motion.div>
  );
}
