import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { VITE_BACKEND_URL } from "../../../apiConfig";

function SsoLogin() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    const doSsoLogin = async () => {
      try {
        const res = await fetch(`${VITE_BACKEND_URL}/api/auth/sso-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ transferToken: token }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || err.error || "SSO login failed");
        }

        const data = await res.json();

        // Store the same way normal login does
        localStorage.setItem("token", data.token);
        localStorage.setItem("data", JSON.stringify(data));

        // Go to dashboard
        window.location.href = "/shopkeeper/dashboard";
      } catch (err) {
        console.error(err);
        alert(err.message || "SSO failed. Please login normally.");
        navigate("/signin");
      }
    };

    doSsoLogin();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-medium text-gray-700">Signing you in to Referral...</p>
      </div>
    </div>
  );
}

export default SsoLogin;