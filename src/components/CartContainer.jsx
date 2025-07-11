import { Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import CartContext from '../context/CartContext';

function CartContainer() {
  const { cart, eliminarDelCarrito, vaciarCarrito, getTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const total = getTotal();

  const hayProductosSinStock = cart.some(item => item.cantidad > item.stock);

  return (
    <div className='d-flex flex-column align-items-center mt-5'>
      <ListGroup className='w-75'>
        {cart.map(prod => (
          <ListGroup.Item key={prod.id} className='d-flex justify-content-between align-items-center'>
            <div>
              <img 
                src={prod.imagen} 
                alt={prod.nombre} 
                style={{ 
                  width: '50px', 
                  height: '50px',
                  objectFit: 'contain',
                  marginRight: '10px' 
                }} 
              />
              {prod.nombre} x {prod.cantidad} - ${(prod.precio * prod.cantidad).toFixed(2)}
              <div className={`small ${prod.cantidad > prod.stock ? 'text-danger' : 'text-muted'}`}>
                Stock: {prod.stock} | Disponible: {prod.stock - prod.cantidad}
              </div>
            </div>
            <Button variant='danger' size='sm' onClick={() => eliminarDelCarrito(prod.id)}>
              Eliminar
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <h2 className='mt-3'>TOTAL: ${total.toFixed(2)}</h2>
      
      {hayProductosSinStock && (
        <div className="text-danger mb-2">
          Algunos productos no tienen suficiente stock
        </div>
      )}
      
      <Button className='w-75 mt-3' variant='danger' onClick={vaciarCarrito}>
        Vaciar carrito
      </Button>
      
      <Button 
        className='w-75 mt-3' 
        onClick={() => navigate('/checkout')} 
        disabled={cart.length === 0 || hayProductosSinStock}
      >
        Pagar
      </Button>
    </div>
  );
}

export default CartContainer;