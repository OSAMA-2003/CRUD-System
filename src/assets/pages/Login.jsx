import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const defaultTheme = createTheme();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in both email and password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      console.log("Login Successful", response);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error.message);

      if (error.code === "auth/user-not-found") {
        setError("Email doesn't exist. Please sign up first.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError("Failed to login. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {/* ✅ Error message */}
          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                required
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                required
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
                value={formData.password}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full cursor-pointer bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* ✅ Link to signup page */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </ThemeProvider>
  );
}
