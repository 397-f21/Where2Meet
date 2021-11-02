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
      // const {queryByTestId} = render(<CalculateCenter places={[1, 5]}/>);
      // const input = queryByTestId("calculateButton");
      // expect(input).toBeFalsy();
    })

    it("After the Midpoint is calculated from two points with the same location, check that the Midpoint is also that location", () => {
      //Code Here
    })
    
})