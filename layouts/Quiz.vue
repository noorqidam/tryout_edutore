<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col-md-12">
        <div v-if="show" class="row">
          <div v-for="item in items " :key="item._id" class="col-xs-6 col-3 col-6" style="margin-top:24px">
            <div class="card">
              <div class="card-body">
                <div class="text-center" style="margin-bottom: 10px">
                  <img v-if="item.quiz_banner" :src="pathBanner + item.quiz_banner" :alt="item.quiz_banner" class="img-fluid">
                  <img v-else :src="pathBanner + 'edutore.jpg'" alt="edutore" class="img-fluid">
                </div>
                <p class="card-title title-book">
                  {{ item.judul_quiz }}
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
                  <router-link :to="{ path :'/quiz/'+ item._id , query: { slug: item.quiz_slug,id:item._id }}" class="btn button-detail">
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
      v: 4
    }
  },
  beforeMount () {
    this._actionGetDaftarUjian()
  },
  methods: {
    _actionGetDaftarUjian () {
      axios.get('all-quiz').then((response) => {
        this.show = true
        this.items = response.data.data
      })
    },
    _formatDate (tgl) {
      if (tgl) {
        return moment(tgl).format('DD MMM YYYY')
      } else {
        return ''
      }
    }
  }
}
</script>
<style scoped>
  .card{
    min-height:376px;
    width: 100%;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
    margin-bottom: 24px;
  }
  .img-fluid {
    max-height: 218px;
    border-radius: 12px 12px 0 0;
    min-height: 218px;
  }
  .bg-text {
    color: rgba(30,156,215,1)
  }
  .bg-primarys {
    padding: 7px;
    background-color: #1e9cd7;
    color: #FFFFFF;
    font-size: 20px;
    text-align: center;
    font-weight: 300
  }
  .text-button-nav {
    font-family:ElliotSans-Bold;
    color:#FFFFFF;
    text-decoration: none
  }
  .text-button-nav:hover {
    border-bottom: 2px solid #fec810
  }
  .title-book {
    font-size:13px;
    color:#404040;
    font-family:ElliotSans-Medium
  }
  .title-penyelenggara {
    font-size:12px;
    color:#808080;
    font-family:ElliotSans-Medium
  }
  .title-date {
    color:#557cbf;
    font-size:11px;
    border:1px solid #557cbf;
    font-family: ElliotSans-Medium;
    padding:5px;
    border-radius:8px
  }
  .button-detail {
    background-color:#557cbf;
    max-width: 97px;
    height: 30px;
    border-radius: 8px;
  }
  .button-detail:hover {
    background-color: #0069d9;
  }
  .title-button-detail {
    font-size:10px;
    color:#fff;
    font-family:ElliotSans-Medium
  }
  @media (max-width: 767.98px) {
    .title-button-detail {
      margin-top: -5px;
    }
    }
    @media (max-width: 575.98px) {
  .title-button-detail {
    margin-top: 0;
  }
  }
</style>
