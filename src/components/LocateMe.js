import React from "react";

export const LocateMe = ({place, mapState, places, setPlaces, setZoom}) => {

    const locate = () => {
        const { mapApi } = mapState;
        const geocoder = new mapApi.Geocoder();
    
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
    
            geocoder.geocode({ 'location': { lat: lat, lng: lng } }, (results, status) => {
                console.log(results);
                console.log(status);
                if (status === 'OK') {
                    if (results[0]) {
                        setZoom(15);
                        const newPlace =
                        {
                            place: [],
                            lat: lat,
                            lng: lng,
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
        });
    }
    
    return (
        <>
            <button data-testid="LocateMeButton" className="btn btn-outline-secondary btn-sm m-3"
                    onClick={locate}>
                Locate Me!
            </button>
        </>
    )
}

if ('geolocation' in navigator) {
    
}