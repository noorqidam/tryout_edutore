<script>
import firebase from '~/services/fireinit'

export default {
  middleware: 'user',
  data () {
    return {
      User: null,
      photo: '',
      token: null
      // title: 'Tryout Edutore '
    }
  },
  // head () {
  //   return {
  //     title: this.title,
  //     meta: [
  //       { hid: 'description', name: 'description', content: 'tryout Edutore' }
  //     ]
  //   }
  // },
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.User = user.displayName
        this.photo = user.photoURL
        // eslint-disable-next-line no-console
        console.log(this.photo)
        this.title += user.displayName
        user.getIdToken(true).then((accesstoken) => {
          this.token = accesstoken
        })
      } else {
        this.$router.push('/login')
      }
    })
  }
}
</script>
