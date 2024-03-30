import { OnInit, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormatting'
})
export class CurrencyFormattingPipe implements PipeTransform {

  transformValue: string = '';

  transform(value: number, currencySymbol: string = '$'): string {
    if (value != undefined || value != null) {
      let currency = currencySymbol;
      let temp: string = value.toString();
      let temp1 = [];
      temp1 = temp.split(".");
      // console.log(temp1);
      value = parseInt(temp1[0]);

      if (isNaN(value) || value === null) {
        return '';
      }
      else if (currencySymbol == currency) {
        this.currencyTransform(value);
        if (temp1.length == 1) {

          return `${currencySymbol} ${this.transformValue}`
        }
        else {
          if (temp1[1].length > 2) {
            return `${currencySymbol} ${this.transformValue + '.' + temp1[1].slice(0, 2)}`;
          }
          return `${currencySymbol} ${this.transformValue + '.' + temp1[1]}`
        }
      }
      else {
        this.currencyTransform(value);
        return `${currencySymbol} ${this.transformValue}`
      }
    }
    else {
      return '';
    }
  }

  currencyTransform(value: number) {
    let str: string = value.toString();
    let strCopy: string = '';
    let count = 3;
    for (let i = str.length; i > 0; i--) {
      if (count > 0) {
        strCopy = str.charAt(i - 1) + strCopy;
        count--;
      }
      else {
        strCopy = str.charAt(i - 1) + ',' + strCopy;
        count = 1;
      }
    }
    this.transformValue = strCopy;
  }
}
