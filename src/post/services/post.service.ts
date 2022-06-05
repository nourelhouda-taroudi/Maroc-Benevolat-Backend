import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AssociationService } from './../../modules/association/services/association.service';
import { PostEntity } from './../../post/models/post.entity';
import { Posts } from './../../post/models/post.interface';

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
  async createPost(post: Posts): Promise<PostEntity> {
    if (post.associationId === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: "Id de l'ssociation est obligatoire",
        },
        HttpStatus.NOT_ACCEPTABLE,// 406 status code
      );
    }
    const association = await this.associationService.findAsso(
      post.associationId,
    );
    if (!association) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Association non trouvé',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const newPost = plainToClass(PostEntity, instanceToPlain(post));
    newPost.association = association;
    return this.postRepository.save(newPost);
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
  deletPost(id: number): Observable<DeleteResult> {
    return from(this.postRepository.delete(id));
  }
}
