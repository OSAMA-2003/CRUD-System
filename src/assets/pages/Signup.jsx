import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";


export default function Signup() {

    const navigate = useNavigate()

      const [formData,setFormData] = useState({
            // name:'',
            email:'',
            password:''

        })
    
        const handleInputChange = (e)=>{
            const {name , value} = e.target
            setFormData({
                ...formData,
                [name]:value
            })
        }
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(formData);
        
            try {
                // Debugging: Check if the email and password are valid
                console.log('Email:', formData.email);
                console.log('Password:', formData.password);
        
                // Create user with email and password
                const response = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        
                console.log("Signup Successfully", response);
                navigate('/login'); // Navigate to login page
            } catch (error) {
                // Debugging: Log the full error object
                console.error("Error signing up:", error);
                console.error("Error code:", error.code);
                console.error("Error message:", error.message);
            }
        };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
            required
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
              value={formData.name}
            />
          </div>
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
            className="w-full bg-blue-600 cursor-pointer  text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>

        {/* ✅ Link to login page */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>

        </p>
      </div>
    </div>
  );
}
