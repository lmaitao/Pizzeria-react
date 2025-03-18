import { useContext } from 'react';
import { CartContext } from '../components/Cart/Cartcontext';
import '../components/Cart/Cart.css';

const Cart = () => {
  const { pizzaCart, removeFromCart, calculateTotal, decreaseQuantity, increaseQuantity } = useContext(CartContext);

  const handlePagar = () => {
    console.log('Usuario ha clickeado pagar');
  };

  return (
    <div className="carrito-container">
      <h2>Detalle del Pedido</h2>
      {pizzaCart.length === 0 ? (
        <p>No hay pizzas en el carrito.</p>
      ) : (
        <ul>
          {pizzaCart.map((pizza) => (
            <li key={pizza.id}>
              <img src={pizza.img} alt={pizza.name} className="pizza-image" />
              <div className="pizza-details">
                <h3>{pizza.name}</h3>
                <div className="quantity-selector">
                  <button className="quantity-button" onClick={() => decreaseQuantity(pizza)}>-</button>
                  <span>{pizza.quantity}</span>
                  <button className="quantity-button" onClick={() => increaseQuantity(pizza)}>+</button>
                </div>
                <p>Precio: ${pizza.total}</p>
              </div>
              <button
                className="remove-pizza-button"
                onClick={() => removeFromCart(pizza)}
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