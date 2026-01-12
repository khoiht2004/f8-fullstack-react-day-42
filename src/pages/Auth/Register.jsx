import { Link, useNavigate } from "react-router";
import { useRegisterMutation } from "../../services/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas/registerSchema";
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();
  const [register, response] = useRegisterMutation();

  // React Hook Form + Zod resolver
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur", // Validate khi blur
  });

  useEffect(() => {
    if (response.isSuccess) {
      const accessToken = response?.data?.access_token;
      const refreshToken = response?.data?.refresh_token;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/");
    }
  }, [navigate, response]);

  const onSubmit = async (data) => {
    try {
      const result = await register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });

      return result;
    } catch (error) {
      console.error("Đã xảy ra lỗi: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-pink-100 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Last Name & First Name */}
            <div className="flex gap-4">
              {/* Last Name */}
              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Họ
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...registerField("lastName")}
                  placeholder="Họ"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 placeholder-gray-400 ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* First Name */}
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tên
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...registerField("firstName")}
                  placeholder="Tên"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 placeholder-gray-400 ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
            </div>

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
                id="email"
                {...registerField("email")}
                placeholder="Email"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 placeholder-gray-400 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
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
                id="password"
                {...registerField("password")}
                placeholder="••••••••"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 placeholder-gray-400 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nhập lại mật khẩu
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...registerField("confirmPassword")}
                placeholder="••••••••"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 placeholder-gray-400 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 cursor-pointer transition duration-200"
            >
              {response.isLoading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-8 text-gray-600">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-purple-600 font-semibold hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
