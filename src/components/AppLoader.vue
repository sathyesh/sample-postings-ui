<template>
  <transition name="fade">
    <div class="loading-container" v-if="showLoading">
      <img :src="url" alt="Loading..." />
    </div>
  </transition>
</template>

<script>
import loadingIcon from '@/assets/images/app-loader.svg';

export default {
  name: 'AppLoader',
  props: {
    showLoading: {
      type: Boolean,
      default: true,
    },
    url: {
      type: String,
      default: loadingIcon,
    },
  },
};
</script>

<style scoped lang="scss">
.loading-container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  top: 50%;
  left: 50%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
