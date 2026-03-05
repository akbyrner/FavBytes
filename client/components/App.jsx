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
  ) : view === 'ImageUpload' ? (
    <ImageUpload isActive={isActive} setIsActive={setIsActive} />
  ) : (
    <HomePage />
  );
}

export default function App() {
  const [isShowingSidebar, setIsShowingSidebar] = useState(false);
  const [view, setView] = useState('HomePage');
  const [isActive, setIsActive] = useState(false);

  return (
    <div id="app-container" className="app-container">
      <LogIn />

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
    </div>
  );
}
