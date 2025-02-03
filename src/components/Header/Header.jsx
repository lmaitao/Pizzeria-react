import "../Header/Header.css";

function Header() {
  return (
    <header className="jumbotron text-center" id="header-image">
      <div className="container">
        <h1 className="display-4 fw-bold text-white">
          ¡Bienvenido a Mi Proyecto!
        </h1>
        <p className="lead text-white">
          Esta es la página de inicio de tu proyecto. Aquí encontrarás
          información relevante sobre nuestros productos y servicios.
        </p>
      </div>
    </header>
  );
}

export default Header;
