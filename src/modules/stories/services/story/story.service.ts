import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AssociationService } from './../../../association/services/association.service';
import { StoryEntity } from './../../models/story.entity';
import { Story } from './../../models/story.interface';

@Injectable()
export class StoryService {
  like() {
    throw new Error('Method not implemented.');
  }

  // constructor(
  //     @InjectRepository(StoryEntity)
  //     private readonly storyRepository: Repository<StoryEntity>
  //     ){}
  // createStory(story:Story):Observable<Story>{
  //     return from(this.storyRepository.save(story));
  // }
  // findAllStories():Observable<Story[]>{
  //     return from(this.storyRepository.find({
  //         order: {
  //             createdAt: "desc",

  //         }}));
  // }
  // findStories(take:number= 5, skip:number= 0): Observable<Story[]> {
  //    return from( this.storyRepository.findAndCount({take,skip}).then(([stories])=>{
  //         return <Story[]>stories
  //     }))

  // }
  // updateStory(id:number,story:Story):Observable<UpdateResult>{
  //     return from(this.storyRepository.update(id,story));
  //   }

  constructor(
    @InjectRepository(StoryEntity)
    private readonly storyRepository: Repository<StoryEntity>,
    private readonly associationService: AssociationService,
  ) {}
  async createStory(story: Story): Promise<StoryEntity> {
    // validation of id association
    if (story.associationId == undefined || story.associationId===null) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: "Id de l'ssociation st obligatoire",
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    // Check if association existe
    const association = await this.associationService.findAsso(
      story.associationId,
    );
    // If not existe throw not found exception
    if (!association) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Association non trouvé',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // transform from story dto to story entity using 'class-transformer'
    const newStory = plainToClass(StoryEntity, instanceToPlain(story));
    // Set story association
    newStory.association=association;
    // Save story
    return this.storyRepository.save(newStory);
  }
  findAllStories(): Observable<StoryEntity[]> {
    return from(
      this.storyRepository.find({
        order: {
          createdAt: 'ASC',
        },
      }),
    );
  }
  findStories(take: number = 10, skip: number = 0): Observable<StoryEntity[]> {
    return from(
      this.storyRepository.findAndCount({ take, skip }).then(([stories]) => {
        return stories;
      }),
    );
  }
  updateStory(id: number, story: Story): Observable<UpdateResult> {
    return from(this.storyRepository.update(id, story));
  }
  deletStory(id: number): Observable<DeleteResult> {
    return from(this.storyRepository.delete(id));
  }
  async getAssociationStories(idAssociation: number) {
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
    return this.storyRepository.find({
      where: { association },
    });
  }
}
