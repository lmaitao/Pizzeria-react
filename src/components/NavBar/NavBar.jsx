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
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Cart/Cartcontext";
import "../Cart/Cart.css";
import { UserContext } from '../Profile/Usercontext';

const Navbar = () => {
  const { pizzaCart, calculateTotal, removeFromCart, decreaseQuantity, increaseQuantity } = useContext(CartContext);
  const [showCartDetail, setShowCartDetail] = useState(false);
  const { token, logout } = useContext(UserContext);
  const navigate = useNavigate();

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
    // Implementar la lógica de pago aquí
  };

  const handleLogoutWrapper = () => {
    logout();
    navigate('/'); // Redirigir a la página de inicio después de cerrar sesión
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          <img src="./src/assets/img/Logo.jpg" alt="Logo" width="30" height="24" />
          Pizzeria Mamma Mia!
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {token ? (
              <>
                <li className="nav-item">
                  <Link to="/home" className="nav-link">
                    <FontAwesomeIcon icon={faHome} className="me-1" />
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/pizzas" className="nav-link">
                    <FontAwesomeIcon icon={faPizzaSlice} className="me-1" />
                    Pizzas
                  </Link>
                </li>
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
                  <Link to="/register" className="nav-link">
                    <FontAwesomeIcon icon={faUserPlus} className="me-1" />
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {token && (
          <div className="d-flex align-items-center ms-auto">
            <button className="btn btn-link navbar-text text-white me-2" onClick={handleCartClick}>
              <FontAwesomeIcon icon={faShoppingCart} className="me-1" /> Total: {formatCurrency(calculateTotal())}
            </button>
            <span className="navbar-text text-white">
              {token ? "Token activo" : "Token inactivo"}
            </span>
          </div>
        )}
        {showCartDetail && (
          <div className="cart-detail-container pizza-form">
            {/* Detalle del carrito */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;