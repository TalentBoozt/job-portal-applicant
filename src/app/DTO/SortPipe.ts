import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(array: any[], field: string, order: string = 'asc'): any[] {
    if (!Array.isArray(array)) {
      return array;
    }

    return array.sort((a, b) => {
      let valA = a[field];
      let valB = b[field];

      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
