import { Post } from './post.model';
import { User } from './user.model';

export interface PostWithCreator {
  post: Post;
  creator: User;
}
