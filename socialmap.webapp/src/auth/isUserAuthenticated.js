import Userfront from "@userfront/react";

//Userfront.init("xbr78p4n");

export default function isUserAuthenticated() {
    return Userfront.tokens.accessToken;
}