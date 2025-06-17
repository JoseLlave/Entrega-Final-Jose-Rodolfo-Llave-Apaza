import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ItemList from './ItemList';

function ItemListContainer() {
  const [items, setItems] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    const getProducts = new Promise((resolve) => {
      let url;
      
      if (categoryName) {
        url = `https://dummyjson.com/products/category/${categoryName}`;
      } else {
        url = 'https://dummyjson.com/products';
      }
      
      fetch(url)
        .then(res => res.json())
        .then(data => resolve(data.products || []));
    });

    getProducts.then(products => setItems(products));
  }, [categoryName]);

  return <ItemList items={items} />;
}

export default ItemListContainer;