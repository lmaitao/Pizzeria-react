import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [pizzaCart, setPizzaCart] = useState([]);

  const addToCart = (pizzaToAdd) => {
    setPizzaCart((prevCart) => {
      const existingPizzaIndex = prevCart.findIndex(
        (pizza) => pizza.id === pizzaToAdd.id
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

  const decreaseQuantity = (pizzaToDecrease) => {
    setPizzaCart((prevCart) => {
      const existingPizzaIndex = prevCart.findIndex(
        (pizza) => pizza.id === pizzaToDecrease.id
      );

      if (existingPizzaIndex !== -1) {
        const updatedCart = [...prevCart];
        if (updatedCart[existingPizzaIndex].quantity > 1) {
          updatedCart[existingPizzaIndex].quantity -= 1;
          updatedCart[existingPizzaIndex].total =
            updatedCart[existingPizzaIndex].quantity *
            updatedCart[existingPizzaIndex].price;
        } else {
          return prevCart.filter((pizza) => pizza.id !== pizzaToDecrease.id);
        }
        return updatedCart;
      } else {
        return prevCart;
      }
    });
  };

  const removeFromCart = (pizzaToRemove) => {
    setPizzaCart((prevCart) =>
      prevCart.filter((pizza) => pizza.id !== pizzaToRemove.id)
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
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};