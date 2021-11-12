import React, { useState, useEffect } from 'react';
import './AddressSidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';




export const AddressRenderer = ({ places, setPlaces, meetState, mapState }) => {

    const [etaIndex, setIndex] = useState(-1);
    const [eta, setETA] = useState("");
    const [type, setType] = useState("DRIVING");
    const [dirURL, setURL] = useState("");
    const animatedComponents = makeAnimated();
    const typeOptions = [
        { value: 'DRIVING', label: 'Driving' },
        { value: 'WALKING', label: 'Walking' },
        { value: 'BICYCLING', label: 'Biking' },
        { value: 'TRANSIT', label: 'Transit' }
    ];

    useEffect(() => {
        setIndex(-1);
        setETA("");
    }, [places]);


    const getEta = (origin, ind, transitType) => {

        if (!mapState.mapApiLoaded) {
            return;
        }
        else if (ind === etaIndex && transitType['value'] === type['value']) {
            console.log(transitType, type);

            setIndex(-1);
            return;
        }
        const service = new window.google.maps.DistanceMatrixService();
        let loc = new window.google.maps.LatLng(origin.lat, origin.lng);
        let destination = new window.google.maps.LatLng(meetState.meet_loc_lat, meetState.meet_loc_lng)
        service.getDistanceMatrix(
            {
                origins: [loc],
                destinations: [destination],
                travelMode: transitType['value'],
            }, (response, status) => {
                setETA(response.rows[0].elements[0].duration.text);
                console.log(response, status);
            }
        );
        setType(transitType);
        setIndex(ind)
        setURL(`https://www.google.com/maps/dir/?api=1&origin=${origin.lat}%2C${origin.lng}&destination=${meetState.meet_loc_lat}%2C${meetState.meet_loc_lng}&travelmode=${transitType}`);
        console.log("url:", dirURL);

    }
    return (<>
        {places.length > 0
            ?
            <ul data-cy="addressesList" data-testid="addressList">
                {places.map((place, ind) => (
                    <>
                        <li data-testid="Address" className="card-text" id={`${place.address.split(' ')[1]}${ind}`} key={ind}>
                            <div className='d-flex flex-nowrap'>
                                <div className='p-1 me-auto text-truncate align-self-center'>
                                    <b>Person {ind + 1}:</b>
                                    <span className=''>{' ' + place.address}</span>
                                </div>
                                <div className='p-1' style={{ marginRight: '5px' }}>
                                    <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                        {meetState.meet_address ?
                                            <button
                                                data-test-id="TravelTimeButton"
                                                type="button"
                                                class="btn btn-primary dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                                onClick={() => getEta(place, ind, type)}>
                                                ETA↓
                                            </button>
                                            : <> </>}
                                        <button type="button" data-testid="DeleteButton" className="btn btn-secondary" onClick={() => del(places, setPlaces, ind)}>X</button>
                                    </div>
                                </div>
                            </div>
                            {etaIndex === ind ?
                                <>
                                    <div className='d-flex'>
                                        <Select
                                            className="p-1 align-self-center"
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            defaultValue={type}
                                            options={typeOptions}
                                            onChange={(selected) => {
                                                getEta(places[etaIndex], etaIndex, selected);
                                            }}
                                        >
                                        </Select>
                                        <span className="p-1 align-self-center">{eta !== "" ? `Estimated ${eta} to center` : 'Select a transit type'}</span>
                                        <span className="p-1 align-self-center">{dirURL !== "" && eta !== "" ?  <a target="_blank" rel="noopener noreferrer" href={dirURL}>Check Direction</a> : "" }</span>
                                    </div>
                                </>
                                : null}

                        </li>

                    </>
                ))}
            </ul>
            : <> </>}
    </>)
};

function del(places, setPlaces, ind) {
    console.log("Del pressed!");
    setPlaces([...places.filter(function (val, i) {
        return i !== ind
    })])
}

export const Wrapper = () => {
    const temp = [
        {
            address: "855 Hinman Ave.",
            lat: 10,
            lng: 20
        }
    ];
    const [place, setPlaces] = useState(temp);
    return (
        <AddressRenderer places={place} setPlaces={setPlaces} />
    )
};



export default AddressRenderer;
