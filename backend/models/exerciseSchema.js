const mongoose = require('mongoose');

const trainingVolumeSchema = new mongoose.Schema({
  sets: { type: [Number], required: true, min: 1 },
  reps: { type: [Number], required: true, min: 1 },
  rest: { type: Number, required: true, min: 0 }
});

const exerciseSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  muscleGroup: {
    type: String,
    required: true,
    enum: ['chest', 'shoulders', 'legs', 'biceps', 'triceps', 'back', 'core']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  description: { type: String, required: true },
  equipment: { type: String, required: true },
  pairingScore: { type: Number, required: true, min: 0, max: 10 },
  ageGroup: {
    type: String,
    required: true,
    enum: ['18-35', '36-55', '56+']
  },
  weightCategory: {
    type: String,
    required: true,
    enum: ['Light', 'Medium', 'Heavy']
  },
  goals: [{
    type: String,
    required: true,
    enum: ['Weight Loss', 'Muscle Gain', 'Endurance']
  }],
  exerciseType: {
    type: String,
    required: true,
    enum: ['compound', 'isolation']
  },
  intensity: {
    type: String,
    required: true,
    enum: ['low', 'moderate', 'high']
  },
  trainingVolume: {
    type: {
      'Weight Loss': { type: trainingVolumeSchema, required: true },
      'Muscle Gain': { type: trainingVolumeSchema, required: true },
      'Endurance': { type: trainingVolumeSchema, required: true }
    },
    required: true
  }
});

module.exports = mongoose.model('Exercise', exerciseSchema);