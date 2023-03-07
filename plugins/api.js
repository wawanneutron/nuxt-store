import category from "@/api/category";

export default (ctx, inject) => {
  let api = {};

  api.category = category(ctx);

  inject("api", api);
};
