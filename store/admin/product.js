export const state = () => ({
  // products
  products: [],

  // page
  page: 1,

  // product
  product: {},
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

  // mutation "SET_PRODUCT_DATA"
  SET_PRODUCT_DATA(state, payload) {
    // set value state "product"
    state.product = payload;
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

  // store product
  storeProduct({ dispatch }, payload) {
    // set promise
    return new Promise((resolve, reject) => {
      // store to Rest API "/api/admin/products" with method "POST"
      this.$axios
        .post("/api/admin/products", payload)
        .then(() => {
          dispatch("getProductsData");
          // resolve
          resolve();
        })
        // error
        .catch((error) => {
          // reject
          reject(error);
        });
    });
  },

  // get detail product
  getDetailProduct({ commit }, payload) {
    return new Promise((resolve) => {
      // get to Rest API "api/admin/products/:id" GET
      this.$axios.get(`api/admin/products/${payload}`).then((response) => {
        // commit to mutatation
        commit("SET_PRODUCT_DATA", response.data.data);

        // resolve promise
        resolve();
      });
    });
  },

  // update product
  updateProduct({ dispatch }, { productId, payload }) {
    return new Promise((resolve, reject) => {
      // store to rest API "api/admin/products/:id" POST
      this.$axios
        .post(`api/admin/products/${productId}`, payload)
        .then(() => {
          // dispatch to actions "getProductsData"
          dispatch("getProductsData");

          // resolve promise
          resolve();
        })
        .catch((error) => {
          // reject
          reject(error);
        });
    });
  },

  // delete product
  destroyProduct({ dispatch }, payload) {
    // set promise
    return new Promise((resolve) => {
      // delete to Rest API "/api/admin/products/:id" with method "DELETE"
      this.$axios
        .delete(`/api/admin/products/${payload}`)
        // success
        .then(() => {
          // dispatch action "getProductsData"
          dispatch("getProductsData");

          // resolve promise
          resolve();
        });
    });
  },
};
