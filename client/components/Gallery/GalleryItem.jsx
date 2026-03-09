export default function GalleryItem({ title, thumbnail, item }) {
  return (
    <div id="gallery-item" className="gallery-item">
      <div id="gallery-thumbnail" className="gallery-thumbnail">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
          />
        ) : (
          <div style={{ width: '100%', height: '150px', background: '#333', borderRadius: '8px' }} />
        )}
      </div>
      <div id="gallery-item-title" className="gallery-item-title">
        <h3 style={{ margin: '8px 0 4px' }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '0.85em', opacity: 0.7 }}>{item?.restaurantName}</p>
        {item?.location?.address && (
          <p style={{ margin: 0, fontSize: '0.75em', opacity: 0.5 }}>📍 {item.location.address}</p>
        )}
      </div>
    </div>
  );
}