<template>
  <div class="bgkompas mb-4" style="background-color: rgba(250,250,250,1);">
    <div v-if="!isLogin" class="container-fluid">
      <div class="row">
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-12 brands">
              <div class="center row">
                <div class="col">
                  <img src="~/assets/img/logo_edutore.png" alt="" class="brands-img">
                </div>
                <div class="col">
                  <img src="~/assets/img/logokompas.png" alt="" class="brands-kompas-img">
                </div>
              </div>
            </div>
            <div class="col-md-4 col-12 my-auto mt-4 pt-4">
              <div class="register-container mb-5">
                <h2 class="title text-center font-weight-bold">
                  Daftar Gratis Sekarang!
                </h2>
                <h3 class="title text-center font-weight-bold">
                  {{ event }}
                </h3>
                <h5 class="text-center sub-title font-smaller">
                  {{ group }}
                </h5>
                <p class="text-left mb-1 pb-2">
                  Untuk mengirimkan hasil ujian, pastikan memasukkan data yang benar.
                </p>
                <ValidationObserver v-slot="{ invalid ,handleSubmit }">
                  <b-form @submit.prevent="handleSubmit(onSubmit)" class="pt-2">
                    <ValidationProvider v-slot="{ errors }" :debounce="500" name="Email" rules="required|email|unique">
                      <b-form-group
                        label="Email"
                      >
                        <b-form-input
                          id="email"
                          v-model="Form.email"
                          :class="{'req-validate': errors.length > 0, 'form-control': true}"
                          type="email"
                          placeholder=""
                        />
                        <span class="merah">{{ errors[0] }}</span>
                      </b-form-group>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="Password" rules="required|min:8">
                      <b-form-group
                        label="Kata Sandi"
                      >
                        <b-form-input
                          id="password"
                          v-model.trim="Form.password"
                          :type="typeFiled"
                          :class="{'req-validate': errors.length > 0, 'form-control': true}"
                          class="border-custom"
                          placeholder=""
                          autocomplete="false"
                        />
                        <i v-if="Form.password.length > 0 && typeFiled =='password'" @click="showPin" class="fa fa-eye field-icon" />
                        <i v-if="Form.password.length > 0 && typeFiled =='text' " @click="showPin" class="fa fa-eye-slash field-icon" />
                        <span class="merah">{{ errors[0] }}</span>
                      </b-form-group>
                      <span v-if="password_meter && score < 60" class="text-warning" />
                      <span v-else-if="password_meter && score <= 79" class="text-info" />
                      <span v-if="password_meter && score > 79" class="text-success" />
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" :debounce="500" rules="required|uniquephone|validphone" name="phone">
                      <b-form-group
                        label="No. HP"
                      >
                        <VuePhoneNumberInput
                          v-model="phone"
                          :only-countries="country"
                          :default-country-code="indonesia"
                          @update="onUpdate"
                          :countries-height="countCountry"
                          required
                        />
                      </b-form-group>
                      <span class="merah">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="Nama" rules="required|min:2">
                      <b-form-group
                        label="Nama"
                      >
                        <b-form-input
                          id="Nama"
                          v-model="Form.username"
                          :class="{'req-validate': errors.length > 0, 'form-control': true}"
                          type="text"
                          placeholder=""
                        />
                        <span class="merah">{{ errors[0] }}</span>
                      </b-form-group>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="gender" rules="required">
                      <b-form-group label="Jenis Kelamin">
                        <b-form-radio-group
                          id="radio-group-1"
                          v-model="Form.gender"
                          :options="genders"
                          name="radio-options"
                        />
                      </b-form-group>
                      <span class="merah">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <div class="btn btn-outline-danger btn-block mb-1">
                      Pastikan data yang dimasukan sudah benar
                    </div>
                    <div v-if="!isLoading" class="form-group">
                      <button :disabled="invalid" type="submit" class="btn btn-primary btn-block">
                        <i v-if="invalid" class="fa fa-ban" /> DAFTAR
                      </button>
                    </div>
                    <div v-else class="text-center mb-3 d-flex justify-content-center">
                      <b-spinner label="Loading..." />
                    </div>
                  </b-form>
                </ValidationObserver>
              </div>
              <!-- <div class="row justify-content-center">
                <div class="col-sm-8">
                  <button @click="googleSignIn" class="btn btn-block btn-outline-primary">
                    <img src="~/assets/img/google.png" alt="" style="height:20px;width:auto"> Gmail
                  </button>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <b-modal
          v-model="loadingLogin"
          size="sm"
          centered=""
          hide-footer=""
          hide-header=""
          body-bg-variant="default"
          title="Megirim Jawaban"
        >
          <h2 class="h5 text-center">
            Memproses Pengambilan Sesi
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
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import { extend } from 'vee-validate'
import { mapState } from 'vuex'
import firebase from '~/services/fireinit'
export default {
  name: 'Register',
  layout (context) {
    return 'default'
  },
  components: { VuePhoneNumberInput },
  data () {
    return {
      isLoading: false,
      loadingLogin: false,
      togglePass: false,
      Form: {
        email: '',
        password: '',
        phone: '',
        username: '',
        address: '',
        referal_code: '',
        school: null,
        kelas: null
      },
      phone: '',
      typeFiled: 'password',
      all: null,
      showInput: true,
      err_label: '#f50a19',
      event: null,
      loader: true,
      country: ['ID'],
      indonesia: 'ID',
      countCountry: 1,
      results: {},
      link_id: null,
      valid_link: false,
      password_meter: null,
      score: 0,
      genders: [
        { text: 'Laki-Laki', value: 'Laki-Laki' },
        { text: 'Perempuan', value: 'Perempuan' }
      ],
      group: '',
      ujian_id: '5f09128ee4c93d3b7fea4e80',
      sesi_id: '5f09564f7b90bb57c6996ca3',
      title: 'Register Tes Edutore.com'
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
        { hid: 'canonical', rel: 'canonical', href: 'https://tryout.edutore.net' }
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
  computed: {
    resultsTable () {
      return Object.keys(this.results)
    },
    ...mapState({
      isLogin: state => state.auth.islogin
    })
  },
  mounted () {
    this.event = this.$route.query.event
    this.group = this.$route.query.group
    const ReferalCode = this.$route.params.id
    this.Form.referal_code = ReferalCode

    // eslint-disable-next-line no-console
    console.log(this.Form.referal_code)
    const User = this.$store.state.auth.user

    if (User) {
      this.$route.push({
        path: '/'
      })
    }

    extend('unique', {
      validate: this.isEmailUnique,
      message: 'Email Sudah terdaftar'
    })
    extend('uniquephone', {
      validate: this.isPhoneUnique,
      message: 'Nomor Hp Sudah terdaftar'
    })
    extend('validphone', { validate: this.validphone, message: 'Format Nomor Hp Tidak Benar' })
  },
  methods: {
    actionGetValidLink () {
      const data = {
        id: this.link_id
      }

      this.$axios.post('referal-validate', data).then((response) => {
        this.valid_link = true
      })
        .catch(() => {
          this.valid_link = false
        })
    },
    async isEmailUnique () {
      try {
        const data = {
          email: this.Form.email
        }
        await this.$axios.post('check-peserta', data)
        return false
      } catch (err) {
        if (err.response.status === 404) {
          return true
        }
      }
    },
    async isPhoneUnique () {
      try {
        const data = {
          phone: this.results.formattedNumber
        }
        await this.$axios.post('check-phone', data)
        return false
      } catch (err) {
        if (err.response.status === 404) {
          return true
        }

        return true
      }
    },
    validphone () {
      const CheckResult = this.results
      if (CheckResult.isValid) {
        return true
      } else {
        return false
      }
    },
    onUpdate (payload) {
      this.results = payload
    },
    showPin () {
      this.typeFiled = this.typeFiled === 'password' ? 'text' : 'password'
    },
    scorePassword (pass) {
      let score = 0
      if (!pass) { return score }

      // award every unique letter until 5 repetitions
      const letters = {}
      for (let i = 0; i < pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1
        score += 5.0 / letters[pass[i]]
      }

      // bonus points for mixing it up
      const variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass)
      }

      let variationCount = 0
      for (const check in variations) {
        variationCount += (variations[check] === true) ? 1 : 0
      }
      score += (variationCount - 1) * 10

      return parseInt(score)
    },
    onSubmit () {
      this.submit()
    },
    submit () {
      this.isLoading = true
      const formatPhone = this.results.formattedNumber
      const data = {
        email: this.Form.email,
        password: this.Form.password,
        phone: formatPhone,
        username: this.Form.username,
        referal_code: this.Form.referal_code,
        gender: this.Form.gender,
        school: this.Form.school,
        kelas: this.Form.kelas,
        valid_link: this.valid_link
      }
      this.$axios.post('peserta-register-auto', data)
        .then((response) => {
          this.isLoading = false
          sessionStorage.setItem('email', this.Form.email)
          sessionStorage.setItem('user_id', response.data.data.user_id)
          if (response.data.success === 'true') {
            // eslint-disable-next-line no-console
            console.log(response.data)
            this.$notify({
              group: 'foo',
              type: 'success',
              text: 'Berhasil Daftar' + this.Form.email
            })

            this._actionLogin()
            // this.$router.push({ path: '/verify-signup', query: { email: this.Form.email } })
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
          if (err.response) {
            this.$notify({
              group: 'foo',
              type: 'error',
              text: JSON.stringify(err.response.data.message)
            })
          }
          this.isLoading = false
        })
    },
    googleSignIn () {
      this.provider = new firebase.auth.GoogleAuthProvider()
      // this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
      firebase.auth().signInWithPopup(this.provider).then((result) => {
        // store the user ore wathever this.$route.query.id
        this.$router.push({ path: '/valid/' + result.email })
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e)
      })
    },
    _actionLogin () {
      this.loadingLogin = true
      this.btn_active = false
      firebase.auth().signInWithEmailAndPassword(this.Form.email, this.Form.password)
        .then((response) => {
          this.$router.push({ path: '/start-ujian/mandiri/' + this.ujian_id, query: { sesi_ujian: this.sesi_id } })
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(' Masuk sini false' + error)
          this.loadingLogin = false
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
    }
  }
}
</script>

<style scoped>
.label {
  margin-top: 20px;
  font-size: 16px;
}
.bgkompas {
  margin-top: 59px;
  background-image: url('../../assets/img/BG-page-register-1.png');
  background-size:100%;
}
@media (max-width: 575.98px) {
  .bgkompas {
    margin-top: 59px;
    background-image: url('../../assets/img/BG-page-register-1.png');
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .register-container {
    background-color: transparent;
  }
  .brands {
    margin-top:0 !important;
    padding-top: 2em;
    padding-bottom: 0.6em;
  }
  .center {
    height: 50px !important;
    margin-top: 0 !important;
    padding-bottom: 15px !important;
    clear: both;
  }
  .myauto {
    top: 50px !important
  }
}
.field-icon {
  margin-right: 10px;
  float: right;
  margin-left: -25px;
  margin-top: -25px;
  position: relative;
  z-index: 1;
}
.center {
  height: 500px;
  margin-top: 240px;
  margin-bottom: auto;
  width: 100%;
  padding: 10px;
  float: left;
}
.brands-kompas-img {
  float: left;
  width: 100%;
  height: auto;
  overflow: visible;
  padding-top: 20px;
}
.brands-img {
  float: left;
  width:78%;
  height: auto;
  overflow: visible;
  margin-right: 20px;
}
.btn-outline-danger {
  border-color:#FF0000 !important;
  font-size: 14px;
  background-color: #FFE4E1;
}
.btn-outline-danger:hover {
  border-color:#FF0000 !important;
  font-size: 14px;
  background-color: #FFE4E1;
}
.sub-title {
  color: #557cbf;
  font-size: 16px;
}
</style>
