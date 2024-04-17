import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'dateFormat'
})

export class DateFormatPipe implements PipeTransform {
  transform(date: any, ...args: any[]): any {
    if (date) {
      const convertToDate: Date = new Date(date);
      const getDate: number[] = [convertToDate.getDate(), convertToDate.getMonth(), convertToDate.getFullYear()]
      const strDate: string[] = getDate.join().split('');
      const formatDate: string = strDate.map((str) => str.replace(',', '/')).join('')
      return formatDate;
    }
    return ''
  }
}
