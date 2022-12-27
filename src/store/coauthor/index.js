import axios from 'axios'
export const state = () => ({
    coautor: 2022
})
export const getters = {}

export const actions = {
    async getCoauthor() {
        const result = await axios.get('https://back-sucupira-ppgi.herokuapp.com/integrante/')
        return result.data
    },
    async addCoauthor(_, data) {
        const result = await axios.post('https://back-sucupira-ppgi.herokuapp.com/integrante/', data)
        return result.data
    },
    async editCoauthor(_, payload) {
        console.log(payload)
        const result = await axios.patch(`https://back-sucupira-ppgi.herokuapp.com/integrante/${payload.id}`, payload.data)
        return result.data
    },
    async deleteCoauthor(_, id) {
        await axios.delete(`https://back-sucupira-ppgi.herokuapp.com/integrante/${id}`)
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