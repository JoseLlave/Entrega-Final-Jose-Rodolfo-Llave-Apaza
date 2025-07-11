import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router';
import styles from './Item.module.css';

function Item({ item }) {
  return (
    <Card className={`h-100 ${styles.card}`}>
      <Card.Img 
        variant="top" 
        src={item.imagen}
        className={styles.cardImg}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300?text=Imagen+no+disponible';
        }}
      />
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.cardTitle}>{item.nombre}</Card.Title>
        <Card.Subtitle className={`mb-2 ${styles.cardSubtitle}`}>
          {item.marca} • {item.categoria}
        </Card.Subtitle>
        <Badge bg={item.stock > 0 ? 'success' : 'danger'} className="mb-2 align-self-start">
          {item.stock > 0 ? 'En stock' : 'Sin stock'}
        </Badge>
        <Card.Text className="mt-auto">
          <span className={`fw-bold ${styles.price}`}>${item.precio}</span>
          {item.descuento > 0 && (
            <Badge bg="danger" className={`ms-2 ${styles.discountBadge}`}>
              {item.descuento}% OFF
            </Badge>
          )}
        </Card.Text>
        <Link to={`/item/${item.id}`}>
          <Button variant="primary" className="w-100 mt-2">
            Ver detalle
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Item;