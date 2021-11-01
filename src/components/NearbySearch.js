import React, {useState, useEffect} from 'react';
import axios from "axios";



function callback(results, status) {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
    }
}


const NearbySearch = ({lat, lng, radius, type, keyword, map}) => {
    var loc = new window.google.maps.LatLng(lat, lng);
    let request = {
        location: loc,
        radius: radius,
        type: [type],
        keyword: keyword,
    };

    let service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
    return null;
}

export default NearbySearch;

