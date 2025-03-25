import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [pizzaCart, setPizzaCart] = useState([]);

  const addToCart = (pizzaToAdd) => {
    setPizzaCart((prevCart) => {
      const existingPizzaIndex = prevCart.findIndex(
        (pizza) => pizza.id === pizzaToAdd.id
      );

      if (existingPizzaIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingPizzaIndex].quantity += 1;
        updatedCart[existingPizzaIndex].total =
          updatedCart[existingPizzaIndex].quantity *
          updatedCart[existingPizzaIndex].price;
        return updatedCart;
      } else {
        return [...prevCart, { ...pizzaToAdd, quantity: 1, total: pizzaToAdd.price }];
      }
    });
  };

  const removeFromCart = (pizzaToRemove) => {
    setPizzaCart((prevCart) =>
      prevCart.filter((pizza) => pizza.id !== pizzaToRemove.id)
    );
  };

  const decreaseQuantity = (pizzaToRemove) => {
    setPizzaCart((prevCart) => {
      return prevCart.map((pizza) => {
        if (pizza.id === pizzaToRemove.id) {
          const newQuantity = Math.max(1, pizza.quantity - 1);
          return {
            ...pizza,
            quantity: newQuantity,
            total: newQuantity * pizza.price,
          };
        }
        return pizza;
      });
    });
  };

  const increaseQuantity = (pizzaToAdd) => {
    setPizzaCart((prevCart) => {
      return prevCart.map((pizza) => {
        if (pizza.id === pizzaToAdd.id) {
          const newQuantity = pizza.quantity + 1;
          return {
            ...pizza,
            quantity: newQuantity,
            total: newQuantity * pizza.price,
          };
        }
        return pizza;
      });
    });
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
        increaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};