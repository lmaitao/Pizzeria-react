/* eslint-disable react/prop-types */
import '../Cart/Cart.css';

const Cart = ({ pizzaCart }) => {
  const calculateTotal = () => {
    return pizzaCart.reduce((total, pizza) => total + pizza.total, 0);
  };

  const handlePagar = () => {

    console.log("Usuario ha clickeado pagar");
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