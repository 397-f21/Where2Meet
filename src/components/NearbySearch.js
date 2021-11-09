import React, {useEffect} from 'react';
import {useState} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const NearbySearch = ({meetState, setRecoms, keyword, mapState}) => {


    const [type, setType] = useState('');
    const [radius, setRadius] = useState('');
    const animatedComponents = makeAnimated();
    const typeOptions = [
        {value: 'restaurant', label: 'Restaurant'},
        {value: 'cafe', label: 'Cafe'},
        {value: 'bar', label: 'Bar'}
    ];

    const radiusOptions = [
        {value: 500, label: '500m'},
        {value: 804, label: '0.5 miles'},
        {value: 1609, label: '1 mile'},
        {value: 2400, label: '1.5 miles'},
        {value: 3218, label: '2 miles'},
    ];
    // const [recoms, setRecoms] = useState([]);

    let lat = meetState.meet_loc_lat;
    let lng = meetState.meet_loc_lng;

    function callback(results, status) {
        console.log(status);
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            console.log(results);
            const recs = results.slice(0, 6).map((result) => {
                return {
                    name: result.name,
                    lat: result.geometry.location.lat,
                    lng: result.geometry.location.lng,
                }
            });
            setRecoms(recs);
        }
    }

    // if type and radius changed, run this hook
    useEffect(() => {
        if (mapState?.mapApiLoaded) {
            search();
        }
    }, [type, radius]);

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


    // Store the selection in to a state
    const handleChangeType = (selectedOptions) => {
        if (selectedOptions) {
            selectedOptions = selectedOptions['value'];
            setType(selectedOptions);
        }
    }

    // Store the selection in to a state
    const handleChangeRadius = (selectedOptions) => {
        if (selectedOptions) {
            selectedOptions = selectedOptions['value'];
            setRadius(selectedOptions);
        }
    }


    return (
        <>
            <div>


                {meetState.meet_address ?
                    <div className="row row-header" data-testid="searchButton">
                        <div className="col-4"><img className="orangePin"
                                                    src="https://icon-library.com/images/pin-icon-png/pin-icon-png-11.jpg"
                                                    alt="nearby"/> Search for Nearby
                        </div>
                        <Select
                            className="col-4"
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            // defaultValue={options[0]}
                            options={typeOptions}
                            onChange={handleChangeType}
                        />
                        in
                        <Select
                            className="col-3"
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            // defaultValue={options[0]}
                            options={radiusOptions}
                            onChange={handleChangeRadius}
                        /></div>
                    : <></>
                }
                <hr></hr>
            </div>
        </>
    )
}

export default NearbySearch;

