import {React, useState} from 'react';
import Map from './Map';
import Gallery from '../Gallery/Gallery';

export default function HomePage({ isActive = true, setIsActive }) {
  const [searchArr, setSearchArr] = useState([]);
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
