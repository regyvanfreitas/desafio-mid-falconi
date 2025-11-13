import { render } from "@testing-library/react";
import RootLayout from "../layout";

// Mock next/font
jest.mock("next/font/google", () => ({
  Inter: () => ({
    className: "font-inter",
  }),
}));

// Mock components that might have dependencies
jest.mock("@/components/ThemeProvider", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

jest.mock("@/components/ui/Sonner", () => ({
  Toaster: () => <div data-testid="toaster" />,
}));

describe("RootLayout", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(container.firstChild).toBeTruthy();
  });

  it("includes theme provider", () => {
    const { getByTestId } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(getByTestId("theme-provider")).toBeTruthy();
  });

  it("includes toaster for notifications", () => {
    const { getByTestId } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(getByTestId("toaster")).toBeTruthy();
  });

  it("wraps children properly", () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(getByText("Test Content")).toBeTruthy();
  });

  it("sets html lang attribute", () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    const htmlElement = document.documentElement;
    expect(htmlElement.getAttribute("lang")).toBe("pt-BR");
  });
});
