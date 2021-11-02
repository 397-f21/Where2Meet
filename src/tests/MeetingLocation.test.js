import {render} from "@testing-library/react";
import MeetingLocation from "../components/MeetingLocation";
import CalculateCenter from '../components/CalculateCenter';
import MyGoogleMap from '../components/MyGoogleMap';
import {useState} from 'react';

describe("Meeting Location Test", () => {
    // it("the location should appear once Calculate Meeting Location button is clicked", () => {
    //     const fn = jest.fn();
    //     // const wrapper = render(<MyGoogleMap/>);

    //     const [meetState, setMeetState] = useState({
    //         meet_loc_lat: null,
    //         meet_loc_lng: null,
    //         meet_address: null,
    //         meet_types: null
    //     })

    //     // Checks to make sure that at least 2 locations are entered so that button appears
    //     var {queryByTestId} = render(<CalculateCenter places={[1, 2]} mapState={
    //         {
    //             mapApiLoaded: false,
    //             mapInstance: null,
    //             mapApi: null,
    //             geoCoder: null,
    //         }}
    //         setMeetState={setMeetState}/>);

    //     const button = queryByTestId("calculateButton");
    //     expect(button).toBeTruthy();

    //     button.click();

    //     // var {queryByTestId} = render(<CalculateCenter places={[1, 2]} state={
    //     //     {
    //     //         mapApiLoaded: false,
    //     //         mapInstance: null,
    //     //         mapApi: null,
    //     //         geoCoder: null,
    //     //     }
    //     // }/>);
    //     const input = queryByTestId("calculateButton");
    //     expect(input).toBeTruthy();

    //     // var {queryByTestId} = render(<MeetingLocation meetState={
    //     //     {
    //     //         meet_loc_lat: 10,
    //     //         meet_loc_lng: 20,
    //     //         meet_address: "855 Hinman Ave.",
    //     //         meet_types: ["premise"]
    //     //     }
    //     // }/>);
    //     // const text = queryByTestId("MeetingAddressText");
    //     // expect(text).toBeTruthy();
    // })

    it("should show the location if meeting location is a street address", () => {
        const {queryByTestId} = render(<MeetingLocation meetState={
            {
                meet_loc_lat: 10,
                meet_loc_lng: 20,
                meet_address: "855 Hinman Ave.",
                meet_types: ["premise"]
            }
        }/>);
        const text = queryByTestId("MeetingAddressText");
        expect(text).toBeTruthy();
    })

    it("should not show the location if meeting location is not a street address", () => {
        const {queryByTestId} = render(<MeetingLocation meetState={
            {
                meet_loc_lat: 10,
                meet_loc_lng: 20,
                meet_address: "855 Hinman Ave.",
                meet_types: ["plus_code"]
            }
        }/>);
        const text = queryByTestId("MeetingAddressText");
        expect(text).toBeFalsy();
    })
})