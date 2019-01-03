import { mount } from '@vue/test-utils';
import Hello from '../src/hello';

describe('Hello', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(Hello);

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('Hello from Vue!');
  });
});
