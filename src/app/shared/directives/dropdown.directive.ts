import { Directive, Renderer2, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective {
  constructor(private renderer: Renderer2, private elRef: ElementRef) {}
  changeClass: boolean = false;

  @HostListener("click") onMouseClick() {
    this.changeClass = !this.changeClass;
    if (this.changeClass)
      this.renderer.addClass(this.elRef.nativeElement, "open");
    else this.renderer.removeClass(this.elRef.nativeElement, "open");
  }
}
