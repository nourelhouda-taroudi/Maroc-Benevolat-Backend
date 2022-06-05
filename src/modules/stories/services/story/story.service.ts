import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  constructor(
    @InjectRepository(StoryEntity)
    private readonly storyRepository: Repository<StoryEntity>,
    private readonly associationService: AssociationService,
  ) {}
  createStory(story: Story): Observable<Story> {
    return from(this.storyRepository.save(story));
  }
  findAllStories(): Observable<Story[]> {
    return from(
      this.storyRepository.find({
        order: {
          createdAt: 'ASC',
        },
      }),
    );
  }
  findStories(take: number = 10, skip: number = 0): Observable<Story[]> {
    return from(
      this.storyRepository.findAndCount({ take, skip }).then(([stories]) => {
        return <Story[]>stories;
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
