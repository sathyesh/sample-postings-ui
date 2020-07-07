import { shallowMount } from '@vue/test-utils';
import Postings from '@/views/Postings.vue';
import store from '@/store';

describe('Postings.vue', () => {
  const wrapper = (options) => shallowMount(Postings, options || {});
  it('posting data-test attribute is set on li element', () => {
    const localWrapper = wrapper({
      stubs: ['v-select', 'app-loader'],
      store,
      computed: {
        isLoading: () => false,
        getFilteredPostings: () => ([{
          name: 'Manager',
          location: {
            city: 'Berlin',
            countryName: 'Germany',
          },
        }]),
      },
    });
    expect(localWrapper.get('li').attributes('data-test')).toMatch('posting');
  });
  it('posting-name data-test attribute is set on p post__item--title element', () => {
    const localWrapper = wrapper({
      stubs: ['v-select', 'app-loader'],
      store,
      computed: {
        isLoading: () => false,
        getFilteredPostings: () => ([{
          name: 'Manager',
          location: {
            city: 'Berlin',
            countryName: 'Germany',
          },
        }]),
      },
    });
    expect(localWrapper.get('p.post__item--title').attributes('data-test')).toMatch('posting-name');
  });

  it('posting-location data-test attribute is set on p post__item--description element', () => {
    const localWrapper = wrapper({
      stubs: ['v-select', 'app-loader'],
      store,
      computed: {
        isLoading: () => false,
        getFilteredPostings: () => ([{
          name: 'Manager',
          location: {
            city: 'Berlin',
            countryName: 'Germany',
          },
        }]),
      },
    });
    expect(localWrapper.get('p.post__item--description').attributes('data-test')).toMatch('posting-location');
  });
});
