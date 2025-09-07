import { Link } from "react-router-dom";

export default function HomePage() {
  const userCardClasses =
    "bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center hover:shadow-2xl hover:scale-105 transition-transform duration-300";
  const postCardClasses =
    "bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center hover:shadow-2xl hover:scale-105 transition-transform duration-300";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 drop-shadow">
          🚀 Welcome
        </h1>
        <p className="text-gray-600 text-lg">Choose a section to explore data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        <Link to="/users" className={userCardClasses}>
          <div className="bg-blue-100 text-blue-600 w-16 h-16 flex items-center justify-center rounded-full mb-4 text-3xl">
            👥
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Users</h2>
          <p className="text-gray-500 mt-2 text-center">
            Manage and explore all registered users.
          </p>
        </Link>

        <Link to="/posts" className={postCardClasses}>
          <div className="bg-green-100 text-green-600 w-16 h-16 flex items-center justify-center rounded-full mb-4 text-3xl">
            📝
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Posts</h2>
          <p className="text-gray-500 mt-2 text-center">
            Browse, add, and edit posts with ease.
          </p>
        </Link>
      </div>
    </div>
  );
}
