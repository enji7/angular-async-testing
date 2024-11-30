import {Component, computed, signal, Signal} from '@angular/core';
import {delay, Observable, of} from 'rxjs';

@Component({
  selector: 'app-signal',
  template: ''
})
export class SignalComponent {

  public value: Signal<number> = signal(0);

  public immediate(): Signal<number> {
    return signal(42);
  }

  public delayed(): Signal<number> {
    const ret = signal(0);
    setTimeout(() => {
      ret.set(42);
      console.log('value set (delayed)');
    }, 1000);
    return ret;
  }

  public indirectImmediate(): void {
    const sig = this.immediate();
    this.value = computed(() => sig());
  }

  public indirectDelayed(): void {
    const sig = this.delayed();
    this.value = computed(() => sig());
  }

}
