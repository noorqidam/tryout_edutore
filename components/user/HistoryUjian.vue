<template>
  <div>
    <div v-if="show" class="col card-table">
      <div class="row">
        <h2 class="title-konten">
          History Quiz Saya
        </h2>
      </div>
      <div class="row row-book">
        <div v-for="item in historyUjian" :key="item.id" class="col-6 col-lg-4 col-sm-4">
          <div class="card">
            <div class="card-body">
              <div class="text-center">
                <img v-if="item.history_quiz_banner" v-lazy.container="pathBanner + item.history_quiz_banner" :alt="item.history_quiz_banner" class="img-fluid">
                <img v-else v-lazy.container="pathBanner + 'edutore.jpg'" alt="'Edutore'" class="img-fluid">
              </div>
              <p class="card-title title-book mt-3">
                {{ item }}
              </p>
              <!-- <div class="row detail-nilai">
                <div class="col-8 col-sm-6 col-md-8">
                  <span class="card-text title-penyelenggara">
                    Total Soal
                  </span>
                </div>
                <div class="col-4 col-sm-6 col-md-4 score-quiz">
                  <span class="badge badge-pill badge-primary"> {{ item.result.total_soal }} </span>
                </div>
              </div>
              <div class="row detail-nilai">
                <div class="col-8 col-sm-6 col-md-8">
                  <span class="card-text title-penyelenggara">
                    Total Jawab
                  </span>
                </div>
                <div class="col-4 col-sm-3 col-md-4 score-quiz">
                  <span class="badge badge-pill badge-primary"> {{ item.result.total_jawab }} </span>
                </div>
              </div>
              <div class="row detail-nilai">
                <div class="col-8 col-sm-6 col-md-8">
                  <span class="card-text title-penyelenggara">
                    Total Point
                  </span>
                </div>
                <div class="col-4 col-sm-6 col-md-4 score-quiz">
                  <span class="badge badge-pill badge-primary"> {{ item.result.total_point }} </span>
                </div>
              </div>
              <div class="row detail-nilai">
                <div class="col-8 col-sm-6 col-md-8">
                  <span class="card-text title-penyelenggara">
                    Score
                  </span>
                </div>
                <div class="col-4 col-sm-6 col-md-4 score-quiz">
                  <span class="badge badge-pill badge-success"> {{ item.result.score }} </span>
                </div>
              </div>
              <div style="align-self-center" class="mt-4">
                <p class="text-center title-date">
                  <font-awesome-icon icon="calendar-alt" />
                  {{ _formatDate(item.start_date) }}
                  <span class="text-date">( {{ item.times }}-{{ item.end_times }})</span>
                </p>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card-table p-2">
      <LoaderHistori2 />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import firebase from '~/services/fireinit'
const LoaderHistori2 = () => import('~/components/user/LoaderHistoryQuiz')
export default {
  components: {
    LoaderHistori2
  },
  data () {
    return {
      historyUjian: [],
      details: '',
      show: false,
      User: null,
      pathBanner: 'https://storage.gooleapis.com/edutore-cdn/tryout/'
    }
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.User = user.displayName
        user.getIdToken(true).then((accesstoken) => {
          this._actionGetHistoryQuiz(accesstoken)
        })
      }
    })
  },
  methods: {
    async _actionGetHistoryQuiz (token) {
      await this.$axios.get('history-ujian', { headers: { 'x-access-token': token } }).then((response) => {
        const dataHistoryQuiz = response.data.data
        if (response.data.success === 'true') {
          this.historyUjian = dataHistoryQuiz
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(this.historyUjian))
          this.show = true
        } else {
          this.show = false
        }
      })
    },
    _formatDate (tgl) {
      return moment(tgl).format('DD MMM YYYY')
    }
  }
}
</script>

<style scoped>
.badge {
  min-width: 30px;
}
.card-table {
    min-height: 410px;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
    margin-bottom: 24px;
    padding-bottom: 10px;
}
.title-konten {
    padding: 30px 30px 0 20px;
    font-size: 25px;
    font-weight: bold;
    color: #1e9cd7;
    font-family: ElliotSans-Regular;
}
.card{
  min-height:376px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  margin-bottom: 24px;
}
.img-fluid {
  max-height: 218px;
  border-radius: 12px;
  min-height: 218px;
}
.title-book {
  font-size: 13px;
  color:#404040;
  font-family:ElliotSans-Medium;
  min-height: 40px;
}
.title-penyelenggara {
  font-size:12px;
  color:#808080;
  font-family:ElliotSans-Medium;
  min-height: 0 !important;
}
.score-quiz {
  font-size:15px;
  color:#808080;
  font-family:ElliotSans-Medium;
}
.title-date {
  color:#557cbf;
  font-size: 11px;
  border: 1px solid #557cbf;
  font-family: ElliotSans-Medium;
  padding: 5px;
  border-radius:8px
}
@media (max-width: 320.98px) {
  .card-body {
    padding: 10px;
  }
}
@media (max-width: 360.98px) {
  .score-quiz {
    margin-left: -10px;
  }
}
@media (max-width: 464.98px) {
  .text-date {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .title-book {
    min-height: 55px !important;
  }
  .title-penyelenggara {
    min-height: 40px !important;
  }
}
@media (max-width: 575.98px) {
  .title-date {
    padding: 3px;
    margin-top: -10px;
  }
  .title-book {
    min-height: 35px;
  }
  .title-penyelenggara {
    margin-top: -10px;
    min-height: 40px;
  }
  .detail-nilai {
    margin-bottom: 10px;
  }
  .score-quiz {
    margin-left: -20px;
  }
}
@media (max-width: 767.98px) {
  .card{
    min-height: 100%;
    margin-bottom: 5px;
  }
  .img-fluid {
    /* max-height: 100px; */
    min-height: 100px;
  }
  .title-date {
    padding: 3px;
  }
}
@media (min-width: 768px) {
  .card{
    min-height: 100%;
    margin-bottom: 5px;
  }
  .img-fluid {
    /* max-height: 100px; */
    min-height: 100px;
  }
  .title-penyelenggara {
    min-height: 35px;
  }
  .title-book {
    min-height: 55px;
  }
  .detail-nilai {
    margin-bottom: 10px;
  }
  .score-quiz {
    margin-left: -10px;
  }
}
@media (max-width: 1199.98px) {
  .title-date {
    min-height: 40px;
  }
 }
img[lazy=loading] {
  /*your style here*/
  background-color: rgb(194, 194, 194);
}
img[lazy=error] {
  /*your style here*/
  background-color: rgb(144, 105, 105)
}
</style>
