import { AssociationService } from './../../modules/association/services/association.service';
import { CreateDateColumn } from 'typeorm';
import { Posts } from './../../post/models/post.interface';
import { PostEntity } from './../../post/models/post.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class PostService {
  like() {
    throw new Error('Method not implemented.');
  }

  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly associationService: AssociationService,
  ) {}
  createPost(post: Posts): Observable<Posts> {
    return from(this.postRepository.save(post));
  }
  findAllPosts(): Observable<Posts[]> {
    return from(
      this.postRepository.find({
        order: {
          createdAt: 'ASC',
        },
      }),
    );
  }
  findPosts(take: number = 10, skip: number = 0): Observable<Posts[]> {
    return from(
      this.postRepository.findAndCount({ take, skip }).then(([posts]) => {
        return <Posts[]>posts;
      }),
    );
  }
  updatePost(id: number, post: Posts): Observable<UpdateResult> {
    return from(this.postRepository.update(id, post));
  }
  deletPost(id: number): Observable<DeleteResult> {
    return from(this.postRepository.delete(id));
  }

  async getAssociationPosts(idAssociation: number) {
    const association = await this.associationService.findAsso(idAssociation);
    if (!association) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Association non trouvé',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return this.postRepository.find({
      where: {
        association,
      },
    });
  }
}
