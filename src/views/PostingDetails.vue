<template>
  <div class="container">
    <app-loader :showLoading="isLoading"></app-loader>
    <!-- "Icon made by Lyolya from www.flaticon.com" -->
    <div class="link-container">
      <li class="link-container--link" @click="goBack()" data-test="back">
        <img class="link-container--img" :src="url" alt="Back Link" />
        <span class="link-container--text">{{backLinkText}}</span>
      </li>
    </div>
    <div class="post-container" v-if="getPostingDetails.name">
      <div class="post__item opacity-1">
        <p class="post__item--title" data-test="posting-name">{{getPostingDetails.name}}</p>
        <p
          class="post__item--description"
          data-test="posting-location"
        >{{getPostingDetails.location.city}},{{getPostingDetails.location.countryName}}</p>
      </div>
      <div class="post__item opacity-1" data-test="job-description">
        <p class="post__item--title">{{getPostingDetails.jobAd.sections.jobDescription.title}}</p>
        <p
          class="post__item--description"
          v-html="getPostingDetails.jobAd.sections.jobDescription.text"
        ></p>
      </div>
      <div class="post__item opacity-1" data-test="job-qualifications">
        <p class="post__item--title">{{getPostingDetails.jobAd.sections.qualifications.title}}</p>
        <p
          class="post__item--description"
          v-html="getPostingDetails.jobAd.sections.qualifications.text"
        ></p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import BackIcon from '@/assets/images/back.svg';
import router from '@/router';
import AppConstants from '@/constants/app.constant';

export default {
  name: 'PostingDetails',
  data: () => ({
    url: BackIcon,
    backLinkText: AppConstants.BACK_LINK_TEXT,
    // postingDetails: getPostingDetails,
  }),
  computed: {
    ...mapGetters('postings', ['getPostingDetails']),
    ...mapGetters('appLoader', ['isLoading']),

  },
  methods: {
    ...mapActions('postings', ['fetchPostingDetails', 'setPostingDetails']),
    goBack() {
      router.go(-1);
    },
  },
  created() {
    if (this.$route.params.id) {
      this.fetchPostingDetails(this.$route.params.id);
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
