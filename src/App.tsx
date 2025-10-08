import { useState } from 'react';
import { motion } from 'motion/react';
import { GameViewport } from './components/GameViewport';
import { MobileUI } from './components/MobileUI';
import { SettingsView, PlayerData } from './components/SettingsView';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playerData, setPlayerData] = useState<PlayerData>({
    gameCoins: 250, // Starting coins
    interests: [],
    ownedDecorations: [],
    selectedDecoration: null,
    skinColor: 'from-orange-200 to-orange-300',
    hairStyle: 'Short',
    hairColor: 'from-amber-800 to-amber-700',
    shirtColor: 'from-blue-400 to-blue-500',
  });

  const updatePlayerData = (updates: Partial<PlayerData>) => {
    setPlayerData(prev => ({ ...prev, ...updates }));
  };


  return (
    <div className="w-full h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 h-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-gray-700 aspect-square"></div>
          ))}
        </div>
      </div>

      {/* Game Container */}
      <motion.div
        className="absolute inset-0 top-16 bottom-20"
        animate={{
          scale: isMapExpanded ? 1.2 : 1,
          y: isMapExpanded ? -20 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full h-full p-4">
          <GameViewport />
        </div>
      </motion.div>

      {/* Demo Info Panel */}
      <div className="absolute top-20 left-4 bg-black/80 text-white p-4 rounded-lg border border-gray-600 max-w-xs">
        <h3 className="font-medium mb-2">🎮 First-Person School</h3>
        <ul className="text-sm space-y-1">
          <li>• Click teachers to interact (💬)</li>
          <li>• Navigate between rooms (🚪)</li>
          <li>• Explore in first-person view</li>
          <li>• Experience realistic perspective</li>
          <li>• Use mobile UI controls</li>
        </ul>
      </div>

      {/* Game Stats */}
      <div className="absolute top-20 right-4 bg-black/80 text-white p-4 rounded-lg border border-gray-600">
        <div className="text-sm space-y-1">
          <div>👤 Student Perspective</div>
          <div>🏫 Location: Teacher's Lounge</div>
          <div>🎯 Objective: Meet Faculty</div>
        </div>
      </div>

      {/* Mobile UI Components */}
      <MobileUI 
        onToggleMap={() => setIsMapExpanded(!isMapExpanded)}
        isMapExpanded={isMapExpanded}
        onOpenSettings={() => setShowSettings(true)}
        playerCoins={playerData.gameCoins}
      />

      {/* Settings View */}
      {showSettings && (
        <SettingsView
          onClose={() => setShowSettings(false)}
          playerData={playerData}
          onUpdatePlayerData={updatePlayerData}
        />
      )}

      {/* Toast Notifications */}
      <Toaster position="top-center" richColors />


      {/* Loading Screen Simulation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ pointerEvents: 'none' }}
      >
        <div className="text-center text-white">
          <motion.div
            className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-3xl mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            🏫
          </motion.div>
          <h1 className="text-2xl font-medium mb-2">SchoolVerse</h1>
          <p className="text-sm opacity-90">Loading your school adventure...</p>
          <motion.div
            className="w-48 h-2 bg-white/20 rounded-full mt-4 mx-auto overflow-hidden"
          >
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}