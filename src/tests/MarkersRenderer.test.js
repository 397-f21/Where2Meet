import {render} from "@testing-library/react";
import CalculateCenter from  '../components/CalculateCenter';
import { MeetMarkerRenderer } from "../components/MarkersRenderer";
import App from "../App";
import { act } from "react-dom/test-utils";

describe("Markers Renderer Test", () => {
    it("should create a meeting marker when the meeting location button is clicked", () => {
        // Checks to make sure that at least 2 locations are entered so that button appears
        // var {queryByTestId} = render(<CalculateCenter places={[1, 2]} state={
        //     {
        //         mapApiLoaded: false,
        //         mapInstance: null,
        //         mapApi: null,
        //         geoCoder: null,
        //     }
        // }/>);
        // const input = queryByTestId("calculateButton");
        // expect(input).toBeTruthy();

//         // var {queryByTestId} = render(<MeetMarkerRenderer meetState={
//         //     {
//         //         meet_loc_lat: 10,
//         //         meet_loc_lng: 20,
//         //         meet_address: "855 Hinman Ave.",
//         //         meet_types: ["premise"]
//         //     }
//         // }/>);
//         // var {queryByTestId} = render(<App/>);
//         // const text = queryByTestId("meetMarker");
//         // console.log("text: ", text);
//         // expect(text).toBeTruthy();
    })
})