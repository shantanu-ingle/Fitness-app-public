'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Exercise {
  _id: string;
  name: string;
  muscleGroup: string;
  difficulty: string;
  description: string;
  equipment: string;
  pairingScore: number;
  ageGroup: string;
  weightCategory: string;
  goals: string[];
  exerciseType: 'compound' | 'isolation';
  intensity: 'low' | 'moderate' | 'high';
  trainingVolume: { [key: string]: { sets: number[]; reps: number[]; rest: number } };
}

interface WorkoutDay {
  day: number;
  muscles: string[];
  exercises: Exercise[];
  isRest: boolean;
}

type Goal = 'Weight Loss' | 'Muscle Gain' | 'Endurance';
type SplitType = '1 Muscle Per Day' | '2 Muscles Per Day';

// Training splits with Day 7 as rest day
const trainingSplits: { [key in SplitType]: { 7: { muscles: string[]; day: number; isRest?: boolean }[] } } = {
  '1 Muscle Per Day': {
    7: [
      { muscles: ['chest'], day: 1 },
      { muscles: ['back'], day: 2 },
      { muscles: ['legs'], day: 3 },
      { muscles: ['shoulders'], day: 4 },
      { muscles: ['biceps'], day: 5 },
      { muscles: ['triceps'], day: 6 },
      { muscles: [], day: 7, isRest: true }
    ]
  },
  '2 Muscles Per Day': {
    7: [
      { muscles: ['chest', 'triceps'], day: 1 },
      { muscles: ['back', 'biceps'], day: 2 },
      { muscles: ['legs', 'core'], day: 3 },
      { muscles: ['shoulders', 'chest'], day: 4 },
      { muscles: ['back', 'triceps'], day: 5 },
      { muscles: ['legs', 'biceps'], day: 6 },
      { muscles: [], day: 7, isRest: true }
    ]
  }
};

