import { logout } from "../auth";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Welcome, Admin</h2>
      <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>
    </div>
  );
};

export default AdminDashboard;