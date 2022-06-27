import { render, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import App from "./App";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("test that App component doesn't render dupicate Task", () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole("button", { name: /Add/i });
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);

  fireEvent.change(inputTask, { target: { value: "History Test" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);

  expect(screen.getAllByText(/History Test/i).length).toEqual(1);
});

test("test that App component doesn't add a task without task name", () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole("button", { name: /Add/i });
  const dueDate = "05/30/2023";

  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);
  expect(screen.queryByText("05/30/2023")).toBeNull();
});

test("test that App component doesn't add a task without due date", () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole("button", { name: /Add/i });
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, { target: { value: "History Test" } });
  fireEvent.click(element);
  expect(screen.queryByText(/History Test/i)).toBeNull();
});

test("test that App component can be deleted thru checkbox", () => {
  render(<App />);

  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole("button", { name: /Add/i });
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);

  const element2 = screen.getByRole("checkbox");
  fireEvent.click(element2);
  expect(screen.queryByText(/History Test/i)).toBeNull();
});

test("test that App component renders different colors for past due events", () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole("button", { name: /Add/i });

  fireEvent.change(inputTask, { target: { value: "History Test" } });
  fireEvent.change(inputDate, { target: { value: "05/30/2022" } });
  fireEvent.click(element);

  const historyColorCheck =
    screen.getByTestId(/History Test/i).style.background;

  expect(historyColorCheck).toBe("red");

  const futureDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "Future Task" } });
  fireEvent.change(inputDate, { target: { value: futureDate } });
  fireEvent.click(element);
  const futureColorCheck = screen.getByTestId(/Future Task/i).style.background;

  expect(futureColorCheck).toBe("white");
});
