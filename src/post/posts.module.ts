import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostEntity } from './models/post.entity';
import { PostController } from './controllers/post.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([PostEntity])
    ],
  providers: [PostService],
  controllers: [PostController]
})
export class PostsModule {}
