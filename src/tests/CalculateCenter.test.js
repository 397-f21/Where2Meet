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
})