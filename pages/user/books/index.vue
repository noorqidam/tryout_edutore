<template>
  <div>
    <div v-if="show" class="col card-table">
      <div class="row">
        <h2 class="title-konten">
          Koleksi Modul Saya
        </h2>
      </div>
      <div v-if="myModule.length !== 0" class="row">
        <div v-for="(myBooks, index) in myModule" :key="index" class="col-6 col-lg-2 col-sm-4">
          <div class="books">
            <div class="detail-buku">
              <img :src="pathImage + myBooks.module.image" class="img-thumbnail">
              <a href="#" class="title-book">{{ myBooks.module.name }}</a>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="keranjang-kosong" style="font-family: ElliotSans-Regular">
        <img src="~/assets/img/keranjang-belanja.png" style="width: 30%">
        <h6 class="mt-3">
          Anda belum memiliki history ujian. Silahkan mulai ujian untuk melihat history ujian.
        </h6>
        <nuxt-link to="/">
          <h6>Ujian Sekarang</h6>
        </nuxt-link>
      </div>
    </div>
    <div v-else class="card-table p-2">
      <LoaderHistori2 />
    </div>
  </div>
</template>

<script>
import firebase from '~/services/fireinit'
const LoaderHistori2 = () => import('~/components/user/LoaderHistori2')
export default {
  components: {
    LoaderHistori2
  },
  data () {
    return {
      myModule: [],
      show: false,
      User: null,
      pathImage: 'https://cdn.edutore.com/public/module/thumb/'
    }
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.User = user.displayName
        user.getIdToken(true).then((accesstoken) => {
          this._actionGetHistoryUjian(accesstoken)
        })
      }
    })
  },
  methods: {
    _actionGetHistoryUjian (token) {
      this.$axios.get('https://api.edutore.com/api/v1/my-modules', { headers: { 'x-access-token': token } }).then((response) => {
        const dataHistoryUjian = response.data.data.rows
        if (response.data.success === 'true') {
          this.myModule = dataHistoryUjian
          this.show = true
        } else {
          this.show = false
        }
      })
    }
  }
}
</script>

<style src="../../../components/user/GlobalHistory2.css" scoped>
</style>
