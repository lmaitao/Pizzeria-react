/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../Cart/Cartcontext';
import '../CardPizza/CardPizza.css';


const CardPizza = ({ name, price, ingredients, img, id }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [description, setDescription] = useState('');
  const { addToCart } = useContext(CartContext);

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