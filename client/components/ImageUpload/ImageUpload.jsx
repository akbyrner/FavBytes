import React, { useState, useEffect } from 'react';
import ImageUploadStars from "./ImageUploadStars";
import ImageUploadTags from "./ImageUploadTags";

export default function ImageUpload({ isActive, setIsActive, user, prefillLocation }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(prefillLocation?.placeName ?? '');
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [stars, setStars] = useState(1);

  console.log(
    !isActive ? "ImageUpload is active" : "ImageUpload is not active",
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
  
  const formData = new FormData();
  formData.append("image", image);
  formData.append("userId", user._id);
  formData.append("name", title);
  formData.append("restaurantName", restaurantName);
  formData.append("description", description);
  formData.append("rating", stars);
  formData.append("price", price);
  formData.append("location", prefillLocation);
  formData.append("tags", JSON.stringify(tags));

  try {
    const res = await fetch("/api/favDish", {
      method: "POST",
      body: formData, 
    });
  } catch (err) {
    console.error(err);
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
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          ) : (
            <span style={{ color: "white" }}>Image Preview</span>
          )}
        </div>
        <label className="button-style">
          {image ? image.name : "Choose File"}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            style={{ display: "none" }}
          />
        </label>
        <button className="button-style" type="submit">
          Submit Image!
        </button>
      </div>

      <div className="image-upload-right-column">
        <div id="image-upload-title" className="image-upload-title">
          <label>
            <input
              type="text"
              value={title}
              style={{ width: "100%" }}
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
              style={{ width: "100%" }}
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
              style={{ width: '50%' }}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Image Location Goes Here!"
            />
          </label>
        </div>

        <div id="image-upload-price" className="image-upload-price">
          <label>
            <input
              type="number"
              value={price}
              style={{ width: '50%' }}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price Goes Here!"
            />
          </label>
        </div>
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
