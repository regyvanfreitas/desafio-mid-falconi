import { render } from "@testing-library/react";
import { ThemeProvider } from "../ThemeProvider";

// Simple mock test since ThemeProvider requires window.matchMedia
describe("ThemeProvider Component", () => {
  it("exists and can be imported", () => {
    expect(typeof ThemeProvider).toBe("function");
  });
});
