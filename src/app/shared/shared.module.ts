import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlPipe } from '../pipe/html.pipe';
import { CurrencyFormattingPipe } from '../pipe/currency-formatting.pipe';
import { DiscountDirective } from '../directive/discount.directive';


@NgModule({
  declarations: [
    HtmlPipe,
    CurrencyFormattingPipe,
    DiscountDirective
  ],
  imports: [
  ],
  exports:[
    HtmlPipe,
    CurrencyFormattingPipe,
    DiscountDirective

  ]
})
export class SharedModule { }
