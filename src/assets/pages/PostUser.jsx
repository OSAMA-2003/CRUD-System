import { addDoc, collection } from 'firebase/firestore';
import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from '../utils/firebase';
// import { signInWithEmailAndPassword } from "firebase/auth"; 
// import { auth } from "../utils/firebase";


export default function PostUser() {

    const navigate = useNavigate()
    

    const [formData,setFormData] = useState({
        firstName:'',
        secondName:'',
        email:'',
        phone:''
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
            
            const result = await addDoc(collection(db,'users'),formData)
            
            console.log( result);
            
            // Redirect to dashboard or home page
            navigate('/dashboard');
        } catch (error) {
            console.error("Error logging in:", error.message);
        }
    };



  return (
    <>
    {/* <div>PostUser</div> */}

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Post User</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
  <div>
    <label className="block text-gray-700 mb-1">First Name</label>
    <input
      required
      type="text"
      placeholder="Enter your first name"
      name="firstName"
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={handleInputChange}
      value={formData.firstName}
    />
  </div>

  <div>
    <label className="block text-gray-700 mb-1">Last Name</label>
    <input
      required
      type="text"
      name="secondName"
      placeholder="Enter your second name"
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={handleInputChange}
      value={formData.secondName}
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
    <label className="block text-gray-700 mb-1">Phone Number</label>
    <input
      required
      type="text"
      placeholder="Enter your phone number"
      name="phone"
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={handleInputChange}
      value={formData.phone}
    />
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 cursor-pointer  text-white py-2 rounded-md hover:bg-blue-700 transition"
  >
    Post User
  </button>
</form>


        

        
      </div>
    </div>
    </>
  )
}
