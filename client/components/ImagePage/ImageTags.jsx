export default function ImageTags({ tags = [] }) {
  return (
    <div>
      <h3>Tags</h3>
      <div id="current-image-tag-list" className="current-image-tag-list">
        {tags.length === 0 ? (
          <p style={{ opacity: 0.5 }}>No tags</p>
        ) : (
          <ul>
            {tags.map((tag, i) => (
              <li key={i}>{tag}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}