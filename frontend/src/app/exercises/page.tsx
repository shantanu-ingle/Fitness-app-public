'use client';
import React, { useState, useEffect } from 'react';
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
}

const getDifficultyStyle = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return {
        backgroundColor: '#dcfce7',
        color: '#15803d',
        border: '1px solid #bbf7d0'
      };
    case 'Intermediate':
      return {
        backgroundColor: '#fef3c7',
        color: '#d97706',
        border: '1px solid #fde68a'
      };
    case 'Advanced':
      return {
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        border: '1px solid #fecaca'
      };
    default:
      return {};
  }
};

export default function Exercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/exercises', {
          params: { difficulty: selectedLevel === 'All' ? undefined : selectedLevel }
        });
        setExercises(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exercises:', error);
        setLoading(false);
      }
    };
    fetchExercises();
  }, [selectedLevel]);

  const groupedExercises = exercises.reduce((acc, ex) => {
    acc[ex.muscleGroup] = acc[ex.muscleGroup] || [];
    acc[ex.muscleGroup].push(ex);
    return acc;
  }, {} as Record<string, Exercise[]>);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #f3e8ff 100%)',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const mainContainerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px'
  };

  const titleStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '48px'
  };

  const mainTitleStyle: React.CSSProperties = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '16px',
    background: 'linear-gradient(135deg, #2563eb, #9333ea, #4f46e5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    color: '#6b7280',
    maxWidth: '32rem',
    margin: '0 auto'
  };

  const filterContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '40px'
  };

  const filterBoxStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '16px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  };

  const selectStyle: React.CSSProperties = {
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    backgroundColor: 'white',
    color: '#1f2937',
    outline: 'none',
    cursor: 'pointer',
    minWidth: '200px',
    fontSize: '14px'
  };

  const sectionTitleStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '32px'
  };

  const gradientLineStyle: React.CSSProperties = {
    height: '4px',
    background: 'linear-gradient(90deg, #3b82f6, #9333ea)',
    borderRadius: '2px',
    flex: 1
  };

  const sectionTextStyle: React.CSSProperties = {
    padding: '0 24px',
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#1f2937',
    backgroundColor: 'white',
    borderRadius: '20px'
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '48px'
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
    transform: isExpanded ? 'scale(1.02)' : 'scale(1)'
  });

  const cardContentStyle: React.CSSProperties = {
    padding: '20px'
  };

  const cardHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px'
  };

  const exerciseNameStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginRight: '8px',
    flex: 1
  };

  const difficultyBadgeStyle = (difficulty: string): React.CSSProperties => ({
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    ...getDifficultyStyle(difficulty)
  });

  const exerciseContentStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const imageStyle: React.CSSProperties = {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '12px',
    border: '2px solid #e5e7eb'
  };

  const infoStyle: React.CSSProperties = {
    flex: 1
  };

  const clickTextStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '8px'
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

  const instructionsStyle: React.CSSProperties = {
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #e5e7eb',
    animation: 'slideIn 0.3s ease-out'
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
    marginRight: '8px'
  };

  const stepStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '8px'
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
    lineHeight: '1.5'
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={mainContainerStyle}>
          <div style={titleStyle}>
            <h1 style={mainTitleStyle}>Exercise Library</h1>
            <p style={subtitleStyle}>Loading exercises...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={mainContainerStyle}>
        <div style={titleStyle}>
          <h1 style={mainTitleStyle}>
            Exercise Library
          </h1>
          <p style={subtitleStyle}>
            Discover exercises organized by body part and difficulty level. Click on any exercise to view detailed instructions.
          </p>
        </div>

        <div style={filterContainerStyle}>
          <div style={filterBoxStyle}>
            <label htmlFor="level" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              Filter by Difficulty
            </label>
            <select
              id="level"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              style={selectStyle}
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {Object.entries(groupedExercises).map(([muscleGroup, exList]) => (
          exList.length > 0 && (
            <div key={muscleGroup}>
              <div style={sectionTitleStyle}>
                <div style={gradientLineStyle}></div>
                <h2 style={sectionTextStyle}>
                  {muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1)}
                </h2>
                <div style={gradientLineStyle}></div>
              </div>
              
              <div style={gridStyle}>
                {exList.map((ex) => (
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
                        <h3 style={exerciseNameStyle}>
                          {ex.name}
                        </h3>
                        <span style={difficultyBadgeStyle(ex.difficulty)}>
                          {ex.difficulty}
                        </span>
                      </div>
                      
                      <div style={exerciseContentStyle}>
                        <Image
                          src={`https://picsum.photos/200/300?random=${ex._id}`}
                          alt={ex.name}
                          width={80}
                          height={80}
                          style={imageStyle}
                        />
                        <div style={infoStyle}>
                          <p style={clickTextStyle}>
                            Click to {expandedIds.has(ex._id) ? 'hide' : 'view'} instructions
                          </p>
                          <div style={progressBarStyle}>
                            <div style={getProgressFillStyle(expandedIds.has(ex._id))}></div>
                          </div>
                        </div>
                      </div>

                      {expandedIds.has(ex._id) && (
                        <div style={instructionsStyle}>
                          <h4 style={instructionsTitleStyle}>
                            <span style={bulletStyle}></span>
                            Instructions
                          </h4>
                          <div>
                            {ex.description.split('. ').map((step, index) => (
                              step && (
                                <div key={index} style={stepStyle}>
                                  <span style={stepNumberStyle}>
                                    {index + 1}
                                  </span>
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
            </div>
          )
        ))}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}