/* eslint-disable no-console */
<template>
  <div class="container-fluid">
    <div class="row">
      <b-modal
        v-model="modalShow"
        size="sm"
        centered=""
        hide-footer=""
        hide-header=""
        body-bg-variant="default"
      >
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
    <div class="row">
      <div class="col-md-12">
        <div class="container mt-5 pt-5">
          <h1 class="title text-24 text-center mt-5">
            Hai, Edufriends!
          </h1>
          <h2 class="title text-18 text-center">
            Semua bisa pintar bersama Edutore!
          </h2>
        </div>
      </div>
      <div class="col-md-12 mt-4">
        <div class="row justify-content-center">
          <div class="col-xs-4 col-sm-10 col-md-6 col-lg-4">
            <div class="card" style="border-radius:12px;height:auto;margin-bottom:15px">
              <div class="card-body">
                <div class="container">
                  <h2 class="title text-center">
                    Login
                  </h2>
                  <form v-on:submit.prevent="_actionLogin" class="mt-3">
                    <div class="form-group">
                      <label for="">Email</label>
                      <input
                        id="email"
                        v-model="Form.email"
                        type="text"
                        class="form-control"
                        placeholder=""
                        required
                      >
                    </div>
                    <div class="form-group">
                      <label for="">Password</label>
                      <input
                        id="password"
                        v-model="Form.password"
                        type="password"
                        class="form-control"
                        placeholder=""
                        required
                        autocomplete="false"
                      >
                    </div>
                    <div class="form-group" style="margin-top:30px">
                      <button v-if="btn_active" class="btn btn-block btn-primary">
                        <i class="fa fa-sign-in" /> Masuk
                      </button>
                      <button v-else class="btn btn-block btn-primary" disabled>
                        <i class="fa fa-sign-in" /> Wait
                      </button>
                    </div>
                  </form>
                  <!-- <div class="row justify-content-center">
                    <div class="col-sm-8">
                      <hr style="border-color:black">
                    </div>
                  </div> -->
                  <div class="form-group">
                    <div class="row justify-content-center">
                      <!-- <div class="col-sm-8">
                        <button @click="googleSignIn" class="btn btn-block btn-outline-primary">
                          <img src="~/assets/img/google.png" alt="" style="height:20px;width:auto"> Gmail
                        </button>
                      </div> -->
                      <!-- <div class="col-md-12">
                        <section id="firebaseui-auth-container" />
                      </div> -->
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
</template>

