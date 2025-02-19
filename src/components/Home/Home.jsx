import { useState } from 'react';
import Header from "../Header/Header";
import CardPizza from "../CardPizza/CardPizza";
import Cart from '../Cart/Cart'
import '../Home/Home.css'

function Home() {
  const pizzas = [
    {
      name: "Napolitana",
      price: 5950,
      ingredients: ["mozzarella", "tomates", "jamón", "orégano"],
      img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_cl.jpg?alt=media&token=6a9a33da-5c00-49d4-9080-784dcc87ec2c",
    },
    {
      name: "Española",
      price: 6950,
      ingredients: ["mozzarella", "gorgonzola", "parmesano", "provolone"],
      img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fcheese-164872_640_com.jpg?alt=media&token=18b2b821-4d0d-43f2-a1c6-8c57bc388fab",
    },
    {
      name: "Salame",
      price: 6950,
      ingredients: ["mozzarella", "pepperoni", "orégano"],
      img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_com.jpg?alt=media&token=e7cde87a-08d5-4040-ac54-90f6c31eb3e3",
    },
    {
      name: "Pollo Picante",
      ingredients: ["mozzarella", "pimientos", "pollo grillé", "orégano"],
      price: 8500,
      img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-2000595_640_c.jpg?alt=media&token=61325b6e-a1e0-441e-b3b5-7335ba13e8be",
    },
    {
      name: "Cuatro Estaciones",
      ingredients: ["mozzarella", "salame", "aceitunas", "champiñones"],
      price: 9590,
      img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-2000595_640_c.jpg?alt=media&token=61325b6e-a1e0-441e-b3b5-7335ba13e8be",
    },
    {
      name: "Bacon",
      ingredients: ["mozzarella", "tomates cherry", "bacon", "orégano"],
      price: 6450,
      img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-salame.jpg?alt=media&token=ab3d4bf8-01f2-4810-982b-bd7fb6b517b2",
    },
  ];

  const [cart, setCart] = useState([]); 

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

  return (
    <div>
      <Header />
      <div className="pizzas-container">
        {pizzas.map(pizza => (
          <CardPizza
            key={pizza.name}
            {...pizza}
            addToCart={addToCart}
          />
        ))}
      </div>
      <Cart pizzaCart={cart} />
    </div>
  );
}

export default Home;