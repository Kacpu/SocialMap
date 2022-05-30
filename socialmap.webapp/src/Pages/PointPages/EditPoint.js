import PointForm from "../../components/Forms/PointForm";
import {Link as RouterLink, useLocation, useNavigate} from "react-router-dom";
import {Button, Flex, Spinner, useToast} from "@chakra-ui/react";
import {errorToast, successToast} from "../../components/Toasts/ToastUtil";
import {POIToAcceptMock} from "../../mocks/POIToAcceptMock";
import {ArrowBackIcon} from "@chakra-ui/icons";
import React, {useEffect, useState} from "react";
import {getPoi, updatePoi} from "../../socialMapApi/poiRequests";


export default function EditPoint(props) {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {pointId, beforeSite} = state || {};

    const [point, setPoint] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const toast = useToast();

    useEffect(() => {
        const ac = new AbortController();
        (async () => {
            const res = await getPoi(pointId, ac.signal);
            if (res?.ok) {
                setPoint(res.data);
                setIsLoading(false);
            }
        })();
        return () => {
            ac.abort("abort from edit point")
        }
    }, [])

    async function handleSubmit(data) {
        const res = await updatePoi(pointId, data)
        if (res?.ok) {
            successToast(toast, "edited", "point", "Check map")
        } else {
            errorToast(toast)
        }
        handleBack();
    }

    function handleBack() {
        navigate(!beforeSite ? "/" : beforeSite);
    }

    // function convertKeys(obj) {
    //     const newObj = Object.fromEntries(
    //         Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v])
    //     );
    //     return newObj
    // }

    // function getPoint(id) {
    //     //fetch id from API
    //
    //     //categoryId !!
    //
    //     //Mock for tests
    //     //let data = POIToAcceptMock.filter(x => x.Id == id);
    //     let data = POIToAcceptMock;
    //     data = convertKeys(data[0]);
    //     console.log("test");
    //     console.log(data);
    //     return data;
    // }

    return (
        <React.Fragment>
            {isLoading ? (
                <Flex height={"100%"} alignItems={"center"} justifyContent={"center"}>
                    <Spinner size={"lg"} label={"loading point data"}/>
                </Flex>
            ) : (
                <PointForm
                    title={"Edit point!"}
                    subtitle={""}
                    submitAction={handleSubmit}
                    backAction={handleBack}
                    defaultValues={point}
                    buttonName={"Edit Point"}
                />
            )}
        </React.Fragment>
    );
}