import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();//prevent form from refresing 
    try {
      const res = await axios.post(`${API_URL}/auth/login`,{username,password,});
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username || username);
      localStorage.setItem("role", res.data.role);
      alert("Login Successful");
      //checks if the role is "Admin" then it will navigate to admin panel
      if (res.data.role === "Admin") {
        navigate("/admin");
      } else {// and if default value role is "User" then it will navigate to home page
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input type="text" value={username} onChange={(e) =>setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">Sign In</button>
        </form>
        <div className="mt-5 text-center">
          <h5>Don't have an account ? <Link to="/register" className="text-blue-600 hover:text-blue-700"> Register </Link>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Login;
