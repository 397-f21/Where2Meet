import React from 'react';

const MeetingLocation = ({meetState}) => {
    console.log("meeting location debug: ", meetState);
    return (
        !meetState?.meet_address ? null :
        <div className="card m-2 p-2 scroll align-items-center justify-content-center">
            <div>
                <h2><img className="bluePin"
                         src="https://icon-library.com/images/pin-icon-png/pin-icon-png-8.jpg"
                         alt="new"/> {meetState.meet_address ? "Meet Here:" : ""} </h2>
                {meetState.meet_types.includes('plus_code') ? <div>You are in the middle of nowhere</div> :
                    <div data-testId="MeetingAddressText"> {meetState.meet_address ? meetState.meet_address : ""}</div>}
            </div>
        </div>
    );

}


export default MeetingLocation;