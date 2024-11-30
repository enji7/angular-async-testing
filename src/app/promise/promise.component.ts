import { Component } from '@angular/core';
import {delay, Observable, of} from 'rxjs';

@Component({
  selector: 'app-promise',
  template: ''
})
export class PromiseComponent {

  public value = 0;

  public immediate(): Promise<number> {
    return Promise.resolve(42);
  }

  public delayed(): Promise<number> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(42)
      }, 1000);
    });
  }

  public indirectImmediate() {
    this.immediate().then(result => {
      this.value = result;
      console.log('value set (indirectImmediate)');
    });
  }

  public indirectDelayed(): void {
    this.delayed().then(result => {
      this.value = result;
      console.log('value set (indirectDelayed)');
    });
  }

}
