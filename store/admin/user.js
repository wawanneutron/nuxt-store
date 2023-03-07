//state
export const state = () => ({
  //users
  users: [],

  //page
  page: 1,

  // user
  user: {},
});

//mutations
export const mutations = {
  //mutation "SET_USERS_DATA"
  SET_USERS_DATA(state, payload) {
    //set value state "users"
    state.users = payload;
  },

  //mutation "SET_PAGE"
  SET_PAGE(state, payload) {
    //set value state "page"
    state.page = payload;
  },

  // mutation "SET_USER_DATA"
  SET_USER_DATA(state, payload) {
    // set value state user
    state.user = payload;
  },
};

//actions
export const actions = {
  //get users data
  getUsersData({ commit, state }, payload) {
    //search
    let search = payload ? payload : "";

    //set promise
    return new Promise((resolve) => {
      //fetching Rest API "/api/admin/users" with method "GET"
      this.$axios
        .get(`/api/admin/users?q=${search}&page=${state.page}`)

        //success
        .then((response) => {
          //commit ti mutation "SET_USERS_DATA"
          commit("SET_USERS_DATA", response.data.data);

          //resolve promise
          resolve();
        });
    });
  },

  // store user
  storeUser({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/api/admin/users", payload)
        .then(() => {
          // dispatch action "getUsersData"
          dispatch("getUsersData");

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get detail user
  getDetailUser({ commit }, payload) {
    return new Promise((resolve) => {
      this.$axios.get(`/api/admin/users/${payload}`).then((response) => {
        // commit to mutation "SET_USER_DATA"
        commit("SET_USER_DATA", response.data.data);

        resolve();
      });
    });
  },

  // update user
  updateUser({ dispatch }, { userId, payload }) {
    return new Promise((resolve) => {
      this.$axios
        .post(`/api/admin/users/${userId}`, payload)
        .then(() => {
          // commit to mutation "SET_USER_DATA"
          dispatch("getUsersData");

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  //destroy user
  destroyUser({ dispatch }, payload) {
    //set promise
    return new Promise((resolve) => {
      //delete to Rest API "/api/admin/users/:id" with method "DELETE"
      this.$axios
        .delete(`/api/admin/users/${payload}`)

        //success
        .then(() => {
          //dispatch action "getUsersData"
          dispatch("getUsersData");

          //resolve promise
          resolve();
        });
    });
  },
};
