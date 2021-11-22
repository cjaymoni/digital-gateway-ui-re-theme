import { Pipe, PipeTransform } from '@angular/core';

const LONG_TEXT_LIMIT = 200;

@Pipe({
  name: 'appEllipsis',
})
export class AppEllipsis implements PipeTransform {
  transform(body: string, maximumLength: number = LONG_TEXT_LIMIT): string {
    const bodyIsLong = body.length > maximumLength;

    if (bodyIsLong) {
      return `${body.substr(0, maximumLength)}...`;
    }

    return body;
  }
}
