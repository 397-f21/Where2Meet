import React from 'react';

const MeetingLocation = ({meetState}) => {
    console.log("meeting location debug: ", meetState);
    return (
        !meetState.meet_address?null:
        <div>
            <h2><img className="bluePin"
                     src="https://icon-library.com/images/pin-icon-png/pin-icon-png-8.jpg"
                     alt="new"/> {meetState.meet_address ? "Meet Here:" : ""} </h2>
            <div data-testId="meetLocationText"> {meetState.meet_address ? meetState.meet_address : ""}</div>
        </div>
    );

}


export default MeetingLocation;