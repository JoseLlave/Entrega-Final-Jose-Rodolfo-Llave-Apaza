import { Link } from 'react-router';
import Badge from 'react-bootstrap/Badge';
import { useContext } from 'react';
import CartContext from '../context/CartContext';

function CartWidget() {
  const { getCantidad } = useContext(CartContext);
  const cantidad = getCantidad();

  return (
    <Link to="/cart" className="position-relative text-decoration-none">
      <i className="bi bi-cart3 fs-3 text-white"></i>
      {cantidad > 0 && (
        <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
          {cantidad}
        </Badge>
      )}
    </Link>
  );
}

export default CartWidget;