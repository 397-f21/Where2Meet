import {React, useState} from 'react';
import './AddressSidebar.css';

export const AddressRenderer = ({ places, setPlaces }) => (
    <>
        {places.length > 0
            ?
            <ul data-testid="addressList">
                {places.map((place, ind) => (
                    <li data-testid= "Address" className="card-text" align="left" id={`${place.address.split(' ')[1]}${ind}`} key={ind}>
                        <b>Person {ind + 1}:</b> <span>{place.address}</span>
                        <button data-testid="DeleteButton" className="btn btn-secondary" className="button" onClick={() => del(places, setPlaces, ind)}>X</button>
                    </li>
                ))}
            </ul>
            : <> </>}
    </>
);

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
