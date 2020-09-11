<template>
  <div>
    <div class="row" style="place-content: center">
      <div class="col-12">
        <ContentLoader
          :height="30"
          primary-color="#d7d9db"
        >
          <rect
            x="0"
            y="10"
            rx="3"
            ry="3"
            width="100"
            height="10"
          />
        </ContentLoader>
      </div>
      <div v-for="i in v" :key="i" class="col-6 col-lg-2 col-sm-4">
        <ContentLoader
          :width="1000"
          :height="2000"
          primary-color="#d7d9db"
        >
          <rect
            x="20"
            y="20"
            rx="3"
            ry="3"
            width="1000"
            height="1350"
          />
          <rect
            x="20"
            y="1450"
            rx="3"
            ry="3"
            width="800"
            height="50"
          />
          <rect
            x="20"
            y="1550"
            rx="3"
            ry="3"
            width="1000"
            height="50"
          />
          <rect
            x="20"
            y="1650"
            rx="3"
            ry="3"
            width="600"
            height="50"
          />
        </ContentLoader>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  name: 'LoaderHistori',
  components: {
    ContentLoader
  },
  data () {
    return {
      v: 5
    }
  }
}
</script>

<style scoped>
</style>
