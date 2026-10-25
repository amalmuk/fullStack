"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement");
        }
        return response.json();
      })
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Impossible de contacter le serveur Express.");
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold">
          Liste des utilisateurs
        </h1>

        {loading && <p>Chargement...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && users.length === 0 && (
          <p>Aucun utilisateur trouvé.</p>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-3">ID</th>
                  <th className="border p-3">Nom</th>
                  <th className="border p-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="border p-3">{user.id}</td>
                    <td className="border p-3">{user.name}</td>
                    <td className="border p-3">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
