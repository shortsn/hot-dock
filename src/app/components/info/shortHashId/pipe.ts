import { Pipe, PipeTransform } from '@angular/core';

const regex = /sha256:(.{12})/;

@Pipe({name: 'shortHash'})
export class ShortHashPipe implements PipeTransform {

  transform = (id: string): string => regex.exec(id).pop();

}
