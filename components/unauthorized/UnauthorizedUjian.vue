<template>
  <div class="row">
    <div class="container-fluid">
      <div class="col-md-12 mt-3">
        <div class="card border-0">
          <div class="card-body border-0">
            <h4 class="h4 text-center">
              Anda Belum Terdaftar Dalam Ujian Ini
            </h4>
            <router-link :to="{ path :'/'}" class="btn btn-block btn-outline-primary">
              Kembali
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Notifications from 'vue-notification'
Vue.use(Notifications)
export default {
  name: 'StartUjian',
  data () {
    return {
      asnswer: [
        { name: 'Rohmat As`ari' }
      ],
      answer: [],
      jawabans: [],
      soals: [],
      number_nav: [],
      currentAnswer: null,
      current_soal: null,
      sesiUjian: {
        _id: null,
        name: null,
        duration: null
      },
      ujianId: null,
      pathImages: 'https://storage.googleapis.com/edutore-cdn/public/module/thumb/',
      pathImagesQ: 'https://storage.googleapis.com/edutore-cdn/public/soal/question/',
      pathImagesAnswer: 'https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/',
      token: null
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
