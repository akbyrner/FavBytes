import React, { useState, useEffect } from 'react';
import ImageUploadStars from './ImageUploadStars';
import ImageUploadTags from './ImageUploadTags';
import { SearchBox } from '@mapbox/search-js-react';

export default function ImageUpload({
  isActive,
  setIsActive,
  user,
  fetchDishes = { fetchDishes },
  setView,
  prefillLocation,
}) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(prefillLocation?.placeName ?? '');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState([]);
  const [stars, setStars] = useState(1);
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [locationCoords, setLocationCoords] = useState(
    prefillLocation
      ? { lng: prefillLocation.lng, lat: prefillLocation.lat }
      : null,
  );
  const [submitStatus, setSubmitStatus] = useState(null);

  console.log(
    !isActive ? 'ImageUpload is active' : 'ImageUpload is not active',
  );

  useEffect(() => {
    if (prefillLocation?.placeName) setLocation(prefillLocation.placeName);
  }, [prefillLocation]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('userId', user._id);
    formData.append('name', title);
    formData.append('restaurantName', restaurantName);
    formData.append('description', description);
    formData.append('rating', stars?.value ?? 1);
    formData.append('price', price);
    formData.append('location', location);

    if (locationCoords) {
      formData.append('lng', locationCoords.lng);
      formData.append('lat', locationCoords.lat);
    }
    formData.append('tags', JSON.stringify(tags.map((t) => t.value)));

    try {
      const res = await fetch('/api/favDish', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Server error response:', text);
        setSubmitStatus('error');
        return;
      }

      setSubmitStatus('success');
      fetchDishes();
      setTimeout(() => setView('HomePage'), 1500);
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    }
  };

  return (
    <form id="image-upload" className="image-upload" onSubmit={handleSubmit}>
      <div id="image-upload-show-here" className="image-upload-show-here">
        <div id="upload-img" className="upload-img">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <span style={{ color: 'white' }}>Image Preview</span>
          )}
        </div>
        <label className="button-style">
          {image ? image.name : 'Choose File'}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            style={{ display: 'none' }}
          />
        </label>
        <button className="button-style" type="submit">
          Submit Image!
        </button>
      </div>
      <div id="image-upload-items" className={'image-upload-items'}>
        <div id="image-upload-title" className="image-upload-title">
          <label>
            <input
              type="text"
              value={title}
              style={{ width: '100%' }}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Image Title Goes Here!"
              required
            />
          </label>
        </div>

        <div id="image-upload-description" className="image-upload-description">
          <label>
            <input
              value={description}
              style={{ width: '100%' }}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Image Description Goes Here!"
              required
            />
          </label>
        </div>

        <div id="image-upload-restaurant" className="image-upload-restaurant">
          <label>
            <input
              type="text"
              value={restaurantName}
              style={{ width: '100%' }}
              onChange={(e) => setRestaurantName(e.target.value)}
              placeholder="Restaurant Name Goes Here!"
              required
            />
          </label>
        </div>

        <div id="image-upload-location" className="image-upload-location">
          <label>
            <input
              type="text"
              value={location}
              style={{ width: '100%' }}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Image Location Goes Here!"
            />
          </label>

          <button
            type="button"
            onClick={() => setShowLocationSearch(!showLocationSearch)}
            className="button-style"
            style={{ marginLeft: '8px' }}
          >
            {showLocationSearch ? 'Cancel' : 'Not the right location?'}
          </button>

          {showLocationSearch && (
            <div style={{ marginTop: '8px' }}>
              <SearchBox
                accessToken={MAPBOX_TOKEN}
                value={locationInput}
                onChange={(v) => setLocationInput(v)}
                onRetrieve={(result) => {
                  const [lng, lat] = result.features[0].geometry.coordinates;
                  const placeName = result.features[0].properties.full_address;
                  setLocation(placeName);
                  setLocationCoords({ lng, lat });
                  setLocationInput('');
                  setShowLocationSearch(false);
                }}
              />
            </div>
          )}
        </div>

        <div id="image-upload-price" className="image-upload-price">
          <label>
            <input
              type="number"
              value={price}
              style={{ width: '100%' }}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price Goes Here!"
            />
          </label>
        </div>
      </div>

      <div id="tags-and-stars" className="tags-and-stars">
        <div id="image-upload-tags" className="image-upload-tags">
          <ImageUploadTags tags={tags} setTags={setTags} />
        </div>
        <div id="image-upload-stars" className="image-upload-stars">
          <ImageUploadStars stars={stars} setStars={setStars} />
        </div>
      </div>
    </form>
  );
}
