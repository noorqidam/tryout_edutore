<template>
  <div>
    <div class="row">
      <div v-for="i in v" :key="i" class="col-2">
        <ContentLoader
          :width="900"
          :height="1400"
          primary-color="#d7d9db"
        >
          <rect
            x="60"
            y="2"
            rx="3"
            ry="3"
            width="800"
            height="1010"
          />
          <rect
            x="60"
            y="1050"
            rx="3"
            ry="3"
            width="600"
            height="30"
          />
          <rect
            x="60"
            y="1100"
            rx="3"
            ry="3"
            width="800"
            height="30"
          />
          <rect
            x="60"
            y="1150"
            rx="3"
            ry="3"
            width="400"
            height="30"
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
