import { render, screen } from "@testing-library/react";
import { UserCard } from "../UserCard";

const mockUser = {
  id: "1",
  firstName: "João",
  lastName: "Silva",
  email: "joao@email.com",
  birthDate: "1990-01-01",
  isActive: true,
  profileId: "1",
  createdAt: "2023-01-01T00:00:00.000Z",
  updatedAt: "2023-01-01T00:00:00.000Z",
};

const mockProfile = {
  id: "1",
  name: "Admin",
  description: "Administrator profile",
};

const mockProps = {
  user: mockUser,
  profile: mockProfile,
  onEdit: jest.fn(),
  onDelete: jest.fn(),
  onToggleStatus: jest.fn(),
};

describe("UserCard Component", () => {
  it("renders without crashing", () => {
    render(<UserCard {...mockProps} />);
    // Simple test to ensure component renders
    expect(screen.getByText("João Silva")).toBeTruthy();
  });

  it("displays user email", () => {
    render(<UserCard {...mockProps} />);
    expect(screen.getByText("joao@email.com")).toBeTruthy();
  });

  it("displays profile name", () => {
    render(<UserCard {...mockProps} />);
    expect(screen.getByText("Admin")).toBeTruthy();
  });

  it("renders edit button", () => {
    render(<UserCard {...mockProps} />);
    const editButtons = screen.getAllByRole("button");
    expect(editButtons.length).toBeGreaterThan(0);
  });
});
