// actions
export const actions = {
  // store register
  storeRegister({}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/api/customer/register", payload)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
