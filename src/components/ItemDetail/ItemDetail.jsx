import { Card, Button, Row, Col, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import ItemCount from '../ItemCount';

function ItemDetail({ item }) {
  const navigate = useNavigate();

  if (!item) return <div className="text-center my-5">Cargando producto...</div>;

  return (
    <Card className="border-0 shadow">
      <Row className="g-0">
        <Col md={6} className="p-3">
          <Card.Img 
            variant="top" 
            src={item.imagen}
            className="rounded"
            style={{ maxHeight: '500px', objectFit: 'contain' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500?text=Imagen+no+disponible';
            }}
          />
        </Col>
        <Col md={6}>
          <Card.Body className="h-100 p-4 d-flex flex-column">
            <Card.Title as="h2">{item.nombre}</Card.Title>
            <Card.Subtitle className="mb-3 text-muted">
              {item.categoria}
            </Card.Subtitle>
            
            <Stack gap={3} className="mt-auto">
              <div className="d-flex align-items-center">
                <span className="fs-3 text-primary me-2">${item.precio}</span>
              </div>
              
              {/* Este componente YA INCLUYE el botón funcional */}
              <ItemCount item={item} />
              
              <div className="d-grid gap-2 d-md-flex">
                {/* ELIMINA este botón duplicado */}
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