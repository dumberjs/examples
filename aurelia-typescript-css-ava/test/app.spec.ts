import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import test from 'ava';

test('should render message', async t => {
  let component = StageComponent
      .withResources('app')
      .inView('<app></app>')
      .boundTo({});

  await component.create(bootstrap);

  const view = component.element;
  t.is(view.textContent.trim(), 'Hello Aurelia!');

  if (component) {
    component.dispose();
  }
});
