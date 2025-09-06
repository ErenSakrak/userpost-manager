import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'John Doe', username: 'john', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', username: 'jane', email: 'jane@example.com' },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(user: Omit<User, 'id'>): User {
    const id = this.users.length ? this.users[this.users.length - 1].id + 1 : 1;
    const newUser = { id, ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, userData: Omit<User, 'id'>): User {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    this.users[index] = { id, ...userData };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    this.users.splice(index, 1);
    return { message: 'User deleted successfully' };
  }
}
