<template>
  <div style="padding-top: 75px" class="bg-custom">
    <div class="container card-profile">
      <div class="row">
        <div class="col-md-12 text-center mt-2 bg-owl">
          <img v-if="photo" :src="photo" class="profile-img">
          <img v-else src="~/assets/img/edu-wink.gif" class="profile-img" alt="~/assets/img/edu-wink.gif">
          <div class="row justify-content-center mt-3">
            <!-- <font-awesome-icon class="mr-1" icon="user-circle" style="font-size: 16px;" /> -->
            <h6>{{ username }}</h6>
          </div>
        </div>
        <TabsComponent active="1" />
        <ProfileUpdate class="pb-3" />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/services/fireinit'
const TabsComponent = () => import('~/components/profile/tab')
const ProfileUpdate = () => import('~/components/profile/updateProfile')
export default {
  name: 'Profile',
  components: {
    TabsComponent,
    ProfileUpdate
  },
  data () {
    return {
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
  }
}
</script>
<style>
  @import "../../../components/profile/backgroundImg64.css";
  .card-profile {
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
</style>
