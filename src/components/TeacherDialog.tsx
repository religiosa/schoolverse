import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface Teacher {
  id: string;
  name: string;
  subject: string;
  position: { x: number; y: number };
  avatar: string;
  description: string;
  videoUrl: string;
}

interface TeacherDialogProps {
  teacher: Teacher;
  onClose: () => void;
}

export function TeacherDialog({ teacher, onClose }: TeacherDialogProps) {
  const handleWatchVideo = () => {
    // In a real app, this would open a video player
    alert(`Opening ${teacher.name}'s ${teacher.subject} introduction video!\n\nURL: ${teacher.videoUrl}`);
  };

  return (
    <motion.div
      className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
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
                  {teacher.avatar}
                </div>
                <div>
                  <h2 className="font-medium">{teacher.name}</h2>
                  <p className="text-sm opacity-90">{teacher.subject} Teacher</p>
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
              <h3 className="font-medium text-gray-900 mb-2">About Me</h3>
              <p className="text-sm text-gray-700">{teacher.description}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">What I Teach</h3>
              <div className="bg-gray-100 p-3 rounded-lg border-2 border-gray-300">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">📚</span>
                  <span className="font-medium">{teacher.subject}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Actions</h3>
              
              <Button 
                onClick={handleWatchVideo}
                className="w-full bg-red-500 hover:bg-red-600 text-white border-2 border-red-700"
              >
                🎥 Watch Introduction Video
              </Button>

              <Button 
                variant="outline"
                className="w-full border-2 border-green-500 text-green-700 hover:bg-green-50"
                onClick={() => alert(`Scheduling a meeting with ${teacher.name}...`)}
              >
                📅 Schedule Meeting
              </Button>

              <Button 
                variant="outline"
                className="w-full border-2 border-blue-500 text-blue-700 hover:bg-blue-50"
                onClick={() => alert(`Viewing ${teacher.name}'s classroom...`)}
              >
                🏫 Visit Classroom
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}