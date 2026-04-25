"use client";
import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Search, ShieldCheck, UserRound, Lock } from "lucide-react";
import { adminApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { AdminUser } from "@/types";

const ROLE_OPTIONS = ["Admin", "Customer"] as const;

const formatDate = (value?: string) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString();
};

export default function AdminUsersPage() {
  const { user: currentUser } = useAuthStore();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const loadUsers = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    setError(null);
    try {
      const response = await adminApi.getUsers();
      const list = Array.isArray(response) ? (response as AdminUser[]) : response?.data ?? [];
      setUsers(list);
    } catch {
      setError("Failed to load users from server.");
      setUsers([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void loadUsers(false);
  }, []);

  const roles = useMemo(() => {
    const set = new Set(users.map((u) => u.role).filter(Boolean) as string[]);
    return ["all", ...Array.from(set)];
  }, [users]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return users.filter((user) => {
      const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
      const matchesSearch =
        term.length === 0 ||
        name.toLowerCase().includes(term) ||
        (user.email || "").toLowerCase().includes(term) ||
        (user.role || "").toLowerCase().includes(term);
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const handleRoleChange = async (userId: number, role: string) => {
    setUpdatingId(userId);
    setError(null);
    try {
      const response = await adminApi.updateUserRole(userId, { role });
      const updated = (response as AdminUser) || { role };
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, ...updated, role } : u))
      );
    } catch {
      setError("Failed to update user role.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl font-light">Users</h1>
          <p className="font-mono text-xs text-ink/40 mt-1 tracking-widest">Manage access and roles</p>
        </div>
        <button
          type="button"
          onClick={() => void loadUsers(true)}
          disabled={loading || refreshing}
          className="inline-flex items-center gap-2 border border-bone px-4 py-2 font-mono text-xs tracking-widest uppercase text-ink/60 hover:border-ink hover:text-ink transition-colors disabled:opacity-60"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-6 border border-rust/30 bg-rust/5 px-4 py-3 font-mono text-xs text-rust tracking-widest uppercase">
          {error}
        </div>
      )}

      <div className="bg-chalk border border-bone">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-6 py-4 border-b border-bone">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-ink/40">
            <UserRound size={14} />
            User Directory
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email"
                className="w-64 border border-bone bg-transparent pl-9 pr-3 py-2 font-mono text-xs tracking-widest uppercase focus:outline-none focus:border-ink"
              />
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-bone bg-transparent px-3 py-2 font-mono text-xs tracking-widest uppercase focus:outline-none focus:border-ink"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role === "all" ? "All roles" : role}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-bone">
                {["User", "Email", "Role", "Created", "Action"].map((head) => (
                  <th key={head} className="text-left px-6 py-3 font-mono text-[10px] tracking-widest uppercase text-ink/40">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 font-mono text-xs text-ink/40">
                    Loading users...
                  </td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 font-mono text-xs text-ink/40">
                    No users found.
                  </td>
                </tr>
              )}
              {!loading &&
                filtered.map((user) => {
                  const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || "N/A";
                  const role = user.role || "Customer";
                  const isCurrentUser = currentUser?.id === user.id;
                  return (
                    <tr key={user.id} className="border-b border-bone/50 hover:bg-bone/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isCurrentUser ? "bg-clay/20" : "bg-bone/60"
                          }`}>
                            {isCurrentUser ? (
                              <Lock size={14} className="text-clay" />
                            ) : (
                              <ShieldCheck size={14} className="text-ink/40" />
                            )}
                          </div>
                          <div>
                            <p className="font-body text-sm">
                              {name}
                              {isCurrentUser && <span className="text-clay text-[10px] ml-2">(you)</span>}
                            </p>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40">ID {user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-ink/55">{user.email || "N/A"}</td>
                      <td className="px-6 py-4">
                        {isCurrentUser ? (
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs tracking-widest uppercase">{role}</span>
                            <span className="inline-block w-4 h-4 border border-clay/30 bg-clay/5 flex items-center justify-center rounded" title="Cannot change your own role">
                              <Lock size={10} className="text-clay/60" />
                            </span>
                          </div>
                        ) : (
                          <select
                            value={role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            disabled={updatingId === user.id}
                            className="border border-bone bg-transparent px-3 py-2 font-mono text-xs tracking-widest uppercase focus:outline-none focus:border-ink disabled:opacity-60"
                          >
                            {ROLE_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-ink/40">{formatDate(user.createdAt)}</td>
                      <td className="px-6 py-4 font-mono text-xs text-ink/40">
                        {isCurrentUser ? (
                          <span className="text-ink/40">Current session</span>
                        ) : updatingId === user.id ? (
                          "Updating..."
                        ) : (
                          "Ready"
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
