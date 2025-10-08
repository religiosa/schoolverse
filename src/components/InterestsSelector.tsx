import { motion } from 'motion/react';
import { PlayerData } from './SettingsView';
import { Check } from 'lucide-react';

interface InterestsSelectorProps {
  playerData: PlayerData;
  onUpdatePlayerData: (data: Partial<PlayerData>) => void;
}

export function InterestsSelector({ playerData, onUpdatePlayerData }: InterestsSelectorProps) {
  const availableInterests = [
    { id: 'math', name: 'Mathematics', icon: '📊', color: 'from-red-500 to-red-600' },
    { id: 'science', name: 'Science', icon: '🔬', color: 'from-blue-500 to-blue-600' },
    { id: 'english', name: 'English & Literature', icon: '📚', color: 'from-green-500 to-green-600' },
    { id: 'history', name: 'History', icon: '🏛️', color: 'from-yellow-500 to-yellow-600' },
    { id: 'art', name: 'Art & Design', icon: '🎨', color: 'from-purple-500 to-purple-600' },
    { id: 'music', name: 'Music', icon: '🎵', color: 'from-pink-500 to-pink-600' },
    { id: 'sports', name: 'Sports & PE', icon: '⚽', color: 'from-orange-500 to-orange-600' },
    { id: 'computers', name: 'Computer Science', icon: '💻', color: 'from-cyan-500 to-cyan-600' },
    { id: 'languages', name: 'Foreign Languages', icon: '🌍', color: 'from-teal-500 to-teal-600' },
    { id: 'drama', name: 'Drama & Theater', icon: '🎭', color: 'from-indigo-500 to-indigo-600' },
    { id: 'cooking', name: 'Cooking & Home Ec', icon: '🍳', color: 'from-amber-500 to-amber-600' },
    { id: 'robotics', name: 'Robotics & Engineering', icon: '🤖', color: 'from-gray-600 to-gray-700' },
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
        <h3 className="text-white mb-2">Select Your Interests</h3>
        <p className="text-white/80 text-sm">
          Choose up to 5 subjects you're interested in. This helps personalize your school experience!
        </p>
        <div className="mt-2 text-white/90 text-sm">
          Selected: {playerData.interests.length} / 5
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
          <h4 className="text-white mb-3">Your Selected Interests:</h4>
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
