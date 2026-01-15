import { useMeQuery } from "@/services/auth";
import { useNavigate } from "react-router";
import withLoading from "@/hoc/withLoading";
import "./Profile.css";
import { useEffect } from "react";

function UserProfile({ currentUser }) {
  const navigator = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigator("/");
  };

  return (
    <div className="profile-container">
      <div className="auth-buttons">
        <button className="auth-btn logout-btn" onClick={handleLogout}>
          Đăng xuất
        </button>
        <button
          className="auth-btn"
          onClick={() => navigator("/hoc-demo")}
          style={{ backgroundColor: "#17a2b8" }}
        >
          HOC Demo
        </button>
        <button
          className="auth-btn"
          onClick={() => navigator("/render-props-demo")}
          style={{ backgroundColor: "#FF9800" }}
        >
          Render Props Demo
        </button>
      </div>
      <div className="profile-content">
        <h1 className="profile-title">Trang cá nhân</h1>
        <p className="home-subtitle">Xin chào {currentUser?.firstName}</p>
      </div>
    </div>
  );
}

const UserProfileWithLoading = withLoading(UserProfile);

function UserProfileContainer() {
  const { isLoading, isError, data: currentUser } = useMeQuery();
  const navigator = useNavigate();

  useEffect(() => {
    if (isError) {
      navigator("/");
    }
  }, [isError, navigator]);

  return <UserProfileWithLoading isLoading={isLoading} currentUser={currentUser} />;
}

export default UserProfileContainer;
