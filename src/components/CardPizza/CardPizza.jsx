import "./CardPizza.css";

const CardPizza = ({ name, price, ingredients, img }) => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-front">
          <img src={img} alt={name} className="card-image" />
          <div className="card-details">
            <h3 className="card-name">{name}</h3>
            <p className="card-price">Precio: ${price}</p>
            <ul className="card-ingredients">
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <div className="card-buttons">
              <button className="ver-mas">Ver más</button>
              <button className="add-to-cart">Añadir al carrito</button>
            </div>
          </div>
        </div>
        <div className="card-back">
          <p>¡Pide tu {name} ahora!</p>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;
