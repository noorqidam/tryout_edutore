<template>
  <div class="container" style="padding-top: 70px; margin-bottom: 20px">
    <div v-if="isLoading" class="row">
      <div class="col-md-12 text-center">
        <img src="~/assets/img/edu-wink.gif" class="img-fluid" alt="~/assets/img/edu-wink.gif" style="width: 100px;border-radius: 100px;box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);">
        <p class="mt-3">
          Loading...
        </p>
      </div>
    </div>
    <div v-else class="row">
      <div class="col-12 col-md-12">
        <div v-if="!expired" class="box-langganan-detail">
          <h5 style="font-weight: bold">
            {{ nameModule }}
          </h5>
          <div v-html="description" class="content" />
          <br>
          <div>Buku yang termasuk dalam paket ini adalah sebagai berikut</div>
          <ul>
            <li v-for="item in myListModule" :key="item._id">
              <nuxt-link :to="{path:'/my-modules/' + item.modules.module_slug, query: {id_subs : idSubscription}}">
                {{ item.modules.name }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div v-else class="box-langganan-detail">
          <h2 style="font-weight: bold">
            Langganan ini telah kadaluarsa
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/services/fireinit'
export default {
  data () {
    return {
      myListModule: [],
      expired: false,
      isLoading: true,
      token: null,
      User: null,
      nameModule: '',
      description: '',
      idSubscription: null
    }
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.User = user.displayName
        user.getIdToken(true).then((accesstoken) => {
          this.token = accesstoken
          const id = this.$route.query.id
          this.idSubscription = id
          this._actionGetDetailSubscriptions(id)
        })
      }
    })
  },
  methods: {
    _actionGetDetailSubscriptions (id) {
      this.$axios.get('https://api.edutore.com/api/v1/my-subscriptions/' + id, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          const dataListModuleSubcriptions = response.data
          if (response.data.success === 'true') {
            this.myListModule = dataListModuleSubcriptions.data.paket_langganan.modules_langganan
            this.nameModule = dataListModuleSubcriptions.data.paket_langganan.package_name
            this.description = dataListModuleSubcriptions.data.paket_langganan.descriptions
            this.isLoading = false
          } else {
            this.isLoading = false
            if (this.dataListModuleSubcriptions.status.expire) { this.expired = true }
          }
        }).catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.response)
        })
    }
  }
}
</script>

<style scoped>
.box-langganan-detail{
  width: 100%;
  background: #ffffff;
  box-shadow: 1px 1px 10px 1px #dadada;
  margin-top: 15px;
  border-radius: 10px;
  min-height: auto;
  padding: 20px;
}
</style>
