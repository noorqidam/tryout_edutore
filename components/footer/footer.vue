<template>
  <div class="bg-white footer pt-5 pb-3 border-top mt-0">
    <div class="container">
      <div class="row">
        <div class="col-md-3 mb-4 foo-lists">
          <img src="~/assets/img/edutore.png" alt="" style="width:150px; height:auto" class="img-fluid">
          <p class="mb-4 mt-4 title-slogan">
            "Semua Bisa Pintar"
          </p>
          <p class="mb-4 copyright">
            Copyright &copy; {{ year }}
          </p>
          <div>
            <a href="https://www.instagram.com/edutorecom" target="_blank" rel="noopener noreferrer">
              <span class="mr-1">
                <img src="~/assets/img/instagram.png" alt="" class="sosmed img-fluid">
              </span>
            </a>
            <a href="https://twitter.com/edutorecom" target="_blank" rel="noopener noreferrer">
              <span class="mr-1">
                <img src="~/assets/img/twitter.png" alt="" class="sosmed img-fluid">
              </span>
            </a>
            <a href="https://web.facebook.com/edutorecom" target="_blank" rel="noopener noreferrer">
              <span class="mr-1">
                <img src="~/assets/img/facebook.png" alt="" class="sosmed img-fluid">
              </span>
            </a>
            <a href="https://www.youtube.com/channel/UCKHHM8nVVgOAUovFP8vZ0xA" target="_blank" rel="noopener noreferrer">
              <span class="mr-1">
                <img src="~/assets/img/youtube.png" alt="" class="sosmed img-fluid">
              </span>
            </a>
          </div>
        </div>
        <div class="col-md-9 mb-4">
          <div class="row">
            <div class="col-sm-3 mb-4">
              <p class="mb-1">
                <b class="title-footer-edutore">Menu</b>
              </p>
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a
                    class="nav-link pl-0 title-list-footer "
                    target="_blank"
                    href="https://edutore.com"
                    rel="noopener noreferrer"
                  >Beranda</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link pl-0 title-list-footer"
                    target="_blank"
                    href="https://partner.edutore.com"
                    rel="noopener noreferrer"
                  >Edutore Partner</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link pl-0 title-list-footer"
                    target="_blank"
                    href="https://edutore.com/news"
                    rel="noopener noreferrer"
                  >News</a>
                </li>
              </ul>
            </div>
            <div class="col-sm-3 mb-4">
              <p class="mb-1">
                <b class="title-footer-edutore">Bantuan</b>
              </p>
              <ul class="nav flex-column">
                <li class="nav-item">
                  <nuxt-link to="/kebijakan-privacy" class="nav-link pl-0 title-list-footer">
                    Kebijakan Privasi
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link to="/kritik-saran" class="nav-link pl-0 title-list-footer">
                    Kritik &amp; Saran
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link to="/kritik-saran" class="nav-link pl-0 title-list-footer">
                    Hubungi Kami
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link to="/haki" class="nav-link pl-0 title-list-footer">
                    Hak Cipta
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link to="/faq" class="nav-link pl-0 title-list-footer">
                    FAQ
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <div class="col-sm-3 mb-4 free-study-desktop">
              <p class="mb-1">
                <a
                  class="title-footer-edutore"
                  target="_blank"
                  href="https://edutore.com/belajar-gratis"
                  style="font-weight: bold; text-decoration: none"
                >Gratis Latihan Soal</a>
              </p>
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a
                    class="nav-link pl-0 title-list-footer"
                    target="_blank"
                    href="https://edutore.com/news/latihan-soal-cpns-online/"
                  >Latihan Soal CPNS Online</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link pl-0 title-list-footer"
                    target="_blank"
                    href="https://edutore.com/news/latihan-soal-psikotes-online/"
                  >Latihan Soal Tes Psikologi</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link pl-0 title-list-footer"
                    target="_blank"
                    href="https://edutore.com/news/soal-sbmptn-saintek-soshum/"
                  >Latihan Soal SBMPTN Online</a>
                </li>
              </ul>
            </div>
            <div class="col-sm-3 mb-4 free-study-desktop">
              <p class="mb-1">
                <b>&nbsp;</b>
              </p>
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a
                    class="nav-link pl-0 title-list-footer"
                    target="_blank"
                    href="https://edutore.com/news/latihan-soal-unbk-usbn-sma/"
                  >Latihan Soal UNBK USBN SMA Online</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link pl-0 title-list-footer"
                    target="_blank"
                    href="https://edutore.com/news/latihan-soal-unbk-usbn-smp-mts/"
                  >Latihan Soal UNBK USBN SMP Online</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link pl-0 title-list-footer"
                    target="_blank"
                    href="https://edutore.com/news/latihan-soal-ujian-sekolah-sd/"
                  >Latihan Soal UNBK USBN SD Online</a>
                </li>
              </ul>
            </div>
            <div class="col-sm-3 free-study-mobile d-md-none">
              <a v-b-toggle.accordion1 block class="btn accordion">
                <a
                  class="nav-link pl-0 title-list-footer"
                >Gratis Latihan Soal</a>
                <span class="when-opened">
                  <!-- <font-awesome-icon icon="angle-up" class="icon-accordion" /> -->
                  <i class="fa fa-angle-up icon-accordion" />
                </span>
                <span class="when-closed">
                  <!-- <font-awesome-icon icon="angle-down" class="icon-accordion" /> -->
                  <i class="fa fa-angle-down icon-accordion" />
                </span>
              </a>
              <b-collapse id="accordion1" role="tabpanel" class="child-nav">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <a
                      class="nav-link pl-0 title-list-footer"
                      target="_blank"
                      href="https://edutore.com/news/latihan-soal-cpns-online/"
                    >Latihan Soal CPNS Online</a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link pl-0 title-list-footer"
                      target="_blank"
                      href="https://edutore.com/news/latihan-soal-psikotes-online/"
                    >Latihan Soal Tes Psikologi</a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link pl-0 title-list-footer"
                      target="_blank"
                      href="https://edutore.com/news/soal-sbmptn-saintek-soshum/"
                    >Latihan Soal SBMPTN Online</a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link pl-0 title-list-footer"
                      target="_blank"
                      href="https://edutore.com/news/latihan-soal-unbk-usbn-sma/"
                    >Latihan Soal UNBK USBN SMA Online</a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link pl-0 title-list-footer"
                      target="_blank"
                      href="https://edutore.com/news/latihan-soal-unbk-usbn-smp-mts/"
                    >Latihan Soal UNBK USBN SMP Online</a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link pl-0 title-list-footer"
                      target="_blank"
                      href="https://edutore.com/news/latihan-soal-ujian-sekolah-sd/"
                    >Latihan Soal UNBK USBN SD Online</a>
                  </li>
                </ul>
              </b-collapse>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <ul class="nav justify-content-center">
        <li class="nav-item mr-5">
          <nuxt-link to="https://edutore.com/tentang-kami" class="nav-link footer-bottom">
            Tentang Kami
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="https://edutore.com/terms" class="nav-link footer-bottom">
            Syarat dan Ketentuan
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="https://edutore.com/haki" class="nav-link footer-bottom">
            Hak Cipta
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="https://edutore.com/kebijakan-privacy" class="nav-link footer-bottom">
            Kebijakan Privasi
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="https://edutore.com/kritik-saran" class="nav-link footer-bottom">
            Kritik dan Saran
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="https://edutore.com/faq" class="nav-link footer-bottom">
            FAQ
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
    <!-- begin adf.ly conversion tracking -->
    <!--      <img src="//adf.ly/ad/conv?aid=1041593" width="1" height="1" border="0" hspace="0" vspace="0" style="position: absolute; left: -1000px; top: -1000px;" />&lt;!&ndash; end adf.ly conversion tracking &ndash;&gt;-->

