<template>
  <div style="padding-top: 75px" class="bg-custom">
    <div class="container card-profile">
      <div class="row">
        <div class="col-md-12 text-center mt-2 bg-owl">
          <img v-if="photo" :src="photo" class="profile-img">
          <img v-else src="~/assets/img/edu-wink.gif" class="profile-img" alt="~/assets/img/edu-wink.gif">
          <div class="row justify-content-center mt-3">
            <h6>{{ username }}</h6>
          </div>
        </div>
        <TabsComponent active="3" />
        <div class="col-md-12">
          <div class="row justify-content-center">
            <div class="col-6 btn">
              <button @click="_actionListerTab('module-saya')" type="button" class="button-custom col-6">
                Koleksi Modul Saya
              </button>
            </div>
            <div class="col-6 btn">
              <button @click="_actionListerTab('langganan-saya')" type="button" class="button-custom col-6">
                Koleksi Langganan Saya
              </button>
            </div>
          </div>
        </div>
        <div v-if="tabIndex === 'module-saya'" class="col-md-12">
          <KoleksiModule />
        </div>
        <div v-else-if="tabIndex === 'langganan-saya'" class="col-md-12">
          <KoleksiLangganan />
        </div>
        <div v-else class="col-md-12">
          <KoleksiModule />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/services/fireinit'
const TabsComponent = () => import('~/components/profile/tab')
const KoleksiModule = () => import('~/components/profile/koleksiModule')
const KoleksiLangganan = () => import('~/components/profile/koleksiLangganan')
export default {
  name: 'Koleksi',
  components: {
    TabsComponent,
    KoleksiModule,
    KoleksiLangganan
  },
  data () {
    return {
      tabIndex: null,
      username: '',
      phone: null,
      photo: '',
      token: null,
      title: 'Tryout Edutore '
    }
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.username = user.displayName
        this.photo = user.photoURL
        this.phone = user.phoneNumber
        // eslint-disable-next-line no-console
        console.log(user)
        this.title += user.displayName
        user.getIdToken(true).then((accesstoken) => {
          this.token = accesstoken
        })
      } else {
        this.$router.push('/login')
      }
    })
  },
  methods: {
    _actionListerTab (tabIndex) {
      this.$router.push({
        query: { title: tabIndex }
      })
      this.tabIndex = tabIndex
    }
  }
}
</script>
<style>
  @import "../../../components/profile/backgroundImg64.css";
  .card-profile{
    min-height: 650px;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    margin-bottom: 15px;
    background-color: #fff;
  }
  .profile-img {
    width: 150px;
    border-radius: 75px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  }
  .button-custom {
    min-height: 43px;
    font-size: 14px;
    color: #fff;
    background-color: #1387bd;
    border: none;
    border-radius: 10px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    border: none
  }
  .button-custom:hover {
    background-color: #fff;
    box-shadow: 0px 5px 15px rgb(30, 156, 215);
    color: #1387bd;
    transform: translateY(-6px);
  }
  .bg-custom {
    background-image: var(--emc);
  }
  .bg-owl {
    background-image: var(--owl);
    background-position-x: -425px;
    background-position-y: 70px;
  }
</style>
