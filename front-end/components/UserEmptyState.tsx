import { Card, CardContent } from "@/components/ui/Card";
import { Users } from "lucide-react";

interface UserEmptyStateProps {
  hasUsers: boolean;
}

export function UserEmptyState({ hasUsers }: UserEmptyStateProps) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          {hasUsers
            ? "Nenhum usuário encontrado com os filtros aplicados."
            : "Nenhum usuário encontrado. Crie o primeiro usuário!"}
        </p>
      </CardContent>
    </Card>
  );
}
