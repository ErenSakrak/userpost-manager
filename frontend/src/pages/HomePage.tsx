import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold mb-6">Homepage</h1>
      <nav className="flex gap-6">
        <Link to="/users" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 text-lg">
          👥 Users
        </Link>
        <Link to="/posts" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 text-lg">
          📝 Posts
        </Link>
      </nav>
    </div>
  );
}
