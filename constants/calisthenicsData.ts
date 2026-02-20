/**
 * Calisthenics Exercise Data
 * 15 Real exercises with primary/secondary muscles and instructions.
 */

export interface CalisthenicsExercise {
    id: string;
    name: string;
    muscleEmoji: string;
    primaryMuscles: string[];
    secondaryMuscles: string[];
    level: 'beginner' | 'intermediate' | 'advanced';
    calories: number;
    sets: number;
    reps: string;
    category: string;
    equipment: string;
    images: any[]; // [require(start), require(end)]
    accentColor: string;
    instructions: string[];
}

export const MUSCLE_FILTER_LABELS: Record<string, string[]> = {
    'All': [],
    'Push': ['Chest', 'Shoulders', 'Triceps'],
    'Pull': ['Lats', 'Biceps', 'Forearms'],
    'Legs': ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
    'Core': ['Abs', 'Lower Back'],
};

export const CALISTHENICS: CalisthenicsExercise[] = [
    {
        id: '1',
        name: 'Push-up',
        muscleEmoji: '💪',
        primaryMuscles: ['Chest'],
        secondaryMuscles: ['Shoulders', 'Triceps'],
        level: 'beginner',
        calories: 45,
        sets: 3,
        reps: '12-15',
        category: 'Push',
        equipment: 'Bodyweight',
        images: [
            require('../assets/exercises/Push-Up_Wide/0.jpg'),
            require('../assets/exercises/Push-Up_Wide/1.jpg'),
        ],
        accentColor: '#FF6B4A',
        instructions: [
            'Start in a plank position with hands slightly wider than shoulders.',
            'Lower your chest until it nearly touches the floor.',
            'Push back up to the starting position.',
            'Keep your core engaged throughout.'
        ]
    },
    {
        id: '2',
        name: 'Pull-up',
        muscleEmoji: '🦇',
        primaryMuscles: ['Lats'],
        secondaryMuscles: ['Biceps', 'Shoulders'],
        level: 'intermediate',
        calories: 60,
        sets: 3,
        reps: '8-10',
        category: 'Pull',
        equipment: 'Pull-up Bar',
        images: [
            require('../assets/exercises/Chin-Up/0.jpg'),
            require('../assets/exercises/Chin-Up/1.jpg'),
        ],
        accentColor: '#3B82F6',
        instructions: [
            'Grip the bar with palms facing away.',
            'Pull yourself up until your chin is over the bar.',
            'Lower yourself back down with control.',
            'Avoid swinging your legs.'
        ]
    },
    {
        id: '3',
        name: 'Squat',
        muscleEmoji: '🦵',
        primaryMuscles: ['Quads'],
        secondaryMuscles: ['Glutes', 'Hamstrings'],
        level: 'beginner',
        calories: 50,
        sets: 4,
        reps: '15-20',
        category: 'Legs',
        equipment: 'Bodyweight',
        images: [
            require('../assets/exercises/Bodyweight_Squat/0.jpg'),
            require('../assets/exercises/Bodyweight_Squat/1.jpg'),
        ],
        accentColor: '#10B981',
        instructions: [
            'Stand with feet shoulder-width apart.',
            'Lower your hips as if sitting in a chair.',
            'Keep your chest up and weight on your heels.',
            'Return to standing position.'
        ]
    },
    {
        id: '4',
        name: 'Dips',
        muscleEmoji: '🏗️',
        primaryMuscles: ['Triceps'],
        secondaryMuscles: ['Chest', 'Shoulders'],
        level: 'intermediate',
        calories: 55,
        sets: 3,
        reps: '10-12',
        category: 'Push',
        equipment: 'Dip Bars',
        images: [
            require('../assets/exercises/Dips_-_Triceps_Version/0.jpg'),
            require('../assets/exercises/Dips_-_Triceps_Version/1.jpg'),
        ],
        accentColor: '#F59E0B',
        instructions: [
            'Support yourself on dip bars with arms straight.',
            'Lower your body by bending your elbows until they reach 90 degrees.',
            'Push back up to the start.',
            'Keep your torso upright.'
        ]
    },
    {
        id: '5',
        name: 'Plank',
        muscleEmoji: '🧱',
        primaryMuscles: ['Abs'],
        secondaryMuscles: ['Shoulders', 'Lower Back'],
        level: 'beginner',
        calories: 30,
        sets: 3,
        reps: '60s',
        category: 'Core',
        equipment: 'Bodyweight',
        images: [
            require('../assets/exercises/Plank/0.jpg'),
            require('../assets/exercises/Plank/1.jpg'),
        ],
        accentColor: '#8B5CF6',
        instructions: [
            'Rest on your forearms and toes.',
            'Keep your body in a straight line from head to heels.',
            'Hold the position and breathe deeply.',
            'Squeeze your core and glutes.'
        ]
    },
    {
        id: '6',
        name: 'Muscle-up',
        muscleEmoji: '🚀',
        primaryMuscles: ['Lats', 'Triceps'],
        secondaryMuscles: ['Biceps', 'Chest', 'Shoulders'],
        level: 'advanced',
        calories: 120,
        sets: 3,
        reps: '3-5',
        category: 'Pull/Push',
        equipment: 'Pull-up Bar',
        images: [
            require('../assets/exercises/Muscle_Up/0.jpg'),
            require('../assets/exercises/Muscle_Up/1.jpg'),
        ],
        accentColor: '#EF4444',
        instructions: [
            'Perform a powerful pull-up.',
            'Transition your wrists over the bar.',
            'Push yourself up into a straight-arm dip position.',
            'Lower back down with control.'
        ]
    },
    {
        id: '7',
        name: 'L-Sit',
        muscleEmoji: '📐',
        primaryMuscles: ['Abs'],
        secondaryMuscles: ['Triceps', 'Hip Flexors'],
        level: 'intermediate',
        calories: 40,
        sets: 3,
        reps: '20s',
        category: 'Core',
        equipment: 'Parallettes or Floor',
        images: [
            require('../assets/exercises/Plank/0.jpg'),
            require('../assets/exercises/Plank/1.jpg'),
        ],
        accentColor: '#06B6D4',
        instructions: [
            'Sit on the floor with legs straight in front.',
            'Push through your hands to lift your body.',
            'Hold your legs parallel to the floor.',
            'Keep your shoulders depressed.'
        ]
    },
    {
        id: '8',
        name: 'Handstand Push-up',
        muscleEmoji: '🤸',
        primaryMuscles: ['Shoulders'],
        secondaryMuscles: ['Triceps', 'Upper Traps'],
        level: 'advanced',
        calories: 90,
        sets: 3,
        reps: '5-8',
        category: 'Push',
        equipment: 'Wall or Floor',
        images: [
            require('../assets/exercises/Handstand_Push-Ups/0.jpg'),
            require('../assets/exercises/Handstand_Push-Ups/1.jpg'),
        ],
        accentColor: '#EC4899',
        instructions: [
            'Kick up into a handstand against a wall.',
            'Lower your head towards the floor by bending elbows.',
            'Push back up until arms are fully extended.',
            'Maintain a tight core.'
        ]
    },
    {
        id: '9',
        name: 'Lunges',
        muscleEmoji: '🚶',
        primaryMuscles: ['Quads'],
        secondaryMuscles: ['Glutes', 'Hamstrings'],
        level: 'beginner',
        calories: 40,
        sets: 3,
        reps: '12 per leg',
        category: 'Legs',
        equipment: 'Bodyweight',
        images: [
            require('../assets/exercises/Bodyweight_Walking_Lunge/0.jpg'),
            require('../assets/exercises/Bodyweight_Walking_Lunge/1.jpg'),
        ],
        accentColor: '#14B8A6',
        instructions: [
            'Step forward with one leg.',
            'Lower your hips until both knees are bent at a 90-degree angle.',
            'Keep your front knee above the ankle.',
            'Push back to the starting position.'
        ]
    },
    {
        id: '10',
        name: 'Chin-up',
        muscleEmoji: '🧔',
        primaryMuscles: ['Biceps'],
        secondaryMuscles: ['Lats', 'Shoulders'],
        level: 'beginner',
        calories: 50,
        sets: 3,
        reps: '8-10',
        category: 'Pull',
        equipment: 'Pull-up Bar',
        images: [
            require('../assets/exercises/Chin-Up/0.jpg'),
            require('../assets/exercises/Chin-Up/1.jpg'),
        ],
        accentColor: '#6366F1',
        instructions: [
            'Grip the bar with palms facing you.',
            'Pull yourself up until your chin is above the bar.',
            'Lower yourself back down slowly.',
            'Full range of motion is key.'
        ]
    },
    {
        id: '11',
        name: 'Pistol Squat',
        muscleEmoji: '🔫',
        primaryMuscles: ['Quads'],
        secondaryMuscles: ['Glutes', 'Calves'],
        level: 'advanced',
        calories: 80,
        sets: 3,
        reps: '5 per leg',
        category: 'Legs',
        equipment: 'Bodyweight',
        images: [
            require('../assets/exercises/Bodyweight_Squat/0.jpg'),
            require('../assets/exercises/Bodyweight_Squat/1.jpg'),
        ],
        accentColor: '#F43F5E',
        instructions: [
            'Stand on one leg with the other leg extended forward.',
            'Lower your body into a deep squat on the standing leg.',
            'Keep your balance and core tight.',
            'Push back up to standing.'
        ]
    },
    {
        id: '12',
        name: 'Diamond Push-up',
        muscleEmoji: '💎',
        primaryMuscles: ['Triceps'],
        secondaryMuscles: ['Chest', 'Shoulders'],
        level: 'intermediate',
        calories: 50,
        sets: 3,
        reps: '10-12',
        category: 'Push',
        equipment: 'Bodyweight',
        images: [
            require('../assets/exercises/Push-Ups_-_Close_Triceps_Position/0.jpg'),
            require('../assets/exercises/Push-Ups_-_Close_Triceps_Position/1.jpg'),
        ],
        accentColor: '#A855F7',
        instructions: [
            'Perform a push-up with hands forming a diamond shape.',
            'Lower your chest towards your hands.',
            'Push back up, focusing on triceps.',
            'Maintain a straight body line.'
        ]
    },
    {
        id: '13',
        name: 'Leg Raises',
        muscleEmoji: '🆙',
        primaryMuscles: ['Lower Abs'],
        secondaryMuscles: ['Hip Flexors'],
        level: 'beginner',
        calories: 35,
        sets: 3,
        reps: '12-15',
        category: 'Core',
        equipment: 'Floor',
        images: [
            require('../assets/exercises/Flat_Bench_Lying_Leg_Raise/0.jpg'),
            require('../assets/exercises/Flat_Bench_Lying_Leg_Raise/1.jpg'),
        ],
        accentColor: '#22C55E',
        instructions: [
            'Lie on your back with hands at your sides.',
            'Lift your legs until they are perpendicular to the floor.',
            'Lower your legs slowly without touching the floor.',
            'Keep your lower back pressed down.'
        ]
    },
    {
        id: '14',
        name: 'Back Lever',
        muscleEmoji: '🤸',
        primaryMuscles: ['Lower Back', 'Biceps'],
        secondaryMuscles: ['Rear Delts', 'Core'],
        level: 'advanced',
        calories: 100,
        sets: 3,
        reps: '10s hold',
        category: 'Pull/Hold',
        equipment: 'Rings or Bar',
        images: [
            require('../assets/exercises/Inverted_Row/0.jpg'),
            require('../assets/exercises/Inverted_Row/1.jpg'),
        ],
        accentColor: '#D946EF',
        instructions: [
            'Hang from the bar and rotate into a tucked back position.',
            'Extend your body horizontally facing the floor.',
            'Hold the position while maintaining body tension.',
            'Keep your arms straight.'
        ]
    },
    {
        id: '15',
        name: 'Russian Twist',
        muscleEmoji: '🌪️',
        primaryMuscles: ['Obliques'],
        secondaryMuscles: ['Abs'],
        level: 'beginner',
        calories: 35,
        sets: 3,
        reps: '20 per side',
        category: 'Core',
        equipment: 'Bodyweight',
        images: [
            require('../assets/exercises/Russian_Twist/0.jpg'),
            require('../assets/exercises/Russian_Twist/1.jpg'),
        ],
        accentColor: '#FB923C',
        instructions: [
            'Sit on the floor with knees bent and feet lifted.',
            'Lean back slightly and rotate your torso left to right.',
            'Touch the floor on each side.',
            'Maintain a stable lower body.'
        ]
    }
];
