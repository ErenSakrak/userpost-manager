import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
}

// Users
export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get(`${API_BASE}/users`);
  return data;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const { data } = await axios.post(`${API_BASE}/users`, user);
  return data;
};

export const updateUser = async (id: number, user: Omit<User, 'id'>): Promise<User> => {
  const { data } = await axios.put(`${API_BASE}/users/${id}`, user);
  return data;
};

export const deleteUser = async (id: number) => {
  const { data } = await axios.delete(`${API_BASE}/users/${id}`);
  return data;
};

// Posts
export const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get(`${API_BASE}/posts`);
  return data;
};

export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  const { data } = await axios.post(`${API_BASE}/posts`, post);
  return data;
};

export const updatePost = async (id: number, post: Omit<Post, 'id'>): Promise<Post> => {
  const { data } = await axios.put(`${API_BASE}/posts/${id}`, post);
  return data;
};

export const deletePost = async (id: number) => {
  const { data } = await axios.delete(`${API_BASE}/posts/${id}`);
  return data;
};
