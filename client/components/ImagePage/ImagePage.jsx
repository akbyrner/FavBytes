import ImageTags from './ImageTags';

export default function ImagePage() {
  return (
    <div id="current-image" className="current-image">
      <h1>This is the ImagePage!</h1>
      <div>
        <div id="current-image-show-here" className="current-image-show-here">
          <h2> current image show here</h2>
        </div>
        <div
          id="current-image-description"
          className="current-image-description"
        >
          <div id="current-image-title" className="current-image-title">
            <h3> current image title here </h3>
          </div>
          <h3> current image description here </h3>
        </div>
        <div id="current-image-location" className="current-image-location">
          <h3> current image location here</h3>
        </div>
        <div id="current-image-tags">
          <ImageTags />
        </div>
      </div>
    </div>
  );
}
