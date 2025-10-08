import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Teacher } from './GameViewport';

interface TeacherDialogProps {
  teacher: Teacher;
  onClose: () => void;
}

export function TeacherDialog({ teacher, onClose }: TeacherDialogProps) {
  const handleWatchVideo = () => {
    // In a real app, this would open a video player
    alert(`Avataan opettajan ${teacher.name} (${teacher.subject}) esittelyvideo!\n\nURL: ${teacher.videoUrl}\n\n(Ei saatavilla tässä versiossa)`);
  };

  return (
    <motion.div
      className="absolute inset-0 bg-black/50 flex items-center justify-center z-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="w-80 bg-white border-4 border-gray-800 shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl">
                  <ImageWithFallback src={teacher.avatar} />
                </div>
                <div>
                  <h2 className="font-medium">{teacher.name}</h2>
                  <p className="text-sm opacity-90">Aine: {teacher.subject}</p>
                </div>
              </div>
              <button
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                onClick={onClose}
              >
                ×
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Tietoja minusta</h3>
              <p className="text-sm text-gray-700">{teacher.description}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Mitä opetan</h3>
              <div className="bg-gray-100 p-3 rounded-lg border-2 border-gray-300">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">📚</span>
                  <span className="font-medium">{teacher.subject}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Toiminnot</h3>
              
              <Button 
                variant="outline"
                className="w-full border-2 border-red-500 text-red-700 hover:bg-red-50"
                onClick={handleWatchVideo}
              >
                🎥 Katso esittelyvideo
              </Button>

              <Button 
                variant="outline"
                className="w-full border-2 border-green-500 text-green-700 hover:bg-green-50"
                onClick={() => alert(`Sovitaan tapaaminen opettajan ${teacher.name} kanssa...\n\n(ei saatavilla vielä)`)}
              >
                📅 Sovi tapaaminen
              </Button>

              <Button 
                variant="outline"
                className="w-full border-2 border-blue-500 text-blue-700 hover:bg-blue-50"
                onClick={() => alert(`Tarkastellaan opettajan ${teacher.name} luokkaa...\n\n(ei saatavilla vielä)`)}
              >
                🏫 Käy luokkahuoneessa
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}