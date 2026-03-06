import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function AppMap({ user }) {
  const [dishes, setDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    fetch('/api/dishes')
      .then(res => res.json())
      .then(data => setDishes(data))
      .catch(err => console.error(err));
  }, []);

  const initialViewState = {
    longitude: user?.location?.coordinates?.lng ?? -74.006,
    latitude: user?.location?.coordinates?.lat ?? 40.7128,
    zoom: 11
  };

  console.log(initialViewState)
  return (
    <div style={{ height: '100%', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
      <Map
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {dishes.map(dish => (
          dish.location && dish.location.coordinates ? (
            <Marker
              key={dish._id}
              longitude={dish.location.coordinates.lng}
              latitude={dish.location.coordinates.lat}
              anchor="bottom"
              onClick={e => {
                e.originalEvent.stopPropagation();
                setSelectedDish(dish);
              }}
            >
              <div style={{ fontSize: '24px', cursor: 'pointer' }}>📍😋</div>
            </Marker>
          ) : null
        ))}

        {selectedDish && (
          <Popup
            anchor="top"
            longitude={selectedDish.location.coordinates.lng}
            latitude={selectedDish.location.coordinates.lat}
            onClose={() => setSelectedDish(null)}
          >
            <div style={{ color: 'black' }}>
              <h3 style={{ margin: '0 0 5px 0' }}>{selectedDish.name}</h3>
              <p style={{ margin: 0 }}>{selectedDish.restaurantName}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}