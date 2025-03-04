import { useState } from "react";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

function App() {
  const [refresh, setRefresh] = useState(false);
  const apiUrl = "http://localhost:5555";

  return (
    <div>
      <h1>ร้านค้าสินค้าออนไลน์</h1>
      <AddProduct apiUrl={apiUrl} onProductAdded={() => setRefresh(!refresh)} />
      <ProductList apiUrl={apiUrl} key={refresh} />
    </div>
  );
}

export default App;