import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "../pages/login/index";
import "@testing-library/jest-dom";
import Axios from "axios";
import { act } from "react-dom/test-utils";
import React from "react";
import AlertMessage from "../components/AlertMessage";

jest.mock("next/router", () => require("next-router-mock"));

const MONGODB_URL_BASE = process.env.DB_RENDER_URL || `http://localhost:9000`;

describe("Login Page", () => {
  // const setState = jest.fn();
  // jest.spyOn(React, "useState").mockImplementationOnce((initState) => [initState, setState]);

  test("Email and Password Inputs", () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("senha");

    fireEvent.change(emailInput, {
      target: { value: `test@gmail.com` },
    });
    fireEvent.change(passwordInput, {
      target: { value: `12341234a` },
    });

    expect(emailInput.value).toEqual(emailInput.value);
    expect(passwordInput.value).toEqual(passwordInput.value);
  });

  test("Login Successfull", async () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("senha");

    fireEvent.change(emailInput, {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "12341234a" },
    });

    // when login button is clicked
    const { data } = await Axios({
      url: `${MONGODB_URL_BASE}/user/login`,
      method: "POST",
      data: {
        email: emailInput.value,
        password: passwordInput.value,
      },
    });

    expect(data.success).toEqual(true);
  });

  test("Pop In Error from Server or User Data", async () => {
    render(<Login />);

    const loginBtn = screen.getByRole("button");

    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("senha");

    fireEvent.change(emailInput, {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "12341234b" }, // wrong password
    });

    act(() => fireEvent.click(loginBtn));

    // when login button is clicked
    await Axios({
      url: `${MONGODB_URL_BASE}/user/login`,
      method: "POST",
      data: {
        email: emailInput.value,
        password: passwordInput.value,
      },
    }).catch(async (error) => {

      expect(error.response.data.success).toEqual(false);
      expect(await screen.getByRole("alert")).toBeVisible();
    });
  });
});
