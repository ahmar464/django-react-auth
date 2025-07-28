import { logout } from "../auth";
import { useNavigate } from "react-router-dom";

const ViewerDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Welcome, Viewer</h2>
      <p className="mb-4">You have viewer privileges in this application.</p>
      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default ViewerDashboard;
