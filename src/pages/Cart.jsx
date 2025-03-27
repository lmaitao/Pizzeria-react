import { useContext, useState } from 'react';
import { CartContext } from './Cartcontext';
import { UserContext } from '../components/Profile/Usercontext';
import './Cart.css';

function Cart() {
  const { pizzaCart, calculateTotal, removeFromCart, decreaseQuantity, increaseQuantity } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false); // Estado para el mensaje de éxito

  const formatCurrency = (number) => {
    return number.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
    });
  };

  const handlePagar = async () => {
    if (!token) {
      alert("Debes iniciar sesión para pagar.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cart: pizzaCart.map(pizza => ({
            id: pizza.id,
            name: pizza.name,
            price: pizza.price,
            quantity: pizza.quantity,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo realizar el pago.');
      }

      setPurchaseSuccess(true); // Establecer el estado de éxito a true
      // Limpiar el carrito
    } catch (err) {
      alert('Error al realizar el pago.');
    }
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
              <img src={pizza.img} alt={pizza.name} className="pizza-image" />
              <span>{pizza.name} - Cantidad: {pizza.quantity}</span>
              <div className="quantity-selector">
                <button className="quantity-button" onClick={() => decreaseQuantity(pizza)}>-</button>
                <span>{pizza.quantity}</span>
                <button className="quantity-button" onClick={() => increaseQuantity(pizza)}>+</button>
              </div>
              <div>
                <button onClick={() => removeFromCart(pizza.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {token && (
        <button className="pizza-form button" onClick={handlePagar}>
          Pagar ({formatCurrency(calculateTotal())})
        </button>
      )}
      {!token && (
        <button className="pizza-form button" onClick={handlePagar}>
          Pagar ({formatCurrency(calculateTotal())})
        </button>
      )}
      {purchaseSuccess && ( // Mostrar el mensaje de éxito si purchaseSuccess es true
        <div className="success-message">
          Compra realizada con éxito.
        </div>
      )}
    </div>
  );
}

export default Cart;