import { useEffect, useState } from 'react';
import { fetchPosts, createPost, updatePost, deletePost, type Post, fetchUsers, type User } from './services/api';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newPost, setNewPost] = useState({ userId: 0, title: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadPosts = async () => {
    const data = await fetchPosts();
    setPosts(data);
  };

  const loadUsers = async () => {
    const data = await fetchUsers();
    setUsers(data);
    if (data.length > 0 && newPost.userId === 0) setNewPost(prev => ({ ...prev, userId: data[0].id }));
  };

  useEffect(() => {
    loadPosts();
    loadUsers();
  }, []);

  const handleAdd = async () => {
    if (!newPost.userId || !newPost.title) return;
    await createPost(newPost);
    setNewPost({ userId: users[0]?.id || 0, title: '' });
    loadPosts();
  };

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setNewPost({ userId: post.userId, title: post.title });
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    await updatePost(editingId, newPost);
    setEditingId(null);
    setNewPost({ userId: users[0]?.id || 0, title: '' });
    loadPosts();
  };

  const handleDelete = async (id: number) => {
    await deletePost(id);
    loadPosts();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Post List</h2>
      <div className="flex gap-2 mb-4">
        <select
          className="border p-2 rounded"
          value={newPost.userId}
          onChange={e => setNewPost({ ...newPost, userId: Number(e.target.value) })}
        >
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={newPost.title}
          onChange={e => setNewPost({ ...newPost, title: e.target.value })}
        />
        {editingId ? (
          <button className="bg-blue-500 text-white px-4 rounded" onClick={handleUpdate}>Update</button>
        ) : (
          <button className="bg-green-500 text-white px-4 rounded" onClick={handleAdd}>Add</button>
        )}
      </div>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">User</th>
            <th className="border px-2 py-1">Title</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(p => (
            <tr key={p.id}>
              <td className="border px-2 py-1">{p.id}</td>
              <td className="border px-2 py-1">{users.find(u => u.id === p.userId)?.name || 'Unknown'}</td>
              <td className="border px-2 py-1">{p.title}</td>
              <td className="border px-2 py-1 flex gap-2">
                <button className="bg-yellow-400 px-2 rounded" onClick={() => handleEdit(p)}>Edit</button>
                <button className="bg-red-500 text-white px-2 rounded" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
