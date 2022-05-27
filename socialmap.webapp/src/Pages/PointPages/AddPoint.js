import PointForm from "../../components/Forms/PointForm";
import {useLocation, useNavigate} from "react-router-dom";
import {useToast} from "@chakra-ui/react";
import {successToast} from "../../components/Toasts/ToastUtil";


export default function AddPoint(){

    const navigate = useNavigate();
    const {state} = useLocation();
    const {beforeSite} = state || {};

    const toast = useToast();

    function handleSubmit(data){
            alert(data);
            //handle API
            successToast(toast, "added", "point", "Check map")
            navigate("/profile")
    }

    function handleBack() {
        let to = "";
        if(!beforeSite){
            to="/"
        } else{
            to = beforeSite;
        }
        navigate(to);
    }

    return(
        <PointForm
            backAction={handleBack}
            title={"Add new interesting Point!"}
            subtitle={"save your favourite place 🌎"}
            submitAction={handleSubmit}
            buttonName={"Add Point"}
        />
    );
}