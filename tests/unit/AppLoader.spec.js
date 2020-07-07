import { shallowMount } from '@vue/test-utils';
import AppLoader from '@/components/AppLoader.vue';

describe('AppLoader.vue', () => {
  const wrapper = (options) => shallowMount(AppLoader, options || {});

  it('renders props url when passed', () => {
    const passedUrl = '@/assets/images/app-loader.svg';
    const localWrapper = wrapper({
      propsData: { url: passedUrl },
    });
    expect(localWrapper.props().url).toMatch(passedUrl);
  });

  it('image value matches the props value', () => {
    const passedUrl = '@/assets/images/app-loader.svg';
    const localWrapper = wrapper({
      propsData: { url: passedUrl },
    });
    const src = localWrapper.get('img').attributes('src');
    expect(src).toMatch(passedUrl);
  });

  it('contains loading-container class', () => {
    const localWrapper = wrapper();
    expect(localWrapper.find('div').classes()).toContain('loading-container');
  });

  it('Should not contain div when showloading is false', () => {
    const localWrapper = wrapper({
      propsData: { showLoading: false },
    });
    expect(localWrapper.find('div')).not.toContain('loading-container');
  });

  it('Should not contain img when showloading is false', () => {
    const localWrapper = wrapper({
      propsData: { showLoading: false },
    });
    expect(localWrapper.find('img').exists()).toBeFalsy();
  });
});
