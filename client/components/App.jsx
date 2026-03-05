import { React, useState } from 'react';
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
  const [user, setUser] = useState(null);
  const [isShowingSidebar, setIsShowingSidebar] = useState(false);
  const [view, setView] = useState('HomePage');
  const [isActive, setIsActive] = useState(false);
  const [searchArr, setSearchArr] = useState(['img1', 'img2', 'img3', 'img4']);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleToggleSidebar = () => {
    setIsShowingSidebar(!isShowingSidebar);
  };

  return (
    <div id="app-container" className="app-container">
      {!user ? (
        <LogIn onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <div className="user-header" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 16px' }}>
            {user.picture && (
              <img
                src={user.picture}
                alt={user.name}
                style={{ width: 32, height: 32, borderRadius: '50%' }}
              />
            )}
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout} style={{ marginLeft: 'auto' }}>
              Log out
            </button>
          </div>

          <div id="content-row" className="content-row">
            <>
              {isShowingSidebar && <NavBar setView={setView} view={view} />}
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
          <div id="gallery-section" className="gallery-section">
            <Gallery searchArr={searchArr} setSearchArr={setSearchArr} />
          </div>
        </>
      )}
    </div>
  );
}
