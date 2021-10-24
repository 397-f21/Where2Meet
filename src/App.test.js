import { render } from '@testing-library/react';
import App from './App';

describe("Title Test", () => {
  it("Rendered Title", () => {
    const {getByTestId} = render(<App/>);
    const title = getByTestId("AppTitle");
    expect(title.innerHTML).toBe("Where2Meet");
  })
})
