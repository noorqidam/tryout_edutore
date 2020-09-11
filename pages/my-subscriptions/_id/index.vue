<template>
  <div style="padding-top: 70px;" class="mb-5">
    <section class="sec-content sec-content-tema">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="breadcumb">
              <ul>
                <li>
                  <nuxt-link to="/">
                    Beranda
                  </nuxt-link><i class="fa fa-chevron-right" aria-hidden="true" />
                </li>
                <li>
                  <nuxt-link to="/edutest">
                    Edutest
                  </nuxt-link><i class="fa fa-chevron-right" aria-hidden="true" />
                </li>
                <li>{{ modules.name }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-md-5">
            <div v-if="isLoading" class="con-reg-kiri">
              <div class="text-center">
                <img
                  src="~/assets/img/edu-wink.gif"
                  style="width: 200px;border-radius: 100px;box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);"
                >
                <div class="mt-3">
                  <p>Loading...</p>
                </div>
              </div>
            </div>
            <div v-else class="con-reg-kiri">
              <h1>{{ modules.name }}</h1>
              <p class="text-blue fnt-20">
                {{ totalSoal }} Soal
              </p>
              <small v-for="item in moduleAuthors" :key="item.id">
                {{ item.penulis.name }}
              </small>
              <small>{{ modules.publisher.name }}</small>
              <div v-if="isBuy">
                <hr :hidden="isZeroPrice" style="border-top: 2px solid rgb(168, 171, 181);">
                <div class="row">
                  <div class="col-6">
                    <p :hidden="isZeroPrice" style="padding-top: 10px;" class="text-blue text-left langganan-text-buy">
                      {{ currencyFormat(modules.price, 'Rp ') }}
                    </p>
                  </div>
                  <div class="col-6">
                    <button type="submit" class="btn btn-primary btn-block">
                      Beli
                    </button>
                  </div>
                </div>
                <hr :hidden="isZeroPrice" style="border-top: 2px solid rgb(168, 171, 181);">
                <div class="row">
                  <div class="col-6">
                    <p :hidden="isZeroPrice" style="padding-top: 7px;" class="text-blue text-left langganan-text-buy">
                      Lebih Ekonomis
                    </p>
                  </div>
                  <div class="col-6">
                    <button
                      :hidden="isZeroPrice"
                      type="submit"
                      class="btn btn-warning btn-block"
                    >
                      Langganan
                    </button>
                  </div>
                </div>
              </div>
              <br>
              <p v-if="modules.image === null">
                Loading...
              </p>
              <img v-else :src="pathImage + modules.image" rel="dns-prefetch" style="width: 100%;border-radius: 10px">
              <div class="desc-reg-kiri">
                <div v-if="modules.description !== undefined">
                  <div v-if="modules.description.length > 250">
                    <span v-if="!readMoreActivated" class="span-syarat">
                      {{ modules.description ? modules.description.slice(0, 250) : null }}...
                    </span>
                    <a v-if="!readMoreActivated" @click="actionReadMore" class="readmore">Baca Selengkapnya</a>
                    <span v-if="readMoreActivated" v-html="modules.description" class="span-syarat" />
                    <a v-if="readMoreActivated" @click="actionReadLess" class="readmore">Baca Lebih Sedikit</a>
                  </div>
                </div>
                <div v-else>
                  {{ modules.description }}
                </div>
                <div class="icon-desc">
                  <div class="desc-icon book-icon float-right">
                    <img src="~/assets/img/book-icon.png" alt="book">
                    <h3 v-for="item in dikerjakan" :key="item.id">
                      {{ item.total }}
                    </h3>
                  </div>
                  <div @click="likes(modules.id)" class="desc-icon love-icon float-right ">
                    <p class="ico-heart-module">
                      <i v-bind:class="isLiked ? 'fa fa-heart-ico': '' " class="fa fa-heart" />
                      {{ modules.like.likes }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-7">
            <div class="con-reg-kanan">
              <div v-for=" item in listThema" :key="item.id">
                <div v-if="item.paket_soals.length !== 0" class="tema-reg__box">
                  <a>
                    <h2>{{ item.theme_name }}</h2>
                    <h3 v-for="paketSoal in item.paket_soals" :key="paketSoal.id" @click="submitPaketSoals(item.id,paketSoal.id)" class="tema-paket-soals">
                      {{ paketSoal.name }}
                      <b v-if="paketSoal.trial" style="color: red">Coba Gratis</b>
                    </h3>
                    <div class="star-reg-box">
                      <i class="star-kosong fa fa-star" />
                      <i class="star-kosong fa fa-star" />
                      <i class="star-kosong fa fa-star" />
                      <i class="star-kosong fa fa-star" />
                      <i class="star-kosong fa fa-star" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from '~/services/fireinit'
export default {
  name: 'MyModules',
  data () {
    return {
      modules: {},
      totalSoal: 0,
      isBuy: null,
      isZeroPrice: '',
      countOrder: 0,
      isOrder: false,
      // pathImage: 'https://cdn.edutore.com/public/module/',
      pathImage: 'https://storage.googleapis.com/edutore-cdn/public/module/thumb/',
      dikerjakan: [],
      token: null,
      typeBook: '',
      isLiked: false,
      ttlLikes: 0,
      isLoading: true,
      listThema: [],
      moduleAuthors: [],
      module_id: null,
      theme_id: null,
      slug: '',
      idSubscription: null,
      readMoreActivated: false
    }
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken(true).then((accesstoken) => {
          this.token = accesstoken
        })
      }
    })
  },
  mounted () {
    const slug = this.$route.params.id
    this.slug = slug
    const id = this.$route.query.id_subs
    this.idSubscription = id
    this._actionGetModule(slug)
  },
  methods: {
    actionReadMore () {
      this.readMoreActivated = true
    },
    actionReadLess () {
      this.readMoreActivated = false
    },
    currencyFormat (n, currency) {
      return currency + n.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== ',' && (a.length - i) % 3 === 0 ? '.' + c : c
      })
    },
    _actionGetModule (slug) {
      this.$axios.get('https://api.edutore.com/api/v1/modules/' + slug)
        .then((response) => {
          const dataMyModule = response.data
          if (response.data.success === 'true') {
            this.modules = dataMyModule.data.rows
            this.module_id = this.modules.id
            this.moduleAuthors = dataMyModule.data.rows.module_authors
            this.isLoading = false
            this.totalSoal = dataMyModule.data.total_soal
            this.dikerjakan = dataMyModule.data.dikerjakan
            this.ttlLikes = dataMyModule.data.rows.like === null ? 0 : dataMyModule.data.rows.like.likes
            this.isZeroPrice = dataMyModule.data.rows.price === 0
            this.listThema = dataMyModule.data.theme
          }
        })
    },
    submitPaketSoals (ThemaId, paketId) {
      this.$router.push({
        path: '/my-modules/' + this.module_id + '/' + ThemaId,
        query: { paket_soal: paketId, slug: this.slug, subscription_id: this.idSubscription }
      })
    },
    likes (id) {
      const data = { module_id: id }
      this.$axios.post('https://api.edutore.com/api/v1/like-module', data, { headers: { 'x-access-token': this.token } })
        .then((response) => {
          if (response.data.success === 'true') {
            this.ttlLikes++
            // eslint-disable-next-line no-console
            console.log(response.data)
          } else {
            this.$notify({
              group: 'foo',
              type: 'warn',
              text: 'Mohon Login Dulu...'
            })
          }
        })
    }
  }
}
</script>

