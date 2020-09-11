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
    <nav class="navbar navbar-expand-sm navbar-light bg-blues is-desktop fixed-top">
      <div class="align-items-end">
        <a @click="_actionModalOut" class="navbar-brand"><img src="~/assets/img/edutore.png" class="img-fluid" alt="~/assets/img/edutore.png"></a>
      </div>
    </nav>
    <div class="content-body">
      <div class="row flex-xl-nowrap2">
        <div class="bd-sidebar border-bottom-0 col-md-3 col-xl-2 col-12">
          <nav id="bd-docs-nav" aria-label="Main navigation" class="bd-links d-none d-md-block text-center">
            <div class="mt-0">
              <div style="width:70%;height:auto;margin-left:auto;margin-right:auto;margin-top:5px">
                <b-img :src="photo" :alt="user" thumbnail fluidphoto />
              </div>
            </div>
            <div target="_self">
              <a href="/" class="bd-toc-link" target="_self">{{ user }}</a>
            </div>
          </nav>
        </div>
        <div class="bd-content col-md-9 col-xl-8 col-12 pb-md-3 pl-md-5">
          <div class="clearfix d-block" />
          <main id="soals" class="bd-main pt-2">
            <div v-if="showButtonStart" class="row">
              <div class="col-md-12">
                <h2 class="h2 text-center">
                  Silahkan Klik tombol Start untuk memulai Sesi
                  <br>{{ sesi_ujian }}
                </h2>
              </div>
              <div class="col-md-12">
                <div class="row justify-content-center">
                  <div class="col-md-3">
                    <router-link
                      :to="{
                        path: '/start-ujian/bersama/',
                        params: { id: ujian_id },
                        query: { type: 'bersama', _id: ujian_id, sesi_ujian: next_sesi }
                      }"
                      class="btn btn-block btn-primary"
                    >
                      <font-awesome-icon icon="play" />
                      Mulai
                    </router-link>
                    <!-- <button @click="startUjian" class="btn btn-block btn-primary">
                      <

                    </button> -->
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <h2 class="h2 text-center">
                Menunggu Sesi Ujian Berikutnya
                <br>
                {{ sesi_ujian }}
                <br>
              </h2>
              <h4 class="h3 text-center">
                dimulai pada jam <font-awesome-icon icon="clock" /> {{ start_time_in }}
              </h4>
            </div>
            <div class="row justify-content-center timer">
              <div v-if="showtimer" class="text-center sub-timer">
                <span id="hour" class="hours text-timer" />
                <span id="minute" class="minutes text-timer" />
                <span id="second" class="seconds text-timer" />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import moment from 'moment'
