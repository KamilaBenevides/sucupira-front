import axios from 'axios'
export const state = () => ({
})
export const getters = {
}
export const actions = {
    async getEvents() {
        const result = await axios.get('https://back-sucupira-ppgi.herokuapp.com/conferencia/')
        return result.data
    },
    async getEventsId(_, id) {
        const result = await axios.get(`https://back-sucupira-ppgi.herokuapp.com/conferencia/${id}/`)
        return result.data
    },
    async getJornal() {
        const result = await axios.get('https://back-sucupira-ppgi.herokuapp.com/periodico/')
        return result.data
    },
    async getJornalId(_, id) {
        const result = await axios.get(`https://back-sucupira-ppgi.herokuapp.com/periodico/${id}/`)
        return result.data
    },
    async getProducts() {
        const result = await axios.get('https://back-sucupira-ppgi.herokuapp.com/producao/')
        return result.data
    },
    async addProduction(_, data) {
        const result = await axios.post('https://back-sucupira-ppgi.herokuapp.com/producao/', data)
        return result.data
    },
    async EditProduction(_, payload) {
        const result = await axios.patch(`https://back-sucupira-ppgi.herokuapp.com/producao/${payload.id}`, payload.data)
        return result.data
    },
    async deleteProduction(_, id) {
        await axios.delete(`https://back-sucupira-ppgi.herokuapp.com/producao/${id}/`)
    }
}
export const mutations = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }