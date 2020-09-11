<template>
  <div>
    <h4 class="h4 text-left bg-text" style="margin-top:44px;margin-bottom:20px">
      Rekomendasi Tes Lainnya
    </h4>
    <div v-if="show">
      <div v-for="item in items " :key="item._id" class="col-md-3 col-6" style="margin-top:24px">
        <div class="card">
          <div class="card-body">
            <div class="text-center" style="margin-bottom: 10px">
              <img v-if="item.ujian_banner" v-lazy.container="pathBanner + item.ujian_banner" :alt="item.ujian_banner" class="img-fluid">
              <img v-else v-lazy.container="pathBanner + 'edutore.jpg'" alt="'Edutore'" class="img-fluid">
            </div>
            <p class="card-title title-book">
              {{ item.judul_ujian }}
            </p>
            <p class="card-text title-penyelenggara">
              {{ item.penyelenggara }}
            </p>
            <div style="align-self-center">
              <p class="text-center title-date">
                <font-awesome-icon icon="calendar-alt" />
                {{ _formatDate(item.start_date) }} ( {{ item.times }}-{{ item.end_times }})
              </p>
            </div>
            <div class="text-center">
              <router-link :to="{ path :'/ujian/'+ item._id , query: { slug: item.ujian_slug,id:item._id }}" class="btn button-detail">
                <p class="text-center title-button-detail">
                  Lihat Detail
                </p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row">
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
import moment from 'moment'
import axios from '~/plugins/axios'
export default {
  name: 'HomePage',
  components: {
    ContentLoader
  },
  data () {
    return {
      items: [],
      pathBanner: 'https://storage.googleapis.com/edutore-cdn/tryout/',
      show: false,
      v: 8
    }
  },
  beforeMount () {
    this._actionGetDaftarUjian()
  },
  methods: {
    _actionGetDaftarUjian () {
      axios.get('all-ujian').then((response) => {
        this.show = true
        this.items = response.data.data
      })
    },
    _formatDate (tgl) {
      return moment(tgl).format('DD MMM YYYY')
    }
  }
}
</script>
<style src="../GlobalHomepage.css" scoped>
</style>
