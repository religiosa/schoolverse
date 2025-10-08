import { useState } from 'react';
import { motion } from 'motion/react';
import { TeacherDialog } from './TeacherDialog';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import teachersLoungeImage from 'figma:asset/ef4fbb3ec1dbde9bd9f514fee9d01a7bdb68782d.png';

interface Teacher {
  id: string;
  name: string;
  subject: string;
  avatar: string;
  description: string;
  videoUrl: string;
  depth: number; // Distance from player (0-100, where 0 is closest)
  position: number; // Horizontal position (-50 to 50, where 0 is center)
}

type CurrentRoom = 'teachersLounge' | 'corridor';

export function GameViewport() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [currentRoom, setCurrentRoom] = useState<CurrentRoom>('teachersLounge');
  const [playerRotation, setPlayerRotation] = useState(0); // Player looking direction (-180 to 180)

  const teachersLoungeTeachers: Teacher[] = [
    {
      id: 'teacher1',
      name: 'Ms. Johnson',
      subject: 'Mathematics',
      avatar: '👩‍🏫',
      description: 'Expert in Algebra and Calculus with 10 years of experience.',
      videoUrl: 'https://example.com/math-intro',
      depth: 30,
      position: -20
    },
    {
      id: 'teacher2',
      name: 'Mr. Smith',
      subject: 'Science',
      avatar: '👨‍🔬',
      description: 'Physics and Chemistry specialist, loves hands-on experiments.',
      videoUrl: 'https://example.com/science-intro',
      depth: 25,
      position: 15
    },
    {
      id: 'teacher3',
      name: 'Ms. Davis',
      subject: 'English',
      avatar: '👩‍💼',
      description: 'Literature enthusiast and creative writing mentor.',
      videoUrl: 'https://example.com/english-intro',
      depth: 40,
      position: 0
    }
  ];

  const corridorTeachers: Teacher[] = [
    {
      id: 'teacher4',
      name: 'Mr. Garcia',
      subject: 'History',
      avatar: '👨‍🏫',
      description: 'World History expert with a passion for ancient civilizations.',
      videoUrl: 'https://example.com/history-intro',
      depth: 35,
      position: -10
    },
    {
      id: 'teacher5',
      name: 'Mrs. Chen',
      subject: 'Art',
      avatar: '👩‍🎨',
      description: 'Creative arts instructor who loves inspiring young artists.',
      videoUrl: 'https://example.com/art-intro',
      depth: 50,
      position: 25
    }
  ];

  const getCurrentTeachers = () => {
    return currentRoom === 'teachersLounge' ? teachersLoungeTeachers : corridorTeachers;
  };

  const getRoomBackground = () => {
    if (currentRoom === 'teachersLounge') {
      return 'from-amber-100 to-orange-200';
    } else {
      return 'from-blue-100 to-indigo-200';
    }
  };

  const getRoomTitle = () => {
    return currentRoom === 'teachersLounge' ? "Teachers' Lounge" : 'School Corridor';
  };

  const getAvailableExits = () => {
    if (currentRoom === 'teachersLounge') {
      return [{ direction: 'corridor', label: 'Go to Corridor', icon: '🚪' }];
    } else {
      return [{ direction: 'teachersLounge', label: 'Return to Teachers\' Lounge', icon: '☕' }];
    }
  };

  const moveToRoom = (newRoom: CurrentRoom) => {
    setCurrentRoom(newRoom);
    setSelectedTeacher(null); // Close any open dialogs
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg border-4 border-gray-800">
      {/* Room Background Images */}
      <div className="absolute inset-0">
        {currentRoom === 'teachersLounge' ? (
          <ImageWithFallback 
            src={teachersLoungeImage}
            alt="Teachers' Lounge"
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1747947901869-8a09ca01f4a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBoYWxsd2F5JTIwY29ycmlkb3IlMjBzdHVkZW50c3xlbnwxfHx8fDE3NTg1NTk2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="School Corridor"
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Overlay for better character visibility */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floor with perspective */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-amber-900/40 to-transparent"></div>
        
        {/* Ceiling */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-gray-600/40 to-transparent"></div>
      </div>

      {/* Room-specific Environment */}
      {currentRoom === 'teachersLounge' && (
        <div className="absolute inset-0">
          {/* Coffee Machine */}
          <div className="absolute top-20 right-8 w-12 h-16 bg-gray-700 rounded-lg border-2 border-gray-800">
            <div className="text-center text-xs mt-1">☕</div>
          </div>
          
          {/* Bulletin Board */}
          <div className="absolute top-16 left-8 w-24 h-20 bg-cork-300 border-4 border-brown-600 rounded">
            <div className="text-center text-xs mt-2 text-brown-800">📋 NOTICES</div>
          </div>

          {/* Couch */}
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-blue-600 rounded-t-lg border-2 border-blue-800">
            <div className="text-center text-xs mt-1 text-white">🛋️ Faculty Seating</div>
          </div>
        </div>
      )}

      {currentRoom === 'corridor' && (
        <div className="absolute inset-0">
          {/* Lockers */}
          <div className="absolute top-16 left-4 w-8 h-32 bg-gray-400 border-2 border-gray-600 rounded">
            <div className="text-center text-xs mt-4">🗄️</div>
          </div>
          <div className="absolute top-16 right-4 w-8 h-32 bg-gray-400 border-2 border-gray-600 rounded">
            <div className="text-center text-xs mt-4">🗄️</div>
          </div>

          {/* Water Fountain */}
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-blue-300 border-2 border-blue-500 rounded">
            <div className="text-center text-xs mt-1">💧</div>
          </div>
        </div>
      )}

      {/* Teachers positioned in 3D space */}
      {getCurrentTeachers().map(teacher => {
        const scale = Math.max(1.2, 2 - teacher.depth / 50); // Much larger and less depth scaling
        const yOffset = teacher.depth * 0.2; // Less dramatic perspective effect
        const xPosition = 50 + teacher.position * 0.8; // Center point + horizontal offset
        const zIndex = 100 - teacher.depth;
        
        return (
          <motion.div
            key={teacher.id}
            className="absolute cursor-pointer"
            style={{
              left: `${xPosition}%`,
              bottom: `${20 + yOffset}%`,
              transform: `scale(${scale})`,
              zIndex
            }}
            whileHover={{ scale: scale * 1.1 }}
            onClick={() => setSelectedTeacher(teacher)}
          >
            {/* Full Body Teacher Avatar */}
            <div className="relative">
              {/* Teacher Body */}
              <div className="relative w-20 h-40 flex flex-col items-center">
                {/* Head */}
                <div className="w-12 h-12 rounded border-3 border-amber-600 mb-2 shadow-lg relative overflow-hidden">
                  {/* Generate realistic head based on teacher */}
                  {teacher.id === 'teacher1' && ( // Ms. Johnson - Math
                    <>
                      {/* Skin */}
                      <div className="w-full h-full bg-gradient-to-b from-orange-200 to-orange-300"></div>
                      {/* Hair */}
                      <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-amber-800 to-amber-700 rounded-t"></div>
                      <div className="absolute top-3 left-1.5 w-1.5 h-3 bg-amber-700 rounded-sm"></div>
                      <div className="absolute top-3 right-1.5 w-1.5 h-3 bg-amber-700 rounded-sm"></div>
                      {/* Eyes */}
                      <div className="absolute top-4.5 left-2 w-1.5 h-1.5 bg-blue-800 rounded-full"></div>
                      <div className="absolute top-4.5 right-2 w-1.5 h-1.5 bg-blue-800 rounded-full"></div>
                      {/* Glasses */}
                      <div className="absolute top-4 left-1.5 w-3 h-3 border-2 border-black rounded-sm bg-white/20"></div>
                      <div className="absolute top-4 right-1.5 w-3 h-3 border-2 border-black rounded-sm bg-white/20"></div>
                      <div className="absolute top-5 left-4.5 w-1.5 h-1 bg-black"></div>
                      {/* Nose */}
                      <div className="absolute top-6.5 left-4.5 w-1 h-1.5 bg-orange-400 rounded-sm"></div>
                      {/* Mouth */}
                      <div className="absolute top-8 left-4 w-3 h-1 bg-red-400 rounded-sm"></div>
                    </>
                  )}
                  {teacher.id === 'teacher2' && ( // Mr. Smith - Science
                    <>
                      {/* Skin */}
                      <div className="w-full h-full bg-gradient-to-b from-amber-100 to-amber-200"></div>
                      {/* Hair */}
                      <div className="absolute top-0 left-0 w-full h-5 bg-gradient-to-b from-gray-700 to-gray-600 rounded-t"></div>
                      <div className="absolute top-1.5 left-1 w-2 h-1.5 bg-gray-600"></div>
                      <div className="absolute top-1.5 right-1 w-2 h-1.5 bg-gray-600"></div>
                      {/* Eyes */}
                      <div className="absolute top-5 left-2 w-1.5 h-1 bg-brown-800"></div>
                      <div className="absolute top-5 right-2 w-1.5 h-1 bg-brown-800"></div>
                      {/* Beard */}
                      <div className="absolute top-6.5 left-1.5 w-7 h-4 bg-gray-700 rounded-b-lg"></div>
                      <div className="absolute top-7.5 left-2 w-6 h-2.5 bg-gray-600 rounded-b"></div>
                      {/* Nose */}
                      <div className="absolute top-6 left-4.5 w-1 h-1.5 bg-amber-300 rounded-sm"></div>
                    </>
                  )}
                  {teacher.id === 'teacher3' && ( // Ms. Davis - English
                    <>
                      {/* Skin */}
                      <div className="w-full h-full bg-gradient-to-b from-rose-200 to-rose-300"></div>
                      {/* Hair */}
                      <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-red-900 to-red-800 rounded-t"></div>
                      <div className="absolute top-1.5 left-0 w-3 h-4 bg-red-800 rounded-l-full"></div>
                      <div className="absolute top-1.5 right-0 w-3 h-4 bg-red-800 rounded-r-full"></div>
                      {/* Eyes */}
                      <div className="absolute top-4.5 left-2 w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                      <div className="absolute top-4.5 right-2 w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                      {/* Eyelashes */}
                      <div className="absolute top-4 left-2 w-1.5 h-0.5 bg-black"></div>
                      <div className="absolute top-4 right-2 w-1.5 h-0.5 bg-black"></div>
                      {/* Nose */}
                      <div className="absolute top-6 left-4.5 w-1 h-1 bg-rose-400 rounded-sm"></div>
                      {/* Mouth */}
                      <div className="absolute top-8 left-4 w-3 h-1 bg-red-500 rounded-sm"></div>
                      {/* Lipstick */}
                      <div className="absolute top-8 left-4 w-3 h-1 bg-red-600 rounded-sm"></div>
                    </>
                  )}
                  {teacher.id === 'teacher4' && ( // Mr. Garcia - History
                    <>
                      {/* Skin */}
                      <div className="w-full h-full bg-gradient-to-b from-yellow-200 to-yellow-300"></div>
                      {/* Hair */}
                      <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-black to-gray-800 rounded-t"></div>
                      <div className="absolute top-3 left-1 w-1.5 h-3 bg-gray-800"></div>
                      <div className="absolute top-3 right-1 w-1.5 h-3 bg-gray-800"></div>
                      {/* Eyes */}
                      <div className="absolute top-5 left-2 w-1.5 h-1 bg-brown-900"></div>
                      <div className="absolute top-5 right-2 w-1.5 h-1 bg-brown-900"></div>
                      {/* Mustache */}
                      <div className="absolute top-6.5 left-3 w-4 h-1 bg-black rounded-sm"></div>
                      <div className="absolute top-6.5 left-3 w-2 h-1.5 bg-black rounded-l-full"></div>
                      <div className="absolute top-6.5 right-3 w-2 h-1.5 bg-black rounded-r-full"></div>
                      {/* Nose */}
                      <div className="absolute top-6 left-4.5 w-1 h-1.5 bg-yellow-400 rounded-sm"></div>
                      {/* Mouth */}
                      <div className="absolute top-8.5 left-4 w-3 h-1 bg-red-400 rounded-sm"></div>
                    </>
                  )}
                  {teacher.id === 'teacher5' && ( // Mrs. Chen - Art
                    <>
                      {/* Skin */}
                      <div className="w-full h-full bg-gradient-to-b from-amber-200 to-amber-300"></div>
                      {/* Hair */}
                      <div className="absolute top-0 left-0 w-full h-5 bg-gradient-to-b from-purple-900 to-purple-800 rounded-t"></div>
                      <div className="absolute top-1.5 left-0 w-2 h-3 bg-purple-700 rounded-l"></div>
                      <div className="absolute top-1.5 right-0 w-2 h-3 bg-purple-700 rounded-r"></div>
                      {/* Hair highlights */}
                      <div className="absolute top-1 left-3 w-4 h-1 bg-purple-600"></div>
                      {/* Eyes */}
                      <div className="absolute top-5 left-2 w-1.5 h-1 bg-black"></div>
                      <div className="absolute top-5 right-2 w-1.5 h-1 bg-black"></div>
                      {/* Paint smudge on cheek */}
                      <div className="absolute top-6 right-1 w-1 h-1 bg-blue-400 rounded-full"></div>
                      {/* Nose */}
                      <div className="absolute top-6 left-4.5 w-1 h-1 bg-amber-400 rounded-sm"></div>
                      {/* Mouth */}
                      <div className="absolute top-8 left-4 w-3 h-1 bg-pink-400 rounded-sm"></div>
                    </>
                  )}
                </div>
                
                {/* Body */}
                <div className={`w-16 h-20 rounded-sm border-3 shadow-lg ${
                  teacher.subject === 'Mathematics' ? 'bg-gradient-to-b from-red-400 to-red-500 border-red-600' :
                  teacher.subject === 'Science' ? 'bg-gradient-to-b from-blue-400 to-blue-500 border-blue-600' :
                  teacher.subject === 'English' ? 'bg-gradient-to-b from-green-400 to-green-500 border-green-600' :
                  teacher.subject === 'History' ? 'bg-gradient-to-b from-yellow-400 to-yellow-500 border-yellow-600' :
                  'bg-gradient-to-b from-purple-400 to-purple-500 border-purple-600'
                } flex items-center justify-center relative`}>
                  {/* Shirt details */}
                  <div className="absolute top-2 w-10 h-3 bg-white/30 rounded-sm"></div>
                  <div className="absolute bottom-2 w-12 h-2 bg-black/20 rounded-sm"></div>
                  
                  {/* Subject icon on shirt */}
                  <div className="text-white text-lg">
                    {teacher.subject === 'Mathematics' ? '📊' :
                     teacher.subject === 'Science' ? '🔬' :
                     teacher.subject === 'English' ? '📚' :
                     teacher.subject === 'History' ? '🏛️' : '🎨'}
                  </div>
                </div>
                
                {/* Arms */}
                <div className="absolute top-15 -left-3 w-5 h-10 bg-gradient-to-b from-orange-200 to-orange-300 rounded border-2 border-orange-400 shadow-md transform -rotate-12"></div>
                <div className="absolute top-15 -right-3 w-5 h-10 bg-gradient-to-b from-orange-200 to-orange-300 rounded border-2 border-orange-400 shadow-md transform rotate-12"></div>
                
                {/* Legs */}
                <div className="absolute bottom-0 left-2 w-5 h-10 bg-gradient-to-b from-gray-600 to-gray-700 rounded-sm border-2 border-gray-800 shadow-md"></div>
                <div className="absolute bottom-0 right-2 w-5 h-10 bg-gradient-to-b from-gray-600 to-gray-700 rounded-sm border-2 border-gray-800 shadow-md"></div>
                
                {/* Feet */}
                <div className="absolute -bottom-2 left-1 w-6 h-3 bg-black rounded-sm shadow-md"></div>
                <div className="absolute -bottom-2 right-1 w-6 h-3 bg-black rounded-sm shadow-md"></div>
              </div>
              
              {/* Interaction indicator */}
              <motion.div
                className="absolute -top-3 -right-3 w-6 h-6 bg-green-400 rounded-full border-3 border-white shadow-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm flex items-center justify-center">💬</span>
              </motion.div>

              {/* Name and subject tag */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
                <div className="px-3 py-1.5 text-sm bg-black/80 text-white rounded-lg whitespace-nowrap mb-2 shadow-lg border border-white/20">
                  {teacher.name.split(' ')[0]}
                </div>
                <div className="px-2 py-1 text-sm bg-blue-600 text-white rounded-md text-center shadow-md border border-blue-800">
                  {teacher.subject}
                </div>
              </div>

              {/* Shadow */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-black/30 rounded-full blur-sm"></div>
            </div>
          </motion.div>
        );
      })}

      {/* Room Info Display */}
      <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
        <h2 className="font-medium">{getRoomTitle()}</h2>
        <p className="text-sm opacity-90">
          {currentRoom === 'teachersLounge' ? '☕ Faculty relaxation area' : '🚪 Main school hallway'}
        </p>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 left-4 space-y-2">
        {getAvailableExits().map(exit => (
          <Button
            key={exit.direction}
            onClick={() => moveToRoom(exit.direction as CurrentRoom)}
            className="bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-800"
          >
            {exit.icon} {exit.label}
          </Button>
        ))}
      </div>

      {/* Player Status */}
      <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg">
        <div className="text-sm">👤 Student View</div>
        <div className="text-xs opacity-90">Teachers nearby: {getCurrentTeachers().length}</div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg max-w-xs">
        <div className="text-sm mb-2">🎮 How to Play</div>
        <ul className="text-xs space-y-1 opacity-90">
          <li>• Click teachers to interact</li>
          <li>• Use navigation to move between rooms</li>
          <li>• Explore the school environment</li>
        </ul>
      </div>

      {/* Teacher Dialog */}
      {selectedTeacher && (
        <TeacherDialog
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
        />
      )}
    </div>
  );
}