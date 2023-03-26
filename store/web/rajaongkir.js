export const state = () => ({
  provinces: [],
  cities: [],
  costs: [],
  status: {}
})

export const mutations = {
  SET_PROVINCES_DATA(state, payload) {
    state.provinces = payload
  },

  SET_CITIES_DATA(state, payload) {
    state.cities = payload
  },

  SET_COSTS_DATA(state, payload) {
    state.costs = payload
  },

  SET_RESPONSE_STATUS(state, payload) {
    state.status = payload
  }
}

export const actions = {
  getProvincesData({ commit }) {
    return new Promise((resolve) => {
      this.$axios.get('/api/web/rajaongkir/provinces').then((response) => {
        commit('SET_PROVINCES_DATA', response.data.data)
        resolve()
      })
    })
  },

  getCitiesData({ commit }, payload) {
    return new Promise((resolve) => {
      this.$axios
        .post('/api/web/rajaongkir/cities', payload)
        .then((response) => {
          commit('SET_CITIES_DATA', response.data.data)
          resolve()
        })
    })
  },

  getOngkirData({ commit }, payload) {
    return new Promise((resolve) => {
      this.$axios
        .post('/api/web/rajaongkir/check-ongkir', payload)
        .then((response) => {
          commit('SET_RESPONSE_STATUS', response.data.data?.status)
          commit('SET_COSTS_DATA', response.data.data?.results?.[0]?.costs)
          resolve()
        })
    })
  }
}
