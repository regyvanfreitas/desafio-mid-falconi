"use client";

import { User, Profile } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Edit, Trash2, UserCheck, UserX } from "lucide-react";

interface UserCardProps {
  user: User;
  profile?: Profile;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onToggleStatus: (user: User) => void;
}

export function UserCard({
  user,
  profile,
  onEdit,
  onDelete,
  onToggleStatus,
}: UserCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Badge variant={user.isActive ? "default" : "secondary"}>
            {user.isActive ? "Ativo" : "Inativo"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {profile && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Perfil:</span>
            <Badge variant="outline">{profile.name}</Badge>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(user)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Editar
          </Button>

          <Button
            size="sm"
            variant={user.isActive ? "secondary" : "default"}
            onClick={() => onToggleStatus(user)}
            className="flex items-center gap-2"
          >
            {user.isActive ? (
              <>
                <UserX className="h-4 w-4" />
                Desativar
              </>
            ) : (
              <>
                <UserCheck className="h-4 w-4" />
                Ativar
              </>
            )}
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(user)}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
