'use client';
import Link from 'next/link';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Navbar Styles
  const navbarStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
  };

  const navContainerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px'
  };

  const logoStyle: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    transition: 'all 0.3s ease'
  };

  const navLinksStyle: React.CSSProperties = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  };

  const navLinkStyle: React.CSSProperties = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  };

  const bodyStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    margin: 0,
    padding: 0
  };

  const mainStyle: React.CSSProperties = {
    minHeight: 'calc(100vh - 80px)' // Adjust based on navbar height
  };

  return (
    <html lang="en">
      <head>
        <title>Fitness App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={bodyStyle}>
        <nav style={navbarStyle}>
          <div style={navContainerStyle}>
            <Link 
              href="/" 
              style={logoStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.textShadow = '0 4px 8px rgba(0,0,0,0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.textShadow = '0 2px 4px rgba(0,0,0,0.3)';
              }}
            >
              💪 Fitness App
            </Link>
            
            <div style={navLinksStyle}>
              <Link 
                href="/" 
                style={navLinkStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                🏠 Home
              </Link>
              
              <Link 
                href="/exercises" 
                style={navLinkStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                🏋️ Exercises
              </Link>

              <Link 
                href="/exercise-planner" 
                style={navLinkStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                📅 Exercise Planner
              </Link>
            </div>
          </div>
        </nav>
        
        <main style={mainStyle}>
          {children}
        </main>
      </body>
    </html>
  );
}