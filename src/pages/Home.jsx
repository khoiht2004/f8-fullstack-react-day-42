import { useNavigate } from "react-router";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="auth-buttons">
        <button
          className="auth-btn login-btn"
          onClick={() => navigate("/login")}
        >
          Đăng nhập
        </button>
        <button
          className="auth-btn register-btn"
          onClick={() => navigate("/register")}
        >
          Đăng ký
        </button>
      </div>
      <div className="home-content">
        <h1 className="home-title">Trang Chủ</h1>
      </div>
    </div>
  );
}

export default Home;
