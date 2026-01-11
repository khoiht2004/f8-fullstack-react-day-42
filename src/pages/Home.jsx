import { useMeQuery } from "../services/auth";
import "./Home.css";

function Home() {
  const { data } = useMeQuery();

  console.log(data);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Trang Chủ</h1>
        <p className="home-subtitle">Xin chào Khôi</p>
      </div>
    </div>
  );
}

export default Home;
