<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-light bg-blues is-desktop fixed-top">
      <div class="container align-items-end">
        <a class="navbar-brand" href="/"><img src="~/assets/img/edutore.png" class="img-fluid" alt="~/assets/img/edutore.png"></a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div
          id="navbarSupportedContent"
          class="collapse navbar-collapse"
        >
          <ul class="navbar-nav ml-auto">
            <!-- <li class="nav-item nav-top-item active">
              <a class="nav-link" href="/">Beranda</a>
            </li> -->
            <li v-if="User" class="nav-item nav-top-item dropdown">
              <b-nav-item-dropdown :text="User" right>
                <div style="min-width: 250px;" class="p-4">
                  <li role="presentation">
                    <nuxt-link to="/user" class="btn btn-primary btn-sm btn-block">
                      <p class="text-dropdown">
                        Profile
                      </p>
                    </nuxt-link>
                  </li>
                  <li role="presentation">
                    <nuxt-link to="/profiles" class="btn btn-primary btn-sm btn-block">
                      <p class="text-dropdown">
                        History
                      </p>
                    </nuxt-link>
                  </li>
                </div>
                <hr style="margin: 0 !important">
                <a @click="_actionLogout" class="dropdown-item text-center" style="cursor:pointer">
                  <font-awesome-icon icon="sign-out-alt" />
                  Keluar</a>
              </b-nav-item-dropdown>
            </li>
            <!-- <li v-if="User" class="nav-item nav-top-item dropdown">
              <div class="dropdown-menu dropdown-menu-right text-center show" style="width: 300px">
                <div data-v-b9b00140="" class="p-4">
                  <div data-v-b9b00140="" class="nav-akun mb-3">
                    <img data-v-b9b00140="" src="https://lh4.googleusercontent.com/-W0xULtTP5yY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfYlSW6Y-luzsT364AIuV8PRU3zIw/mo/photo.jpg" alt="" class="img-fluid">
                  </div>
                  <a data-v-b9b00140="" href="/users/my-modules" class="btn btn-primary btn-sm btn-block">Lihat Akun Saya</a>
                  <a data-v-b9b00140="" href="/users/profile" class="btn btn-primary btn-sm btn-block">Ubah &amp; Lihat Data Profil</a>
                  <a data-v-b9b00140="" href="/users/history-order/modules" class="btn btn-primary btn-sm btn-block">Histori Transaksi Modul</a>
                  <a data-v-b9b00140="" href="/users/history-order/langganan" class="btn btn-primary btn-sm btn-block">Histori Transaksi Langganan</a>
                </div>
                <div data-v-b9b00140="" class="dropdown-divider" />
                <a data-v-b9b00140="" href="javascript:void(0)" class="dropdown-item">Logout <i data-v-b9b00140="" class="fas fa-sign-out-alt" />
                </a>
              </div>
            </li> -->
            <li v-else>
              <!-- <a href="#/login" class="nav-link"> Login </a> -->
              <nuxt-link :to="{ path :'/login'}" lass="nav-link">
                Login
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import firebase from '~/services/fireinit'
export default {
  name: 'Header',
  data () {
    return {
      cart: [],
      // User: null,
      // photo: '',
      isHovering: false,
      akunMenu: false
    }
  },
  computed: {
    ...mapState({
      User: state => state.auth.user,
      photo: state => state.auth.photo
    })
  },
  beforeCreate () {
    this.$store.dispatch('auth/getAuth').then((response) => {
      // eslint-disable-next-line no-console
      console.log('get Info Login ' + response)
    })
  },
  methods: {
    _actionLogout () {
      this.$store.dispatch('auth/logout')
        .then(() => {
          this.$router.push('/login')
        })
    }
  }
}
</script>
<style scoped>
  .img-fluid {
    max-width: 40%;
    height: auto;
  }
  .bg-blues {
    background-color: white;
    border-bottom: 1px solid gray;
  }
  .btn-primary {
    background-color: #557CBF;
    margin: 0  0 10px 0;
    border-radius: 10px;
  }
  .detail-profile:hover {
    background-color: #007BFF;
  }
  .text-dropdown {
    color: #FFFFFF;
    margin: 10px ;
  }
</style>
