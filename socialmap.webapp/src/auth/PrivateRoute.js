import { MsalAuthenticationTemplate} from "@azure/msal-react";
import { InteractionType} from "@azure/msal-browser";
import { loginRequest } from "../authConfig";
import {Navigate} from "react-router-dom";

export default function PrivateRoute({children}) {
    const authRequest = {
        ...loginRequest
    };

    return (
        <MsalAuthenticationTemplate
            interactionType={InteractionType.Popup}
            authenticationRequest={authRequest}
            errorComponent={() => <Navigate to="/"/>}
            loadingComponent={LoadingComponent}
        >
            {children}
        </MsalAuthenticationTemplate>
    )
}

function ErrorComponent() {
    return <p>Login failed</p>;
}

function LoadingComponent() {
    return <p>Authentication in progress...</p>;
}