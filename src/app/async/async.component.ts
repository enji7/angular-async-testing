import { Component } from '@angular/core';
import {delay, Observable, of} from 'rxjs';

@Component({
  selector: 'app-async',
  template: ''
})
export class AsyncComponent {

  public value = 0;

  public async immediate(): Promise<number> {
    return 42;
  }

  public async delayed(): Promise<number> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(42)
      }, 1000);
    });
  }

  public indirectImmediate(): void {
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
