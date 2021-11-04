import React from 'react';
import './AddressSidebar.css';

const AddressRenderer = ({ places, setPlaces }) => (
    <>
        {places.length > 0
            ?
            <ul data-cy="addressesList" data-testid="addressList">
                {places.map((place, ind) => (
                    <li className="card-text" align="left" id={`${place.address.split(' ')[1]}${ind}`} key={ind}>
                        <b>Person {ind + 1}:</b> <span>{place.address}</span>
                        <button class="btn btn-secondary" className="button" onClick={() => del(places, setPlaces, ind)}>X</button>
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

export default AddressRenderer;