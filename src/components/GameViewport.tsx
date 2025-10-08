import { useState } from 'react';
import { motion } from 'motion/react';
import { TeacherDialog } from './TeacherDialog';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { StudentDialog } from './StudentDialog';
import { TutorDialog } from './TutorDialog';
import corridorUrl from '../images/corridor.png';
import studentroomUrl from '../images/studentroom.png';
import teachersloungeUrl from '../images/teacherslounge.png';
import teacher1Url from '../images/teacher1.png';
import teacher2Url from '../images/teacher2.png';
import teacher3Url from '../images/teacher3.png';
import teacher4Url from '../images/teacher4.png';
import teacher5Url from '../images/teacher5.png';
import student1Url from '../images/student1.png';
import student2Url from '../images/student2.png';
import student3Url from '../images/student3.png';
import student4Url from '../images/student4.png';
import student5Url from '../images/student5.png';
import tutor1Url from '../images/tutor1.png';
import tutor2Url from '../images/tutor2.png';

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  avatar: string;
  description: string;
  videoUrl: string;
  depth: number; // Distance from player (0-100, where 0 is closest)
  position: number; // Horizontal position (-50 to 50, where 0 is center)
  personType: string;
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  interests: string[];
  description: string;
  videoUrl: string;
  depth: number; // Distance from player (0-100, where 0 is closest)
  position: number; // Horizontal position (-50 to 50, where 0 is center)
  currentClass: string;
  personType: string;
}

export type Person = Teacher | Student;

type CurrentRoom = 'teachersLounge' | 'corridor' | 'studentRoom';

