import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [pizzaCart, setPizzaCart] = useState([]);

  const addToCart = (pizzaToAdd) => {
    setPizzaCart((prevCart) => {
      const existingPizzaIndex = prevCart.findIndex(
        (pizza) => pizza.name === pizzaToAdd.name
      );

      if (existingPizzaIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingPizzaIndex].quantity += pizzaToAdd.quantity;
        updatedCart[existingPizzaIndex].total =
          updatedCart[existingPizzaIndex].quantity *
          updatedCart[existingPizzaIndex].price;
        return updatedCart;
      } else {
        return [...prevCart, pizzaToAdd];
      }
    });
  };

  const removeFromCart = (pizzaToRemove) => {
    setPizzaCart((prevCart) =>
      prevCart.filter((pizza) => pizza.name !== pizzaToRemove.name)
    );
  };

  const calculateTotal = () => {
    return pizzaCart.reduce((total, pizza) => total + pizza.total, 0);
  };

  return (
    <CartContext.Provider
      value={{
        pizzaCart,
        addToCart,
        removeFromCart,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};