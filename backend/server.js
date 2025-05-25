const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Workout Schema (existing)
const workoutSchema = new mongoose.Schema({
  userId: String,
  goal: String,
  level: String,
  workouts: [{ day: String, exercises: [{ name: String, sets: Number, reps: Number }] }],
});
const Workout = mongoose.model('Workout', workoutSchema);

// Exercise Schema (new)
const Exercise = require('./models/exerciseSchema');

// Workout Endpoints (existing)
app.get('/api/workouts/:userId', async (req, res) => {
  const workouts = await Workout.findOne({ userId: req.params.userId });
  res.json(workouts);
});

app.post('/api/workouts', async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.json(workout);
});

// Exercise Endpoint (new)
app.get('/api/exercises', async (req, res) => {
  const { muscleGroup, difficulty, ageGroup, weightCategory } = req.query;
  const query = {};
  if (muscleGroup) query.muscleGroup = muscleGroup;
  if (difficulty) query.difficulty = difficulty;
  if (ageGroup) query.ageGroup = ageGroup;
  if (weightCategory) query.weightCategory = weightCategory;
  try {
    const exercises = await Exercise.find(query);
    res.json(exercises);
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));