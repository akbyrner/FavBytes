import Map from './Map';

export default function HomePage({ isActive = true, setIsActive, user }) {
  return (
    <div id="homePage" className="homePage">
      <div id="map" className="map">
        <Map user={user} />
      </div>
    </div>
  );
}
