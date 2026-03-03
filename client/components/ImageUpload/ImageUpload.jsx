import ImageUploadTags from './ImageUploadTags';
import { useState } from 'react';

export default function ImageUpload() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div id="image-upload" className="image-upload">
      <div id="image-upload-box1" className="image-upload-box1">
        <div id="image-upload-show-here" className="image-upload-show-here">
          <h2> upload image show here</h2>
                <div id="upload-img" className="upload-img"></div>
        </div>

        <div id="image-upload-title" className="image-upload-title">
          <h3> upload image title here </h3>
        </div>
      </div>

      <div id="image-upload-box2" className="image-upload-box2">
        <div id="image-upload-description" className="image-upload-description">
          <h3> upload image description here </h3>
        </div>
        <div id="image-upload-location" className="image-upload-location">
          <h3> upload image location here</h3>
        </div>
        <div id="image-upload-tags"className='image-upload-tags'>
          <ImageUploadTags />
        </div>
      </div>
    </div>
  );
}
