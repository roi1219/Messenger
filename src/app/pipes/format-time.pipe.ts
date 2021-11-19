import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const now = Date.now()
    value = new Date(value).getTime()
    
    if (now - value < 1000 * 60) {
      return `${Math.floor((now - value) / 1000)} Seconds ago`
    } else if (now - value < 1000 * 60 * 60) {
      return `${Math.floor((now - value) / (1000 * 60))} Minutes ago`
    } else if (now - value < 1000 * 60 * 60 * 24) {
      return `${Math.floor((now - value) / (1000 * 60 * 60))} Hours ago`
    } else return new Date(value).toLocaleDateString()
  }

}
