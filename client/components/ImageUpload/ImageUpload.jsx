import ImageUploadTags from './ImageUploadTags';
import {useState} from 'react';

export default function ImageUpload({ isActive = true, setIsActive }) {
  console.log(
    !isActive ? 'Imageupload is active' : 'Imageupload is not active',
  );
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      image,
      title,
      description,
      location,
    };
    console.log('Form submitted!', formData);
  };

  return (
    <form id="image-upload" className="image-upload" onSubmit={handleSubmit}>
      <div id="image-upload-box1" className="image-upload-box1">
              <button type='submit'>Submit Image!</button>
        <div id="image-upload-show-here" className="image-upload-show-here">
          <h2> Upload Image</h2>

          <input type="file" accept="image/*" onChange={handleImageChange} />

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
            <h3> upload image title here </h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Image Title Goes Here!"
              required
            />
          </label>
        </div>

        <div id="image-upload-description" className="image-upload-description">
          <label>
            <h3> upload image description here </h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Image Description Goes Here!"
              required
            />
          </label>
        </div>

        <div id="image-upload-location" className="image-upload-location">
          <label>
            <h3> upload image location here </h3>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Image Location Goes Here!"
            />
          </label>
        </div>

        <div id="image-upload-box2" className="image-upload-box2">
          <div id="image-upload-tags" className="image-upload-tags">
            <ImageUploadTags />
          </div>
        </div>
      </div>

    </form>
  );
}
