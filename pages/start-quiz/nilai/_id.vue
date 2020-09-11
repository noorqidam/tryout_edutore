<template>
  <div class="container-fluid pb-5 pt-3 mb-4" style="background-color:#fafafa;">
    <div class="container p-2" style="margin-top:80px">
      <div class="row bg-white">
        <div class="col-md-12">
          <div class="row mx-5">
            <div class="col-md-6 div-left pt-3 mt-2">
              <div class="row">
                <div class="col-12">
                  <h1 class="txt-datper">
                    Data Peserta
                  </h1>
                  {{ this.$store.auth }}
                </div>
                <div class="col-6">
                  <img :src="photo" :alt="user" class="img-fluid" style="width:150px">
                  <h1 style="font-size:20px;color:#fff;font-family:ElliotSans-Bold">
                    .
                  </h1>
                </div>
                <div class="col-6 col-sm-6 col-md-6">
                  <h3 class="label-data">
                    Nama Peserta
                  </h3>
                  <h5 class="txt-datper-2">
                    {{ user }}
                  </h5>
                </div>
              </div>
            </div>
            <div class="col-md-6" style="font-family: ElliotSans-Bold">
              <div class="text-center mt-2">
                <h1 class="title-test">
                  {{ quiz.judul_quiz }}
                </h1>
                <h1 class="title-penyelenggara">
                  Penyelenggara Quiz {{ quiz.penyelenggara }}
                </h1>
              </div>
              <div class="text-center div-nilai">
                <h2 class="title-hasil">
                  Nilai Akhir
                </h2>
                <h1 class="txt-nilai" />
              </div>
              <div class="text-center text-20">
                <strong>Benar  : {{ nilai.benar }} </strong>
                <strong>Salah  : {{ nilai.salah }} </strong>
                <strong>Point  : {{ nilai.point }} </strong>
                <strong>Total Soal   : {{ nilai.totalSoal }} </strong>
              </div>
              <div class="text-center mt-5">
                <button @click="_sendNilai" class="btn" style="background-color:#1e9cd7">
                  <h6 class="btn-to-email">
                    Kirim Hasil Quiz ke Email
                  </h6>
                </button><br>
                <nuxt-link to="/" class="btn-back-main">
                  Kembali ke halaman utama
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <b-modal
        v-model="Loading"
        size="sm"
        centered=""
        hide-footer=""
        hide-header=""
        body-bg-variant="default"
        title="Mengambil Nilai"
      >
        <h2 class="h5 text-center">
          Mengambil Nilai
        </h2>
        <div class="row justify-content-center">
          <div class="d-flex justify-content-center">
            <img src="~/assets/img/edu-wink.gif" class="img-fluid" alt="~/assets/img/edu-wink.gif" style="width: 100px">
          </div>
        </div>
        <p class="text-center mt-2">
          Loading...
        </p>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '~/services/fireinit'
export default {
  data () {
    return {
      nilai: [],
      token: null,
      quiz_id: null,
      quiz: {},
      Loading: true,
      email: null
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      photo: state => state.auth.photo
    })
  },
  mounted () {
    this.quiz_id = this.$route.query.quiz_id
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.email = user.email
        user.getIdToken(true).then((accesstoken) => {
          this.token = accesstoken
          this._actionGetNilaiQuiz()
        })
      } else {
        this.$router.push({
          path: '/login',
          query: { quiz_id: this.$route.query.quiz_id }
        })
      }
    })
  },
  methods: {
    _actionGetNilaiQuiz () {
      this.$axios.get('nilai-quiz?quiz_id=' + this.quiz_id, { headers: { 'x-access-token': this.token } }).then((response) => {
        if (response.data.success === 'true') {
          this.nilai = response.data.info
          this.quiz = response.data.quiz
        }
        this.Loading = false
      }).catch((err) => {
        this.Loading = false
        this.message = err.response.data
        this.$notify({
          group: 'foo',
          type: 'error',
          title: JSON.stringify(err.message.data)
        })
      })
    },
    _sendNilai () {
      this.$swal({
        title: 'Kirim Nilai Ke Email ?',
        text: this.email,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Ya, Kirim !'
      }).then((result) => {
        if (result.value) {
          const data = {
            quiz_id: this.quiz_id
          }
          this.$axios.post('send-nilai-quiz', data, { headers: { 'x-access-token': this.token } }).then((response) => {
            this.$notify({
              group: 'foo',
              type: 'success',
              title: 'Berhasil Mengirim Nilai Ke email anda'
            })
          })
            .catch((err) => {
              this.$notify({
                group: 'foo',
                type: 'error',
                title: JSON.stringify(err.response.data)
              })
            })
        }
      })
    }
  }
}
</script>
<style scoped>
  html {
    scroll-behavior: smooth;
  }
  .card-bottom {
    width: 80%;
    padding: 10px;
    margin-left: auto;
    margin-right: auto
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
  .tabs > ul {
    background-color: #1e9cd7;
    color: white
  }
  p {
    color: black
  }
  .breadcrumb-item.active {
      color: white
  }
  .cont-content {
      background-color: #fff;
      border-radius: 5px
  }

  .txt-datper {
      font-size: 20px;
      color: #1e9cd7;
      font-family: ElliotSans-Bold
  }

  .div-left {
      border-right: 2px solid #9f9f9f
  }

  @media (max-width: 765.98px) {
    .div-left {
      border: 0;
    }
  }

  .label-data {
      font-size: 15px;
      font-family: ElliotSans-Bold;
      color: #3f3f3f
  }

  .txt-datper-2 {
      font-size: 15px;
      font-family: ElliotSans-Medium;
      color: #808080
  }

  .title-test {
      font-size: 20px;
      color: #3f3f3f;
      font-family: ElliotSans-Bold
  }

  .title-penyelenggara {
      font-size: 17px;
      color: #808080;
      font-family: ElliotSans-Medium
  }

  .div-nilai {
      border-top: 2px solid #9f9f9f
  }

  .title-hasil {
      font-size: 17px;
      color: #404040;
      font-family: ElliotSans-Medium;
      margin-top: 5px
  }

  .txt-nilai {
      font-size: 40px;
      color: #1e9cd7;
      font-family: ElliotSans-Bold
  }

  .btn-to-email {
      font-size: 15px;
      color: #fff;
      font-family: ElliotSans-Medium
  }

  .btn-back-main {
      color: #1e9cd7;
      font-size: 12px;
      font-family: ElliotSans-Medium
  }
</style>
