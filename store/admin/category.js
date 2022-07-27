// state
export const state = () => ({
  // categories
  categories: [],

  // page in categories
  page: 1,
});

// mutations
export const mutations = () => ({
  // mutation "SET_CATEGORIES_DATA"
  SET_CATEGORIS_DATA(state, payload) {
    // set value to state "categories"
    state.categories = payload;
  },

  // mutation "SET_PAGE"
  SET_PAGE(state, payload) {
    state.page = payload;
  },
});

// action
export const actions = () => ({
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
          commit("SET_CATEGORIS_DATA", response.data.data);

          //resolve promise
          resolve();
        });
    });
  },
});
