export default function NavBar({ view, setView, isShowingGallery, onToggleGallery }) {
  
  return (
    <div id="sidebar" className="sidebar">
      <div id="navigation-bar" className="navigation-bar">
        <nav>
          <ul>
            <li>
              <button
                onClick={() => {
                  setView('HomePage');
                }}
              >
                {'Go to Home'}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setView('ImageUpload');
                }}
              >
                {'Go to Upload'}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setView('ImagePage');
                }}
              >
                {'Go to Image'}
              </button>
            </li>
            <li>
              <button onClick={onToggleGallery}>
                {isShowingGallery ? 'Hide Gallery' : 'Show Gallery'}
              </button>
            </li>
            <li>{view}</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
