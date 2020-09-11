<template>
  <div class="container-fluid" style="margin-top: 100px;margin-bottom: 40px">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="login-container">
            <ul>
              <li>
                <nuxt-link to="/tentang-kami" class="text-black-50">
                  Tentang Kami
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/kritik-saran" class="text-blue">
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
            <h5 class="text-blue">
              Tentang Edutore
            </h5>
            <p>
              Edutore merupakan platform edukasi online yang dikembangkan oleh Gramedia.
              Hadirnya Edutore membuat belajar menjadi lebih mudah, lengkap dan menyenangkan.
            </p>
            <h6 class="text-body">
              SLOGAN
            </h6>
            <p>Slogan Edutore adalah “Semua Bisa Pintar”  dan itu pula yang menjadi cita-cita Edutore. Sehingga Edutore bisa berperan serta dalam mencerdaskan anak-anak Indonesia.</p>
            <p>Beberapa keunggulannya adalah:</p>
            <p class="text-body">
              Konten Pilihan
            </p>
            <p>Konten-konten di dalamnya diambil dari buku-buku pilihan dari penerbit-penerbit unggulan di Indonesia.</p>
            <p class="text-body">
              Cara baru membaca buku
            </p>
            <p>Buku-buku, khususnya buku-buku soal yang selama ini  diakses secara fisik, kini dapat diakses juga dengan web dan aplikasi.</p>
            <p class="text-body">
              Akses lebih luas
            </p>
            <p>Edutore membuat semua orang yang mau belajar bisa pintar karena  Edutore dapat diakses di mana saja dan kapan saja.</p>
            <p class="text-body">
              Mudah, seperti bermain game
            </p>
            <p>Cara kerja aplikasi Edutore dikembangkan untuk membuat belajar menjadi terasa lebih ringan dan menyenangkan, seolah-olah seperti bermain game.</p>
            <p class="text-body">
              Pembahasan langsung
            </p>
            <p>Disediakan pembahasan langsung yang membuat Edufriends lebih mudah belajar ketika soal tidak dipahami dengan baik dan bisa diabaikan jika soal sudah dipahami sehingga Edufriends tidak perlu mengulang hal-hal yang sudah dimengerti dengan baik.</p>
            <p class="text-body">
              PARTNER
            </p>
            <p>Partner-partner di dalam Edutore merupakan pilihan Gramedia yang sudah berpengalaman dan terpercaya di dalam pengelolaan buku-buku bermutu.</p>
            <p class="text-body">
              PENGGUNA
            </p>
            <p>Pengguna Edutore dipanggil dengan sebutan Edufriends sehingga Edutore bisa lebih dekat dengan penggunanya.</p>
            <p class="text-body">
              TIM
            </p>
            <p>Edutore dikembangkan oleh kumpulan anak-anak muda yang kreatif, suka belajar dan selalu ingin maju bersama. Tim tersebut dipanggil dengan istilah Eduteam.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TentangKami',
  head () {
    return {
      title: 'Tentang Kami',
      meta: [
        { hid: 'description', name: 'description', content: 'Tentang Kami' },
        { property: 'og:title', content: 'Tentang Kami' },
        { property: 'og:url', content: `https://edutore.com/tentang-kami` },
        { property: 'og:site_name', content: 'edutore' },
        { property: 'og:description', content: `Edutore Tentang kami adalah semua hal - hal yang berada dalam lingkup edutore, mulai dari aktifitas, produk, dan divisi-divisi yang berada dalam edutore.com` },
        { property: 'og:image', content: `https://storage.googleapis.com/edutore-cdn/public/module/thumb/300-+-soal-bahasa-indonesia-prediksi-unbk-dan-usbn-sma-ma_1565667820.jpg` }
      ],
      bodyAttrs: {
        class: 'bg-grey'
      }
    }
  },
  data: () => ({

  }),
  mounted () {

  },
  beforeMount () {

  },
  methods: {

  }
}
</script>
<style>
  ol{
    list-style-type: lower-alpha !important;
    margin-left: 20px;
  }
  ol li{
    list-style: lower-alpha !important;
  }
</style>
