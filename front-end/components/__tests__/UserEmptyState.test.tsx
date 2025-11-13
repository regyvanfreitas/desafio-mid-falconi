import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserEmptyState } from "../UserEmptyState";

describe("UserEmptyState", () => {
  it("mostra mensagem de nenhum usuário", () => {
    render(<UserEmptyState hasUsers={false} />);
    expect(
      screen.getByText(/Nenhum usuário encontrado. Crie o primeiro usuário!/)
    ).toBeInTheDocument();
  });
  it("mostra mensagem de filtro vazio", () => {
    render(<UserEmptyState hasUsers={true} />);
    expect(
      screen.getByText(/Nenhum usuário encontrado com os filtros aplicados/)
    ).toBeInTheDocument();
  });
});
