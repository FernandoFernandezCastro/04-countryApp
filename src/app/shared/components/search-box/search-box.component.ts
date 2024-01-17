import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = '';

  @ViewChild('txtSearchInput')
  public searchInput!: ElementRef<HTMLInputElement>;

  @Output()
  public onValue:EventEmitter<string> = new EventEmitter();


  emitValue (): void{
    const newSearch: string = this.searchInput.nativeElement.value;

    this.onValue.emit(newSearch);

    this.searchInput.nativeElement.value='';

  }

}
