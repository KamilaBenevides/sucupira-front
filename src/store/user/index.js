// import axios from 'axios'

export const state = () => ({
    coautor: 2022,
    userLogin: false
})
export const getters = {
    login(state) {
        return state.userLogin
    }
}

export const actions = {
    login({ commit, state }) {
        commit('login', state.userLogin)
    }
}
export const mutations = {
    login (state, data) {
        state.userLogin = !data
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }