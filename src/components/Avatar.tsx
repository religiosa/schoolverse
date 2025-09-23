import { motion } from 'motion/react';

interface AvatarProps {
  position: { x: number; y: number };
  emoji: string;
  name: string;
  type: 'student' | 'teacher';
  onClick?: () => void;
}

export function Avatar({ position, emoji, name, type, onClick }: AvatarProps) {
  return (
    <motion.div
      className={`absolute cursor-pointer ${onClick ? 'hover:scale-110' : ''}`}
      style={{ left: position.x, top: position.y }}
      whileHover={{ scale: onClick ? 1.1 : 1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {/* Avatar Container */}
      <div className={`relative w-12 h-12 ${type === 'teacher' ? 'border-4 border-yellow-400' : 'border-2 border-blue-400'} rounded-lg bg-white shadow-lg flex items-center justify-center`}>
        <span className="text-2xl">{emoji}</span>
        
        {/* Name Tag */}
        <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded ${type === 'teacher' ? 'bg-yellow-400 text-black' : 'bg-blue-400 text-white'} whitespace-nowrap shadow-md`}>
          {name}
        </div>

        {/* Interaction Indicator */}
        {onClick && (
          <motion.div
            className={`absolute -top-2 -right-2 w-4 h-4 ${type === 'teacher' ? 'bg-green-400' : 'bg-blue-400'} rounded-full border-2 border-white`}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs flex items-center justify-center">
              {type === 'teacher' ? '💬' : '👋'}
            </span>
          </motion.div>
        )}
      </div>

      {/* Movement Animation for Students */}
      {type === 'student' && (
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
        </motion.div>
      )}
    </motion.div>
  );
}