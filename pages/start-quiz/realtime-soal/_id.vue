<template>
  <div>
    <b-modal
      v-model="modalShow"
      size="md"
      centered=""
      hide-footer=""
      hide-header=""
      body-bg-variant="default"
    >
      <div class="row justify-content-center">
        <div class="col-md-12 justify-content-center">
          <h3 class="text-center">
            Apakah anda yakin mau keluar dari tes ?
          </h3>
        </div>
        <div class="row">
          <div class="col md-6">
            <button @click="modalShow=false" class="btn btn-warning btn-lg btn-block" style="width: 120px">
              Tidak
            </button>
          </div>
          <div class="col md-6">
            <button @click="_actionLogout" class="btn btn-primary btn-lg btn-block" style="width: 120px">
              Ya
            </button>
          </div>
        </div>
      </div>
    </b-modal>
    <div class="row">
      <b-modal
        v-model="loadingjawab"
        size="sm"
        centered=""
        hide-footer=""
        hide-header=""
        body-bg-variant="default"
        title="Megirim Jawaban"
      >
        <h2 class="h5 text-center">
          Mengirim Jawaban
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
    <notifications group="info" position="center center" />
    <nav class="navbar navbar-expand-sm navbar-light bg-blues is-desktop fixed-top">
      <div class="align-items-end">
        <a @click="_actionModalOut" class="navbar-brand"><img src="~/assets/img/edutore.png" class="img-fluid" alt="~/assets/img/edutore.png"></a>
        <b-navbar-toggle target="nav-collapse" />
      </div>
    </nav>
    <div class="container-fluid mt-5 pt-3">
      <div class="row flex-xl-nowrap2">
        <div class="bd-sidebar border-bottom-0 col-md-3 col-xl-2 col-12">
          <nav id="bd-docs-nav" aria-label="Main navigation" class="bd-links d-none d-md-block text-center">
            <div class="mt-1 pt-1">
              <div style="width:70%;height:auto;margin-left:auto;margin-right:auto">
                <b-img v-if="photo" :src="photo" img-fluidphoto thumbnail alt="Image 1" />
                <b-img v-else src="~/assets/img/edu-wink.gif" img-fluidphoto thumbnail alt="Image 1" />
              </div>
            </div>
            <div target="_self">
              <label class="text-center bd-toc-link" target="_self">{{ User }}</label>
            </div>
          </nav>
          <h3 class="h3 text-center">
            SKOR <br>
          </h3>
          <h2 for="skor" class="text-center" style="font-size:10em">
            {{ point }}
          </h2>
        </div>
        <div class="bd-content col-md-9 col-xl-8 col-12 pb-md-3">
          <div class="clearfix d-block" />
          <main class="bd-main pt-2">
            <b-progress v-if="showSoal" :max="max" height="1rem">
              <b-progress-bar :value="timer">
                {{ timer }} s
              </b-progress-bar>
              <!-- <div id="timmer" /> -->
            </b-progress>
            <section v-if="showSoal">
              <div v-for="(soal ,i ) in soals" :key="soal._id" class="soals">
                <p id="soal_text" v-html="soal.soal_text" style="color:black" />
                <b-img v-if="soal.soal_image" :src="pathImagesQ + soal.soal_image" thumbnail fluid />
                <template>
                  <ol class="mt-1" type="A">
                    <li v-for="j in soal.jawabans" :key="j._id">
                      <b-button
                        @click="_actionAnswer(soal._id,j._id,i)"
                        block
                        variant="outline-secondary"
                        style="margin-bottom:2px"
                      >
                        <p v-html="j.jawaban_text" style="color:black;text-align:left" />
                        <b-img v-if="j.jawaban_image" :src="pathImagesAnswer + j.jawaban_image" thumbnail fluid />
                      </b-button>
                    </li>
                  </ol>
                </template>
              </div>
            </section>
            <section v-else class="mt-2">
              <h4 v-if="!showgreet" class="text-center h4">
                Menunggu Soal
              </h4>
              <h2 v-if="showgreet" class="h1 text-center" style="font-size:10em">
                {{ maxCountdown }}
              </h2>
            </section>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Notifications from 'vue-notification'
