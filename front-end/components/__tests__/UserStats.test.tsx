import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserStats } from "../UserStats";

describe("UserStats", () => {
  const users = [
    {
      id: "1",
      firstName: "A",
      lastName: "B",
      email: "a@b.com",
      isActive: true,
      profileId: "1",
    },
    {
      id: "2",
      firstName: "C",
      lastName: "D",
      email: "c@d.com",
      isActive: false,
      profileId: "2",
    },
  ];

  it("mostra estatísticas corretas", () => {
    render(<UserStats users={users} />);
    expect(screen.getByText("Total de Usuários")).toBeInTheDocument();
    expect(screen.getByText("Usuários Ativos")).toBeInTheDocument();
    expect(screen.getByText("Usuários Inativos")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    const ones = screen.getAllByText("1");
    expect(ones).toHaveLength(2);
  });
});
