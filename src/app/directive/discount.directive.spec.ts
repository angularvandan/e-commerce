import { DiscountDirective } from './discount.directive';
import { fakeAsync, flush, tick } from '@angular/core/testing';

describe('DiscountDirective', () => {
  let directive:DiscountDirective;
  let ele:any= {
    "nativeElement": {
        "__ngContext__": 40,
        "style":{color: 'red'},
        "localName":"span"
    }
  };

  beforeEach(() => {
    directive = new DiscountDirective(ele);
  });

  it('should create an instance', () => {
    directive = new DiscountDirective(ele);
    expect(directive).toBeTruthy();
  });

  it('should be ngAfterViewInit',()=>{
    spyOn(directive, 'calculateTime');
    directive.ngAfterViewInit();
    expect(directive.calculateTime).toHaveBeenCalled();
  });

  it('should be calculateTime',fakeAsync(()=>{
     directive.calculateTime();
     tick(2000);
     expect(directive.calculateTime).toBeDefined();
     flush();
  }));

});
