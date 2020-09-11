<template>
  <div>
    <div v-if="show" class="col-12">
      <div class="row card-table">
        <div class="col-12">
          <div class="col-12">
            <h2 class="title-konten">
              History Order Module Saya
            </h2>
          </div>
          <div v-if="historyModule.length !== 0" class="table-responsive">
            <table class="table text-style-table">
              <thead>
                <tr>
                  <th scope="col-1">
                    #
                  </th>
                  <th scope="col">
                    Order ID
                  </th>
                  <th scope="col">
                    Module Name
                  </th>
                  <th scope="col">
                    Qty
                  </th>
                  <th scope="col">
                    Price
                  </th>
                  <th scope="col">
                    Payment Status
                  </th>
                  <th scope="col">
                    Expired At
                  </th>
                  <th scope="col">
                    Order At
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(myHistoryModules, index) in historyModule" :key="index">
                  <th scope="row">
                    {{ index + 1 }}
                  </th>
                  <td>{{ myHistoryModules.order_details[0].order_id }}</td>
                  <td>{{ myHistoryModules.order_details[0].module_name }}</td>
                  <td>{{ myHistoryModules.order_details[0].qty }}</td>
                  <td>{{ myHistoryModules.order_details[0].price }}</td>
                  <td v-if="myHistoryModules.payment_status === true" class="text-center">
                    <span class="badge badge-success">Telah dibayar</span>
                  </td>
                  <td v-else-if="$moment().isAfter($moment(myHistoryModules.expire_at)) && myHistoryModules.payment_status == false" class="text-center">
                    <span class="badge badge-danger">Expired</span>
                  </td>
                  <td v-else class="text-center">
                    <span class="badge badge-secondary">Belum dibayar</span>
                  </td>
                  <td>{{ $moment(myHistoryModules.expire_at).format('DD MMM YYYY') }}</td>
                  <td>{{ $moment(myHistoryModules.order_details[0].createdAt).format('DD MMM YYYY') }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="text-center" style="font-family: ElliotSans-Regular">
            <img src="~/assets/img/keranjang-belanja.png" style="width: 30%">
            <h6 class="mt-3">
              Anda belum memikili history Module. Silahkan Order Module untuk melihat history ujian.
            </h6>
            <nuxt-link to="/">
              <h6>Order Module Sekarang</h6>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card-table">
      <LoaderHistori />
    </div>
  </div>
</template>

<script>
import firebase from '~/services/fireinit'
import axios from '~/plugins/axios'
const LoaderHistori = () => import('~/components/user/LoaderHistori')
export default {
  components: {
    LoaderHistori
  },
  data () {
    return {
      historyModule: [],
      show: false,
      User: null
    }
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.User = user.displayName
        user.getIdToken(true).then((accesstoken) => {
          this._actionGetHistoryModuleSaya(accesstoken)
        })
      }
    })
  },
  mounted () {
  },
  methods: {
    _actionGetHistoryModuleSaya (token) {
      axios.get('https://api.edutore.com/api/v1/history-order-modules', { headers: { 'x-access-token': token } }).then((response) => {
        const dataHistoryModule = response.data.data
        if (response.data.success === 'true') {
          this.historyModule = dataHistoryModule
          this.show = true
        } else {
          this.show = false
        }
      })
    }
  }
}
</script>

<style src="./GlobalHistory.css" scoped>
</style>
