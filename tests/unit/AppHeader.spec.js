import { shallowMount } from '@vue/test-utils';
import AppHeader from '@/components/AppHeader.vue';

describe('AppHeader.vue', () => {
  const wrapper = (options) => shallowMount(AppHeader, options || {});

  it('renders props.title when passed', () => {
    const newtitle = 'New Title';
    const localWrapper = wrapper({
      propsData: { title: newtitle },
    });
    expect(localWrapper.text()).toMatch(newtitle);
  });

  it('contains app-header class', () => {
    const localWrapper = wrapper();
    expect(localWrapper.classes()).toContain('app-header');
  });
});
