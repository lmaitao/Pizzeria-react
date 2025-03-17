import { useState, useEffect, useContext } from 'react';
import Header from "../components/Header/Header";
import CardPizza from "../components/CardPizza/CardPizza";
import '../components/Home/Home.css';
import { CartContext } from '../components/Cart/Cartcontext';

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch('http://localhost:5000/api/pizzas')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener las pizzas');
        }
        return response.json();
      })
      .then(data => {
        setPizzas(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando pizzas...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <Header />
      <div className="pizzas-container">
        {pizzas.map(pizza => (
          <CardPizza
            key={pizza.id}
            {...pizza}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;