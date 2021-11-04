import React from "react";
import CalculateCenter from "./CalculateCenter";
import MeetingLocation from "./MeetingLocation";
import AddressRenderer from './AddressRenderer';
import NearbySearch from "./NearbySearch";

export default function AddressSidebar({ mapState, meetState, setMeetState, places, setPlaces, recoms, setRecoms, setCenter, setZoom }) {
    const recenter = (lat, lng) => {
        setZoom(18);
        setCenter([lat, lng]);
    }

    if (mapState.mapApiLoaded) {
        return (
            <>
                {places.length === 0 ? null : 
                    <div className="card m-2 p-2 scroll">
                        <h5 className="card-title"><img className="redPin"
    src="https://icon-library.com/images/pin-icon-png/pin-icon-png-9.jpg"
    alt="new"/>People:
                        </h5>
                        <AddressRenderer places={places} setPlaces={setPlaces} />
                    </div>
                }
                <div>
                    <CalculateCenter places={places} mapState={mapState} setMeetState={setMeetState}
                        setCenter={setCenter} />
                </div>
                <MeetingLocation meetState={meetState}></MeetingLocation>
                {!meetState?.meet_address || meetState?.meet_types?.includes('plus_code') ? null : 
                    <div className="card m-2 p-2 scroll">
                        <NearbySearch meetState={meetState} radius={500} setRecoms={setRecoms}
                                    type={'restaurant'} keyword={''} mapState={mapState}>
                        </NearbySearch>
                        
                        <div class="row m-1">
                            {recoms.map((recom) => (
                                <div className="card p-1 col-md-6 col-sm-12" onClick={() => {recenter(recom.lat(), recom.lng())}}>
                                    {recom.name}
                                </div>
                            ))}
                        </div>

                    </div>
                }
            </>
        )
    } else return (<></>);
}