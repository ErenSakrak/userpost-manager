import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Homepage</h1>
      <nav>
        <ul>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/posts">Posts</Link></li>
        </ul>
      </nav>
    </div>
  );
}
