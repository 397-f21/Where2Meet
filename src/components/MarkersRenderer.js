import {Marker, Marker2} from './Markers';

export const LocationMarkerRenderer = (places) => {
    return (
        places.map((place) => (
            <Marker
                text={place.address}
                lat={place.lat}
                lng={place.lng}
            />
        ))
    )
}

export const MeetMarkerRenderer = ( meetState ) => {
    if (meetState) {
        return (
            <Marker2
                text={"PLACEHOLDER"}
                lat={meetState.meet_loc_lat}
                lng={meetState.meet_loc_lng}
            />
        )
    }    
}