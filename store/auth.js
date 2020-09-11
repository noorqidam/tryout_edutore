'use strict'
import firebase from '~/services/fireinit'

export const state = () => ({
  user: null,
  email: null,
  photo: null,
  token: null,
  logout: false,
  islogin: false,
  isModalinfo: false,
  Loading: true
})

export const actions = {
  login ({ commit }, user) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((response) => {
        commit('setAuth', response.user.displayName)
        commit('setPhoto', response.user.photoURL)
        commit('setEmail', user.email)
        commit('setIslogin', true)
        commit('setLoading', false)
        this.$axios.defaults.headers.common['x-access-token'] = response.accesstoken
      })
      .catch(() => {

      })
  },
  getAuth ({ commit }) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        commit('setAuth', user.displayName)
        commit('setPhoto', user.photoURL)
        commit('setEmail', user.email)
        commit('setIslogin', true)
        user.getIdToken(true).then((accesstoken) => {
          commit('setAuthtoken', accesstoken)
          this.$axios.defaults.headers.common['x-access-token'] = accesstoken
        })
        return user
      } else {
        // eslint-disable-next-line no-console
        console.log('Nobody User is login here')
        commit('setIslogin', false)
      }
    })
  },
  updateToken ({ commit, token }) {
    // eslint-disable-next-line no-console
    console.log('update token' + token)
    commit('setAuthtoken', token)
  },
  refreshToken ({ commit }) {
    return firebase.auth().currentUser.getIdToken(true).then((accesstoken) => {
      if (accesstoken) {
        commit('setAuthtoken', accesstoken)
        commit('setIslogin', true)
        return accesstoken
      } else {
        commit('setIslogin', false)
      }
    })
  },
  async logout ({ commit }) {
    const logout = await firebase.auth().signOut()
    if (logout) {
      commit('setUserLogout', true)
      commit('setAuth', null)
      commit('setPhoto', null)
      commit('setIslogin', false)
    }
  }
}

export const mutations = {
  setAuth (state, data) {
    state.user = data
  },
  setEmail (state, data) {
    state.email = data
  },
  setPhoto (state, data) {
    state.photo = data
  },
  setAuthtoken (state, data) {
    state.token = data
  },
  setIslogin (state, data) {
    state.islogin = data
  },
  setUserLogout (state, data) {
    state.logout = data
  },
  setLoading (state, data) {
    state.Loading = data
  }
}