import io from 'socket.io-client'
import firebase from '~/services/fireinit'
Vue.use(Notifications)
export default {
  name: 'StartQuizRealtime',
  layout (context) {
    return 'defaults'
  },
  data () {
    return {
      answer: [],
      quiz: {},
      realtimeAnswer: [],
      jawabans: [],
      soals: [],
      showSoal: false,
      quiz_id: null,
      pathImages: 'https://storage.googleapis.com/edutore-cdn/public/module/thumb/',
      pathImagesQ: 'https://storage.googleapis.com/edutore-cdn/public/soal/question/',
      pathImagesAnswer: 'https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/',
      timer: 0,
      User: null,
      photo: null,
      message: null,
      countDown: null,
      max: 0,
      nilai: {},
      showNilai: false,
      showgreet: false,
      maxCountdown: 3,
      loadingjawab: false,
      modalShow: false,
      point: 0
    }
  },
  mounted () {
    history.pushState(null, null, location.href)
    window.onpopstate = () => {
      this._actionModalOut()
      history.go(1)
    }
    const id = this.$route.query.quiz_id
    this.quiz_id = this.$route.query.quiz_id
    this._actionGetQuizQuestion()
    this._actionShowNilai()
    this._actionGetInfoQuiz(id)
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.User = user.displayName
        this.photo = user.photoURL
        user.getIdToken(true).then((accesstoken) => {
          this.token = accesstoken
          this._actionGetReltimePoint()
        })
      } else {
        const redirectTo = this.$route.fullPath
        this.$router.push({
          path: '/login',
          query: { quiz_id: this.$route.query._id, quiz: this.$route.query.name, ref: redirectTo }
        })
      }
    })
  },
  methods: {
    randomValue () {
      this.timer -= 1
    },
    _actionGetInfoQuiz (id) {
      this.$axios.get('all-quiz/' + id, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          const responseData = response.data
          if (response.data.success === 'true') {
            this.quiz = responseData.data
            this.max = this.quiz.durasi_soal
          }
        })
        // eslint-disable-next-line no-console
        .catch((err) => { console.log(err) })
    },
    _actionGetQuizQuestion () {
      const socket = io('https://api-tryout.edutore.com', { 'transports': ['websocket', 'polling'] })
      // const socket = io('http://localhost:3000')
      socket.on('show_question', function (data) {
        if (data) {
          // eslint-disable-next-line no-console
          clearInterval(this.countDown)
          this._actionShowSoal(data)
        }
      }.bind(this))
    },
    _actionShowNilai () {
      /// const socket = io('http://localhost:3000')
      const socket = io('https://api-tryout.edutore.com', { 'transports': ['websocket', 'polling'] })
      socket.on('show_nilai', function (data) {
        if (data) {
          this.$router.push({
            path: '/start-quiz/nilai',
            query: { quiz_id: this.quiz_id }
          })
        }
      }.bind(this))
    },
    _actionShowSoal (data) {
      // eslint-disable-next-line no-console
      console.log('listen ..' + JSON.stringify(data))
      this.showgreet = true
      // eslint-disable-next-line no-console
      console.log('greet ..' + true)
      const x = setInterval(() => {
        this.maxCountdown--
        if (this.maxCountdown === 0) {
          this.showSoal = true
          this.soals = []
          this.soals.push(data)
          this._actionDecrest()
          clearInterval(x)
          this.maxCountdown = 4
        }
      }, 1000)
    },
    _actionDecrest () {
      this.timer = this.max
      this.countDown = setInterval(() => {
        this.timer -= 1
        if (this.timer < 0) {
          // document.getElementById('timmer').innerHTML = 'WAKTU HABIS'
          clearInterval(this.countDown)
          this.showSoal = false
          this.soals = []
          this.showgreet = false
        }
        // eslint-disable-next-line no-console
        console.log('timer in function d ' + this.timer)
      }, 1000)
    },
    _functionStop () {
      // eslint-disable-next-line no-console
      console.log('delete interval')
      clearInterval(this.countDown)
      this.showgreet = false
    },
    _actionRemoveSoal () {
      this.showSoal = false
      this.soals = []
    },
    async _actionAnswer (soalId, jawaban) {
      const data = {
        soal_id: soalId,
        jawaban_id: jawaban
      }
      this.loadingjawab = true
      await this.$axios.post('rating-peserta-realtime/' + this.quiz_id, data, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          this._functionStop()
          this.showSoal = false
          this.soals = []
          this._actionGetReltimePoint()
          this.$notify({
            group: 'info',
            type: 'success',
            title: 'Berhasil Menjawab'
          })
          this.showgreet = false
          this.loadingjawab = false
        }).catch((err) => {
          this.loadingjawab = false
          this.message = err.response.data
          this.$notify({
            group: 'info',
            type: 'error',
            title: JSON.stringify(err.response.data.message)
          })

          this.showgreet = false
          this._functionStop()
          this.showSoal = false
          this.soals = []
          this._actionGetReltimePoint()
        })
    },
    async _actionGetReltimePoint () {
      const data = {
        quiz_id: this.quiz_id
      }
      await this.$axios.post('realtime-quiz-point', data, { headers: { 'x-access-token': this.token } }).then((response) => {
        this.point = response.data.data
      })
    },
    _actionModalOut () {
      this.modalShow = true
    },
    _actionLogout () {
      this.$router.push({
        path: '/'
      })
      this.modalShow = false
    }
  }
}
</script>

<style scoped>
  #timmers {
    font-size: 40px
  }
  h2, p {
    color: black
  }
  .brand {
    height: 40px;
    width: auto;
  }
  .bd-links {
    padding-top: 1px;
    padding-bottom: 1rem;
    margin-right: -15px;
    margin-left: -15px;
  }
  .flex-container {
    padding: 0;
    margin: auto;
    list-style: none;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    float: left;
    display: flex;
    justify-content: space-around;
  }
  .flex-item {
    background-color: grey;
    padding: 5px;
    width: 40px;
    height: 40px;
    margin-top: 10px;
    margin-left: 1px;
    margin-right: 1px;
    line-height: 30px;
    color: white;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
  }
  .item_active {
    background: #557CBE;
  }
   .img-fluid {
    max-width: 30%;
    height: auto;
  }
   .img-fluidphoto {
    height: auto;
  }
  .bg-blues {
    background-color: white;
    border-bottom: 1px solid rgb(187, 187, 187);
  }
</style>
