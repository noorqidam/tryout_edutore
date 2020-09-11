<template>
  <div class="container">
    <div v-if="show" class="row">
      <div class="col-md-12">
        <h2 class="title-konten">
          History Quiz Saya
        </h2>
      </div>
      <div v-if="quizHistory.length > 0" class="col-md-12 mb-2">
        <div class="row">
          <div v-for="(myHistoryQuiz, index) in quizHistory" :key="index" class="col-md-3 col-6">
            <div @click="_actionDetailQuiz(myHistoryQuiz.quiz_id, myHistoryQuiz.judul_quiz)" class="card-quiz">
              <div class="text-center p-2 banner-custom">
                <img v-if="myHistoryQuiz.quiz_banner" :src="pathBanner + myHistoryQuiz.quiz_banner" :alt="myHistoryQuiz.quiz_banner" class="img-fluid img-center">
                <img v-else src="~/assets/img/edutore_book.png" alt="'Edutore'" class="img-fluid">
              </div>
              <div class="pl-2 pr-2 pb-1">
                <div class="mt-1 mb-1">
                  <h6 class="title-book">
                    <i class="fa fa-book" style="font-size: 16px;color: #404040" />
                    {{ myHistoryQuiz.judul_quiz }}
                  </h6>
                </div>
                <div class="mt-1 mb-2">
                  <span class="badge badge-pill badge-primary pb-2">
                    <i class="fa fa-clock" style="font-size: 16px;" />
                    {{ myHistoryQuiz.times }}
                  </span>
                </div>
                <div style="align-self-center">
                  <p class="text-center title-date">
                    <i class="fa fa-calendar-alt" />
                    {{ _formatDate(myHistoryQuiz.start_date) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="col-md-12 text-center mb-3">
        <img src="~/assets/img/keranjang-belanja.png" style="width: 20%">
        <h6 class="mt-3">
          Anda belum memikili history quiz. Silahkan mulai quiz untuk melihat history quiz.
        </h6>
      </div>
      <!-- Modal Detail -->
      <b-modal
        v-model="modalDetail"
        size="md"
        centered
        hide-footer
        hide-header
        body-bg-variant="default"
      >
        <div class="row justify-content-center bg-owl">
          <div class="col-md-12 text-center">
            <h3>Hasil Quiz Kamu</h3>
            <img v-if="resultQuiz.score >= 88 && resultQuiz.score <= 100" src="~/assets/img/nilai-a.png" class="img-fluid" style="width: 80px" alt="">
            <img v-else-if="resultQuiz.score >= 74 && resultQuiz.score <= 87" src="~/assets/img/nilai-b.png" class="img-fluid" style="width: 80px" alt="">
            <img v-else-if="resultQuiz.score >= 60 && resultQuiz.score <= 73" src="~/assets/img/nilai-c.png" class="img-fluid" style="width: 80px" alt="">
            <img v-else-if="resultQuiz.score < 60" src="~/assets/img/nilai-d.png" class="img-fluid" style="width: 80px" alt="">
            <table class="table mt-3 bg-table">
              <tbody>
                <tr>
                  <th>Judul Quiz</th>
                  <th>{{ judul_quiz }}</th>
                </tr>
                <tr>
                  <th>Email</th>
                  <th>{{ email }}</th>
                </tr>
                <tr>
                  <th>Total Soal</th>
                  <th>{{ resultQuiz.total_soal }}</th>
                </tr>
                <tr>
                  <th>Total Jawab</th>
                  <th>{{ resultQuiz.total_jawab }}</th>
                </tr>
                <tr>
                  <th>Total Point</th>
                  <th>{{ resultQuiz.total_point }}</th>
                </tr>
                <tr>
                  <th>Skor</th>
                  <th>
                    <span v-if="resultQuiz.score >= 88 && resultQuiz.score <= 100" class="badge badge-success" style="font-size: 14px">
                      {{ resultQuiz.score }}
                    </span>
                    <span v-else-if="resultQuiz.score >= 74 && resultQuiz.score <= 87" class="badge badge-primary" style="font-size: 14px">
                      {{ resultQuiz.score }}
                    </span>
                    <span v-else-if="resultQuiz.score >= 60 && resultQuiz.score <= 73" class="badge text-white" style="font-size: 14px; background-color: orange">
                      {{ resultQuiz.score }}
                    </span>
                    <span v-else-if="resultQuiz.score < 60" class="badge badge-danger" style="font-size: 14px">
                      {{ resultQuiz.score }}
                    </span>
                  </th>
                </tr>
              </tbody>
            </table>
            <button @click="modalDetail = false" class="btn btn-primary">
              Tutup
            </button>
          </div>
        </div>
      </b-modal>
    <!-- End Modal Detail -->
    </div>
    <div v-else>
      <LoaderHistori />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import firebase from '~/services/fireinit'
const LoaderHistori = () => import('~/components/profile/LoaderHistori')
export default {
  name: 'HistoriQuiz',
  components: {
    LoaderHistori
  },
  data () {
    return {
      quizHistory: [],
      show: false,
      User: null,
      pathImage: 'https://storage.googleapis.com/edutore-cdn/public/module/thumb/',
      pathBanner: 'https://storage.googleapis.com/edutore-cdn/tryout/',
      modalDetail: false,
      quiz_id: null,
      judul_quiz: '',
      token: null,
      email: '',
      resultQuiz: []
    }
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.User = user.displayName
        user.getIdToken(true).then((accesstoken) => {
          this.token = accesstoken
          this._actionGetHistoryQuiz(accesstoken)
        })
      }
    })
  },
  mounted () {
  },
  methods: {
    _actionGetHistoryQuiz (token) {
      this.$axios.get('history-quiz', { headers: { 'x-access-token': token } })
        .then((response) => {
          if (response.data.success === 'true') {
            this.quizHistory = response.data.data
            this.show = true
          } else {
            this.show = false
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    _actionGetDetail () {
      this.$axios.get('history-quiz/detail-quiz?quiz_id=' + this.quiz_id, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          if (response.data.success === 'true') {
            const data = response.data.data
            this.email = data.email
            this.resultQuiz = data.result
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    _actionDetailQuiz (id, name) {
      this.modalDetail = true
      this.quiz_id = id
      this.judul_quiz = name
      this._actionGetDetail()
    },
    _formatDate (tgl) {
      return moment(tgl).format('DD MMM YYYY')
    }
  }
}
</script>

<style scoped>
@import "../profile/backgroundImg64.css";
.card-quiz {
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  margin-bottom: 5px;
  margin-top: 5px;
  background-color: #fff;
  cursor: pointer;
  height: 373px;
}
.card-quiz:hover {
  transform: translateY(-5px);
  opacity: 0.8;
  transition: 0.4s all ease;
}
.title-konten {
    padding: 30px 30px 0;
    font-size: 21px;
    color: #1e9cd7;
    font-weight: bold;
}
.default-image {
    width: 100%;
    min-height: 155.5px;
    border-radius: 5px;
}
.title-book {
    font-size: 14px;
    height: 48px;
    font-weight: bold;
    color: #404040;
    text-decoration: none;
}
.title-date {
  color:#557cbf;
  font-size: 11px;
  border: 1px solid #557cbf;
  padding: 5px;
  border-radius:8px
}
.bg-owl {
  background-color: none;
  background-position-y: 850px;
}
.bg-table {
  background-color: rgba(255, 255, 255, 0.7);
  border: 2px solid #1e9cd7;
}
.img-center {
  margin: auto;
}
.banner-custom {
  display: flex;
  height: 338px;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@media (min-width: 319.98px) {
  .card-quiz {
    height: 298px;
  }
  .title-book {
    height: 48px;
  }
  .banner-custom {
    height: 164px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
@media (min-width: 350px) {
  .card-quiz {
    height: 337px;
  }
  .title-book {
    height: 48px;
  }
  .banner-custom {
    height: 205px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
@media (min-width: 399.98px) {
  .card-quiz {
    height: 365px;
  }
  .title-book {
    height: 48px;
  }
  .banner-custom {
    height: 225px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
@media (min-width: 410.98px) {
  .card-quiz {
    height: 365px;
  }
  .title-book {
    height: 38px;
  }
  .banner-custom {
    height: 235px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
@media (min-width: 576px) {
  .card-quiz {
    height: 346px;
  }
  .title-book {
    height: 48px;
  }
  .banner-custom {
    height: 205px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
@media (min-width: 768px) {
  .card-quiz {
    height: 273px;
  }
  .banner-custom {
    height: 150px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
@media (min-width: 992px) {
  .card-quiz {
    height: 430px;
  }
  .title-book {
    height: 30px;
  }
  .banner-custom {
    height: 297px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
@media (min-width: 1200px) {
  .card-quiz {
    height: 458px;
  }
  .banner-custom {
    height: 335px;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
</style>
