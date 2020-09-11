<template>
  <div style="font-family:Elliot Sans">
    <Header />
    <div class="container-fluid" style="background-color:#fafafa">
      <section style="margin-top:80px">
        <div class="container">
          <div class="row">
            <!-- Kategori Bar -->
            <div class="col-md-12 text-center" style="background-color: #1e9cd7;border-radius: 15px; min-height: 128px; margin-top: 48px">
              <h1 class="title-pilih-kat">
                Pilih Kategori Test
              </h1>
              <div class="row">
                <div class="col-7 col-sm-7 mt-1" style="justify-content: flex-end; display: flex; flex-direction: 2">
                  <b-form-select
                    v-model="selected"
                    :options="opsiKategori"
                    style="font-family: ElliotSans-Medium;border-radius: 12px;width: 304px;min-height: 40px;"
                  />
                </div>
                <div class="col-5 col-sm-5 mt-1" style="justify-content: flex-start; display: flex">
                  <input type="submit" value="Cari Tes" class="btn btn-warning" style="font-family: ElliotSans-Medium; min-width: 132px; font-size: 17px">
                </div>
              </div>
            </div>
            <!-- End Kategori Bar -->
            <!-- Search Input -->
            <div class="col-md-3 offset-5" style="margin-top: 35px">
              <p class="title-search text-right">
                Pencarian
              </p>
            </div>
            <div class="col-md-4" style="margin-top: 32px; padding-right:0">
              <b-form-input v-model="text" placeholder="Cari judul tes, penyelenggara" class="txt-search" />
            </div>
            <!-- End Search Input -->
            <!-- Title Item -->
            <div class="col-md-12" style="margin-top:4px">
              <p class="text-rekomendasi">
                Ujian Bersama
              </p>
            </div>
          </div>
          <!-- End Title Item -->
          <!-- Card Item -->
          <div v-if="show" class="row">
            <div v-for="item in items" :key="item._id" class="col-xs-6 col-sm-6 col-md-3 col-lg-3" style="margin-top:38px">
              <div class="card" style="border-radius: 12px">
                <div class="text-center" style="min-height:218px;">
                  <!-- <img :src="item.image" class="img-fluid" alt="Card image" style="min-height:218px; border-radius: 12px 12px 0 0"> -->
                  <img :src="pathBanner + item.quiz_banner" :alt="item.quiz_banner" class="img-fluid">
                </div>
                <div class="card-body">
                  <h6 class="card-title title-book">
                    {{ item.judul_quiz }}
                  </h6>
                  <p class="card-text title-penyelenggara">
                    {{ item.penyelenggara }})
                  </p>
                  <p class="card-text title-price">
                    <!-- {{ item.harga }} -->
                    Rp 100.000
                  </p>
                  <div style="align-self:center">
                    <p class="text-center txt-date">
                      <!-- {{ item.tanggal }} -->
                      <font-awesome-icon icon="calendar-alt" />
                      {{ _formatDate(item.start_date) }} ( {{ item.times }}-{{ item.end_times }})
                    </p>
                  </div>
                  <div class="text-center">
                    <!-- <nuxt-link to="/ujian" class="btn button-detail" style="border-radius: 8px">
                      Lihat Detail
                    </nuxt-link> -->
                    <router-link :to="{path :'/quiz', query: {slug: item.quiz_slug,id:item._id}}" class="btn button-detail" style="border-radius: 8px">
                      Lihat Detail
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
          <!-- End Card Item -->
          <div class="col-md-12">
            <div class="mt-3">
              <b-pagination v-model="currentPage" :total-rows="rows" align="center" />
            </div>
          </div>
        </div>
      </section>
      <div class="bg-white footer pt-5 pb-3">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import moment from 'moment'
import axios from '../../plugins/axios'
const Header = () => import('~/components/header/header')
const Footer = () => import('~/components/footer/footer')
export default {
  name: 'Homepage',
  components: {
    ContentLoader,
    Header,
    Footer
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
    },
    actionReadMore () {
      this.readMoreActivated = true
    }
  }
}
</script>
<style scoped>
html {
  scroll-behavior: smooth;
}

.card {
  min-height:376px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  margin-bottom: 24px;
}
.img-fluid {
  min-height: 218px;
  width: 100%;
}
.bg-text {
  color: rgba(30, 156, 215, 1);
  text-align: left;
  font-family: Elliot Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  color: rgba(30, 156, 215, 1);
}

.bg-primarys {
  padding: 6px;
  background-color: #1e9cd7;
  color: white;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
}

.text-black {
  color: black
}

.tabs>ul {
  background-color: 1e9cd7;
  color: white
}

p {
  color: black
}

.breadcrumb-item.active {
  color: white
}

hr {
  border: 0;
  margin-bottom: 1px;
  border-top: 10px solid rgba(0, 0, 0, 0.1);
}

.text-rekomendasi {
  font-size: 25px;
  font-family: ElliotSans-Bold;
  color: #1e9cd7
}

.title-book {
  font-size: 13px;
  color: #404040;
  font-family: ElliotSans-Medium
}

.title-penyelenggara {
  font-size: 12px;
  color: #808080;
  font-family: ElliotSans-Medium
}

.title-price {
  color: #1e9cd7;
  font-size: 12px;
  font-family: ElliotSans-Medium
}

.button-detail {
  background-color: #557cbf;
  width: 97px;
  height: 20px;
  padding-bottom: 20px;
  font-size: 10px;
  color: #fff;
  font-family: ElliotSans-Medium
}
.title-pilih-kat {
  font-size: 25px;
  font-family: ElliotSans-Medium;
  color: #fff;
  margin-top: 20px;
}

.title-search {
  font-family: ElliotSans-Medium;
  font-size: 17px;
  color: #bfbfbf
}

.txt-search {
  font-family: ElliotSans-Medium;
  font-size: 13px;
  color: #bfbfbf
}

.txt-date {
  color: #557cbf;
  font-size: 11px;
  border: 1px solid #557cbf;
  font-family: ElliotSans-Medium;
  padding: 5px;
  border-radius: 8px
}
</style>
