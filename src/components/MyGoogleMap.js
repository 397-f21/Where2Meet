// MyGoogleMaps.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import GoogleMapReact from 'google-map-react';

import styled from 'styled-components';

import AutoComplete from './Autocomplete';
import { Marker, Marker2 } from './Markers';

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;
//begin changes

const rad2degr = (rad) => {
    return rad * 180 / Math.PI;
}

const degr2rad = (degr) => {
    return degr * Math.PI / 180;
}

// Get Current Location Coordinates
function MyGoogleMap() {
    useEffect(() => {
        setCenter([42.0494669, -87.688195]);
        setCurrentCoordinates([42.0494669, -87.688195]);
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

    const [currentCoordinates, setCurrentCoordinates] = useState([]);

    const [center, setCenter] = useState([]);

    const [draggable, setDraggable] = useState(true);

    const [zoom, setZoom] = useState(9);

    const [places, setPlaces] = useState([]);

    const onMarkerInteraction = (childKey, childProps, mouse) => {
        setDraggable(false);
        setCurrentCoordinates([mouse.lat, mouse.lng])
    }

    const onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
        setDraggable(true);
        _generateAddress();
    }

    const _onChange = ({ center, zoom }) => {
        console.log("center:", center);
        setCenter(center);
        setZoom(zoom);
    }

    const _generateAddress = (place) => {
        const { mapApi } = mapState;

        if (!place) {
            return;
        }

        const geocoder = new mapApi.Geocoder;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        geocoder.geocode({ 'location': { lat: lat, lng: lng } }, (results, status) => {
            console.log(results);
            console.log(status);
            if (status === 'OK') {
                if (results[0]) {
                    setZoom(12);
                    const newPlace =
                    {
                        place: place,
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        address: results[0].formatted_address
                    }
                    setPlaces([...places, newPlace]);
                    console.log("places:", places);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
    //I wanna change this function its outdated (rob)
    const getLatLngCenter = () => { //latLngInDegr) {
        var places_length = places.length
        var sumX = 0;
        var sumY = 0;
        var sumZ = 0;

        var lat;
        var lng


        for (var i = 0; i < places_length; i++) {
            lat = degr2rad(places[i].lat);
            lng = degr2rad(places[i].lng);
            // sum of cartesian coordinates
            sumX += Math.cos(lat) * Math.cos(lng);
            sumY += Math.cos(lat) * Math.sin(lng);
            sumZ += Math.sin(lat);
        }

        var avgX = sumX / places_length;
        var avgY = sumY / places_length;
        var avgZ = sumZ / places_length;

        // convert average x, y, z coordinate to latitude and longtitude

        lng = Math.atan2(avgY, avgX);
        var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
        lat = Math.atan2(avgZ, hyp);

        return [rad2degr(lat), rad2degr(lng)];
    }

    const _onClick = (value) => {
        setCurrentCoordinates([value.lat, value.lng])
    }

    const apiHasLoaded = (map, maps) => {
        console.log('apiIsLoaded');
        setMapState({
            ...mapState,
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        })

        _generateAddress();
    };

    const addPlace = (place) => {
        _generateAddress(place);
    }

    const addressRenderer = () => {
        return (
            <>
                {places.map((place, ind) => (
                    <div class="card-text"><b>Person {ind + 1}:</b> <span>{place.address}</span></div>
                ))}
            </>
        )
    }

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


    const CalculateCenter = () => {
        return (
            <>
                <button className="btn btn-outline-secondary btn-sm m-3"
                    onClick={() => {
                        const coords = getLatLngCenter();
                        setMeetState({
                            meet_loc_lat: coords[0],
                            meet_loc_lng: coords[1],
                            meet_address: generateAddressForCenter(coords[0], coords[1])
                        });
                        setCenter([coords[0], coords[1]])
                        var markers = places;//some array
                        var bounds = new window.google.maps.LatLngBounds();
                        for (var i = 0; i < markers.length; i++) {
                            bounds.extend(markers[i]);
                        }
                        mapState.mapInstance.fitBounds(bounds);
                        console.log(meetState.meet_address);
                    }}>

                    Calculate Meeting Location
                </button>
            </>
        )
    }

    const generateAddressForCenter = (lat, lng) => {
        const {
            mapApi
        } = mapState;

        if (!lat || !lng) {
            return;
        }

        const geocoder = new mapApi.Geocoder;

        console.log("gen called")
        geocoder.geocode({ 'location': { lat: lat, lng: lng } }, (results, status) => {
            console.log(results);
            console.log(status);
            if (status === 'OK') {
                if (results[0]) {
                    console.log("Meet Location: ", results[0].formatted_address)
                    setMeetState({
                        meet_loc_lat: lat,
                        meet_loc_lng: lng,
                        meet_address: results[0].formatted_address
                    });
                    return results[0].formatted_address;
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
    return (
        <Wrapper>
            <div className="row row-header">
                <div className="col-6" style={{ height: '65vh', width: '50%' }}>
                    <GoogleMapReact
                        center={center}
                        zoom={zoom}
                        draggable={draggable}
                        onChange={_onChange}
                        onChildMouseDown={onMarkerInteraction}
                        onChildMouseUp={onMarkerInteractionMouseUp}
                        onChildMouseMove={onMarkerInteraction}
                        onChildClick={() => console.log('child click')}
                        onClick={_onClick}
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
                        {console.log(meetState)}
                        {markerRenderer()}


                    </GoogleMapReact>
                </div>
                {mapState.mapApiLoaded && (
                    <div className="col-6">
                        <div>
                            <AutoComplete map={mapState.mapInstance} mapApi={mapState.mapApi} addplace={addPlace} />
                        </div>
                        <div className="card m-2 p-2 scroll">
                            <h5 class="card-title"><img class="redPin"
                                src="https://icon-library.com/images/pin-icon-png/pin-icon-png-9.jpg"
                                alt="new"></img>People:
                            </h5>
                            {addressRenderer()}
                        </div>

                        <div>
                            {places.length < 2 ? "Add at least 2 locations to calculate the meeting location" :
                                <CalculateCenter />}
                        </div>

                        {meetState.meet_address === null ? '' :
                            <div className="card m-2 p-2 scroll align-items-center justify-content-center">
                                {meetState.meet_address &&
                                    <div>
                                        <h2><img class="bluePin"
                                            src="https://icon-library.com/images/pin-icon-png/pin-icon-png-8.jpg"
                                            alt="new" /> {meetState.meet_address ? "Meet Here:" : ""} </h2>
                                        <div> {meetState.meet_address ? meetState.meet_address : ""}</div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                )}
            </div>
        </Wrapper>
    );

}



export default MyGoogleMap;