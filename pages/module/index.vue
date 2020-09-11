<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-light bg-blues is-desktop fixed-top">
      <div class="container">
        <a class="navbar-brand" href="/" />
        <div>
          <button @click="_actionSidebar()" class="toggle-sidebar">
            <i class="fa fa-bars" style="color: #536c79" />
          </button>
        </div>
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse id="nav-collapse" is-nav>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <b-form-group>
                <b-form-input
                  id="Text"
                  type="text"
                  class="border-custom-top"
                  placeholder="Pencarian"
                />
                <i class="fa fa-search field-icon-top" />
              </b-form-group>
            </li>
            <div v-if="user">
              <li class="nav-item nav-top-item dropdown">
                <b-nav-item-dropdown right>
                  <template v-slot:button-content>
                    <em> {{ user }}</em>
                  </template>
                  <b-dropdown-item />
                  <b-dropdown-item @click="_actionProfile">
                    Profile
                  </b-dropdown-item>
                  <b-dropdown-item @click="_actionModalOut">
                    <i class="fa fa-sign-out" />
                    Sign Out
                  </b-dropdown-item>
                </b-nav-item-dropdown>
              </li>
            </div>
            <div v-else>
              <li class="nav-item desktop mr-4">
                <nuxt-link :to="{ path :'/login'}" class="nav-item">
                  Login
                </nuxt-link>
              </li>
              <li class="nav-item desktop">
                <nuxt-link :to="{ path :'/register'}" class="nav-item">
                  Register
                </nuxt-link>
              </li>
            </div>
          </ul>
          <ul class="navbar-nav ml-auto is-desktop d-sm-none">
            <div v-if="user">
              <li class="nav-item text-center">
                <b-nav-item>
                  <img :src="photo" class="picture img-fluid">
                </b-nav-item>
                <b-nav-item>
                  <p>{{ user }}</p>
                </b-nav-item>
              </li>
              <li class="mobile">
                <b-nav-item href="/user" class="nav-link btn btn-primary btn-btn-block d-sm-none profile">
                  Profile
                </b-nav-item>
              </li>
              <li class="mobile">
                <b-nav-item @click="_actionModalOut" class="nav-link btn btn-warning btn-btn-block d-sm-none signout">
                  <i class="fa fa-sign-out" />
                  Sign Out
                </b-nav-item>
              </li>
            </div>
            <div v-else>
              <li class="mobile">
                <nuxt-link :to="{ path :'/login'}" class="nav-link btn btn-primary btn-btn-block d-md-none text-white login">
                  Login
                </nuxt-link>
              </li>
              <li class="mobile">
                <nuxt-link :to="{ path :'/register'}" class="nav-link btn btn-warning btn-btn-block text-white d-md-none register">
                  Register
                </nuxt-link>
              </li>
            </div>
          </ul>
        </b-collapse>
      </div>
    </nav>
    <div class="container" style="padding-top: 90px">
      <div class="row flex-xl-nowrap2">
        <div id="sidenav" class="col-md-3 left-sidebar">
          <div class="card content-left">
            <div class="card-body">
              <a v-b-toggle.accordionMatpel block class="btn accordion">
                <p class="title">
                  Mata Pelajaran
                </p>
                <span class="when-opened">
                  <i class="fa fa-angle-up icon-accordion" />
                </span>
                <span class="when-closed">
                  <i class="fa fa-angle-down icon-accordion" />
                </span>
              </a>
              <b-collapse id="accordionMatpel" role="tabpanel" class="child-nav mb-3" visible>
                <b-form-input
                  v-model="FilterMatpel"
                  type="text"
                  class="border-custom"
                  placeholder="Cari mata pelajaran"
                />
                <i class="fa fa-search field-icon" />
                <div class="mt-2 scroll">
                  <div v-for="m in filteredMatpel" :key="m.id">
                    <li style="list-style :none">
                      <input v-model="matpel" :value="m.name" @change="_actionFilter" type="checkbox">
                      {{ m.name }}
                    </li>
                  </div>
                </div>
              </b-collapse>
              <a v-b-toggle.accordionKelas block class="btn accordion mt-3">
                <p class="title">
                  Kelas
                </p>
                <span class="when-opened">
                  <i class="fa fa-angle-up icon-accordion" />
                </span>
                <span class="when-closed">
                  <i class="fa fa-angle-down icon-accordion" />
                </span>
              </a>
              <b-collapse id="accordionKelas" role="tabpanel" class="child-nav mb-3" visible>
                <b-form-group>
                  <b-form-input
                    v-model="FilterKelas"
                    type="text"
                    class="border-custom"
                    placeholder="Cari kelas"
                  />
                  <i class="fa fa-search field-icon" />
                </b-form-group>
                <div class="scroll-kelas mt-2">
                  <div v-for="k in filteredKelas" :key="k.id">
                    <li style="list-style :none">
                      <input v-model="kelas" :value="k.name" @change="_actionFilter" type="checkbox">
                      {{ k.name }}
                    </li>
                  </div>
                </div>
              </b-collapse>
              <a v-b-toggle.accordionPublisher block class="btn accordion mt-3">
                <p class="title">
                  Publisher
                </p>
                <span class="when-opened">
                  <i class="fa fa-angle-up icon-accordion" />
                </span>
                <span class="when-closed">
                  <i class="fa fa-angle-down icon-accordion" />
                </span>
              </a>
              <b-collapse id="accordionPublisher" role="tabpanel" class="child-nav" visible>
                <b-form-group>
                  <b-form-input
                    v-model="FilterPublisher"
                    type="text"
                    class="border-custom"
                    placeholder="Cari publisher"
                  />
                  <i class="fa fa-search field-icon" />
                </b-form-group>
                <div class="scroll mt-2">
                  <div v-for="p in filteredPublisher" :key="p.id">
                    <li style="list-style :none">
                      <input v-model="Filterspublishers" :value="p.name" @change="_actionFilter" type="checkbox">
                      {{ p.name }}
                    </li>
                  </div>
                </div>
              </b-collapse>
            </div>
          </div>
        </div>
        <main class="col content-right bd-content">
          <div class="row scroll-book">
            <div v-for="item in modules" :key="item.id" class="col-6 col-md-2 mt-3">
              <router-link :to="{path :'/module/' + item.module_slug}">
                <div class="detail-book">
                  <a><img :src="pathModuleEdutore + item.image" class="img-fluid" style="cursor: pointer"></a>
                  <p class="split-text">
                    {{ item.name.substr(0,45) }}
                  </p>
                  <div class="penerbit">
                    {{ item.publisher.name }}
                  </div>
                  <div class="row">
                    <div class="main-crown">
                      <img src="~/assets/img/label-crown-3.png" class="img-fluid">
                    </div>
                    <p class="price">
                      {{ _formatPrice(item.price, 'Rp ') }}
                    </p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <div class="row justify-content-end">
            <div class="col-sm-auto">
              <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" />
            </div>
          </div>
        </main>
      </div>
      <div class="floatingQuickSetting d-md-none">
        <ul class="fqs">
          <li class="fqs__option">
            <img data-v-23ab00eb="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iI0JEQkRCRCIgZD0iTTE0IDdIM2MtLjUgMC0xLS40LTEtMXMuNS0xIDEtMWgxMWMuNiAwIDEgLjQgMSAxcy0uNSAxLTEgMXoiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjODU4NTg1IiBkPSJNMjEuNiAxNGMtLjQtLjMtMS4xLS4yLTEuNC4ybC0uNi44VjZjMC0uNi0uNS0xLTEtMXMtMSAuNC0xIDF2OWwtLjYtLjhjLS4zLS40LTEtLjUtMS40LS4yLS41LjMtLjUgMS0uMiAxLjRsMi40IDMuMi4yLjJzLjEgMCAuMS4xYy4xLjEuMy4xLjQuMS4xIDAgLjMgMCAuNC0uMSAwIDAgLjEgMCAuMS0uMS4xLS4xLjItLjEuMi0uMmwyLjQtMy4yYy41LS40LjQtMSAwLTEuNHoiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjQkRCREJEIiBkPSJNMTEgMTJIM2MtLjYgMC0xLS40LTEtMXMuNS0xIDEtMWg4Yy42IDAgMSAuNCAxIDFzLS41IDEtMSAxek03LjkgMTdIM2MtLjYgMC0xLS40LTEtMXMuNS0xIDEtMWg0LjljLjYgMCAxIC40IDEgMXMtLjQgMS0xIDF6Ii8+CiAgICA8L2c+Cjwvc3ZnPgo=" alt="sort" class="fqs__option_icon">
            <span class="floating-text">Urutkan</span>
          </li>
          <li class="fqs__option separator" />
          <li class="fqs__option">
            <i class="fa fa-filter" style="font-size: 20px" />
            <span class="floating-text">Filter</span>
          </li>
          <img data-v-23ab00eb="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMEgyNFYyNEgweiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xNi43OTUgOC44MjlsLTQuMTI4IDcuNTY2Yy0uMjAxLjQwMy0uNTAzLjYwNS0uOTA2LjYwNWgtLjFjLS40MDQgMC0uNzA2LS4xLS45MDctLjQwNGwtMy40MjMtMy44MzNjLS41MDMtLjUwNC0uNDAzLTEuMzExLjEtMS44MTYuNTA0LS41MDQgMS4zMS0uNDAzIDEuODEzLjEwMWwyLjIxNSAyLjUyMiAzLjMyMi02LjA1M2MuMjAyLS41MDQuOTA2LS43MDYgMS41MS0uMzAyLjcwNS4zMDIuOTA2IDEuMDA4LjUwNCAxLjYxNHoiLz4KICAgIDwvZz4KPC9zdmc+Cg==" alt="filter" class="fqs__option_name_tick">
          <li class="fqs_option separator" />
          <img data-v-23ab00eb="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iYiIgZD0iTTE2IDBoOTE5YzguODM3IDAgMTYgNy4xNjMgMTYgMTZ2OTU0YzAgOC44MzctNy4xNjMgMTYtMTYgMTZIMTZjLTguODM3IDAtMTYtNy4xNjMtMTYtMTZWMTZDMCA3LjE2MyA3LjE2MyAwIDE2IDB6Ii8+CiAgICAgICAgPGZpbHRlciBpZD0iYSIgd2lkdGg9IjEwMy44JSIgaGVpZ2h0PSIxMDMuNyUiIHg9Ii0xLjklIiB5PSItMS44JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij4KICAgICAgICAgICAgPGZlTW9ycGhvbG9neSBpbj0iU291cmNlQWxwaGEiIHJhZGl1cz0iMiIgcmVzdWx0PSJzaGFkb3dTcHJlYWRPdXRlcjEiLz4KICAgICAgICAgICAgPGZlT2Zmc2V0IGluPSJzaGFkb3dTcHJlYWRPdXRlcjEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiIHN0ZERldmlhdGlvbj0iOCIvPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCBpbj0ic2hhZG93Qmx1ck91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjEyIDAiLz4KICAgICAgICA8L2ZpbHRlcj4KICAgIDwvZGVmcz4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iI0YzRjZGNyIgZD0iTS0xMDI4LTMwN0g0MTJ2Mjk5OWgtMTQ0MHoiLz4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjU5IC0zMykiPgogICAgICAgICAgICA8dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz4KICAgICAgICAgICAgPHVzZSBmaWxsPSIjRkZGIiB4bGluazpocmVmPSIjYiIvPgogICAgICAgIDwvZz4KICAgICAgICA8cGF0aCBmaWxsPSIjODU4NTg1IiBkPSJNOSAxMUg0Yy0xLjEgMC0yLS45LTItMlY0YzAtMS4xLjktMiAyLTJoNWMxLjEgMCAyIC45IDIgMnY1YzAgMS4xLS45IDItMiAyek05IDIySDRjLTEuMSAwLTItLjktMi0ydi01YzAtMS4xLjktMiAyLTJoNWMxLjEgMCAyIC45IDIgMnY1YzAgMS4xLS45IDItMiAyeiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNCREJEQkQiIGQ9Ik0yMSA1aC03Yy0uNiAwLTEtLjQtMS0xcy40LTEgMS0xaDdjLjYgMCAxIC40IDEgMXMtLjQgMS0xIDF6TTIxIDEwaC03Yy0uNiAwLTEtLjQtMS0xcy40LTEgMS0xaDdjLjYgMCAxIC40IDEgMXMtLjQgMS0xIDF6TTIxIDE2aC03Yy0uNiAwLTEtLjQtMS0xcy40LTEgMS0xaDdjLjYgMCAxIC40IDEgMXMtLjQgMS0xIDF6TTIxIDIxaC03Yy0uNiAwLTEtLjQtMS0xcy40LTEgMS0xaDdjLjYgMCAxIC40IDEgMXMtLjQgMS0xIDF6Ii8+CiAgICA8L2c+Cjwvc3ZnPgo=" alt="List View" class="fqs__option_icon listview">
          <li>
            <span class="floating-text">View</span>
          </li>
        </ul>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Vue from 'vue'
