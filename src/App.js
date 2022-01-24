import './App.css';
import Header from './components/Header'
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { useState } from 'react'
import Login from "./components/Login";
import {Grid, Paper} from "@material-ui/core/"
import mapData from "./data/countries.json";
import Space from "./components/Space";
import Button from "./components/Button";
import {GeoJSON, MapContainer, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
const BASE_URL = "https://nodereiseapp.herokuapp.com";



const  App = () => {

    const [geoDataOfVisitedCountries, setGeoDataOfVisitedCountries] = useState([])
    const [geoDataChangeCounter, setGeoDataChangeCounter] = useState(0)

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [showAddJourney, setShowAddJourney] = useState(false)
    const [addCountry, setAddCountry] = useState('')

    const [countryNamesVisited, setCountryNamesVisited] = useState([])
    const [journeys, setJourneys] = useState(
        [/*{
        id: 0,
        name: 'Germany journey',
        country: 'Germany',
        startDate: '01.01.2002',
        endDate: '01.02.2003',
    },
        {
            id: 1,
            name: 'Journey to France',
            country: 'France',
            startDate: '01.01.2002',
            endDate: '01.02.2003',
        }*/
        ])

    //geo stuff

    const [center, setCenter] = useState({lat:52.5, lng: 13.5})
    var zoomLevel = 5


    const setGeoData = () => {
        const features = mapData.features;
        setGeoDataOfVisitedCountries(features.filter((feature) => !countryNamesVisited.includes(feature.properties.ADMIN)))
        setGeoDataChangeCounter( geoDataChangeCounter + 1)
        //console.log(features)
    }

    const onEachCountry = (country, layer) => {
        const countryName = country.properties.ADMIN
        //console.log(countryName)
        layer.bindPopup(countryName)
        layer.on({
            click: (e) => {
                setAddCountry('')
                setShowAddJourney(false)
                setAddCountry(countryName)
                setShowAddJourney(true)
                //console.log(e)
            }
        })
    }

    ////////////// end of geo stuff

    // db stuff start

    const addJourneyToDb = async (id, name, country, startDate, endDate) => {
//        const addJourneyToDb = async (id, name, country, startDate, endDate) => {
        //const storeUrl = `${BASE_URL}/journey?id=${id}&name=${name}&country=${country}&startDate=${startDate}&endDate=${endDate}`;
        const storeUrl = `${BASE_URL}/journey`;
        console.log('addCoutneyToDb called with url ', storeUrl);
        const response = await fetch(storeUrl, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                name: name,
                country: country,
                startDate: startDate,
                endDate: endDate
            }),
        });
        return response.status === 200;
    }

    const getJourneysFromDb = async () => {
        const response = await fetch(`${BASE_URL}/journeys`);
        const json = await response.json();
        return json;
    }

    const deleteJourneyFromDB = async (name) => {
        const storer = `${BASE_URL}/journey`;

        const response = await fetch(storer, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
            })
        });
    }

    const editJourneyFromDB = async (id, name, country, startDate, endDate) => {
        const storer = `${BASE_URL}/journey`;

        const response = await fetch(storer, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                name,
                country,
                startDate,
                endDate
            })
        });
    }


    // db stuff end

    // Add Journey
    const addJourney = (journey) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const newJourney = {id, ...journey}
        //const success = addJourneyToDb(newJourney.id, newJourney.name, newJourney.country, newJourney.startDate, newJourney.endDate)
        //const success = addJourneyToDb(newJourney.id, newJourney.name, newJourney.country, newJourney.startDate, newJourney.endDate)
        const success = true
        if(success) {
            setJourneys([...journeys, newJourney])
            setCountryNamesVisited([...countryNamesVisited, newJourney.country])
            setGeoData()
        }
    }

    // Delete Journey
    const deleteJourney = (id) => {
        const journey = journeys.filter((journey) => journey.id === id)
        setJourneys(journeys.filter((journey) => journey.id !== id))
        setCountryNamesVisited(countryNamesVisited.filter((countries) => countries !==journey[0].country))
        setGeoData()
        //console.log('delete', id)
        //setGeoData()
    }

    //Change Journey
    const changeJourney = (changeJourney) => {
        deleteJourney(changeJourney.id)
        setJourneys([...journeys, changeJourney])
    }

    // logout
    const logout = () => {
        setIsLoggedIn(false)
        //remove lists of saved data
    }

    //login
    const login = () => {
        setIsLoggedIn(true);
        setShowAddJourney(false);
        setGeoData();
    }


  return (
    <div className="App">
        <Grid container>
            <Grid item xs ={12}>
                <Paper>
                    <Header/>
                </Paper>
            </Grid>
            <Grid item xs ={12}>
                <Paper>
                    <Navbar  isLoggedIn={isLoggedIn} logout={logout}/>
                </Paper>
            </Grid>
            <Grid item xs ={12}>
                <Paper>
                    {!isLoggedIn && <Login onLogin={login} /> }
                </Paper>
            </Grid>
            <Grid item xs ={12}>
                <Paper>
                    {isLoggedIn ?
                        <MapContainer style={{ width: "100%", height: "75vh" }} center={center} zoom={zoomLevel} maxZoom='20' minZoom='2'>

                            <GeoJSON index={geoDataChangeCounter} key={geoDataChangeCounter}
                                     data={geoDataOfVisitedCountries} onEachFeature={onEachCountry}/>

                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                            />
                        </MapContainer>
                        : ''}
                </Paper>
            </Grid>
            <Grid item xs ={12}>
                <Paper>
                {isLoggedIn ?
                    <Body journeys = {journeys} onDelete={deleteJourney} onAdd={addJourney}
                          showAddJourney={showAddJourney} onAddToggle={()=> setShowAddJourney(!showAddJourney)}
                          changeJourney={changeJourney} addCountry={addCountry}/>
                    : ''}
                </Paper>
            </Grid>
            <Grid item xs ={12}>
                <Paper>
                    <Footer/>
            </Paper>
        </Grid>
        </Grid>
        <Space/>
    </div>
  )
}

export default App;
