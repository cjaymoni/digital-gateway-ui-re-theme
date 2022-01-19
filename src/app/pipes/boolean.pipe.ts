import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'BooleanPipe',
})
export class BooleanPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value ? 'TRUE' : 'FALSE';
  }
}
