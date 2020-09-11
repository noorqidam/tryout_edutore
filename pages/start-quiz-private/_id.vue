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
    <notifications group="foo" position="center center" />
    <nav class="navbar navbar-expand-sm navbar-light bg-blues is-desktop fixed-top">
      <div class="align-items-end">
        <a @click="_actionModalOut" class="navbar-brand"><img src="~/assets/img/edutore.png" class="img-fluid" alt="~/assets/img/edutore.png"></a>
        <b-navbar-toggle target="nav-collapse" />
      </div>
      <div class="row justify-content-center timer">
        <div id="showTimes" class="text-center sub-timer">
          <span id="days" class="days text-timer" />
          <span id="hour" class="hours text-timer" />
          <span id="minute" class="minutes text-timer" />
          <span id="second" class="seconds text-timer" />
        </div>
      </div>
    </nav>
    <div v-if="!loadingSoal" class="content-body">
      <div v-if="UserHasLogin" class="container-fluid">
        <div class="row flex-xl-nowrap2">
          <div class="bd-sidebar border-bottom-0 col-md-3 col-xl-2 col-12">
            <nav id="bd-docs-nav" aria-label="Main navigation" class="bd-links d-none d-md-block text-center">
              <div class="mt-0">
                <div style="width:70%;height:auto;margin-left:auto;margin-right:auto">
                  <b-img v-if="photo" :src="photo" thumbnail fluidphoto alt="Image 1" />
                  <b-img v-else src="~/assets/img/edu-wink.gif" thumbnail fluidphoto alt="Image 1" />
                </div>
              </div>
              <div target="_self">
                <a href="/" class="bd-toc-link" target="_self">{{ User }}</a>
                <ul v-for="(n , no) in soals" :key="n._id" class="flex-container justify-content-center">
                  <li v-bind:id="n._id" :class="[n.answered ? 'item_active' : '']" class="flex-item">
                    {{ ++no }}
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div class="bd-content col-md-9 col-xl-8 col-12 pb-md-3 pl-md-5">
            <div class="clearfix d-block" />
            <main id="soals" class="bd-main">
              <b-progress v-if="showProgresstime" :max="max" height="12px">
                <b-progress-bar :value="timer">
                  {{ timer }} s
                </b-progress-bar>
                <div id="timmer" />
              </b-progress>
              <section v-for="(soal ,i ) in soals" :key="soal._id" class="soals mt-1 pt-1">
                <transition
                  enter-active-class="animated fadeInUp"
                >
                  <div v-if="current_soal === soal._id">
                    <div v-if="soal.answered">
                      Sudah di jawab
                    </div>
                    <p v-html="soal.soal_text" style="color:black" />
                    <b-img v-if="soal.soal_image" :src="pathImagesQ + soal.soal_image" thumbnail fluid />
                    <template class="col">
                      <ol class="mt-1 pt-1" type="A">
                        <li v-for="j in soal.jawabans" :key="j._id">
                          <b-button
                            v-if="currentAnswer === soal._id"
                            class="active"
                            variant="outline-secondary"
                            style="margin-bottom:2px"
                          >
                            <label v-html="j.jawaban_text" style="color:black;text-align:left;width:100%" />
                            <b-img v-if="j.jawaban_image" :src="pathImagesAnswer + j.jawaban_image" thumbnail fluid />
                          </b-button>
                          <b-button
                            v-else
                            @click="_actionAnswer(j.soal_id,j._id,i)"
                            variant="outline-secondary"
                            style="margin-bottom:2px"
                          >
                            <label v-html="j.jawaban_text" style="color:black;text-align:left;width:100%" />
                            <b-img v-if="j.jawaban_image" :src="pathImagesAnswer + j.jawaban_image" thumbnail fluid />
                          </b-button>
                        </li>
                      </ol>
                    </template>
                  </div>
                  Soal Number {{ i }}
                </transition>
              </section>
            </main>
            <div v-if="semuadijawab">
              <h3 class="h3 text-center">
                Semua Soal Sudah Di Jawab
              </h3>
            </div>
            <div v-if="expire">
              <h4 class="h4 text-center">
                Waktu Sudah Habis
              </h4>
              <div class="row justify-content-center">
                <div class="col-sm-4">
                  <b-button @click="_actionEndUjian" variant="primary" pill="" block>
                    <i class="fa fa-flag" /> Tampilkan Nilai
                  </b-button>
                </div>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-sm-3">
                <b-button v-if="showButtonFinish" @click="_actionEndUjian" variant="primary" pill="" block>
                  <i class="fa fa-flag" /> Akhiri
                </b-button>
              </div>
            </div>
          </div>
          <nav id="realAns" aria-label="Secondary navigation" aria-hidden="true" class="bd-toc col-xl-2 d-none d-xl-block">
            <ul v-for="(ans ,no ) in Useranswer" :key="ans.uid" class="nav section-nav flex-column" style="max-heigth:500px">
              <transition
                enter-active-class="animate__slideOutUp"
                leave-active-class="animate__slideInUp"
              >
                <b-media tag="li" class="mb-1 animate__slideOutUp">
                  <template v-slot:aside>
                    <table>
                      <thead>
                        <tr class="animate__slideOutUp">
                          <th rowspan="2">
                            <b-img v-if="ans.photo" :src="ans.photo" width="40" alt="placeholder" />
                            <b-img v-else src="~/assets/img/edu-wink.gif" width="40" alt="placeholder" />
                          </th>
                          <th>
                            {{ ans.email ? ans.email: null }}
                            <br>
                            <span class="mt-0 mb-1">
                              Score <b> {{ ans.total_point }} </b>
                            </span>
                            <i v-if="no =='0'" class="fa fa-trophy" style="color:#1e9cd7" />
                          </th>
                        </tr>
                      </thead>
                    </table>
                  </template>
                </b-media>
              </transition>
            </ul>
          </nav>
        </div>
      </div>
      <div v-else>
        <UnauthorizedUjian />
      </div>
    </div>
    <div v-else class="container-fluid">
      <div class="row">
        <b-modal
          v-model="loadingSoal"
          size="sm"
          centered=""
          hide-footer=""
          hide-header=""
          body-bg-variant="default"
          title="Mengambil Soal"
        >
          <h2 class="h5 text-center">
            Mengambil Soal
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
  </div>
