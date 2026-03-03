

export default function GalleryItem({title, thumbnail, item}) {
  
  return (
    <div id="gallery-item" className="gallery-item">
      <h1>This is the Gallery Item!</h1>
      <div id="gallery-thumbnail" className="gallery-thumbnail">
        <h1>gallery thumbnail!</h1>
      </div>
      <div id="gallery-item-title" className="gallery-item-title">
        <h1>gallery title</h1>
      </div>
    </div>
  );
}
