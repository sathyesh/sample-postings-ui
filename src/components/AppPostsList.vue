<template>
  <ul class="post__header">
      <li data-test="posting"
          @click="listItemClicked(item)"
          v-for="(item,index) in posts"
          :key="index">
            <app-post :postObj="item" class="post__item post__item--animate">
            </app-post>
      </li>
  </ul>
</template>

<script>
import AppPost from './AppPost.vue';

export default {
  name: 'AppPostsList',
  components: {
    AppPost,
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    listItemClicked(post) {
      this.$emit('postClicked', post);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
