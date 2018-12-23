import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('Component foo', () => {
  let component;
  let model = {};

  beforeEach(() => {
    component = StageComponent
      .withResources('foo')
      .inView('<foo></foo>')
      .boundTo(model);
  });

  afterEach(() => {
    if (component) {
      component.dispose();
      component = null;
    }
  });

  it('should render message', done => {
    component.create(bootstrap).then(() => {
      const view = component.element;
      expect(view.textContent.includes('Foo!')).toBe(true);
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
