import { Button, ListGroup, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import CartContext from '../context/CartContext';
import styles from './Cart.module.css';

function CartContainer() {
  const { cart, eliminarDelCarrito, vaciarCarrito, getTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const total = getTotal();

  const hayProductosSinStock = cart.some(item => item.cantidad > item.stock);

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>
        <i className="bi bi-cart3 me-2"></i>
        Tu Carrito de Compras
      </h1>
      
      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
          <i className="bi bi-cart-x" style={{fontSize: '3rem', color: '#6c757d'}}></i>
          <h3 className="mt-3">Tu carrito está vacío</h3>
          <Button 
            variant="primary" 
            className={styles.continueShoppingBtn}
            onClick={() => navigate('/')}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Ir a la pagina principal
          </Button>
        </div>
      ) : (
        <>
          <ListGroup className={styles.productList}>
            {cart.map(prod => (
              <ListGroup.Item key={prod.id} className={styles.productItem}>
                <div className={styles.productImageContainer}>
                  <img 
                    src={prod.imagen} 
                    alt={prod.nombre} 
                    className={styles.productImage}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100/2a2a2a/cccccc?text=Imagen+no+disponible';
                    }}
                  />
                </div>
                
                <div className={styles.productDetails}>
                  <h5 className={styles.productName}>{prod.nombre}</h5>
                  <div className={styles.productInfo}>
                    <span className={styles.productPrice}>${prod.precio.toFixed(2)} c/u</span>
                    <span className={styles.productQuantity}>x {prod.cantidad}</span>
                    <span className={styles.productSubtotal}>${(prod.precio * prod.cantidad).toFixed(2)}</span>
                  </div>
                  
                  <div className={`${styles.stockInfo} ${prod.cantidad > prod.stock ? styles.stockError : ''}`}>
                    <i className="bi bi-box-seam me-1"></i>
                    Stock: {prod.stock} | Disponible: {prod.stock - prod.cantidad}
                  </div>
                </div>
                
                <Button 
                  variant="outline-danger" 
                  className={styles.deleteButton}
                  onClick={() => eliminarDelCarrito(prod.id)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className={styles.summaryContainer}>
            <div className={styles.totalContainer}>
              <span className={styles.totalLabel}>TOTAL:</span>
              <span className={styles.totalAmount}>${total.toFixed(2)}</span>
            </div>
            
            {hayProductosSinStock && (
              <div className={styles.stockWarning}>
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Algunos productos no tienen suficiente stock
              </div>
            )}
            
            <div className={styles.buttonsContainer}>
              <Button 
                variant="outline-danger" 
                className={styles.clearCartBtn}
                onClick={vaciarCarrito}
              >
                <i className="bi bi-x-circle me-2"></i>
                Vaciar carrito
              </Button>
              
              <Button 
                variant="primary" 
                className={styles.checkoutBtn}
                onClick={() => navigate('/checkout')} 
                disabled={cart.length === 0 || hayProductosSinStock}
              >
                <i className="bi bi-credit-card me-2"></i>
                Proceder al pago
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartContainer;