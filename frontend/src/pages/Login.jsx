import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom"; // If using React Router v6

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For programmatic navigation

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form refresh
    
    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const res = await login(email, password);
      
      if (res.token) {
        localStorage.setItem("token", res.token);
        // Optionally store user data
        if (res.user) localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/dashboard"); // or window.location.href = "/";
      } else {
        setError(res.message || "Login failed – invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMsg = err.response?.data?.message || "Server error. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">🔐 Login</h2>
        
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            className="w-full border p-2 mb-3 rounded focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 mb-4 rounded focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          
          {error && (
            <div className="mb-3 text-red-600 text-sm bg-red-50 p-2 rounded">
              ⚠️ {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition disabled:bg-gray-400"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-500 mt-4">
          Demo credentials: demo@example.com / password
        </p>
      </div>
    </div>
  );
}

export default Login;