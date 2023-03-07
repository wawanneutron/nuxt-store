// state
export const state = () => ({
  // categories
  categories: [],

  // page in categories
  page: 1,

  // category
  category: {},
});

// mutations
export const mutations = {
  // mutation "SET_CATEGORIES_DATA"
  SET_CATEGORIES_DATA(state, payload) {
    // set value to state "categories"
    state.categories = payload;
  },

  // mutation "SET_PAGE"
  SET_PAGE(state, payload) {
    state.page = payload;
  },

  // mutation "SET_CATEGORY_DATA"
  SET_CATEGORY_DATA(state, payload) {
    state.category = payload;
  },
};

// action
export const actions = {
  // get categoris data
  getCategoriesData({ commit, state }, payload) {
    // search
    let search = payload ? payload : "";

    // set promise
    return new Promise((resolve, reject) => {
      //fetching Rest API "/api/admin/categories" with method "GET"
      this.$axios
        .get(`/api/admin/categories?q=${search}&page=${state.page}`)
        // success
        .then((response) => {
          commit("SET_CATEGORIES_DATA", response.data.data);

          //resolve promise
          resolve();
        });
    });
  },

  // store category
  storeCategory({ dispatch }, payload) {
    // set promise
    return new Promise((resolve, reject) => {
      // store to Rest API "/api/admin/categories" with method "POST"
      this.$axios
        .post("/api/admin/categories", payload)

        // success
        .then(() => {
          // dispatch action "getCategoriesData"
          dispatch("getCategoriesData");

          // resolve promise
          resolve();
        })
        // error
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get detail category
  getDetailCategory({ commit }, payload) {
    // set promise
    return new Promise((resolve, reject) => {
      //get to Rest API "/api/admin/categories/:id" with method "GET"
      this.$axios
        .get(`/api/admin/categories/${payload}`)
        // success
        .then((response) => {
          // commit to mutation "SET_CATEGORY_DATA"
          commit("SET_CATEGORY_DATA", response.data.data);

          // resolve promise
          resolve();
        });
    });
  },

  // update cateogry
  updateCategory({ dispatch }, { categoryId, payload }) {
    // set promise
    return new Promise((resolve, reject) => {
      //store to Rest API "/api/admin/categories/:id" with method "POST"
      this.$axios
        .post(`/api/admin/categories/${categoryId}`, payload)
        // success
        .then(() => {
          // dispatch action "getCategoriesData"
          dispatch("getCategoriesData");

          // resolve promise
          resolve();
        })

        // error
        .catch((error) => {
          reject(error);
        });
    });
  },

  // destroy category
  destoryCategory({ dispatch, commit }, payload) {
    // set promise
    return new Promise((resolve, reject) => {
      // delete to Rest API "/api/admin/categories/:id" with method "DELETE"
      this.$axios
        .delete(`/api/admin/categories/${payload}`)
        // success
        .then(() => {
          // dispatch action "getCategoriesData"
          // melakukan fetching ulang
          dispatch("getCategoriesData");

          // resolve promise
          resolve();
        }) // error
        .catch((error) => {
          //alert
          if (error.message !== "Network Error") {
            //alert
            this.$swal.fire({
              title: "GAGAL!",
              text: `Category ini tidak boleh dihapus, karena ada product didalam category ini`,
              icon: "error",
              showConfirmButton: true,
            });
          } else {
            //alert
            this.$swal.fire({
              title: "GAGAL!",
              text: `Data Gagal Dihapus! ${error}`,
              icon: "error",
              showConfirmButton: true,
            });
          }

          // reject
          reject(error);
        });
    });
  },

  // get list all categories
  getListAllCategories({ commit }) {
    // set promise
    return new Promise((resolve, reject) => {
      // fetching Rest API "/api/web/categories" with method "GET"
      this.$axios
        .get("/api/web/categories")
        // success
        .then((response) => {
          // commit to mutation "SET_CATEGORIES_DATA"
          commit("SET_CATEGORIES_DATA", response.data.data);

          // resolve promise
          resolve();
        });
    });
  },
};
