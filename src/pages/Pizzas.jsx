import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from "../components/Header/Header";
import CardPizza from "../components/CardPizza/CardPizza";
import '../components/Pizzas/Pizzas.css';
import { CartContext } from '../components/Cart/Cartcontext';

function Pizzas() {
  const { id } = useParams();
  const [pizzas, setPizzas] = useState([]);
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchPizzas = async () => {
      setLoading(true);
      try {
        let response;
        if (id) {
          response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
        } else {
          response = await fetch('http://localhost:5000/api/pizzas');
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (id) {
          setPizza(data);
        } else {
          setPizzas(data);
        }
        setError(null);
      } catch (e) {
        console.error("Error fetching pizzas:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, [id]);

  if (loading) {
    return <p>Cargando pizzas...</p>;
  }

  if (error) {
    return <p>Error al cargar las pizzas: {error.message}</p>;
  }

  if (pizza) {
    return (
      <div>
        <Header />
        <div className="pizza-container">
          <h2>{pizza.nombre}</h2>
          <img src={pizza.img} alt={pizza.nombre} className="pizza-image" />
          <p>Precio: ${pizza.precio}</p>
          <p>Ingredientes: {pizza.ingredientes.join(', ')}</p>
          <p>Descripción: {pizza.desc}</p>
          <Link to="/pizzas">Volver a la lista</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="pizzas-container">
        {pizzas.map(pizza => (
          <CardPizza
            key={pizza._id || pizza.id || pizza.nombre}
            {...pizza}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Pizzas;