import { useState, useEffect } from 'react';
import Header from "../components/Header/Header";
import CardPizza from "../components/CardPizza/CardPizza";
import '../components/Home/Home.css';

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const addToCart = (pizza, quantity) => {
    const pizzaToAdd = {
      name: pizza.nombre,
      price: pizza.precio,
      img: pizza.img,
      quantity: quantity,
      total: pizza.precio * quantity
    };

    const addToCartEvent = new CustomEvent('addToCart', {
      detail: pizzaToAdd
    });

    window.dispatchEvent(addToCartEvent);
  };

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
            key={pizza.nombre}
            {...pizza}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;