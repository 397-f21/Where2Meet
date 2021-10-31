import React from 'react';

const AddressRenderer = ({ places }) => (
    <>
        {places.length > 0
            ?
            <div data-testid="addressList">
                {places.map((place, ind) => (
                    <div className="card-text" id={`${place.address.split(' ')[1]}${ind}`} key={ind}>
                        <b>Person {ind + 1}:</b> <span>{place.address}</span>
                    </div>
                ))}
            </div>
            : <> </>}
    </>
);

export default AddressRenderer;