export function GameViewport() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [currentRoom, setCurrentRoom] = useState<CurrentRoom>('teachersLounge');

  const teachersLoungePeople: Teacher[] = [
    {
      id: 'teacher1',
      name: 'Laura Siikalahti',
      subject: 'Matematiikka',
      avatar: teacher1Url,
      description: 'Matematiikan intohimoinen opettaja 10 vuoden kokemuksella.',
      videoUrl: 'https://example.com/math-intro',
      personType: 'teacher',
      depth: 30,
      position: -30
    },
    {
      id: 'teacher2',
      name: 'Tiina Persoona',
      subject: 'Fysiikka ja kemia',
      avatar: teacher2Url,
      description: 'Fysiikan ja kemian opettaja. Erityinen mielenkiinto käytännön kokeisiin.',
      videoUrl: 'https://example.com/science-intro',
      personType: 'teacher',
      depth: 35,
      position: 12
    },
    {
      id: 'teacher3',
      name: 'Fanny Nikkilä',
      subject: 'Suomen kieli ja kirjallisuus',
      avatar: teacher3Url,
      description: 'Kirjallisuuden ystävä ja luova kirjoittaja. Äidinkielen opettaja.',
      videoUrl: 'https://example.com/english-intro',
      personType: 'teacher',
      depth: 60,
      position: -17
    }
  ];

  const corridorPeople: Person[] = [
    {
      id: 'teacher4',
      name: 'Isabella Doyle',
      subject: 'Historia',
      avatar: teacher4Url,
      description: 'Suomen historia ja toinen maailmansota ovat lempiaiheitani. Historian opettaja.',
      videoUrl: 'https://example.com/history-intro',
      personType: 'teacher',
      depth: 45,
      position: -10
    },
    {
      id: 'teacher5',
      name: 'Alan Ruokki',
      subject: 'Kuvataiteet',
      avatar: teacher5Url,
      description: 'Luova kuvataiteiden opettaja, joka tykkää inspiroida nuoria taiteilijanalkuja.',
      videoUrl: 'https://example.com/art-intro',
      personType: 'teacher',
      depth: 30,
      position: 0
    },
    {
      id: 'tutor2',
      name: 'Sanna Anttila',
      interests: ['Skeittaus / skuuttaus', 'Elektroniikka'],
      avatar: tutor2Url,
      description: "",
      currentClass: '9A',
      videoUrl: 'https://example.com/tutor2-intro',
      personType: 'tutor',
      depth: 30,
      position: 20
    }
  ];

  const studentRoomPeople: Student[] = [
    {
      id: 'student1',
      name: 'Nuutti Alanko',
      interests: ['Historia', 'Urheilu', 'Leipominen'],
      avatar: student1Url,
      description: "",
      currentClass: '7A',
      videoUrl: 'https://example.com/student1-intro',
      personType: 'student',
      depth: 55,
      position: 10
    },
    {
      id: 'student2',
      name: 'Roderick Harakka',
      interests: ['Taide', 'Musiikin soittaminen', 'Oboe', 'Patarummut'],
      avatar: student2Url,
      description: "",
      currentClass: '7C',
      videoUrl: 'https://example.com/student2-intro',
      personType: 'student',
      depth: 30,
      position: 20
    },
    {
      id: 'student3',
      name: 'Meri Frankkila',
      interests: ['Urheilu', 'Anime', 'K-Pop', 'J-Pop'],
      avatar: student3Url,
      description: "",
      currentClass: '7C',
      videoUrl: 'https://example.com/student3-intro',
      personType: 'student',
      depth: 30,
      position: 35
    },
    {
      id: 'student4',
      name: 'Sophia Ramudden',
      interests: ['Elokuvat', 'Ruoanlaitto', 'Pelit', 'Sarjakuvat'],
      avatar: student4Url,
      description: "",
      currentClass: '7B',
      videoUrl: 'https://example.com/student4-intro',
      personType: 'student',
      depth: 30,
      position: -15
    },
    {
      id: 'student5',
      name: 'Maisa Vauhkola',
      interests: ['Leipominen', 'Musiikin kuuntelu', 'Vaellus', 'Partio'],
      avatar: student5Url,
      description: "",
      currentClass: '7B',
      videoUrl: 'https://example.com/student5-intro',
      personType: 'student',
      depth: 30,
      position: 0
    },
    {
      id: 'tutor1',
      name: 'Iivo Verkkonen',
      interests: ['Taide', 'Karate', 'Eläimet', 'Kirjoittaminen', 'Lukeminen'],
      avatar: tutor1Url,
      description: "",
      currentClass: '9C',
      videoUrl: 'https://example.com/tutor1-intro',
      personType: 'tutor',
      depth: 20,
      position: -35
    }
  ];

  const getCurrentPeople = () => {
    return currentRoom === 'teachersLounge' ? teachersLoungePeople : (currentRoom === 'corridor' ? corridorPeople : studentRoomPeople);
  };

  const getRoomTitle = () => {
    return currentRoom === 'teachersLounge' ? "Opettajainhuone" : (currentRoom === 'corridor' ? 'Käytävä' : 'Oppilaskunnan huone');
  };

  const getAvailableExits = () => {
    if (currentRoom === 'teachersLounge') {
      return [{ direction: 'corridor', label: 'Siirry käytävään', icon: '🚪' }, {direction: 'studentRoom', label: 'Siirry oppilaskunnan huoneeseen', icon: '📚'}];
    } else if (currentRoom === 'studentRoom') {
      return [{ direction: 'corridor', label: 'Siirry käytävään', icon: '🚪' }, {direction: 'teachersLounge', label: 'Siirry opettajainhuoneeseen', icon: '☕'}];
    } else {
      return [{ direction: 'teachersLounge', label: 'Siirry opettajainhuoneeseen', icon: '☕' }, {direction: 'studentRoom', label: 'Siirry oppilaskunnan huoneeseen', icon: '📚'}];
    }
  };

  const moveToRoom = (newRoom: CurrentRoom) => {
    setCurrentRoom(newRoom);
    setSelectedPerson(null); // Close any open dialogs
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg border-4 border-gray-800">
      {/* Room Background Images */}
      <div className="absolute inset-0">
        {currentRoom === 'teachersLounge' && (
          <ImageWithFallback 
            src={teachersloungeUrl}
            alt="Opettajainhuone"
            className="w-full h-full object-cover"
          />
        )}
        {currentRoom === 'corridor' && (
          <ImageWithFallback 
            src={corridorUrl}
            alt="Käytävä"
            className="w-full h-full object-cover"
          />
        )}
        {currentRoom === 'studentRoom' && (
          <ImageWithFallback 
            src={studentroomUrl}
            alt="Oppilaskunnan huone"
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Overlay for better character visibility */}
        <div className="absolute inset-0 bg-black/20"></div>
        
      </div>

      {/* Room-specific Environment */}
        {currentRoom === 'teachersLounge' && (
        <div className="absolute inset-0">
        </div>
      )}

      /*{currentRoom === 'corridor' && (
        <div className="absolute inset-0">
        </div>
      )}
*/
      {/* People positioned in 3D space */}
      {getCurrentPeople().map(person => {
        const scale = Math.max(1.2, 2 - person.depth / 50); // Much larger and less depth scaling
        const yOffset = person.depth * 0.2; // Less dramatic perspective effect
        const xPosition = 50 + person.position * 0.8; // Center point + horizontal offset
        const zIndex = 100 - person.depth;
        
        return (
          <motion.div
            key={person.id}
            className="absolute cursor-pointer"
            style={{
              left: `${xPosition}%`,
              bottom: `${20 + yOffset}%`,
              transform: `scale(${scale})`,
              zIndex
            }}
            whileHover={{ scale: scale * 1.1 }}
            onClick={() => setSelectedPerson(person)}
          >
            <div className="relative">
              <div className="relative w-80 h-100 flex flex-col items-center">
                  <ImageWithFallback
                    src={person.avatar}
                  />
              </div>
              
              {/* Interaction indicator */}
              <motion.div
                className="absolute -top-3 right-22 w-6 h-6 bg-green-400 rounded-full border-3 border-white shadow-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm flex items-center justify-center">💬</span>
              </motion.div>

              {/* Name and subject tag */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
                <div className="px-3 py-1.5 text-sm bg-black/80 text-white rounded-lg whitespace-nowrap mb-2 shadow-lg border border-white/20">
                  {person.personType === 'teacher' ? person.name : person.name.split(' ')[0]}
                </div>
                <div className="px-2 py-1 text-sm bg-blue-600 text-white rounded-md text-center shadow-md border border-blue-800">
                  {(person as any).subject? (person as any).subject : ""}
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
        <div className="text-sm">👤 Oppilaan näkymä</div>
        <div className="text-xs opacity-90">Henkilöitä näkyvissä: {getCurrentPeople().length}</div>
      </div>

      {/* Teacher Dialog */}
      {selectedPerson && selectedPerson.personType === 'teacher' && (
        <TeacherDialog
          teacher={selectedPerson}
          onClose={() => setSelectedPerson(null)}
        />
      )}
      {selectedPerson && selectedPerson.personType === 'student' && (
        <StudentDialog
          student={selectedPerson}
          onClose={() => setSelectedPerson(null)}
        />
      )}
      {selectedPerson && selectedPerson.personType === 'tutor' && (
        <TutorDialog
          student={selectedPerson}
          onClose={() => setSelectedPerson(null)}
        />
      )}
    </div>
  );
}