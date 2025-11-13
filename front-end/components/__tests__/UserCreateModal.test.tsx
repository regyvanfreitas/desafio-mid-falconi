import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserCreateModal } from "../UserCreateModal";

describe("UserCreateModal", () => {
  it("renderiza modal de criação", () => {
    render(
      <UserCreateModal
        open={true}
        onOpenChange={() => {}}
        profiles={[]}
        onSubmit={() => {}}
        onCancel={() => {}}
        loading={false}
      />
    );
    expect(screen.getByText(/Criar Novo Usuário/)).toBeInTheDocument();
  });
});
