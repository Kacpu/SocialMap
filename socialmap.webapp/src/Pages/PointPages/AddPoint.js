import PointForm from "../../components/Forms/PointForm";
import {useLocation, useNavigate} from "react-router-dom";
import {useToast} from "@chakra-ui/react";
import {errorToast, successToast} from "../../components/Toasts/ToastUtil";
import {addCategory, updateCategory} from "../../socialMapApi/categoryRequests";
import {addPoi} from "../../socialMapApi/poiRequests";


export default function AddPoint(){
    const navigate = useNavigate();
    const {state} = useLocation();
    const {beforeSite, startLocation} = state || {};

    const toast = useToast();

    async function handleSubmit(data) {
        const res = await addPoi(data);
        if (res?.ok) {
            successToast(toast, "added", "point", "Check map")
        } else {
            errorToast(toast)
        }
        handleBack();
    }

    function handleBack() {
        navigate(!beforeSite ? "/" : beforeSite);
    }

    return(
        <PointForm
            action={"add"}
            backAction={handleBack}
            title={"Add new interesting Point!"}
            subtitle={"save your favourite place 🌎"}
            submitAction={handleSubmit}
            buttonName={"Add Point"}
            defaultValues={startLocation}
        />
    );
}