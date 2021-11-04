import React from 'react';
import { useState } from 'react';


const NearbySearch = ({meetState, radius, setRecoms, type, keyword, mapState}) => {

    // const [recoms, setRecoms] = useState([]);

    let lat = meetState.meet_loc_lat;
    let lng = meetState.meet_loc_lng;

    function callback(results, status) {
        console.log(status);
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            console.log(results);
            const recs = results.slice(0, 5).map((result) => {
                return {
                    name: result.name, 
                    lat: result.geometry.location.lat,
                    lng: result.geometry.location.lng,
                }
            });
            setRecoms(recs);
        }
    }

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
            <div>
                <img className="orangePin" src="https://icon-library.com/images/pin-icon-png/pin-icon-png-11.jpg" alt="nearby"/>
                {meetState.meet_address?
                    <button data-testid="searchButton" className="btn btn-outline-secondary btn-sm m-3"
                            onClick={search}>
                        Search Nearby
                    </button>
                    : <></>
                }
            </div>
            {/* <div>
                {recoms.map((recom) => (
                    <div>
                        {recom.name}
                    </div>
                ))}
            </div> */}
        </>
    )
}

export default NearbySearch;

