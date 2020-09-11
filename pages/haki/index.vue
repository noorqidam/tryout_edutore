<template>
  <div class="container-fluid" style="margin-top: 100px;margin-bottom: 40px">
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
                <nuxt-link to="/haki" class="text-black-50">
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
              Kebijakan Hak Kekayaan Intelektual
            </h5>
            <p>Semua informasi, konten serta produk yang ada pada platform ini memiliki perlindungan hak cipta yang tercatat di Direktorat Jenderal Kekayaan Intelektual Kementerian Hukum dan Hak Asasi Manusia dan partner Edutore yang dilindungi undang-undang. Kami menghargai hak kekayaan intelektual orang lain dan kami berharap Anda juga melakukan hal yang sama. Pihak lain dilarang mengambil, menyalin, mempublikasi ulang dan menjual kembali materi yang ada pada platform Edutore tanpa izin tertulis. </p>
            <h6 class="text-body">
              Jenis Materi yang Terikat dalam Hak Atas Kekayaan Intelektual
            </h6>
            <p>Secara umum, Hak atas Kekayaan Intelektual (HaKI) terbagi menjadi dua kategori yaitu:</p>
            <ol>
              <li>
                Hak Atas Kekayaan Intelektual, yaitu Hak Merek Dagang dan Hak Cipta
                Edutore telah mendaftarkan Hak Industri yang berupa Hak Merek dan Hak Cipta kepada Ditjen HaKI sehingga semua asset kepemilikan Edutore sudah dilindungi dengan jelas oleh Undang-Undang yang berlaku. Hak Merek memberi perlindungan untuk nama Edutore dan nama produk di dalamnya yaitu Edutest, Edubooks, Eduplace, Edutopics, Edushow, Eduversity, Edumart, Edutalks, Edushare, Edututor, asset gambar, logo, foto, dan karya visual lainnya. Sedangkan Hak Cipta untuk memberi perlindungan untuk aplikasi (software komputer) dibuat dalam  platform bernama Edutore.
              </li>
              <li>
                Hak Cipta
                Hak Cipta adalah hak eksklusif bagi Pencipta dalam hal ini adalah partner yang membuat konten di platform Edutore maupun konten yang dibuat oleh Edutore sendiri. Hak cipta meliputi konten berupa soal-soal test, video, artikel dan lainnya.
              </li>
            </ol>
            <h6 class="text-body">
              Ketentuan Penggunaan Konten
            </h6>
            <p>
              Konten hanya boleh digunakan untuk kepentingan pribadi. Konten juga tidak boleh digunakan untuk kepentingan komersial.
            </p>
            <p class="text-body">
              Menentukan Kepemilikan Hak Cipta
            </p>
            <p>
              Saat menerima laporan untuk menghapus konten atau produk yang dicuri, Edutore akan meninjaunya berdasarkan undang-undang yang berlaku. Edutore dapat melakukan mediasi antara penggugat dan tergugat. Akan tetapi, jika permasalahan kepemilikan hak cipta tidak menemukan titik temu, maka kedua belah pihak harus menyelesaikannya di Pengadilan Niaga berdasarkan hukum yang berlaku untuk menentukan kepemilikan hak cipta.
            </p>
            <p>
              Edutore berhak menarik atau menyembunyikan sementara konten yang sedang dalam perdebatan sampai kepemilikan sudah ditentukan baik melalui musyawarah yang ditandai dengan surat perjanjian maupun hasil keputusan pengadilan.
            </p>
            <p class="text-body">
              Pembatasan Hak Cipta
            </p>
            <p>
              Edutore memiliki batasan dalam melindungi hak cipta partner. Konten atau produk yang Edutore lindungi dibatasi hanya pada area platform Edutore dan sudah melalui proses penentuan kepemilikan hak cipta. Jika diketahui terdapat konten atau produk milik partner yang dicuri oleh pihak lain kemudian diunggah kembali pada platform Edutore, maka kami akan melakukan tindakan-tindakan wajar yang diperlukan seperti menentukan kepemilikan hak cipta, menghapus paksa salinan tersebut, mengakhiri kenggotaan partner yang mencuri hingga menempuh jalur hukum.
            </p>
            <p class="text-body">
              Melaporkan Hak Cipta
            </p>
            <p>
              Dalam melindungi hak cipta, Edutore perlu mendapat dukungan dari pengguna maupun partner. Maka, kami berharap kepada siapapun yang melihat ada pencurian konten atau produk pada platform Edutore untuk melaporkannya disertai dengan alasan serta bukti-bukti yang berkaitan dengan pencurian konten atau produk kepada kami melalui <nuxt-link to="/kritik-saran">
                Halaman Kritik Saran
              </nuxt-link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Haki',
  head () {
    return {
      title: 'Hak Cipta',
      meta: [
        { hid: 'description', name: 'description', content: 'Hak Cipta' },
        { property: 'og:title', content: 'Haki' },
        { property: 'og:url', content: `https://edutore.com/haki` },
        { property: 'og:site_name', content: 'edutore' },
        { property: 'og:description', content: `Edutore haki adalah keterangan tentang hak cipta dari semua produk yang berada di edutore.com` },
        { property: 'og:image', content: `https://storage.googleapis.com/edutore-cdn/public/module/thumb/master-tkd-cpns_1565858416.jpg` }
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
  .login-container1 {
    background:#fff;
    padding:20px;
    margin:auto
  }
  .login-container1:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top: 1px #dedede solid;
  }
  .login-container1:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
</style>
