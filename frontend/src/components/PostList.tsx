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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPosts();
      setPosts(data);
      const userData = await fetchUsers();
      setUsers(userData);
    } catch {
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleAdd = async () => {
    if (!newPost.userId) {
      setFormError("⚠️ Kullanıcı seçmelisiniz.");
      return;
    }
    if (!newPost.title.trim()) {
      setFormError("⚠️ Başlık boş olamaz.");
      return;
    }
    if (newPost.title.length > 100) {
      setFormError("⚠️ Başlık en fazla 100 karakter olabilir.");
      return;
    }

    try {
      if (editingId) {
        await updatePost(editingId, newPost);
      } else {
        await createPost(newPost);
      }
      setNewPost({ userId: 0, title: "" });
      setEditingId(null);
      setIsModalOpen(false);
      setFormError(null);
      loadPosts();
    } catch {
      setError("Failed to save post");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      loadPosts();
    } catch {
      setError("Failed to delete post");
    }
  };

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setNewPost({ userId: post.userId, title: post.title });
    setIsModalOpen(true);
  };

  const paginatedPosts = posts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="flex flex-col items-center p-8">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Post List</h2>
          <div className="flex gap-3">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
              onClick={() => {
                setIsModalOpen(true);                
                setEditingId(null);                   
                setNewPost({ userId: 0, title: "" }); 
                setFormError(null);                   
              }}
            >
              ➕ Add Post
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
                <tr className="bg-blue-100 text-left">
                  <th className="border-2 border-gray-300 px-4 py-2">User</th>
                  <th className="border-2 border-gray-300 px-4 py-2">ID</th>
                  <th className="border-2 border-gray-300 px-4 py-2">Title</th>
                  <th className="border-2 border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPosts.map(p => (
                  <tr key={p.id} className="hover:bg-blue-50 transition-colors duration-200">
                    <td className="border-2 border-gray-300 px-4 py-2">{users.find(u => u.id === p.userId)?.name || p.userId}</td>
                    <td className="border-2 border-gray-300 px-4 py-2">{p.id}</td>
                    <td className="border-2 border-gray-300 px-4 py-2">{p.title}</td>
                    <td className="border-2 border-gray-300 px-4 py-2">
                      <button
                        className="bg-gray-500 text-white text-sm px-2 py-1 rounded-lg hover:bg-gray-600 transition-transform transform hover:scale-105 mr-2"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white text-sm px-2 py-1 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105"
                        onClick={() => handleDelete(p.id)}
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
                disabled={page * itemsPerPage >= posts.length}
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
            <h3 className="text-xl font-bold mb-4">{editingId ? "Edit Post" : "Add Post"}</h3>

            {formError && <div className="text-red-500 text-sm mb-3">{formError}</div>}

            <select
              className="border p-2 w-full mb-1 rounded"
              value={newPost.userId}
              onChange={e => setNewPost({ ...newPost, userId: Number(e.target.value) })}
            >
              <option value={0}>Select User</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>

            <input
              className="border p-2 w-full mb-1 rounded"
              placeholder="Title"
              value={newPost.title}
              maxLength={100}
              onChange={e => setNewPost({ ...newPost, title: e.target.value })}
            />
            <div className="text-xs text-gray-500 mb-2">{newPost.title.length}/100</div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-400 px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
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
