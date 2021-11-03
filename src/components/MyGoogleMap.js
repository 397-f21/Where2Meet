// MyGoogleMaps.js
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleMapReact from 'google-map-react';
import {MapWrapper} from '../utils/wrappers';
import {LocationMarkerRenderer, MeetMarkerRenderer, RecommendationsMarkerRenderer} from './MarkersRenderer';
import AddressSidebar from './AddressSidebar';
import {useData} from "../utils/firebase";
import { GetLocations } from './GetLocations';

// Get Current Location Coordinates
function MyGoogleMap() {
    useEffect(() => {
        setCenter([42.0494669, -87.688195]);
    }, []);

    const [mapState, setMapState] = useState({
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
        geoCoder: null,
    });

    const [meetState, setMeetState] = useState({
        meet_loc_lat: null,
        meet_loc_lng: null,
        meet_address: null,
        meet_types: null
    })

    const [center, setCenter] = useState([]);
    const [zoom, setZoom] = useState(9);
    const [places, setPlaces] = useState([]);
    const [recoms, setRecoms] = useState([]);

    const onMapChange = (center, zoom) => {
        console.log("center:", center);
        setCenter(center);
        setZoom(zoom);
    };

    const apiHasLoaded = (map, maps) => {
        setMapState({
            ...mapState,
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        });
    };
    const key = useData('Google_API_Key/Gan_Qiu')[0];
    // console.log(key);
    if (!key) {
        return null;
    }
    return (
        <MapWrapper>
            <div className="row row-header">
                <div className="col-12 col-md-6" style={{height: '63vh'}}>
                    <GetLocations mapState={mapState} places={places} setPlaces={setPlaces} setZoom={setZoom} />
                    <GoogleMapReact
                        center={center}
                        zoom={zoom}
                        onChange={({center, zoom}) => onMapChange(center, zoom)}
                        onChildClick={() => console.log('child click')}
                        bootstrapURLKeys={{
                            key: key,
                            libraries: ['places', 'geometry'],
                        }}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({map, maps}) => apiHasLoaded(map, maps)}
                    >

                    {MeetMarkerRenderer(meetState)}
                    {LocationMarkerRenderer(places)}
                    {RecommendationsMarkerRenderer(recoms)}
                    </GoogleMapReact>
                </div>
                <div className="col-12 col-md-6">
                    <AddressSidebar mapState={mapState} meetState={meetState} setMeetState={setMeetState}
                                    places={places} recoms={recoms} setPlaces={setPlaces} setRecoms={setRecoms} 
                                    setCenter={setCenter} setZoom={setZoom}/>
                </div>


            </div>
        </MapWrapper>
    );
}

export default MyGoogleMap;