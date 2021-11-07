import {React, useState} from 'react';
import './AddressSidebar.css';



export const AddressRenderer = ({ places, setPlaces, meetState, mapState }) => {

    const [etaIndex, setIndex] = useState(-1);
    const [eta, setETA] = useState("");

    const getEta = (origin, ind) => {
        if(!mapState.mapApiLoaded) {
            return;
        }
        const service = new window.google.maps.DistanceMatrixService();
        let loc = new window.google.maps.LatLng(origin.lat, origin.lng);
        let destination = new window.google.maps.LatLng(meetState.meet_loc_lat,meetState.meet_loc_lng)
        service.getDistanceMatrix(
            {
              origins: [loc],
              destinations: [destination],
              travelMode: 'WALKING'
            }, (response,status) => {
                setETA(response.rows[0].elements[0].duration.text);
                console.log(response,status);
            }
        );
        setIndex(ind)
    }
    return (<>
        {places.length > 0
            ?
            <ul data-testid="addressList">
                {places.map((place, ind) => (
                    <>
                        <li data-testid= "Address" className="card-text" align="left" id={`${place.address.split(' ')[1]}${ind}`} key={ind}>
                            <b>Person {ind + 1}:</b> <span style={{textOverflow: 'ellipsis'}}>{place.address}</span>

                            <span style={{width: '50px'}}>
                                <button data-testid="DeleteButton" className="btn btn-secondary" className="button" onClick={() => del(places, setPlaces, ind)}>X</button>
                                { meetState.meet_address ? <button data-testid="TravelTimeButton" className="btn btn-secondary" className="button" onClick={() =>getEta(place, ind)}>ETA↓</button> : <> </>}
                            </span>
                        </li>

                        { etaIndex === ind ? <li> {eta} </li> : <> </>}
                    </>
                ))}
            </ul>
            : <> </>}
    </>)
};

function del (places, setPlaces, ind) {
    console.log("Del pressed!");
    setPlaces([...places.filter(function(val, i) {
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
            <AddressRenderer places = {place} setPlaces = {setPlaces}/>
    )
};



export default AddressRenderer;
