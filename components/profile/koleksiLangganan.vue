<template>
  <div class="container">
    <div v-if="show" class="row">
      <div class="col-md-12">
        <h2 class="title-konten">
          Koleksi Langganan Saya
        </h2>
      </div>
      <div v-if="dataLangganan.length > 0" class="row col-md-12 p-3">
        <div v-for=" langganan in dataLangganan" :key="langganan._id" class="col-6 col-lg-4 col-sm-4">
          <div v-if="!langganan.isExpired">
            <div class="box-langganan">
              <h6>{{ langganan.paket_langganan.package_name }}</h6>
              <hr>
              <div v-html="langganan.paket_langganan.descriptions" class="content" />
              <hr>
              <div class="expired-date2">
                Exp. Date : {{ _formatDate(langganan.expire_at) }}
              </div>
              <nuxt-link :to="{path:'subscriptions/details',query:{id:langganan.id}}" class="btn btn-buy-langganan">
                Detail
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="col-md-12 text-center">
        <img src="~/assets/img/keranjang-belanja.png" style="width: 20%;">
        <h6 class="mt-3">
          Anda belum memiliki koleksi langganan module. Silahkan pilih langganan yang ingin anda beli.
        </h6>
        <!-- <nuxt-link to="/">
          <h6>Berlangganan Buku Sekarang</h6>
        </nuxt-link> -->
      </div>
    </div>
    <div v-else>
      <LoaderLangganan />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import firebase from '~/services/fireinit'
const LoaderLangganan = () => import('~/components/profile/LoaderKoleksiLangganan')
moment.locale('id')
export default {
  name: 'Langganan',
  components: {
    LoaderLangganan
  },
  data () {
    return {
      show: false,
      User: null,
      token: null,
      isExpired: '',
      dataLangganan: []
    }
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.User = user.displayName
        user.getIdToken(true).then((accesstoken) => {
          this.token = accesstoken
          this._actionGetHistoryMySubscriptions(accesstoken)
        })
      }
    })
  },
  created () {},
  methods: {
    _actionGetHistoryMySubscriptions () {
      this.$axios.get('https://api.edutore.com/api/v1/my-subscriptions', { headers: { 'x-access-token': this.token } })
        .then((response) => {
          const FilterData = response.data.data.rows
          if (response.data.success === 'true') {
            const dataLangganan = FilterData.filter((element) => {
              const now = moment().format('YYYY-MM-DD')
              const langgananActive = moment(new Date(element.expire_at)).format('YYYY-MM-DD')
              return moment(now).isAfter(langgananActive, 'day') === false
            })
            this.dataLangganan = dataLangganan
            this.show = true
          } else {
            this.show = false
          }
        }).catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.response)
        })
    },
    _formatDate (tgl) {
      return moment(tgl).format('DD MMM YYYY')
    }
  }
}
</script>

<style scoped>
.card-table {
    min-height: 410px;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
    margin-bottom: 24px;
    padding-bottom: 10px;
}

.title-konten {
    padding: 30px 30px 0;
    font-size: 21px;
    font-weight: bold;
    color: #1e9cd7;
}

.row-book {
    padding: 15px;
}

.books {
    margin-bottom: 10px;
}

.title-book {
    font-size: 13px;
    color: #404040;
    margin: 14px 0;
    font-family: ElliotSans-Regular;
    text-decoration: none;
}

.title-book:hover {
    font-size: 13px;
    color: #404040;
    margin: 14px 0;
    font-family: ElliotSans-Regular;
}

.default-image {
    width: 100%;
    min-height: 155.5px;
    border-radius: 5px;
}

.keranjang-kosong {
    text-align: center;
    width: 100%;
    margin: 0 auto;
}
.box-langganan{
  width: 100%;
  background: #ffffff;
  box-shadow: 1px 1px 10px 1px #dadada;
  margin-top: 15px;
  border-radius: 10px;
  min-height: 300px;
  padding: 10px;
}
.box-langganan h6{
  text-align: center;
  font-weight: 700;
}
.box-langganan .content{
  margin: 0;
  height: 320px;
  overflow: hidden;
}
.box-langganan .price{
  text-align: center;
  color: #FECA12;
  font: bold 18pt ElliotSans-Regular;
  margin-bottom: 15px;
}

.box-langganan .expired-date, .expired-date2{
  text-align: center;
  font-weight: bold;
  font: bold 14pt ElliotSans-Regular;
  margin-bottom: 15px;
}

.box-langganan .btn-buy-langganan{
  text-align: center;
  background-color: #1B9BD7;
  color: #ffffff;
  border-radius: 15px;
  width: 100%;
}
button.btn-buy-langganan{
  text-align: center;
  background-color: #557CBE;
  color: #ffffff;
  border-radius: 15px;
  width: 100%;
}
.btn-buy-langganan:hover{
  background-color: #3950C1;
}
</style>