import { mapState } from 'vuex'
export default {
  name: 'WaitingRoom',
  data () {
    return {
      modalShow: false,
      showtimer: false,
      showButtonStart: false,
      next_sesi: '',
      sesi_ujian: '',
      ujian_id: '',
      realtimeserver: null,
      jadwalsesi: {},
      start_time_in: '',
      judul_ujian: null
    }
  },
  computed: {
    ...mapState({
      photo: state => state.auth.photo,
      user: state => state.auth.user
    })
  },
  mounted () {
    this.$store.dispatch('auth/getAuth')
    history.pushState(null, null, location.href)
    window.onpopstate = () => {
      this._actionModalOut()
      history.go(1)
    }
    this.next_sesi = this.$route.query.sesi_id
    this.ujian_id = this.$route.query.ujian_id
    this.judul_ujian = this.$route.query.judul_ujian
    this._actionGetJadwalSesiUjian(this.ujian_id)
  },
  methods: {

    _actionGetRealtimeCurrenttimeServer () {
      const socket = io('https://api-tryout.edutore.net')
      socket.on('show_timer', function (data) {
        if (data) {
          this.realtimeserver = data
        }
      }.bind(this))
    },
    _actionModalOut () {
      this.modalShow = true
    },
    _actionLogout () {
      clearInterval(this.countDowntime)
      this.$router.push({
        path: '/'
      })
      this.modalShow = false
    },
    _actionGetJadwalSesiUjian (id) {
      this.$axios.get('jadwal-sesi-ujian/' + id).then((response) => {
        this.jadwalsesi = response.data.data
        const objs = response.data.data.schedule
        objs.sort((a, b) => (a.position > b.position ? 1 : b.position > a.position ? -1 : 0))
        /// const GetJadwalSesiUjian = response.data.data.schedule
        objs.forEach((element) => {
          if (element.sesi_id === this.next_sesi) {
            this.start_time_in = element.start_time
            this.sesi_ujian = element.sesi_ujian
            const timeNow = moment()
            const currentDate = moment().format('YYYY-MM-DD')
            const getHour = this.start_time_in.substring(0, 2) /**  jam.substring(0, 2) => 10 */
            const getMinutes = this.start_time_in.substring(3, 5) /** jam.substring(3, 5) => 30 */
            // eslint-disable-next-line no-console
            console.log(getHour + ':' + getMinutes)
            /** Add Hours n Minute in Start Date Ujian  */
            const StartTimeSesi = moment(currentDate).add(getHour, 'h').add(getMinutes, 'm')
            // eslint-disable-next-line no-console
            console.log('Sesi di mulai pada ' + moment(StartTimeSesi).format('YYYY-MM-DD HH:mm'))
            // eslint-disable-next-line no-console
            console.log('bandingkan ' + moment(timeNow).format('YYYY-MM-DD HH:mm') + '=' + moment(StartTimeSesi).format('YYYY-MM-DD HH:mm'))

            const MaxDateAndTime = moment(StartTimeSesi).add(element.duration, 'm')
            // eslint-disable-next-line no-console
            console.log('Max Pengerjaan sampai ' + moment(MaxDateAndTime).format('YYYY-MM-DD HH:mm'))
            if (moment(timeNow).isAfter(StartTimeSesi) && moment(MaxDateAndTime).isAfter(timeNow)) {
              this.showButtonStart = true
            } else if (moment(timeNow).isBefore(StartTimeSesi)) {
            // eslint-disable-next-line no-console
              console.log('Is after ' + timeNow + '=' + StartTimeSesi)
              this._actionGetRealtimeCurrenttimeServer()
              this.showtimer = true
              // showcountdowntimer
              const maxDatetime = StartTimeSesi /// moment(StartTimeSesi).format('DD-MM-YYYY HH:mm')
              this._counterTimes(maxDatetime)
            } else if (moment(MaxDateAndTime).isBefore(timeNow)) {
              const schedule = objs
              const lengthSchedule = schedule.length - 1
              const index = schedule.findIndex(id => id.sesi_id === this.next_sesi)

              if (index === lengthSchedule) {
                // eslint-disable-next-line no-console
                console.log('tidak ada sesi lanjutan')
                this.$swal({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Waktu Sudah Habis'
                // footer: '<a href>Why do I have this issue?</a>'
                })
                // this.showButtonFinish = true
                this.$router.push({
                  path: '/start-ujian/finish',
                  query: { ujian_id: this.ujian_id, judul_ujian: this.judul_ujian }
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
                this.next_sesi = getNextSesi
              }
            }
          }
        })
      })
    },
    _counterTimes (maxDatetime) {
      clearInterval(this.countDowntime)
      this.countDowntime = setInterval(() => {
        const t = (moment(maxDatetime)) - (moment(this.realtimeserver))
        const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((t % (1000 * 60)) / 1000)

        if (hours > 0) {
          document.getElementById('hour').innerHTML = hours + ' Jam :'
        } else {
          document.getElementById('hour').innerHTML = null
        }
        if (minutes > 0) {
          document.getElementById('minute').innerHTML = minutes + ' Menit :'
        } else {
          document.getElementById('minute').innerHTML = null
        }

        document.getElementById('second').innerHTML = seconds + ' Detik'
        const self = this

        if (hours < 0 && minutes < 0 && seconds < 0) {
          clearInterval(this.countDowntime)
          self.showtimer = false
          self.showButtonStart = true
        }
      }, 1000)
    },
    startUjian () {
      clearInterval(this.countDowntime)
      window.href = ''
      this.$router.push({
        path: '/start-ujian/bersama/',
        params: { id: this.ujian_id },
        query: { type: 'bersama', _id: this.ujian_id, sesi_ujian: this.next_sesi }
      })
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
</style>
