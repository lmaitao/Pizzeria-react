import { useContext, useEffect, useState } from 'react';
import { CartContext } from './Cartcontext';
import { UserContext } from '../components/Profile/Usercontext';
import './Cart.css';

function Cart() {
  const { pizzaCart, calculateTotal, removeFromCart, decreaseQuantity, increaseQuantity } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const [showPayButton, setShowPayButton] = useState(token);

  useEffect(() => {
    setShowPayButton(token);
  }, [token]);

  const formatCurrency = (number) => {
    return number.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
    });
  };

  const handlePagar = () => {
    console.log("Usuario ha clickeado pagar");
  };

  return (
    <div className="cart-detail-container pizza-form">
      <h2>Detalle del Carrito</h2>
      {pizzaCart.length === 0 ? (
        <p>No hay pizzas en el carrito.</p>
      ) : (
        <ul>
          {pizzaCart.map((pizza) => (
            <li key={pizza.id} className="form-group">
              <img
                src={pizza.img}
                alt={pizza.name}
                className="pizza-image"
              />
              <span>
                {pizza.name} - Cantidad: {pizza.quantity}
              </span>
              <div className="quantity-selector">
                <button className="quantity-button" onClick={() => decreaseQuantity(pizza)}>-</button>
                <span>{pizza.quantity}</span>
                <button className="quantity-button" onClick={() => increaseQuantity(pizza)}>+</button>
              </div>
              <div>
                <button onClick={() => removeFromCart(pizza.id)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showPayButton && (
        <button
          className="pizza-form button"
          onClick={handlePagar}
        >
          Pagar ({formatCurrency(calculateTotal())})
        </button>
      )}
      {!token && <p>Debes iniciar sesión para pagar.</p>}
    </div>
  );
}

export default Cart;