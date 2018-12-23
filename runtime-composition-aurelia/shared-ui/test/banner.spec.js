import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import test from 'tape';

test('should render message with default info style', t => {
  let component = StageComponent
      .withResources('shared-ui/elements/banner')
      .inView('<banner>hello</banner>')
      .boundTo({});

  component.create(bootstrap)
  .then(
    () => {
      const view = component.element;
      t.ok(view.classList.contains('info'));
      t.equal(view.textContent.trim(), 'hello');
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

test('should render message with warning style', t => {
  let component = StageComponent
      .withResources('shared-ui/elements/banner')
      .inView('<banner type="warning">hello2</banner>')
      .boundTo({});

  component.create(bootstrap)
  .then(
    () => {
      const view = component.element;
      t.ok(view.classList.contains('warning'));
      t.equal(view.textContent.trim(), 'hello2');
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
