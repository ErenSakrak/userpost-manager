import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers, createUser, updateUser, deleteUser, type User } from './services/api';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', username: '', email: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUsers();
      setUsers(data);
    } catch {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleAdd = async () => {
    if (!newUser.name.trim() || !newUser.username.trim() || !newUser.email.trim()) {
      setFormError("⚠️ Tüm alanları doldurmanız gerekiyor.");
      return;
    }
    if (newUser.username.length < 3) {
      setFormError("⚠️ Kullanıcı adı en az 3 karakter olmalıdır.");
      return;
    }
    if (newUser.username.length > 20) {
      setFormError("⚠️ Kullanıcı adı en fazla 20 karakter olabilir.");
      return;
    }
    if (newUser.name.length > 50) {
      setFormError("⚠️ İsim en fazla 50 karakter olabilir.");
      return;
    }
    if (newUser.email.length > 100) {
      setFormError("⚠️ Email en fazla 100 karakter olabilir.");
      return;
    }
    if (!validateEmail(newUser.email)) {
      setFormError("⚠️ Geçerli bir e-posta adresi giriniz.");
      return;
    }

    try {
      if (editingId) {
        await updateUser(editingId, newUser);
      } else {
        await createUser(newUser);
      }
      setNewUser({ name: '', username: '', email: '' });
      setEditingId(null);
      setIsModalOpen(false);
      setFormError(null);
      loadUsers();
    } catch {
      setError("Failed to save user");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      loadUsers();
    } catch {
      setError("Failed to delete user");
    }
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setNewUser({ name: user.name, username: user.username, email: user.email });
    setIsModalOpen(true);
  };

  const paginatedUsers = users.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="flex flex-col items-center p-8">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">User List</h2>
          <div className="flex gap-3">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105"
              onClick={() => {
                setIsModalOpen(true);
                setEditingId(null);          
                setNewUser({ name: '', username: '', email: '' }); 
                setFormError(null);          
              }}
            >
              ➕ Add User
            </button>
            <Link
              to="/"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-transform transform hover:scale-105"
            >
              ⬅ Home
            </Link>
          </div>
        </div>

        {loading && <div className="text-center py-4">⏳ Loading...</div>}
        {error && <div className="text-center text-red-500 py-2">{error}</div>}

        {!loading && !error && (
          <>
            <table className="table-auto border-collapse border-2 border-gray-300 w-full text-lg">
              <thead>
                <tr className="bg-green-100 border-2 border-gray-300 text-left">
                  <th className="border-2 border-gray-300 px-4 py-2">ID</th>
                  <th className="border-2 border-gray-300 px-4 py-2">Name</th>
                  <th className="border-2 border-gray-300 px-4 py-2">Username</th>
                  <th className="border-2 border-gray-300 px-4 py-2">Email</th>
                  <th className="border-2 border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map(u => (
                  <tr
                    key={u.id}
                    className="hover:bg-blue-50 transition-colors duration-200"
                  >
                    <td className="border-2 border-gray-300 px-4 py-2">{u.id}</td>
                    <td className="border-2 border-gray-300 px-4 py-2">{u.name}</td>
                    <td className="border-2 border-gray-300 px-4 py-2">{u.username}</td>
                    <td className="border-2 border-gray-300 px-4 py-2">{u.email}</td>
                    <td className="border-2 border-gray-300 px-4 py-2">
                      <button
                        className="bg-gray-500 text-white text-sm px-2 py-1 rounded-lg hover:bg-gray-600 transition-transform transform hover:scale-105 mr-2"
                        onClick={() => handleEdit(u)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white text-sm px-2 py-1 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105"
                        onClick={() => handleDelete(u.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


            <div className="flex gap-2 justify-center mt-4">
              <button
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 transition"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                ⬅ Prev
              </button>
              <span>Page {page}</span>
              <button
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 transition"
                disabled={page * itemsPerPage >= users.length}
                onClick={() => setPage(page + 1)}
              >
                Next ➡
              </button>
            </div>
          </>
        )}
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">{editingId ? "Edit User" : "Add User"}</h3>

            {formError && <div className="text-red-500 text-sm mb-3">{formError}</div>}


            <input
              className="border p-2 w-full mb-1 rounded"
              placeholder="Name"
              value={newUser.name}
              maxLength={50}
              onChange={e => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
            <div className="text-xs text-gray-500 mb-2">{newUser.name.length}/50</div>


            <input
              className="border p-2 w-full mb-1 rounded"
              placeholder="Username"
              value={newUser.username}
              maxLength={20}
              onChange={e => setNewUser({ ...newUser, username: e.target.value })}
              required
            />
            <div className="text-xs text-gray-500 mb-2">{newUser.username.length}/20</div>


            <input
              className="border p-2 w-full mb-1 rounded"
              placeholder="Email"
              type="email"
              value={newUser.email}
              maxLength={100}
              onChange={e => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
            <div className="text-xs text-gray-500 mb-2">{newUser.email.length}/100</div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-400 px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                onClick={handleAdd}
              >
                {editingId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
