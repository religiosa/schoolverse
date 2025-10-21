import { motion } from 'motion/react';
import { PlayerData } from './SettingsView';
import { Check } from 'lucide-react';

interface InterestsSelectorProps {
  playerData: PlayerData;
  onUpdatePlayerData: (data: Partial<PlayerData>) => void;
}

export function InterestsSelector({ playerData, onUpdatePlayerData }: InterestsSelectorProps) {
  const availableInterests = [
    { id: 'math', name: 'Matematiikka', icon: '📊', color: 'from-red-500 to-red-600' },
    { id: 'science', name: 'Tiede', icon: '🔬', color: 'from-blue-500 to-blue-600' },
    { id: 'english', name: 'Kirjallisuus', icon: '📚', color: 'from-green-500 to-green-600' },
    { id: 'history', name: 'Historia', icon: '🏛️', color: 'from-yellow-500 to-yellow-600' },
    { id: 'art', name: 'Taide', icon: '🎨', color: 'from-purple-500 to-purple-600' },
    { id: 'music', name: 'Musiikki', icon: '🎵', color: 'from-pink-500 to-pink-600' },
    { id: 'sports', name: 'Liikunta', icon: '⚽', color: 'from-orange-500 to-orange-600' },
    { id: 'computers', name: 'Tietotekniikka', icon: '💻', color: 'from-cyan-500 to-cyan-600' },
    { id: 'languages', name: 'Kielet', icon: '🌍', color: 'from-teal-500 to-teal-600' },
    { id: 'drama', name: 'Draama ja teatteri', icon: '🎭', color: 'from-indigo-500 to-indigo-600' },
    { id: 'cooking', name: 'Ruoanlaitto', icon: '🍳', color: 'from-amber-500 to-amber-600' },
    { id: 'baking', name: 'Leipominen', icon: '🍩', color: 'from-amber-500 to-amber-600' },
    { id: 'robotics', name: 'Elektroniikka', icon: '🤖', color: 'from-gray-600 to-gray-700' },
  ];

  const toggleInterest = (interestId: string) => {
    const currentInterests = playerData.interests || [];
    const isSelected = currentInterests.includes(interestId);
    
    if (isSelected) {
      // Remove interest
      onUpdatePlayerData({
        interests: currentInterests.filter(id => id !== interestId)
      });
    } else {
      // Add interest (max 5)
      if (currentInterests.length < 5) {
        onUpdatePlayerData({
          interests: [...currentInterests, interestId]
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white/10 rounded-lg border-3 border-gray-700 p-4">
        <h3 className="text-white mb-2">Valitse kiinnostuksenkohteesi</h3>
        <p className="text-white/80 text-sm">
          Valitse max 5 kiinnostuksen kohdetta. Näin tulevat luokkatoverisi oppivat tuntemaan sinut paremmin!
        </p>
        <div className="mt-2 text-white/90 text-sm">
          Valittu: {playerData.interests.length} / 5
        </div>
      </div>

      {/* Interest Grid */}
      <div className="grid grid-cols-2 gap-3">
        {availableInterests.map((interest) => {
          const isSelected = playerData.interests.includes(interest.id);
          const canSelect = playerData.interests.length < 5 || isSelected;

          return (
            <motion.button
              key={interest.id}
              onClick={() => canSelect && toggleInterest(interest.id)}
              disabled={!canSelect}
              className={`relative p-4 rounded-lg border-3 transition-all ${
                isSelected
                  ? 'border-yellow-400 bg-yellow-400/20'
                  : canSelect
                  ? 'border-gray-600 bg-white/10 hover:border-gray-400'
                  : 'border-gray-700 bg-white/5 opacity-50 cursor-not-allowed'
              }`}
              whileHover={canSelect ? { scale: 1.05 } : {}}
              whileTap={canSelect ? { scale: 0.95 } : {}}
            >
              {/* Check Mark */}
              {isSelected && (
                <motion.div
                  className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                >
                  <Check size={16} className="text-white" />
                </motion.div>
              )}

              {/* Icon */}
              <div className="text-4xl mb-2">{interest.icon}</div>

              {/* Name */}
              <div className="text-white text-sm text-center">{interest.name}</div>

              {/* Color Bar */}
              <div className={`mt-2 h-1 rounded bg-gradient-to-r ${interest.color}`}></div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Interests Summary */}
      {playerData.interests.length > 0 && (
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg border-3 border-green-800 p-4">
          <h4 className="text-white mb-3">Valitut kiinnostuksen kohteesi:</h4>
          <div className="flex flex-wrap gap-2">
            {playerData.interests.map((interestId) => {
              const interest = availableInterests.find(i => i.id === interestId);
              if (!interest) return null;
              
              return (
                <div
                  key={interestId}
                  className="flex items-center space-x-2 bg-white/20 px-3 py-1.5 rounded-lg border-2 border-white/30"
                >
                  <span className="text-lg">{interest.icon}</span>
                  <span className="text-white text-sm">{interest.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
