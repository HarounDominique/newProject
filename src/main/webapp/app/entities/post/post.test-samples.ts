import dayjs from 'dayjs/esm';

import { IPost, NewPost } from './post.model';

export const sampleWithRequiredData: IPost = {
  id: 8730,
};

export const sampleWithPartialData: IPost = {
  id: 28493,
  createdDate: dayjs('2025-02-06T23:34'),
};

export const sampleWithFullData: IPost = {
  id: 9917,
  title: 'clearly darn icy',
  content: 'wide recount',
  createdDate: dayjs('2025-02-06T22:34'),
};

export const sampleWithNewData: NewPost = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
