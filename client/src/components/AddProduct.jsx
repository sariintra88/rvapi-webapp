import { useState } from "react";

function AddProduct({ apiUrl, onProductAdded }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${apiUrl}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    });
    setName("");
    setPrice("");
    onProductAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="ชื่อสินค้า" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="ราคา" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <button type="submit">เพิ่มสินค้า</button>
    </form>
  );
}

export default AddProduct;