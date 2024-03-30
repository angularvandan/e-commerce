import { TestBed } from "@angular/core/testing";
import { HtmlPipe } from "./html.pipe";
import { DomSanitizer } from "@angular/platform-browser";
import { Sanitizer, SecurityContext } from "@angular/core";

describe('HtmlPipe', () => {
  let pipe:HtmlPipe;
  let domSanitizer:DomSanitizer;

  beforeEach(() => {
    domSanitizer = TestBed.get(DomSanitizer);
    pipe=new HtmlPipe(domSanitizer);
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should transform html ',()=>{
    let str = `<p>Hello</p>`;
    const expected = domSanitizer.bypassSecurityTrustHtml(str);
    expect(pipe.transform(str)).toEqual(expected);
  });
});
