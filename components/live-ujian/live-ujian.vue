<template>
  <div class="container-fluid">
    <div class="row mb-3">
      <div class="col-md-12">
        <div v-if="show" class="row">
          <div v-for="item in items " :key="item._id" class="col-6 col-sm-6 col-md-3" style="margin-top:24px">
            <div class="card">
              <div class="card-body">
                <div class="text-center" style="margin-bottom: 10px">
                  <img v-if="item.ujian_banner" v-lazy.container="pathBanner + item.ujian_banner" :alt="item.ujian_banner" class="img-fluid">
                  <img v-else v-lazy.container="pathBanner + 'edutore.jpg'" alt="'Edutore'" class="img-fluid">
                </div>
                <p class="card-title title-book">
                  {{ item.judul_ujian }}
                </p>
                <p v-if="item.is_private">
                  <i class="fa fa-lock" />
                  <span class="badge badge-pill badge-primary"> Ujian </span>
                </p>
                <p v-else>
                  <i class="fa fa-user" />
                  <span class="badge badge-pill badge-primary"> Ujian </span>
                </p>

                <p class="card-text title-penyelenggara">
                  {{ item.penyelenggara }}
                </p>
                <div style="align-self-center">
                  <p class="text-center title-date">
                    <i class="fa fa-calendar-o" />
                    {{ _formatDate(item.start_date) }}
                    <span class="text-date">({{ item.times }}-{{ item.end_times }})</span>
                  </p>
                </div>
                <div class="text-center">
                  <router-link :to="{ path :'/ujian/'+ item._id , query: { slug: item.ujian_slug,publisher:item.penyelenggara,id:item._id }}" class="btn button-detail">
                    <p class="text-center title-button-detail">
                      Lihat Detail
                    </p>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="row mt-4 pt-3">
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
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import moment from 'moment'
export default {
  name: 'LiveUjian',
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
      this.$axios.get('live-ujian').then((response) => {
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
