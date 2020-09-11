<template>
  <div>
    <div class="container-fluid pb-1 pb-4" style="font-family:Elliot Sans;background-color:white;">
      <div class="container">
        <div v-if="showData" class="row" style="padding-top:100px;">
          <div class="col-md-5 mt-3">
            <div class="card card-left">
              <div class="card-body" style="padding: 2rem">
                <div class="text-center">
                  <img v-if="quiz.quiz_banner" v-lazy.container="pathBanner + quiz.quiz_banner" :alt="quiz.quiz_banner" class="img-fluid">
                  <img v-else v-lazy.container="pathBanner + 'edutore.jpg'" alt="'Edutore'" class="img-fluid">
                </div>
                <p class="card-title title-item">
                  {{ quiz.judul_quiz }}
                </p>
                <p class="card-text txt-soal">
                  {{ count_soals }} Soal
                </p>
                <div v-if="quiz.is_private">
                  <!-- <font-awesome-icon icon="lock" /> -->
                  <i class="fa fa-lock" />
                  <span class="badge badge-pill badge-primary"> Quiz </span>
                </div>
                <div v-else>
                  <!-- <font-awesome-icon icon="users" /> -->
                  <i class="fa fa-users" />
                  <span class="badge badge-pill badge-primary"> Quiz </span>
                </div>
                <br>
                <p class="card-text txt-penyelenggara">
                  <i class="fa fa-home" /> {{ quiz.penyelenggara }}
                </p>
                <div>
                  <p v-if="quiz.start_date === quiz.end_date" class="text-center txt-date">
                    <i class="fa fa-calendar-o" />
                    {{ _formatDate(quiz.start_date) }}
                    <span class="text-date">({{ quiz.times }} - {{ quiz.end_times }})</span>
                  </p>
                  <p v-else class="text-center txt-date">
                    <i class="fa fa-calendar-o" />
                    {{ _formatDate(quiz.start_date) }} - {{ _formatDate(quiz.end_date) }}
                    <span class="text-date">({{ quiz.times }} - {{ quiz.end_times }})</span>
                  </p>
                </div>
                <div class="text-center" style="margin-bottom:16px">
                  <button v-if="start_quiz" @click="_actionStartTest(quiz)" class="btn btn-mulai mb-4">
                    <i class="fa fa-play-circle-o" /> Mulai Test
                  </button>
                  <button v-else-if="expireButton" class="btn btn-mulai bg-danger" disabled>
                    {{ messageButton }}
                  </button>
                  <div v-if="countDowntimmer">
                    <div class="text-center">
                      <span id="days" class="days" style="font-size:30px" />
                      <span id="hour" class="hours" style="font-size:30px" />
                      <span id="minute" class="hours" style="font-size:30px" />
                      <span id="second" class="seconds" style="font-size:30px" />
                    </div>
                  </div>
                  <p class="text-left txt-syarat mt-3">
                    Syarat &amp; Ketentuan
                  </p>
                  <div style="text-align: justify; text-justify: inter-word; margin-top: -15px">
                    <div v-if="quiz.description !== undefined">
                      <div v-if="quiz.description.length>150">
                        <span v-if="!readMoreActivated" class="span-syarat">{{ quiz.description ? quiz.description.slice(0, 150) : null }}...</span>
                        <a v-if="!readMoreActivated" @click="actionReadMore" class="readmore">Baca Selengkapnya</a>
                        <span v-if="readMoreActivated" v-html="quiz.description" class="span-syarat" />
                        <a v-if="readMoreActivated" @click="actionReadLess" class="readmore">Baca Lebih Sedikit</a>
                      </div>
                      <div v-else>
                        {{ quiz.description }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid bg pt-3" style="min-height:400px;padding-bottom:10px;">
      <div class="container">
        <br>
        <Quizz />
      </div>
    </div>
    <div class="container-fluid border-top" style="min-height:400px;padding-top:20px;background-color:smoke">
      <div class="container pb-3 pt-1">
        <books />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import io from 'socket.io-client'
moment.locale('id')
const Quizz = () => import('~/components/Quiz/QuizCampaign')
const books = () => import('~/components/campaign/Books')
export default {
  name: 'Quiz',
  components: {
    Quizz, books
  },
  data () {
    return {
      items: [],
      detail: [],
      totalSoal: 0,
      pathBanner: 'https://storage.googleapis.com/edutore-cdn/tryout/',
      content: null,
      title: null,
      message: '',
      countDowntime: null,
      quiz_id: null,
      readMoreActivated: false,
      start: false,
      countDowntimmer: false,
      start_quiz: false,
      current_times: false,
      start_time: false,
      expireButton: false,
      count_soals: false,
      messageButton: 'Quiz Sudah Berakhir',
      textLong: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a quam lacinia enim tempor iaculis ut vel diam. Nunc congue suscipit iaculis. Sed lorem nunc, gravida sit amet dignissim nec, ultrices a enim. Phasellus id velit et nibh convallis interdum. Proin suscipit sem at lorem vulputate porta. Duis lobortis libero vitae ante venenatis, a rutrum justo hendrerit. Suspendisse vel ante luctus, tincidunt leo vitae, sagittis elit. Sed vel turpis eros. Nam vestibulum justo nec orci ultrices laoreet. Quisque in turpis non orci egestas dignissim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec et bibendum justo. Vestibulum et purus sapien.',
      realtimeserver: null
    }
  },
  head () {
    return {
      title: this.quiz.judul_quiz,
      meta: [
        { hid: 'description', name: 'description', content: this.content },
        { hid: 'og-description', property: 'og:description', content: this.content },
        { hid: 'og-author', property: 'og:author', content: 'Edutore Gramedia' },
        { hid: 'og-title', property: 'og:title', content: this.content },
        { hid: 'og-site_name', property: 'og:site_name', content: this.content }
      ]
    }
  },
  computed: {
    ...mapState({
      quiz: state => state.quiz.quiz.data,
      showData: state => state.quiz.showData
    })
  },
  created () {
    const id = this.$route.params.id
    this.quiz_id = id

    this.$store.dispatch('quiz/getQuizId', id).then((rows) => {
      this.countDowntimmer = rows.countDowntimmer
      this.start_quiz = rows.start_quiz
      this.current_times = rows.current_times
      this.start_time = rows.start_time
      this.expireButton = rows.expireButton
      this.count_soals = rows.count_soals
      if (this.countDowntimmer) {
        this._actionGetRealtimeCurrenttimeServer()
        const GetCurrentTimeServer = this.current_times
        const GetStartTimeQuiz = this.start_time
        // eslint-disable-next-line no-console
        console.log('last countdown timer ' + this.countDowntime)
        clearInterval(this.countDowntime)
        // eslint-disable-next-line no-console
        console.log(GetCurrentTimeServer + '- ' + GetStartTimeQuiz)
        this._counterTimes(GetStartTimeQuiz, GetCurrentTimeServer)
      }
      if (this.expireButton) {
        this.messageButton = 'Quiz Sudah Berakhir'
      }
    })

    this._actionGetRecomendasiQuiz()
  },
  methods: {
    _actionGetRealtimeCurrenttimeServer () {
      const socket = io('https://api-tryout.edutore.com', { 'transports': ['websocket', 'polling'] })
      // const socket = io('http://localhost:3000')
      socket.on('show_timer', function (data) {
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
    _actionGetRecomendasiQuiz () {
      this.$axios.get('reference-quiz?id=' + this.quiz_id, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          const responseData = response.data
          if (response.data.success === 'true') {
            this.items = responseData.data
          }
        })
        // eslint-disable-next-line no-console
        .catch((err) => { console.log(err) })
    },
    _formatDate (tgl) {
      return moment(tgl).format('DD MMM YYYY')
    },
    _actionStartTest (quiz) {
      clearInterval(this.countDowntime)
      // validate
      if (quiz.type_start === 'REALTIMESOAL') {
        if (quiz.is_private) {
          this.$router.push({
            path: '/start-quiz/access-pin/' + this.quiz._id,
            query: { type: this.quiz.type_quiz, quiz_id: this.quiz._id, name: this.quiz.slug_quiz, type_start: this.quiz.type_start }
          })
        } else {
          this.$router.push({
            path: '/start-quiz/realtime-soal/' + this.quiz._id,
            query: { type: this.quiz.type_quiz, quiz_id: this.quiz._id, name: this.quiz.slug_quiz, type_start: this.quiz.type_start }
          })
        }
      } else if (quiz.is_private) {
        this.$router.push({
          path: '/start-quiz/access-pin/' + this.quiz._id,
          query: { type: this.quiz.type_quiz, quiz_id: this.quiz._id, name: this.quiz.slug_quiz, type_start: this.quiz.type_start }
        })
      } else {
        this.$router.push({
          path: '/start-quiz/' + this.quiz._id,
          query: { type: this.quiz.type_quiz, quiz_id: this.quiz._id, name: this.quiz.slug_quiz, type_start: this.quiz.type_start }
        })
      }
    },
    _counterTimes (startQuiz, timesServer) {
      clearInterval(this.countDowntime)
      // const GettimesServer = moment(this.realtimeserver)
      this.countDowntime = setInterval(() => {
        const startTimes = moment(startQuiz)
        const t = (startTimes) - (moment(this.realtimeserver))
        // eslint-disable-next-line no-console
        console.log(startTimes + '- >' + this.realtimeserver)
        // GettimesServer += 1000
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
          self.countDowntimmer = false
          self.start_quiz = true
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
    font-size: 13px;
    color: #404040;
    font-family: ElliotSans-Medium
  }
  .title-penyelenggara {
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
    border-radius:12px 12px 0px 0px;
  }
  .title-item {
    color: #3f3f3f;
    font-size: 20px;
    font-family: ElliotSans-Bold;
    margin-top: 19px;
  }
  .txt-soal {
    color: #1e9cd7;
    font-size: 25px;
    font-family: ElliotSans-Bold;
    margin-top: -15px
  }
  .txt-penyelenggara {
    font-size: 17px;
    color: #808080;
    font-family: ElliotSans-Medium;
    margin-top: -15px
  }
  .txt-date {
    color: #557cbf;
    font-size: 15px;
    border: 1px solid #557cbf;
    font-family: ElliotSans-Medium;
    padding: 5px;
    border-radius: 8px;
    margin-top: -15px;
  }
  .btn-mulai {
    background-color: #557cbf;
    min-width: 126px;
    min-height: 24px;
    border-radius: 12px;
    font-size: 13px;
    color: #fff;
    font-family: ElliotSans-Medium;
  }
  .txt-syarat {
    color: #808080;
    font-size: 17px;
    font-family: ElliotSans-Bold;
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
  }
  @media (max-width: 768px) {
    .text-date {
      display: flex;
      flex-direction: column;
    }
  }
  @media (max-width: 334.98px) {
    .text-date {
      display: flex;
      flex-direction: column;
    }
  }
  @media (max-width: 991.98px) {
    .card-left {
      min-height: 150px;
      border-radius: 12px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
    }
   .img-fluid {
      min-height: 150px;
      width: 100%;
    }
    .txt-date {
      font-size: 15px;
      padding: 2px;
    }
  }
  img[lazy=loading] {
    /*your style here*/
    background-color: rgb(204, 204, 204);
  }
  img[lazy=error] {
    /*your style here*/
    background-color: rgb(144, 105, 105)
  }
</style>