</template>

<script>
import Vue from 'vue'
import Notifications from 'vue-notification'
import io from 'socket.io-client'
import moment from 'moment'
import UnauthorizedUjian from '../../components/unauthorized/UnauthorizedUjian'
import firebase from '~/services/fireinit'
Vue.use(Notifications)
export default {
  name: 'StartQuizMandiri',
  layout (context) {
    return 'defaults'
  },
  components: { UnauthorizedUjian },
  data () {
    return {
      Useranswer: [],
      User: null,
      photo: null,
      loadingSoal: true,
      soals: [],
      currentAnswer: null,
      current_soal: null,
      token: null,
      UserHasLogin: false,
      quiz_id: null,
      nextid: null,
      countDowntime: null,
      timer: 0,
      countDown: null,
      showProgresstime: false,
      max: 0,
      timesisOver: false,
      showButtonFinish: false,
      pathImages: 'https://storage.googleapis.com/edutore-cdn/public/module/thumb/',
      pathImagesQ: 'https://storage.googleapis.com/edutore-cdn/public/soal/question/',
      pathImagesAnswer: 'https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/',
      title: 'Tryout Edutore',
      loadingjawab: false,
      semuadijawab: false,
      expire: false,
      modalShow: false,
      realtimeserver: null
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'tryout Edutore' }
      ]
    }
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.User = user.displayName
        this.photo = user.photoURL
        user.getIdToken(true).then((accesstoken) => {
          this.token = accesstoken
          this.UserHasLogin = true
          const id = this.$route.query.quiz_id
          this.quiz_id = id
          this._actionGetQuestion(id)
          this.actionRealtimePoint(id)
        })
      } else {
        // eslint-disable-next-line no-console
        // console.log(this.$route.query)
        this.$router.push({
          path: '/login',
          query: this.$route.query
        })
      }
    })
  },
  mounted () {
    history.pushState(null, null, location.href)
    window.onpopstate = () => {
      history.go(1)
    }
    this._actionShowRating()
  },
  methods: {
    actionRefresh () {
      const ranking = this.Useranswer
      ranking.sort((a, b) => (a.total_point > b.total_point) ? 1 : ((b.total_point > a.total_point) ? -1 : 0))
      ranking.reverse()
      setTimeout(() => {
        // this.bubbleSort()
      }, 1000)

      // this.actionRealtimePoint(this.quiz_id)
    },
    actionRealtimePoint (id) {
      const data = {
        quiz_id: id
      }
      this.$axios
        .post('realtime-point-quiz', data, { headers: { 'x-access-token': this.token } })
        .then(response => (this.Useranswer = response.data.data))
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    _actionShowRating () {
      const socket = io('https://api-tryout.edutore.com', { 'transports': ['websocket', 'polling'] })

      // const socket = io('http://localhost:3000')
      const id = this.$route.query.quiz_id
      // eslint-disable-next-line no-console
      console.log('listen data ratting' + id)
      socket.on('show_ratting' + id, function (data) {
        // eslint-disable-next-line no-console
        // console.log(' realtime data ratting ' + JSON.stringify(data))
        if (data) {
          this.Useranswer = data.RattingPeserta
          const objDiv = document.getElementById('realAns')
          objDiv.scrollTop = objDiv.scrollHeight
        }
      }.bind(this))
    },
    _actionGetRealtimeCurrenttimeServer () {
      // const socket = io('https://api-tryout.edutore.com')
      const socket = io('https://api-tryout.edutore.com', { 'transports': ['websocket', 'polling'] })
      socket.on('show_timer', function (data) {
        if (data) {
          this.realtimeserver = data
        }
      }.bind(this))
    },
    /** Get Question Soal Private Quiz require
     *  body @quiz_id
     */
    _actionGetQuestion (id) {
      const data = {
        quiz_id: id
      }
      this.$axios.post('soal-quiz-private', data, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          if (response.data.success === 'true') {
            this.loadingSoal = false
            // eslint-disable-next-line no-console
            // console.log('ini response data api ' + JSON.stringify(response.data.soals.soals))
            if (!response.data.soals) {
              alert('Tidak Ada Soal')
            } else {
              /** Set Quiz Identitites */
              const quiz = response.data.quiz
              this.title = quiz.judul_quiz
              let maxDatetime = null
              if (quiz.waktu_pengerjaan) {
                // eslint-disable-next-line no-console
                console.log('ada waktu pengerjaan' + quiz.waktu_pengerjaan)
                const timesNow = moment()
                const getDate = moment(quiz.start_date).format('YYYY-MM-DD')
                const getEndDate = moment(quiz.end_date).format('YYYY-MM-DD')
                const jam = quiz.times
                /** get Hour in times Quiz { example data (d) => 10:30 } */
                const getHour = jam.substring(0, 2) /**  jam.substring(0, 2) => 10 */
                const getMinutes = jam.substring(3, 5) /** jam.substring(3, 5) => 30 */
                /** Add Hours n Minute in Start Date Quiz  */
                const startTimeQuiz = moment(getDate).add(getHour, 'h').add(getMinutes, 'm')

                const endDateTimeQuiz = moment(getEndDate).add(getHour, 'h').add(getMinutes, 'm')

                const setFormatEndTime = moment(endDateTimeQuiz).format('YYYY-MM-DD HH:mm')
                /** Conver time to format YYYY-MM-DD HH:mm */
                const setFormatTime = moment(startTimeQuiz).format('YYYY-MM-DD HH:mm') // (HH) => for 24 hour
                /** set time max ( or ) Expire Test  */
                const maxtimes = moment(setFormatTime).add(quiz.waktu_pengerjaan, 's')
                // eslint-disable-next-line no-console
                console.log(maxtimes + ' - ' + timesNow)

                if (moment(getEndDate).isSame(getDate)) {
                  maxDatetime = moment(setFormatTime).add(quiz.waktu_pengerjaan, 'm')
                } else {
                  maxDatetime = moment(setFormatEndTime).add(quiz.waktu_pengerjaan, 'm')
                }
                // eslint-disable-next-line no-console
                console.log(moment(maxDatetime).format('YYYY-MM-DD HH:mm:ss') + ' - ' + moment(timesNow).format('YYYY-MM-DD HH:mm:ss'))
                if (moment(maxDatetime).isBefore(timesNow)) {
                  this.expire = true
                  this.$notify({
                    group: 'foo',
                    type: 'error',
                    text: 'Waktu Sudah Habis'
                  })
                } else {
                  /** Get Identities id Quiz */
                  this.quiz_id = response.data.quiz._id

                  /** Check Soal has been Answer  */
                  const soals = response.data.soals.soals
                  const AllHasAnswered = soals.every(v => v.answered)

                  if (AllHasAnswered) {
                    // eslint-disable-next-line no-console
                    console.log('Semua Soal Sudah di Jawab')
                    this.soals = soals
                    this.semuadijawab = true
                    this.showButtonFinish = AllHasAnswered
                  } else {
                    this.soals = response.data.soals.soals
                    for (let index = 0; index < this.soals.length; index++) {
                    // eslint-disable-next-line no-console
                      console.log('Check Soal => ' + this.soals[index].answered)
                      if (!this.soals[index].answered) {
                      // eslint-disable-next-line no-console
                        console.log(' false ' + this.soals[index]._id)
                        this.current_soal = this.soals[index]._id
                        break
                      }
                    }
                    this._actionGetRealtimeCurrenttimeServer()
                    this._counterTimes(maxDatetime)
                  }
                }
              } else {
                /** Get Identities Quiz */
                this.quiz_id = response.data.quiz._id
                const AllHasAnswered = this.soals.every(v => v.answered)

                if (AllHasAnswered) {
                  this.showButtonFinish = AllHasAnswered
                } else {
                  /** Get Soals Quiz */
                  this.soals = response.data.soals.soals
                  for (let index = 0; index < this.soals.length; index++) {
                  // eslint-disable-next-line no-console
                    console.log('Check Soal => ' + this.soals[index].answered)
                    if (!this.soals[index].answered) {
                      this.current_soal = this.soals[index]._id
                      break
                    }
                  }
                }
              }
            }
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(err))
          const error = err.response
          this.loadingSoal = false

          if (err.response.data === 'stoped') {
            this.$notify({
              group: 'foo',
              type: 'warn',
              text: 'Anda telah Mengakhiri Quiz '
            })
            setTimeout(() => {
              this._actionEndUjian()
            }, 1500)
          } else if (err.response.status === 404) {
            this.$notify({
              group: 'foo',
              type: 'warn',
              text: JSON.stringify(error.data.message)
            })
          } else {
            // alert(JSON.stringify(err.response))
            this.$notify({
              group: 'foo',
              type: 'warn',
              text: JSON.stringify(error.data)
            })
          }
        })
    },
    _actionAnswer (soalId, jawabanId, next) {
      const IndexSoal = this.soals.length
      const maxIndexSoal = parseInt(IndexSoal) - 1
      this._actionStoreAnswer(soalId, jawabanId, next, maxIndexSoal)
    },
    _actionStoreAnswer (soalId, jawaban, next, maxIndexSoal) {
      this.loadingjawab = true
      const data = {
        soal_id: soalId,
        jawaban_id: jawaban
      }

      this.$axios.post('jawab-quiz-peserta/quiz/' + this.quiz_id, data, { headers: { 'x-access-token': this.token } }).then((response) => {
        if (response.data.success === 'true') {
          if (next === maxIndexSoal) {
            this.current_soal = null
            this.semuadijawab = true
            this.showButtonFinish = true
          } else {
            next += 1
            const nextSoal = this.soals[next]._id
            this._moveNumber(nextSoal)
          }
          document.getElementById(soalId).className += ' item_active'
        }
        this.loadingjawab = false
      // eslint-disable-next-line handle-callback-err
      }).catch((err) => {
        this.loadingjawab = false
        const infoerr = err.response.data
        this.$notify({
          group: 'foo',
          type: 'warn',
          text: infoerr ? infoerr.message : infoerr
        })
        const nextSoal = this.soals[next]._id
        this._moveNumber(nextSoal)
      })
    },
    _moveNumber (no) {
      // this._actionChechExsistAnswer(no)
      this.current_soal = no
    },
    skipSoalByHasAnswer (next) {
      const IndexSoal = this.soals.length
      const maxIndexSoal = parseInt(IndexSoal) - 1
      if (next === maxIndexSoal) {
        next = 0
      } else {
        next += 1
      }
      const number = this.soals[next]._id
      this.current_soal = number
      // eslint-disable-next-line no-console
      console.log('klick ' + next + '-' + number)
    },
    _actionChechExsistAnswer (soalId) {
      this.$axios.post('check-jawaban-in-quiz?quiz_id=' + this.quiz_id + '&soal_id=' + soalId, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response.data.data)
          const soal = response.data.data.soal_id
          this.currentAnswer = soal
          document.getElementById(soalId).className += ' item_active'
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
          this.currentAnswer = null
        })
    },
    _actionEndUjian () {
      this.$router.push({
        path: '/start-quiz/nilai',
        query: { quiz_id: this.quiz_id }
      })
    },
    _actionDecrest (maxtime, max) {
      // eslint-disable-next-line no-console
      // console.log('ini max ' + max + '-> ' + maxtime)
      this.showProgresstime = true
      const now = moment().format('YYYY-MM-DD HH:mm')
      const expireTime = moment(maxtime).format('YYYY-MM-DD HH:mm')
      const sisawaktu = moment(expireTime).diff(now)
      const toShorttime = (sisawaktu / 1000)
      this.max = parseInt(max)
      this.timer = toShorttime
      this.countDown = setInterval(() => {
        this.timer -= 1
        if (this.timer < 0) {
          clearInterval(this.countDown)
          this.showProgresstime = false
          this._actionEndUjian()
        }
      }, 1000)
    },
    _counterTimes (maxDatetime) {
      clearInterval(this.countDowntime)
      this.countDowntime = setInterval(() => {
        const t = (moment(maxDatetime)) - (moment(this.realtimeserver))
        const days = Math.floor(t / (1000 * 60 * 60 * 24))
        const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((t % (1000 * 60)) / 1000)

        if (hours > 0) {
          document.getElementById('hour').innerHTML = hours + ' Jam :'
        }
        if (minutes > 0) {
          document.getElementById('minute').innerHTML = minutes + ' Menit :'
        } else {
          document.getElementById('minute').innerHTML = null
        }
        if (days > 0) {
          document.getElementById('days').innerHTML = days + ' Hari '
        }
        document.getElementById('second').innerHTML = seconds + ' Detik'
        const self = this

        if (hours < 0 && minutes < 0 && seconds < 0) {
          clearInterval(this.countDowntime)
          self.showtimer = false
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Waktu Sudah Habis'
          })
          self._actionEndUjian()
        }
      }, 1000)
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
    margin-left: 1px;
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
    /* background: tomato; */
    background-color: grey;
    padding: 5px;
    width: 40px;
    height: 40px;
    margin-top: 10px;
    margin-left: 4px;
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
  .sessi-active {
    color: rgb(58, 160, 58)
  }
  .img-fluid {
    max-width: 40%;
    height: auto;
  }
  .img-fluidphoto {
    height: auto;
  }
  .bg-blues {
    background-color: white;
    border-bottom: 1px solid rgb(187, 187, 187);
  }
  .btn-block {
    border-radius: 8px;
  }
  .detail-profile:hover {
    background-color: #007BFF;
  }
  .text-dropdown {
    color: #FFFFFF;
    margin: 10px ;
  }
  .navbar-brand {
    width: 200px
  }
  .content-body {
    padding-top: 0.5rem;
    margin-top: 4rem;
  }
  .soals {
    margin: -5px 20px;
  }
  .text-timer {
    font-size: 30px;
  }
  @media (max-width: 767.98px) {
    .text-timer {
      font-size: 20px;
    }
    .timer {
      margin-left: 5px;
    }
  }
   @media (max-width: 370.98px) {
     .sub-timer {
      margin-left: -250px !important;
    }
    .navbar-brand {
      margin-right: 0px !important;
    }
    .text-timer {
      font-size: 16px;
    }
  }
  @media (max-width: 454.98px) {
    .sub-timer {
      margin-left: -300px;
    }
    .navbar-brand {
      margin-right: 0px !important;
    }
  }
   @media (max-width: 575.98px) {
    .sub-timer {
      margin-left: -340px;
    }
    .navbar-brand {
      margin-right: 0px !important;
    }
  }
  @media (min-width: 768px) {
    .flex-item {
      margin-left: 2px;
    }
  }
</style>
