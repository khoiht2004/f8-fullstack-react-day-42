import { Navigate } from "react-router";
import { useMeQuery } from "../services/auth";
import "./PrivateRoute.css";
import { Outlet } from "react-router";

function PrivateRoute() {
  const { isLoading, isError } = useMeQuery();

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <h1 className="loading-title">Đang tải...</h1>
        </div>
      </div>
    );
  }

  if (isError) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
export default PrivateRoute;
