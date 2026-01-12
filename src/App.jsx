import { Route, BrowserRouter as Router, Routes } from "react-router";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Page phải đăng nhập mới được vào */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
