<template>
  <div id="app" data-test="app">
    <notifications />
    <app-header :title="appTitle"></app-header>
    <main class="app-main-content">
      <keep-alive include="Postings">
        <router-view />
      </keep-alive>
    </main>
  </div>
</template>
<script>
// @ is an alias to /src
import AppHeader from '@/components/AppHeader.vue';
import AppConstants from '@/constants/app.constant';

export default {
  name: 'App',
  data: () => ({
    appTitle: AppConstants.APP_TITLE,
  }),
  components: {
    AppHeader,
  },
};
</script>

<style lang="scss">
</style>
