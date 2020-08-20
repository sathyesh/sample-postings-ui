<template>
  <div class="container">
    <app-loader :showLoading="isLoading"></app-loader>
    <div class="select-container">
      <v-select
        class="app-select"
        :placeholder="countryPlaceholder"
        :value="getSelectedCountry"
        @input="setCountry"
        label="country"
        :options="getCountryListFromPostings"
      ></v-select>
      <v-select
        class="app-select"
        :placeholder="departmentPlaceholder"
        :value="getSelectedDepartment"
        @input="setDepartment"
        :options="getDepartmentListFromPostings"
      ></v-select>
    </div>
    <div class="post-container" v-if="!isLoading">
      <p v-if="getFilteredPostings.length === 0">{{filterSelectionErrortext}}</p>
      <app-posts-list :posts="getFilteredPostings" id="infinite-list" @postClicked="goToPostingDetails">
      </app-posts-list>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AppConstants from '@/constants/app.constant';
import AppPostsList from '@/components/AppPostsList.vue';

export default {
  name: 'Postings',
  components: {
    AppPostsList,
  },
  computed: {
    ...mapGetters('appLoader', ['isLoading']),
    ...mapGetters('postings', ['getFilteredPostings', 'getPostingsQueryParams', 'getCountryListFromPostings',
      'getDepartmentListFromPostings', 'getSelectedCountry', 'getSelectedDepartment']),
  },
  data: () => ({
    bottom: false, // To indicate window bottom is visible or not
    filterSelectionErrortext: AppConstants.FILTER_SELECTION_ERROR_TEXT,
    countryPlaceholder: AppConstants.SELECT_COUNTRY_PLACEHOLDER,
    departmentPlaceholder: AppConstants.SELECT_DEPARTMENT_PLACEHOLDER,
  }),
  methods: {
    ...mapActions('postings', ['fetchPostings', 'fetchPostingDetails', 'setSelectedCountry', 'setSelectedDepartment', 'setPostingDetails']),
    goToPostingDetails(post) {
      this.setPostingDetails({ postingDetails: {} });
      this.$router.push(`post/${post.id}`);
    },
    // Method to find bottom of page is visible or not
    bottomVisible() {
      const { scrollY } = window;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    getPostingsFromServer() {
      const { limit, offset, totalFound } = this.getPostingsQueryParams;
      if (totalFound === 0 || offset < totalFound) {
        this.fetchPostings({
          limit,
          offset,
        });
      }
    },
    setCountry(selected) {
      this.setSelectedCountry(selected || '');
    },
    setDepartment(selected) {
      this.setSelectedDepartment(selected || '');
    },
    scrollHandler() {
      this.bottom = this.bottomVisible();
    },
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.getPostingsFromServer();
      }
    },
  },
  created() {
    this.getPostingsFromServer();
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  activated() {
    window.addEventListener('scroll', this.scrollHandler, false);
  },
  deactivated() {
    window.removeEventListener('scroll', this.scrollHandler, false);
  },
};
</script>
