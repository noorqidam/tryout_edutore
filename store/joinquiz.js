'use strict'
export const state = () => ({
  soals: [],
  quiz: {},
  showSoal: false
})

export const actions = {
  async getSoalQuiz ({ commit }) {
    await this.$axios.post('all-quiz')
      .then((res) => {
        if (res.status === 200) {
          commit('setShowSoalQuiz', true)
          commit('setSoalQuiz', res.data.data)
        }
      })
  }
}

export const mutations = {
  setShowSoalQuiz (state, data) {
    state.showSoal = data
  },
  setSoalQuiz (state, data) {
    state.soals = data
  }
}
