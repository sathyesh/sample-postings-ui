<template>
  <div>
      <p class="post__item--title" data-test="posting-name">{{postObj.name}}</p>
      <p class="post__item--description"
        data-test="posting-location">
        {{postObj.location.city}}, {{postObj.location.countryName}}
      </p>
  </div>
</template>

<script>
export default {
  name: 'AppPost',
  props: {
    postObj: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
