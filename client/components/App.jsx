import React from 'react';
import Homepage from './HomePage';
import Gallery from './Gallery';
import LogIn from './LogIn';
import ImagePage from './ImagePage';
import NavBar from './NavigationBar';

export default function App() {
  return (
    <div className="app-container">
      <LogIn />

      <div className="content-row">
        <div className="sidebar">
          <NavBar />
        </div>

        <div className="main-area">
          <div className="map-section">
            <Homepage />
          </div>

          <div className="gallery-section">
            <Gallery />
          </div>
        </div>
      </div>

      <ImagePage />
    </div>
  );
}
