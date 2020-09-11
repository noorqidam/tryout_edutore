<template>
  <div style="padding-top: 75px" class="bg-custom">
    <div class="container card-profile">
      <div class="row">
        <div class="col-md-12 text-center mt-2 bg-owl">
          <img v-if="photo" :src="photo" class="profile-img">
          <img v-else src="~/assets/img/edu-wink.gif" class="profile-img" alt="~/assets/img/edu-wink.gif">
          <div class="row justify-content-center mt-3">
            <!-- <font-awesome-icon class="mr-1" icon="user-circle" style="font-size: 16px;" /> -->
            <!-- <i class="fa fa-user" /> -->
            <h6>{{ username }}</h6>
          </div>
        </div>
        <TabsComponent active="2" />
        <div class="col-md-12">
          <div class="row justify-content-center">
            <div class="col-3">
              <button @click="_actionListerTab('histori-ujian')" class="btn btn-custom btn-block">
                Histori Ujian
              </button>
            </div>
            <div class="col-3">
              <button @click="_actionListerTab('histori-quiz')" class="btn btn-custom btn-block">
                Histori Quiz
              </button>
            </div>
            <div class="col-3">
              <button @click="_actionListerTab('histori-transaksi-module')" class="btn btn-custom btn-block">
                Histori Transaksi Module
              </button>
            </div>
            <div class="col-3">
              <button @click="_actionListerTab('histori-transaksi-langganan')" class="btn btn-custom btn-block">
                Histori Transaksi Langganan
              </button>
            </div>
          </div>
        </div>
        <div v-if="tabIndex === 'histori-ujian'" class="col-md-12">
          <HistoriUjian />
        </div>
        <div v-else-if="tabIndex === 'histori-quiz'" class="col-md-12">
          <HistoriQuiz />
        </div>
        <div v-else-if="tabIndex === 'histori-transaksi-module'" class="col-md-12">
          <HistoriTransaksiModule />
        </div>
        <div v-else-if="tabIndex === 'histori-transaksi-langganan'" class="col-md-12">
          <HistoriTransaksiLangganan />
        </div>
        <div v-else class="col-md-12">
          <HistoriUjian />
        </div>
      </div>
    </div>
    <div v-if="tabIndex === 'histori-ujian'" class="container">
      <CampaignUjian />
    </div>
    <div v-else-if="tabIndex === 'histori-quiz'" class="container">
      <CampaignQuiz />
    </div>
    <div v-else-if="tabIndex === 'histori-transaksi-module'" class="container">
      <CampaignModule />
    </div>
    <div v-else-if="tabIndex === 'histori-transaksi-langganan'" class="container">
      <CampaignLangganan />
    </div>
    <div v-else class="container">
      <CampaignUjian />
    </div>
  </div>
</template>

<script>
import firebase from '~/services/fireinit'
const TabsComponent = () => import('~/components/profile/tab')
const HistoriUjian = () => import('~/components/profile/historiUjian')
const HistoriQuiz = () => import('~/components/profile/historiQuiz')
const HistoriTransaksiModule = () => import('~/components/profile/historiTransaksiModule')
const HistoriTransaksiLangganan = () => import('~/components/profile/historiTransaksiLangganan')
const CampaignUjian = () => import('~/components/campaign/CampaignUjian')
const CampaignQuiz = () => import('~/components/campaign/CampaignQuiz')
const CampaignModule = () => import('~/components/campaign/CampaignModul')
const CampaignLangganan = () => import('~/components/campaign/CampaignLangganan')
export default {
  name: 'Histori',
  components: {
    TabsComponent,
    HistoriUjian,
    HistoriQuiz,
    HistoriTransaksiModule,
    HistoriTransaksiLangganan,
    CampaignUjian,
    CampaignQuiz,
    CampaignModule,
    CampaignLangganan
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
  .bg-custom {
    background-image: var(--emc);
  }
  .bg-owl {
    background-image: var(--owl);
    background-position-x: -425px;
    background-position-y: 70px;
  }
  .btn-custom {
    padding: 0;
    border-radius: 10px;
    background-color: #1387BD;
    margin: auto;
    min-height: 43px;
    color: #fff;
    text-align: center;
    box-shadow: rgba(70,70,70,0.4) 3px 3px 8px,
    rgba(255,255,255,1) -3px -3px 8px;
  }
  .btn-custom:hover {
    background-color: #fff;
    box-shadow: 0px 5px 15px rgb(30, 156, 215);
    color: #1387bd;
  }
</style>
