export interface Story {
  id?: number;
  text: string;
  visualisation?: string;
  like?: boolean;
  commentaire?: string;
  likeNum?: number;
  createdAt?: Date;
  image?: string;
  associationId: number;
}
