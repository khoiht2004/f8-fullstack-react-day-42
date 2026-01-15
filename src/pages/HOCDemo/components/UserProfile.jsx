import { useMeQuery } from "@/services/auth";
import { useNavigate } from "react-router";
import "./Profile.css";
import { useEffect } from "react";

function UserProfile() {
  const { isSuccess, isError, data: currentUser } = useMeQuery();
  const navigator = useNavigate();

  useEffect(() => {
    if (isError) {
      navigator("/");
    }
  }, [isError, navigator]);

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
      </div>
      <div className="profile-content">
        <h1 className="profile-title">Trang cá nhân</h1>
        {isSuccess && (
          <p className="home-subtitle">Xin chào {currentUser?.firstName}</p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
