import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../../components/Form";

describe("Tests Form", () => {
  it("should render default form with one select only", () => {
    const { container, getAllByRole, queryAllByText } = render(<Form />);
    expect(container).toMatchSnapshot();
    expect(getAllByRole("combobox")).toHaveLength(1);
    expect(queryAllByText("Submit")).toHaveLength(0);
  });

  it("simulates Submit with no file uploaded", async () => {
    const { getByTestId, queryAllByText, getAllByRole, getByRole, getByText } =
      render(<Form />);
    expect(queryAllByText("Submit")).toHaveLength(0);
    expect(getAllByRole("combobox")).toHaveLength(1);

    await userEvent.selectOptions(
      getByTestId("testMakeSelect"),
      getByRole("option", { name: "Tesla" })
    );

    expect(getAllByRole("combobox")).toHaveLength(2);

    await userEvent.selectOptions(
      getByTestId("testModelSelect"),
      getByRole("option", { name: "Model S" })
    );

    expect(getAllByRole("combobox")).toHaveLength(3);

    await userEvent.selectOptions(
      getByTestId("testBadgeSelect"),
      getByRole("option", { name: "Standart" })
    );

    expect(queryAllByText("Submit")).toHaveLength(1);

    await userEvent.click(getByText("Submit"));
    expect(getByText("Please upload a file")).toBeDefined();
  });
});
