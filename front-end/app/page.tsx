"use client";

import { StatsCardSkeleton } from "@/components/StatsCardSkeleton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Skeleton } from "@/components/ui/Skeleton";
import { UserCard } from "@/components/UserCard";
import { UserCardSkeleton } from "@/components/UserCardSkeleton";
import { UserForm } from "@/components/UserForm";
import {
  CreateUserDto,
  Profile,
  profilesApi,
  UpdateUserDto,
  User,
  usersApi
} from "@/lib/api";
import { Plus, Search, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfileId, setSelectedProfileId] = useState("all");

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Carregar dados
  const fetchUsers = async () => {
    try {
      const response = await usersApi.getAll();
      setUsers(response.data);
    } catch (error) {
      toast.error("Erro ao carregar usuários");
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const fetchProfiles = async () => {
    try {
      const response = await profilesApi.getAll();
      setProfiles(response.data);
    } catch (error) {
      toast.error("Erro ao carregar perfis");
      console.error("Erro ao buscar perfis:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchUsers(), fetchProfiles()]);
      setLoading(false);
    };

    loadData();
  }, []);

  // Filtrar usuários
  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedProfileId !== "all") {
      filtered = filtered.filter(
        (user) => user.profileId === selectedProfileId
      );
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedProfileId]);

  // Ações do usuário
  const handleCreateUser = async (userData: CreateUserDto) => {
    setFormLoading(true);
    try {
      await usersApi.create(userData);
      toast.success("Usuário criado com sucesso!");
      setIsCreateModalOpen(false);
      await fetchUsers();
    } catch (error: unknown) {
      const message =
        (error as any).response?.data?.message || "Erro ao criar usuário";
      toast.error(message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateUser = async (userData: UpdateUserDto) => {
    if (!editingUser) return;

    setFormLoading(true);
    try {
      await usersApi.update(editingUser.id, userData);
      toast.success("Usuário atualizado com sucesso!");
      setIsEditModalOpen(false);
      setEditingUser(null);
      await fetchUsers();
    } catch (error: unknown) {
      const message =
        (error as any).response?.data?.message || "Erro ao atualizar usuário";
      toast.error(message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteUser = async (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await usersApi.delete(userToDelete.id);
      toast.success("Usuário excluído com sucesso!");
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      await fetchUsers();
    } catch (error: unknown) {
      const message =
        (error as any).response?.data?.message || "Erro ao excluir usuário";
      toast.error(message);
    }
  };

  const handleToggleUserStatus = async (user: User) => {
    try {
      await usersApi.updateStatus(user.id, { isActive: !user.isActive });
      toast.success(
        `Usuário ${user.isActive ? "desativado" : "ativado"} com sucesso!`
      );
      await fetchUsers();
    } catch (error: unknown) {
      const message =
        (error as any).response?.data?.message ||
        "Erro ao alterar status do usuário";
      toast.error(message);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const getProfileById = (profileId: string) => {
    return profiles.find((profile) => profile.id === profileId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold">
                  Gerenciamento de Usuários
                </h1>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main Content with Skeletons */}
        <main className="container mx-auto px-4 py-8">
          {/* Filter Skeleton */}
          <Card className="flex-1 mb-8">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-full sm:w-48" />
                <Skeleton className="h-10 w-full sm:w-32" />
              </div>
            </CardContent>
          </Card>

          {/* Stats Skeletons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </div>

          {/* User Cards Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <UserCardSkeleton key={index} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters and Actions */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <Card className="flex-1">
            <CardContent className="p-4">
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

                <Select
                  value={selectedProfileId}
                  onValueChange={setSelectedProfileId}
                >
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

                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Usuário
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
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
              <CardTitle className="text-sm font-medium">
                Usuários Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {users.filter((user) => user.isActive).length}
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
                {users.filter((user) => !user.isActive).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Grid */}
        {filteredUsers.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {users.length === 0
                  ? "Nenhum usuário encontrado. Crie o primeiro usuário!"
                  : "Nenhum usuário encontrado com os filtros aplicados."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                profile={getProfileById(user.profileId)}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onToggleStatus={handleToggleUserStatus}
              />
            ))}
          </div>
        )}
      </main>

      {/* Create Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Criar Novo Usuário</DialogTitle>
          </DialogHeader>
          <UserForm
            profiles={profiles}
            onSubmit={handleCreateUser}
            onCancel={() => setIsCreateModalOpen(false)}
            loading={formLoading}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <UserForm
              user={editingUser}
              profiles={profiles}
              onSubmit={handleUpdateUser}
              onCancel={() => {
                setIsEditModalOpen(false);
                setEditingUser(null);
              }}
              loading={formLoading}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Tem certeza que deseja excluir o usuário{" "}
              <span className="font-semibold text-foreground">
                {userToDelete?.firstName} {userToDelete?.lastName}
              </span>
              ?
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Esta ação não pode ser desfeita.
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setUserToDelete(null);
              }}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDeleteUser}>
              Excluir Usuário
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
