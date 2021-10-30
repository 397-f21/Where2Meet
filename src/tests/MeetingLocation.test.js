import {render} from "@testing-library/react";
import MeetingLocation from "../components/MeetingLocation";

describe("Meeting Location Test", () => {
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