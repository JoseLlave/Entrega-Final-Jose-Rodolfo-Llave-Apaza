import { useState } from 'react';
import Button from 'react-bootstrap/Button';

function ItemCount() {
  const [count, setCount] = useState(1);

  const add = () => setCount(count + 1);
  const subtract = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <div className="d-flex align-items-center mb-3">
      <Button variant="outline-secondary" onClick={subtract}>-</Button>
      <span className="mx-3">{count}</span>
      <Button variant="outline-secondary" onClick={add}>+</Button>
    </div>
  );
}

export default ItemCount;