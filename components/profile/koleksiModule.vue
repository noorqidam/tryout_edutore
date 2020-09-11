<template>
  <div class="container">
    <div v-if="show" class="row">
      <div class="col-md-12">
        <h2 class="title-konten">
          Koleksi Module Saya
        </h2>
      </div>

      <div v-if="myModule.length > 0" class="p-3">
        <div v-for="(books, index) in myModule" :key="index" class="col-6 col-lg-2 col-sm-4">
          <div @click="actiondetail(books)" class="mb-3" style="cursor:pointer">
            <div class="detail-bukus">
              <img :src="pathImage + books.module.image" class="thumbnail">
            </div>
            <label class="title-books">{{ books.module ? books.module.name: null }}</label>
          </div>
        </div>
      </div>
      <div v-else class="col-md-12 text-center">
        <img src="~/assets/img/keranjang-belanja.png" style="width: 20%">
        <h6 class="mt-3">
          Anda belum memiliki koleksi module. Silahkan mulai beli module untuk melihat koleksi module.
        </h6>
      </div>
    </div>
    <div v-else>
      <LoaderKoleksi />
    </div>
  </div>
</template>

<script>
import firebase from '~/services/fireinit'
const LoaderKoleksi = () => import('~/components/profile/LoaderHistori')
export default {
  components: {
    LoaderKoleksi
  },
  data () {
    return {
      myModule: [],
      show: false,
      User: null,
      pathImage: 'https://storage.googleapis.com/edutore-cdn/public/module/thumb/'
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
        const dataModules = response.data.data
        if (response.data.success === 'true') {
          this.myModule = dataModules.rows
          this.show = true
        } else {
          this.show = false
        }
      })
    },
    actiondetail (book) {
      // window.location.href = 'https://edutore.com/modules/' + book.module.module_slug
      this.$router.push({
        path: '/my-modules/' + book.module.module_slug
      })
    }
  }
}
</script>

<style scoped>
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
    font-size: 13px;
    color: #404040;
    margin: 14px 0;
    text-decoration: none;
}

.title-book:hover {
    font-size: 13px;
    color: #404040;
    margin: 14px 0;
}
</style>
