import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserList from "./components/UserList";
import PostList from "./components/PostList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/posts" element={<PostList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
