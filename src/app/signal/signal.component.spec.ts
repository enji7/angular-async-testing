import {ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {SignalComponent} from './signal.component';
import {signal, Signal} from '@angular/core';

describe('SignalComponent', () => {

  let component: SignalComponent;
  let fixture: ComponentFixture<SignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('immediate', () => {

    it('basic', () => {
      const sig = component.immediate();
      expect(sig()).toBe(42);
      console.log('assertion completed (basic)!');
    });

    it('input callback', (done) => {
      const sig = component.immediate();
      expect(sig()).toBe(42);
      console.log('assertion completed (input callback)!');
      done();
    });

    it('waitForAsync', waitForAsync(() => {
      const sig = component.immediate();
      expect(sig()).toBe(42);
      console.log('assertion completed (waitForAsync)!');
    }));

    it('fakeAsync', fakeAsync(() => {
      const sig = component.immediate();
      expect(sig()).toBe(42);
      console.log('assertion completed (fakeAsync)!');
    }));

  });

  describe('delayed', () => {

    // fails because the expectation runs before the modification
    it('basic', () => {
      const sig = component.delayed();
      expect(sig()).toBe(42);
      console.log('assertion completed (basic)!');
    });

    // fails because the expectation runs before the modification
    it('input callback', (done) => {
      const sig = component.delayed();
      expect(sig()).toBe(42);
      console.log('assertion completed (input callback)!');
      done();
    });

    // fails because the expectation runs before the modification
    it('waitForAsync', waitForAsync(() => {
      const sig = component.delayed();
      fixture.whenStable().then(() => expect(sig()).toBe(42));
      console.log('assertion completed (waitForAsync)');
    }));

    it('waitForAsync & whenStable', waitForAsync(() => {
      let sig: Signal<number>;
      fixture.ngZone!.run(() => sig = component.delayed());
      fixture.whenStable().then(() => expect(sig()).toBe(42));
      console.log('assertion completed (waitForAsync & whenStable)!');
    }));

    it('waitForAsync & await whenStable', waitForAsync(async () => {
      let sig: Signal<number> = signal(0);
      fixture.ngZone!.run(() => sig = component.delayed());
      await fixture.whenStable();
      expect(sig()).toBe(42);
      console.log('assertion completed (waitForAsync & whenStable)!');
    }));

    // fails because the expectation runs before the modification
    it('fakeAsync', fakeAsync(() => {
      const sig = component.delayed();
      expect(sig()).toBe(42);
      console.log('assertion completed (fakeAsync)!');
    }));

    // fails because the expectation runs before the modification
    it('fakeAsync & tick', fakeAsync(() => {
      const sig = component.delayed();
      tick();
      expect(sig()).toBe(42);
      console.log('assertion completed (fakeAsync & tick)');
    }));

    it('fakeAsync & explicit tick', fakeAsync(() => {
      const sig = component.delayed();
      tick(1000);
      expect(sig()).toBe(42);
      console.log('assertion completed (fakeAsync & explicit tick)');
    }));

    it('fakeAsync & flush', fakeAsync(() => {
      const sig = component.delayed();
      flush();
      expect(sig()).toBe(42);
      console.log('assertion completed (fakeAsync & flush)');
    }));

    // fails because setTimeout is not a micro task
    it('fakeAsync & flushMicrotasks', fakeAsync(() => {
      const sig = component.delayed();
      flushMicrotasks();
      expect(sig()).toBe(42);
      console.log('assertion completed (fakeAsync & flushMicrotasks)');
    }));

  });

  describe('indirect immediate', () => {

    it('basic', () => {
      component.indirectImmediate();
      expect(component.value()).toBe(42);
      console.log('assertion completed (basic)');
    });

    it('input callback', (done) => {
      component.indirectImmediate();
      expect(component.value()).toBe(42);
      console.log('assertion completed (input callback)');
      done();
    });

    it('waitForAsync', waitForAsync(() => {
      component.indirectImmediate();
      expect(component.value()).toBe(42);
      console.log('assertion completed (waitForAsync)');
    }));

    it('fakeAsync', fakeAsync(() => {
      component.indirectImmediate();
      expect(component.value()).toBe(42);
      console.log('assertion completed (fakeAsync)');
    }));

  });

  describe('indirect delayed', () => {

    // fails because the expectation runs before the modification
    it('basic', () => {
      component.indirectDelayed();
      expect(component.value()).toBe(42);
      console.log('assertion completed (basic)');
    });

    // fails because the expectation runs before the modification
    it('input callback', (done) => {
      component.indirectDelayed();
      expect(component.value()).toBe(42);
      console.log('assertion completed (input callback)');
      done();
    });

    // fails because the expectation runs before the modification
    it('waitForAsync', waitForAsync(() => {
      fixture.ngZone!.run(() => component.indirectDelayed());
      expect(component.value()).toBe(42);
      console.log('assertion completed (waitForAsync)');
    }));

    it('waitForAsync & whenStable', waitForAsync(() => {
      fixture.ngZone!.run(() => component.indirectDelayed());
      fixture.whenStable().then(() => expect(component.value()).toBe(42));
      console.log('assertion completed (waitForAsync & whenStable)');
    }));

    it('waitForAsync & await whenStable', waitForAsync(async () => {
      fixture.ngZone!.run(() => component.indirectDelayed());
      await fixture.whenStable();
      expect(component.value()).toBe(42);
      console.log('assertion completed (waitForAsync & await whenStable)');
    }));

    // fails because the expectation runs before the modification
    it('fakeAsync', fakeAsync(() => {
      component.indirectDelayed();
      expect(component.value()).toBe(42);
      console.log('assertion completed (fakeAsync)');
    }));

    // fails because tick() is equivalent to tick(0), and does not sufficiently advance virtual time
    it('fakeAsync & tick', fakeAsync(() => {
      component.indirectDelayed();
      tick();
      expect(component.value()).toBe(42);
      console.log('assertion completed (fakeAsync & tick)');
    }));

    it('fakeAsync & explicit tick', fakeAsync(() => {
      component.indirectDelayed();
      tick(1000);
      expect(component.value()).toBe(42);
      console.log('assertion completed (fakeAsync & explicit tick)');
    }));

    it('fakeAsync & flush', fakeAsync(() => {
      component.indirectDelayed();
      flush();
      expect(component.value()).toBe(42);
      console.log('assertion completed (fakeAsync & flush)');
    }));

    // fails because setTimeout is not a micro task
    it('fakeAsync & flushMicrotasks', fakeAsync(() => {
      component.indirectDelayed();
      flushMicrotasks();
      expect(component.value()).toBe(42);
      console.log('assertion completed (fakeAsync & flushMicrotasks)');
    }));

  });

});
