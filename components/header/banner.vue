<template>
  <div class="mt-5 pt-4">
    <div class="swiper-container main-banner mt-2">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="https://edutore.com/_nuxt/img/cc32a14.jpg" class="img-fluid" alt="">
        </div>
      </div>
      <div class="swiper-button-next" />
      <div class="swiper-button-prev" />
      <div class="swiper-pagination" />
    </div>
    <div class="container mt-5 mb-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div @click="showEdutes" class="title-block text-center" style="cursor:pointer">
            Edutest
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data () {
    return {
      items: []
    }
  },
  methods: {
    showEdutes () {
      this.$router.push({
        name: 'edutes'
      })
    }
  }
}
</script>
