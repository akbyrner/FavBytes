import React, { useState, useEffect } from 'react';
import HomePage from './HomePage/HomePage';
import Gallery from './Gallery/Gallery';
import LogIn from './LogIn';
import ImagePage from './ImagePage/ImagePage';
import NavBar from './NavigationBar';
import ImageUpload from './ImageUpload/ImageUpload';

function MainView({ view, isActive, setIsActive, user }) {
  return view === 'ImageUpload' ? (
    <ImageUpload isActive={isActive} setIsActive={setIsActive} />
  ) : view === 'ImagePage' ? (
    <ImagePage isActive={isActive} setIsActive={setIsActive} />
  ) : (
    <HomePage user={user} />
  );
}

export default function App() {
  const [searchArr, setSearchArr] = useState([]);
  const [user, setUser] = useState(null);
  const [isShowingSidebar, setIsShowingSidebar] = useState(false);
  const [isShowingGallery, setIsShowingGallery] = useState(true);
  const [view, setView] = useState('HomePage');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Check for existing session on mount
    fetch('/auth/me')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('No session');
      })
      .then(data => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  const handleLoginSuccess = (userData) => {
    console.log(userData)
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await fetch('/auth/logout', { method: 'POST' });
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleToggleSidebar = () => {
    setIsShowingSidebar(!isShowingSidebar);
  };

  const handleToggleGallery = () => {
    setIsShowingGallery(!isShowingGallery);
  };

  return (
    <div id="app-container" className="app-container">
      {!user ? (
        <LogIn onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <div
            className="user-header"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 16px',
            }}
          >
            <span style={{ marginRight: 'auto' }} >FaveBytes! save your favorites.</span>
            {user.picture && (
              <img
                src={user.picture}
                alt={user.name}
                style={{ width: 32, height: 32, borderRadius: '50%' }}
              />
            )}
            <span>Welcome, {user.name}!</span>
            <button onClick={handleLogout} style={{ marginLeft: 'auto' }}>
              Log out
            </button>
          </div>

          <div id="content-row" className="content-row">
            <>
              {isShowingSidebar && (
                <NavBar 
                  setView={setView} 
                  view={view} 
                  isShowingGallery={isShowingGallery} 
                  onToggleGallery={handleToggleGallery} 
                />
              )}
              <div id="main-area" className="main-area">
                <button onClick={handleToggleSidebar}>
                  Toggle Sidebar Here
                </button>

                <div id="main-view" className="main-view">
                  <MainView
                    view={view}
                    isActive={isActive}
                    setIsActive={setIsActive}
                    user={user}
                  />
                </div>
              </div>
            </>
          </div>
          {isShowingGallery && (
            <div id="gallery-section" className="gallery-section">
              <Gallery searchArr={searchArr} setSearchArr={setSearchArr} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
