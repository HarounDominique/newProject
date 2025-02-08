import { HttpParams } from '@angular/common/http';

export const createRequestOption = (req?: { sort: string[] } | undefined): HttpParams => {
  let options: HttpParams = new HttpParams();

  if (req) {
    Object.entries(req).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        for (const value of [].concat(req[key]).filter(v => v !== '')) {
          options = options.append(key, value);
        }
      }
    });
  }

  return options;
};
