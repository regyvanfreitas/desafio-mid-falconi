"use client";

import { StatsCardSkeleton } from "@/components/StatsCardSkeleton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { UserCard } from "@/components/UserCard";
import { UserCardSkeleton } from "@/components/UserCardSkeleton";
import { UserCreateModal } from "@/components/UserCreateModal";
import { UserDeleteModal } from "@/components/UserDeleteModal";
import { UserEditModal } from "@/components/UserEditModal";
import { UserEmptyState } from "@/components/UserEmptyState";
import { UserFilters } from "@/components/UserFilters";
import { UserStats } from "@/components/UserStats";
import {
  CreateUserDto,
  Profile,
  profilesApi,
  UpdateUserDto,
  User,
  usersApi,
} from "@/lib/api";
import { Users } from "lucide-react";
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

  // Loading states para cada operação
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [togglingStatusId, setTogglingStatusId] = useState<string | null>(null);

  // Carregar dados
  const fetchUsers = async (profileId?: string) => {
    try {
      const response = await usersApi.getAll(profileId);
      setUsers(response.data);
    } catch {
      toast.error("Erro ao carregar usuários");
    }
  };

  const fetchProfiles = async () => {
    try {
      const response = await profilesApi.getAll();
      setProfiles(response.data);
    } catch {
      toast.error("Erro ao carregar perfis");
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

  // Filtro por perfil
  useEffect(() => {
    fetchUsers(selectedProfileId);
  }, [selectedProfileId]);

  // Filtro de busca
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

    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  // Ações do usuário
  const handleCreateUser = async (userData: CreateUserDto) => {
    setFormLoading(true);
    try {
      await usersApi.create(userData);
      toast.success("Usuário criado com sucesso!");
      setIsCreateModalOpen(false);
      await fetchUsers(selectedProfileId);
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
      await fetchUsers(selectedProfileId);
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

    setDeletingUserId(userToDelete.id);
    try {
      await usersApi.delete(userToDelete.id);
      toast.success("Usuário excluído com sucesso!");
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      await fetchUsers(selectedProfileId);
    } catch (error: unknown) {
      const message =
        (error as any).response?.data?.message || "Erro ao excluir usuário";
      toast.error(message);
    } finally {
      setDeletingUserId(null);
    }
  };

  const handleToggleUserStatus = async (user: User) => {
    setTogglingStatusId(user.id);
    try {
      await usersApi.updateStatus(user.id, { isActive: !user.isActive });
      toast.success(
        `Usuário ${user.isActive ? "desativado" : "ativado"} com sucesso!`
      );
      await fetchUsers(selectedProfileId);
    } catch (error: unknown) {
      const message =
        (error as any).response?.data?.message ||
        "Erro ao alterar status do usuário";
      toast.error(message);
    } finally {
      setTogglingStatusId(null);
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
                <h1 className="text-2xl font-bold">Gestão de Usuários</h1>
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
              <h1 className="text-2xl font-bold">Gestão de Usuários</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <UserFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedProfileId={selectedProfileId}
            setSelectedProfileId={setSelectedProfileId}
            profiles={profiles}
            onCreateUser={() => setIsCreateModalOpen(true)}
          />
        </div>
        <UserStats users={filteredUsers} />
        {filteredUsers.length === 0 ? (
          <UserEmptyState hasUsers={users.length > 0} />
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
                isDeleting={deletingUserId === user.id}
                isTogglingStatus={togglingStatusId === user.id}
              />
            ))}
          </div>
        )}
        <UserCreateModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          profiles={profiles}
          onSubmit={handleCreateUser}
          onCancel={() => setIsCreateModalOpen(false)}
          loading={formLoading}
        />
        <UserEditModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          user={editingUser}
          profiles={profiles}
          onSubmit={handleUpdateUser}
          onCancel={() => {
            setIsEditModalOpen(false);
            setEditingUser(null);
          }}
          loading={formLoading}
        />
        <UserDeleteModal
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          user={userToDelete}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
          }}
          onConfirm={confirmDeleteUser}
          loading={deletingUserId !== null}
        />
      </main>
    </div>
  );
}
