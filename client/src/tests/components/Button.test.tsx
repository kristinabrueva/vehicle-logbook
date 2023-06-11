import React from "react";
import { render } from "@testing-library/react";
import Button from "../../components/Button";

it("renders button correctly", () => {
  const { container, getAllByTestId, getAllByText } = render(
    <Button text="Click me" />
  );
  expect(container).toMatchSnapshot();
  expect(getAllByTestId("testButton")).toHaveLength(1);
  expect(getAllByText("Click me")).toHaveLength(1);
});
