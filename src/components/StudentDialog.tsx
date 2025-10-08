import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface Student {
  id: string;
  name: string;
  grade: string;
  favoriteSubject: string;
  hobbies: string[];
  position: { x: number; y: number };
  targetPosition: { x: number; y: number };
  avatar: string;
  personality: string;
  currentClass: string;
}

interface StudentDialogProps {
  student: Student;
  onClose: () => void;
}

export function StudentDialog({ student, onClose }: StudentDialogProps) {
  const handleStudyTogether = () => {
    alert(`Great! You and ${student.name} are now study buddies for ${student.favoriteSubject}!\n\n"Let's ace this together!" - ${student.name}`);
  };

  const handlePlayGame = () => {
    alert(`${student.name} suggests playing a quick trivia game!\n\n"I know some cool facts about ${student.favoriteSubject}!" - ${student.name}`);
  };

  const handleJoinActivity = () => {
    const activity = student.hobbies[Math.floor(Math.random() * student.hobbies.length)];
    alert(`${student.name} invites you to join their ${activity} club!\n\n"It's so much fun, you should totally join us!" - ${student.name}`);
  };

  const handleShareNotes = () => {
    alert(`${student.name} offers to share their ${student.currentClass} notes with you!\n\n"I took really good notes in today's class!" - ${student.name}`);
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
          <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl">
                  {student.avatar}
                </div>
                <div>
                  <h2 className="font-medium">{student.name}</h2>
                  <p className="text-sm opacity-90">{student.grade} Grade Student</p>
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
              <p className="text-sm text-gray-700">{student.personality}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg border-2 border-blue-200">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">📚</span>
                  <span className="text-xs font-medium text-blue-700">Favorite Subject</span>
                </div>
                <span className="text-sm font-medium">{student.favoriteSubject}</span>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg border-2 border-green-200">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">📍</span>
                  <span className="text-xs font-medium text-green-700">Current Class</span>
                </div>
                <span className="text-sm font-medium">{student.currentClass}</span>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Hobbies & Interests</h3>
              <div className="flex flex-wrap gap-2">
                {student.hobbies.map((hobby, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full border border-purple-300"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Let's Hang Out!</h3>
              
              <Button 
                onClick={handleStudyTogether}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white border-2 border-blue-700"
              >
                📖 Study Together
              </Button>

              <Button 
                variant="outline"
                className="w-full border-2 border-green-500 text-green-700 hover:bg-green-50"
                onClick={handleShareNotes}
              >
                📝 Share Notes
              </Button>

              <Button 
                variant="outline"
                className="w-full border-2 border-purple-500 text-purple-700 hover:bg-purple-50"
                onClick={handleJoinActivity}
              >
                🎮 Join Activity
              </Button>

              <Button 
                variant="outline"
                className="w-full border-2 border-orange-500 text-orange-700 hover:bg-orange-50"
                onClick={handlePlayGame}
              >
                🧠 Play Trivia Game
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}