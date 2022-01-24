import { useState } from 'react'
import {GeoJSON} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
const GeoData = ({geoDataOfVisitedCountries, geoDataChangeCounter}) => {



    return (
        <div className="leaflet-map">
            <GeoJSON key={geoDataChangeCounter} data={geoDataOfVisitedCountries}/>
        </div>
    )
}
export default GeoData