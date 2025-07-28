// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import EditorDashboard from "./pages/EditorDashboard";
import ViewerDashboard from "./pages/ViewerDashboard";
import OAuthCallback from "./pages/OAuthCallback";
import OAuthError from "./pages/OAuthError";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/oauth/callback/" element={<OAuthCallback />} />
        <Route path="/oauth/error" element={<OAuthError />} />
        <Route path="/oauth/error/" element={<OAuthError />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/editor"
          element={
            <PrivateRoute allowedRoles={["editor"]}>
              <EditorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/viewer"
          element={
            <PrivateRoute allowedRoles={["viewer"]}>
              <ViewerDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
