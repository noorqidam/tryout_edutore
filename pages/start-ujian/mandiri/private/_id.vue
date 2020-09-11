<template>
  <div>
    <notifications group="foo" />
    <nav class="navbar navbar-expand-sm navbar-light bg-blues is-desktop fixed-top">
      <div class="container align-items-end">
        <a class="navbar-brand" href="/"><img src="~/assets/img/edutore.png" class="img-fluid" alt="~/assets/img/edutore.png"></a>
        <b-navbar-toggle target="nav-collapse" />
      </div>
    </nav>
    <div v-if="!loadingSoal">
      <div v-if="UserHasRegistered" class="container-fluid">
        <div class="row flex-xl-nowrap2">
          <div class="bd-sidebar border-bottom-0 col-md-3 col-xl-2 col-12">
            <nav id="bd-docs-nav" aria-label="Main navigation" class="bd-links d-none d-md-block">
              <div class="mt-0">
                <div style="width:70%;height:auto;margin-left:auto;margin-right:auto">
                  <b-img :src="photo" thumbnail fluid alt="Image 1" />
                </div>
              </div>
              <div target="_self">
                <a href="/" class="bd-toc-link" target="_self">{{ User }}</a>
                <ul v-for="(n , no) in soals" :key="n._id" class="flex-container justify-content-center">
                  <li v-bind:id="n._id" class="flex-item">
                    {{ ++no }}
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div class="bd-content col-md-9 col-xl-8 col-12 pb-md-3 pl-md-5">
            <div class="clearfix d-block" />
            <main class="bd-main pt-2">
              <section v-for="(soal ,i ) in soals" :key="soal._id">
                <transition
                  enter-active-class="animated fadeInUp"
                >
                  <div v-if="current_soal === soal._id">
                    <p v-html="soal.soal_text" style="color:black" />
                    <b-img v-if="soal.soal_image" :src="pathImagesQ + soal.soal_image" thumbnail fluid />
                    <template>
                      <ol class="mt-1" type="A">
                        <li v-for="j in soal.jawabans" :key="j._id">
                          <b-button
                            v-if="currentAnswer === j._id"
                            @click="_actionAnswer(j.soal_id,j._id,i)"
                            class="active"
                            block
                            variant="outline-secondary"
                            style="margin-bottom:2px"
                          >
                            <p v-html="j.jawaban_text" style="color:black;text-align:left" />
                          </b-button>
                          <b-button
                            v-else
                            @click="_actionAnswer(j.soal_id,j._id,i)"
                            block
                            variant="outline-secondary"
                            style="margin-bottom:2px"
                          >
                            <p v-html="j.jawaban_text" style="color:black;text-align:left" />
                          </b-button>
                        </li>
                      </ol>
                    </template>
                  </div>
                </transition>
              </section>
            </main>
            <div class="row justify-content-center">
              <div class="col-sm-2">
                <b-button @click="_actionEndUjian" variant="primary" pill="" block>
                  <font-awesome-icon icon="flag" /> Akhiri
                </b-button>
              </div>
            </div>
          </div>
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
import axios from '~/plugins/axios'
import firebase from '~/services/fireinit'
Vue.use(Notifications)
export default {
  name: 'StartUjian',
  data () {
    return {
      User: null,
      photo: null,
      loadingSoal: true,
      answer: [],
      jawabans: [],
      soals: [],
      number_nav: [],
      currentAnswer: null,
      current_soal: null,
      sesiUjian: [],
      ujianId: null,
      pathImages: 'https://storage.googleapis.com/edutore-cdn/public/module/thumb/',
      pathImagesQ: 'https://storage.googleapis.com/edutore-cdn/public/soal/question/',
      pathImagesAnswer: 'https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/',
      token: null,
      UserHasRegistered: false,
      count_sesi_ujian: 0,
      current_sesi: 0,
      sesi_id: null,
      title: 'Edutore Tryout ',
      content: ''
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
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.User = user.displayName
        this.photo = user.photoURL
        user.getIdToken(true).then((accesstoken) => {
          this.token = accesstoken
        })
        const id = this.$route.query._id
        const SesiId = this.$route.query.sesi_ujian
        this.ujianId = id
        this.sesi_id = SesiId
        setTimeout(() => {
          this._actionGetQuestion(id, SesiId)
        }, 1000)
      } else {
        this.$router.push({
          path: '/login',
          query: { ujian_id: this.$route.query._id, slug: this.$route.query.slug }
        })
      }
    })
  },
  methods: {
    _actionGetQuestion (id, SesiId) {
      const data = {
        ujian_id: id,
        sesi_id: SesiId
      }
      axios.post('soal-ujian-in-sesi-private', data, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log('Response Soal in Ujian ' + JSON.stringify(response.data.data))
          this.loadingSoal = false
          this.UserHasRegistered = true
          const GetSesi = response.data.data
          this.title += '| ' + GetSesi.sesi_ujian
          this.soals = response.data.data.soals
          this.sesiUjian.push(GetSesi)
          this.current_soal = this.soals[0]._id
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          const error = err.response.data
          // this.loadingSoal = false
          this.$notify({
            group: 'foo',
            type: 'warn',
            title: error.message,
            text: error.data.code ? error.data : null
          })
        })
    },
    _nextSesiUjian (int, id) {
      axios.get('peserta-soal-ujian/ujian/' + id, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          this.UserHasRegistered = true
          this.soals = response.data.data[int].soals
          this.sesiUjian = {
            _id: response.data.data[int]._id,
            name: response.data.data[int].sesi_ujian,
            duration: response.data.data[int].duration
          }
          this.current_soal = this.soals[int]._id
          // eslint-disable-next-line no-console
          console.log(this.soals[int])
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          const error = err.response.data
          this.$notify({
            group: 'foo',
            type: 'warn',
            title: error.message,
            text: error.data.code ? error.data : null
          })
        })
    },
    _actionShowAnswer () { // action realtime answer
      setInterval(() => {
        const t = this.makeid(5)
        this.asnswer.push({
          name: t
        })
        const objDiv = document.getElementById('realAns')
        objDiv.scrollTop = objDiv.scrollHeight
      }, 500)
    },
    _actionAnswer (soalId, jawabanId, next) {
      // eslint-disable-next-line no-console
      console.log(this.soals.length)
      const IndexSoal = this.soals.length
      const maxIndexSoal = parseInt(IndexSoal) - 1
      if (next === maxIndexSoal) {
        next = 0
      } else {
        next += 1
      }
      // const newAns = [{ soal_id: soalId, jawaban_id: jawabanId }]
      this._actionStoreAnswer(soalId, jawabanId, next)
    },
    _actionStoreAnswer (soalId, jawaban, next) {
      const data = {
        soal_id: soalId,
        jawaban_id: jawaban
      }

      axios.post('jawab-soal-ujian/sesi-ujian/' + this.current_sesi, data, { headers: { 'x-access-token': this.token } }).then((response) => {
        if (response.data.success === 'true') {
          document.getElementById(soalId).className += ' item_active'
          const nextSoal = this.soals[next]._id
          this._moveNumber(nextSoal)
        }
      })
    },
    _moveNumber (no) {
      this._actionChechExsistAnswer(no)
      this.current_soal = no
    },
    _actionChechExsistAnswer (soalId) {
      axios.get('check-jawaban-in-sesi-ujian?sesi_id=' + this.current_sesi + '&soal_id=' + soalId, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          const jawaban = response.data.data.jawaban
          this.currentAnswer = jawaban._id
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
          this.currentAnswer = null
        })
    },
    _actionEndUjian () {
      this.$router.push({
        path: '/start-ujian/nilai',
        query: { ujian_id: this.ujianId }
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
  .sessi-active {
    color: rgb(58, 160, 58)
  }

</style>
