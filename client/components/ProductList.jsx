import { useState, useEffect } from "react";

function ProductList({ apiUrl }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/products`)
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, [apiUrl]);

  return (
    <div>
      <h2>รายการสินค้า</h2>
      <ul>
        {products.map((p) => (
          <li key={p._id}>{p.name} - ราคา: {p.price} บาท</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;