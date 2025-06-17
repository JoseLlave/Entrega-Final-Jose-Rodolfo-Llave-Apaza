import { Row } from 'react-bootstrap';
import Item from './Item/Item';

function ItemList({ items }) {
  return (
    <Row className="g-4">
      {items.map(item => (
        <div key={`item-${item.id}`} className="col-md-4 mb-4">
          <Item item={item} />
        </div>
      ))}
    </Row>
  );
}

export default ItemList;