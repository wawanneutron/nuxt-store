<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"
                  ><i class="fa fa-folder"></i> ADD NEW PRODUCT</span
                >
              </div>
              <div class="card-body">
                <form @submit.prevent="storeProduct">
                  <div class="form-group">
                    <label>GAMBAR</label>
                    <input
                      @change="handleFileImage"
                      type="file"
                      class="form-control"
                    />
                    <div v-if="validation.image" class="mt-2">
                      <b-alert show variant="danger">{{
                        validation.image[0]
                      }}</b-alert>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>NAMA PRODUCT</label>
                        <input
                          v-model="product.title"
                          type="text"
                          placeholder="Masukkan Nama Product"
                          class="form-control"
                        />
                        <div v-if="validation.title" class="mt-2">
                          <b-alert show variant="danger">{{
                            validation.title[0]
                          }}</b-alert>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>CATEGORY</label>
                        <select
                          class="form-control"
                          v-model="product.category_id"
                        >
                          <option value="">-- select category --</option>
                          <option
                            v-for="category in categories"
                            :key="category.id"
                            :value="category.id"
                          >
                            {{ category.name }}
                          </option>
                        </select>
                        <div v-if="validation.category_id" class="mt-2">
                          <b-alert show variant="danger">{{
                            validation.category_id[0]
                          }}</b-alert>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>WEIGHT (Gram)</label>
                        <input
                          v-model="product.weight"
                          type="number"
                          placeholder="Masukkan Berat Product (Gram)"
                          class="form-control"
                        />
                        <div v-if="validation.weight" class="mt-2">
                          <b-alert show variant="danger">{{
                            validation.weight[0]
                          }}</b-alert>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>STOCK</label>
                        <input
                          v-model="product.stock"
                          type="number"
                          placeholder="Masukkan Stock Product"
                          class="form-control"
                        />
                        <div v-if="validation.stock" class="mt-2">
                          <b-alert show variant="danger">{{
                            validation.stock[0]
                          }}</b-alert>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label>DESCRIPTION</label>
                    <client-only placeholder="loading...">
                      <ckeditor-nuxt
                        v-model="product.description"
                        :config="editorConfig"
                      />
                    </client-only>
                    <div v-if="validation.description" class="mt-2">
                      <b-alert show variant="danger">{{
                        validation.description[0]
                      }}</b-alert>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>PRICE</label>
                        <input
                          v-model="product.price"
                          type="number"
                          placeholder="Masukkan Harga Product"
                          class="form-control"
                        />
                        <div v-if="validation.price" class="mt-2">
                          <b-alert show variant="danger">{{
                            validation.price[0]
                          }}</b-alert>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>DISCOUNT (%)</label>
                        <input
                          v-model="product.discount"
                          type="number"
                          placeholder="Masukkan Discount Product (%)"
                          class="form-control"
                        />
                        <div v-if="validation.discount" class="mt-2">
                          <b-alert show variant="danger">{{
                            validation.discount[0]
                          }}</b-alert>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button class="btn btn-info mr-1 btn-submit" type="submit">
                    <i class="fa fa-paper-plane"></i> SAVE
                  </button>
                  <button class="btn btn-warning btn-reset" type="reset">
                    <i class="fa fa-redo"></i> RESET
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  // layout
  layout: "admin",

  // meta
  head() {
    return {
      title: "Add New Product - Administrator",
    };
  },

  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },

  data() {
    return {
      // state product
      product: {
        image: "",
        title: "",
        category_id: "",
        weight: "",
        stock: "",
        description: "",
        price: "",
        discount: "",
      },

      // state validation
      validation: [],

      // config CKEDITOR
      editorConfig: {
        removePlugins: ["Title"],
      },
    };
  },

  // hook "asyncData"
  async asyncData({ store }) {
    // get all data categories
    await store.dispatch("admin/category/getListAllCategories");
  },

  // computed
  computed: {
    // get data categories
    categories() {
      return this.$store.state.admin.category.categories;
    },
  },

  mounted() {
    console.log(this.categories);
  },

  // methods
  methods: {
    handleFileImage(event) {
      // get image
      let image = (this.product.image = event.target.files[0]);
      const kb = Math.round(+image.size / 1024).toFixed(2);
      const mb = Math.round(+image.size / 1024 / 1000).toFixed(2);

      // check size image not allowed > 1 mb
      if (kb > 1000) {
        // clear value and set  null
        event.target.value = null;

        // clear state image
        this.product.image = null;

        //show sweet alert
        this.$swal.fire({
          title: "OOPS!",
          text: `Ukuran gambar kamu ${mb} MB, upload ulang dengan ukuran kurang dari 1 mb`,
          icon: "error",
        });
      }

      // check file type
      if (!image.type.match("image.*")) {
        // if fileType no allowed, then clear value and set null
        event.target.value = "";
        // set state to null
        this.product.image = null;

        //show sweet alert
        this.$swal.fire({
          title: "OOPS!",
          text: "Format File Tidak Didukung!",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },

    // method save product
    async storeProduct() {
      // define form data
      let formData = new FormData();

      formData.append("image", this.product.image);
      formData.append("title", this.product.title);
      formData.append("category_id", this.product.category_id);
      formData.append("description", this.product.description);
      formData.append("weight", this.product.weight);
      formData.append("price", this.product.price);
      formData.append("stock", this.product.stock);
      formData.append("discount", this.product.discount);

      // sending data to action "storeProduct" vuex
      await this.$store
        .dispatch("admin/product/storeProduct", formData)
        .then((response) => {
          console.log(response);
          //sweet alert
          this.$swal.fire({
            title: "BERHASIL!",
            text: "Data Berhasil Disimpan!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          /*
          if sending data to server is success
          and then redirect route "admin-product"
         */
          this.$router.push({
            name: "admin-products",
          });
        })
        .catch((error) => {
          // if sending data is failed, return error
          this.validation = error.response.data;
        });
    },
  },
};
</script>

<style>
.ck-editor__editable {
  min-height: 200px;
}
</style>
