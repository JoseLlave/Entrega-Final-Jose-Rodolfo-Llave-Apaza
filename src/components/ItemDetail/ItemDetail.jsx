import { Card, Button, Row, Col, Stack, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import ItemCount from '../ItemCount';
import styles from './ItemDetail.module.css';

function ItemDetail({ item }) {
  const navigate = useNavigate();

  if (!item) return (
    <div className="text-center my-5 text-white">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      <p className="mt-2">Cargando producto...</p>
    </div>
  );

  return (
    <Card className={`${styles.detailCard} shadow-lg`}>
      <Row className="g-0">
        <Col md={6} className="p-4 d-flex align-items-center">
          <div className="w-100 position-relative">
            <Card.Img 
              variant="top" 
              src={item.imagen}
              className={`${styles.detailImage} img-fluid`}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x500/2a2a2a/cccccc?text=Imagen+no+disponible';
              }}
            />
            {item.stock <= 5 && (
              <Badge pill bg="warning" className="position-absolute top-0 start-0 m-2 fs-6 text-dark">
                ⚡ Últimas {item.stock} unidades!
              </Badge>
            )}
          </div>
        </Col>
        
        <Col md={6}>
          <Card.Body className="h-100 p-4 d-flex flex-column">
            <div>
              <Card.Title as="h1" className={`${styles.detailTitle} mb-3`}>
                {item.nombre}
              </Card.Title>
              
              <Card.Subtitle className={`${styles.detailSubtitle} mb-4`}>
                <Badge bg="dark" className="me-2 fs-6">{item.categoria}</Badge>
                {item.marca && <Badge bg="secondary" className="fs-6">{item.marca}</Badge>}
              </Card.Subtitle>
              
              {item.descripcion && (
                <p className={`${styles.detailDescription} mb-4`}>
                  {item.descripcion}
                </p>
              )}
            </div>
            
            <Stack gap={3} className="mt-auto">
              <div className="d-flex align-items-center justify-content-between">
                <span className={`${styles.detailPrice} fw-bold`}>
                  ${item.precio.toLocaleString()}
                </span>
                
                <div className={`${styles.stockBadge} ${item.stock > 5 ? 'text-success' : 'text-warning'}`}>
                  <i className="bi bi-box-seam me-1"></i>
                  {item.stock} disponibles
                </div>
              </div>
              
              <hr className="my-2 border-secondary opacity-25" />
              
              {/* Contenedor del contador */}
              <div className={`${styles.countContainer} p-3 rounded`}>
                <ItemCount item={item} />
              </div>
              
              {/* Botón Volver - Versión mejorada */}
              <Button 
                variant="outline-primary" 
                size="lg"
                className={`${styles.backButton} w-100 mt-3`}
                onClick={() => navigate(-1)}
              >
                <i className="bi bi-arrow-left-circle-fill me-2"></i>
                Volver al catálogo
              </Button>
            </Stack>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default ItemDetail;