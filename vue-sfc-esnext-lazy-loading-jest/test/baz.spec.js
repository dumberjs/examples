import { mount } from '@vue/test-utils';
import Baz from '../src/baz.vue';

describe('Baz', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(Baz);

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('Baz');
  });
});
