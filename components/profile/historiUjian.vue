<template>
  <div class="container">
    <div v-if="show" class="row">
      <div class="col-md-12">
        <h2 class="title-konten">
          History Ujian Saya
        </h2>
      </div>
      <div v-if="historyUjian.length > 0" class="col-md-12 mb-2">
        <div class="row">
          <div v-for="(myHistoryUjian, index) in historyUjian" :key="index" class="col-md-3 col-6">
            <router-link :to="{ path :'/user/histori/ujian/' + myHistoryUjian._id.ujian_id }" class="hide-line">
              <div class="card-ujian">
                <div v-if="myHistoryUjian.ujian[0]" class="text-center p-2 banner-custom">
                  <img v-if="myHistoryUjian.ujian[0].ujian_banner" :src="pathImage + myHistoryUjian.ujian[0].ujian_banner" :alt="myHistoryUjian.ujian[0].ujian_banner" class="img-fluid img-center">
                  <img v-else src="~/assets/img/edutore_book.png" alt="'Edutore'" class="img-fluid">
                </div>
                <div v-else>
                  <img src="~/assets/img/edutore_book.png" alt="'Edutore'" class="img-fluid">
                </div>
                <div class="pl-2 pr-2 pb-1">
                  <div class="mt-1 mb-1">
                    <h6 class="title-book">
                      <i class="fa fa-book" style="font-size: 16px;color: #404040" />
                      {{ myHistoryUjian.ujian[0] ? myHistoryUjian.ujian[0].judul_ujian : "" }}
                    </h6>
                  </div>
                  <div class="mt-1 mb-2">
                    <span class="badge badge-pill badge-primary pb-2">
                      <i class="fa fa-clock" style="font-size: 16px;" />
                      {{ myHistoryUjian.ujian[0] ? myHistoryUjian.ujian[0].times : "" }}
                    </span>
                  </div>
                  <div style="align-self-center">
                    <p class="text-center title-date">
                      <i class="fa fa-calendar-alt" />
                      {{ _formatDate(myHistoryUjian.ujian[0] ? myHistoryUjian.ujian[0].start_date : "") }}
                    </p>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else class="col-md-12 text-center mb-3">
        <img src="~/assets/img/keranjang-belanja.png" style="width: 20%">
        <h6 class="mt-3">
          Anda belum memikili history ujian. Silahkan mulai ujian untuk melihat history ujian.
        </h6>
      </div>
    </div>
    <div v-else>
      <LoaderHistori />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import firebase from '~/services/fireinit'
const LoaderHistori = () => import('~/components/profile/LoaderHistori')
export default {
  name: 'HistoriUjian',
  components: {
    LoaderHistori
  },
  data () {
    return {
      historyUjian: [],
      token: null,
      show: false,
      User: null,
      pathImage: 'https://storage.googleapis.com/edutore-cdn/tryout/'
    }
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.User = user.displayName
        user.getIdToken(true).then((accesstoken) => {
          this.token = accesstoken
          this._actionGetHistoryUjian(accesstoken)
        })
      }
    })
  },
  methods: {
    _actionGetHistoryUjian (token) {
      this.$axios.get('history-ujian', { headers: { 'x-access-token': token } })
        .then((response) => {
          if (response.data.success === 'true') {
            const data = response.data.data
            this.historyUjian = data
            this.show = true
          } else {
            this.show = false
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    _actionDetailSesi (id) {
      this.$router.push({
        path: '/user/book/' + id
      })
    },
    _formatDate (tgl) {
      return moment(tgl).format('DD MMM YYYY')
    }
  }
}
</script>

<style scoped>
@import "../profile/backgroundImg64.css";
.card-sesi {
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}
.img-center {
  margin: auto;
}
.card-sesi:hover {
  transform: translateY(-5px);
  opacity: 0.8;
  transition: 0.4s all ease;
  cursor: pointer;
}
.div-sesi {
  background-color: #1e8cd7;
  border-radius: 12px 12px 0px 0px;
  padding: 5px;
  height: 40px
}
.txt-sesi {
  color: #fff;
  font-size: 20px;
  font-family: ElliotSans-Bold;
  font-weight: bold;
}
.txt-sub-sesi {
  color: #808080;
  font-size: 17px;
}
.txt-sesi-soal {
  color: #557cbf;
  font-size: 17px;
  margin-left: 5px;
}
.card-ujian {
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  margin-bottom: 5px;
  margin-top: 5px;
  background-color: #fff;
  cursor: pointer;
  height: 373px;
}
.card-ujian:hover {
  transform: translateY(-5px);
  opacity: 0.8;
  transition: 0.4s all ease;
}
.title-konten {
    padding: 30px 30px 0;
    font-size: 21px;
    color: #1e9cd7;
    font-weight: bold;
}
.default-image {
    width: 100%;
    min-height: 155.5px;
    border-radius: 5px;
}
.title-book {
    font-size: 14px;
    height: 48px;
    font-weight: bold;
    color: #404040;
    text-decoration: none;
}
.title-date {
  color:#557cbf;
  font-size: 11px;
  border: 1px solid #557cbf;
  padding: 5px;
  border-radius:8px
}
.bg-owl {
  background-color: none;
  background-position-y: 850px;
}
.bg-table {
  background-color: rgba(255, 255, 255, 0.7);
  border: 2px solid #1e9cd7;
}
.hide-line {
  text-decoration: none;
}
.banner-custom {
  display: flex;
  height: 338px;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@media (min-width: 319.98px) {
  .card-ujian {
    height: 298px;
  }
  .title-book {
    height: 48px;
  }
  .banner-custom {
    height: 164px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
@media (min-width: 350px) {
  .card-ujian {
    height: 337px;
  }
  .title-book {
    height: 48px;
  }
  .banner-custom {
    height: 205px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
@media (min-width: 399.98px) {
  .card-ujian {
    height: 365px;
  }
  .title-book {
    height: 48px;
  }
  .banner-custom {
    height: 225px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
@media (min-width: 410.98px) {
  .card-ujian {
    height: 365px;
  }
  .title-book {
    height: 38px;
  }
  .banner-custom {
    height: 235px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
@media (min-width: 576px) {
  .card-ujian {
    height: 346px;
  }
  .title-book {
    height: 48px;
  }
  .banner-custom {
    height: 205px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
@media (min-width: 768px) {
  .card-ujian {
    height: 273px;
  }
  .title-book {
    height: 30px;
  }
  .banner-custom {
    height: 150px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
@media (min-width: 992px) {
  .card-ujian {
    height: 430px;
  }
  .title-book {
    height: 30px;
  }
  .banner-custom {
    height: 297px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
@media (min-width: 1200px) {
  .card-ujian {
    height: 458px;
  }
  .banner-custom {
    height: 335px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
</style>
