import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const MentorNavbar = () => {
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem('auth-token');
    navigate('/mentorLogin');
  }
  return (
    <nav className="flex justify-between items-center border border-b-black text-black bg-gray-200 p-4" style={{position:"sticky",top:0}}>
      {/* Logo or title */}
      <h1 className="text-3xl font-bold">CBIT</h1>
      {/* Navbar options */}
      <div className="flex space-x-4">
        <Link
          to="/mentorHome"
          className="hover:bg-blue-800 hover:text-white transition duration-300 px-3 py-2 rounded"
        >
          Home
        </Link>
        <Link
          to="/undertakingForm"
          className="hover:bg-blue-800 hover:text-white transition duration-300 px-3 py-2 rounded"
        >
          Profile
        </Link>
       
      </div>
      {/* Logout button */}
      <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-blue-800 hover:text-white transition duration-300" onClick={logout}>
        Logout
      </button>
    </nav>
  );
};

export default MentorNavbar;
