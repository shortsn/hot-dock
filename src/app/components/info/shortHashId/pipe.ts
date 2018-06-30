import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'shortHash'})
export class ShortHashPipe implements PipeTransform {

  transform = (id: string): string => id.replace('sha256:', '').slice(0, 12);

}
