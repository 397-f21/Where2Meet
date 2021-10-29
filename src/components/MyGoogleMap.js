// MyGoogleMaps.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import GoogleMapReact from 'google-map-react';

import { Marker, Marker2 } from './Markers';
import { Wrapper } from './utils';

import AddressSidebar from './AddressSidebar';


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
        meet_address: null
    })

    const [center, setCenter] = useState([]);
    const [zoom, setZoom] = useState(9);
    const [places, setPlaces] = useState([]);

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


    const markerRenderer = () => {
        return (
            places.map((place, ind) => (
                <Marker
                    text={place.address}
                    lat={place.lat}
                    lng={place.lng}
                />
            ))
        )
    }

    return (
        <Wrapper>
            <div className="row row-header">
                <div className="col-6" style={{ height: '65vh', width: '50%' }}>
                    <GoogleMapReact
                        center={center}
                        zoom={zoom}
                        onChange={({ center, zoom }) => onMapChange(center, zoom)}
                        onChildClick={() => console.log('child click')}
                        bootstrapURLKeys={{
                            key: 'AIzaSyB3L47aJjmVQz2c0hoDP6WYD-qRaNKdnQU',
                            libraries: ['places', 'geometry'],
                        }}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
                    >

                        <Marker2
                            text={"PLACEHOLDER"}
                            lat={meetState.meet_loc_lat}
                            lng={meetState.meet_loc_lng}
                        />
                        {markerRenderer()}
                    </GoogleMapReact>
                </div>
                <div className="col-6">
                    <AddressSidebar mapState={mapState} meetState={meetState} setMeetState={setMeetState} places={places} setPlaces={setPlaces} setCenter={setCenter} setZoom={setZoom} />
                </div>
            </div>
        </Wrapper>
    );
}
export default MyGoogleMap;