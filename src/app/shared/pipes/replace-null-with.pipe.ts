import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceNullWith'
})
export class ReplaceNullWithPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const replaceText = args[0] ?? '-';
    return typeof value === undefined || value === null ? replaceText : value;
  }

}
