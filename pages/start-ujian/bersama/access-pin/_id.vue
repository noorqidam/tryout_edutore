<template>
  <div style="font-family:Elliot Sans">
    <div class="col-md-12">
      <b-modal
        v-model="modalShow"
        size="sm"
        centered=""
        hide-footer=""
        hide-header=""
        body-bg-variant="default"
        title="Mengambil Soal"
      >
        <h2 class="h5 text-center">
          Validasi PIN
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

    <div class="col-md-12 p-5" style="min-height:400px;margin-top: 100px">
      <div class="row justify-content-center">
        <div class="col-xs-8 col-sm-8 col-md-7 col-lg-4">
          <h1 class="h3 text-center">
            {{ ujian.judul_ujian }}
          </h1>
          <div class="card" style="border-radius:12px;height:auto;">
            <div class="card-body">
              <div class="container">
                <h2 class="title text-center">
                  Masukan PIN
                </h2>
                <form v-on:submit.prevent="_actionValidatePin" class="mt-3">
                  <div class="form-group">
                    <input
                      v-model="pin"
                      type="password"
                      class="form-control"
                      placeholder="masukkan PIN anda"
                      required
                      autocomplete="false"
                    >
                  </div>
                  <div v-if="!loading" class="form-group" style="margin-top:30px">
                    <button v-if="!modalShow" class="btn btn-block btn-primary">
                      <i class="fa fa-sign-in-alt" /> Masuk
                    </button>
                    <button v-else class="btn btn-block btn-primary" disabled>
                      <i class="fa fa-sign-in-alt" /> Masuk
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Accesspin',
  data () {
    return {
      pin: null,
      token: null,
      modalShow: false,
      SesiId: null,
      ujian_id: null,
      loading: true
    }
  },
  computed: {
    ...mapState({
      ujian: state => state.ujian.ujian,
      showData: state => state.ujian.showData
    })
  },
  mounted () {
    setTimeout(() => {
      if (this.$store.state.auth.islogin) {
        this.token = this.$store.state.auth.token
        const id = this.$route.params._id
        this.ujian_id = id
        this.SesiId = this.$route.query.sesi_ujian
        this.$store.dispatch('ujian/getUjianId', id)
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'Silahkan  Masukan PIN'
        })
        this.loading = false
      } else {
        const redirectTo = this.$route.fullPath
        // console.log(redirectTo)
        this.$router.push({
          path: '/login',
          query: { ujian_id: this.$route.query._id, ujian: this.$route.query.name, ref: redirectTo }
        })
      }
    }, 1000)
  },
  methods: {
    _actionValidatePin () {
      this.modalShow = true
      const data = {
        ujian_id: this.ujian_id,
        pin: this.pin
      }
      const token = this.token ? this.token : localStorage.getItem('token')
      this.$axios.post('verify-pin-ujian', data, { headers: { 'x-access-token': token } })
        .then((response) => {
          if (response.data.success === 'true') {
            this.$router.push({
              path: '/start-ujian/bersama/private',
              params: { _id: this.ujian_id },
              query: { ujian_id: this.ujian_id, sesi_ujian: this.SesiId, _id: this.ujian_id }
            })
          } else {
            this.$swal({
              position: 'center',
              icon: 'error',
              title: response.data.message,
              showConfirmButton: false,
              timer: 2500
            })
          }
          this.modalShow = false
        })
        .catch((err) => {
          alert(err)
          this.modalShow = false
          const getErr = err.response
          this.$notify({
            group: 'foo',
            type: 'error',
            title: getErr.message
          })
        })
    }
  }
}
</script>
