import React from "react";
import AutoComplete from "./Autocomplete";
import CalculateCenter from "./CalculateCenter";
import MeetingLocation from "./MeetingLocation";
import AddressRenderer from './AddressRenderer';
import NearbySearch from "./NearbySearch";
import { LocateMe } from "./LocateMe";
import { set } from "@firebase/database";


export default function AddressSidebar({ mapState, meetState, setMeetState, places, setPlaces, recoms, setRecoms, setCenter, setZoom }) {
    const recenter = (lat, lng) => {
        setZoom(18);
        setCenter([lat, lng]);
    }

    const addPlace = (place, mapState, places, setPlaces, setZoom) => {
        const { mapApi } = mapState;
        const geocoder = new mapApi.Geocoder();
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        console.log("Place looks like: ", place);

        geocoder.geocode({ 'location': { lat: lat, lng: lng } }, (results, status) => {
            console.log(results);
            console.log(status);
            if (status === 'OK') {
                if (results[0]) {
                    setZoom(15);
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
    };

    if (mapState.mapApiLoaded) {
        return (
            <>
                <div class="row m-1">
                    <div className="col-md-11">
                        <AutoComplete map={mapState.mapInstance} mapApi={mapState.mapApi}
                            addplace={(place) => addPlace(place, mapState, places, setPlaces, setZoom)} />
                    </div>
                    <div className="col-md-1">
                        <LocateMe mapState={mapState} places={places} setPlaces={setPlaces} setZoom={setZoom} />
                    </div>

                </div>
                {places.length === 0 ? null : 
                    <div className="card m-2 p-2 scroll">
                        <h5 className="card-title"><img className="redPin"
                            src="https://icon-library.com/images/pin-icon-png/pin-icon-png-9.jpg"
                            alt="new"></img>People:
                        </h5>
                        <AddressRenderer places={places} setPlaces={setPlaces} />
                    </div>
                }
                <div>
                    <CalculateCenter places={places} mapState={mapState} setMeetState={setMeetState}
                        setCenter={setCenter} />
                </div>
                <MeetingLocation meetState={meetState}></MeetingLocation>
                {!meetState?.meet_address || meetState?.meet_types?.includes('plus_code') ? null : 
                    <div className="card m-2 p-2 scroll">
                        <NearbySearch meetState={meetState} radius={500} setRecoms={setRecoms}
                                    type={'restaurant'} keyword={''} mapState={mapState}></NearbySearch>
                        
                        <div class="row m-1">
                            {recoms.map((recom) => (
                                <div className="card p-1 col-md-6 col-sm-12" onClick={() => {recenter(recom.lat(), recom.lng())}}>
                                    {recom.name}
                                </div>
                            ))}
                        </div>

                    </div>
                }
            </>
        )
    } else return (<></>);
}