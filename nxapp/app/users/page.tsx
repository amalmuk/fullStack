
"use client";

import "./users.css";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const API_URL = "http://localhost:4000/api/users";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Erreur lors du chargement.");

      const data: User[] = await response.json();
      setUsers(data);
    } catch {
      setError("Serveur Express inaccessible. Vérifiez le port 4000.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        String(user.id).includes(term)
    );
  }, [users, search]);

  function resetForm() {
    setName("");
    setEmail("");
    setEditingId(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanEmail) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Veuillez saisir une adresse email valide.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        editingId === null ? API_URL : `${API_URL}/${editingId}`,
        {
          method: editingId === null ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: cleanName, email: cleanEmail }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "L'opération a échoué.");
      }

      setSuccess(
        editingId === null
          ? "Utilisateur ajouté avec succès."
          : "Modifications enregistrées avec succès."
      );

      resetForm();
      await loadUsers();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur de communication avec l'API."
      );
    } finally {
      setSaving(false);
    }
  }

  function startEditing(user: User) {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
    setError("");
    setSuccess("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(user: User) {
    if (!window.confirm(`Supprimer définitivement ${user.name} ?`)) return;

    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/${user.id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "La suppression a échoué.");
      }

      if (editingId === user.id) resetForm();

      setSuccess("Utilisateur supprimé avec succès.");
      await loadUsers();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur de communication avec l'API."
      );
    }
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-content">
        <header className="dashboard-heading">
          <div>
            <p className="dashboard-eyebrow"></p>
            <h1>Gestion des utilisateurs</h1>
            <p className="dashboard-subtitle">
              Gérez et consultez les utilisateurs de votre application.
            </p>
          </div>
          <div className="dashboard-status">
            <span className="status-dot" />
            API REST Express
          </div>
        </header>

        <section className="stats-grid">
          <article className="stat-card">
            <div className="stat-icon stat-blue">♙</div>
            <div>
              <p>Utilisateurs total</p>
              <strong>{users.length}</strong>
              <span>Comptes enregistrés</span>
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-icon stat-green">⌘</div>
            <div>
              <p>État de l'API</p>
              <strong className="stat-word">
                {error.includes("inaccessible") ? "Indisponible" : loading ? "Vérification..." : "Connectée"}
              </strong>
              <span>Serveur Express · Port 4000</span>
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-icon stat-purple">↻</div>
            <div>
              <p>Gestion des données</p>
              <strong className="stat-word">CRUD</strong>
              <span>Ajouter · Modifier · Supprimer</span>
            </div>
          </article>
        </section>

        <section className="dashboard-panel">
          <div className="panel-heading">
            <div className="panel-icon">＋</div>
            <div>
              <h2>{editingId === null ? "Ajouter un utilisateur" : `Modifier l'utilisateur #${editingId}`}</h2>
              <p>
                {editingId === null
                  ? "Remplissez les informations pour créer un nouveau compte."
                  : "Modifiez les informations puis enregistrez les changements."}
              </p>
            </div>
          </div>

          <div className="form-layout">
            <form onSubmit={handleSubmit} className="dashboard-form">
              <div className="form-field">
                <label htmlFor="name">Nom complet <span>*</span></label>
                <input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ex. Amal Ben Ali"
                  maxLength={100}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">Adresse email <span>*</span></label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nom@exemple.com"
                  maxLength={254}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving
                    ? "Enregistrement..."
                    : editingId === null
                      ? "＋ Ajouter l'utilisateur"
                      : "Enregistrer les modifications"}
                </button>

                {editingId !== null && (
                  <button type="button" onClick={resetForm} className="btn-light">
                    Annuler
                  </button>
                )}
              </div>
            </form>

            <aside className="info-panel">
              <h3>ⓘ Informations</h3>
              <p><span>✓</span> Les données sont gérées via l'API REST Express.</p>
              <p><span>✓</span> Vous pouvez ajouter, modifier et supprimer des utilisateurs.</p>
              <p><span>✓</span> La liste s'actualise après chaque opération.</p>
              <p><span>✓</span> Vérifiez que le serveur fonctionne sur le port 4000.</p>
            </aside>
          </div>

          {error && <p role="alert" className="feedback feedback-error">{error}</p>}
          {success && <p role="status" className="feedback feedback-success">{success}</p>}
        </section>

        <section className="dashboard-panel">
          <div className="table-heading">
            <div className="panel-heading">
              <div className="panel-icon">♧</div>
              <div>
                <h2>Liste des utilisateurs</h2>
                <p>Consultez et gérez tous les comptes enregistrés.</p>
              </div>
            </div>

            <div className="table-tools">
              <input
                aria-label="Rechercher un utilisateur"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="⌕ Rechercher..."
              />
              <button
                type="button"
                onClick={() => void loadUsers()}
                disabled={loading}
                className="btn-light"
              >
                ↻ Actualiser
              </button>
            </div>
          </div>

          <div className="table-meta">
            <span>{filteredUsers.length} résultat(s)</span>
            <span className="result-badge">{users.length} utilisateur(s) au total</span>
          </div>

          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Utilisateur</th>
                  <th>Adresse email</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="table-empty">Chargement des données...</td></tr>
                ) : filteredUsers.length === 0 ? (
                  <tr><td colSpan={5} className="table-empty">Aucun utilisateur trouvé.</td></tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="id-cell">#{user.id}</td>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">
                            {user.name.trim().charAt(0).toUpperCase()}
                          </div>
                          <strong>{user.name}</strong>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td><span className="user-status"><span /> Actif</span></td>
                      <td>
                        <div className="row-actions">
                          <button
                            type="button"
                            onClick={() => startEditing(user)}
                            className="btn-edit"
                          >
                            ✎ Modifier
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleDelete(user)}
                            className="btn-delete"
                          >
                            × Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <span></span>
            <span></span>
          </div>
        </section>

        <footer className="dashboard-footer">
          <span><strong>NextApp</strong> · Application Full Stack</span>
          <span></span>
        </footer>
      </div>
    </main>
  );
}
