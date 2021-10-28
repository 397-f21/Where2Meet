import { render, act, fireEvent } from "@testing-library/react";
import Autocomplete from '../components/Autocomplete';
import MyGoogleMap from '../components/MyGoogleMap';


describe("Autocomplete Test", () => {
  //   it("Rendered Autocomplete", () => {
  //     const {queryByTestId} = render(<MyGoogleMap />);
  //     const input = queryByTestId("searchBar");
  //     expect(input).toBeFalsy();
  //   })

  it("Map Start", () => {
    const { queryByTestId } = render(<MyGoogleMap />);
    const input = queryByTestId("mapStart");
    expect(input.innerHTML).toBe("MapComponent");
  })



  // it("Change on input", async() => {
  //   await act(async () => {
  //     const {getByTestId} = await render(<MyGoogleMap />);
  //     const input = getByTestId("searchBar");
  //     const display = getByTestId("displaySearchBarContent")
  //     const inputWord = "1717 Ridge Ave";
  //     await fireEvent.change(input, {target: {value: inputWord}});
  //     expect(display.innerHTML).toBe(inputWord);
  //   })
  // })

  it("Rendered Autocomplete header", async () => {
    const all = <MyGoogleMap />;
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(4000);
    const { queryByTestId } = render(all);
    const input = queryByTestId("displaySearchBarContent");
    expect(input.innerHTML).toBe("123");
  })


})