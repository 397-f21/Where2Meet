import React from 'react';

const MeetingLocation = ({meetState}) => {
    return (
        !meetState?.meet_address ? null :
        <div>
                <h2><img className="bluePin"
                         src="https://icon-library.com/images/pin-icon-png/pin-icon-png-8.jpg"
                         alt="new"/> {meetState.meet_address ? "Meet Here:" : ""} 
                </h2>
                {meetState.meet_types.includes('plus_code') ? <div>You are in the middle of nowhere</div> :
                    <div data-testid="MeetingAddressText"> {meetState.meet_address ? meetState.meet_address : ""}</div>}
        </div>
    );

}


export default MeetingLocation;