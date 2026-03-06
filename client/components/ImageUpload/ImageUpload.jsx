import { React, useState, } from 'react';
import ImageUploadStars from './ImageUploadStars';
import ImageUploadTags from './ImageUploadTags';


export default function ImageUpload({ isActive = true, setIsActive }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState([]);
  const [stars, setStars] = useState(1);
  const [formArr, setFormArr] = useState([]);

  console.log(
    !isActive ? 'ImageUpload is active' : 'ImageUpload is not active',
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  //   {
  //   userId,
  //   name,
  //   restaurantName,
  //   description,
  //   rating,
  //   imageUrl,
  //   price,
  //   location,
  //   tags,
  // },
  const handleSubmit = (e) => {
    const formData = {
      imageURL,
      name: title,
      alt: title + description,
      description,
      location,
      price: price,
      tags,
      rating: stars,
    };
    const favByte = async (req, res) => {
      try {
        const res = await fetch('/api/favDish', { body: formData });
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          console.log('Form submitted!', formData);
        }
      } catch (err) {
        console.error('cannot save dish:', err);
      }
    };
    return favByte();
  };

  return (
    <form id="image-upload" className="image-upload" onSubmit={handleSubmit}>
      <div id="image-upload-show-here" className="image-upload-show-here">
        <button className='button-style' type="submit">Submit Image!</button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        <div id="upload-img" className="upload-img">
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ width: '100%', marginTop: '10px' }}
            />
          )}
        </div>
      </div>

      <div id="image-upload-title" className="image-upload-title">
        <label>
          <input
            type="text"
            value={title}
            style={{width: "100%"}}
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
                        style={{width: "100%"}}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Image Description Goes Here!"
            required
          />
        </label>
      </div>

      <div id="image-upload-location" className="image-upload-location">
        <label>
          <input
            type="text"
            value={location}
                        style={{width: "100%"}}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Image Location Goes Here!"
          />
        </label>
      </div>
      <div id="image-upload-tags" className="image-upload-tags">
        <div
          id="image-upload-tag-container"
          className="image-upload-tag-container"
        >
          <ImageUploadTags tags={tags} setTags={setTags} />
          <ImageUploadStars stars={stars} setStars={setStars} />
        </div>
      </div>
    </form>
  );
}
