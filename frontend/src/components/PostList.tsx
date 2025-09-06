import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts, fetchUsers, createPost, updatePost, deletePost } from "./services/api";

interface Post {
  userId: number;
  id: number;
  title: string;
}

interface User {
  id: number;
  name: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newPost, setNewPost] = useState({ userId: 0, title: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadPosts = async () => {
    const data = await fetchPosts();
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
    fetchUsers().then(setUsers);
  }, []);

  const handleAdd = async () => {
    if (!newPost.userId || !newPost.title) return;
    await createPost(newPost);
    setNewPost({ userId: 0, title: "" });
    loadPosts();
  };

  const handleDelete = async (id: number) => {
    await deletePost(id);
    loadPosts();
  };

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setNewPost({ userId: post.userId, title: post.title });
  };

  const handleUpdate = async () => {
    if (editingId === null) return;
    await updatePost(editingId, newPost);
    setEditingId(null);
    setNewPost({ userId: 0, title: "" });
    loadPosts();
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Post List</h2>
          <Link to="/" className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            ⬅ Home
          </Link>
        </div>

        <div className="flex gap-2 mb-6">
          <select
            className="border p-3 rounded flex-1"
            value={newPost.userId}
            onChange={e => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          >
            <option value={0}>Select User</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          <input
            className="border p-3 rounded flex-1"
            placeholder="Title"
            value={newPost.title}
            onChange={e => setNewPost({ ...newPost, title: e.target.value })}
          />
          {editingId ? (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleUpdate}>Update</button>
          ) : (
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleAdd}>Add</button>
          )}
        </div>

        <table className="table-auto border-collapse border border-gray-400 w-full text-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(p => (
              <tr key={p.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{users.find(u => u.id === p.userId)?.name || p.userId}</td>
                <td className="border px-4 py-2">{p.id}</td>
                <td className="border px-4 py-2">{p.title}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button className="bg-yellow-400 px-3 py-1 rounded-lg hover:bg-yellow-500" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
