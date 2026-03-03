import { React, useState } from 'react';
import HomePage from './HomePage/HomePage';
import Gallery from './Gallery/Gallery';
import LogIn from './LogIn';
import ImagePage from './ImagePage/ImagePage';
import NavBar from './NavigationBar';
import ImageUpload from './ImageUpload/ImageUpload';

// function changeView({ view }) {
//   if (view === 'Homepage') {
//     return <Homepage />;
//   }  if (view === 'ImageUpload') {
//     return <ImageUpload />;
//   }  if (view === 'ImagePage') {
//     return <ImagePage />;
//   }  if (!view) {
//     return <Homepage />;
//   }
// }
//          <div id= 'main-view'className='main-view'>{changeView(view)}"new view"</div>

function mainView() {
  const view = useState({view})
  return <div> view ? <h2>view</h2> : 'no view'</div>
}

export default function App() {
  const [isShowingSidebar, setIsShowingSidebar] = useState(true);
  const [view, setView] = useState('HomePage');
  return (
    <div id="app-container" className="app-container">
      <LogIn />

      <div id="content-row" className="content-row">
        <>
          {isShowingSidebar && <NavBar />}
          <div id="main-area" className="main-area">
            <button onClick={() => setIsShowingSidebar(!isShowingSidebar)}>
              Toggle Sidebar Here
            </button>
            <div>
              <div>
                {view}
              </div>
              <HomePage />
              <ImageUpload />
              <ImagePage />
            </div>
          </div>
        </>
      </div>
      <div id="gallery-section" className="gallery-section">
        <Gallery />
      </div>
    </div>
  );
}
