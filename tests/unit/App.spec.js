import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import AppHeader from '@/components/AppHeader.vue';

describe('App.vue', () => {
  const wrapper = (options) => mount(App, options || {});
  it('app data-test attribute is set on App ID', () => {
    const localWrapper = wrapper({
      stubs: ['router-view', 'notifications'],
    });
    expect(localWrapper.find('#app').attributes('data-test')).toMatch('app');
  });
  it('renders AppHeader component', () => {
    const localWrapper = wrapper({
      stubs: ['router-view', 'notifications'],
    });
    expect(localWrapper.findComponent(AppHeader).exists()).toBeTruthy();
  });
});
