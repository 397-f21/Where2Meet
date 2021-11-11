import React from 'react';

import { getLatLngCenter} from '../utils/utils';

export default function CalculateCenter({places, mapState, setMeetState, setCenter}) {

    if (places.length < 2) return <> Add at least 2 locations to calculate the meeting location </>;
    const generateAddressForCenter = (lat, lng) => {
        const {
            mapApi
        } = mapState;

        if (!lat || !lng) {
            return '';
        }

        const geocoder = new mapApi.Geocoder();

        geocoder.geocode({'location': {lat: lat, lng: lng}}, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    var type = results[0].types;
                    console.log("Meet Location Detail: ", type);
                    // plus-code implies it's not a valid street address.
                    if (type.includes('plus_code')) {
                        // window.alert('You are in the middle of no where');
                    }
                    console.log("Meet Location: ", results[0].formatted_address)
                    console.log("result looks like: ", results);
                    setMeetState({
                        meet_loc_lat: lat,
                        meet_loc_lng: lng,
                        meet_address: results[0].formatted_address,
                        meet_types: results[0].types
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

    const onCalculate = () => {
        const coords = getLatLngCenter(places);
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

    }

    return (
        <>
            <button data-testid="calculateButton" className="btn btn-outline-secondary btn-sm m-3"
                    onClick={onCalculate}>
                Calculate Meeting Location
            </button>
        </>
    )
}