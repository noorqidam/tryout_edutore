<template>
  <div class="bg-game">
    <div class="bg-tests text-center pt-2 pb-2">
      <img src="~/assets/img/edutest-ico.png" class="img-fluid" alt width="100">
    </div>
    <div class="container-fluid mt-4">
      <div class="row">
        <div v-if="timer" class="col-2 text-blue text-18">
          <i class="ico ico-timer" /> 01:30:00 {{ photo }}
        </div>
        <div v-else class="col-1 text-blue text-18" />

        <div class="col">
          <b-progress :max="CountSoal" show-progress animate variant="primary">
            <b-progress-bar :value="progresCorrect" variant="success" />
            <b-progress-bar :value="progresInCorrect" variant="danger" />
          </b-progress>
          <label class="text-center"> jumlah Soal {{ CountSoal }} / dijawab {{ progressAnswer }} </label>
          <div class="soal-contain" style="height:550px;overflow-y:scroll;padding-top:10px">
            <div v-for="(soal ,next) in Soals" :key="soal.soals._id">
              <div v-if="soal.soals._id === current_soal">
                <span class="badge badge-info"> Soal Ke {{ IndexSoal +1 }}</span>
                <label for="" class="right">
                  <span v-if="checkStatusSoal(soal.soals._id)" class="badge badge-success">DiJawab </span>
                  <span v-else class="badge badge-warning"> Belum Dijawab </span>
                </label>
                <p v-html="soal.soals.soal_text" />
                <div class="row justify-content-center">
                  <img
                    v-if="soal.soals.soal_image"
                    :src="pathImagesQ + soal.soals.soal_image"
                    alt
                    srcset
                  >
                  <audio v-if="soal.soals.suara" controls>
                    <source :src="pathImagesQ +soal.soals.suara " type="audio/ogg">
                    <source :src="pathImagesQ + soal.soals.suara" type="audio/mpeg">Your browser does not support the audio element.
                  </audio>
                </div>
                <div v-for="(jawaban,i) in soal.soals.jawabans" :key="jawaban._id">
                  <div v-if="jawaban.jawaban_text" @click="actionPilih(soal.soals, jawaban,next)" class="answer">
                    <span class="lst-ans">
                      {{ PG(i) }}
                      <span
                        v-for="showAnswerData in showAnswerDatas"
                        :key="showAnswerData.soal_id"
                      >
                        <i v-if="showAnswerData.soal_id == soal.soals._id && showAnswerData.jawaban_id == jawaban._id">
                          <span v-if="jawaban.benar" class="ico benar" />
                          <span v-else class="ico salah" />
                        </i>
                      </span>
                    </span>

                    <label v-html="jawaban.jawaban_text" />
                  </div>
                  <div
                    v-else-if="jawaban.jawaban_image"
                    @click="actionPilih(soal.soals, jawaban,next)"
                    class="answer"
                  >
                    <span class="lst-ans">
                      {{ PG(i) }}
                      <span
                        v-for="showAnswerData in showAnswerDatas"
                        :key="showAnswerData.soal_id"
                      >
                        <i v-if="showAnswerData.soal_id == soal._id">
                          <span v-if="jawaban.benar" class="ico benar" />
                          <span v-else class="ico salah" />
                        </i>
                      </span>
                    </span>
                    <img
                      v-if="jawaban.jawaban_image"
                      :src="pathImagesAnswer + jawaban.jawaban_image"
                      alt
                      class="img-fluid text-center"
                      style="cursor:pointer;margin-left:5px;"
                    >
                  </div>
                  <div
                    v-else-if="jawaban.suara"
                    @click="actionPilih(soal.soals, jawaban,next)"
                    class="answer"
                  >
                    <span class="lst-ans">
                      {{ current_soal }}
                      <span
                        v-for="showAnswerData in showAnswerDatas"
                        :key="showAnswerData.soal_id"
                      >
                        <i v-if="showAnswerData.soal_id == soal._id">
                          <span v-if="jawaban.benar" class="ico benar" />
                          <span v-else class="ico salah" />
                        </i>
                      </span>
                    </span>
                    {{ jawaban.suara }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a v-if="IndexSoal < CountSoal -1" @click="ButtonNextSoal" href="javascript:void(0)">
            <div class="ico quiz-next" />
          </a>
          <a v-if="IndexSoal > 0" @click="ButtonPrevSoal" href="javascript:void(0)">
            <div class="ico quiz-prev" />
          </a>
        </div>
        <div class="col-1 text-blue text-right text-18">
          <div class="position-bottom">
            <button
              @click="actionAkhiriTest"
              type="button"
              class="btn btn-sm btn-info"
            >
              <i class="fa fa-stop" /> Stop
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="text-right" />
    <div class="user-prop">
      <img :src="photo" class="img-fluid" alt>
    </div>
    <div class="row">
      <!-- Modal Benar -->
      <b-modal
        v-model="benar"
        size="sm"
        centered
        hide-footer
        hide-header
        body-bg-variant="default"
      >
        <div class="modal-content modal-benar">
          <div class="modal-body">
            <div class="bernas mb-3">
              <img src="~/assets/img/yes-benar.png" class="img-fluid" width="217px;" alt>
            </div>
            <!-- <a
              v-if="Soals.length > 0 && Soals[0].pembahasan.is_show"
              @click="showPembahasan"
              href="#"
              class="btn btn-primary"
            >Pembahasan</a> -->
          </div>
        </div>
      </b-modal>
      <!-- Modal salah -->
      <b-modal
        v-model="salah"
        size="sm"
        centered
        hide-footer
        hide-header
        body-bg-variant="default"
      >
        <div class="modal-content modal-salah">
          <div class="modal-body">
            <div class="bernas mb-3">
              <img src="~/assets/img/salah-jangan.png" class="img-fluid" width="217px;" alt>
            </div>
            <!-- <a
              v-if="Soals.length > 0 && Soals[0].pembahasan.is_show"
              @click="showPembahasan"
              href="#"
              class="btn btn-primary"
            >Pembahasan</a> -->
          </div>
        </div>
      </b-modal>

      <!-- Modal pembahasan -->
      <b-modal
        v-model="pembahasan"
        size="sm"
        centered
        hide-footer
        hide-header
        body-bg-variant="default"
      >
        <div class="modal-content">
          <div class="modal-body">
            <a @click="hidePembahasan" href="#" class="btn btn-primary">
              <i class="fas fa-chevron-left" /> Kembali ke Soal
            </a>
            <hr>
            <label v-if="Soals.length > 0" for>
              <!-- <p v-if="Soals.length > 0" v-html="Soals[0].pembahasan.isi" />
              <img
                v-if="Soals[0].pembahasan.gambar"
                :src="pathPembahasan + Soals[0].pembahasan.gambar"
                class="img-fluid"
              > -->
            </label>
          </div>
        </div>
      </b-modal>
    </div>
    <div class="row">
      <b-modal
        v-model="loading"
        size="sm"
        centered
        hide-footer
        hide-header
        body-bg-variant="default"
      >
        <div class="row justify-content-center">
          <div class="d-flex justify-content-center">
            <img
              src="~/assets/img/edu-wink.gif"
              class="img-fluid"
              alt="~/assets/img/edu-wink.gif"
              style="width: 100px"
            >
          </div>
        </div>
        <p class="text-center mt-2">
          Loading...
        </p>
      </b-modal>
    </div>
    <div style="display:none">
      <audio id="benar" controls>
        <!-- <source src="~/assets/mp4/Suara_benar.ogg" type="audio/ogg"> -->
        <source src="~/assets/mp4/Suara_benar.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      <audio id="salah" controls>
        <!-- <source src="~/assets/mp4/Suara_salah.ogg" type="audio/ogg"> -->
        <source src="~/assets/mp4/Suara_salah.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import { mapState } from 'vuex'
// import firebase from '~/services/fireinit'
Vue.use(VueSweetalert2)
export default {
  name: 'Test',
  layout (context) {
    return 'defaults'
  },
  data () {
    return {
      loading: false,
      benar: false,
      salah: false,
      pembahasan: false,
      Soals: [],
      timer: false,
      current_soal: null,
      Assesment: [],
      ModuleID: 0,
      PaketSoalID: 0,
      ModalBenar: false,
      ModalSalah: false,
      showAnswerDatas: [{
        soal_id: null,
        jawaban_id: null,
        status: false
      }],
      totalSoal: 0,
      message: '',
      mulai: false,
      CountSoal: 0,
      progressAnswer: 0,
      progresCorrect: 0,
      progresInCorrect: 0,
      IndexSoal: 0,
      module_slug: null,
      pathImagesQ: 'https://storage.googleapis.com/edutore-cdn/public/soal/question/',
      pathImagesAnswer: 'https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/',
      pathPembahasan: 'https://storage.googleapis.com/edutore-cdn/public/soal/discussion/'
    }
  },
  computed: {
    ...mapState({
      // isLogin: state => state.auth.islogin,
      user: state => state.auth.user,
      // token: state => state.auth.token,
      photo: state => state.auth.photo
    })
  },
  mounted () {
    const PaketSoalID = this.$route.params.id
    this.PaketSoalID = PaketSoalID
    this.$store.dispatch('auth/getAuth')
    this.actionGetHistoryTest(PaketSoalID)
    this.module_slug = this.$route.query.module_slug
    const ModulesId = this.$route.params.module
    // eslint-disable-next-line no-console
    console.log(this.$route.params)
    this.ModuleID = ModulesId
    this.PaketSoalID = PaketSoalID
    this.actionGetSoal(ModulesId, PaketSoalID)
  },
  methods: {
    actionGetHistoryTest (PaketSoalID) {
      const history = localStorage.getItem('test_' + PaketSoalID)
      if (history) {
        this.showAnswerDatas = JSON.parse(history)
        this.progressAnswer = this.showAnswerDatas.length
        this.progresCorrect = this.showAnswerDatas.reduce((counter, { status }) => status === true ? counter + 1 : counter, 0)
        this.progresInCorrect = this.showAnswerDatas.reduce((counter, { status }) => status === false ? counter + 1 : counter, 0)
      }
    },
    actionGetSoal (ModulesId, paketid) {
      this.$axios.get('/my-module-soal/' + ModulesId + '/paket-soal/' + paketid, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          if (response.data.success === 'true') {
            this.current_soal = response.data.rows[0].soals._id
            this.loading = false
            this.Soals = response.data.rows
            this.totalSoal = response.data.count
            this.CountSoal = response.data.count
            this.IndexSoal = 0
          } else {
            this.$swal({
              type: 'error',
              title: response,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            })
          }
        })
        .catch((err) => {
          this.message = err.response.data.message
          this.actionshowAlert()
        })
    },
    actionPilih (soal, jawaban, next) {
      next++

      if (this.showAnswerDatas.length > 0) {
        const historyAnswered = this.showAnswerDatas.find((e) => {
          return e.soal_id === soal._id
        })

        if (!historyAnswered) {
          this.storedtoLocalStorage(soal._id, jawaban._id, jawaban.benar)
          if (jawaban.benar) {
            this.benar = true
            this.progresCorrect++
            this.progressAnswer++
            this.showAnswerDatas.push({
              soal_id: soal._id,
              jawaban_id: jawaban._id,
              status: true
            })
            document.getElementById('benar').play()
            setTimeout(() => {
              this.benar = false
              this.NextSoal(next)
            }, 1500)
          } else {
            this.salah = true
            this.progresInCorrect++
            this.progressAnswer++
            this.showAnswerDatas.push({
              soal_id: soal._id,
              jawaban_id: jawaban._id,
              status: false
            })
            document.getElementById('salah').play()
            setTimeout(() => {
              this.salah = false
              this.NextSoal(next)
            }, 1500)
          }
        }
      } else {
        this.progressAnswer++

        this.storedtoLocalStorage(soal._id, jawaban._id, jawaban.benar)
        if (jawaban.benar) {
          this.benar = true
          this.progresCorrect += 1
          this.showAnswerDatas.push({
            soal_id: soal._id,
            jawaban_id: jawaban._id,
            status: true
          })
          document.getElementById('benar').play()
          setTimeout(() => {
            this.benar = false
            this.NextSoal(next)
          }, 1500)
        } else {
          this.salah = true
          this.progresInCorrect += 1
          this.showAnswerDatas.push({
            soal_id: soal._id,
            jawaban_id: jawaban._id,
            status: false
          })
          document.getElementById('salah').play()
          setTimeout(() => {
            this.salah = false
            this.NextSoal(next)
          }, 1500)
        }
      }
    },
    showPembahasan () {
      this.pembahasan = true
    },
    hidePembahasan () {
      this.pembahasan = false
    },
    NextSoal (id) {
      const IndexSoal = this.CountSoal
      const maxIndexSoal = parseInt(IndexSoal) - 1
      const setSoal = this.Soals
      if (id === maxIndexSoal) {
        this.current_soal = setSoal[0].soals._id
      } else {
        this.current_soal = setSoal[id].soals._id
        this.IndexSoal = id
      }
    },
    ButtonNextSoal () {
      const setSoal = this.Soals
      const maxIndexSoal = parseInt(this.CountSoal) - 1
      if (this.IndexSoal === maxIndexSoal) {
        this.current_soal = setSoal[0]._id
      } else {
        const next = this.IndexSoal += 1
        this.IndexSoal = next
        this.current_soal = setSoal[next].soals._id
      }
    },
    ButtonPrevSoal () {
      const setSoal = this.Soals
      const maxIndexSoal = parseInt(this.CountSoal) - 1
      if (this.IndexSoal === maxIndexSoal) {
        this.IndexSoal -= 1
        this.current_soal = setSoal[this.IndexSoal].soals._id
      } else {
        this.IndexSoal -= 1
        this.current_soal = setSoal[this.IndexSoal].soals._id
      }
    },
    PG (data) {
      switch (data) {
        case 0:
          return 'A'
        case 1:
          return 'B'
        case 2:
          return 'C'
        case 3:
          return 'D'
        case 4:
          return 'E'
        default:
          break
      }
    },
    actionshowAlert () {
      this.$swal({
        type: 'error',
        title: this.message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })
    },
    actionAkhiriTest () {
      this.$swal({
        title: 'Apakah Anda Yakin?',
        text: 'Akhiri Test ini',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Akhiri Test',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.value) {
          this.$router.push({
            path: '/my-modules/' + this.module_slug
          })
        }
      })
    },
    checkStatusSoal (id) {
      const info = this.showAnswerDatas.find((e) => {
        return e.soal_id === id
      })

      return info
    },
    storedtoLocalStorage (soal, jawaban, statusAnswer) {
      const DataLocal = localStorage.getItem('test_' + this.PaketSoalID)
      const GetDataLocal = JSON.parse(DataLocal)
      if (GetDataLocal) {
        /// push
        const FindDuplicated = GetDataLocal.find((e) => {
          return e.soal_id === soal
        })

        if (!FindDuplicated) {
          GetDataLocal.push({
            soal_id: soal,
            jawaban_id: jawaban,
            status: statusAnswer
          })

          localStorage.setItem('test_' + this.PaketSoalID, JSON.stringify(GetDataLocal))
        }
      } else {
        const data = [
          {
            soal_id: soal,
            jawaban_id: jawaban,
            status: statusAnswer
          }
        ]
        // create new Localstorage
        localStorage.setItem('test_' + this.PaketSoalID, JSON.stringify(data))
      }
    }
  }
}
</script>
<style>
p {
  color: black;
}
.soal-contain {
  position: relative;
  background: #fff;
  border-radius: 10px;
  box-shadow: -1px 2px 22px -1px rgba(0,0,0,.2);
  padding: 30px 20px;
  font-size: 17px;
}
.bg-game {
  background: url("../../../../assets/img/bg-game.png") left no-repeat;
  background-size: 100%;
}
.answer {
  cursor: pointer;
}
.position-bottom {
  position: absolute;
  bottom: 10px;
}
.right {
  position: absolute;
  right: 10px;
}
</style>
