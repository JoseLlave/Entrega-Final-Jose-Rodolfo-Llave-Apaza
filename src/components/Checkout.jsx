import { useState, useContext, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { createOrder, updateProductStock } from '../firebase/db';

function Checkout() {
  const { cart, vaciarCarrito, getTotal } = useContext(CartContext);
  const [formData, setFormData] = useState({ email: '', nombre: '', telefono: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!formData.email || !formData.nombre || !formData.telefono) {
      setError('Todos los campos son obligatorios');
      setLoading(false);
      return;
    }

    try {
      const updateStockPromises = cart.map(producto => 
        updateProductStock(producto.id, producto.cantidad)
      );
      
      await Promise.all(updateStockPromises);

      const orden = {
        comprador: formData,
        items: cart,
        total: getTotal(),
        fecha: new Date().toISOString(),
        estado: 'completada'
      };

      const ordenId = await createOrder(orden);
      vaciarCarrito();
      navigate('/compra-exitosa', { state: { ordenId } });
    } catch (err) {
      console.error('Error en el checkout:', err);
      setError('Error al procesar la compra. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center mt-5">
        <Alert variant="warning">
          Tu carrito está vacío. Agrega productos antes de proceder al pago.
        </Alert>
        <Button variant="primary" onClick={() => navigate('/')}>
          Volver a la tienda
        </Button>
      </div>
    );
  }

  return (
    <div className='d-flex justify-content-center mt-5'>
      <Form className='w-50' onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <h2 className='mb-4'>Finalizar compra</h2>
        
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="pepo@example.com" 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Pepo Perez" 
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="telefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control 
            type="tel" 
            placeholder="+5491123434565" 
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <div className="mt-4">
          <h4>Resumen de compra</h4>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.nombre} x {item.cantidad} - ${item.precio * item.cantidad}
              </li>
            ))}
          </ul>
          <h5>Total: ${getTotal().toFixed(2)}</h5>
        </div>
        
        <Button 
          variant="primary" 
          type="submit"
          disabled={loading}
          className='mt-3 w-100'
        >
          {loading ? 'Procesando...' : 'Confirmar compra'}
        </Button>
      </Form>
    </div>
  );
}

export default Checkout;