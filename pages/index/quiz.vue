<template>
  <div v-if="show" class="row">
    <div v-for="item in items " :key="item._id" class="col-sm-6 col-md-3" style="margin-top:24px">
      <div class="card">
        <div class="text-center">
          <img :src="pathBanner + item.quiz_banner" :alt="item.quiz_banner" class="img-fluid">
        </div>
        <div class="card-body">
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
            <router-link :to="{ path :'/quiz', query: { slug: item.quiz_slug,id:item._id }}" class="btn button-detail">
              <p class="text-center title-button-detail">
                Lihat Detail
              </p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { ContentLoader } from 'vue-content-loader'
import moment from 'moment'
import axios from '~/plugins/axios'
export default {
  name: 'HomePage',
  components: {
    // ContentLoader
  },
  data () {
    return {
      items: [],
      pathBanner: 'https://storage.googleapis.com/edutore-cdn/tryout/',
      show: false,
      v: 3
    }
  },
  mounted () {
    this._actionGetDaftarUjian()
    setTimeout(() => {
      this.show = true
    }, 1000)
  },
  methods: {
    async _actionGetDaftarUjian () {
      const DataUjian = await axios.get('all-quiz')
      this.items = DataUjian.data.data
    },
    _formatDate (tgl) {
      return moment(tgl).format('DD MMM YYYY')
    }
  }
}
</script>
<style scoped>
  .card{
    min-height:376px;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
    margin-bottom: 24px;
  }
  .img-fluid {
    min-height: 218px;
    width: 100%;
    border-radius: 12px 12px 0 0;
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
    width:97px;
    height:20px;
    border-radius: 8px;
    padding-bottom:20px
  }
  .title-button-detail {
    font-size:10px;
    color:#fff;
    font-family:ElliotSans-Medium
  }
</style>
