<template>
  <section class="sec-content sec-content-tema xn-mt" style="margin-top: 100px">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="login-container">
            <ul>
              <li>
                <nuxt-link to="/tentang-kami" class="text-blue">
                  Tentang Kami
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/kritik-saran" class="text-black-50">
                  Kritik dan saran
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/kebijakan-privacy" class="text-blue">
                  Kebijakan Privasi
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/terms" class="text-blue">
                  Syarat dan Ketentuan
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/haki" class="text-blue">
                  Hak Cipta
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/faq" class="text-blue">
                  FAQ
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-9">
          <div class="login-container1">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <h5 class="text-blue">
                  Punya kritik atau saran untuk Edutore?
                  Jangan ragu dan kirimkan pendapatmu
                </h5>
                <ValidationProvider v-slot="{ errors }" name="Nama" rules="required">
                  <div class="form-group">
                    <label for="nama">Nama</label>
                    <input id="nama" v-model="Form.nama" :class="{'req-validate': errors.length > 0, 'form-control': true}" type="text" placeholder="">
                    <span class="merah">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" v-model="Form.email" :class="{'req-validate': errors.length > 0, 'form-control': true}" type="email" placeholder="">
                    <span class="merah">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="No HP" rules="required|min:10|numeric">
                  <div class="form-group">
                    <label for="no_hp">No HP</label>
                    <input id="no_hp" v-model="Form.no_hp" :class="{'req-validate': errors.length > 0, 'form-control': true}" type="text" placeholder="">
                    <span class="merah">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Judul" rules="required|min:3">
                  <div class="form-group">
                    <label for="judul">Judul</label>
                    <input id="judul" v-model="Form.judul" :class="{'req-validate': errors.length > 0, 'form-control': true}" type="text" placeholder="">
                    <span class="merah">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Pesan" rules="required|min:5">
                  <div class="form-group">
                    <label for="pesan">Pesan</label>
                    <textarea id="pesan" v-model="Form.pesan" :class="{'req-validate': errors.length > 0, 'form-control': true}" type="text" placeholder="" />
                    <span class="merah">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <div class="form-group">
                  <button type="submit" class="btn btn-warning btn-block">
                    Kirim
                  </button>
                  <!--              <a href="javascript:;" @click="test" class="btn btn-warning btn-block">test modal</a>-->
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      v-model="modalShow"
      size="md"
      hide-footer=""
      hide-header=""
      body-bg-variant="default"
    >
      <div class="row">
        <div class="col-md-12 text-center">
          <h5 class="text-center">
            Terima Kasih!
          </h5>
          <p class="text-center">
            Pesan dan masukan anda akan kami tanggapi secepatnya
          </p>
          <hr>
          <nuxt-link :to="{path: '/'}" class="nav-item" style="text-decoration: none; color: #808080">
            Close
          </nuxt-link>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
export default {
  name: 'KritikSaran',
  head () {
    return {
      title: 'Kritik Saran',
      meta: [
        { hid: 'description', name: 'description', content: 'Kritik Saran edutore.com' },
        { property: 'og:title', content: 'Kritik Saran Edutore' },
        { property: 'og:url', content: 'https://tes.edutore.com/kritik-saran' },
        { property: 'og:site_name', content: 'edutore' },
        { property: 'og:description', content: 'Kritik saran edutore adalah wadah dari semua user yang ingin memberikan saran2 dan informasi terkait seluruh produk edutore' },
        { property: 'og:image', content: 'https://storage.googleapis.com/edutore-cdn/public/module/thumb/sikat-un-geografi_1565668001.jpg' }
      ],
      bodyAttrs: {
        class: 'bg-grey'
      }
    }
  },
  data () {
    return {
      Form: {},
      modalShow: false
    }
  },
  methods: {
    onSubmit () {
      const data = this.Form
      this.modalShow = true
      this.$axios.post('https://api.edutore.com/api/v1/kritik-dan-saran', data)
        .then((response) => {
          this.modalShow = true
          if (response.data.success === 'true') {
          } else {
            this.$notify({
              group: 'foo',
              type: 'error',
              text: 'Terjadi kesalahan, Silahkan hubungi edutore.'
            })
          }
        })
    }
  }
}
</script>

<style scoped>
  .xn-mt{
    margin-bottom: 20px;
  }
  .modal {
    background-color: transparent !important;
  }
</style>
