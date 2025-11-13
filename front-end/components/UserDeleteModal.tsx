import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { User } from "@/lib/api";

interface UserDeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onCancel: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export function UserDeleteModal({
  open,
  onOpenChange,
  user,
  onCancel,
  onConfirm,
  loading,
}: UserDeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja excluir o usuário{" "}
            <span className="font-semibold text-foreground">
              {user?.firstName} {user?.lastName}
            </span>
            ?
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Esta ação não pode ser desfeita.
          </p>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Excluindo...
              </>
            ) : (
              "Excluir Usuário"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
