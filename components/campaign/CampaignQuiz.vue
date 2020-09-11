<template>
  <div>
    <div v-if="show">
      <h2 class="title-rec">
        <b>Rekomendasi</b>
      </h2>
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in items" v-bind:key="item.id" class="col-6 col-md-2 m-3 card-campaign">
          <div>
            <a :href="pathModuleEdutore + item.modules.module_slug" target="_blank" style="text-decoration: none">
              <div class="pt-2">
                <img :src="pathImage + item.modules.image" alt="index2" class="img-fluid" style="border-radius: 5px">
              </div>
              <div class="mt-1 p-1">
                <p class="mb-1 title-book">
                  {{ item.modules.name.substr(0,30) }} . . . . .
                </p>
              </div>
            </a>
          </div>
        </swiper-slide>
        <div slot="pagination" class="swiper-pagination" />
      </swiper>
    </div>
    <div v-else>
      <h2 class="title-rec">
        <b>Rekomendasi</b>
      </h2>
      <LoaderCampaign />
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
const LoaderCampaign = () => import('~/components/campaign/LoaderCampaign')
export default {
  components: {
    LoaderCampaign
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 5,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1024: {
            slidesPerView: 5
          },
          768: {
            slidesPerView: 4.6
          },
          640: {
            slidesPerView: 1.6
          },
          320: {
            slidesPerView: 1.6
          }
        }
      },
      pathImage: 'https://storage.googleapis.com/edutore-cdn/public/module/thumb/',
      items: [],
      show: false,
      pathModuleEdutore: 'https://edutore.com/modules/'
    }
  },
  mounted () {
    this._actionGetModulRecom()
  },
  methods: {
    async _actionGetModulRecom () {
      await axios.get('https://api.edutore.com/api/v1/recommendations').then((response) => {
        const dataRecomendation = response.data.data.rows
        if (response.data.success === 'true') {
          this.items = dataRecomendation[Math.floor(Math.random() * 4)].rekomendasi_module
          this.show = true
        } else {
          this.show = false
        }
      })
    }
  }
}
</script>

<style src="./GlobalCampaign.css" scoped>
</style>
