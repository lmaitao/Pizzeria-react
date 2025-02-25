import { useState, useEffect } from 'react';
import Header from "../Header/Header";
import CardPizza from "../CardPizza/CardPizza";
import Cart from '../Cart/Cart'
import '../Pizzas/Pizzas.css'

function Pizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [cart, setCart] = useState([]);
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
    const existingPizza = cart.find(item => item.name === pizza.name);
    if (existingPizza) {
      setCart(cart.map(item =>
        item.name === pizza.name ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, { ...pizza, quantity }]);
    }
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
      <Cart pizzaCart={cart}/>
    </div>
  );
}

export default Pizzas;