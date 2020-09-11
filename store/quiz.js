'use strict'
export const state = () => ({
  quizs: [],
  quiz: {},
  showDatas: false,
  showData: false,
  countDowntimmer: false,
  start_quiz: false,
  current_times: false,
  start_time: false,
  expireButton: false,
  count_soals: 0
})

export const actions = {
  async getQuiz ({ commit }) {
    await this.$axios.get('all-quiz')
      .then((res) => {
        if (res.status === 200) {
          commit('setShowQuiz', true)
          commit('setQuiz', res.data.data)
        }
      }).catch(() => {
        commit('setShowQuiz', true)
      })
  },
  getQuizId ({ commit }, data) {
    return this.$axios.get('all-quiz/' + data)
      .then((res) => {
        if (res.status === 200) {
          commit('setShowQuizId', true)
          commit('setQuizId', res.data)
          commit('setcountDowntimmer', res.data.countDowntimmer)
          commit('setStartquiz', res.data.start_quiz)
          commit('setCurrent_times', res.data.current_times)
          commit('setStart_time', res.data.start_time)
          commit('setExpireButton', res.data.expireButton)
          commit('setCountSoal', res.data.count_soals)
          return res.data
        }
      })
      .catch(() => {
        commit('setShowQuiz', true)
      })
  }
}

export const mutations = {
  setShowQuiz (state, data) {
    state.showDatas = data
  },
  setShowQuizId (state, data) {
    state.showData = data
  },
  setQuiz (state, data) {
    state.quizs = data
  },
  setQuizId (state, data) {
    state.quiz = data
  },
  setcountDowntimmer (state, data) {
    state.countDowntimmer = data
  },
  setStartquiz (state, data) {
    state.start_quiz = data
  },
  setCurrent_times (state, data) {
    state.current_times = data
  },
  setStart_time (state, data) {
    state.start_time = data
  },
  setExpireButton (state, data) {
    state.expireButton = data
  },
  setCountSoal (state, data) {
    state.count_soals = data
  }
}
