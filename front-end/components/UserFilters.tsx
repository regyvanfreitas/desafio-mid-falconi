import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Plus, Search } from "lucide-react";
import { Profile } from "@/lib/api";

interface UserFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedProfileId: string;
  setSelectedProfileId: (value: string) => void;
  profiles: Profile[];
  onCreateUser: () => void;
}

export function UserFilters({
  searchTerm,
  setSearchTerm,
  selectedProfileId,
  setSelectedProfileId,
  profiles,
  onCreateUser,
}: UserFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Pesquisar por nome ou e-mail..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={selectedProfileId} onValueChange={setSelectedProfileId}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Filtrar por perfil" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os perfis</SelectItem>
          {profiles.map((profile) => (
            <SelectItem key={profile.id} value={profile.id}>
              {profile.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={onCreateUser} className="w-full sm:w-auto">
        <Plus className="h-4 w-4 mr-2" />
        Novo Usuário
      </Button>
    </div>
  );
}
