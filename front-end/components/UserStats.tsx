import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { User } from "@/lib/api";

interface UserStatsProps {
  users: User[];
}

export function UserStats({ users }: UserStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Usuários
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{users.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {users.filter((u) => u.isActive).length}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Usuários Inativos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {users.filter((u) => !u.isActive).length}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
