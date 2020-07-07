import { shallowMount, createLocalVue } from '@vue/test-utils';
import PostingDetails from '@/views/PostingDetails.vue';
import store from '@/store';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('PostingDetails.vue', () => {
  const wrapper = (options) => shallowMount(PostingDetails, options || {});
  it('job-description data-test attribute is set on div', () => {
    const localWrapper = wrapper({
      localVue,
      router,
      stubs: ['app-loader'],
      store,
      computed: {
        isLoading: () => false,
        getPostingDetails: () => ({
          name: 'Manager',
          location: {
            city: 'Berlin',
            countryName: 'Germany',
          },
          jobAd: {
            sections: {
              jobDescription: { title: 'Job Title', text: 'Job Description' },
              qualifications: { title: 'Job Title', text: 'Job Description' },
            },
          },
        }),
      },

    });
    expect(localWrapper.get('div[data-test="job-description"]').attributes('data-test')).toMatch('job-description');
  });
  it('job-qualifications data-test attribute is set on div', () => {
    const localWrapper = wrapper({
      localVue,
      router,
      stubs: ['app-loader'],
      store,
      computed: {
        isLoading: () => false,
        getPostingDetails: () => ({
          name: 'Manager',
          location: {
            city: 'Berlin',
            countryName: 'Germany',
          },
          jobAd: {
            sections: {
              jobDescription: { title: 'Job Title', text: 'Job Description' },
              qualifications: { title: 'Job Title', text: 'Job Description' },
            },
          },
        }),
      },

    });
    expect(localWrapper.get('div[data-test="job-qualifications"]').attributes('data-test')).toMatch('job-qualifications');
  });
});
