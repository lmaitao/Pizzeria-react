/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../CardPizza/CardPizza.css';

const CardPizza = ({ name, price, ingredients, img, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      name,
      price,
      ingredients,
      img,
      quantity,
      total: price * quantity,
    });
  };

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
            <div className="quantity-selector">
              <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <div className="card-buttons">
              <button className="ver-mas">Ver más</button>
              <button
                className="add-to-cart"
                onClick={handleAddToCart}
              >
                Añadir al carrito
              </button>
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