export default function SmartFitnessPlanner() {
  const [age, setAge] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<string>('Beginner');
  const [goal, setGoal] = useState<Goal>('Weight Loss');
  const [splitType, setSplitType] = useState<SplitType>('1 Muscle Per Day');
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const generateWorkoutPlan = async () => {
    if (age <= 0 || weight <= 0) {
      setError('Please enter a valid age and weight.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Fetching exercises for planner:', { difficulty, goal });
      const response = await axios.get('http://localhost:5000/api/exercises', {
        params: {
          goals: goal,
          ...(difficulty !== 'Advanced' ? { difficulty } : {})
        }
      });
      console.log('API response:', response.data);
      const filteredExercises: Exercise[] = response.data;

      if (!filteredExercises || filteredExercises.length === 0) {
        setError('No exercises found for the selected criteria.');
        setLoading(false);
        return;
      }

      const groupedExercises = filteredExercises.reduce((acc: Record<string, Exercise[]>, ex: Exercise) => {
        acc[ex.muscleGroup] = acc[ex.muscleGroup] || [];
        acc[ex.muscleGroup].push(ex);
        return acc;
      }, {});
      console.log('Grouped exercises:', groupedExercises);

      const split = trainingSplits[splitType][7];
      const difficultyOrder: Record<string, number> = {
        Advanced: 3,
        Intermediate: 2,
        Beginner: 1
      };

      const plan: WorkoutDay[] = split.map(({ muscles, day, isRest }) => {
        if (isRest) return { day, muscles: [], exercises: [], isRest: true };

        const dayExercises: Exercise[] = [];
        const usedExerciseIds = new Set<string>(); // Reset for each day

        muscles.forEach(muscle => {
          const muscleExercises = (groupedExercises[muscle] || []).filter(ex => !usedExerciseIds.has(ex._id));
          if (muscleExercises.length > 0) {
            muscleExercises.sort((a, b) => {
              if (difficulty === 'Advanced' && a.difficulty !== b.difficulty) {
                return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
              }
              if (a.exerciseType === 'compound' && b.exerciseType === 'isolation') return -1;
              if (a.exerciseType === 'isolation' && b.exerciseType === 'compound') return 1;
              return b.pairingScore - a.pairingScore;
            });

            const exercisesPerMuscle = muscles.length === 1 ? 4 : 3;
            const selected = muscleExercises.slice(0, exercisesPerMuscle);
            selected.forEach(ex => usedExerciseIds.add(ex._id));
            dayExercises.push(...selected);
          }
        });

        return { day, muscles, exercises: dayExercises, isRest: false };
      });

      console.log('Generated plan:', plan);
      setWorkoutPlan(plan);
      setLoading(false);
    } catch (error) {
      console.error('Error generating workout plan:', error);
      setError('Failed to generate workout plan. Please check the backend server.');
      setLoading(false);
    }
  };

  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return { backgroundColor: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0' };
      case 'Intermediate':
        return { backgroundColor: '#fef3c7', color: '#d97706', border: '1px solid #fde68a' };
      case 'Advanced':
        return { backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca' };
      default:
        return {};
    }
  };

  const getGoalStyle = (goal: string) => {
    switch (goal) {
      case 'Weight Loss':
        return { backgroundColor: '#fef3c7', color: '#d97706' };
      case 'Muscle Gain':
        return { backgroundColor: '#dcfce7', color: '#15803d' };
      case 'Endurance':
        return { backgroundColor: '#e0f2fe', color: '#0369a1' };
      default:
        return {};
    }
  };

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #f3e8ff 100%)',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '16px',
    boxSizing: 'border-box'
  };

  const mainContainerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 8px',
    boxSizing: 'border-box'
  };

  const titleStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '48px'
  };

  const mainTitleStyle: React.CSSProperties = {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 'bold',
    marginBottom: '16px',
    background: 'linear-gradient(135deg, #2563eb, #9333ea, #4f46e5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
    color: '#6b7280',
    maxWidth: '40rem',
    margin: '0 auto',
    padding: '0 16px'
  };

  const filterContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '40px',
    width: '100%'
  };

  const filterBoxStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: 'clamp(16px, 2vw, 24px)',
    borderRadius: '16px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    width: '100%',
    maxWidth: '600px',
    boxSizing: 'border-box'
  };

  const formFieldStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: 'clamp(12px, 1.5vw, 10px)',
    width: '100%',
    alignItems: 'stretch'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
    fontWeight: '600',
    color: '#374151',
    textAlign: 'left',
    
  };

  const inputStyle: React.CSSProperties = {
    padding: 'clamp(8px, 1vw, 12px) clamp(12px, 1.5vw, 16px)',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    backgroundColor: 'white',
    color: '#1f2937',
    outline: 'none',
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    width: '100%',
    boxSizing: 'border-box',
    height: 'clamp(36px, 4vw, 40px)'
  };

  const selectStyle: React.CSSProperties = {
    padding: 'clamp(8px, 1vw, 1px) clamp(12px, 1.5vw, 16px)',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    backgroundColor: 'white',
    color: '#1f2937',
    outline: 'none',
    cursor: 'pointer',
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    width: '100%',
    boxSizing: 'border-box',
    height: 'clamp(36px, 4vw, 40px)'
  };

  const buttonStyle: React.CSSProperties = {
    padding: 'clamp(12px, 1.5vw, 16px) clamp(24px, 3vw, 32px)',
    borderRadius: '12px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: 'clamp(14px, 1.5vw, 16px)',
    fontWeight: '600',
    width: '100%',
    marginTop: '16px',
    boxSizing: 'border-box',
    height: 'clamp(40px, 5vw, 48px)'
  };

  const sectionTitleStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '32px',
    marginTop: '48px',
    width: '100%'
  };

  const gradientLineStyle: React.CSSProperties = {
    height: '4px',
    background: 'linear-gradient(90deg, #3b82f6, #9333ea)',
    borderRadius: '2px',
    flex: 1,
    minWidth: '20px'
  };

  const sectionTextStyle: React.CSSProperties = {
    padding: '0 24px',
    fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
    fontWeight: 'bold',
    color: '#1f2937',
    backgroundColor: 'white',
    borderRadius: '20px',
    whiteSpace: 'nowrap'
  };

  const dayHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    marginTop: '32px',
    width: '100%'
  };

  const dayTitleStyle: React.CSSProperties = {
    padding: '12px 24px',
    fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
    fontWeight: 'bold',
    color: '#1f2937',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '2px solid #e5e7eb'
  };

  const muscleTagsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    width: '100%'
  };

  const muscleTagStyle: React.CSSProperties = {
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '600',
    backgroundColor: '#dbeafe',
    color: '#2563eb',
    textTransform: 'capitalize'
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
    width: '100%'
  };

  const getCardStyle = (isExpanded: boolean): React.CSSProperties => ({
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: isExpanded 
      ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
      : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    overflow: 'hidden',
    border: isExpanded ? '2px solid #3b82f6' : '2px solid transparent',
    transform: isExpanded ? 'scale(1.02)' : 'scale(1)',
    width: '100%',
    boxSizing: 'border-box'
  });

  const cardContentStyle: React.CSSProperties = {
    padding: '20px',
    boxSizing: 'border-box'
  };

  const cardHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
    flexWrap: 'wrap',
    gap: '8px'
  };

  const exerciseNameStyle: React.CSSProperties = {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    fontWeight: 'bold',
    color: '#1f2937',
    marginRight: '8px',
    flex: '1 1 auto',
    minWidth: '0',
    wordWrap: 'break-word'
  };

  const badgeStyle = (type: string): React.CSSProperties => ({
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    marginLeft: '4px',
    flexShrink: 0,
    ...(type === 'difficulty' ? getDifficultyStyle(difficulty) : getGoalStyle(goal))
  });

  const exerciseInfoStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '80px 1fr',
    gap: '16px',
    alignItems: 'center',
    marginBottom: '16px',
    width: '100%'
  };

  const imageStyle: React.CSSProperties = {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '12px',
    border: '2px solid #e5e7eb',
    flexShrink: 0
  };

  const infoContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minWidth: '0'
  };

  const trainingVolumeStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '0.875rem',
    color: '#374151',
    fontWeight: '600'
  };

  const instructionsStyle: React.CSSProperties = {
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #e5e7eb',
    animation: 'slideIn 0.3s ease-out',
    width: '100%',
    boxSizing: 'border-box'
  };

  const instructionsTitleStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center'
  };

  const bulletStyle: React.CSSProperties = {
    width: '8px',
    height: '8px',
    backgroundColor: '#3b82f6',
    borderRadius: '50%',
    marginRight: '8px',
    flexShrink: 0
  };

  const stepStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '8px',
    width: '100%'
  };

  const stepNumberStyle: React.CSSProperties = {
    width: '24px',
    height: '24px',
    backgroundColor: '#dbeafe',
    color: '#2563eb',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: '600',
    flexShrink: 0
  };

  const stepTextStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: '#374151',
    lineHeight: '1.5',
    flex: 1,
    minWidth: '0',
    wordWrap: 'break-word'
  };
  const progressBarStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    height: '4px',
    overflow: 'hidden'
  };
    const getProgressFillStyle = (isExpanded: boolean): React.CSSProperties => ({
      height: '100%',
      borderRadius: '4px',
      transition: 'all 0.3s ease',
      width: isExpanded ? '100%' : '0%',
      backgroundColor: isExpanded ? '#3b82f6' : '#9ca3af'
    });

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={mainContainerStyle}>
          <div style={titleStyle}>
            <h1 style={mainTitleStyle}>Fitness Planner</h1>
            <p style={subtitleStyle}>Generating your workout plan...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={mainContainerStyle}>
          <div style={titleStyle}>
            <h1 style={mainTitleStyle}>Fitness Planner</h1>
            <p style={subtitleStyle}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={mainContainerStyle}>
        <div style={titleStyle}>
          <h1 style={mainTitleStyle}>Fitness Planner</h1>
          <p style={subtitleStyle}>Enter your details to generate a personalized 7-day workout plan with one rest day.</p>
        </div>

        <div style={filterContainerStyle}>
          <div style={filterBoxStyle}>
            <div style={formFieldStyle}>
              <label htmlFor="age" style={labelStyle}>Age</label>
              <input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                placeholder="Enter your age"
                style={inputStyle}
              />
            </div>
            <div style={formFieldStyle}>
              <label htmlFor="weight" style={labelStyle}>Weight (kg)</label>
              <input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                placeholder="Enter your weight"
                style={inputStyle}
              />
            </div>
            <div style={formFieldStyle}>
              <label htmlFor="difficulty" style={labelStyle}>Difficulty</label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                style={selectStyle}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div style={formFieldStyle}>
              <label htmlFor="goal" style={labelStyle}>Goal</label>
              <select
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value as Goal)}
                style={selectStyle}
              >
                <option value="Weight Loss">Weight Loss</option>
                <option value="Muscle Gain">Muscle Gain</option>
                <option value="Endurance">Endurance</option>
              </select>
            </div>
            <div style={formFieldStyle}>
              <label htmlFor="splitType" style={labelStyle}>Split Type</label>
              <select
                id="splitType"
                value={splitType}
                onChange={(e) => setSplitType(e.target.value as SplitType)}
                style={selectStyle}
              >
                <option value="1 Muscle Per Day">1 Muscle Per Day</option>
                <option value="2 Muscles Per Day">2 Muscles Per Day</option>
              </select>
            </div>
            <button
              onClick={generateWorkoutPlan}
              style={buttonStyle}
              disabled={loading}
            >
              Generate Plan
            </button>
          </div>
        </div>

        {workoutPlan.length > 0 && (
          <div>
            <div style={sectionTitleStyle}>
              <div style={gradientLineStyle}></div>
              <h2 style={sectionTextStyle}>Your 7-Day Workout Plan</h2>
              <div style={gradientLineStyle}></div>
            </div>
            {workoutPlan.map((day) => (
              <div key={day.day}>
                <div style={dayHeaderStyle}>
                  <div style={dayTitleStyle}>
                    {day.isRest ? 'Day 7 (Rest)' : `Day ${day.day}`}
                  </div>
                </div>
                {!day.isRest ? (
                  <>
                    <div style={muscleTagsStyle}>
                      {day.muscles.map((muscle) => (
                        <div key={muscle} style={muscleTagStyle}>{muscle}</div>
                      ))}
                    </div>
                    <div style={gridStyle}>
                      {day.exercises.map((ex) => (
                        <div
                          key={ex._id}
                          style={getCardStyle(expandedIds.has(ex._id))}
                          onClick={() => {
                            setExpandedIds((prev) => {
                              const newSet = new Set(prev);
                              if (newSet.has(ex._id)) {
                                newSet.delete(ex._id);
                              } else {
                                newSet.add(ex._id);
                              }
                              return newSet;
                            });
                          }}
                        >
                          <div style={cardContentStyle}>
                            <div style={cardHeaderStyle}>
                              <h4 style={exerciseNameStyle}>{ex.name}</h4>
                              <span style={badgeStyle('difficulty')}>{ex.difficulty}</span>
                              <span style={badgeStyle('goal')}>{goal}</span>
                            </div>
                            <div style={exerciseInfoStyle}>
                              <Image
                                src={`https://picsum.photos/80/80?random=${ex._id}`}
                                alt={ex.name}
                                width={80}
                                height={80}
                                style={imageStyle}
                              />
                              <div style={infoContainerStyle}>
                                <p style={{ fontSize: '0.875rem', color: '#374151' }}>
                                  Click to {expandedIds.has(ex._id) ? 'hide' : 'view'} instructions
                                </p>
                                <div style={progressBarStyle}>
                            <div style={getProgressFillStyle(expandedIds.has(ex._id))}></div>
                          </div>
                                <div style={trainingVolumeStyle}>
                                  <span>Sets: {ex.trainingVolume[goal].sets.join('-')}</span>
                                  <span>Reps: {ex.trainingVolume[goal].reps.join('-')}</span>
                                  <span>Rest: {ex.trainingVolume[goal].rest}s</span>
                                  
                                </div>
                                
                              </div>
                            </div>
                            {expandedIds.has(ex._id) && (
                              <div style={instructionsStyle}>
                                <h5 style={instructionsTitleStyle}>
                                  <span style={bulletStyle}></span>
                                  Instructions
                                </h5>
                                <div>
                                  {ex.description.split('. ').map((step, index) => (
                                    step && (
                                      <div key={index} style={stepStyle}>
                                        <span style={stepNumberStyle}>{index + 1}</span>
                                        <p style={stepTextStyle}>{step}</p>
                                      </div>
                                    )
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <p style={{ fontSize: '1rem', color: '#374151' }}>
                      Take a well-deserved rest day to recover!
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}