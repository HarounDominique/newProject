import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';

export interface IPost {
  id: number;
  title?: string | null;
  content?: string | null;
  createdDate?: dayjs.Dayjs | null;
  userPost?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewPost = Omit<IPost, 'id'> & { id: null };
