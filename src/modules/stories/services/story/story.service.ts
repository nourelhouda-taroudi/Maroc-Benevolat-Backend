import { CreateDateColumn } from 'typeorm';
import { Story } from './../../models/story.interface';
import { StoryEntity } from './../../models/story.entity';
import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class StoryService {
    like() {
        throw new Error('Method not implemented.');
    }
    
    constructor(
        @InjectRepository(StoryEntity)
        private readonly storyRepository: Repository<StoryEntity>
        ){}
    createStory(story:Story):Observable<Story>{
        return from(this.storyRepository.save(story));
    } 
    findAllStories():Observable<Story[]>{
        return from(this.storyRepository.find({
            order: {
                createdAt: "desc",
               
            }}));
    }
    findStories(take:number= 5, skip:number= 0): Observable<Story[]> {
       return from( this.storyRepository.findAndCount({take,skip}).then(([stories])=>{
            return <Story[]>stories
        }))
    
    }
    updateStory(id:number,story:Story):Observable<UpdateResult>{
        return from(this.storyRepository.update(id,story));

    }
    deletStory(id:number):Observable<DeleteResult>{
        return from(this.storyRepository.delete(id));
    }
    
}
