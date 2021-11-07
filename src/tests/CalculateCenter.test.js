import { render } from "@testing-library/react";
import CalculateCenter from  '../components/CalculateCenter';

describe("Calculate Center Test", () => {
    it("Calculate Button shows up if two or more locations entered", () => {
      const {queryByTestId} = render(<CalculateCenter places={[1, 2]}/>);
      const input = queryByTestId("calculateButton");
      expect(input).toBeTruthy();
    })

    it("Calculate Button doesn't shows up if less than 2 locations entered", () => {
      const {queryByTestId} = render(<CalculateCenter places={[1]}/>);
      const input = queryByTestId("calculateButton");
      expect(input).toBeFalsy();
    })

    it("For any two locations, check that the Midpoint is equidistant from those locations", () => {
      //Code Here
       const {queryByTestId} = render(<CalculateCenter places={
        {
          meet_loc_lat: 10,
          meet_loc_lng: 20,
          meet_address: "855 Hinman Ave.",
          meet_types: ["premise"]
        },
        {
          meet_loc_lat: 30,
          meet_loc_lng: 50,
          meet_address:"123 my address Cir.",
          meet_types: ["premise"]
        }
       }/>);
       
      
      // const input = queryByTestId("calculateButton");
      // expect(input).toBeFalsy();
    })

    it("After the Midpoint is calculated from two points with the same location, check that the Midpoint is also that location", () => {
      //Code Here
    })
    
})