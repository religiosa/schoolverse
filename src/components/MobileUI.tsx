import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

interface MobileUIProps {
  onToggleMap: () => void;
  isMapExpanded: boolean;
  onOpenSettings: () => void;
  playerCoins: number;
}

export function MobileUI({ onToggleMap, isMapExpanded, onOpenSettings, playerCoins }: MobileUIProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-between px-4 z-40 border-b-4 border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            🏫
          </div>
          <h1 className="text-white font-medium">SchoolVerse</h1>
        </div>

        <div className="flex items-center space-x-2">
          {/* Coin Display */}
          <div className="bg-yellow-400 px-3 py-1 rounded-lg border-2 border-yellow-600 flex items-center space-x-1">
            <span className="text-sm">🪙</span>
            <span className="text-gray-900 text-sm">{playerCoins}</span>
          </div>
          
          <button
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
            onClick={onToggleMap}
          >
            <span className="text-white text-sm">🗺️</span>
          </button>
          
          <button
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
            onClick={() => setShowMenu(!showMenu)}
          >
            <span className="text-white text-sm">☰</span>
          </button>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-gray-800 flex items-center justify-around px-4 z-40 border-t-4 border-gray-700">
        <Button
          variant="ghost"
          className="flex flex-col items-center space-y-1 text-white hover:bg-white/10"
          onClick={() => alert('Opening chat...')}
        >
          <span className="text-lg">👥</span>
          <span className="text-xs">Interact</span>
        </Button>

        <Button
          variant="ghost"
          className="flex flex-col items-center space-y-1 text-white hover:bg-white/10"
          onClick={() => alert('Opening room map...')}
        >
          <span className="text-lg">🏫</span>
          <span className="text-xs">Rooms</span>
        </Button>

        <Button
          variant="ghost"
          className="flex flex-col items-center space-y-1 text-white hover:bg-white/10"
          onClick={() => alert('Opening student profile...')}
        >
          <span className="text-lg">👤</span>
          <span className="text-xs">Profile</span>
        </Button>

        <Button
          variant="ghost"
          className="flex flex-col items-center space-y-1 text-white hover:bg-white/10"
          onClick={onOpenSettings}
        >
          <span className="text-lg">⚙️</span>
          <span className="text-xs">Settings</span>
        </Button>
      </div>

      {/* Side Menu */}
      {showMenu && (
        <motion.div
          className="absolute top-16 right-0 w-64 bg-white border-l-4 border-gray-800 shadow-xl z-50 h-[calc(100%-9rem)]"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 border-b-2 border-gray-200">
            <h2 className="font-medium text-gray-900">Game Menu</h2>
          </div>
          
          <div className="p-4 space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => alert('Opening achievements...')}
            >
              🏆 Achievements
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => alert('Opening leaderboard...')}
            >
              📊 Leaderboard
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => alert('Opening help...')}
            >
              ❓ Help & FAQ
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => alert('Opening feedback...')}
            >
              💡 Send Feedback
            </Button>
          </div>

          {/* Close overlay when clicking outside */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={() => setShowMenu(false)}
          />
        </motion.div>
      )}

      {/* Map Toggle Overlay */}
      {showMenu && (
        <div 
          className="absolute inset-0 bg-black/30 z-30" 
          onClick={() => setShowMenu(false)}
        />
      )}
    </>
  );
}