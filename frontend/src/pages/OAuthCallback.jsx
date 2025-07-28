import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("processing");

  useEffect(() => {
    const processOAuth = async () => {
      try {
        const accessToken = searchParams.get("access_token");
        const refreshToken = searchParams.get("refresh_token");
        const role = searchParams.get("role");
        const email = searchParams.get("email");
        const oauthSuccess = searchParams.get("oauth_success");

        console.log("OAuth Callback - Received params:", {
          accessToken: accessToken ? "present" : "missing",
          refreshToken: refreshToken ? "present" : "missing",
          role,
          email,
          oauthSuccess,
        });

        if (!accessToken || !refreshToken || !role) {
          console.error("Missing required OAuth parameters");
          setStatus("error");
          setTimeout(() => {
            navigate("/login?error=missing_tokens");
          }, 2000);
          return;
        }

        // Store tokens and user data
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userRole", role);
        localStorage.setItem("userEmail", email);

        setStatus("success");

        // Redirect to appropriate dashboard based on role
        setTimeout(() => {
          navigate(`/${role}`, { replace: true });
        }, 1000);
      } catch (error) {
        console.error("OAuth processing error:", error);
        setStatus("error");
        setTimeout(() => {
          navigate("/login?error=oauth_processing_failed");
        }, 2000);
      }
    };

    processOAuth();
  }, [navigate, searchParams]);

  const getStatusMessage = () => {
    switch (status) {
      case "processing":
        return "Processing OAuth login...";
      case "success":
        return "Login successful! Redirecting...";
      case "error":
        return "OAuth login failed. Redirecting to login page...";
      default:
        return "Processing...";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "processing":
        return "⏳";
      case "success":
        return "✅";
      case "error":
        return "❌";
      default:
        return "⏳";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md text-center max-w-md w-full mx-4">
        <div className="text-4xl mb-4">{getStatusIcon()}</div>
        <h2 className="text-xl font-semibold mb-2">OAuth Login</h2>
        <p className="text-gray-600">{getStatusMessage()}</p>
        {status === "processing" && (
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;
