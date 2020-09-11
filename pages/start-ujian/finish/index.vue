<template>
  <div class="container">
    <div class="row mt-5 pt-5">
      <div class="col-md-12">
        <!-- HEADER -->
        <div class="row justify-content-center">
          <div class="text-center col-md-12">
            <h3 class="font-weight-bold" style="font-size: 20px; color: #595959">
              Terimakasih
              <span> {{ user }} </span>
              Telah Melaksanakan Ujian
            </h3>
            <h5 style="font-size: 17px; color: #808080">
              Hasil ujian telah dikirimkan ke email
            </h5>
          </div>
          <br>
          <div class="text-center col-md-12">
            <h4 class="text-center" style="color:#1e9cd7; font-size: 19px">
              <!-- {{ judul_ujian }} -->
              {{ email }}
            </h4>
          </div>
        </div>
        <!-- END HEADER -->
        <hr style="border-bottom: 1px solid #303030">
        <!-- CONTENT LANGGANAN -->
        <div id="content" class="row">
          <div class="col-md-12 mt-2 mb-3">
            <h2 class="text-center font-weight-bold" style="color: #557cbf; font-size: 28px">
              Tunggu tes CPNS mendatang?
              <br>
              Gunakan kesempatan untuk persiapkan diri lebih matang!
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <swiper :options="swiperOption">
                <swiper-slide v-for="item in langganans" :key="item.id" class="col-md-4 px-4">
                  <div :class="[item.id == 21 ? 'active' : '']" class="col-md-12 card-custom mb-2">
                    <h3 class="mt-4 mb-4 text-center font-weight-bold" style="font-size: 20px; color: #557cbf">
                      {{ item.package_name }}
                    </h3>
                    <!-- <label id="langganan" v-html="item.descriptions" class="col-md-12" /> -->
                    <div v-html="item.descriptions" />
                    <div id="" class="col-md-12 text-center">
                      <span style="font-size: 16px; color: #808080"><del>Rp {{ _formatPrice(item.basic_price ) }}</del></span>
                      <br>
                      <span class="font-weight-bold" style="font-size: 24px; color: #1e9cd7">Rp {{ _formatPrice(item.sale_price ) }}</span>
                      <br>
                      <button @click="_actionBeliLangganan(item._id)" class="col-md-8 btn btn-custom mt-1 mb-4">
                        <span class="font-weight-bold" style="font-size: 16px; color: #557cbf">Beli Sekarang</span>
                      </button>
                    </div>
                  </div>
                </swiper-slide>
                <div slot="pagination" class="swiper-pagination" />
              </swiper>
            </div>
          </div>
        </div>
        <!-- END CONTENT LANGGANAN -->
        <!-- CONTENT IMAGE -->
        <div class="row">
          <div class="col-md-12 text-center">
            <img src="~/assets/img/Modul-CPNS-adjust-3.png" alt="Gambar Modul CPNS" class="img-fluid">
          </div>
          <div class="col-md-12 text-center mb-5">
            <router-link :to="{ path : '/'}">
              <span style="font-size: 16px; color: #557cbf">Kembali ke Halaman Utama</span>
            </router-link>
          </div>
        </div>
        <!-- END CONTENT IMAGE -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Finishujian',
  data () {
    return {
      judul_ujian: {},
      ujian_id: null,
      sesi_id: null,
      langganans: [],
      swiperOption: {
        slidesPerView: 3,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1024: {
            slidesPerView: 3
          },
          768: {
            slidesPerView: 3
          },
          640: {
            slidesPerView: 1
          },
          320: {
            slidesPerView: 1
          }
        }
      }
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.auth.islogin,
      photo: state => state.auth.photo,
      email: state => state.auth.email,
      token: state => state.auth.token
    })
  },
  mounted () {
    this.ujian_id = this.$route.query.ujian_id
    this.sesi_id = this.$route.query.sesi_id
    this.judul_ujian = this.$route.query.judul_ujian
    setTimeout(() => {
      this.actionStopUjian()
    }, 1500)
    this.actionGetLangganan()
  },
  methods: {
    actionGetLangganan () {
      this.$axios.get('package-subscription?title=CPNS')
        .then((response) => {
          this.langganans = response.data.data.rows
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    actionStopUjian () {
      const data = {
        ujian_id: this.ujian_id,
        sesi_id: this.sesi_id
      }

      this.$axios.post('stop-ujian', data, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response.data)
        })
        .catch((err) => {
          this.loadingstopujian = false
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    _formatPrice (value) {
      const val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    _actionBeliLangganan (id) {
      const data = {
        package_subscription: id,
        payment_method: 'MIDTRANS'
      }
      this.loading = true
      this.$axios.post('https://api.edutore.com/api/v1/order-subscriptions', data, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          this.loading = false
          const midtrans = response.data.midtrans
          window.location.href = midtrans.redirect_url
        })
        .catch((err) => {
          this.loading = false
          const infoerr = err.response
          // eslint-disable-next-line no-console
          console.log(err)
          this.$notify({
            group: 'foo',
            type: 'warn',
            text: infoerr ? infoerr.message : infoerr
          })
        })
      // window.location.href = 'https://app.sandbox.midtrans.com/snap/v2/vtweb/f6d9635c-52c4-40e9-93fd-2241fa3d28b7'
    }

  }
}
</script>
<style scoped>
.card-custom {
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 5px solid rgba(0, 0, 0, 0.125);
  min-height: 430px !important;
}
.card-custom:hover {
  border: 5px solid #fec810;
}
.title-akses {
  margin-left: 4rem !important;
  margin-right: 4rem !important;
}
.btn-custom {
  background-color: #fec810;
  border: 2px solid #fec810;
  border-radius: 10px;
}
.btn-custom:hover {
  border: 2px solid #557cbf;
}
.active {
  border: 5px solid #fec810;
}
</style>
