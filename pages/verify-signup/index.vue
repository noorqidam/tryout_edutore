<template>
  <div class="conteiner-fluid">
    <div class="berhasil-beli">
      <h5 class="text-green">
        Proses registrasi edutore berhasil!
      </h5>
      <br>
      <img src="~/assets/img/success-buy.png" style="width: 150px">
      <br><br>
      <h5>Terima kasih sudah mendaftar di </h5>
      <h4 style="color:#557cbf">
        EDUTORE
      </h4>
      <h3 class="text-red">
        Lakukan aktivasi pada email Anda
      </h3>
      <h5><strong class="link-underline">{{ email }}</strong></h5>
      <p>Periksa email aktivasi pada INBOX atau SPAM</p>
      <div class="col mb-4">
        <label for="email" style="color:red"> Belum Terima E-mail  ? </label>
        <br>
        <button @click="ResendEmail" class="btn btn-sm btn-primary">
          <i class="fa fa-mail-reply" /> Kirim Ulang
        </button>
      </div>
      <nuxt-link class="link-underline mydiv" to="/">
        <h6>Kembali ke home</h6>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThanksPage',
  data () {
    return {
      email: null,
      user_id: null
    }
  },
  mounted () {
    this.email = sessionStorage.getItem('email')
    this.user_id = sessionStorage.getItem('user_id')
  },
  methods: {
    ResendEmail () {
      const data = {
        email: this.email,
        user_id: this.user_id
      }
      this.$axios.post('peserta-resend-mail-register', data).then((response) => {
        this.$notify({
          group: 'foo',
          title: 'Berhasil',
          text: 'Email Telah di Kirim ulang'
        })
      })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
          this.$notify({
            group: 'foo',
            title: 'Terimakasih',
            text: 'Masih dalam Pengembangan'
          })
        })
    }
  }
}
</script>

<style scoped>
  .berhasil-beli {
    text-align: center;
    height: auto;
    background: #ffffff;
    padding: 100px;
}
</style>
