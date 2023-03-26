export const actions = {
  storeCheckout({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/api/web/checkout', payload)
        .then((response) => {
          resolve(response.data.data)
          // dispatch to cart
          dispatch('web/cart/getCartsData', null, { root: true })
        })

        .catch((error) => {
          reject(error)
        })
    })
  }
}
