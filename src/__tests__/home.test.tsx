import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

test("renders hero heading", () => {
  render(<Home />);
  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toBeDefined();
  expect(heading.textContent).toContain("I ship FinTech at scale");
});

test("renders Featured Projects section", () => {
  render(<Home />);
  expect(screen.getByText("Featured Projects")).toBeDefined();
});

test("renders newsletter CTA", () => {
  render(<Home />);
  expect(
    screen.getByText("Get a free automation template every week"),
  ).toBeDefined();
});

test("renders stats section", () => {
  render(<Home />);
  expect(screen.getByText("Years shipping products")).toBeDefined();
  expect(screen.getByText("Users served")).toBeDefined();
});
