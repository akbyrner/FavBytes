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
          <button className='button-style'
            onClick={() => {
              setView('HomePage');
            }}
          >
            {'Go Home 🏠'}
          </button>
          {/* ImageUpload Button */}
          <button className='button-style'
            onClick={() => {
              setView('ImageUpload');
            }}
          >
            {'Go to Upload 📤'}
          </button>
          {/* ImagePage button */}
          <button className='button-style'
            onClick={() => {
              setView('ImagePage');
            }}
          >
            {'Go to Image 🖼️'}
          </button>
          {/* Page view */}
        </nav>
        {view}
      </div>
    </div>
  );
}
