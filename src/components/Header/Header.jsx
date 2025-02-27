import "../Header/Header.css";

function Header() {
  return (
    <header className="jumbotron text-center" id="header-image">
      <div className="container">
        <h1 className="display-4 fw-bold text-white">
          ¡Bienvenido a la Pizzeria Mamma Mia el Mejor Sabor de Chile!
        </h1>
        <p className="lead text-white">
          Aquí encontrarás información relevante sobre nuestros
          productos de alta calidad y los mejores servicios.
        </p>
      </div>
    </header>
  );
}

export default Header;
