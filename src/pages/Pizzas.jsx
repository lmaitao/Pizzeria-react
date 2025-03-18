import { useState, useEffect, useContext } from 'react';
import Header from "../components/Header/Header";
import CardPizza from "../components/CardPizza/CardPizza";
import '../components/Pizzas/Pizzas.css';
import { CartContext } from '../components/Cart/Cartcontext';

function Pizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchPizzas = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/pizzas');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPizzas(data);
        setError(null);
      } catch (e) {
        console.error("Error fetching pizzas:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  if (loading) {
    return <p>Cargando pizzas...</p>;
  }

  if (error) {
    return <p>Error al cargar las pizzas: {error.message}</p>;
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