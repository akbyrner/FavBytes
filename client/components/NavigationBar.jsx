export default function NavBar({
  view,
  setView,
  isShowingGallery,
  onToggleGallery,

}) {
  return (
    <div id="sidebar" className="sidebar">
      <div id="navigation-bar" className="navigation-bar">
        <nav>
          {/* HomePage button */}
          <button
            onClick={() => {
              setView('HomePage');
            }}
          >
            {'Go to Home'}
          </button>
          {/* ImageUpload Button */}
          <button
            onClick={() => {
              setView('ImageUpload');
            }}
          >
            {'Go to Upload'}
          </button>
          {/* ImagePage button */}
          <button
            onClick={() => {
              setView('ImagePage');
            }}
          >
            {'Go to Image'}
          </button>
          {/* Gallery show/hide button */}
          <button onClick={onToggleGallery}>
            {isShowingGallery ? 'Hide Gallery' : 'Show Gallery'}
          </button>
          {/* Page view */}
        </nav>
        {view}
      </div>
    </div>
  );
}
