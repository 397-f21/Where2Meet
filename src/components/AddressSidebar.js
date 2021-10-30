import React from "react";
import AutoComplete from "./Autocomplete";
import CalculateCenter from "./CalculateCenter";
import MeetingLocation from "./MeetingLocation";

export default function AddressSidebar({mapState, meetState, setMeetState, places, setPlaces, setCenter, setZoom}) {

    const addPlace = (place, mapState, places, setPlaces, setZoom) => {
        const {mapApi} = mapState;
        const geocoder = new mapApi.Geocoder();
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        geocoder.geocode({'location': {lat: lat, lng: lng}}, (results, status) => {
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

    const AddressRenderer = () => (
        <>
            {places.map((place, ind) => (
                <div className="card-text"><b>Person {ind + 1}:</b> <span>{place.address}</span></div>
            ))}
        </>

    );

    if (mapState.mapApiLoaded) {
        return (
            <>
                <div>
                    <AutoComplete map={mapState.mapInstance} mapApi={mapState.mapApi}
                                  addplace={(place) => addPlace(place, mapState, places, setPlaces, setZoom)}/>
                </div>
                <div className="card m-2 p-2 scroll">
                    <h5 className="card-title"><img className="redPin"
                                                src="https://icon-library.com/images/pin-icon-png/pin-icon-png-9.jpg"
                                                alt="new"></img>People:
                    </h5>
                    <AddressRenderer/>
                </div>
                <div>
                    <CalculateCenter places={places} mapState={mapState} setMeetState={setMeetState}
                                     setCenter={setCenter}/>
                </div>

                <MeetingLocation meetState={meetState}></MeetingLocation>
            </>
        )
    } else return (<></>);
}