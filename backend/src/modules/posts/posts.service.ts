import { Injectable, NotFoundException } from '@nestjs/common';

export interface Post {
  id: number;
  userId: number;
  title: string;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [
    { id: 1, userId: 1, title: 'Post 1 by John' },
    { id: 2, userId: 2, title: 'Post 1 by Jane' },
  ];

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find(p => p.id === id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  create(post: Omit<Post, 'id'>): Post {
    const id = this.posts.length ? this.posts[this.posts.length - 1].id + 1 : 1;
    const newPost = { id, ...post };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: number, postData: Omit<Post, 'id'>): Post {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) throw new NotFoundException('Post not found');
    this.posts[index] = { id, ...postData };
    return this.posts[index];
  }

  remove(id: number) {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) throw new NotFoundException('Post not found');
    this.posts.splice(index, 1);
    return { message: 'Post deleted successfully' };
  }
}
