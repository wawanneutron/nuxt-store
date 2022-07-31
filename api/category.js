export default (ctx) => {
  let { $axios } = ctx;
  return {
    async getCategories(search, page) {
      const res = await $axios.get(
        `/api/admin/categories?q=${search}&page=${page}`
      );
      return res;
    },
  };
};
