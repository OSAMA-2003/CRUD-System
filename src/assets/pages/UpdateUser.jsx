/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useState } from "react";
import {  useNavigate ,useParams } from "react-router-dom";
import { db } from '../utils/firebase';

export default function UpdateUser() {

    const {id} = useParams()


    const navigate = useNavigate()
    

    const [formData,setFormData] = useState({
        firstName:'',
        secondName:'',
        email:'',
        phone:''
    })



      const fetchUser = async () => {

        try{
            const response = await getDoc(doc(db, "users",id));

            if (response.exists()){
                setFormData(response.data())
            }else{
                console.log("No such document found!")
            }

        }catch(error){
            console.error(error.message);
            
        }


        
    }
      useEffect(() => {
        fetchUser();
      }, [id]);

    

    

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
            
            const result = await updateDoc(doc(db,'users',id),formData)
            
            console.log( result);
            
            navigate('/dashboard');
        } catch (error) {
            console.error("Error logging in:", error.message);
        }
    };



  return (
    <>
       {/* Update User */}
   
       <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
           <h2 className="text-2xl font-bold mb-6 text-center">Update User</h2>
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
       className="w-full cursor-pointer  bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
     >
       Update User
     </button>
   </form>
   
   
        
         </div>
       </div>
       </>
  )
}
