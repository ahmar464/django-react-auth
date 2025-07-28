// import { useNavigate } from "react-router-dom";
// import { logout, isAuthenticated, getUserRole, getUserEmail } from "../auth";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const authenticated = isAuthenticated();
//   const userRole = getUserRole();
//   const userEmail = getUserEmail();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   if (!authenticated) {
//     return null; // Don't show navbar on login/register pages
//   }

//   return (
//     <nav className="bg-blue-600 text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           <h1 className="text-xl font-bold">Role-Based Auth App</h1>
//           <span className="text-sm bg-blue-700 px-2 py-1 rounded">
//             {userRole?.toUpperCase()}
//           </span>
//         </div>

//         <div className="flex items-center space-x-4">
//           <span className="text-sm">{userEmail}</span>
//           <button
//             onClick={handleLogout}
//             className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm transition"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


////////////////////////////////////////////////////////////////
// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../auth";

const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>}

      {user?.role === "admin" && <Link to="/admin">Admin</Link>}
      {user?.role === "editor" && <Link to="/editor">Editor</Link>}
      {user?.role === "viewer" && <Link to="/viewer">Viewer</Link>}

      {user && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
