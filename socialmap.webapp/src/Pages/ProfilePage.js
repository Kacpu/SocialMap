import Userfront from "@userfront/react";

//Userfront.init("xbr78p4n");

export default function ProfilePage() {
    return (
        <div>
            <div>Username: {Userfront.user.name}</div>
            <div>Uuid: {Userfront.user.userUuid}</div>
            <div>Email: {Userfront.user.email}</div>
            <div>Rola: {getRole()}</div>
        </div>
    );
}

function getRole() {
    if(Userfront.user.hasRole("admin"))
        return "Admin";
    else if(Userfront.user.hasRole("editor"))
        return "Editor";
    else
        return "No one";
}