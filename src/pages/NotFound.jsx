import { Link } from 'react-router-dom';
import '../components/NotFound/NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <div className="pizza-slice"></div>
      <h1>¡Ups! Página no encontrada</h1>
      <p>La porción que buscas no existe en nuestro menú.</p>
      <Link to="/">
        <button className="home-button">Volver al Inicio</button>
      </Link>
    </div>
  );
}

export default NotFound;