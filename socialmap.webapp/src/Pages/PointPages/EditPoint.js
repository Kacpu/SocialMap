import PointForm from "../../components/Forms/PointForm";
import {Link as RouterLink, useLocation, useNavigate} from "react-router-dom";
import {Button, useToast} from "@chakra-ui/react";
import {successToast} from "../../components/Toasts/ToastUtil";
import {POIToAcceptMock} from "../../mocks/POIToAcceptMock";
import {ArrowBackIcon} from "@chakra-ui/icons";
import React from "react";


export default function EditPoint(props) {
    const navigate = useNavigate();

    const {state} = useLocation();
    const {pointId, beforeSite} = state;

    const toast = useToast();

    function convertKeys(obj) {
        const newObj = Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v])
        );
        return newObj
    }

    function getPoint(id) {
        //fetch id from API

        //categoryId !!

        //Mock for tests
        //let data = POIToAcceptMock.filter(x => x.Id == id);
        let data = POIToAcceptMock;
        data = convertKeys(data[0]);
        console.log("test");
        console.log(data);
        return data;
    }

    function handleBack() {
        navigate(beforeSite);
    }

    function handleSubmit(data) {
        alert(data);
        //handle API
        successToast(toast, "edited", "point", "Check map")
        //albo do panelu moderatora - trzeba sprawdzic
        navigate(beforeSite);
    }

    return (
        <React.Fragment>
            <PointForm
                title={"Edit point!"}
                subtitle={""}
                submitAction={handleSubmit}
                backAction={handleBack}
                defaultValues={getPoint(pointId)}
                buttonName={"Edit Point"}
            />
        </React.Fragment>
    );
}