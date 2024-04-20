import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'dateFormat'
})

export class DateFormatPipe implements PipeTransform {
  transform(date: any, ...args: any[]): any {
    if (date) {
      const convertToDate: Date = new Date(date);
      const day = convertToDate.getDate().toString().split('');
      const month = (convertToDate.getMonth() + 1).toString().split('');
      const isTwoNumber = day.length === 1 ? this.changeFormatToTwoNumber(convertToDate.getDate()) : convertToDate.getDate();
      const isTwoNumberMonth = month.length === 1 ? this.changeFormatToTwoNumber(convertToDate.getMonth() + 1) : convertToDate.getMonth() + 1;
      const strDate: string[] = [isTwoNumber, isTwoNumberMonth, convertToDate.getFullYear()].join().split('');

      const formatDate: string = strDate.map((str) => str.replace(',', '/')).join('')

      return formatDate;
    }
    return ''
  }

  private changeFormatToTwoNumber(isTwoNumber: number): string {
    return isTwoNumber.toString().split('').map((num: string) => num.padStart(2, '0')).join("")
  }

}
