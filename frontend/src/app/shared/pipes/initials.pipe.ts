import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let words: string[] = value.split(' ');

    if (words.length === 1) {
      return value;
    } else if (words.length >= 2) {
      let out: string = '';
      out += words[0][0].toUpperCase() + '.';
      return out + words[words.length - 1];
    } else {
      return value;
    }
  }
}
