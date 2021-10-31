import {render} from "@testing-library/react";
import CalculateCenter from  '../components/CalculateCenter';
import { MeetMarkerRenderer } from "../components/MarkersRenderer";

describe("Markers Renderer Test", () => {
    it("should create a meeting marker after a meeting location is generated", () => {
        // Checks to make sure that at least 2 locations are entered so that button appears
        var {queryByTestId} = render(<CalculateCenter places={[1, 2]}/>);
        const input = queryByTestId("calculateButton");
        expect(input).toBeTruthy();

        var {queryByTestId} = render(<MeetMarkerRenderer meetState={
            {
                meet_loc_lat: 10,
                meet_loc_lng: 20,
                meet_address: "855 Hinman Ave.",
                meet_types: ["premise"]
            }
        }/>);
        const text = queryByTestId("meetMarker");
        expect(text).toBeTruthy();
    })
})