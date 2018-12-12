import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('Component home', () => {
  let component;
  let model = {};

  beforeEach(() => {
    component = StageComponent
      .withResources('home')
      .inView('<home></home>')
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
      expect(view.innerText).toBe('Home!');
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
