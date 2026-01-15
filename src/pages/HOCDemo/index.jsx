import { useState } from "react";
import UserProfile from "./components/UserProfile";
import ProductList from "./components/ProductList";

function HOCDemo() {
  const [userLoading, setUserLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Demo Higher-Order Component (HOC)</h1>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={() => setUserLoading(!userLoading)}
          style={{
            padding: '10px 20px',
            backgroundColor: userLoading ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Toggle User Loading
        </button>

        <button
          onClick={() => setProductLoading(!productLoading)}
          style={{
            padding: '10px 20px',
            backgroundColor: productLoading ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Toggle Product Loading
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ border: '2px solid #ddd', borderRadius: '8px', padding: '10px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>User Profile Component</h3>
          <UserProfile isLoading={userLoading} />
        </div>

        <div style={{ border: '2px solid #ddd', borderRadius: '8px', padding: '10px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Product List Component</h3>
          <ProductList isLoading={productLoading} />
        </div>
      </div>
    </div>
  );
}

export default HOCDemo;
