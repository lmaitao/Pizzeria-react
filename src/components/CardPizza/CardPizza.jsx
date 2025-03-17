import { useState, useEffect } from 'react';
import '../CardPizza/CardPizza.css';

const CardPizza = ({ name, price, ingredients, img, id, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFlipped, setIsFlipped] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDescription(data.desc);
        } else {
          console.error('Error fetching description:', response.status);
          setDescription('Descripción no disponible.');
        }
      } catch (error) {
        console.error('Error fetching description:', error);
        setDescription('Error al cargar la descripción.');
      }
    };

    if (isFlipped && id) {
      fetchDescription();
    }
  }, [isFlipped, id]);

  const handleAddToCart = () => {
    const pizzaToAdd = {
      id,
      name,
      price,
      ingredients,
      img,
      quantity: quantity,
      total: price * quantity,
    };

    addToCart(pizzaToAdd);
  };

  const handleVerMas = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card-container">
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-front" style={{ display: isFlipped ? 'none' : 'flex', flexDirection: 'column' }}>
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
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <div className="card-buttons">
              <button className="ver-mas" onClick={handleVerMas}>
                Ver más
              </button>
              <button className="add-to-cart" onClick={handleAddToCart}>
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
        <div className="card-back" style={{ display: isFlipped ? 'flex' : 'none', flexDirection: 'column' }}>
          <p>{description}</p>
          <button className="ver-mas" onClick={handleVerMas}>
            Ver menos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;