import Notifications from 'vue-notification'
import { mapState } from 'vuex'
import firebase from '~/services/fireinit'
const Footer = () => import('~/components/footer/footer')
Vue.use(Notifications)
export default {
  name: 'Module',
  components: {
    Footer
  },
  layout (context) {
    return 'defaults'
  },
  data () {
    return {
      isHovering: false,
      akunMenu: false,
      modalShow: false,
      matpel: [],
      kelas: [],
      publisher: [],
      GroupKelas: [],
      GroupMatpel: [],
      pathModuleEdutore: 'https://storage.googleapis.com/edutore-cdn/public/module/thumb/',
      modules: [],
      perPage: 20,
      currentPage: 1,
      totalRows: 0,
      Filterspublishers: [],
      FilterMatpel: null,
      FilterKelas: null,
      FilterPublisher: null,
      filter: null,
      showSidebar: true,
      floatingSearch: false
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.auth.islogin,
      user: state => state.auth.user,
      photo: state => state.auth.photo
    }),
    filteredMatpel () {
      if (this.FilterMatpel) {
        return this.GroupMatpel.filter(
          item => item.name.toLowerCase().includes(this.FilterMatpel.toLowerCase())
        )
      }
      return this.GroupMatpel
    },
    filteredKelas () {
      if (this.FilterKelas) {
        return this.GroupKelas.filter(
          item => item.name.toLowerCase().includes(this.FilterKelas.toLowerCase())
        )
      }
      return this.GroupKelas
    },
    filteredPublisher () {
      if (this.FilterPublisher) {
        return this.publisher.filter(
          item => item.name.toLowerCase().includes(this.FilterPublisher.toLowerCase())
        )
      }
      return this.publisher
    }
  },
  watch: {
    currentPage () {
      const i = this.$route.query
      // eslint-disable-next-line no-console
      console.log(i)
      if (i) {
        const publisher = this.Filterspublishers
        const { matpel } = this
        const { kelas } = this
        this._acrtionFilterSoal(publisher, matpel, kelas)
      }
    }
  },
  mounted () {
    this.$store.dispatch('auth/getAuth')
    this._actionGetKelas()
    this._actionGetMataPelajaran()
    this._actionGetPublisher()
    this._actionGetModuleAll()
  },
  methods: {
    _actionSidebar () {
      if (this.showSidebar) {
        this.showSidebar = false
        document.getElementById('sidenav').style.display = 'none'
      } else {
        this.showSidebar = true
        document.getElementById('sidenav').style.display = 'block'
      }
    },
    _actionFilter () {
      const publisher = this.Filterspublishers
      const { matpel } = this
      const { kelas } = this
      this.$router.push({
        path: '/module?',
        query: { name: publisher, matpel, id: kelas }
      })
      setTimeout(() => {
        this._acrtionFilterSoal(publisher, matpel, kelas)
      }, 300)
      //
    },
    _acrtionFilterSoal (id, matpel, kelas) {
      this.$axios.get('')
    },
    _actionGetKelas () {
      this.$axios.get('https://api.edutore.com/api/v1/kelas')
        .then((response) => {
          if (response.data.success === 'true') {
            this.GroupKelas = response.data.data.rows
          }
        }).catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    _actionGetMataPelajaran () {
      this.$axios.get('https://api.edutore.com/api/v1/mata-pelajarans')
        .then((response) => {
          if (response.data.success === 'true') {
            this.GroupMatpel = response.data.data.rows
          }
        }).catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    _actionGetPublisher () {
      this.$axios.get('https://api.edutore.com/api/v1/publishers')
        .then((response) => {
          if (response.data.success === 'true') {
            this.publisher = response.data.data.rows
          }
        }).catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    _actionGetModuleAll () {
      this.$axios.get(`https://api.edutore.com/api/v1/modules/filter/status=0/kelas=0/mata_pelajaran=0/page=${this.currentPage}/limit=${this.perPage}`)
        .then((response) => {
          if (response.data.success === 'true') {
            this.modules = response.data.data.rows
          }
        }).catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    _actionModalOut () {
      this.modalShow = true
    },
    _actionLogout () {
      const info = firebase.auth().signOut()
      if (info) {
        this.$notify({
          group: 'foo',
          type: 'success',
          text: 'Berhasil Logout'
        })
        location.reload()
      } else {
        this.$notify({
          group: 'foo',
          type: 'warn',
          text: JSON.stringify(info)
        })
      }
    },
    _actionProfile () {
      this.$router.push({
        path: '/user'
      })
    },
    _formatPrice (n, currency) {
      return currency + n.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== ',' && (a.length - i) % 3 === 0 ? '.' + c : c
      })
    }
  }
}
</script>

<style scoped>
.floating-text {
  font-size: 16px;
  font-weight: bold;
  color: #000;
  padding: 0 5px;
}
.fqs__option_name_tick {
  height: 16px;
  background-color: #0095DA;
  margin: 0px 7px 0px 5px;
  border-radius: 4px;
}
.separator {
  width: 1px;
  height: 18px;
  border-left: 1px solid #E0E0E0;
  margin: 0px 3px;
  padding: 0px;
}
.fqs__option {
  display: flex;
  padding: 10px 0;
}
.fqs {
  position: fixed;
  z-index: 3000;
  box-sizing: border-box;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #FFFFFF;
  border-radius: 25px;
  box-shadow: 0px 0px 16px -4px rgba(0, 0, 0, 0.38);
  margin: 0px;
  padding: 0px 10px;
  overflow: hidden;
  font-size: 1.6rem;
  line-height: 1.2rem;
  list-style-type: none;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
}
.navbar-brand {
  display: inline-block;
  width: 155px;
  height: 51px;
  padding: .5rem 1rem;
  margin-right: 0;
  background-image: url('../../assets/img/edutore.png');
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 70px auto;
}
.toggle-sidebar {
  background-color: transparent;
  border: none;
}
.main-crown {
  width: 20px;
  height: 20px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1px;
  margin-right: 5px;
  margin-left: 15px;
}
.penerbit {
  margin: 10px 0;
  color: grey;
}
.detail-book img {
  margin: 0 auto;
  display: block;
  border-radius: 10px;
}
.price {
  font-size: 14px;
  color:#557CBF;
  font-family: ElliotSans-Medium;
  margin-left: 10px;
}
.split-text {
  font-size: 13px;
  color: #404040;
  font-weight: 600;
  margin: 10px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-height: 20px;
  max-height: 40px;
}
.list {
  color: rgba(0, 0, 0, 0.5);
  font-family: ElliotSans-Regular;
  display: flex;
  flex-direction: row;
  text-decoration: none;
}
.icon-accordion {
  color: #557CBE;
}
.title {
  font-size: 14px;
  color: #000;
  font-weight: bold;
}
.scroll {
  max-height: 250px;
  overflow: auto;
}
.scroll-kelas {
  max-height: 100px;
  overflow: auto;
}
.scroll-book {
  max-height: 850px;
  overflow: auto;
}
.accordion {
  height: 30px;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  padding: 0px;
}
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
    display: none;
}
.content-left {
  min-height: 410px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 24px;
  padding-bottom: 10px;
}
.content-right {
  min-height: 410px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 24px;
}
.input-group-prepend {
  padding: 10px;
}
.border-custom {
  padding-left: 30px;
  background-color: #F1F1F1;
  font-size: 14px;
  height: 30px;
}
.field-icon-top {
  margin-right: 10px;
  float: left;
  margin-left: 10px;
  margin-top: -25px;
  position: relative;
  z-index: 2;
}
.field-icon {
  margin-right: 10px;
  float: left;
  margin-left: 10px;
  margin-top: -25px;
  position: relative;
  z-index: 2;
}
.border-custom-top {
  min-width: 300px;
  border-radius: 20px;
  padding-left: 30px;
  font-size: 14px;
}
.border-custom-icon {
  border: 1px solid #ced4da;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.border-custom-icon-card {
  border: 1px solid #ced4da;
  background-color: #F1F1F1;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.logo {
  max-width: 40%;
  height: auto;
}
.bg-blues {
  background-color: white;
  border-bottom: 1px solid rgb(187, 187, 187);
}
.btn-block {
  border-radius: 8px;
  width: 120px
}
.detail-profile:hover {
  background-color: #007BFF;
}
.text-dropdown {
  color: #FFFFFF;
  margin: 10px ;
}
.navbar-brand {
  display: inline-block;
  width: 100px;
  height: 51px;
  padding: .5rem 1rem;
  margin-right: 0;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 80px auto;
}
.desktop {
  float: left;
}
.textLogin {
  color: #FFFFFF;
}
.picture {
  width: 20%;
  height: 20%;
  border-radius: 50%;
  border: 3px solid #577cbd;
}
.nav-item {
  color: rgba(0, 0, 0, 0.5);
  font-family: ElliotSans-Regular;
  margin-bottom: 5px;
  text-decoration: none;
}
@media (max-width: 575.98px) {
  .dropdown {
    display: none;
  }
  .desktop {
    display: none;
  }
}
@media (max-width: 767.98px) {
  .toggle-sidebar {
    display: none
  }
  .left-sidebar  {
    display: none !important
  }
  .split-text {
    min-height: 40px;
  }
  .penerbit {
    min-height: 0;
  }
}
@media (max-width: 768.98px) {
  .mobile {
    float: left;
    width: 50%;
  }
  .login {
    border-radius: 50px;
    padding: 5px 15px;
    margin-top: 20px;
  }
  .register {
    border-radius: 50px;
    padding: 5px 15px;
    margin-top: 20px;
    margin-left: 10px;
  }
    .profile {
    border-radius: 50px;
    padding: 2px 15px;
  }
  .signout {
    border-radius: 50px;
    padding: 2px 15px;
    margin-left: 10px;
  }
  .nav-link {
    color: #FFFFFF !important;
  }
}
</style>
