import { useMeQuery } from "../services/auth";
import "./Home.css";

function Home() {
  const { isSuccess, data: currentUser } = useMeQuery();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Trang Chủ</h1>
        {isSuccess && (
          <p className="home-subtitle">Xin chào {currentUser?.firstName}</p>
        )}
      </div>
    </div>
  );
}

export default Home;
