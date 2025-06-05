import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';
import flatpickr from 'flatpickr';

@Directive({
  selector: '[flatpickr]'
})
export class FlatpickrDirective implements AfterViewInit {
  @Input('flatpickr') config: any;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    flatpickr(this.el.nativeElement, this.config || {});
  }
}
