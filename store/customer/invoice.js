// state
export const state = () => ({
  invoices: [],
  page: 1,
  invoice: {},
});

// mutations
export const mutations = {
  // mutation "SET_INVOICES_DATA"
  SET_INVOICES_DATA(state, payload) {
    state.invoices = payload;
  },

  SET_PAGE(state, payload) {
    state.page = payload;
  },

  SET_INVOICE_DATA(state, payload) {
    state.invoice = payload;
  },
};

// actions
export const actions = {
  // get invoices data
  getInvoicesData({ commit, state }, payload) {
    // search
    let search = payload ? payload : "";

    return new Promise((resolve) => {
      this.$axios
        .get(`/api/customer/invoices?q=${search}&page=${state.page}`)
        .then((response) => {
          commit("SET_INVOICES_DATA", response.data.data);
          resolve();
        });
    });
  },

  //get detail invoice
  getDetailInvoice({ commit }, payload) {
    //set promise
    return new Promise((resolve, reject) => {
      //get to Rest API "/api/customer/invoices/:snap_token" with method "GET"
      this.$axios
        .get(`/api/customer/invoices/${payload}`)

        //success
        .then((response) => {
          //commit to mutation "SET_INVOICE_DATA"
          commit("SET_INVOICE_DATA", response.data.data);

          //resolve promise
          resolve();
        });
    });
  },
};
