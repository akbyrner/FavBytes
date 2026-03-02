import ImageUploadTags from './ImageUploadTags';

export default function ImageUpload() {
  return (
    <div id="image-upload" className="image-upload">
      <h1>This is the ImageUpload!</h1>

      <div>
        <div id="image-upload-show-here" className="image-upload-show-here">
          <h2> upload image show here</h2>
        </div>
        <div id="image-upload-title" className="image-upload-title">
          <h3> upload image title here </h3>
        </div>
        <div id="image-upload-description" className="image-upload-description">
          <h3> upload image description here </h3>
        </div>
        <div id="image-upload-location" className="image-upload-location">
          <h3> upload image location here</h3>
        </div>
        <div id="image-upload-tags">
          <ImageUploadTags />
        </div>
      </div>
    </div>
  );
}
