export default function ByteList({
  dishes = [],
  setSelectedDish,
  setView,
}) {
  if (!dishes.length) {
    return (
      <div id="byteList" className="byteList">
        <p>No dishes yet — add your first! 🍽️</p>
      </div>
    );
  }

  return (
    <div id="byteList" className="byteList">
      {dishes.map((dish) => (
        <div
          key={dish._id}
          className="byte-card"
          onClick={() => {
            setSelectedDish(dish);
            setView('ImagePage');
          }}

        >
          <div

          >
            <img
              src={dish.imageUrl}
              alt={dish.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          <h3 style={{ margin: '6px 0 2px' }}>{dish.name}</h3>
          <p style={{ margin: 0 }}>{dish.restaurantName}</p>
          {dish.location?.address && (
            <p>
              📍 {dish.location.address}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
