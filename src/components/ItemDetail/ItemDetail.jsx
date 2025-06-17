import { Card, Button, Badge, Row, Col, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import ItemCount from '../ItemCount';

function ItemDetail({ item }) {
  const navigate = useNavigate();

  if (!item) return null;

  return (
    <Card className="border-0 shadow">
      <Row className="g-0">
        <Col md={6} className="p-3">
          <Card.Img 
            variant="top" 
            src={item.thumbnail} 
            className="rounded"
            style={{ maxHeight: '500px', objectFit: 'contain' }}
          />
        </Col>
        <Col md={6}>
          <Card.Body className="h-100 p-4 d-flex flex-column">
            <Card.Title as="h2">{item.title}</Card.Title>
            <Card.Subtitle className="mb-3 text-muted">
              {item.brand} • {item.category}
            </Card.Subtitle>
            
            <Badge bg={item.stock > 0 ? 'success' : 'danger'} className="mb-3">
              {item.stock > 0 ? `En stock (${item.stock})` : 'Sin stock'}
            </Badge>
            
            <Card.Text className="mb-4">{item.description}</Card.Text>
            
            <Stack gap={3} className="mt-auto">
              <div className="d-flex align-items-center">
                <span className="fs-3 text-primary me-2">${item.price}</span>
                {item.discountPercentage > 0 && (
                  <Badge bg="danger" className="fs-6">
                    {item.discountPercentage}% OFF
                  </Badge>
                )}
              </div>
              
              <ItemCount />
              
              <div className="d-grid gap-2 d-md-flex">
                <Button variant="primary" size="lg">
                  Agregar al carrito
                </Button>
                <Button 
                  variant="outline-secondary" 
                  size="lg"
                  onClick={() => navigate(-1)}
                >
                  Volver
                </Button>
              </div>
            </Stack>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default ItemDetail;