import {ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync} from '@angular/core/testing';

import { ObservableComponent } from './observable.component';

describe('ObservableComponent', () => {

  let component: ObservableComponent;
  let fixture: ComponentFixture<ObservableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('immediate', () => {

    it('basic', () => {
      const observable = component.immediate();
      observable.subscribe(value => {
        expect(value).toBe(42);
        console.log('assertion completed (basic)!');
      });
    });

    it('input callback', (done) => {
      const observable = component.immediate();
      observable.subscribe(value => {
        expect(value).toBe(42);
        console.log('assertion completed (input callback)!');
        done();
      });
    });

    it('waitForAsync', waitForAsync(() => {
      const observable = component.immediate();
      observable.subscribe(value => {
        expect(value).toBe(42);
        console.log('assertion completed (waitForAsync)!');
      });
    }));

    it('fakeAsync', fakeAsync(() => {
      const observable = component.immediate();
      observable.subscribe(value => {
        expect(value).toBe(42);
        console.log('assertion completed (fakeAsync)!');
      });
    }));

  });

  describe('delayed', () => {

    // the test finishes before the expectation
    it('basic', () => {
      const observable = component.delayed();
      observable.subscribe(value => {
        expect(value).toBe(42);
        console.log('assertion completed (basic)!');
      });
    });

    it('input callback', (done) => {
      const observable = component.delayed();
      observable.subscribe(value => {
        expect(value).toBe(42);
        console.log('assertion completed (input callback)!');
        done();
      });
    });

    it('waitForAsync', waitForAsync(() => {
      const observable = component.delayed();
      observable.subscribe(value => {
        expect(value).toBe(42);
        console.log('assertion completed (waitForAsync)!');
      });
    }));

    it('fakeAsync', fakeAsync(() => {
      const observable = component.delayed();
      observable.subscribe(value => {
        expect(value).toBe(42);
        console.log('assertion completed (fakeAsync)!');
      });
    }));

  });

  describe('indirect immediate', () => {

    it('basic', () => {
      component.indirectImmediate();
      expect(component.value).toBe(42);
      console.log('assertion completed (basic)');
    });

    it('input callback', (done) => {
      component.indirectImmediate();
      expect(component.value).toBe(42);
      console.log('assertion completed (input callback)');
      done();
    });

    it('waitForAsync', waitForAsync(() => {
      component.indirectImmediate();
      expect(component.value).toBe(42);
      console.log('assertion completed (waitForAsync)');
    }));

    it('fakeAsync', fakeAsync(() => {
      component.indirectImmediate();
      expect(component.value).toBe(42);
      console.log('assertion completed (fakeAsync)');
    }));

  });

  describe('indirect delayed', () => {

    // fails because the expectation runs before the modification
    it('basic', () => {
      component.indirectDelayed();
      expect(component.value).toBe(42);
      console.log('assertion completed (basic)');
    });

    // fails because the expectation runs before the modification
    it('input callback', (done) => {
      component.indirectDelayed();
      expect(component.value).toBe(42);
      console.log('assertion completed (input callback)');
      done();
    });

    // fails because the expectation runs before the modification
    it('waitForAsync', waitForAsync(() => {
      fixture.ngZone!.run(() => component.indirectDelayed());
      expect(component.value).toBe(42);
      console.log('assertion completed (waitForAsync)');
    }));

    it('waitForAsync & whenStable', waitForAsync(() => {
      fixture.ngZone!.run(() => component.indirectDelayed());
      fixture.whenStable().then(() => expect(component.value).toBe(42));
      console.log('assertion completed (waitForAsync & whenStable)');
    }));

    it('waitForAsync & await whenStable', waitForAsync(async () => {
      fixture.ngZone!.run(() => component.indirectDelayed());
      await fixture.whenStable();
      expect(component.value).toBe(42);
      console.log('assertion completed (waitForAsync & await whenStable)');
    }));

    // fails because the expectation runs before the modification
    it('fakeAsync', fakeAsync(() => {
      component.indirectDelayed();
      expect(component.value).toBe(42);
      console.log('assertion completed (fakeAsync)');
    }));

    // fails because tick() is equivalent to tick(0), and does not sufficiently advance virtual time
    it('fakeAsync & tick', fakeAsync(() => {
      component.indirectDelayed();
      tick();
      expect(component.value).toBe(42);
      console.log('assertion completed (fakeAsync & tick)');
    }));

    it('fakeAsync & explicit tick', fakeAsync(() => {
      component.indirectDelayed();
      tick(1000);
      expect(component.value).toBe(42);
      console.log('assertion completed (fakeAsync & explicit tick)');
    }));

    // does not work for unknown reasons (in comparison: works when dealing with a Promise instead of an Observable)
    it('fakeAsync & flush', fakeAsync(() => {
      component.indirectDelayed();
      flush();
      expect(component.value).toBe(42);
      console.log('assertion completed (fakeAsync & flush)');
    }));

    // fails because setTimeout is not a micro task
    it('fakeAsync & flushMicrotasks', fakeAsync(() => {
      component.indirectDelayed();
      flushMicrotasks();
      expect(component.value).toBe(42);
      console.log('assertion completed (fakeAsync & flushMicrotasks)');
    }));

  });

});
