import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserFilters } from "../UserFilters";

describe("UserFilters", () => {
  const profiles = [
    { id: "1", name: "Admin" },
    { id: "2", name: "User" },
    { id: "3", name: "Guest" },
  ];

  it("renderiza os filtros e botão", () => {
    render(
      <UserFilters
        searchTerm=""
        setSearchTerm={() => {}}
        selectedProfileId="all"
        setSelectedProfileId={() => {}}
        profiles={profiles}
        onCreateUser={() => {}}
      />
    );
    expect(screen.getByPlaceholderText(/Pesquisar/)).toBeInTheDocument();
    expect(screen.getByText(/Todos os perfis/)).toBeInTheDocument();
    expect(screen.getByText(/Novo Usuário/)).toBeInTheDocument();
  });

  it("chama setSearchTerm ao digitar", () => {
    const setSearchTerm = jest.fn();
    render(
      <UserFilters
        searchTerm=""
        setSearchTerm={setSearchTerm}
        selectedProfileId="all"
        setSelectedProfileId={() => {}}
        profiles={profiles}
        onCreateUser={() => {}}
      />
    );
    fireEvent.change(screen.getByPlaceholderText(/Pesquisar/), {
      target: { value: "abc" },
    });
    expect(setSearchTerm).toHaveBeenCalledWith("abc");
  });
});
