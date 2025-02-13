import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
  const user = useSelector((state) => state.user.user);

  return user ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
