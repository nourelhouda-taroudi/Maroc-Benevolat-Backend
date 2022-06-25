export interface Posts {
  id?: number;
  text: string;
  visualisation?: string;
  like?: boolean;
  image?: string;
  commentaire?: string;
  likeNum?: number;
  createdAt?: Date;
  associationId?: number;
}
