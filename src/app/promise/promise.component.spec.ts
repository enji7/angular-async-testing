import {ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync} from '@angular/core/testing';

import { PromiseComponent } from './promise.component';

describe('PromiseComponent', () => {

  let component: PromiseComponent;
  let fixture: ComponentFixture<PromiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('immediate', () => {

    // the test finishes before the expectation
    it('basic', () => {
      const promise = component.immediate();
      promise.then(value => {
        expect(value).toBe(42);
        console.log('assertion completed (basic)!');
      });
    });

    it('async & await', async () => {
      const value = await component.immediate();
      expect(value).toBe(42);
      console.log('assertion completed (async & await)');
    });

    it('input callback', (done) => {
      const promise = component.immediate();
      promise.then(value => {
        expect(value).toBe(42);
        console.log('assertion completed (input callback)!');
        done();
      });
    });

    it('waitForAsync', waitForAsync(() => {
      const promise = component.immediate();
      promise.then(value => {
        expect(value).toBe(42);
        console.log('assertion completed (waitForAsync)!');
      });
    }));

    it('fakeAsync', fakeAsync(() => {
      const promise = component.immediate();
      promise.then(value => {
        expect(value).toBe(42);
        console.log('assertion completed (fakeAsync)!');
      });
    }));

  });

  describe('delayed', () => {

    // the test finishes before the expectation
    it('basic', () => {
      const promise = component.delayed();
      promise.then(value => {
        expect(value).toBe(42);
        console.log('assertion completed (basic)!');
      });
    });

    it('async & await', async () => {
      const value = await component.delayed();
      expect(value).toBe(42);
      console.log('assertion completed (async & await)');
    });

    it('input callback', (done) => {
      const promise = component.delayed();
      promise.then(value => {
        expect(value).toBe(42);
        console.log('assertion completed (input callback)!');
        done();
      });
    });

    it('waitForAsync', waitForAsync(() => {
      const promise = component.delayed();
      promise.then(value => {
        expect(value).toBe(42);
        console.log('assertion completed (waitForAsync)!');
      });
    }));

    it('fakeAsync', fakeAsync(() => {
      const promise = component.delayed();
      promise.then(value => {
        expect(value).toBe(42);
        console.log('assertion completed (fakeAsync)!');
      });
    }));

  });

  describe('indirect immediate', () => {

    // fails because the expectation runs before the modification
    it('basic', () => {
      component.indirectImmediate();
      expect(component.value).toBe(42);
      console.log('assertion completed (basic)');
    });

    // fails because the expectation runs before the modification
    it('input callback', (done) => {
      component.indirectImmediate();
      expect(component.value).toBe(42);
      console.log('assertion completed (input callback)');
      done();
    });

    // fails because the expectation runs before the modification
    it('waitForAsync', waitForAsync(() => {
      component.indirectImmediate();
      expect(component.value).toBe(42);
      console.log('assertion completed (waitForAsync)');
    }));

    it('waitForAsync & whenStable', waitForAsync(() => {
      component.indirectImmediate();
      fixture.whenStable().then(() => {
        expect(component.value).toBe(42);
        console.log('assertion completed (waitForAsync & whenStable)');
      });
    }));

    it('waitForAsync & await whenStable', waitForAsync(async () => {
      component.indirectImmediate();
      await fixture.whenStable();
      expect(component.value).toBe(42);
      console.log('assertion completed (waitForAsync & await whenStable)');
    }));

    // fails because the expectation runs before the modification
    it('fakeAsync', fakeAsync(() => {
      component.indirectImmediate();
      expect(component.value).toBe(42);
      console.log('assertion completed (fakeAsync)');
    }));

    it('fakeAsync & tick', fakeAsync(() => {
      component.indirectImmediate();
      tick();
      expect(component.value).toBe(42);
      console.log('assertion completed (fakeAsync & tick)');
    }));

    it('fakeAsync & explicit tick', fakeAsync(() => {
      component.indirectImmediate();
      tick(1000);
      expect(component.value).toBe(42);
      console.log('assertion completed (fakeAsync & explicit tick)');
    }));

    it('fakeAsync & flush', fakeAsync(() => {
      component.indirectImmediate();
      flush();
      expect(component.value).toBe(42);
      console.log('assertion completed (fakeAsync & flush)');
    }));

    it('fakeAsync & flushMicrotasks', fakeAsync(() => {
      component.indirectImmediate();
      flushMicrotasks();
      expect(component.value).toBe(42);
      console.log('assertion completed (fakeAsync & flushMicrotasks)');
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
      fixture.whenStable().then(() => {
        expect(component.value).toBe(42);
        console.log('assertion completed (waitForAsync & whenStable)');
      });
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
