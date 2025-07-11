import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getProduct } from '../../firebase/db';
import ItemDetail from './ItemDetail';

function ItemDetailContainer() {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getProduct(id).then(product => setItem(product));
  }, [id]);

  return <ItemDetail item={item} />;
}

export default ItemDetailContainer;