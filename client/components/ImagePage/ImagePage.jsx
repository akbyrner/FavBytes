import ImageTags from './ImageTags';
import { useState } from 'react';

export default function ImagePage() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div id="current-image" className="current-image">
      <div id="current-image-box1" className="current-image-box1">
        <div id="current-image-show-here" className="current-image-show-here">
          <h2> current image show here</h2>

          <div id="cur-img" className="cur-img"></div>
        </div>

        <div id="current-image-title" className="current-image-title">
          <h3> current image title here </h3>
        </div>
      </div>

      <div id="current-image-box2" className="current-image-box2">
        <div
          id="current-image-description"
          className="current-image-description"
        >
          <h3> current image description here </h3>
        </div>
        <div id="current-image-location" className="current-image-location">
          <h3> current image location here</h3>
        </div>
        <div id="current-image-tags" className="current-image-tags">
          <ImageTags />
        </div>
      </div>
    </div>
  );
}
