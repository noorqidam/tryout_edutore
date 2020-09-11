<template>
  <div class="error-500 container text-center mt-5 pt-4 mb-2">
    <img src="~/assets/img/success-buy.png" style="width: 200px">
    <h1 class="h1 text-center">
      Mohon maaf server kami sedang sibuk
    </h1>
  </div>
</template>
<script>
export default {
  name: 'Error500',
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
