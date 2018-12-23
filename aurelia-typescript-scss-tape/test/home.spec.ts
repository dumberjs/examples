import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import test from 'tape';

test('should render message', t => {
  let component = StageComponent
      .withResources('home')
      .inView('<home></home>')
      .boundTo({});

  component.create(bootstrap)
  .then(
    () => {
      const view = component.element;
      t.equal(view.textContent.trim(), 'Home!');
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
