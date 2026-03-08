export default function ByteList({ user, dishes = [] }) {
  const renderedDishes = dishes.map((dish) => {
    console.log(dish);
    return (
      <li key={dish.id}>
        <div id="dish" className="dish">
          <div id="dish-name" className="dish-name">
            {dish.name} from: {dish.restaurantName}
          </div>
          <br />
          <div id="dish-description" className="dish-description">
            {dish.description}rating:{dish.stars}
          </div>
          <br />
          <div id="dish-image" className="dish-image">
            {dish.imageUrl}
          </div>
        </div>
      </li>
    );
  });
  return (
    <div id="byteList" className="byteList">
      <ul>{renderedDishes}</ul>
    </div>
  );
}
