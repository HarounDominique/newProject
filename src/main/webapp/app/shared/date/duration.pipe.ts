import { Pipe, PipeTransform } from '@angular/core';

import dayjs from 'dayjs/esm';

@Pipe({
  name: 'duration',
})
export default class DurationPipe implements PipeTransform {
  transform(value: never): string {
    if (value) {
      return dayjs.duration(value).humanize();
    }
    return '';
  }
}
