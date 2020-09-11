<template>
  <div>
    <h4 class="h4 text-left bg-text" style="margin-top:20px;">
      Rekomendasi Module
    </h4>
    <div v-if="showDatas" class="row">
      <div class="col-12">
        <carousel-3d :controls-visible="true" :height="370" :width="260" :space="250">
          <slide v-for="(item ,i ) in items " :key="item._id" :index="i">
            <a :href="pathModuleEdutore + item.modules.module_slug" target="_blank" style="text-decoration: none">
              <div>
                <img :src="pathImage + item.modules.image" alt="index2" class="img-fluid" style="border-radius: 5px">
              </div>
              <div>
                <p class="mb-1 title-book">
                  {{ item.modules }}
                  {{ item.modules.name.substr(0,30) }} . . . . .
                </p>
              </div>
            </a>
          </slide>
        </carousel-3d>
      </div>
    </div>
    <div v-else class="row mt-4 pt-3">
      <h4 class="h4 text-left bg-text">
        Rekomendasi Tes Lainnya
      </h4>
      <div v-for="i in v" :key="i" class="col-md-3">
        <content-loader
          :height="475"
          :width="400"
          :speed="2"
          primary-color="#f3f3f3"
          secondary-color="#ecebeb"
        >
          <rect
            x="12"
            y="210"
            rx="4"
            ry="4"
            width="269"
            height="13"
          />
          <rect
            x="-51"
            y="-223"
            rx="5"
            ry="5"
            width="416"
            height="416"
          />
          <rect
            x="37.56"
            y="317.61"
            rx="0"
            ry="0"
            width="316"
            height="7.53"
          />
          <rect
            x="11"
            y="237"
            rx="4"
            ry="4"
            width="269"
            height="13"
          />
          <rect
            x="37.56"
            y="335.61"
            rx="0"
            ry="0"
            width="316"
            height="7.53"
          />
          <rect
            x="38.56"
            y="356.61"
            rx="0"
            ry="0"
            width="316"
            height="7.53"
          />
          <rect
            x="37.56"
            y="376.61"
            rx="0"
            ry="0"
            width="316"
            height="7.53"
          />
        </content-loader>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { Carousel3d, Slide } from 'vue-carousel-3d'
import moment from 'moment'
// import { mapState } from 'vuex'
export default {
  name: 'QuizCampaign',
  components: {
    ContentLoader, Carousel3d, Slide
  },
  data () {
    return {
      v: 5,
      showDatas: false,
      pathImage: 'https://storage.googleapis.com/edutore-cdn/public/module/thumb/',
      pathModuleEdutore: 'https://edutore.com/modules/',
      pathBanner: 'https://storage.googleapis.com/edutore-cdn/tryout/'
    }
  },
  mounted () {
    this._actionGetModulRecom()
  },
  methods: {
    _formatDate (tgl) {
      return moment(tgl).format('DD MMM YYYY')
    },
    _actionGetModulRecom () {
      this.$axios.get('https://api.edutore.com/api/v1/recommendations').then((response) => {
        const DataRecomendation = response.data.data.rows
        if (response.data.success === 'true') {
          this.items = DataRecomendation[Math.floor(Math.random() * 4)].rekomendasi_module
          this.showDatas = true
        } else {
          this.showDatas = false
        }
      })
    }
  }
}
</script>
<style src="./GlobalCampaign.css" scoped>
</style>
