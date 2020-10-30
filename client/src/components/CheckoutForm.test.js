import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  findByTestId,
} from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  const { getByTestId } = render(<CheckoutForm />);
  const header = getByTestId("form-header");
  expect(header).toHaveTextContent("Checkout Form");
});

test("form shows success message on submit with form details", async () => {
  const { getByTestId } = render(<CheckoutForm />);
  const firstName = "Matt";
  const lastName = "Bokovitz";
  const address = "211 Party Dr";
  const city = "Miami";
  const state = "Florida";
  const zip = "33139";

  const firstNameID = getByTestId("firstName");
  const lastNameID = getByTestId("lastName");
  const addressID = getByTestId("address");
  const cityID = getByTestId("city");
  const stateID = getByTestId("state");
  const zipID = getByTestId("zip");

  fireEvent.change(firstNameID, { target: { value: firstName } });
  fireEvent.change(lastNameID, { target: { value: lastName } });
  fireEvent.change(addressID, { target: { value: address } });
  fireEvent.change(cityID, { target: { value: city } });
  fireEvent.change(stateID, { target: { value: state } });
  fireEvent.change(zipID, { target: { value: zip } });
  fireEvent.click(getByTestId("checkout"));

  const successName = await waitFor(() => getByTestId("success-name"));
  const successAddress = await waitFor(() => getByTestId("success-address"));
  const successArea = await waitFor(() => getByTestId("success-area"));

  expect(successName.textContent).toBe(`${firstName} ${lastName}`);
  expect(successAddress.textContent).toBe(address);
  expect(successArea.textContent).toBe(`${city}, ${state} ${zip}`);
});
