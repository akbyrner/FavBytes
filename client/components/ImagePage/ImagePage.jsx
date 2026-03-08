import { React, useState } from 'react';
import ImageTags from './ImageTags';


export default function ImagePage({ isActive = true, setIsActive }) {
  const [searchArr, setSearchArr] = useState(['img1', 'img2', 'img3', 'img4']);
  //console.log(!isActive ? 'ImagePage is active' : 'ImagePage isnot active');
  return (
    <div id="current-image" className="current-image">
      <div id="current-image-show-here" className="current-image-show-here">
        <h2>Current Image</h2>
        <div id="cur-img" className="cur-img">
          <span style={{ color: "white" }}>Image Placeholder</span>
        </div>
      </div>

      <div className="current-image-right-column">
        <div id="current-image-title" className="current-image-title">
          <h3>Current Image Title</h3>
        </div>
        <div id="current-image-description" className="current-image-description">
          <p>Current image description goes here.</p>
        </div>
        <div id="current-image-location" className="current-image-location">
          <p>Current image location goes here.</p>
        </div>

        <div id="current-image-tags" className="current-image-tags">
          <ImageTags />
        </div>
      </div>
    </div>
  );
}
