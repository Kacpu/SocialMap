import {Navigate, useLocation} from "react-router-dom";
import Userfront from "@userfront/react";
import {isMod} from "./authenticationFunctions";

export default function ModRoute({ children }) {
    let location = useLocation();
    if (!isMod()) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}