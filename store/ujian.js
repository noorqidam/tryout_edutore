'use strict'
export const state = () => ({
  ujians: [],
  ujian: {},
  showDatas: false,
  showData: false
})

export const actions = {
  async getUjians ({ commit }) {
    await this.$axios.get('all-ujian')
      .then((res) => {
        if (res.status === 200) {
          commit('setShowUjians', true)
          commit('setUjians', res.data.data)
        }
      })
      .catch(() => {
        commit('setShowUjians', true)
      })
  },
  async getUjianId ({ commit }, data, token) {
    await this.$axios.get('all-ujian/' + data, { headers: { 'x-access-token': token } })
      .then((res) => {
        if (res.status === 200) {
          commit('setShowUjian', true)
          commit('setUjian', res.data.data)
        }
      })
      .catch(() => {
        commit('setShowUjians', true)
      })
  }
}

export const mutations = {
  setShowUjians (state, data) {
    state.showDatas = data
  },
  setShowUjian (state, data) {
    state.showData = data
  },
  setUjians (state, data) {
    state.ujians = data
  },
  setUjian (state, data) {
    state.ujian = data
  }
}
