import { useEffect, useState } from 'react';
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="flex gap-2 mb-4">
        <input className="border p-2 rounded" placeholder="Name" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})}/>
        <input className="border p-2 rounded" placeholder="Username" value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})}/>
        <input className="border p-2 rounded" placeholder="Email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})}/>
        {editingId ? <button className="bg-blue-500 text-white px-4 rounded" onClick={handleUpdate}>Update</button> : <button className="bg-green-500 text-white px-4 rounded" onClick={handleAdd}>Add</button>}
      </div>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Username</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td className="border px-2 py-1">{u.id}</td>
              <td className="border px-2 py-1">{u.name}</td>
              <td className="border px-2 py-1">{u.username}</td>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1 flex gap-2">
                <button className="bg-yellow-400 px-2 rounded" onClick={() => handleEdit(u)}>Edit</button>
                <button className="bg-red-500 text-white px-2 rounded" onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