<style scoped>
.fnt-20 {
  font-size: 20px;
}
.con-reg-kiri {
  padding: 40px;
  box-shadow: 0 0 26px 0 rgba(0,0,0, .3);
  border-radius: 15px;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  -ms-border-radius: 15px;
  -o-border-radius: 15px;
}
.con-reg-kiri h1, h2 {
  font-size: 25px;
  font-weight: 600;
}
.con-reg-kiri h2{
  color: #D42173;
  margin: 15px 0;
}
.con-reg-kiri small {
  display: block;
  font-size: 16px;
}
.desc-reg-kiri {
  margin-top: 15px;
}
.desc-reg-kiri p {
  font-size: 13px;
  line-height: 22px;
  color:#2b2b2b;
}
.desc-reg-kiri img {
  float: left;
  margin-right: 23px;
}
.ico-heart-module {
  font-size: 20px!important;
  cursor: pointer;
}
.heart-ico {
  color: #e50064;
}
.book-icon img {
  margin: -5px 17px;
  height: 25px;
}
.desc-icon h3 {
  display: inline-block;
  font-size: 20px!important;
  color:#2b2b2b;
}
.icon-desc .love-icon h3 {
  margin-left: 2px;
  font-size: 15px;
  margin-right: 10px;
}
.icon-desc .book-icon h3 {
  margin-left: -5px;
  font-size: 15px;
}
.tema-reg__box, .tema-reg__solid {
  border: 4px solid #1e9cd7;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 15px 0;
  width: 84%;
  margin: 15px auto 40px;
  position: relative;
  box-shadow: 0 7px 23px 2px rgba(0,0,0, .2);
  border-radius: 15px;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  -ms-border-radius: 15px;
  -o-border-radius: 15px;
}
.tema-reg__box h2 {
  font-size: 25px;
  color: #404040;
  font-weight: 600;
}
.star-reg-box {
  background-color: #1e9cd7;
  padding: 5px 20px 2px;
  position: absolute;
  bottom: -17px;
  left: 50%;
  transform: translateX(-50%);
  border-radius:50px;
  -webkit-border-radius:50px;
  -moz-border-radius:50px;
  -ms-border-radius:50px;
  -o-border-radius:50px;
  -webkit-border-radius:50px;
}
.star-reg-box .star-kosong {
  font-size: 16px;
  color: #fff;
}
.tema-paket-soals {
  cursor: pointer;
  color: #1d9cd7;
  font-size: 16px;
}
.con-reg-kanan {
  margin-top: -15px;
}
@media (max-width: 767.98px) {
  .con-reg-kanan {
    margin-top: 0;
  }
  .langganan-text-buy {
    font-size: 17px !important
  }
}
.readmore {
  color:#1e9cb7;
  font-family: ElliotSans-Regular;
  font-size: 13px;
  cursor: pointer;
}
.readmore:hover {
  color:#1e9cb7;
}
.span-syarat {
  color: #2B2B2B;
  font-size: 13px;
  font-family: ElliotSans-Regular;
}
.langganan-text-buy {
  font-size: 20px
}
</style>
