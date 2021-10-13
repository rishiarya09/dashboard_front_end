import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonconv'
})
export class JsonconvPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Object.keys(value);
  }

}
