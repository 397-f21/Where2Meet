import { render } from "@testing-library/react";
import CalculateCenter from  '../components/CalculateCenter';
import {getLatLngCenter} from '../utils/utils';

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
       const places =[
        {
          lat: 10,
          lng: 20,
          address: "855 Hinman Ave.",
          meet_types: ["premise"]
        },
        {
          lat: 30,
          lng: 50,
          address:"123 my address Cir.",
          meet_types: ["premise"]
        }];
      const R = 6371e3; // metres
      const my_mdpt = getLatLngCenter(places)

      const φ1_1 = my_mdpt[0] * Math.PI/180; 
      const φ2_1 = places[0].lat * Math.PI/180;
      const Δφ_1 = (places[0].lat-my_mdpt[0]) * Math.PI/180;
      const Δλ_1 = (places[0].lng-my_mdpt[1]) * Math.PI/180;
      //const {queryByTestId} = render(<CalculateCenter places={places}/>);
      const a1 = Math.sin(Δφ_1/2) * Math.sin(Δφ_1/2) +
                Math.cos(φ1_1) * Math.cos(φ2_1) *
                Math.sin(Δλ_1/2) * Math.sin(Δλ_1/2);
      const c1 = 2 * Math.atan2(Math.sqrt(a1), Math.sqrt(1-a1));

      const d1 = R * c1; // in metres

      const φ1_2 = my_mdpt[0] * Math.PI/180; 
      const φ2_2 = places[1].lat * Math.PI/180;
      const Δφ_2 = (places[1].lat-my_mdpt[0]) * Math.PI/180;
      const Δλ_2 = (places[1].lng-my_mdpt[1]) * Math.PI/180;
      //const {queryByTestId} = render(<CalculateCenter places={places}/>);
      const a2 = Math.sin(Δφ_2/2) * Math.sin(Δφ_2/2) +
                Math.cos(φ1_2) * Math.cos(φ2_2) *
                Math.sin(Δλ_2/2) * Math.sin(Δλ_2/2);
      const c2 = 2 * Math.atan2(Math.sqrt(a2), Math.sqrt(1-a2));

      const d2 = R * c2; // in metres
      

      console.log(my_mdpt)

      //const dist_1 = [(Math.PI/180 *my_mdpt[0] + places[0].lat ) / 2, (my_mdpt[1] + places[0].lng) / 2]
      //const dist_2 = [(my_mdpt[0] + places[1].lat ) / 2, (my_mdpt[1] + places[1].lng) / 2]


      console.log(d1)
      console.log(d2)

      expect(d1).toBeCloseTo(d2,5)
      // expect(input).toBeFalsy();
      

      
    })

    it("After the Midpoint is calculated from two points with the same location, check that the Midpoint is also that location", () => {
      //Code Here
    })
    
})