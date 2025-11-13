import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserEditModal } from "../UserEditModal";

describe("UserEditModal", () => {
  it("renderiza modal de edição", () => {
    render(
      <UserEditModal
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
        profiles={[]}
        onSubmit={() => {}}
        onCancel={() => {}}
        loading={false}
      />
    );
    expect(screen.getByText(/Editar Usuário/)).toBeInTheDocument();
  });
});
