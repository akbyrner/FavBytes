import { React, useState } from 'react';
import HomePage from './HomePage/HomePage';
import Gallery from './Gallery/Gallery';
import LogIn from './LogIn';
import ImagePage from './ImagePage/ImagePage';
import NavBar from './NavigationBar';
import ImageUpload from './ImageUpload/ImageUpload';

function MainView({ view, isActive, setIsActive }) {
  return view === 'ImageUpload' ? (
    <ImageUpload isActive={isActive} setIsActive={setIsActive} />
  ) : view === 'ImagePage' ? (
    <ImagePage isActive={isActive} setIsActive={setIsActive} />
  ) : (
    <HomePage />
  );
}

export default function App() {
  const [searchArr, setSearchArr] = useState([]);
  const [user, setUser] = useState(null);
  const [isShowingSidebar, setIsShowingSidebar] = useState(false);
  const [isShowingGallery, setIsShowingGallery] = useState(false);
  const [view, setView] = useState('HomePage');
  const [isActive, setIsActive] = useState(false);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
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
              {isShowingSidebar && <NavBar setView={setView} view={view} />}
              <div id="main-area" className="main-area">
                <button onClick={() => setIsShowingSidebar(!isShowingSidebar)}>
                  Toggle Sidebar Here
                </button>

                <div id="main-view" className="main-view">
                  <MainView
                    view={view}
                    isActive={isActive}
                    setIsActive={setIsActive}
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
