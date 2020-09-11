<template>
  <div>
    <div class="container-fluid pb-3" style="font-family:Elliot Sans;background-color:white;">
      <div class="container">
        <div class="row content-page" style="padding-top: 80px;">
          <div class="col-md-5" style="margin-top: 20px">
            <div class="card card-left">
              <div class="card-body" style="padding: 2rem">
                <div class="text-center">
                  <img v-if="ujian.ujian_banner" v-lazy.container="pathBanner + ujian.ujian_banner" :alt="ujian.ujian_banner" class="img-fluid">
                  <img v-else v-lazy.container="pathBanner + 'edutore.jpg'" alt="'Edutore'" class="img-fluid">
                </div>
                <h1 class="card-title title-book">
                  {{ ujian.judul_ujian }}
                </h1>
                <div v-if="ujian.is_private">
                  <i class="fa fa-lock" />
                  <span class="badge badge-pill badge-primary"> Ujian </span>
                </div>
                <div v-else>
                  <i class="fa fa-users" />
                  <span class="badge badge-pill badge-primary"> Ujian </span>
                </div>
                <p class="card-text title-penyelenggara">
                  {{ ujian.penyelenggara }}
                </p>
                <div>
                  <p v-if="ujian.start_date === ujian.end_date" class="text-center txt-date">
                    <i class="fa fa-calendar-check-o" aria-hidden="true" />
                    {{ _formatDate(ujian.start_date) }}
                    <span class="text-date">({{ ujian.times }} - {{ ujian.end_times }})</span>
                  </p>
                  <p v-else class="text-center txt-date">
                    <i class="fa fa-calendar-check-o" aria-hidden="true" />
                    {{ _formatDate(ujian.start_date) }} - {{ _formatDate(ujian.end_date) }}
                    <span class="text-date">({{ ujian.times }} - {{ ujian.end_times }})</span>
                  </p>
                </div>
                <div class="text-center" style="margin-bottom:16px">
                  <button v-if="showButtonStart" @click="_actionStartTest(ujian)" class="btn btn-mulai">
                    <i class="fa fa-play-circle-o" /> Mulai Test
                  </button>
                  <button v-else-if="expireButton" class="btn btn-mulai bg-danger" disabled>
                    {{ messageButton }}
                  </button>
                  <div v-if="showTime">
                    <div class="text-center">
                      <span id="days" class="days" style="font-size:30px" />
                      <span id="hour" class="hours" style="font-size:30px" />
                      <span id="minute" class="hours" style="font-size:30px" />
                      <span id="second" class="seconds" style="font-size:30px" />
                    </div>
                  </div>
                </div>
                <p class="txt-syarat">
                  Syarat &amp; Ketentuan
                </p>
                <div style="text-align: justify;text-justify: inter-word">
                  <div v-if="ujian.description ? ujian.description.length >150 : 0">
                    <span v-if="!readMoreActivated" class="span-syarat">
                      <p v-html="ujian.description" />
                      <!-- {{ ujian.description ? ujian.description.slice(0, 150): null }}... -->
                    </span>
                    <a v-if="!readMoreActivated" @click="actionReadMore" class="readmore">Baca Selengkapnya</a>
                    <span v-if="readMoreActivated" v-html="ujian.description" class="span-syarat" />
                    <a v-if="readMoreActivated" @click="actionReadLess" class="readmore">Baca Lebih Sedikit</a>
                  </div>
                  <div v-else v-html="ujian.description">
                    <!-- {{ ujian.description }} -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="listView" class="col-md-7" style="margin-right:auto;margin-left:auto; margin-top: 20px">
            <b-list-group v-for="(d, n ) in detail" :key="d._id" class="mb-1">
              <div class="card card-right">
                <div class="card-header text-center div-sesi">
                  <p class="txt-sesi">
                    <!-- Sesi Ujian {{ d.sesi_quiz }} - {{ d.duration }} Menit -->
                    Sesi {{ ++n }}
                  </p>
                </div>
                <div class="card-body">
                  <div class="row justify-content-center" style="margin-bottom:-13px">
                    <p class="txt-sub-sesi">
                      <!-- Sub Ujian 2  -->
                      Sesi Ujian {{ d.sesi_ujian }}
                    </p>
                    <br>

                    <span class="txt-sesi-soal"> Durasi {{ d.duration }}  Menit</span>
                  </div>
                  <div>
                    <p class="text-center txt-sub-sesi">
                      Di mulai Pada jam {{ d.start_time }}
                    </p>
                  </div>
                </div>
              </div>
            </b-list-group>
          </div>
          <div v-else class="col-md-7" style="margin-right:auto;margin-left:auto">
            <div v-for="l in list" :key="l">
              <content-loader
                :height="100"
                :width="400"
                :speed="2"
                primary-color="#f3f3f3"
                secondary-color="#ecebeb"
              >
                <rect
                  x="0"
                  y="78.4"
                  rx="3"
                  ry="3"
                  width="378"
                  height="6.91"
                />
                <rect
                  x="0"
                  y="100"
                  rx="3"
                  ry="3"
                  width="380"
                  height="6.4"
                />
                <rect
                  x="1.56"
                  y="16.61"
                  rx="0"
                  ry="0"
                  width="379.32"
                  height="46"
                />
                <rect
                  x="18.56"
                  y="33.61"
                  rx="0"
                  ry="0"
                  width="0"
                  height="0"
                />
                <rect
                  x="72.56"
                  y="33.61"
                  rx="0"
                  ry="0"
                  width="0"
                  height="0"
                />
              </content-loader>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid bg pt-3" style="min-height:400px;padding-bottom:10px;">
      <div class="container">
        <h4 class="h4 text-left bg-text">
          Rekomendasi Tes Lainnya
        </h4>
        <Ujiann />
      </div>
    </div>
    <div class="container-fluid border-top" style="min-height:400px;padding-top:20px;background-color:smoke">
      <div class="container pb-3 pt-1">
        <br>
        <books />
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import moment from 'moment'
import io from 'socket.io-client'
const Ujiann = () => import('~/components/ujian/ujian')
const books = () => import('~/components/campaign/Books')
export default {
  name: 'Ujian',
  components: {
    Ujiann,
    ContentLoader,
    books
  },
  data () {
    return {
      ujian: {},
      items: [],
      detail: [],
      totalSoal: 0,
      pathBanner: 'https://storage.googleapis.com/edutore-cdn/tryout/',
      content: null,
      title: null,
      showBtn: false,
      readMoreActivated: false,
      listView: false,
      list: 4,
      messageButton: '',
      showTime: false,
      showButtonStart: false,
      expireButton: false,
      textLong: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a quam lacinia enim tempor iaculis ut vel diam. Nunc congue suscipit iaculis. Sed lorem nunc, gravida sit amet dignissim nec, ultrices a enim. Phasellus id velit et nibh convallis interdum. Proin suscipit sem at lorem vulputate porta. Duis lobortis libero vitae ante venenatis, a rutrum justo hendrerit. Suspendisse vel ante luctus, tincidunt leo vitae, sagittis elit. Sed vel turpis eros. Nam vestibulum justo nec orci ultrices laoreet. Quisque in turpis non orci egestas dignissim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec et bibendum justo. Vestibulum et purus sapien.',
      realtimeserver: null,
      jadwalsesi: {}
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.content },
        { hid: 'og-description', property: 'og:description', content: this.content },
        { hid: 'og-author', property: 'og:author', content: 'Edutore Gramedia' },
        { hid: 'og-title', property: 'og:title', content: this.content },
        { hid: 'og-site_name', property: 'og:site_name', content: this.content }
      ]
    }
  },
  mounted () {
    const id = this.$route.query.id
    const slug = this.$route.query.slug
    this.title = slug
    this._actionGetByid(id)

    this._actionGetJadwalSesiUjian(id)
  },
  methods: {
    _actionGetRealtimeCurrenttimeServer () {
      const socket = io('https://api-tryout.edutore.com', { 'transports': ['websocket', 'polling'] })
      // const socket = io('http://localhost:3000', { 'transports': ['websocket', 'polling'] })
      socket.on('show_timer', function (data) {
        // eslint-disable-next-line no-console

        if (data) {
          this.realtimeserver = data
        }
      }.bind(this))
    },
    actionReadMore () {
      this.readMoreActivated = true
    },
    actionReadLess () {
      this.readMoreActivated = false
    },
    _actionGetJadwalSesiUjian (id) {
      this.$axios.get('jadwal-sesi-ujian/' + id).then((response) => {
        this.jadwalsesi = response.data.data
        const objs = response.data.data.schedule
        objs.sort((a, b) => (a.position > b.position ? 1 : b.position > a.position ? -1 : 0))
        this.detail = objs
        localStorage.setItem('sesi_ujian_' + id, JSON.stringify(this.jadwalsesi))
      })
    },
    _actionGetByid (id) {
      this.$axios.get('all-ujian/' + id)
        .then((response) => {
          const responseData = response.data
          this.listView = true
          if (response.data.success === 'true') {
            this.ujian = responseData.data
            const countDowntimmer = response.data.countDowntimmer
            const startButtonQuiz = response.data.start_ujian
            const GetCurrentTimeServer = response.data.current_times
            const GetStartTimeQuiz = response.data.start_time
            const expireButton = response.data.expireButton
            this.content = this.ujian.description
            this.title = this.ujian.judul_ujian
            if (startButtonQuiz) {
              this.showButtonStart = startButtonQuiz
            } else if (countDowntimmer) {
              this.showTime = true
              this._actionGetRealtimeCurrenttimeServer()
              this._counterTimes(GetStartTimeQuiz, GetCurrentTimeServer)
            } else if (expireButton) {
              this.expireButton = true
              this.messageButton = 'Ujian Sudah Berakhir'
            }
            /// this.detail = response.data.sesi_ujian // di ganti ke jadwal

            this.content = this.ujian.judul_ujian
            this.title = this.ujian.judul_ujian
          } else {
            this.$swal({
              position: 'center',
              icon: 'error',
              title: response.data.message,
              showConfirmButton: false,
              timer: 2500
            })
          }
        })
        // eslint-disable-next-line no-console
        .catch((err) => { console.log(err) })
    },
    _formatDate (tgl) {
      return moment(tgl).format('DD MMM YYYY')
    },
    _actionStartTest () {
      clearInterval(this.countDowntime)
      let sesiId = null /** ambil sesi pertama  */
      // clearInterval(this.countDowntime)
      if (this.jadwalsesi) {
        localStorage.setItem('sesi_ujian', JSON.stringify(this.jadwalsesi))
        sesiId = this.jadwalsesi.schedule[0].sesi_id
      } else {
        localStorage.setItem('sesi_ujian', JSON.stringify(this.detail))
        sesiId = this.detail[0]._id
      }

      if (this.ujian.type_ujian === 'BERSAMA') {
        if (this.ujian.is_private) {
          this.$router.push({
            path: '/start-ujian/bersama/access-pin/' + this.ujian._id,
            query: { slug: this.ujian.ujian_slug, type: this.ujian.type_ujian, sesi_ujian: sesiId }
          })
        } else {
          this.$router.push({
            path: '/start-ujian/bersama/',
            params: { id: this.ujian._id },
            query: { slug: this.ujian.ujian_slug, type: this.ujian.type_ujian, sesi_ujian: sesiId }
          })
        }
      } else if (this.ujian.type_ujian === 'MANDIRI') {
        if (this.ujian.is_private) {
          this.$router.push({
            path: '/start-ujian/mandiri/access-pin/' + this.ujian._id,
            query: { slug: this.ujian.ujian_slug, type: this.ujian.type_ujian, sesi_ujian: sesiId }
          })
        } else {
          this.$router.push({
            path: '/start-ujian/mandiri/' + this.ujian._id,
            query: { slug: this.ujian.ujian_slug, type: this.ujian.type_ujian, sesi_ujian: sesiId }
          })
        }
      }
    },
    _counterTimes (startQuiz, timesServer) {
      // let GettimesServer = moment(timesServer)
      this.countDowntime = setInterval(() => {
        const startTimes = moment(startQuiz)
        const t = (startTimes) - (moment(this.realtimeserver))

        const days = Math.floor(t / (1000 * 60 * 60 * 24))
        const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((t % (1000 * 60)) / 1000)

        if (hours > 0) {
          document.getElementById('hour').innerHTML = hours + ' Jam :'
        }
        if (minutes > 0) {
          document.getElementById('minute').innerHTML = minutes + ' Menit :'
        }
        if (days > 0) {
          document.getElementById('days').innerHTML = days + ' Hari '
        }
        document.getElementById('second').innerHTML = seconds + ' Detik'
        const self = this

        if (hours < 0 && minutes < 0 && seconds < 0) {
          clearInterval(this.countDowntime)
          self.showTime = false
          self.showButtonStart = true
        }
      }, 1000)
    }
  }
}
</script>
<style scoped>
  .bg {
    padding-top: 5px;
    background: url('../../assets/img/edu-owl.png');
    background-size: 38em;
    background-repeat: repeat-x;
    background-color: white;
    border-color: #557cbf
  }
  .card {
    border-radius:12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  }
  .card-left {
    min-height:376px;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  }
   .img-fluid {
    min-height: 218px;
    width: 100%;
    border-radius: 12px 12px 0 0;
  }
  .card-right {
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
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
  .tabs>ul {
    background-color: 1e9cd7;
    color: white
  }
  p {
    color: black
  }
  .breadcrumb-item.active {
    color: white
  }
  hr {
    border: 0;
    margin-bottom: 1px;
    border-top: 10px solid rgba(0, 0, 0, 0.1);
  }
  .text-rekomendasi {
    font-size: 25px;
    font-family: ElliotSans-Bold;
    color: #1e9cd7
  }
  .title-book {
    font-size: 15px;
    color: #404040;
    font-family: ElliotSans-Medium
  }
  .title-penyelenggara {
    margin-top: 5px;
    font-size: 12px;
    color: #808080;
    font-family: ElliotSans-Medium
  }
  .title-price {
    color: #1e9cd7;
    font-size: 12px;
    font-family: ElliotSans-Medium
  }
  .title-date {
    color: #557cbf;
    font-size: 11px;
    border: 1px solid #557cbf;
    font-family: ElliotSans-Medium;
    padding: 5px;
    border-radius: 8px
  }
  .button-detail {
    background-color: #557cbf;
    width: 97px;
    height: 20px;
    padding-bottom: 20px
  }
  .title-button-detail {
    font-size: 10px;
    color: #fff;
    font-family: ElliotSans-Medium;
  }
  .readmore {
    color:#1e9cb7;
    font-family: ElliotSans-Regular;
    font-size: 13px;
    cursor: pointer;
  }
  .readmore:hover {
    color:#1e9cb7;
  }
  .image-card {
    width: 100%;
    min-height: 297px;
    margin-bottom: 19px;
    border-radius: 12px 12px 0px 0px;
  }
  .title-item {
    color: #3f3f3f;
    font-size: 20px;
    font-family: ElliotSans-Bold;
  }
  .txt-soal {
    color: #1e9cd7;
    font-size: 25px;
    font-family: ElliotSans-Bold;
  }
  .txt-penyelenggara {
    font-size: 17px;
    color: #808080;
    font-family: ElliotSans-Medium;
    margin-top: -20px;
  }
  .txt-date {
    color: #557cbf;
    font-size: 15px;
    border: 1px solid #557cbf;
    font-family: ElliotSans-Medium;
    padding: 5px;
    border-radius: 8px
  }
  .btn-mulai {
    background-color: #557cbf;
    min-width: 126px;
    min-height: 24px;
    border-radius: 12px;
    font-size: 13px;
    color: #fff;
    font-family: ElliotSans-Medium;
    margin-top: 2px
  }
  .txt-syarat {
    color: #808080;
    font-size: 17px;
    font-family: ElliotSans-Bold;
    font-weight: bold;
  }
  .span-syarat {
    color: #808080;
    font-size: 13px;
    font-family: ElliotSans-Regular;
  }
  .div-sesi {
    background-color: #1e8cd7;
    border-radius: 12px 12px 0px 0px;
    padding: 5px;
    height: 40px
  }
  .txt-sesi {
    color: #fff;
    font-size: 20px;
    font-family: ElliotSans-Bold;
    font-weight: bold;
  }
  .txt-sub-sesi {
    color: #808080;
    font-size: 17px;
    font-family: ElliotSans-Medium;
  }
  .txt-sesi-soal {
    color: #1e9cd7;
    font-size: 17px;
    font-family: ElliotSans-Medium;
    margin-left: 5px;
  }
   @media (max-width: 347.98px){
    .text-date{
      display: inline;
    }
  }
  @media (max-width: 403.98px) {
    .txt-sesi-soal {
      margin-top: -10px;
    }
  }
   @media (max-width: 452.98px){
    .text-date{
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
  @media (max-width: 767.98px) {
    .content-page {
      padding-top: 70px !important;
    }
  }
  @media (max-width: 991.98px){
    .text-date{
      display: inline;
    }
  }
  @media (max-width: 1199.98px){
    .text-date{
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
  img[lazy=loading] {
    /*your style here*/
    background-color: rgb(165, 157, 157);
  }
  img[lazy=error] {
    /*your style here*/
    background-color: rgb(144, 105, 105)
  }
</style>
