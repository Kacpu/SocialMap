import React, {useState} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import './Map.js.css'
import {POIData} from "../../POIData";
import leaflet from 'leaflet'

function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click(event) {
            new leaflet.marker(event.latlng).addTo(map);
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

function Map(props) {
    return (
        <MapContainer center={[ 52.22983, 21.01173 ]} zoom={12} scrollWheelZoom={true} className={"leaflet-container"} height={'200px'} style={{height: props.heigh ? '100%' : props.height}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {POIData.map(data => (
                <Marker key={data.Id} position={[data.X, data.Y]}>
                    <Popup>
                        {data.Name}
                    </Popup>
                </Marker>
            ))}
            <LocationMarker />
        </MapContainer>
        
    );
}
export default Map;