import {React, useState} from 'react';
import Map from './Map';
import Gallery from '../Gallery/Gallery';

export default function HomePage({ isActive = true, setIsActive }) {
  const [searchArr, setSearchArr] = useState(['img1', 'img2', 'img3', 'img4']);
  //console.log(!isActive ? 'homepage is active' : 'homepage isnot active');
  return (
    <div id="homePage" className="homePage">
      <div id="map" className="map">
        <Map />
      </div>
      <div id="gallery-section" className="gallery-section">
        <Gallery searchArr={searchArr} setSearchArr={setSearchArr} />
      </div>
    </div>
  );
}
