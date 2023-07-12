import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit{

  private deBouncer : Subject<string> = new Subject<string>();

  @Input()
  public placeholder : string = '';

  @Output()
  public onValue = new EventEmitter<string>()

  @Output()
  public onDebouncer = new EventEmitter<string>()

  ngOnInit(): void {
    this.deBouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      this.onDebouncer.emit( value )
    })
  }

  emmitValue(value : string):void{
    this.onValue.emit(value)
  }

  onKeyPress(searchTerm : string){

    this.deBouncer.next( searchTerm )

  }

}
