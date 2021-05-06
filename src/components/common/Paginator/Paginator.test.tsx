import Paginator from "./Paginator";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

describe("Paginator contains", () => {
  test("Only Next button", () => {
    render(
      <Paginator
        totalItemsCount={11}
        pageSize={1}
        currentPage={1}
        portionSize={10}
        onPageChanged={() => {}}
      />
    );
    expect(screen.getByRole("button")).toHaveTextContent("Next");
    expect(screen.getByRole("button")).not.toHaveTextContent("Previous");
  });
  test("Previous and Next buttons", () => {
    render(
      <Paginator
        totalItemsCount={21}
        pageSize={1}
        currentPage={11}
        portionSize={10}
        onPageChanged={() => {}}
      />
    );
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
  test("only Previous button", () => {
    render(
      <Paginator
        totalItemsCount={21}
        pageSize={1}
        currentPage={1}
        portionSize={10}
        onPageChanged={() => {}}
      />
    );
    fireEvent.click(screen.getByText("Next"));
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Previous")).toBeInTheDocument();
  });
});
