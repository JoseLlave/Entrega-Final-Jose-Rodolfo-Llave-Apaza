import { useState, useContext, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { createOrder, updateProductStock } from '../firebase/db';
import CartContext from '../context/CartContext';
import styles from './Checkout.module.css';

function Checkout() {
  const { cart, vaciarCarrito, getTotal } = useContext(CartContext);
  const [formData, setFormData] = useState({ 
    email: '', 
    nombre: '', 
    telefono: '' 
  });
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
      <div className={`${styles.emptyCartContainer} text-center`}>
        <Alert variant="warning" className={styles.emptyCartAlert}>
          Tu carrito está vacío. Agrega productos antes de proceder al pago.
        </Alert>
        <Button 
          variant="primary" 
          onClick={() => navigate('/')}
          className={styles.backButton}
        >
          Volver a la tienda
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <Card className={styles.checkoutCard}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger" className={styles.errorAlert}>{error}</Alert>}
            
            <Card.Title className={styles.checkoutTitle}>
              <i className="bi bi-credit-card-fill me-2"></i>
              Finalizar Compra
            </Card.Title>
            
            <Form.Group className="mb-4" controlId="email">
              <Form.Label className={styles.formLabel}>Correo Electrónico</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="juan.perez@ejemplo.com" 
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
              <Form.Text className={styles.helpText}>
                Te enviaremos el comprobante a este email
              </Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-4" controlId="nombre">
              <Form.Label className={styles.formLabel}>Nombre Completo</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Juan Pérez" 
                value={formData.nombre}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </Form.Group>
            
            <Form.Group className="mb-4" controlId="telefono">
              <Form.Label className={styles.formLabel}>Teléfono</Form.Label>
              <Form.Control 
                type="tel" 
                placeholder="+54 11 2345-6789" 
                value={formData.telefono}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
              <Form.Text className={styles.helpText}>
                Incluye código de área
              </Form.Text>
            </Form.Group>
            
            <Card className={styles.summaryCard}>
              <Card.Body>
                <h4 className={styles.summaryTitle}>
                  <i className="bi bi-receipt me-2"></i>
                  Resumen de Compra
                </h4>
                <ul className={styles.productList}>
                  {cart.map(item => (
                    <li key={item.id} className={styles.productItem}>
                      <span className={styles.productName}>{item.nombre}</span>
                      <span className={styles.productQuantity}>x {item.cantidad}</span>
                      <span className={styles.productPrice}>${(item.precio * item.cantidad).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.totalContainer}>
                  <span className={styles.totalLabel}>Total:</span>
                  <span className={styles.totalAmount}>${getTotal().toFixed(2)}</span>
                </div>
              </Card.Body>
            </Card>
            
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Procesando...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Confirmar Compra
                </>
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Checkout;