<script>
// import * as firebaseui from 'firebaseui'
import firebase from '~/services/fireinit'
// import 'firebaseui/dist/firebaseui.css'
export default {
  name: 'Login',
  data () {
    return {
      User: {},
      Form: {},
      provider: null,
      btn_active: true,
      modalShow: false,
      title: 'Tryout Edutore | Login'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial scale=1' },
        { hid: 'description', name: 'description', content: 'Test Edutore Ujian SBMPTN UN CPNS PISIKOTES Bersama edutore terdiri dari ribuan soal soal dari publisher terkenal di indonesia Download App Edutore by Gramedia, Belajar Mandiri dengan Online Learning' },
        { hid: 'description', property: 'og:title', content: 'Tes Edutore.com' },
        { name: 'keywords', content: 'Ujian SBMPTN , Ujian Pisikotes Ujian CPNS' },
        { hid: 'property', property: 'og:type', content: 'website' },
        { hid: 'description', property: 'og:type', content: 'video.movie' },
        { hid: 'description', property: 'og:url', content: 'http://www.imdb.com/title/tt0117500/' },
        { hid: 'description', property: 'og:image', content: 'https://cdn.edutore.com/sub-edutore-files/banners/SnEz3W6JKKqIPMDb6MZf-p.jpg' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@Tes Edutore.com' },
        { name: 'twitter:title', content: 'Tes Edutore Twitter Card' },
        { name: 'twitter:description', content: 'Test Ujian SBMPTN UN CPNS PISIKOTES Bersama edutore terdiri dari ribuan soal soal dari publisher terkenal di indonesia Download App Edutore by Gramedia, Belajar Mandiri dengan Online Learning.' },
        { name: 'twitter:image', content: 'https://cdn.edutore.com/sub-edutore-files/banners/SnEz3W6JKKqIPMDb6MZf-p.jpg' },
        { name: 'twitter:image:alt', content: 'https://cdn.edutore.com/sub-edutore-files/banners/SnEz3W6JKKqIPMDb6MZf-p.jpg' }
      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: 'https://tes.edutore.com' }
      ],
      metaInfo: {
        htmlAttrs: {
          lang: 'en',
          amp: true
        },
        bodyAttrs: {
          class: ['dark-mode', 'mobile']
        }
      }
    }
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const quizId = this.$route.query.quiz_id
        const ujianId = this.$route.query.ujian_id
        const QuerySlug = this.$route.query.slug
        const ref = this.$route.query.ref
        if (ref) {
          this.$router.push(ref)
        } else if (quizId) {
          this.$router.push('/quiz?slug=' + QuerySlug + '+&quiz_id=' + quizId)
        } else if (ujianId) {
          this.$router.push('/ujian?slug=' + QuerySlug + '+&id=' + ujianId)
        } else {
          this.$router.push('/')
        }
      } else {
        this.$notify({
          group: 'welcome',
          title: 'Hai, Edufriends Silahkan Login '
        })
        this.$router.push({
          path: '/login',
          query: this.$route.query
        })
        const dataUpdate = {
          setAuth: null,
          setPhoto: null,
          setEmail: null,
          setIslogin: false
        }
        this.$store.commit('auth/updateAuth', dataUpdate)
      }
    })
  },
  mounted () {
    // console.log(this.$route)
    // const ui = new firebaseui.auth.AuthUI.getInstance() //new firebaseui.auth.AuthUI(firebase.auth())
    // const ui = new firebaseui.auth.AuthUI(firebase.auth())
    // if (!ui) {
    //   ui = new firebaseui.auth.AuthUI(firebase.auth())
    // }
    // const uiConfig = {
    //   signInSuccessUrl: '/',
    //   signInOptions: [
    //     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //     firebase.auth.PhoneAuthProvider.PROVIDER_ID
    //   ]
    // }
    // ui.start('#firebaseui-auth-container', uiConfig)
  },
  methods: {
    googleSignIn () {
      this.provider = new firebase.auth.GoogleAuthProvider()
      // this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
      firebase.auth().signInWithPopup(this.provider).then((result) => {
        // store the user ore wathever this.$route.query.id
        const quizId = this.$route.query.quiz_id
        const ujianId = this.$route.query.ujia_id
        const QuerySlug = this.$route.query.slug
        if (quizId) {
          this.$router.push('/quiz?slug=' + QuerySlug + '+&quiz_id=' + quizId)
        } else if (ujianId) {
          this.$router.push('/ujian?slug=' + QuerySlug + '+&id=' + ujianId)
        } else {
          this.$router.push('/')
        }
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e)
      })
    },
    _actionLogin () {
      this.modalShow = true
      this.btn_active = false
      firebase.auth().signInWithEmailAndPassword(this.Form.email, this.Form.password)
        .then((response) => {
          localStorage.setItem('token', response.user.getIdToken)
          this.actionNotifLogin()
          // eslint-disable-next-line no-console
          console.log(response.user.displayName)
          // eslint-disable-next-line no-console
          console.log(response.user.emailVerified)
          // console.log(response.user.getIdToken)
          // console.log(response.user.displayName)
          // console.log(response.additionalUserInfo)
          // this.$store.dispatch('auth/getAuth')

          // this.$store.commit.auth.commit('set')
          const ujianId = this.$route.query.ujian_id
          const QuerySlug = this.$route.query.slug
          const quizId = this.$route.query.quiz_id
          const ref = this.$route.query.ref
          if (ref) {
            this.$router.push(ref)
          } else if (quizId) {
            this.$router.push('/quiz?slug=' + QuerySlug + '+&quiz_id=' + quizId)
          } else if (ujianId) {
            this.$router.push('/ujian?slug=' + QuerySlug + '+&id=' + ujianId)
          } else {
            this.$router.push({
              path: '/',
              query: this.$route.query
            })
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(' Masuk sini false' + error)
          this.modalShow = false
          this.btn_active = true
          const errorCode = error.code
          const errorMessage = error.message
          this.$notify({
            group: 'foo',
            type: 'error',
            title: errorCode,
            message: errorMessage
          })
        })
    },
    actionNotifLogin () {
      const data = {
        email: this.Form.email
      }
      // eslint-disable-next-line no-console
      this.$axios.post('log-login', data).then((response) => { console.log(response) })
    }
  }
}
</script>

<style scoped>
  .bg-google {
    background: url('~assets/img/google.png')
  }
</style>
