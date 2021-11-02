import {queryAllByTestId, queryByTestId, getByTestId, render} from "@testing-library/react";
import { LocationMarkerRenderer, MeetMarkerRenderer } from "../components/MarkersRenderer";

describe("Markers Renderer Test", () => {
    it("should create one location marker for one location", () => {
        const places = [
            {
                address: "855 Hinman Ave.",
                lat: 10,
                lng: 20
            }
        ]   
        var {queryByTestId} = render(LocationMarkerRenderer(places));
        const text = queryByTestId("locationMarker");
        expect(text).toBeTruthy();
    })

    it("should create two location markers for two locations", () => {
        const places = [
            {
                address: "855 Hinman Ave.",
                lat: 10,
                lng: 20
            },
            {
                address: "533 Davis St",
                lat: 20,
                lng: 30
            }
        ]   
        var {queryAllByTestId} = render(LocationMarkerRenderer(places));
        const elements = queryAllByTestId("locationMarker");
        expect(elements).toHaveLength(2);
    })

    it("should have no location markers for no locations", () => {
        const places = []   
        var {queryByTestId} = render(LocationMarkerRenderer(places));
        const elements = queryByTestId("locationMarker");
        expect(elements).toBeNull();
    })

    it("should create a meeting marker after a meeting location is generated", () => {
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
    
    it("should create a meeting marker that is different from a location marker", () => {
        const places = [
            {
                address: "533 Davis St",
                lat: 20,
                lng: 30
            }
        ]   
        var {queryByTestId} = render(LocationMarkerRenderer(places));
        const locText = queryByTestId("locationMarker");
        var {queryByTestId} = render(<MeetMarkerRenderer meetState={
            {
                meet_loc_lat: 10,
                meet_loc_lng: 20,
                meet_address: "855 Hinman Ave.",
                meet_types: ["premise"]
            }
        }/>)
        const meetText = queryByTestId("meetMarker");
        //console.log(locText.className);
        //console.log(meetText.className);
        //compares the className of meeting markers and location markers
        expect(locText.className !=meetText.className).toBeTruthy();

    })
})