import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import test from 'tape';

test('should render message', t => {
  let component = StageComponent
      .withResources('foo')
      .inView('<foo></foo>')
      .boundTo({});

  component.create(bootstrap)
  .then(
    () => {
      const view = component.element;
      t.equal(view['innerText'], 'Foo!');
    },
    e => {
      t.fail(e);
    }
  )
  .then(() => {
    if (component) {
      component.dispose();
      component = null;
    }
    t.end();
  });
});
