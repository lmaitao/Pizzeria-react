import '../components/Cart/Cart.css';

import { useState, useEffect } from 'react';

const Cart = () => {
  const [pizzaCart, setPizzaCart] = useState([]);

  useEffect(() => {
    const handleAddToCartEvent = (event) => {
      const pizzaToAdd = event.detail;
      setPizzaCart((prevCart) => {
        const existingPizzaIndex = prevCart.findIndex(
          (pizza) => pizza.name === pizzaToAdd.name
        );

        if (existingPizzaIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingPizzaIndex].quantity += pizzaToAdd.quantity;
          updatedCart[existingPizzaIndex].total =
            updatedCart[existingPizzaIndex].quantity *
            updatedCart[existingPizzaIndex].price;
          return updatedCart;
        } else {
          return [...prevCart, pizzaToAdd];
        }
      });
    };

    window.addEventListener('addToCart', handleAddToCartEvent);

    return () => {
      window.removeEventListener('addToCart', handleAddToCartEvent);
    };
  }, []);

  const calculateTotal = () => {
    return pizzaCart.reduce((total, pizza) => total + pizza.total, 0);
  };

  const handlePagar = () => {
    console.log('Usuario ha clickeado pagar');
  };

  const handleRemovePizza = (pizzaToRemove) => {
    setPizzaCart((prevCart) =>
      prevCart.filter((pizza) => pizza.name !== pizzaToRemove.name)
    );
  };

  return (
    <div className="carrito-container">
      <h2>Detalle del Pedido</h2>
      {pizzaCart.length === 0 ? (
        <p>No hay pizzas en el carrito.</p>
      ) : (
        <ul>
          {pizzaCart.map((pizza, index) => (
            <li key={index}>
              <img src={pizza.img} alt={pizza.name} className="pizza-image" />
              <div className="pizza-details">
                <h3>{pizza.name}</h3>
                <p>Cantidad: {pizza.quantity}</p>
                <p>Precio: ${pizza.total}</p>
              </div>
              <button
                className="remove-pizza-button"
                onClick={() => handleRemovePizza(pizza)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      <h3 className="carrito-total">Total: ${calculateTotal()}</h3>
      <button className="pagar-button" onClick={handlePagar}>
        Pagar
      </button>
    </div>
  );
};

export default Cart;