import { Route, BrowserRouter as Router, Routes } from "react-router";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import UserProfile from "@/pages/HOCDemo/components/UserProfile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Page phải đăng nhập mới được vào */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          {/* Auth Pages */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
