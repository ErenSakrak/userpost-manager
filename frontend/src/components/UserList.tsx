import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers, createUser, updateUser, deleteUser, type User } from './services/api';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', username: '', email: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadUsers = async () => {
    const data = await fetchUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAdd = async () => {
    await createUser(newUser);
    setNewUser({ name: '', username: '', email: '' });
    loadUsers();
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    loadUsers();
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setNewUser({ name: user.name, username: user.username, email: user.email });
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    await updateUser(editingId, newUser);
    setEditingId(null);
    setNewUser({ name: '', username: '', email: '' });
    loadUsers();
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">User List</h2>
          <Link to="/" className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            ⬅ Home
          </Link>
        </div>

        <div className="flex gap-2 mb-6">
          <input className="border p-3 rounded flex-1" placeholder="Name" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})}/>
          <input className="border p-3 rounded flex-1" placeholder="Username" value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})}/>
          <input className="border p-3 rounded flex-1" placeholder="Email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})}/>
          {editingId ? (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleUpdate}>Update</button>
          ) : (
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleAdd}>Add</button>
          )}
        </div>

        <table className="table-auto border-collapse border border-gray-400 w-full text-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{u.id}</td>
                <td className="border px-4 py-2">{u.name}</td>
                <td className="border px-4 py-2">{u.username}</td>
                <td className="border px-4 py-2">{u.email}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button className="bg-yellow-400 px-3 py-1 rounded-lg hover:bg-yellow-500" onClick={() => handleEdit(u)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600" onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
