import React, {useEffect, useState} from "react";
import './MapMarkers.js.css'
import {POIMock} from "../../mocks/POIMock";
import CustomMarker from "./CustomMarker";

const ReactDOMServer = require('react-dom/server');

function GetMarkers(props) {

    const [markers, setMarkers] = useState([]);

    useEffect(()=>{
        let data = initialLoad(props.poiName);
        setMarkers(data);
    },[props.poiName])

    function initialLoad(poiName){
        //fetch from API
        //console.log("load Markers")
        //console.log("poiName:" + poiName)
        return POIMock.filter(x => x.Name.toLowerCase().includes(poiName.toLowerCase()));

    }

    return (
        <div>
            {markers.map(data => (
            <CustomMarker key={data.Id} data={data}/>
            ))}
        </div>
    );
}

export default GetMarkers;