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
    console.log(userData);
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
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
          <div id="logged-in" className="logged-in">
            <div
              id="user-header-after-login"
              className="user-header-after-login"
            >
              <span>FaveBytes! save your favorites.</span>
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  style={{ width: 32, height: 32, borderRadius: '50%' }}
                />
              )}
              Welcome, {user.name}!
              <span>
                <button onClick={handleLogout}>Log out</button>
              </span>
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
                  <div id="main-area-menu" className="main-area-menu">
                    <button onClick={handleToggleSidebar}>
                      Toggle Sidebar Here
                    </button>
                    <button onClick={handleToggleGallery}>
                      {isShowingGallery ? 'Hide Gallery' : 'Show Gallery'}
                    </button>
                  </div>

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
            {isShowingGallery && (
              <div id="gallery-section" className="gallery-section">
                <Gallery searchArr={searchArr} setSearchArr={setSearchArr} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
