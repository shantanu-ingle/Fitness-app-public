'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  // Container Styles (unchanged as requested)
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #f3e8ff 100%)',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '16px',
    boxSizing: 'border-box'
  };

  // Hero Section Styles
  const heroSectionStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '60px 20px',
    background: 'rgba(255, 255, 255, 0.8)', // Adjusted for contrast
    borderRadius: '16px',
    marginBottom: '40px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(0, 0, 0, 0.1)', // Darker border for light background
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
  };

  const heroTitleStyle: React.CSSProperties = {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 'bold',
    marginBottom: '0',
    background: 'linear-gradient(135deg, #2563eb, #9333ea, #4f46e5)', // Kept gradient for consistency
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const heroSubtitleStyle: React.CSSProperties = {
    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
    marginBottom: '0',
    color: '#4b5563', // Darker for readability
    maxWidth: '800px',
    lineHeight: '1.6',
  };

  const ctaButtonStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '16px 32px',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#1f2937', // Dark text for readability
    fontSize: '1.25rem',
    fontWeight: '600',
    borderRadius: '20px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(0, 0, 0, 0.1)', // Darker border
    backdropFilter: 'blur(5px)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    width: 'fit-content',
    maxWidth: '300px',
    textAlign: 'center',
  };

  // Info Section Styles
  const infoSectionStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
    marginBottom: '40px',
  };

  const infoCardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.9)', // Slightly darker for contrast
    borderRadius: '16px',
    padding: '30px',
    textAlign: 'center',
    border: '1px solid rgba(0, 0, 0, 0.1)', // Darker border
    backdropFilter: 'blur(10px)',
    transition: 'transform 0.3s ease',
  };

  const infoTitleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#1f2937', // Darker for readability
  };

  const infoTextStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: '#4b5563', // Darker for readability
    lineHeight: '1.6',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '200px',
    height: 'auto',
    borderRadius: '12px',
    margin: '20px auto',
    display: 'block',
    border: '2px solid rgba(0, 0, 0, 0.1)', // Adjusted for light background
  };

  // Benefits Section Styles
  const benefitsSectionStyle: React.CSSProperties = {
    padding: '40px 20px',
    background: 'rgba(255, 255, 255, 0.85)', // Slightly darker for contrast
    borderRadius: '16px',
    textAlign: 'center',
    marginBottom: '40px',
  };

  const benefitsTitleStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#1f2937', // Darker for readability
  };

  const benefitsListStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  };

  const benefitItemStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: '#4b5563', // Darker for readability
    lineHeight: '1.6',
    padding: '10px',
  };

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <section style={heroSectionStyle}>
        <h1 style={heroTitleStyle}>Welcome to Fitness App</h1>
        <p style={heroSubtitleStyle}>
          Transform your fitness journey with personalized workout plans, expert guidance, and a community to keep you motivated. Whether you're a beginner or a pro, we have the tools to help you achieve your goals.
        </p>

        <button
          onClick={() => router.push('/exercise-planner')}
          style={ctaButtonStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
          }}
        >
          Create Your Workout Plan
        </button>
      </section>

      {/* Info Section */}
      <section style={infoSectionStyle}>
        <div
          style={infoCardStyle}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <h2 style={infoTitleStyle}>Why Exercise Matters</h2>
          <Image
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=200" // Person running outdoors, symbolizing exercise benefits
            alt="Person Exercising"
            width={200}
            height={200}
            style={imageStyle}
          />
          <p style={infoTextStyle}>
            Regular exercise improves cardiovascular health, boosts mood, enhances strength, and increases longevity. It’s the foundation of a healthy lifestyle.
          </p>
        </div>

        <div
          style={infoCardStyle}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <h2 style={infoTitleStyle}>About Our App</h2>
          <Image
            src="https://images.unsplash.com/photo-1611162617210-7b7e3c8b698e?w=200&h=200" // Smartphone showing a fitness app interface
            alt="App Interface"
            width={200}
            height={200}
            style={imageStyle}
          />
          <p style={infoTextStyle}>
            Fitness App offers tailored workout plans, progress tracking, and a variety of exercises for all fitness levels. Join thousands of users achieving their goals.
          </p>
        </div>

        <div
          style={infoCardStyle}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <h2 style={infoTitleStyle}>Get Started</h2>
          <Image
            src="https://images.unsplash.com/photo-1518611012118-696614d536d2?w=200&h=200" // Person tying shoelaces, ready to start a workout
            alt="Starting Fitness"
            width={200}
            height={200}
            style={imageStyle}
          />
          <p style={infoTextStyle}>
            Input your fitness goals and preferences to generate a 7-day workout plan. Track your progress and stay motivated with our easy-to-use tools.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={benefitsSectionStyle}>
        <h2 style={benefitsTitleStyle}>Benefits of Using Fitness App</h2>
        <div style={benefitsListStyle}>
          <div style={benefitItemStyle}>✔ Generate 7-day workout plans tailored to your goals</div>
          <div style={benefitItemStyle}>✔ Choose from 42 exercises across all major muscle groups</div>
          <div style={benefitItemStyle}>✔ Customize plans for beginners, intermediate, or advanced levels</div>
          <div style={benefitItemStyle}>✔ Get goal-specific training volumes (sets, reps, rest)</div>
          <div style={benefitItemStyle}>✔ Exercises tailored for Weight Loss, Muscle Gain, or Endurance</div>
        </div>
      </section>
    </div>
  );
}