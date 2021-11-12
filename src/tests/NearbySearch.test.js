import {render} from "@testing-library/react";
import NearbySearch from "../components/NearbySearch";

describe("Nearby Search Test", () => {

    it("should only show the Nearby Search Button if meeting location is generated", () => {
        const {queryByTestId} = render(<NearbySearch meetState={
            {
                meet_loc_lat: 10,
                meet_loc_lng: 20,
                meet_address: "855 Hinman Ave",
                meet_types: ["premise"]
            }
        } mapState = {{mapInstance: null}}/>);
        const text = queryByTestId("searchButton");
        expect(text).toBeTruthy();
    });
    it("should not show the Nearby Search Button if meeting location is blank", () => {
        const {queryByTestId} = render(<NearbySearch meetState={
            {
                meet_loc_lat: 10,
                meet_loc_lng: 20,
                meet_address: null,
                meet_types: ["premise"]
            }
        } mapState = {{mapInstance: null}}/>);
        const text = queryByTestId("searchButton");
        expect(text).toBeFalsy();
    })
})