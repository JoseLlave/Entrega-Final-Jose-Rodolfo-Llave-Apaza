import { Link } from 'react-router';
import Badge from 'react-bootstrap/Badge';

function CartWidget() {
  return (
    <Link to="/cart" className="position-relative text-decoration-none">
      <i className="bi bi-cart3 fs-3 text-white"></i>
      <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
        2
      </Badge>
    </Link>
  );
}

export default CartWidget;