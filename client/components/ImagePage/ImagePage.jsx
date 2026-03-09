import React from 'react';
import ImageTags from './ImageTags';

export default function ImagePage({ dish, setView }) {
  if (!dish)
    return (
      <div style={{ color: 'white' }}>
        No dish selected.
        <button className="button-style" onClick={() => setView('HomePage')}>
          ← Back
        </button>
      </div>
    );

  return (
    <div id="current-image" className="current-image">
      <div id="current-image-show-here" className="current-image-show-here">
        <button
          className="button-style"
          onClick={() => setView('HomePage')}
          style={{ marginBottom: '12px' }}
        >
          ← Back
        </button>
        <div id="cur-img" className="cur-img">
          {dish.imageUrl ? (
            <img
              src={dish.imageUrl}
              alt={dish.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          ) : (
            <span style={{ color: 'white' }}>No Image</span>
          )}
        </div>
        <div id="current-image-items" className="current-image-items">
          <div id="current-image-title" className="current-image-title">
            <h3>{dish.name}</h3>
          </div>
          <div
            id="current-image-description"
            className="current-image-description"
          >
            <p>{dish.description}</p>
          </div>
          <div
            id="current-image-restaurant"
            className="current-image-restaurant"
          >
            <p>🍽️ {dish.restaurantName}</p>
          </div>
          <div id="current-image-location" className="current-image-location">
            {dish.location?.address && <p>📍 {dish.location.address}</p>}
          </div>
          <div id="current-image-price" className="current-image-price">
            {dish.price && <p>💲 ${dish.price}</p>}
          </div>
          <div id="current-image-rating" className="current-image-rating">
            {dish.rating && <p>⭐ {dish.rating} / 3</p>}
          </div>
          <div id="current-image-tags" className="current-image-tags">
            <ImageTags tags={dish.tags} />
          </div>
        </div>
      </div>
    </div>
  );
}
