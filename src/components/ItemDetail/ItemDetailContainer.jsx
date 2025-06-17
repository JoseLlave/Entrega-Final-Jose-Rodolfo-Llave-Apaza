import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ItemDetail from './ItemDetail';

function ItemDetailContainer() {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getProduct = new Promise((resolve) => {
      fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(data => resolve(data));
    });

    getProduct.then(product => setItem(product));
  }, [id]);

  return <ItemDetail item={item} />;
}

export default ItemDetailContainer;