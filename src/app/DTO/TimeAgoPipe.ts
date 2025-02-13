import { Pipe, PipeTransform } from '@angular/core';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes, parseISO
} from "date-fns";

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string): string {
    let date = new Date(value);
    const now = new Date();

    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    if (!isNaN(Number(value))) {
      date = new Date(Number(value));
    } else {
      date = parseISO(value);
    }

    const daysDifference = differenceInDays(now, date);
    const hoursDifference = differenceInHours(now, date);
    const minutesDifference = differenceInMinutes(now, date);

    if (daysDifference > 0) {
      return daysDifference === 1 ? '1 day ago' : `${daysDifference} days ago`;
    } else if (hoursDifference > 0) {
      return hoursDifference === 1 ? '1 hour ago' : `${hoursDifference} hours ago`;
    } else if (minutesDifference > 0) {
      return minutesDifference === 1 ? '1 minute ago' : `${minutesDifference} minutes ago`;
    } else {
      return 'Today';
    }
  }
}
