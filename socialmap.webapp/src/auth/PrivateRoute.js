import { useLocation, Navigate } from "react-router-dom";
import Userfront from "@userfront/react";

export default function PrivateRoute({ children }) {
    let location = useLocation();
    if (!Userfront.tokens.accessToken) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}