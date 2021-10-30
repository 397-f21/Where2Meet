import React from 'react';

import {rad2degr, degr2rad} from '../utils/utils';

export default function CalculateCenter({places, mapState, setMeetState, setCenter}) {

    if (places.length < 2) return "Add at least 2 locations to calculate the meeting location";

    const getLatLngCenter = () => {
        var places_length = places.length
        var sumX = 0;
        var sumY = 0;
        var sumZ = 0;

        var lat;
        var lng

        for (var i = 0; i < places_length; i++) {
            lat = degr2rad(places[i].lat);
            lng = degr2rad(places[i].lng);
            sumX += Math.cos(lat) * Math.cos(lng);
            sumY += Math.cos(lat) * Math.sin(lng);
            sumZ += Math.sin(lat);
        }

        var avgX = sumX / places_length;
        var avgY = sumY / places_length;
        var avgZ = sumZ / places_length;

        lng = Math.atan2(avgY, avgX);
        var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
        lat = Math.atan2(avgZ, hyp);

        return [rad2degr(lat), rad2degr(lng)];
    }

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