import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserDeleteModal } from "../UserDeleteModal";

describe("UserDeleteModal", () => {
  it("renderiza modal de exclusão", () => {
    render(
      <UserDeleteModal
        open={true}
        onOpenChange={() => {}}
        user={{
          id: "1",
          firstName: "A",
          lastName: "B",
          email: "a@b.com",
          isActive: true,
          profileId: "1",
        }}
        onCancel={() => {}}
        onConfirm={() => {}}
        loading={false}
      />
    );
    expect(screen.getByText(/Confirmar Exclusão/)).toBeInTheDocument();
    expect(screen.getByText(/Cancelar/)).toBeInTheDocument();
    expect(screen.getByText(/Excluir Usuário/)).toBeInTheDocument();
  });
});
