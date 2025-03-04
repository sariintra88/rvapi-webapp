import ProductList from "./components/ProductList";

function App() {
  return (
    <div>
      <h1>ร้านค้าสินค้าออนไลน์</h1>
      <ProductList apiUrl="http://localhost:5000" />
    </div>
  );
}

export default App;