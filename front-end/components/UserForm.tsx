"use client";

import { useState } from "react";
import { User, Profile, CreateUserDto, UpdateUserDto } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { toast } from "sonner";

interface UserFormProps {
  user?: User;
  profiles: Profile[];
  onSubmit: (data: CreateUserDto | UpdateUserDto) => Promise<void> | void;
  onCancel: () => void;
  loading?: boolean;
}

export function UserForm({
  user,
  profiles,
  onSubmit,
  onCancel,
  loading = false,
}: UserFormProps) {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    profileId: user?.profileId || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação para perfil obrigatório
    if (!formData.profileId) {
      toast.error("Por favor, selecione um perfil.");
      return;
    }

    if (user) {
      // Para edição, enviar apenas campos alterados
      const changes: UpdateUserDto = {};

      if (formData.firstName !== user.firstName) {
        changes.firstName = formData.firstName;
      }
      if (formData.lastName !== user.lastName) {
        changes.lastName = formData.lastName;
      }
      if (formData.email !== user.email) {
        changes.email = formData.email;
      }
      if (formData.profileId !== user.profileId) {
        changes.profileId = formData.profileId;
      }

      onSubmit(changes);
    } else {
      // Para criação, enviar todos os dados
      onSubmit(formData as CreateUserDto);
    }
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            Nome <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="Digite o nome"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">
            Sobrenome <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Digite o sobrenome"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          E-mail <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="Digite o e-mail"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="profileId">
          Perfil <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.profileId}
          onValueChange={(value) => handleInputChange("profileId", value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione um perfil" />
          </SelectTrigger>
          <SelectContent>
            {profiles.map((profile) => (
              <SelectItem key={profile.id} value={profile.id}>
                {profile.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading
            ? "Salvando..."
            : user
            ? "Atualizar Usuário"
            : "Criar Usuário"}
        </Button>
      </div>
    </form>
  );
}
