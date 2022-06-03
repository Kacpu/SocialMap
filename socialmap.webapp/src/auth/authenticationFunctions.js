import Userfront from "@userfront/react";

//Userfront.init("xbr78p4n");

function isUserAuthenticated() {
    return Userfront.tokens.accessToken;
}

function getRole() {
    if (Userfront.user.hasRole("admin"))
        return "Admin";
    else if (Userfront.user.hasRole("editor"))
        return "Editor";
    else
        return "User";
}

function isMod(){
    return (Userfront.user?.hasRole("admin") || Userfront.user?.hasRole("editor"));
}

export {isUserAuthenticated, isMod}