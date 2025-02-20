import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPizzaSlice,
  faLock,
  faUserPlus,
  faUserCircle,
  faSignOutAlt,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const total = 25000;
  const token = false;
  const formatCurrency = (number) => {
    return number.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">
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
              <a className="nav-link" href="#">
                <FontAwesomeIcon icon={faPizzaSlice} className="me-1" />
                <Link to="./home">Home</Link>
              </a>
            </li>
            {token ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <FontAwesomeIcon icon={faUserCircle} className="me-1" />{" "}
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />{" "}
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <FontAwesomeIcon icon={faLock} className="me-1" />
                    <Link to="/login" target="_blank" rel="noopener noreferrer">Login</Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <FontAwesomeIcon icon={faUserPlus} className="me-1" />{" "}
                    <Link to="/register" target="_blank" rel="noopener noreferrer">Register</Link>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="d-flex align-items-center ms-auto">
          <span className="navbar-text text-white me-2">
            <FontAwesomeIcon icon={faShoppingCart} className="me-1" /> Total:{" "}
            {formatCurrency(total)}
          </span>
          <span className="navbar-text text-white">
            {token ? "Token activo" : "Token inactivo"}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
