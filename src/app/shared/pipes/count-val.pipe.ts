import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countVal'
})
export class CountValPipe implements PipeTransform {

  transform(value: number, arg1: string, arg2: string, arg3: string): string {
    const str = value === 1 ? arg1 : 1 < value && value < 5 ? arg2 : arg3;
    return `${value} ${str}`;
  }

}
