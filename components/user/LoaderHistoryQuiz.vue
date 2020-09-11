<template>
  <div>
    <div class="row">
      <div class="col-12">
        <ContentLoader
          :height="30"
          primary-color="#d7d9db"
        >
          <rect
            x="2"
            y="10"
            rx="3"
            ry="3"
            width="100"
            height="15"
          />
        </ContentLoader>
      </div>
      <div v-for="i in v" :key="i" class="col-6 col-lg-4 col-sm-4">
        <ContentLoader
          :width="1000"
          :height="1700"
          primary-color="#d7d9db"
        >
          <rect
            x="20"
            y="10"
            rx="60"
            ry="60"
            width="980"
            height="1580"
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
      v: 6
    }
  }
}
</script>

<style scoped>
</style>
