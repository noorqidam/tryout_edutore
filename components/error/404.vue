<template>
  <div class="error-404 container text-center mt-5 pt-4 mb-2">
    <img src="~/assets/img/404.png" style="width: 200px">
    <h1 class="h1 text-center">
      Halaman tidak ditemukan
    </h1>
    <nuxt-link to="/">
      Home page
    </nuxt-link>
  </div>
</template>
<script>
export default {
  name: 'Error404',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style  scoped>
  #err {
    min-height: 300px;
    margin-top: auto;
  }
</style>
