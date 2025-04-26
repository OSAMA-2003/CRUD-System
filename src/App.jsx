
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Signup from './assets/pages/Signup'
import Login from './assets/pages/login'
import Dashboard from './assets/pages/Dashboard'
import { useAuth } from './assets/hooks/useAuth'
import PostUser from './assets/pages/PostUser'
import UpdateUser from './assets/pages/UpdateUser'
import Home from './assets/pages/Home'

function App() {

  const PrivateRoute = ({element})=>{
    const {currentUser} = useAuth()
    return currentUser ? element : <Navigate to='/login'/>
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/user" element={<PostUser/>} />
        <Route path="/user/:id/edit" element={<UpdateUser/>} />
      </Routes>
    </>
  )
}

export default App
