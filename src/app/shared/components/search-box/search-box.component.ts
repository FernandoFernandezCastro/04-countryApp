import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit {


  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = '';


  @Output()
  public onValue:EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce:EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe( value => {
      this.onDebounce.emit( value );
    });
  }

  emitValue (value: string): void{
    this.onValue.emit(value);
  }

  onKeyPress(searchterm: string){
    this.debouncer.next( searchterm);
  }
}
