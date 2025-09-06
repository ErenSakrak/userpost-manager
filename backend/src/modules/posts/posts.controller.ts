import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostType } from './posts.service'; // ⚡ Post tipine alias verdik

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): PostType[] {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): PostType {
    return this.postsService.findOne(id);
  }

  @Post()
  create(@Body() post: Omit<PostType, 'id'>): PostType {
    return this.postsService.create(post);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() post: Omit<PostType, 'id'>): PostType {
    return this.postsService.update(id, post);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
