import Vue from 'vue'
import Vuex from 'vuex'
import coautor from './coauthor'
import user from './user'
import teachers from './teachers'
import production from './production'
import { getField, updateField } from 'vuex-map-fields'
import VuexPersistence from 'vuex-persist'

const vuexPersist = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export const storeOptions = {
  strict: true,
  getters: {
    getField
  },
  mutations: {
    updateField
  },
  modules: {
    coautor,
    user,
    teachers,
    production
  },
  plugins: [vuexPersist.plugin]
}

export default new Vuex.Store(storeOptions)