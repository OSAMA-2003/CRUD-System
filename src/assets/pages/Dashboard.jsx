import { FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    const response = await getDocs(collection(db, "users"));
    const usersList = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usersList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const handleAddUser = () => {
    navigate("/user");
  };

  const handleUpdate = (id) => {
    navigate(`/user/${id}/edit`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      fetchUsers();
    } catch (error) {
      console.error("Delete failed:", error.message);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={handleAddUser}
          className="flex items-center cursor-pointer  gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FaUserPlus />
          Add New User
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center cursor-pointer  gap-2 border border-red-500 text-red-500 px-5 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* ✅ Table Section */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-left border border-gray-300 bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Second Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-2">{user.firstName || "-"}</td>
                  <td className="px-4 py-2">{user.secondName || "-"}</td>
                  <td className="px-4 py-2">{user.email || "-"}</td>
                  <td className="px-4 py-2">{user.phone || "-"}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleView(user)}
                      className="bg-green-500 text-white cursor-pointer  px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleUpdate(user.id)}
                      className="bg-yellow-500 text-white cursor-pointer  px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white cursor-pointer  px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedUser && (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
    <div className="relative w-[50%] h-[80%] bg-white p-6 rounded-lg shadow-lg overflow-y-auto">

      <button
        onClick={() => setSelectedUser(null)}
        className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-red-500 text-xl font-bold"
      >
        &times;
      </button>






      <h2 className="text-5xl font-bold mb-20 text-center">User Details</h2>
      <div className="text-3xl">
      <p className="mb-10"><strong>First Name:</strong> {selectedUser.firstName}</p>
      <p className="mb-10"><strong>Second Name:</strong> {selectedUser.secondName}</p>
      <p className="mb-10"><strong>Email:</strong> {selectedUser.email}</p>
      <p className="mb-10"><strong>Phone:</strong> {selectedUser.phone}</p>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
