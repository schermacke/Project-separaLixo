import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("userRole");

  if (userRole !== role) {
    return <Navigate to="/acessoNegado" />;
  }

  return children;
};

export default ProtectedRoute;
