import { useState } from 'react'
import {GeoJSON, MapContainer, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import GeoData from "./GeoData";

const LeafletMap = ({geoDataOfVisitedCountries, geoDataChangeCounter}) => {
    const [center, setCenter] = useState({lat:52.5, lng: 13.5})
    //const map = L.map('map').setView([52.5, 13.5], 4);
    var zoomLevel = 5

    const oldval = 0



    return (
        <div className="leaflet-map">
            <div className="map-row">
                <div className="map-col">

                    <MapContainer style={{ width: "100%", height: "100vh" }} center={center} zoom={zoomLevel} maxZoom='20' minZoom='2'>
                        {(oldval !== {geoDataChangeCounter}) ?
                        <GeoData geoDataChangeCounter={geoDataChangeCounter} geoDataOfVisitedCountries={geoDataOfVisitedCountries}/>
                        :<GeoData geoDataChangeCounter={geoDataChangeCounter} geoDataOfVisitedCountries={geoDataOfVisitedCountries}/>
                        }
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}
export default LeafletMap