import React from 'react';


function callback(results, status) {
    console.log(status);
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
    }
}


const NearbySearch = ({meetState, radius, type, keyword, mapState}) => {


    let lat = meetState.meet_loc_lat;
    let lng = meetState.meet_loc_lng;
    const search = () => {
        let loc = new window.google.maps.LatLng(lat, lng);
        let request = {
            location: loc,
            radius: radius,
            type: [type],
            keyword: keyword,
        };
        console.log(request);

        let service = new window.google.maps.places.PlacesService(mapState.mapInstance);
        service.nearbySearch(request, callback);
    }
    return (
        <>
            {meetState.meet_address?
                <button data-testid="searchButton" className="btn btn-outline-secondary btn-sm m-3"
                        onClick={search}>
                    Search Nearby
                </button>
                : <></>
            }
        </>
    )
}

export default NearbySearch;

