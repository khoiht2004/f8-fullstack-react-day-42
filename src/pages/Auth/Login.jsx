/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLoginMutation, useMeQuery } from "../../services/auth";

function Login() {
  const navigate = useNavigate();
  const [login, response] = useLoginMutation();
  const { isSuccess } = useMeQuery();
  const [formData, setFormData] = useState({
    email: "sondang@f8.edu.vn",
    password: "12345678",
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/profile");
    }
  }, [navigate, isSuccess]);

  useEffect(() => {
    if (response.isSuccess) {
      const { access_token, refresh_token } = response?.data;

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);

      navigate("/profile");
    }
  }, [navigate, response]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const response = login({
        email: formData.email,
        password: formData.password,
      });

      if (response.isSuccess) {
        console.log("Login successfully");

        return response;
      }

      if (response.isError) throw new Error(response.error);
    } catch (error) {
      console.error("Đã xảy ra lỗi: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={(e) => {
                  handleInputChange("email", e.target.value);
                }}
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 placeholder-gray-400"
              />
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={(e) => {
                  handleInputChange("password", e.target.value);
                }}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 placeholder-gray-400"
              />
            </div>

            {response.isError && (
              <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm font-medium">
                ⚠️ Đăng nhập thất bại
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer transition duration-200"
            >
              {response.isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center mt-8 text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
