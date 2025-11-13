import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { UserForm } from "@/components/UserForm";
import { Profile, UpdateUserDto, User } from "@/lib/api";

interface UserEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  profiles: Profile[];
  onSubmit: (data: UpdateUserDto) => Promise<void> | void;
  onCancel: () => void;
  loading: boolean;
}

export function UserEditModal({
  open,
  onOpenChange,
  user,
  profiles,
  onSubmit,
  onCancel,
  loading,
}: UserEditModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
        </DialogHeader>
        {user && (
          <UserForm
            user={user}
            profiles={profiles}
            onSubmit={onSubmit}
            onCancel={onCancel}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
