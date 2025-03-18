import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPizzaSlice,
  faLock,
  faUserPlus,
  faUserCircle,
  faSignOutAlt,
  faShoppingCart,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CartContext } from "../Cart/Cartcontext";
import "../Cart/Cart.css";
import { UserContext } from '../Profile/Usercontext';

const Navbar = () => {
  const { pizzaCart, calculateTotal, removeFromCart, decreaseQuantity, increaseQuantity } = useContext(CartContext);
  const [showCartDetail, setShowCartDetail] = useState(false);
  const { token, logout } = useContext(UserContext);

  const formatCurrency = (number) => {
    return number.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
    });
  };

  const handleCartClick = () => {
    setShowCartDetail(!showCartDetail);
  };

  const handleRemovePizza = (pizzaId) => {
    removeFromCart({ id: pizzaId });
  };

  const handlePagar = () => {
    console.log("Usuario ha clickeado pagar");
  };

  const handleLogoutWrapper = () => {
    logout();

  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="./home">
          <img
            src="./src/assets/img/Logo.jpg"
            alt="Logo"
            width="30"
            height="24"
          />{" "}
          Pizzeria Mamma Mia!
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                <FontAwesomeIcon icon={faHome} className="me-1" />
                Home
              </Link>
            </li>
            {token ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    <FontAwesomeIcon icon={faUserCircle} className="me-1" />
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={handleLogoutWrapper}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/pizzas" className="nav-link">
                    <FontAwesomeIcon icon={faPizzaSlice} className="me-1" />
                    Pizzas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <FontAwesomeIcon icon={faLock} className="me-1" />
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    <FontAwesomeIcon icon={faUserPlus} className="me-1" />
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    <FontAwesomeIcon icon={faUser} className="me-1" />
                    Profile
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="d-flex align-items-center ms-auto">
          <button
            className="btn btn-link navbar-text text-white me-2"
            onClick={handleCartClick}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="me-1" /> Total:{" "}
            {formatCurrency(calculateTotal())}
          </button>
          <span className="navbar-text text-white">
            {token ? "Token activo" : "Token inactivo"}
          </span>
        </div>
        {showCartDetail && (
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
                      <button onClick={() => handleRemovePizza(pizza.id)}>
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <button className="pizza-form button" onClick={handlePagar}>
              Pagar
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;