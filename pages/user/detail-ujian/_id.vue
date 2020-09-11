<template>
  <div class="container-fluid" style="background-color:#fafafa;">
    <div class="container" style="margin-top:80px">
      <div class="row bg-white" style="font-family: ElliotSans">
        <div class="col-md-12">
          <div class="row mx-5">
            <div class="col-md-6 div-left pt-3 mt-2">
              <div class="row">
                <div class="col-12">
                  <h1 class="txt-datper">
                    Data Peserta
                  </h1>
                </div>
                <div class="col-6">
                  <div v-if="photo" style="width:70%;height:auto;margin-left:auto;margin-right:auto;margin-top:5px">
                    <b-img :src="photo" :alt="user" thumbnail fluidphoto />
                  </div>
                  <div v-else style="width:70%;height:auto;margin-left:auto;margin-right:auto;margin-top:5px">
                    <b-img :alt="user" src="~/assets/img/edu-wink.gif" thumbnail fluidphoto />
                  </div>
                  <!-- <img :src="photo" :alt="User" class="img-fluid" style="width:150px"> -->
                </div>
                <div class="col-6 col-sm-6 col-md-6">
                  <h3 class="label-data">
                    Nama Peserta
                  </h3>
                  <h5 class="txt-datper-2">
                    {{ User }}
                  </h5>
                </div>
              </div>
            </div>
            <div class="col-md-6" style="font-family: ElliotSans-Bold">
              <div class="text-center mt-2">
                <h1 class="title-test">
                  {{ judul_ujian }}
                </h1>
                <!-- <h1 class="title-penyelenggara">
                  Penyelenggara Ujian {{ ujian.penyelenggara }}
                </h1> -->
              </div>
              <div class="text-center div-nilai">
                <h2 class="title-hasil">
                  Nilai Akhir
                </h2>
                <h1 class="txt-nilai" />
              </div>
              <div v-if="!nilai" class="text-center">
                Mengambil nilai ...
              </div>
              <div>
                <b-table
                  :items="sesiujian"
                  :fields="attribute"
                  show-empty
                  small
                  sticky-header
                  head-variant="dark"
                  responsive
                />
              </div>
              <div class="text-center mt-5">
                <nuxt-link to="/" class="btn-back-main">
                  Kembali ke halaman utama
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import firebase from '~/services/fireinit'
export default {
  name: 'ShowNilaiUjian',
  data () {
    return {
      attribute: [
        { key: 'sesi_ujian', label: 'Sesi Ujian', sortable: true, sortDirection: 'desc' },
        { key: 'point', label: 'Nilai' },
        { key: 'count', label: 'Jumlah Soal' }
      ],
      nilai: null,
      User: null,
      photo: null,
      token: null,
      ujian_id: null,
      judul_ujian: null,
      ujian: {},
      sesiujian: []
    }
  },
  beforeMount () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.User = user.displayName
        this.photo = user.photoURL
        this.ujian_id = this.$route.params.id
        this.judul_ujian = this.$route.query.judul_ujian
        user.getIdToken(true).then((accesstoken) => {
          this.token = accesstoken
          this._actionGetNilaiQuiz()
        })
      } else {
        this.$router.push({
          path: '/login',
          query: { ujian_id: this.$route.query._id }
        })
      }
    })
  },
  methods: {
    _actionGetNilaiQuiz () {
      const data = {
        ujian_id: this.ujian_id
      }
      this.$axios
        .post('nilai-ujian', data, {
          headers: { 'x-access-token': this.token }
        })
        .then((response) => {
          if (response.data.success === 'true') {
            this.nilai = response.data.data
            this.quiz = response.data.quiz
            this.sesiujian = response.data.data
          }
        })
        .catch((err) => {
          this.message = err.response.data
        })
    }
  }
}
</script>
<style scoped>
.txt-datper-2 {
  font-size: 15px;
  font-family: ElliotSans-Medium;
  color: #808080;
}
.title-test {
  font-size: 20px;
  color: #3f3f3f;
  font-family: ElliotSans-Bold;
}
.title-penyelenggara {
  font-size: 17px;
  color: #808080;
  font-family: ElliotSans-Medium;
}
.div-nilai {
  border-top: 2px solid #9f9f9f;
}

.title-hasil {
  font-size: 17px;
  color: #404040;
  font-family: ElliotSans-Medium;
  margin-top: 5px;
}

.txt-nilai {
  font-size: 40px;
  color: #1e9cd7;
  font-family: ElliotSans-Bold;
}

.btn-to-email {
  font-size: 15px;
  color: #fff;
  font-family: ElliotSans-Medium;
}

.btn-back-main {
  color: #1e9cd7;
  font-size: 12px;
  font-family: ElliotSans-Medium;
}
</style>
