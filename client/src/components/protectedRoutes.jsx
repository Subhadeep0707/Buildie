import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  // NOT LOGGED IN
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // LOGGED IN
  return children;
};

export default ProtectedRoute;
