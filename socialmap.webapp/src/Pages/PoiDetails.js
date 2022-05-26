import BasePoiBox from "../components/UserPanel/BasePoiBox";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react"
import {Button, Text} from "@chakra-ui/react";


export default function PoiDetails() {

    const {id} = useParams();
    const [poiData, setPoiData]= useState([]);
    const [loading, setLoading] = useState(true);


    function fetchData(){
        var data = {
            name: "testowa",
            description: "opis punktu",
            likesNumber: 34
        }
        setPoiData(data);
        setLoading(false);
        return poiData;
    }

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <React.Fragment>
            {loading ? (
                <React.Fragment>
                    <Button isLoading={true} />
                </React.Fragment>

            ):(
                <React.Fragment>
                <Text>{id}</Text>
                <BasePoiBox poiData={poiData}/>
                </React.Fragment>
            )}

        </React.Fragment>
    );

}