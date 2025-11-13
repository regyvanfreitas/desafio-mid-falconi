import { render, screen } from "@testing-library/react";
import { ThemeToggle } from "../ThemeToggle";

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: jest.fn(),
  }),
}));

describe("ThemeToggle Component", () => {
  it("renders without crashing", () => {
    render(<ThemeToggle />);

    // Should have a button for theme toggle
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("contains theme toggle functionality", () => {
    const { container } = render(<ThemeToggle />);

    // Should render some form of toggle element
    expect(container.firstChild).toBeTruthy();
  });

  it("has accessible button", () => {
    render(<ThemeToggle />);

    // Should have at least one interactive element
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toBeTruthy();
  });
});
