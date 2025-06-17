import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router';
import styles from './Item.module.css';

function Item({ item }) {
  return (
    <Card className={`h-100 ${styles.card}`}>
      <Card.Img 
        variant="top" 
        src={item.thumbnail} 
        className={styles.cardImg}
      />
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.cardTitle}>{item.title}</Card.Title>
        <Card.Subtitle className={`mb-2 ${styles.cardSubtitle}`}>
          {item.brand} • {item.category}
        </Card.Subtitle>
        <Badge bg={item.stock > 0 ? 'success' : 'danger'} className="mb-2 align-self-start">
          {item.stock > 0 ? 'En stock' : 'Sin stock'}
        </Badge>
        <Card.Text className="mt-auto">
          <span className={`fw-bold ${styles.price}`}>${item.price}</span>
          {item.discountPercentage > 0 && (
            <Badge bg="danger" className={`ms-2 ${styles.discountBadge}`}>
              {item.discountPercentage}% OFF
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