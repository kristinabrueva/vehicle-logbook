import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("renders App", () => {
  const { container, getAllByTestId } = render(<App />);
  expect(container).toMatchSnapshot();
  expect(getAllByTestId("testApp")).toHaveLength(1);
});
