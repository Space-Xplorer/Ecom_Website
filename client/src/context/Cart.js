import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./auth";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    let existingItems = localStorage.getItem('cart')

    if(existingItems){
      setCart(JSON.parse(existingItems));
    }
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

//custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
