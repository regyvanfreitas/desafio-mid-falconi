import { render, screen } from "@testing-library/react";
import { UserForm } from "../UserForm";

const mockProfiles = [
  {
    id: "1",
    name: "Admin",
    description: "Administrator profile",
  },
  {
    id: "2",
    name: "User",
    description: "Regular user profile",
  },
];

const mockProps = {
  profiles: mockProfiles,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
};

describe("UserForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<UserForm {...mockProps} />);
    expect(screen.getByText("Criar Usuário")).toBeTruthy();
  });

  it("displays form fields", () => {
    render(<UserForm {...mockProps} />);

    expect(screen.getByText("Nome")).toBeTruthy();
    expect(screen.getByText("Sobrenome")).toBeTruthy();
    expect(screen.getByText("E-mail")).toBeTruthy();
    expect(screen.getByText("Perfil")).toBeTruthy();
  });

  it("renders profile options", () => {
    render(<UserForm {...mockProps} />);

    // Profile select should be present
    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBeGreaterThan(0);
  });

  it("shows cancel button", () => {
    render(<UserForm {...mockProps} />);
    expect(screen.getByText("Cancelar")).toBeTruthy();
  });

  it("shows save button", () => {
    render(<UserForm {...mockProps} />);
    expect(screen.getByText("Criar Usuário")).toBeTruthy();
  });

  it("renders edit mode when user is provided", () => {
    const mockUser = {
      id: "1",
      firstName: "João",
      lastName: "Silva",
      email: "joao@email.com",
      birthDate: "1990-01-01",
      profileId: "1",
      isActive: true,
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
    };

    render(<UserForm {...mockProps} user={mockUser} />);
    expect(screen.getByText("Atualizar Usuário")).toBeTruthy();
  });
});
