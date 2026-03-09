import Map from './Map';
import ByteList from './ByteList';

export default function HomePage({
  user,
  dishes,
  setView,
  setSelectedLocation,
  setSelectedDish,
}) {
  return (
    <div id="homePage" className="homePage">
      <div id="byteList-container" className="byteList-container">
        <div id="byteList" className="byteList">
          <ByteList setView={setView} dishes={dishes} user={user} setSelectedDish={setSelectedDish} />
        </div>
      </div>
      <div id="map" className="map">
        <Map
          dishes={dishes}
          user={user}
          setView={setView}
          setSelectedLocation={setSelectedLocation}
        />
      </div>
    </div>
  );
}
