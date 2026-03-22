import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/Footer";

test("renders brand name", () => {
  render(<Footer />);
  expect(screen.getByText("crisfon6")).toBeDefined();
});

test("renders social links including email", () => {
  render(<Footer />);
  expect(screen.getByText("LinkedIn")).toBeDefined();
  expect(screen.getByText("GitHub")).toBeDefined();
  expect(screen.getByText("crisfon6@crisfon6.com")).toBeDefined();
});

test("renders navigation links", () => {
  render(<Footer />);
  expect(screen.getByText("About")).toBeDefined();
  expect(screen.getByText("Projects")).toBeDefined();
  expect(screen.getByText("Newsletter")).toBeDefined();
});

test("renders copyright", () => {
  render(<Footer />);
  expect(screen.getByText(/Cristhian Fonseca/)).toBeDefined();
});
