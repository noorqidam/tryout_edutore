<template>
  <div>
    <header role="navigation" class="navbar bd-navbar flex-column flex-md-row navbar-dark navbar-expand">
      <a href="/" class="navbar-brand mr-0 mr-md-2" aria-label="BootstrapVue" target="_self" />
      <div class="navbar-nav-scroll" style="padding-left:40px;padding-right:40px">
        <ul is-nav="" class="navbar-nav bd-navbar-nav flex-row">
          <li class="nav-item">
            <a class="nav-link" target="_self" href="/"><img src="~/assets/img/edutore.png" class="brand" alt="~/assets/img/edutore.png"></a>
          </li>
        </ul>
      </div>
      <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex" />
    </header>
    <div v-if="!loadingSoal">
      <div v-if="UserHasRegistered" class="container-fluid">
        <div class="row flex-xl-nowrap2">
          <div class="bd-sidebar border-bottom-0 col-md-3 col-xl-2 col-12">
            <nav id="bd-docs-nav" aria-label="Main navigation" class="bd-links d-none d-md-block">
              <div class="mt-0">
                <div style="width:70%;height:auto;margin-left:auto;margin-right:auto">
                  <!-- <b-img thumbnail fluid src="https://i.pravatar.cc/?img=1" alt="Image 1" /> -->
                  <b-img :src="photo" thumbnail fluid alt="Image 1" />
                </div>
              </div>
              <div target="_self">
                <a href="/" class="bd-toc-link" target="_self">{{ User }}</a>
              </div>

              <div v-for="sesi in sesiUjian" :key="sesi._id" class="bd-toc-item vtl">
                <div class="ewrap">
                  <div style="margin-top:auto">
                    <strong class="date"> <font-awesome-icon icon="stopwatch" /> {{ sesi.duration }}</strong>
                    <p v-if="sesi._id === current_sesi" class="text sessi-active">
                      {{ sesi.name }}
                    </p>
                    <p v-else class="text">
                      {{ sesi.name }}
                    </p>
                    <ul v-for="(n , no) in soals" :key="n._id" class="flex-container justify-content-center">
                      <li v-bind:id="n._id" @click="_moveNumber(n._id)" class="flex-item">
                        {{ ++no }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            <!-- <div class="bd-toc-item nuxt-link-exact-active active" target="_self"> -->
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
      <div class="row justify-content-center">
        <div class="col-md-3">
          <div class="text-center">
            <b-spinner label="Spinning" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UnauthorizedUjian from '../../components/unauthorized/UnauthorizedUjian'
import axios from '~/plugins/axios'
import firebase from '~/services/fireinit'
export default {
  name: 'StartUjian',
  components: { UnauthorizedUjian },
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
      current_sesi: 0
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
        this.ujianId = id
        setTimeout(() => {
          this._actionGetQuestion(id)
        }, 1000)
      } else {
        this.$router.push({
          path: '/login',
          query: { ujian_id: this.$route.query._id, slug: this.$route.query.slug }
        })
      }
    })
  },
  mounted () {
    history.pushState(null, null, location.href)
    window.onpopstate = () => {
      history.go(1)
    }
  },
  methods: {
    _actionGetQuestion (id) {
      axios.get('peserta-soal-ujian/ujian/' + id, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          this.loadingSoal = false
          this.UserHasRegistered = true
          const GetSesi = response.data.data
          this.count_sesi_ujian = response.data.data.length
          this.soals = response.data.data[0].soals
          this.current_sesi = response.data.data[0]._id
          for (let index = 0; index < GetSesi.length; index++) {
            this.sesiUjian.push({
              _id: response.data.data[index]._id,
              name: response.data.data[index].sesi_ujian,
              duration: response.data.data[index].duration
            })
          }
          this.current_soal = this.soals[0]._id
          // eslint-disable-next-line no-console
          console.log('Response Soal in Ujian ' + JSON.stringify(response.data.data))
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          // const error = err.response.data
          this.loadingSoal = false
          // this.$notify({
          //   group: 'foo',
          //   type: 'warn',
          //   title: error.message,
          //   text: error.data.code ? error.data : null
          // })
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
