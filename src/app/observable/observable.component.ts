import { Component } from '@angular/core';
import {delay, Observable, of} from 'rxjs';

@Component({
  selector: 'app-observable',
  template: ''
})
export class ObservableComponent {

  public value = 0;

  public immediate(): Observable<number> {
    return of(42);
  }

  public delayed(): Observable<number> {
    return of(42).pipe(delay(1000));
  }

  public indirectImmediate(): void {
    this.immediate().subscribe(result => {
      this.value = result;
      console.log('value set (indirectImmediate)');
    });
  }

  public indirectDelayed(): void {
    this.delayed().subscribe(result => {
      this.value = result;
      console.log('value set (indirectDelayed)');
    });
  }

}
