import PointForm from "../../components/Forms/PointForm";
import {useNavigate} from "react-router-dom";
import {useToast} from "@chakra-ui/react";
import {successToast} from "../../components/Toasts/ToastUtil";


export default function AddPoint(){

    const navigate = useNavigate();
    const toast = useToast();

    function handleSubmit(data){
            alert(data);
            //handle API

            successToast(toast, "added", "point", "Check map")
            navigate("/profile")
    }

    return(
        <PointForm
            title={"Add new interesting Point!"}
            subtitle={"save your favourite place 🌎"}
            submitAction={handleSubmit}
            buttonName={"Add Point"}/>
    );
}