<script>
export default {
  name: 'Footer',
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
  .title-slogan {
      font-size: 14px;
      color: #808080;
      font-family: ElliotSans-Regular;
      margin-top: 10px
  }
  .copyright {
      font-size: 14px;
      color: #808080;
      font-family: ElliotSans-Regular
  }
  .title-list-footer {
      font-size: 15px;
      color: #404040;
      font-family: ElliotSans-Regular
  }
  .title-list-footer:hover{
    color: #1e9cd7;
  }
  .footer-bottom {
      font-size: 14px;
      color: #404040;
      font-family: ElliotSans-Regular
  }
  .title-footer-edutore {
      color: #808080;
      font-size: 15px;
      font-family: ElliotSans-Medium
  }
  .sosmed {
    width: 37px;
    height: auto;
  }
  .foo-lists {
    border-right: 1px solid #CCC;
  }
  .free-study-mobile {
    margin-left: -12px;
  }
  .child-nav {
    margin-left: 15px;
  }
  .accordion {
    background-color: transparent;
    display: flex;
  }
  .icon-accordion {
    margin-top: 10px;
  }
  .collapsed > .when-opened,
  :not(.collapsed) > .when-closed {
      display: none;
  }
  @media (max-width: 767.98px) {
    .foo-lists {
      border: 0;
    }
    .free-study-desktop {
      display: none;
    }
  }
</style>
