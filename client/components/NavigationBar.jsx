
export default function NavBar({
  view,
  setView,
  isShowingGallery,
  onToggleGallery,
}) 
{
  return (
    <div id="sidebar" className="sidebar">
      <div id="navigation-bar" className="navigation-bar">
        <nav>
          <button
            onClick={() => {
              setView('HomePage');
            }}
          >
            {'Go to Home'}
          </button>
          <br />

          <button
            onClick={() => {
              onToggleGallery();
              setView('ImageUpload');
            }}
          >
            {'Go to Upload'}
          </button>
          <br />

          <button
            onClick={() => {
              setView('ImagePage');
            }}
          >
            {'Go to Image'}
          </button>
          <br />

        </nav>
      </div>
    </div>
  );
}
