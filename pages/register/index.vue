<template>
  <div class="container mb-4">
    <div class="row">
      <div class="col-md-8 col-12 reg-hide">
        <h1 class="title text-24 text-center mt-4">
          Hai, Edufriends!
        </h1>
        <h2 class="title text-18 text-center">
          Semua bisa pintar bersama Edutore!
        </h2>
      </div>
      <div class="col-md-4 col-12 my-auto">
        <div class="register-container mb-5">
          <h2 class="title text-center font-weight-bold">
            Daftar Menjadi Edufriend
          </h2>
          <h3 class="title text-center">
            {{ event }}
          </h3>
          <ValidationObserver v-slot="{ invalid ,handleSubmit }">
            <b-form @submit.prevent="handleSubmit(onSubmit)">
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
              <ValidationProvider v-slot="{ errors }" name="Referral">
                <b-form-group
                  label="Kode Referral"
                  description="*Boleh Kosong"
                >
                  <b-form-input
                    id="referal_code"
                    v-model="Form.referal_code"
                    :class="{'req-validate': errors.length > 0, 'form-control': true}"
                    type="text"
                    placeholder=""
                  />
                  <span class="merah">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>

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
      </div>
    </div>
  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import { extend } from 'vee-validate'
import { mapState } from 'vuex'
export default {
  name: 'Register',
  layout (context) {
    return 'default'
  },
  components: { VuePhoneNumberInput },
  data () {
    return {
      isLoading: false,
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
  watch: {
    isLogin () {
      this.$router.push({
        path: '/'
      })
    }
  },
  mounted () {
    this.event = this.$route.query.event
    const ReferalCode = this.$route.query.referal_code
    const school = this.$route.query.school
    const kelas = this.$route.query.kelas
    this.Form.sub_kelas = this.$route.query.sub_kelas
    this.Form.referal_code = ReferalCode
    this.Form.school = school
    this.Form.kelas = kelas
    this.Form.event = this.event
    this.link_id = this.$route.query.link_id
    if (this.link_id) {
      this.actionGetValidLink()
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
    const auth = this.$store.state.auth
    // eslint-disable-next-line no-console
    console.log('checking auth ' + JSON.stringify(auth))
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
        school: this.Form.school,
        kelas: this.Form.kelas,
        sub_kelas: this.Form.sub_kelas,
        valid_link: this.valid_link,
        publisher_id: this.Form.event
      }
      this.$axios.post('peserta-register', data)
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
            this.$router.push({ path: '/verify-signup', query: { email: this.Form.email } })
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
    }
  }
}
</script>

<style scoped>
.label {
  margin-top: 20px;
  font-size: 16px;
}
.container {
  background-image: url('../../assets/img/edu-owl.png');
  background-size: 66em;
  margin-top: 100px;
}
@media (max-width: 575.98px) {
  .container {
    background-image: url('../../assets/img/edu-owl.png');
    background-size: 10em;
    margin-top: 50px;
  }
  .register-container {
    background-color: transparent;
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
</style>
