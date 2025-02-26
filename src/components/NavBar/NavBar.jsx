import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPizzaSlice,
  faLock,
  faUserPlus,
  faUserCircle,
  faSignOutAlt,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Cart/Cart.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [pizzaCart, setPizzaCart] = useState([]);
  const [showCartDetail, setShowCartDetail] = useState(false);

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

    window.addEventListener("addToCart", handleAddToCartEvent);

    return () => {
      window.removeEventListener("addToCart", handleAddToCartEvent);
    };
  }, []);

  const calculateTotal = () => {
    return pizzaCart.reduce((total, pizza) => total + pizza.total, 0);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
    });
  };

  const handleCartClick = () => {
    setShowCartDetail(!showCartDetail);
  };

  const handleDecreaseQuantity = (pizzaName) => {
    setPizzaCart((prevCart) =>
      prevCart.map((pizza) =>
        pizza.name === pizzaName && pizza.quantity > 1
          ? { ...pizza, quantity: pizza.quantity - 1, total: pizza.price * (pizza.quantity - 1) }
          : pizza
      )
    );
  };

  const handleRemovePizza = (pizzaName) => {
    setPizzaCart((prevCart) => prevCart.filter((pizza) => pizza.name !== pizzaName));
  };

  const handlePagar = () => {
    console.log("Usuario ha clickeado pagar");
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
                <FontAwesomeIcon icon={faPizzaSlice} className="me-1" />
                Home
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    <FontAwesomeIcon icon={faUserCircle} className="me-1" />
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={onLogout}>
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
            {isLoggedIn ? "Token activo" : "Token inactivo"}
          </span>
        </div>
        {showCartDetail && (
          <div className="cart-detail-container pizza-form">
            <h2>Detalle del Carrito</h2>
            {pizzaCart.length === 0 ? (
              <p>No hay pizzas en el carrito.</p>
            ) : (
              <ul>
                {pizzaCart.map((pizza, index) => (
                  <li key={index} className="form-group">
                    <img src={pizza.img} alt={pizza.name} className="pizza-image" />
                    <span>{pizza.name} - Cantidad: {pizza.quantity}</span>
                    <div>
                      <button onClick={() => handleDecreaseQuantity(pizza.name)}>-</button>
                      <button onClick={() => handleRemovePizza(pizza.name)}>Eliminar</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <button className="pizza-form button" onClick={handlePagar}>Pagar</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;