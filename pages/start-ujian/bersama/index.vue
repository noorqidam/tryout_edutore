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
        <!-- <b-navbar-toggle target="nav-collapse" /> -->
      </div>
      <div class="row justify-content-center timer">
        <div v-if="showtimer" class="text-center sub-timer">
          <span id="days" class="days text-timer" />
          <span id="hour" class="hours text-timer" />
          <span id="minute" class="minutes text-timer" />
          <span id="second" class="seconds text-timer" />
        </div>
      </div>
    </nav>
    <div v-if="!loadingSoal" class="content-body">
      <div class="row flex-xl-nowrap2">
        <div class="bd-sidebar border-bottom-0 col-md-3 col-xl-2 col-12">
          <nav id="bd-docs-nav" aria-label="Main navigation" class="bd-links d-none d-md-block text-center">
            <div class="mt-0">
              <div v-if="photo" style="width:70%;height:auto;margin-left:auto;margin-right:auto;margin-top:5px">
                <b-img :src="photo" :alt="user" thumbnail fluidphoto />
              </div>
              <div v-else style="width:70%;height:auto;margin-left:auto;margin-right:auto;margin-top:5px">
                <b-img :alt="user" src="~/assets/img/edu-wink.gif" thumbnail fluidphoto />
              </div>
            </div>
            <div target="_self">
              <a href="/" class="bd-toc-link" target="_self">{{ user }}</a>
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
          <main id="soals" class="bd-main pt-2">
            <section v-for="(soal ,i ) in soals" :key="soal._id" class="soals">
              <transition
                enter-active-class="animated fadeInUp"
              >
                <div v-if="current_soal === soal._id">
                  <div v-if="soal.answered">
                    Sudah di jawab
                  </div>
                  <p v-html="soal.soal_text" style="color:black" />
                  <b-img v-if="soal.soal_image" :src="pathImagesQ + soal.soal_image" thumbnail fluid />
                  <template v-if="soal.type_soal ==='PG'">
                    <ol class="mt-1" type="A">
                      <li v-for="j in soal.jawabans" :key="j._id">
                        <b-button
                          v-if="currentAnswer === soal._id"
                          class="active"
                          variant="outline-secondary"
                          style="margin-bottom:2px;"
                          disabled
                        >
                          <p v-html="j.jawaban_text" style="color:black;text-align:left" />
                          <b-img v-if="j.jawaban_image" :src="pathImagesAnswer + j.jawaban_image" thumbnail fluid />
                        </b-button>
                        <b-button
                          v-else
                          @click="_actionAnswer(soal._id,j._id,i)"
                          variant="outline-secondary"
                          style="margin-bottom:2px"
                        >
                          <p v-html="j.jawaban_text" style="color:black;text-align:left; align-content: center" />
                          <b-img v-if="j.jawaban_image" :src="pathImagesAnswer + j.jawaban_image" thumbnail fluid />
                        </b-button>
                      </li>
                    </ol>
                  </template>
                  <template v-else>
                    <div class="mt-1">
                      <textarea v-model="FormJawab" cols="20" rows="5" class="form-control" />
                      <div class="row justify-content-center mt-1 pt-1">
                        <div class="col-md-3">
                          <button @click="_actionAnswerEsay(soal._id,i)" class="btn btn-block btn-primary">
                            Jawab
                          </button>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
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
          </div>
          <div class="row justify-content-center">
            <div class="col-md-auto">
              <b-button v-if="showButtonFinish" @click="_actionEndUjian" variant="primary" pill="" block>
                <i class="fa fa-flag" /> Akhiri
              </b-button>
              <b-button v-if="button_waiting" @click="_nextSesiUjian" variant="primary" pill="" block>
                <i class="fa fa-flag" />  lanjut Ke sesi berikutnya
              </b-button>
            </div>
          </div>
        </div>
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
import moment from 'moment'
import io from 'socket.io-client'
import firebase from '~/services/fireinit'
Vue.use(Notifications)
export default {
  name: 'StartUjianBersamaDefault',
  layout (context) {
    return 'defaults'
  },
  data () {
    return {
      loadingSoal: true,
      soals: [],
      currentAnswer: null,
      current_soal: null,
      UserHasLogin: false,
      ujian_id: null,
      sesiId: null,
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
      token: null,
      user: null,
      photo: null,
      loadingjawab: false,
      showtimer: true,
      realtimeserver: null,
      semuadijawab: false,
      expire: false,
      modalShow: false,
      sesi_ujian: [],
      jadwalsesi: {},
      next_sesi_id: null,
      next_sesi_name: null,
      button_waiting: false,
      FormJawab: null
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
  mounted () {
    history.pushState(null, null, location.href)
    window.onpopstate = () => {
      this._actionModalOut()
      history.go(1)
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user.displayName
        this.photo = user.photoURL
        user.getIdToken(true).then((accesstoken) => {
          this.token = accesstoken
          this.UserHasLogin = true
          const id = this.$route.query._id
          const sesiId = this.$route.query.sesi_ujian
          this.ujian_id = id
          this.sesiId = sesiId // set sesiId

          this.actionGetJadwalSesiUjian(id)
          // this.$store.commit('auth/updateToken', accesstoken)
        })
      } else {
        const sesiId = this.$route.query.sesi_ujian
        this.$router.push({
          path: '/login',
          query: { ujian_id: this.$route.query._id, sesi_id: sesiId, ref: this.$route.fullPath }
        })
      }
    })
  },
  methods: {
    _actionGetRealtimeCurrenttimeServer () {
      // const socket = io('https://api-tryout.edutore.com')
      const socket = io('https://api-tryout.edutore.com', { 'transports': ['websocket', 'polling'] })
      socket.on('show_timer', function (data) {
        if (data) {
          this.realtimeserver = data
        }
      }.bind(this))
    },
    async actionGetJadwalSesiUjian (id) {
      await this.$axios.get('jadwal-sesi-ujian/' + id).then((response) => {
        const objs = response.data.data.schedule
        this.jadwalsesi = response.data.data
        objs.sort((a, b) => (a.position > b.position ? 1 : b.position > a.position ? -1 : 0))
        this.sesi_ujian = objs
        this._actionGetQuestion(this.ujian_id, this.sesiId)
        this._actionGetRealtimeCurrenttimeServer()
      })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Jadwal Ujian tidak di temukan ',
            footer: '<a href="/why/jadwal-notfound">Mengapa ini terjadi?</a>'
          })
        })
    },
    /** Get Question Soal Ujian require
     *  body @ujian_id
     */
    _actionGetQuestion (id, sesiId) {
      const data = {
        ujian_id: id,
        sesi_id: sesiId
      }
      this.$axios.post('soal-ujian-in-sesi', data, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          if (response.data.success === 'true') {
            this.loadingSoal = false
            // eslint-disable-next-line no-console
            // console.log(response.data)
            if (!response.data.soals) {
              // alert('Tidak Ada Soal')
              this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Belum ada Soal di Sesi Ujian ini',
                footer: '<a href>Mengapa ini terjadi?</a>'
              })
            } else {
              /** Set Ujian Identitites */
              const ujian = response.data.ujian
              this.title = ujian.judul_ujian
              const timesNow = moment()
              const getEndDate = moment(ujian.end_date).format('YYYY-MM-DD')
              let jam = null
              let minutes = 0

              this.sesi_ujian.forEach((element) => {
                if (element.sesi_id === this.sesiId) {
                  jam = element.start_time
                  minutes = element.duration
                  // eslint-disable-next-line no-console
                  console.log('ada id yang sama =' + JSON.stringify(element))
                }
              })
              /** get Hour in times Ujian { example data (d) => 10:30 } */
              const getHour = jam.substring(0, 2) /**  jam.substring(0, 2) => 10 */
              const getMinutes = jam.substring(3, 5) /** jam.substring(3, 5) => 30 */

              const maxDateNTime = moment(getEndDate).add(getHour, 'h').add(getMinutes, 'm').add(minutes, 'm')
              const Maxtimes = moment(maxDateNTime).format('YYYY-MM-DD HH:mm')
              // eslint-disable-next-line no-console
              console.log(Maxtimes + ' - ' + timesNow)
              // eslint-disable-next-line no-console
              console.log(moment(maxDateNTime).format('YYYY-MM-DD HH:mm:ss') + ' - ' + moment(timesNow).format('YYYY-MM-DD HH:mm:ss'))
              if (moment(maxDateNTime).isBefore(timesNow)) {
                // eslint-disable-next-line no-console
                console.log('Waktu Sesi Yang Di request Sudah Habis')
                this.$notify({
                  group: 'foo',
                  type: 'error',
                  text: 'Waktu Sudah Habis'
                })
                this.expire = true

                this.checkSesiUjian()
              } else {
                /** Get Soals Ujian */
                this.soals = response.data.soals.soals
                /** Get Identities Ujian */
                this.ujian_id = response.data.ujian._id

                // this._actionDecrest(Maxtimes, ujian.waktu_pengerjaan)
                const AllHasAnswered = this.soals.every(v => v.answered)
                // eslint-disable-next-line no-console
                console.log('Soal Di jawab ? => ' + AllHasAnswered)
                const GetSesiUjian = this.sesi_ujian
                if (AllHasAnswered) {
                  const schedule = GetSesiUjian
                  const lengthSchedule = schedule.length - 1
                  const index = schedule.findIndex(id => id.sesi_id === this.sesiId)
                  // eslint-disable-next-line no-console
                  console.log('Semua di jawab n ada Jumlah Sesi ' + lengthSchedule)
                  if (index === lengthSchedule) {
                    // eslint-disable-next-line no-console
                    console.log('tidak ada sesi lanjutan')
                    this.showButtonFinish = AllHasAnswered
                    this.current_soal = null
                    this.semuadijawab = true
                  } else {
                    // eslint-disable-next-line no-console
                    console.log(' sesi sekarang di position ' + index)

                    const getNextIndex = index + 1
                    // eslint-disable-next-line no-console
                    console.log('ada sesi berikut nya ' + getNextIndex)
                    const getNextSesi = schedule[getNextIndex]
                    // eslint-disable-next-line no-console
                    console.log('ada sesi berikut nya ' + JSON.stringify(getNextSesi))
                    this.next_sesi_id = getNextSesi.sesi_id
                    this.button_waiting = true
                    this.current_soal = null
                  }
                } else {
                  /** Start CountDown Progressbar timeline QUiz */
                  /** Set Current Soal to LocalState  */
                  this.current_soal = this.soals[0]._id
                  /** Check Soal has been Answer  */
                  const GetSoals = response.data.soals.soals
                  for (let index = 0; index < GetSoals.length; index++) {
                    if (!GetSoals[index].answered) {
                      this.current_soal = GetSoals[index]._id
                      // eslint-disable-next-line no-console
                      console.log('Soal false => ' + GetSoals[index]._id)
                      break
                    }
                  }
                  this._counterTimes(Maxtimes)
                }
              }
            }
          }
        })
        .catch((err) => {
          const error = err.response
          this.loadingSoal = false
          if (error) {
            if (error.data === 'stoped') {
              this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Sepertinya ada yang Salah',
                footer: '<a href="/"> Mengapa Masalah ini terjadi ?</a>'
              })
              setTimeout(() => {
                this._actionEndUjian()
              }, 1500)
            } else if (err.response.status === 404) {
              this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Kami Kesulitan Menemukan Ujian ini',
                footer: '<a href="/ujian"> Mengapa Masalah ini terjadi ?</a>'
              })
            } else {
              this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Sepertinya ada yang Salah',
                footer: '<a href="/"> Mengapa Masalah ini terjadi ?</a>'
              })
            }
          }
        })
    },
    _actionAnswerEsay (soalId, next) {
      const IndexSoal = this.soals.length
      const maxIndexSoal = parseInt(IndexSoal) - 1
      this._actionStoreAnswer(soalId, this.FormJawab, next, maxIndexSoal)
    },
    _actionAnswer (soalId, jawabanId, next) {
      const IndexSoal = this.soals.length
      const maxIndexSoal = parseInt(IndexSoal) - 1
      this._actionStoreAnswer(soalId, jawabanId, next, maxIndexSoal)
    },
    _actionStoreAnswer (soalId, jawaban, next, maxIndexSoal) {
      this.loadingjawab = true
      const data = {
        id: this.ujian_id,
        soal_id: soalId,
        jawaban_id: jawaban,
        jawaban_text: jawaban,
        sesi_id: this.sesiId
      }

      this.$axios.post('jawab-soal-ujian/sesi-ujian/' + this.ujian_id, data, { headers: { 'x-access-token': this.token } }).then((response) => {
        if (response.data.success === 'true') {
          document.getElementById(soalId).className += ' item_active'
          this.FormJawab = null
          if (next === maxIndexSoal) {
            this.current_soal = null
            this.semuadijawab = true
            this.checkSesiUjian()
            // this.showButtonFinish = true
          } else {
            next += 1
            const nextSoal = this.soals[next]._id
            this._moveNumber(nextSoal)
          }
        }
        this.loadingjawab = false
      // eslint-disable-next-line handle-callback-err
      }).catch((err) => {
        this.loadingjawab = false
        document.getElementById(soalId).className += ' item_active'

        if (next === maxIndexSoal) {
          this.current_soal = null
          this.semuadijawab = true
          this.showButtonFinish = true
        } else {
          next += 1
          const nextSoal = this.soals[next]._id
          this._moveNumber(nextSoal)
        }

        const infoerr = err.response.data
        this.$notify({
          group: 'foo',
          type: 'warn',
          text: infoerr ? infoerr.message : infoerr
        })
      })
    },
    _moveNumber (no) {
      this.current_soal = no
    },
    skipSoalByHasAnswer (next) {
      const IndexSoal = this.soals.length
      const maxIndexSoal = parseInt(IndexSoal) - 1
      if (next === maxIndexSoal) {
        next = 0
      } else {
        // next += 1
      }
      const number = this.soals[next]._id
      this.current_soal = number
      // eslint-disable-next-line no-console
      console.log('klick ' + next + '-' + number)
    },
    _actionEndUjian () {
      clearInterval(this.countDowntime)
      this.$router.push({
        path: '/start-ujian/finish',
        query: { ujian_id: this.ujian_id, judul_ujian: this.title, sesi_id: this.sesiId }
      })
    },
    _nextSesiUjian () {
      clearInterval(this.countDowntime)
      this.$router.push({
        path: '/start-ujian/bersama/waitting',
        query: { ujian_id: this.ujian_id, sesi_id: this.next_sesi_id, judul_ujian: this.title }
      })
    },
    _actionDecrest (maxtime, max) {
      // eslint-disable-next-line no-console
      console.log('ini max ' + max + '-> ' + maxtime)
      this.showProgresstime = true
      const now = moment().format('YYYY-MM-DD HH:mm')
      const expireTime = moment(maxtime).format('YYYY-MM-DD HH:mm')
      const sisawaktu = moment(expireTime).diff(now)
      // eslint-disable-next-line no-console
      const toShorttime = (sisawaktu / 1000)
      this.max = parseInt(max)
      this.timer = toShorttime
      this.countDown = setInterval(() => {
        this.timer -= 1
        if (this.timer < 0) {
          // document.getElementById('timmer').innerHTML = 'WAKTU HABIS'
          clearInterval(this.countDown)
          this.showProgresstime = false
          this._actionEndUjian()
        }
      }, 1000)
    },
    _counterTimes (maxDatetime) {
      clearInterval(this.countDowntime)
      // const GettimesServer = moment(this.realtimeserver)
      this.countDowntime = setInterval(() => {
        const t = (moment(maxDatetime)) - (moment(this.realtimeserver))
        // GettimesServer += 1000
        // eslint-disable-next-line no-console
        console.log('ini perhitungan ' + maxDatetime + '-' + this.realtimeserver)
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
          this.current_soal = null
          self.checkSesiUjian()
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
    },
    checkSesiUjian () {
      const GetSesiUjian = this.sesi_ujian

      const schedule = GetSesiUjian
      const lengthSchedule = schedule.length - 1
      const index = schedule.findIndex(id => id.sesi_id === this.sesiId)

      if (index === lengthSchedule) {
        // eslint-disable-next-line no-console
        console.log('tidak ada sesi lanjutan')
        this.showButtonFinish = true
        this.$notify({
          group: 'foo',
          type: 'error',
          text: 'Tidak Ada Sesi lanjutan'
        })
      } else {
        // eslint-disable-next-line no-console
        console.log(' sesi sekarang di position ' + index)

        const getNextIndex = index + 1
        // eslint-disable-next-line no-console
        console.log('ada sesi berikut nya ' + getNextIndex)
        const getNextSesi = schedule[getNextIndex]
        // eslint-disable-next-line no-console
        console.log('ada sesi berikut nya ' + JSON.stringify(getNextSesi))
        this.next_sesi_id = getNextSesi.sesi_id
        this.button_waiting = true
      }
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
    margin-left: 5px;
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
    margin-left: 4px;
    margin-right: 1px;
    line-height: 30px;
    color: white;
    font-weight: bold;
    font-size: 20px;
    justify-content: center;
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
    width: 200px;
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
