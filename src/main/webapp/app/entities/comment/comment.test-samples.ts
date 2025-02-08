import dayjs from 'dayjs/esm';

import { IComment, NewComment } from './comment.model';

export const sampleWithRequiredData: IComment = {
  id: 20452,
};

export const sampleWithPartialData: IComment = {
  id: 19140,
  content: 'yum',
  createdDate: dayjs('2025-02-07T03:27'),
};

export const sampleWithFullData: IComment = {
  id: 28427,
  content: 'testing ugh',
  createdDate: dayjs('2025-02-07T08:04'),
};

export const sampleWithNewData: NewComment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
