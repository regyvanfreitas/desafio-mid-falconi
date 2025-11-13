import { render } from "@testing-library/react";
import { act } from "react";
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
  it("renders without crashing", async () => {
    let result: ReturnType<typeof render> | undefined;
    await act(async () => {
      result = render(<Home />);
    });
    expect(result?.container.firstChild).toBeTruthy();
  });

  it("displays main title", async () => {
    let result: ReturnType<typeof render> | undefined;
    await act(async () => {
      result = render(<Home />);
    });
    expect(result?.getByText("Gestão de Usuários")).toBeTruthy();
  });

  it("has basic page structure", async () => {
    let result: ReturnType<typeof render> | undefined;
    await act(async () => {
      result = render(<Home />);
    });
    expect(result?.container.querySelector("header")).toBeTruthy();
    expect(result?.container.querySelector("main")).toBeTruthy();
    // Deve renderizar UserFilters, UserStats e UserEmptyState
    expect(result?.container.innerHTML).toContain("Novo Usuário");
    expect(result?.container.innerHTML).toContain("Total de Usuários");
  });

  it("renders theme toggle", async () => {
    let result: ReturnType<typeof render> | undefined;
    await act(async () => {
      result = render(<Home />);
    });
    // Theme toggle should be present (has sun/moon icons)
    const themeButton = result?.container.querySelector('[data-slot="button"]');
    expect(themeButton).toBeTruthy();
  });
});
