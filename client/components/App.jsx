import React from 'react';
import Homepage from './HomePage/HomePage';
import Gallery from './Gallery/Gallery';
import LogIn from './LogIn';
import ImagePage from './ImagePage/ImagePage';
import NavBar from './NavigationBar';
import ImageUpload from './ImageUpload/ImageUpload';

export default function App() {


  return (
    <div className="app-container">
      <LogIn />
      <div className="content-row">
        <div className="sidebar">
          <NavBar />
        </div>

        <div className="main-area">
          <Homepage />
          <ImagePage/>
          <ImageUpload/>

          <div className="gallery-section">
            <Gallery />
          </div>
        </div>
      </div>
    </div>
  );
}
