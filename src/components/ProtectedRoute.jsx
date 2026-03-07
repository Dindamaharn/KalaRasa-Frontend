import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
    const token = localStorage.getItem("access_token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
    if (role && user?.role?.name !== role) {
        return <Navigate to="/admin/home" replace />;
    }

    return children;
}

export default ProtectedRoute;