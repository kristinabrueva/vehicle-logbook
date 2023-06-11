import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "../../components/Select";

describe("Tests Select", () => {
  it("renders select correctly", () => {
    const { container, getAllByTestId, getAllByText } = render(
      <Select
        name="fruits"
        value="Apple"
        options={["Apple", "Pear", "Orange"]}
        testId="testSelect"
      />
    );
    expect(container).toMatchSnapshot();
    expect(getAllByTestId("testSelect")).toHaveLength(1);
    expect(getAllByText("fruits")).toHaveLength(1);
  });

  it("simulates selection", () => {
    const fruits = ["Apple", "Pear", "Orange"];
    const { getByTestId, getByText, getByRole } = render(
      <Select
        name="fruits"
        value="Apple"
        options={fruits}
        testId="testSelect"
      />
    );
    userEvent.selectOptions(
      getByTestId("testSelect"),
      getByRole("option", { name: "Apple" })
    );
    expect(
      (getByRole("option", { name: "Apple" }) as HTMLOptionElement).selected
    ).toBe(true);
    expect(
      (getByRole("option", { name: "Pear" }) as HTMLOptionElement).selected
    ).toBe(false);
  });
});
