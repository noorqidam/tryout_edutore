<template>
  <div style="padding-top: 70px">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="koreksi-img">
            <img src="~/assets/img/edu-kereksi.png" class="img-fluid">
          </div>
          <div class="koreksi-txt">
            <p class="pelajaran">
              {{ modules.name }}
            </p>
            <hr>
            <p class="kelas">
              Kelas {{ modules.kelas ? modules.kelas.name : '' }}
            </p>
          </div>
        </div>
        <div class="col-md-6 text-center">
          <div v-for="item in FilteredThema" :key="item.id">
            <p style="font-weight: bold">
              {{ item.theme_name }}
            </p>
            <div v-for="paketSoal in item.paket_soals" :key="paketSoal.id">
              <p v-if="paketSoal.id ==paketSoalId">
                {{ paketSoal.name }}
              </p>
            </div>
          </div>
          <p class="mb-0">
            Jumlah Soal
          </p>
          <p class="mb-4">
            {{ soals.count }}
          </p>

          <p class="mb-0">
            Tipe Soal
          </p>
          <p class="mb-5">
            {{ tipeSoal }}
          </p>
          <p>
            Pengatur Waktu
            <label class="switch ml-3">
              <input type="checkbox">
              <span class="slider round" />
            </label>
          </p>
          <nuxt-link :to="{ path :'/my-modules/start-test/'+ModuleId +'/' + paketSoalId , query : {subscription : subscription_id }}" class="btn btn-primary mt-5">
            Mulai
          </nuxt-link>
          <div class="mt-3">
            <a href="javascript:void(0)" class="link-underline">Keluar</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/services/fireinit'
export default {
  name: 'KonfirmasiTest',
  data () {
    return {
      token: null,
      isLoading: false,
      jmlSoal: 'Load jumlah soal...',
      tipeSoal: 'Single Choice',
      modules: {},
      soals: {},
      themas: {},
      FilteredThema: [],
      idSubscription: null,
      paketSoalId: null,
      ModuleId: null,
      subscription_id: null
    }
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken(true).then((accessToken) => {
          this.token = accessToken
          const ModuleId = this.$route.params.id
          // eslint-disable-next-line no-console
          console.log('INI ID' + ModuleId)
          const paketSoalId = this.$route.query.paket_soal
          const SubscriptionID = this.$route.query.subscription_id
          this.subscription_id = SubscriptionID
          this._actionGetSoals(ModuleId, paketSoalId, SubscriptionID)
          const detailId = this.$route.query.ModuleId
          this.idSubscription = detailId
          this.paketSoalId = paketSoalId
          this.ModuleId = ModuleId
        })
      }
    })
  },
  mounted () {
    const slug = this.$route.query.slug
    this._actionGetModules(slug)
    const thema = this.$route.params.konfirmasiTest
    // eslint-disable-next-line no-console
    console.log('INI ID THEMA' + thema)
  },
  methods: {
    _actionGetModules (slug) {
      this.$axios.get('https://api.edutore.com/api/v1/modules/' + slug)
        .then((response) => {
          const dataModules = response.data
          if (response.data.success === 'true') {
            this.modules = dataModules.data.rows
            this.themas = dataModules.data.theme
            const FilteredTheme = this.themas.filter((item) => {
              return item.id === parseInt(this.$route.params.konfirmasiTest)
            })
            this.FilteredThema = FilteredTheme
            // eslint-disable-next-line no-console
            console.log(FilteredTheme)
            // eslint-disable-next-line no-console
            console.log(JSON.stringify(this.thema))
          }
        })
    },
    _actionGetSoals (id, psId, idSubs) {
      this.isLoading = true
      this.$axios.get('https://api.edutore.com/api/v1/my-subscribe-soal/' + idSubs + '/modules/' + id + '/paket_soal/' + psId, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          const dataSoals = response.data
          if (response.data.success === 'true') {
            this.soals = dataSoals.data
            // eslint-disable-next-line no-console
            console.log('INI DATA SOALS' + this.soals)
          }
        })
    }
  }
}
</script>

<style scoped>
.pelajaran {
  font-size: 30px;
  margin-bottom: 0;
  font-family: ElliotSans-Bold;
  color: #404040;
}
.kelas {
  font-size: 23px;
}
</style>
