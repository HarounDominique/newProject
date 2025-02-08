import dayjs from 'dayjs/esm';
import { IPost } from 'app/entities/post/post.model';
import { IUser } from 'app/entities/user/user.model';

export interface IComment {
  id: number;
  content?: string | null;
  createdDate?: dayjs.Dayjs | null;
  postComment?: IPost | null;
  userComment?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewComment = Omit<IComment, 'id'> & { id: null };
