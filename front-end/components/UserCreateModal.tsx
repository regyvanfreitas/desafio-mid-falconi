import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { UserForm } from "@/components/UserForm";
import { Profile, CreateUserDto } from "@/lib/api";

interface UserCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profiles: Profile[];
  onSubmit: (data: CreateUserDto) => Promise<void> | void;
  onCancel: () => void;
  loading: boolean;
}

export function UserCreateModal({
  open,
  onOpenChange,
  profiles,
  onSubmit,
  onCancel,
  loading,
}: UserCreateModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Usuário</DialogTitle>
        </DialogHeader>
        <UserForm
          profiles={profiles}
          onSubmit={onSubmit}
          onCancel={onCancel}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}
