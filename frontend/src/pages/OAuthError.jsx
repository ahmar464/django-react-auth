// src/pages/OAuthError.jsx
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

const OAuthError = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState(
    "An error occurred during login"
  );

  useEffect(() => {
    const error = searchParams.get("error");

    switch (error) {
      case "authentication_failed":
        setErrorMessage("Authentication failed. Please try again.");
        break;
      case "oauth_failed":
        setErrorMessage("Google OAuth login failed. Please try again.");
        break;
      default:
        setErrorMessage("An unexpected error occurred during login.");
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <div className="text-red-600 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Login Failed</h2>
        <p className="text-gray-600 mb-6">{errorMessage}</p>

        <div className="space-y-3">
          <Link
            to="/login"
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Try Again
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="block w-full bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default OAuthError;
