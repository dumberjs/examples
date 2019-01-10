import { mount } from '@vue/test-utils';
import Foo from '../src/foo.vue';

describe('Foo', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(Foo);

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('This is Foo!');
  });
});
