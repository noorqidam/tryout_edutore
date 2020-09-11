<template>
  <div style="padding-top: 75px; padding-bottom: 50px" class="bg-custom">
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <div class="card-content">
            <div class="col-md-12 mb-1" style="text-align: -webkit-center;">
              <div class="col-md-10">
                <img
                  v-if="ujian.ujian_banner"
                  v-lazy.container="pathImage + ujian.ujian_banner"
                  class="img-fluid"
                  alt=""
                  style="border-radius: 10px"
                >
                <img v-else src="~/assets/img/edutore_book.png" alt="'Edutore'" class="img-fluid">
                <hr style="border-top: 2px solid rgb(168, 171, 181);">
                <div class="pl-2 pr-2 pb-1">
                  <div class="mt-1 mb-1">
                    <h6 class="title-book">
                      <font-awesome-icon icon="book" style="font-size: 16px;color: #404040" />
                      {{ ujian.judul_ujian }}
                    </h6>
                  </div>
                  <div class="mt-1 mb-2">
                    <span class="badge badge-pill badge-primary pb-2">
                      <font-awesome-icon icon="clock" class="pt-1" style="font-size: 16px;" />
                      {{ ujian.times }}
                    </span>
                  </div>
                  <div style="align-self-center">
                    <p class="text-center title-date">
                      <font-awesome-icon icon="calendar-alt" />
                      {{ _formatDate(ujian.start_date) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-7" style="overflow: auto;max-height: 650px">
          <b-list-group v-for="(sesi, index ) in sesi_ujian" :key="index" class="mb-1">
            <div class="card card-sesi mb-3">
              <div class="card-header text-center div-sesi">
                <p class="txt-sesi">
                  Sesi {{ ++index }}
                </p>
              </div>
              <div class="card-body">
                <p class="text-center">
                  <span class="txt-sub-sesi">
                    {{ sesi.sesi[0].sesi_ujian }}
                  </span>
                  <br>
                  <span class="txt-sesi-soal">
                    {{ ujian.times }}
                  </span>
                </p>
                <div class="col-md-6 offset-md-3 text-center">
                  <p class="text-center title-date">
                    <font-awesome-icon icon="calendar-alt" />
                    {{ _formatDate(ujian.start_date) }}
                  </p>
                  <button
                    @click="_actionResultUjian(sesi._id.ujian_id, sesi._id.sesi_id, sesi.sesi[0].sesi_ujian)"
                    class="btn btn-primary text-center btn-sm"
                  >
                    Lihat Nilai
                  </button>
                </div>
              </div>
            </div>
          </b-list-group>
        </div>
      </div>
      <!-- Modal Result -->
      <b-modal
        v-model="modalResult"
        size="md"
        centered
        hide-header
        hide-footer
        body-bg-variant="default"
      >
        <div v-if="resultUjian !== 'belum mengikuti sesi'" class="row justify-content-center bg-owl">
          <div class="col-md-12 text-center">
            <h3>Hasil Ujian Kamu</h3>
            <img v-if="resultUjian.score >= 88 && resultUjian.score <= 100" src="~/assets/img/nilai-a.png" class="img-fluid" style="width: 80px" alt="">
            <img v-else-if="resultUjian.score >= 74 && resultUjian.score <= 87" src="~/assets/img/nilai-b.png" class="img-fluid" style="width: 80px" alt="">
            <img v-else-if="resultUjian.score >= 60 && resultUjian.score <= 73" src="~/assets/img/nilai-c.png" class="img-fluid" style="width: 80px" alt="">
            <img v-else-if="resultUjian.score < 60" src="~/assets/img/nilai-d.png" class="img-fluid" style="width: 80px" alt="">
            <table class="table mt-3 bg-table">
              <tbody>
                <tr>
                  <th>Judul Sesi</th>
                  <th>{{ judul_sesi }}</th>
                </tr>
                <tr>
                  <th>Email</th>
                  <th>{{ email }}</th>
                </tr>
                <tr>
                  <th>Total Soal</th>
                  <th>{{ resultUjian.total_soal }}</th>
                </tr>
                <tr>
                  <th>Total Jawab</th>
                  <th>{{ resultUjian.total_jawab }}</th>
                </tr>
                <tr>
                  <th>Total Point</th>
                  <th>{{ resultUjian.total_point }}</th>
                </tr>
                <tr>
                  <th>Skor</th>
                  <th>
                    <span v-if="resultUjian.score >= 88 && resultUjian.score <= 100" class="badge badge-success" style="font-size: 14px">
                      {{ resultUjian.score }}
                    </span>
                    <span v-else-if="resultUjian.score >= 74 && resultUjian.score <= 87" class="badge badge-primary" style="font-size: 14px">
                      {{ resultUjian.score }}
                    </span>
                    <span v-else-if="resultUjian.score >= 60 && resultUjian.score <= 73" class="badge text-white" style="font-size: 14px; background-color: orange">
                      {{ resultUjian.score }}
                    </span>
                    <span v-else-if="resultUjian.score < 60" class="badge badge-danger" style="font-size: 14px">
                      {{ resultUjian.score }}
                    </span>
                  </th>
                </tr>
              </tbody>
            </table>
            <button @click="modalResult = false" class="btn btn-primary">
              Tutup
            </button>
          </div>
        </div>
        <div v-else>
          <div class="col-md-12 text-center">
            <img src="~/assets/img/success-buy.png" class="img-fluid" style="width: 250px" alt="">
            <h3>Kamu Tidak Mengikuti Sesi Ini</h3>
          </div>
        </div>
      </b-modal>
    <!-- End Modal Result -->
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import firebase from '~/services/fireinit'
export default {
  name: 'DetailHistoriSesiujian',
  data: () => ({
    name: '',
    ujian_id: null,
    token: null,
    sesi_ujian: [],
    ujian: [],
    judul_sesi: '',
    email: '',
    resultUjian: [],
    modalResult: false,
    pathImage: 'https://storage.googleapis.com/edutore-cdn/tryout/'
  }),
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.User = user.displayName
        user.getIdToken(true).then((accesstoken) => {
          this.token = accesstoken
          this.ujian_id = this.$route.params.id
          this._actionGetSesiUjian()
        })
      }
    })
  },
  mounted () {
  },
  methods: {
    _actionGetSesiUjian () {
      this.$axios.get('history-ujian/sesi-ujian?ujian_id=' + this.ujian_id, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          if (response.data.success === 'true') {
            const data = response.data.data
            this.sesi_ujian = data
            this.ujian = data[0].ujian[0]
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    _actionResultUjian (ujian, sesi, nameSesi) {
      this.modalResult = true
      this.$axios.get(
        'history-ujian/detail-sesi-ujian?ujian_id=' + ujian + '&sesi_id=' + sesi, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          if (response.data.success === 'true') {
            const data = response.data.data
            this.email = data.email
            this.resultUjian = data.result
            this.judul_sesi = nameSesi
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    _formatDate (tgl) {
      return moment(tgl).format('DD MMM YYYY')
    }
  }
}
</script>

<style scoped>
@import "../../../../components/profile/backgroundImg64.css";
.card-sesi {
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  background-color: #fff;
}
.card-content {
  padding: 20px;
  padding-bottom: 20px;
  box-shadow: 0 0 26px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #fff;
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
}
.txt-sesi-soal {
  color: #557cbf;
  font-size: 17px;
  margin-left: 5px;
}
.title-date {
  color:#557cbf;
  font-size: 11px;
  border: 1px solid #557cbf;
  padding: 5px;
  border-radius:8px
}
.title-book {
  font-size: 14px;
  font-weight: bold;
  color: #404040;
  text-decoration: none;
}
.bg-custom {
  background-image: var(--emc);
}
.bg-owl {
    background-image: var(--owl);
    background-position-x: -425px;
    background-position-y: 70px;
}
.bg-table {
  background-color: rgba(255, 255, 255, 0.7);
  border: 2px solid #1e9cd7;
}
</style>
