import { render } from "@testing-library/react";
import RecomList from "../../src/components/RecomList";

//test
describe('Address sidebar test for recommenndation display', () => {
    test("AddressSidebar displays no recommendations list if no recs are given", () => {
        const { queryByTestId } = render(<RecomList
            recoms={[]}
        />);
        expect(queryByTestId("recoms-list")).toBeFalsy();
    });

    test('AddressSidebar displays list of two recommendations if they are given', () => {
        const { queryByTestId } = render(<RecomList
            recoms={[
                {
                    name: "test1",
                    lat: 0,
                    lng: 0
                },
                {
                    name: "test2",
                    lat: 1,
                    lng: 1
                }
            ]}
        />);
        expect(queryByTestId("recoms-list")).toBeTruthy();
        expect(queryByTestId("recom_0")).toBeTruthy();
        expect(queryByTestId("recom_1")).toBeTruthy();
        expect(queryByTestId("recom_2")).toBeFalsy();
    });
})

