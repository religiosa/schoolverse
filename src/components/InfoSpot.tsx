import { motion, AnimatePresence } from 'motion/react';

interface InfoSpotProps {
  position: { x: number; y: number };
  title: string;
  content: string;
  isActive: boolean;
  onClick: () => void;
}

export function InfoSpot({ position, title, content, isActive, onClick }: InfoSpotProps) {
  return (
    <div
      className="absolute cursor-pointer"
      style={{ left: position.x, top: position.y }}
    >
      {/* Info Spot Icon */}
      <motion.div
        className="w-8 h-8 bg-blue-500 border-2 border-blue-700 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-400 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          boxShadow: isActive 
            ? ['0 0 0 0 rgba(59, 130, 246, 0.7)', '0 0 0 20px rgba(59, 130, 246, 0)']
            : ['0 0 0 0 rgba(59, 130, 246, 0.7)', '0 0 0 10px rgba(59, 130, 246, 0)']
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeOut"
        }}
        onClick={onClick}
      >
        <span className="text-white">ℹ️</span>
      </motion.div>

      {/* Info Popup */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute -top-2 left-10 w-64 bg-white border-4 border-gray-800 rounded-lg shadow-xl z-10"
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Arrow */}
            <div className="absolute left-0 top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white transform -translate-x-2"></div>
            
            {/* Content */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">{content}</p>
            </div>

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}