import Map from './Map';
import { useState } from 'react';

export default function HomePage() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div id="homePage" className="homePage">
      <div id="map" className="map">
        <Map />
      </div>
    </div>
  );
}
