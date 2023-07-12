import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private deBouncer : Subject<string> = new Subject<string>();
  private debounceSubsciption? : Subscription;

  @Input()
  public placeholder : string = '';

  @Output()
  public onValue = new EventEmitter<string>()

  @Output()
  public onDebouncer = new EventEmitter<string>()

  ngOnInit(): void {
    this.debounceSubsciption = this.deBouncer
    .pipe(
      debounceTime(500)
      )
      .subscribe(value => {
        this.onDebouncer.emit( value )
      })
    }

    ngOnDestroy(): void {
      this.debounceSubsciption?.unsubscribe();
    }

    emmitValue(value : string):void{
      this.onValue.emit(value)
  }

  onKeyPress(searchTerm : string){

    this.deBouncer.next( searchTerm )

  }

}
