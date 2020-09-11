<template>
  <div style="background-color: #FAFAFA">
    <b-modal
      v-model="modalShow"
      size="md"
      centered=""
      hide-footer=""
      hide-header=""
      body-bg-variant="default"
    >
      <div class="row justify-content-center">
        <div class="col-md-12 justify-content-center">
          <h3 class="text-center">
            Apakah Anda Ingin Keluar ?
          </h3>
        </div>
        <div class="row">
          <div class="col md-6">
            <button @click="modalShow=false" class="btn btn-warning btn-lg btn-block">
              Tidak
            </button>
          </div>
          <div class="col md-6">
            <button @click="_actionLogout" class="btn btn-primary btn-lg btn-block">
              Ya
            </button>
          </div>
        </div>
      </div>
    </b-modal>
    <notifications group="foo" position="top right" />
    <notifications group="welcome" position="top center" />
    <notifications group="notifheader" position="top right" />

    <nav class="navbar navbar-expand-sm navbar-light bg-blues is-desktop fixed-top">
      <div class="container align-items-end">
        <a class="navbar-brand" href="/"><img src="~/assets/img/edutore.png" class="img-fluid" alt="~/assets/img/edutore.png"></a>
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse id="nav-collapse" is-nav>
          <ul class="navbar-nav ml-auto">
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
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import firebase from '~/services/fireinit'
const Footer = () => import('~/components/footer/footer')
export default {
  name: 'Header',
  components: { Footer },
  data () {
    return {
      isHovering: false,
      akunMenu: false,
      modalShow: false
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.auth.islogin,
      user: state => state.auth.user,
      photo: state => state.auth.photo
    })
  },
  beforeCreate () {
    this.$store.dispatch('auth/getAuth')
  },
  methods: {
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
    border-bottom: 1px solid rgb(187, 187, 187);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
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
    width: 200px
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
