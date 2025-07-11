import { useState } from 'react';
import CartContext from './CartContext';

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const agregarAlCarrito = (item) => {
    const itemExistente = cart.find(prod => prod.id === item.id);
    const stockDisponible = item.stock - (itemExistente ? itemExistente.cantidad : 0);
    
    if (item.cantidad > stockDisponible) {
      alert(`No hay suficiente stock. Solo quedan ${stockDisponible} unidades.`);
      return;
    }

    setCart(prevCart => {
      const existe = prevCart.find(prod => prod.id === item.id);
      if (existe) {
        return prevCart.map(prod =>
          prod.id === item.id ? { ...prod, cantidad: prod.cantidad + item.cantidad } : prod
        );
      }
      return [...prevCart, { ...item, cantidad: item.cantidad || 1 }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCart(prevCart => prevCart.filter(prod => prod.id !== id));
  };

  const vaciarCarrito = () => setCart([]);

  const getCantidad = () => cart.reduce((acc, prod) => acc + (prod.cantidad || 0), 0);

  const getTotal = () => cart.reduce((acc, prod) => acc + (prod.precio * (prod.cantidad || 1)), 0);

  return (
    <CartContext.Provider value={{
      cart,
      agregarAlCarrito,
      eliminarDelCarrito,
      vaciarCarrito,
      getCantidad,
      getTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;