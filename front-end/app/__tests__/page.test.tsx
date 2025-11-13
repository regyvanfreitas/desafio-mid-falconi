import { render } from "@testing-library/react";
import Home from "../page";

// Mock the entire API module
jest.mock("@/lib/api", () => ({
  usersApi: {
    getAll: jest.fn().mockResolvedValue({
      data: [],
    }),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    updateStatus: jest.fn(),
  },
  profilesApi: {
    getAll: jest.fn().mockResolvedValue({
      data: [],
    }),
  },
}));

// Mock toast notifications
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: jest.fn(),
  }),
}));

describe("Home Page", () => {
  it("renders without crashing", () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toBeTruthy();
  });

  it("displays main title", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Gerenciamento de Usuários")).toBeTruthy();
  });

  it("has basic page structure", () => {
    const { container } = render(<Home />);

    // Should have header and main sections
    expect(container.querySelector("header")).toBeTruthy();
    expect(container.querySelector("main")).toBeTruthy();
  });

  it("renders theme toggle", () => {
    const { container } = render(<Home />);

    // Theme toggle should be present (has sun/moon icons)
    const themeButton = container.querySelector('[data-slot="button"]');
    expect(themeButton).toBeTruthy();
  });
});
