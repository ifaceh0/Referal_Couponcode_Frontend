
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-6">Page Not Found</p>
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
