import { Pipe, PipeTransform } from '@angular/core';

enum FileSizeUnit {
  'bytes',
  'KB',
  'MB',
  'GB',
  'TB',
  'PB'
}

@Pipe({name: 'fileSize'})
export class FileSizePipe implements PipeTransform {

  transform(bytes: number = 0, precision: number = 2): string {

    if (isNaN(parseFloat(String(bytes)))) {
      return 'NaN';
    }

    if (!isFinite(bytes)) {
      return '∞';
    }

    const e = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, e)).toFixed(precision)}${FileSizeUnit[ e ]}`;
  }
}
