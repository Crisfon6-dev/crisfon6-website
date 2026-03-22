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

test("renders dual CTA section (newsletter + contact)", () => {
  render(<Home />);
  expect(
    screen.getByText("Get a production-ready AI template every week"),
  ).toBeDefined();
  expect(screen.getByText(/Building something ambitious/)).toBeDefined();
});

test("renders stats section", () => {
  render(<Home />);
  expect(screen.getByText("Years shipping products")).toBeDefined();
  expect(screen.getByText("Users served")).toBeDefined();
});

test("renders social proof text", () => {
  render(<Home />);
  expect(
    screen.getByText("Join 500+ engineers getting weekly blueprints"),
  ).toBeDefined();
});

test("renders contact email links", () => {
  render(<Home />);
  const emailLinks = screen.getAllByText("crisfon6@crisfon6.com");
  expect(emailLinks.length).toBeGreaterThanOrEqual(1);
});
