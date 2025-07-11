import { useState, useContext } from 'react';
import CartContext from '../context/CartContext';
import Button from 'react-bootstrap/Button';

function ItemCount({ item }) {
  const [cantidad, setCantidad] = useState(1);
  const context = useContext(CartContext);

  if (!context) {
    console.error("ItemCount no puede acceder al CartContext");
    return <div>Error: No se puede acceder al carrito</div>;
  }

  const { agregarAlCarrito, cart } = context;
  
  // Calcula stock disponible
  const itemEnCarrito = cart.find(prod => prod.id === item.id);
  const stockDisponible = item.stock - (itemEnCarrito ? itemEnCarrito.cantidad : 0);

  const handleSumar = () => {
    if (cantidad < stockDisponible) {
      setCantidad(cantidad + 1);
    }
  };

  const handleRestar = () => cantidad > 1 && setCantidad(cantidad - 1);
  
  const handleAgregar = () => {
    if (stockDisponible <= 0) return;
    agregarAlCarrito({ 
      ...item,
      cantidad: cantidad
    });
  };

  return (
    <div className="d-flex flex-column gap-2 p-2">
      <div className="d-flex align-items-center justify-content-center gap-3">
        <Button variant="outline-secondary" onClick={handleRestar} disabled={cantidad <= 1}>-</Button>
        <span className="fs-5">{cantidad}</span>
        <Button variant="outline-secondary" onClick={handleSumar} disabled={cantidad >= stockDisponible}>+</Button>
      </div>
      
      <div className="text-center text-muted">
        Stock disponible: {stockDisponible}
      </div>
      
      <Button 
        variant="primary" 
        onClick={handleAgregar}
        className="mt-2"
        disabled={stockDisponible <= 0}
      >
        {stockDisponible > 0 ? 'Agregar al carrito' : 'Sin stock'}
      </Button>
    </div>
  );
}

export default ItemCount;