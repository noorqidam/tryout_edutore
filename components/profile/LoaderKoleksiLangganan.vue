<template>
  <div>
    <div class="row">
      <div class="col-12">
        <ContentLoader
          :height="35"
          primary-color="#d7d9db"
        >
          <rect
            x="2"
            y="10"
            rx="3"
            ry="3"
            width="100"
            height="12"
          />
        </ContentLoader>
      </div>
      <div v-for="i in v" :key="i" class="col-6 col-lg-3 col-sm-4">
        <ContentLoader
          :width="800"
          :height="1500"
          primary-color="#d7d9db"
        >
          <rect
            x="0"
            y="0"
            rx="50"
            ry="50"
            width="800"
            height="1350"
          />
        </ContentLoader>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    ContentLoader
  },
  data () {
    return {
      v: 4
    }
  }
}
</script>

<style scoped>
</style>
