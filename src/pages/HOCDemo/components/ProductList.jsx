/* eslint-disable react-refresh/only-export-components */
import withLoading from "@/hoc/withLoading";

function ProductList() {
  const products = [
    { id: 1, name: "Laptop", price: "20,000,000 VNĐ" },
    { id: 2, name: "Điện thoại", price: "15,000,000 VNĐ" },
    { id: 3, name: "Máy tính bảng", price: "10,000,000 VNĐ" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách sản phẩm</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map((product) => (
          <li
            key={product.id}
            style={{
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <strong>{product.name}</strong> - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withLoading(ProductList);
