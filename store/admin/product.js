export const state = () => ({
  // products
  products: [],

  // page
  page: 1,
});

// mutations
export const mutations = {
  // mutation "SET_PRODUCTS_DATA"
  SET_PRODUCTS_DATA(state, payload) {
    // set value state "products"
    state.products = payload;
  },

  // mutation "SET_PAGE"
  SET_PAGE(state, payload) {
    // set value state "page"
    state.page = payload;
  },
};

// actions
export const actions = {
  // get product data
  getProductsData({ commit, state }, payload) {
    // search
    let search = payload ? payload : "";

    // set promise
    return new Promise((resolve, reject) => {
      //fetching Rest API "/api/admin/products" with method "GET"
      this.$axios
        .get(`/api/admin/products?q=${search}&page=${state.page}`)
        .then((response) => {
          // commit == mutation
          // commit to mutation "SET_PRODUCTS_DATA"
          commit("SET_PRODUCTS_DATA", response.data.data);

          // resolve promise
          resolve();
        });
    });
  },
};
