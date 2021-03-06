import React from "react";
import CalculateCenter from "./CalculateCenter";
import MeetingLocation from "./MeetingLocation";
import AddressRenderer from './AddressRenderer';
import NearbySearch from "./NearbySearch";
import { useEffect } from "react";
import RecomList from "./RecomList";

export default function AddressSidebar({ mapState, meetState, setMeetState, places, setPlaces, recoms, setRecoms, setCenter, setZoom }) {
    const recenter = (lat, lng) => {
        setZoom(18);
        setCenter([lat, lng]);
    }

    useEffect(() => {
        setMeetState({
            meet_loc_lat: null,
            meet_loc_lng: null,
            meet_address: null,
            meet_types: null
        })
    }, [places, setMeetState])

    if (mapState.mapApiLoaded) {
        return (
            <>
                {places.length === 0 ? null :
                    <>
                        <h5 className="card-title"><img className="redPin"
                            src="https://icon-library.com/images/pin-icon-png/pin-icon-png-9.jpg"
                            alt="new" />People:
                        </h5>
                        <div className="card-lg m-2 p-2 scroll">
                            <AddressRenderer places={places} setPlaces={setPlaces} meetState={meetState} mapState={mapState} />
                        </div>
                    </>
                }
                <div>
                    <CalculateCenter places={places} mapState={mapState} setMeetState={setMeetState}
                        setCenter={setCenter} />
                </div>
                {!meetState?.meet_address || meetState?.meet_types?.includes('plus_code') ? null :
                    <>
                        <MeetingLocation meetState={meetState} />
                        <div className="card m-2 p-2 scroll customizedCard">
                            <NearbySearch meetState={meetState} setRecoms={setRecoms}
                                keyword={''} mapState={mapState}>
                            </NearbySearch>

                            <RecomList recoms={recoms} recenter={recenter} />

                        </div>
                    </>

                }
            </>
        )
    } else return (<></>);
}