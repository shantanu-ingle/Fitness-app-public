const mongoose = require('mongoose');
require('dotenv').config();
const Exercise = require('./models/exerciseSchema');


const exercises = [
  // Chest (6 exercises)
  {
    _id: 'chest_1',
    name: 'Push-Ups',
    muscleGroup: 'chest',
    difficulty: 'Beginner',
    description: 'Start in a plank position with hands shoulder-width apart. Lower your body until your chest nearly touches the floor, then push back up.',
    equipment: 'None',
    pairingScore: 8,
    ageGroup: '18-35',
    weightCategory: 'Light',
    goals: ['Weight Loss', 'Endurance'],
    exerciseType: 'compound',
    intensity: 'moderate',
    imageUrl: 'https://static.strengthlevel.com/images/exercises/push-ups/push-ups-800.jpg?w=300&h=200', // Person doing push-ups
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [12, 15], rest: 45 },
      'Muscle Gain': { sets: [3, 4], reps: [8, 12], rest: 60 },
      'Endurance': { sets: [2, 3], reps: [15, 20], rest: 30 }
    }
  },
  {
    _id: 'chest_2',
    name: 'Barbell Bench Press',
    muscleGroup: 'chest',
    difficulty: 'Intermediate',
    description: 'Lie on a bench with feet flat on the floor. Grip the barbell slightly wider than shoulder-width apart. Lower the bar to your chest, then press it back up.',
    equipment: 'Barbell, Bench',
    pairingScore: 9,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain'],
    exerciseType: 'compound',
    intensity: 'high',
    imageUrl: 'https://cdn.shopify.com/s/files/1/1497/9682/files/2_a09de347-1652-4b84-96bf-fdc8bbc42481.jpg?v=1648825457?w=300&h=200', // Person doing barbell bench press
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 12], rest: 60 },
      'Muscle Gain': { sets: [4, 5], reps: [6, 10], rest: 90 },
      'Endurance': { sets: [2, 3], reps: [12, 15], rest: 45 }
    }
  },
  {
    _id: 'chest_3',
    name: 'Incline Dumbbell Bench Press',
    muscleGroup: 'chest',
    difficulty: 'Intermediate',
    description: 'Sit on an incline bench with dumbbells at chest level. Press the dumbbells up until arms are fully extended, then lower them back down.',
    equipment: 'Dumbbells, Incline Bench',
    pairingScore: 8,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain', 'Weight Loss'],
    exerciseType: 'compound',
    intensity: 'moderate',
    imageUrl: 'https://static.strengthlevel.com/images/exercises/incline-dumbbell-bench-press/incline-dumbbell-bench-press-800.avif?w=300&h=200', // Person doing incline dumbbell bench press
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 12], rest: 60 },
      'Muscle Gain': { sets: [3, 4], reps: [8, 10], rest: 75 },
      'Endurance': { sets: [2, 3], reps: [12, 15], rest: 45 }
    }
  },
  {
    _id: 'chest_4',
    name: 'Dumbbell Flyes',
    muscleGroup: 'chest',
    difficulty: 'Beginner',
    description: 'Lie on a flat bench with dumbbells above your chest. Lower the dumbbells out to the sides in a wide arc, then bring them back up.',
    equipment: 'Dumbbells, Bench',
    pairingScore: 7,
    ageGroup: '18-35',
    weightCategory: 'Light',
    goals: ['Weight Loss'],
    exerciseType: 'isolation',
    intensity: 'low',
    imageUrl: 'https://static.strengthlevel.com/images/exercises/dumbbell-fly/dumbbell-fly-800.avif?w=300&h=200', // Person doing dumbbell flyes
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [12, 15], rest: 30 },
      'Muscle Gain': { sets: [3, 4], reps: [10, 12], rest: 45 },
      'Endurance': { sets: [2, 3], reps: [15, 20], rest: 20 }
    }
  },
  {
    _id: 'chest_5',
    name: 'Chest Dips',
    muscleGroup: 'chest',
    difficulty: 'Advanced',
    description: 'Grip parallel bars, lean slightly forward. Lower your body until elbows are at 90 degrees, then push back up.',
    equipment: 'Dip Station',
    pairingScore: 8,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Endurance'],
    exerciseType: 'compound',
    intensity: 'high',
    imageUrl: 'https://cdn.shopify.com/s/files/1/1497/9682/files/2_a0cb9dd0-9c03-421e-b1aa-4b93c2b903ff.jpg?v=1653495447?w=300&h=200', // Person doing chest dips
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 12], rest: 60 },
      'Muscle Gain': { sets: [4, 5], reps: [6, 10], rest: 90 },
      'Endurance': { sets: [3, 4], reps: [12, 15], rest: 45 }
    }
  },
  {
    _id: 'chest_6',
    name: 'Cable Crossovers',
    muscleGroup: 'chest',
    difficulty: 'Intermediate',
    description: 'Set pulleys high on a cable machine. Grasp handles and pull them together in front of your body, then return slowly.',
    equipment: 'Cable Machine',
    pairingScore: 7,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Weight Loss', 'Endurance'],
    exerciseType: 'isolation',
    intensity: 'moderate',
    imageUrl: 'https://www.hsefitness.com/wp-content/uploads/2025/01/High-to-Low-Cable-Crossover-600x600.png.webp?w=300&h=200', // Person doing cable crossovers
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [12, 15], rest: 45 },
      'Muscle Gain': { sets: [3, 4], reps: [8, 12], rest: 75 },
      'Endurance': { sets: [2, 3], reps: [15, 20], rest: 30 }
    }
  },
  // Shoulders (6 exercises)
  {
    _id: 'shoulders_1',
    name: 'Overhead Press',
    muscleGroup: 'shoulders',
    difficulty: 'Intermediate',
    description: 'Stand with barbell at shoulder level. Press overhead to full extension, then lower with control.',
    equipment: 'Barbell',
    pairingScore: 8,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain'],
    exerciseType: 'compound',
    intensity: 'moderate',
    imageUrl: 'https://liftmanual.com/wp-content/uploads/2023/04/dumbbell-standing-overhead-press.jpg?w=300&h=200', // Person doing overhead press
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 12], rest: 60 },
      'Muscle Gain': { sets: [4, 5], reps: [6, 10], rest: 90 },
      'Endurance': { sets: [2, 3], reps: [12, 15], rest: 45 }
    }
  },
  {
    _id: 'shoulders_2',
    name: 'Lateral Raises',
    muscleGroup: 'shoulders',
    difficulty: 'Beginner',
    description: 'Hold dumbbells at sides. Raise arms to shoulder height, then lower slowly.',
    equipment: 'Dumbbells',
    pairingScore: 6,
    ageGroup: '18-35',
    weightCategory: 'Light',
    goals: ['Weight Loss', 'Endurance'],
    exerciseType: 'isolation',
    intensity: 'low',
    imageUrl: 'https://kinxlearning.com/cdn/shop/files/exercise-32_1000x.jpg?v=1613157925?w=300&h=200', // Person doing lateral raises
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [12, 15], rest: 30 },
      'Muscle Gain': { sets: [3, 4], reps: [10, 12], rest: 45 },
      'Endurance': { sets: [2, 3], reps: [15, 20], rest: 20 }
    }
  },
  {
    _id: 'shoulders_3',
    name: 'Front Raises',
    muscleGroup: 'shoulders',
    difficulty: 'Beginner',
    description: 'Stand with dumbbells in front of thighs. Raise to shoulder height, lower slowly.',
    equipment: 'Dumbbells',
    pairingScore: 6,
    ageGroup: '18-35',
    weightCategory: 'Light',
    goals: ['Weight Loss', 'Endurance'],
    exerciseType: 'isolation',
    intensity: 'low',
    imageUrl: 'https://liftmanual.com/wp-content/uploads/2023/04/weighted-front-raise.jpg?w=300&h=200', // Person doing front raises
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [12, 15], rest: 30 },
      'Muscle Gain': { sets: [3, 4], reps: [10, 12], rest: 45 },
      'Endurance': { sets: [2, 3], reps: [15, 20], rest: 20 }
    }
  },
  {
    _id: 'shoulders_4',
    name: 'Arnold Press',
    muscleGroup: 'shoulders',
    difficulty: 'Intermediate',
    description: 'Sit with dumbbells at chest, palms facing in. Press up while rotating palms out, lower with reverse motion.',
    equipment: 'Dumbbells',
    pairingScore: 8,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain'],
    exerciseType: 'compound',
    intensity: 'moderate',
    imageUrl: 'https://s3assets.skimble.com/assets/2287127/image_iphone.jpgw=300&h=200', // Person doing Arnold press
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 12], rest: 60 },
      'Muscle Gain': { sets: [4, 5], reps: [6, 10], rest: 90 },
      'Endurance': { sets: [2, 3], reps: [12, 15], rest: 45 }
    }
  },
  {
    _id: 'shoulders_5',
    name: 'Rear Delt Fly',
    muscleGroup: 'shoulders',
    difficulty: 'Intermediate',
    description: 'Bend forward, hold dumbbells, raise arms out to sides, lower slowly.',
    equipment: 'Dumbbells',
    pairingScore: 7,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain'],
    exerciseType: 'isolation',
    intensity: 'moderate',
    imageUrl: 'https://www.endomondo.com/wp-content/uploads/2024/07/rear-delt-fly-machine-guide.png?w=300&h=200', // Person doing rear delt fly
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 12], rest: 60 },
      'Muscle Gain': { sets: [3, 4], reps: [8, 10], rest: 75 },
      'Endurance': { sets: [2, 3], reps: [12, 15], rest: 45 }
    }
  },
  {
    _id: 'shoulders_6',
    name: 'Face Pull',
    muscleGroup: 'shoulders',
    difficulty: 'Advanced',
    description: 'Attach rope to high cable, pull toward face with elbows high, return slowly.',
    equipment: 'Cable Machine',
    pairingScore: 7,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Endurance'],
    exerciseType: 'isolation',
    intensity: 'moderate',
    imageUrl: 'https://trainingstation.co.uk/cdn/shop/articles/face-pulls-muscles-used_fe27890e-ac33-489a-bb21-a9bbcc84bfae_922x.png?v=1738219155?w=300&h=200', // Person doing face pull
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [12, 15], rest: 45 },
      'Muscle Gain': { sets: [3, 4], reps: [8, 12], rest: 75 },
      'Endurance': { sets: [2, 3], reps: [15, 20], rest: 30 }
    }
  },
  // Legs (6 exercises)
  {
    _id: 'legs_1',
    name: 'Barbell Squat',
    muscleGroup: 'legs',
    difficulty: 'Intermediate',
    description: 'Place barbell on shoulders. Squat until thighs are parallel, stand up.',
    equipment: 'Barbell, Rack',
    pairingScore: 10,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain'],
    exerciseType: 'compound',
    intensity: 'high',
    imageUrl: 'https://www.inspireusafoundation.org/wp-content/cache/flying-press/www.inspireusafoundation.org/Hdl1E3VxvwQ-hqdefault.jpg?w=300&h=200', // Person doing barbell squat
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [12, 15], rest: 60 },
      'Muscle Gain': { sets: [4, 5], reps: [6, 10], rest: 120 },
      'Endurance': { sets: [3, 4], reps: [15, 20], rest: 45 }
    }
  },
  {
    _id: 'legs_2',
    name: 'Lunges',
    muscleGroup: 'legs',
    difficulty: 'Beginner',
    description: 'Step forward, lower hips so both knees bend at 90 degrees. Push back to start. Repeat on other leg.',
    equipment: 'None',
    pairingScore: 7,
    ageGroup: '18-35',
    weightCategory: 'Light',
    goals: ['Weight Loss', 'Endurance'],
    exerciseType: 'compound',
    intensity: 'moderate',
    imageUrl: 'https://trainingstation.co.uk/cdn/shop/articles/Lunges-movment_d958998d-2a9f-430e-bdea-06f1e2bcc835_900x.webp?v=1741687877?w=300&h=200', // Person doing lunges
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [12, 15], rest: 45 },
      'Muscle Gain': { sets: [3, 4], reps: [10, 12], rest: 60 },
      'Endurance': { sets: [2, 3], reps: [15, 20], rest: 30 }
    }
  },
  {
    _id: 'legs_3',
    name: 'Romanian Deadlift',
    muscleGroup: 'legs',
    difficulty: 'Intermediate',
    description: 'Hold barbell, hinge at hips, lower bar to shins, return to standing.',
    equipment: 'Barbell',
    pairingScore: 8,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain'],
    exerciseType: 'compound',
    intensity: 'high',
    imageUrl: 'https://liftmanual.com/wp-content/uploads/2023/04/barbell-romanian-deadlift-from-deficit.jpg?w=300&h=200', // Person doing Romanian deadlift
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 12], rest: 75 },
      'Muscle Gain': { sets: [4, 5], reps: [6, 10], rest: 90 },
      'Endurance': { sets: [3, 4], reps: [12, 15], rest: 60 }
    }
  },
  {
    _id: 'legs_4',
    name: 'Leg Press',
    muscleGroup: 'legs',
    difficulty: 'Beginner',
    description: 'Sit in leg press machine, place feet on platform, push until legs are extended, return slowly.',
    equipment: 'Leg Press Machine',
    pairingScore: 8,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain', 'Weight Loss'],
    exerciseType: 'compound',
    intensity: 'moderate',
    imageUrl: 'https://static.strengthlevel.com/images/exercises/sled-leg-press/sled-leg-press-800.jpgw=300&h=200', // Person doing leg press
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [12, 15], rest: 45 },
      'Muscle Gain': { sets: [4, 5], reps: [6, 10], rest: 90 },
      'Endurance': { sets: [2, 3], reps: [15, 20], rest: 30 }
    }
  },
  {
    _id: 'legs_5',
    name: 'Bulgarian Split Squats',
    muscleGroup: 'legs',
    difficulty: 'Advanced',
    description: 'Place one foot on a bench behind you. Lower your body by bending the front knee to 90 degrees, then push back up.',
    equipment: 'Bench',
    pairingScore: 8,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Endurance'],
    exerciseType: 'compound',
    intensity: 'high',
    imageUrl: 'https://www.burnthefatinnercircle.com/members/images/1224.jpg?cb=20250102040457?w=300&h=200', // Person doing Bulgarian split squats
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 12], rest: 60 },
      'Muscle Gain': { sets: [4, 5], reps: [6, 10], rest: 90 },
      'Endurance': { sets: [3, 4], reps: [12, 15], rest: 45 }
    }
  },
  {
    _id: 'legs_6',
    name: 'Goblet Squat',
    muscleGroup: 'legs',
    difficulty: 'Beginner',
    description: 'Hold a dumbbell close to your chest. Squat down until thighs are parallel to the floor, then stand back up.',
    equipment: 'Dumbbell',
    pairingScore: 7,
    ageGroup: '18-35',
    weightCategory: 'Light',
    goals: ['Weight Loss', 'Endurance'],
    exerciseType: 'compound',
    intensity: 'moderate',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0268/4682/2569/files/goblet_squat_with_kettlebells_600x600.webp?v=1725739147?w=300&h=200', // Person doing goblet squat
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [12, 15], rest: 45 },
      'Muscle Gain': { sets: [3, 4], reps: [10, 12], rest: 60 },
      'Endurance': { sets: [2, 3], reps: [15, 20], rest: 30 }
    }
  },
  // Biceps (6 exercises)
  {
    _id: 'biceps_1',
    name: 'Dumbbell Curls',
    muscleGroup: 'biceps',
    difficulty: 'Beginner',
    description: 'Hold dumbbells, curl weights to shoulders, lower slowly.',
    equipment: 'Dumbbells',
    pairingScore: 6,
    ageGroup: '18-35',
    weightCategory: 'Light',
    goals: ['Muscle Gain'],
    exerciseType: 'isolation',
    intensity: 'low',
    imageUrl: 'https://www.endomondo.com/wp-content/uploads/2024/07/dumbbell-biceps-curl-guide.png?w=300&h=200', // Person doing dumbbell curls
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [12, 15], rest: 30 },
      'Muscle Gain': { sets: [3, 4], reps: [8, 12], rest: 45 },
      'Endurance': { sets: [2, 3], reps: [15, 20], rest: 20 }
    }
  },
  {
    _id: 'biceps_2',
    name: 'Hammer Curls',
    muscleGroup: 'biceps',
    difficulty: 'Beginner',
    description: 'Hold dumbbells with neutral grip, curl toward shoulders, lower slowly.',
    equipment: 'Dumbbells',
    pairingScore: 6,
    ageGroup: '18-35',
    weightCategory: 'Light',
    goals: ['Muscle Gain'],
    exerciseType: 'isolation',
    intensity: 'low',
    imageUrl: 'https://i.pinimg.com/736x/f4/a8/57/f4a85746cf9b01be7c8216869e3656e1.jpg?w=300&h=200', // Person doing hammer curls
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [12, 15], rest: 30 },
      'Muscle Gain': { sets: [3, 4], reps: [8, 12], rest: 45 },
      'Endurance': { sets: [2, 3], reps: [15, 20], rest: 20 }
    }
  },
  {
    _id: 'biceps_3',
    name: 'Chin-Ups',
    muscleGroup: 'biceps',
    difficulty: 'Advanced',
    description: 'Grip pull-up bar with underhand grip, pull body up until chin is over bar, lower down.',
    equipment: 'Pull-Up Bar',
    pairingScore: 9,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Endurance'],
    exerciseType: 'compound',
    intensity: 'high',
    imageUrl: 'https://kinxlearning.com/cdn/shop/files/shutterstock_418630567_1400x.jpg?v=1690650014?w=300&h=200', // Person doing chin-ups
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [6, 10], rest: 60 },
      'Muscle Gain': { sets: [4, 5], reps: [5, 8], rest: 90 },
      'Endurance': { sets: [3, 4], reps: [8, 12], rest: 45 }
    }
  },
  {
    _id: 'biceps_4',
    name: 'Concentration Curls',
    muscleGroup: 'biceps',
    difficulty: 'Intermediate',
    description: 'Sit, rest elbow on thigh, curl dumbbell to shoulder, lower slowly.',
    equipment: 'Dumbbell',
    pairingScore: 7,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain'],
    exerciseType: 'isolation',
    intensity: 'moderate',
    imageUrl: 'https://liftmanual.com/wp-content/uploads/2023/04/band-concentration-curl.jpg?w=300&h=200', // Person doing concentration curls
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 12], rest: 45 },
      'Muscle Gain': { sets: [3, 4], reps: [8, 12], rest: 60 },
      'Endurance': { sets: [2, 3], reps: [12, 15], rest: 30 }
    }
  },
  {
    _id: 'biceps_5',
    name: 'Barbell Curl',
    muscleGroup: 'biceps',
    difficulty: 'Intermediate',
    description: 'Hold barbell with underhand grip, curl to shoulders, lower slowly.',
    equipment: 'Barbell',
    pairingScore: 8,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain'],
    exerciseType: 'isolation',
    intensity: 'moderate',
    imageUrl: 'https://liftmanual.com/wp-content/uploads/2023/04/ez-barbell-curl.jpg?w=300&h=200', // Person doing barbell curl
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 12], rest: 45 },
      'Muscle Gain': { sets: [3, 4], reps: [8, 12], rest: 60 },
      'Endurance': { sets: [2, 3], reps: [12, 15], rest: 30 }
    }
  },
  {
    _id: 'biceps_6',
    name: 'Preacher Curl',
    muscleGroup: 'biceps',
    difficulty: 'Intermediate',
    description: 'Sit at preacher bench, curl EZ bar or dumbbells, lower slowly.',
    equipment: 'Preacher Bench, EZ Bar',
    pairingScore: 7,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain'],
    exerciseType: 'isolation',
    intensity: 'moderate',
    imageUrl: 'https://www.kettlebellkings.com/cdn/shop/articles/Preacher_Curl_Alternatives.png?v=1731324163?w=300&h=200', // Person doing preacher curl
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 12], rest: 45 },
      'Muscle Gain': { sets: [3, 4], reps: [8, 12], rest: 60 },
      'Endurance': { sets: [2, 3], reps: [12, 15], rest: 30 }
    }
  },
  // Triceps (6 exercises)
  {
    _id: 'triceps_1',
    name: 'Tricep Dips',
    muscleGroup: 'triceps',
    difficulty: 'Intermediate',
    description: 'Grip parallel bars, lower body until elbows are at 90 degrees, push up.',
    equipment: 'Dip Station',
    pairingScore: 7,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain', 'Endurance'],
    exerciseType: 'compound',
    intensity: 'moderate',
    imageUrl: 'https://cdn.shopify.com/s/files/1/1497/9682/files/Benefits_of_Mastering_Tricep_Dips.jpg?v=1687254157&width=750?w=300&h=200', // Person doing tricep dips
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 12], rest: 45 },
      'Muscle Gain': { sets: [3, 4], reps: [6, 10], rest: 60 },
      'Endurance': { sets: [2, 3], reps: [12, 15], rest: 30 }
    }
  },
  {
    _id: 'triceps_2',
    name: 'Overhead Tricep Extension',
    muscleGroup: 'triceps',
    difficulty: 'Beginner',
    description: 'Hold dumbbell overhead, lower behind head, extend arms back up.',
    equipment: 'Dumbbell',
    pairingScore: 6,
    ageGroup: '18-35',
    weightCategory: 'Light',
    goals: ['Weight Loss'],
    exerciseType: 'isolation',
    intensity: 'low',
    imageUrl: 'https://sportivetricksstorage.blob.core.windows.net/images/articles/training/general/overhead-tricep-extension/1-main.webp?w=300&h=200', // Person doing overhead tricep extension
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [12, 15], rest: 30 },
      'Muscle Gain': { sets: [3, 4], reps: [8, 12], rest: 45 },
      'Endurance': { sets: [2, 3], reps: [15, 20], rest: 20 }
    }
  },
  {
    _id: 'triceps_3',
    name: 'Close-Grip Bench Press',
    muscleGroup: 'triceps',
    difficulty: 'Intermediate',
    description: 'Lie on bench, grip barbell narrowly, press up, lower to chest.',
    equipment: 'Barbell, Bench',
    pairingScore: 8,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain'],
    exerciseType: 'compound',
    intensity: 'high',
    imageUrl: 'https://static.strengthlevel.com/images/exercises/close-grip-bench-press/howto/close-grip-bench-press-howto-2-800.jpg?w=300&h=200', // Person doing close-grip bench press
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 12], rest: 60 },
      'Muscle Gain': { sets: [4, 5], reps: [6, 10], rest: 90 },
      'Endurance': { sets: [2, 3], reps: [12, 15], rest: 45 }
    }
  },
  {
    _id: 'triceps_4',
    name: 'Tricep Pushdown',
    muscleGroup: 'triceps',
    difficulty: 'Beginner',
    description: 'Stand at cable machine, push bar down, extend arms, return slowly.',
    equipment: 'Cable Machine',
    pairingScore: 7,
    ageGroup: '18-35',
    weightCategory: 'Light',
    goals: ['Weight Loss', 'Endurance'],
    exerciseType: 'isolation',
    intensity: 'moderate',
    imageUrl: 'https://static.strengthlevel.com/images/exercises/tricep-rope-pushdown/tricep-rope-pushdown-800.jpg?w=300&h=200', // Person doing tricep pushdown
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [12, 15], rest: 45 },
      'Muscle Gain': { sets: [3, 4], reps: [8, 12], rest: 75 },
      'Endurance': { sets: [2, 3], reps: [15, 20], rest: 30 }
    }
  },
  {
    _id: 'triceps_5',
    name: 'Skull Crushers',
    muscleGroup: 'triceps',
    difficulty: 'Intermediate',
    description: 'Lie on bench, lower EZ bar toward forehead, extend arms back up.',
    equipment: 'EZ Bar, Bench',
    pairingScore: 7,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain'],
    exerciseType: 'isolation',
    intensity: 'moderate',
    imageUrl: 'https://anabolicaliens.com/cdn/shop/articles/5f13429eb890e6c107286be3_barbell-skull-crusher-anabolic-aliens-p-500.png?v=1644918985?w=300&h=200', // Person doing skull crushers
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 12], rest: 45 },
      'Muscle Gain': { sets: [3, 4], reps: [8, 12], rest: 60 },
      'Endurance': { sets: [2, 3], reps: [12, 15], rest: 30 }
    }
  },
  {
    _id: 'triceps_6',
    name: 'Diamond Push-Ups',
    muscleGroup: 'triceps',
    difficulty: 'Advanced',
    description: 'Form diamond with hands, lower body in push-up, push back up.',
    equipment: 'None',
    pairingScore: 7,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Endurance'],
    exerciseType: 'compound',
    intensity: 'high',
    imageUrl: 'https://cdn.shopify.com/s/files/1/1497/9682/files/1.What_Are_Diamond_Push-Ups_How_to_Do_It.jpg?v=1673013889?w=300&h=200', // Person doing diamond push-ups
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 12], rest: 60 },
      'Muscle Gain': { sets: [4, 5], reps: [6, 10], rest: 90 },
      'Endurance': { sets: [3, 4], reps: [12, 15], rest: 45 }
    }
  },
  // Back (6 exercises)
  {
    _id: 'back_1',
    name: 'Pull-Ups',
    muscleGroup: 'back',
    difficulty: 'Advanced',
    description: 'Grip pull-up bar, pull body up until chin is over bar, lower down.',
    equipment: 'Pull-Up Bar',
    pairingScore: 9,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain', 'Endurance'],
    exerciseType: 'compound',
    intensity: 'high',
    imageUrl: 'https://anabolicaliens.com/cdn/shop/articles/199990_400x.png?v=1645089103?w=300&h=200', // Person doing pull-ups
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [6, 10], rest: 90 },
      'Muscle Gain': { sets: [4, 5], reps: [5, 8], rest: 120 },
      'Endurance': { sets: [3, 4], reps: [8, 12], rest: 60 }
    }
  },
  {
    _id: 'back_2',
    name: 'Bent-Over Rows',
    muscleGroup: 'back',
    difficulty: 'Intermediate',
    description: 'Bend at hips, pull barbell to lower chest, lower back down.',
    equipment: 'Barbell',
    pairingScore: 8,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain'],
    exerciseType: 'compound',
    intensity: 'moderate',
    imageUrl: 'https://liftmanual.com/wp-content/uploads/2023/04/dumbbell-bent-over-row.jpg?w=300&h=200', // Person doing bent-over rows
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 12], rest: 60 },
      'Muscle Gain': { sets: [4, 5], reps: [6, 10], rest: 90 },
      'Endurance': { sets: [2, 3], reps: [12, 15], rest: 45 }
    }
  },
  {
    _id: 'back_3',
    name: 'Lat Pulldown',
    muscleGroup: 'back',
    difficulty: 'Beginner',
    description: 'Sit at machine, pull bar to chest, return slowly.',
    equipment: 'Lat Pulldown Machine',
    pairingScore: 7,
    ageGroup: '18-35',
    weightCategory: 'Light',
    goals: ['Weight Loss', 'Endurance'],
    exerciseType: 'isolation',
    intensity: 'moderate',
    imageUrl: 'https://anabolicaliens.com/cdn/shop/articles/5f19b4eff633a10684ef6193_wide-grip-lat-pulldown-anabolic-aliens.png?v=1644918521?w=300&h=200', // Person doing lat pulldown
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [12, 15], rest: 45 },
      'Muscle Gain': { sets: [3, 4], reps: [8, 12], rest: 75 },
      'Endurance': { sets: [2, 3], reps: [15, 20], rest: 30 }
    }
  },
  {
    _id: 'back_4',
    name: 'Deadlifts',
    muscleGroup: 'back',
    difficulty: 'Intermediate',
    description: 'Stand over barbell, lift to hips, lower to ground.',
    equipment: 'Barbell',
    pairingScore: 10,
    ageGroup: '18-35',
    weightCategory: 'Heavy',
    goals: ['Muscle Gain'],
    exerciseType: 'compound',
    intensity: 'high',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXDkThIy4oVo55s-nv_f1cqaHLUAMZMXGdtg&s?w=300&h=200', // Person doing deadlifts
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [8, 10], rest: 90 },
      'Muscle Gain': { sets: [4, 5], reps: [5, 8], rest: 120 },
      'Endurance': { sets: [2, 3], reps: [10, 12], rest: 60 }
    }
  },
  {
    _id: 'back_5',
    name: 'Seated Cable Row',
    muscleGroup: 'back',
    difficulty: 'Intermediate',
    description: 'Sit at cable machine, pull handle to waist, return slowly.',
    equipment: 'Cable Machine',
    pairingScore: 7,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain'],
    exerciseType: 'compound',
    intensity: 'moderate',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4SRSxUB_ia2DIpIH8aCGN25gddzAVWzwxgA&s?w=300&h=200', // Person doing seated cable row
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 12], rest: 60 },
      'Muscle Gain': { sets: [4, 5], reps: [6, 10], rest: 90 },
      'Endurance': { sets: [2, 3], reps: [12, 15], rest: 45 }
    }
  },
  {
    _id: 'back_6',
    name: 'Single-Arm Dumbbell Row',
    muscleGroup: 'back',
    difficulty: 'Beginner',
    description: 'Place one knee on bench, row dumbbell with opposite hand, lower slowly.',
    equipment: 'Dumbbell, Bench',
    pairingScore: 7,
    ageGroup: '18-35',
    weightCategory: 'Light',
    goals: ['Weight Loss', 'Endurance'],
    exerciseType: 'compound',
    intensity: 'moderate',
    imageUrl: 'https://liftmanual.com/wp-content/uploads/2023/04/dumbbell-single-arm-bent-over-row.jpg?w=300&h=200', // Person doing single-arm dumbbell row
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [12, 15], rest: 45 },
      'Muscle Gain': { sets: [3, 4], reps: [8, 12], rest: 75 },
      'Endurance': { sets: [2, 3], reps: [15, 20], rest: 30 }
    }
  },
  // Core (6 exercises)
  {
    _id: 'core_1',
    name: 'Plank',
    muscleGroup: 'core',
    difficulty: 'Beginner',
    description: 'Lie face down, hold body in straight line on forearms, maintain position.',
    equipment: 'None',
    pairingScore: 5,
    ageGroup: '18-35',
    weightCategory: 'Light',
    goals: ['Weight Loss', 'Endurance'],
    exerciseType: 'isolation',
    intensity: 'low',
    imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/plank.gif?w=300&h=200', // Person doing plank
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [30, 60], rest: 30 },
      'Muscle Gain': { sets: [3, 4], reps: [45, 90], rest: 45 },
      'Endurance': { sets: [2, 3], reps: [60, 120], rest: 20 }
    }
  },
  {
    _id: 'core_2',
    name: 'Russian Twists',
    muscleGroup: 'core',
    difficulty: 'Intermediate',
    description: 'Sit with knees bent, twist torso side to side, keep core engaged.',
    equipment: 'None',
    pairingScore: 6,
    ageGroup: '18-35',
    weightCategory: 'Light',
    goals: ['Weight Loss'],
    exerciseType: 'isolation',
    intensity: 'moderate',
    imageUrl: 'https://liftmanual.com/wp-content/uploads/2023/04/russian-twist.jpg?w=300&h=200', // Person doing Russian twists
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [20, 30], rest: 30 },
      'Muscle Gain': { sets: [3, 4], reps: [15, 25], rest: 45 },
      'Endurance': { sets: [2, 3], reps: [25, 40], rest: 20 }
    }
  },
  {
    _id: 'core_3',
    name: 'Hanging Leg Raises',
    muscleGroup: 'core',
    difficulty: 'Advanced',
    description: 'Hang from pull-up bar, raise straight legs to parallel, lower slowly.',
    equipment: 'Pull-Up Bar',
    pairingScore: 8,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain'],
    exerciseType: 'isolation',
    intensity: 'high',
    imageUrl: 'https://liftmanual.com/wp-content/uploads/2023/04/hanging-straight-leg-raise.jpg?w=300&h=200', // Person doing hanging leg raises
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 15], rest: 45 },
      'Muscle Gain': { sets: [3, 4], reps: [8, 12], rest: 60 },
      'Endurance': { sets: [2, 3], reps: [15, 20], rest: 30 }
    }
  },
  {
    _id: 'core_4',
    name: 'Bicycle Crunches',
    muscleGroup: 'core',
    difficulty: 'Beginner',
    description: 'Lie on back, alternate elbow to opposite knee in pedaling motion.',
    equipment: 'None',
    pairingScore: 6,
    ageGroup: '18-35',
    weightCategory: 'Light',
    goals: ['Weight Loss', 'Endurance'],
    exerciseType: 'isolation',
    intensity: 'moderate',
    imageUrl: 'https://static.strengthlevel.com/images/exercises/bicycle-crunch/bicycle-crunch-800.jpg?w=300&h=200', // Person doing bicycle crunches
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [20, 30], rest: 30 },
      'Muscle Gain': { sets: [3, 4], reps: [15, 25], rest: 45 },
      'Endurance': { sets: [2, 3], reps: [25, 40], rest: 20 }
    }
  },
  {
    _id: 'core_5',
    name: 'Mountain Climbers',
    muscleGroup: 'core',
    difficulty: 'Intermediate',
    description: 'Start in plank, rapidly alternate bringing knees to chest.',
    equipment: 'None',
    pairingScore: 7,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Weight Loss', 'Endurance'],
    exerciseType: 'compound',
    intensity: 'high',
    imageUrl: 'https://static.strengthlevel.com/images/exercises/mountain-climbers/mountain-climbers-800.jpg?w=300&h=200', // Person doing mountain climbers
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [20, 30], rest: 30 },
      'Muscle Gain': { sets: [3, 4], reps: [15, 25], rest: 45 },
      'Endurance': { sets: [2, 3], reps: [25, 40], rest: 20 }
    }
  },
  {
    _id: 'core_6',
    name: 'Ab Rollout',
    muscleGroup: 'core',
    difficulty: 'Advanced',
    description: 'Kneel, roll wheel forward extending body, pull back using core.',
    equipment: 'Ab Wheel',
    pairingScore: 8,
    ageGroup: '18-35',
    weightCategory: 'Medium',
    goals: ['Muscle Gain'],
    exerciseType: 'isolation',
    intensity: 'high',
    imageUrl: 'https://static.strengthlevel.com/images/exercises/ab-wheel-rollout/ab-wheel-rollout-800.jpg?w=300&h=200', // Person doing ab rollout
    trainingVolume: {
      'Weight Loss': { sets: [3, 4], reps: [10, 15], rest: 45 },
      'Muscle Gain': { sets: [3, 4], reps: [8, 12], rest: 60 },
      'Endurance': { sets: [2, 3], reps: [15, 20], rest: 30 }
    }
  }
];

// Connect to MongoDB and seed the database
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await Exercise.deleteMany({});
    await Exercise.insertMany(exercises);
    console.log('Exercises seeded successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.connection.close();
  });