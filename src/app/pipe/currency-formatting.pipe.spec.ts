import { CurrencyFormattingPipe } from './currency-formatting.pipe';

describe('CurrencyFormattingPipe', () => {
  let pipe:CurrencyFormattingPipe;
  beforeEach(() => {
    pipe = new CurrencyFormattingPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should currency formatting pipe',()=>{
    expect(pipe.transform(12,'$')).toBe('$ 12');
    expect(pipe.transform(12.2342,'$')).toBe('$ 12.23');
    expect(pipe.transform(12.2,'$')).toBe('$ 12.2');

    spyOn(pipe,'currencyTransform');
    pipe.transform(12,'$');
    
    expect(pipe.currencyTransform).toHaveBeenCalled();
  });
  


});
