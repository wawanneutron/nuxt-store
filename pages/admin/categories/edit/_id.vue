<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"
                  ><i class="fa fa-folder"></i> EDIT CATEGORY</span
                >
              </div>
              <div class="card-body">
                <form @submit.prevent="updateCategory">
                  <div class="form-group">
                    <div>
                      <img :src="previewImage" width="200" alt="" />
                    </div>
                    <label>GAMBAR</label>
                    <input
                      @change="handleFileUpload"
                      type="file"
                      class="form-control"
                    />
                    <div v-if="validation.name" class="mt-2">
                      <b-alert show variant="danger">{{
                        validation.name[0]
                      }}</b-alert>
                    </div>
                  </div>

                  <div class="form-group">
                    <label>NAMA CATEGORY</label>
                    <input
                      v-model="category.name"
                      type="text"
                      placeholder="Masukkan Nama Category"
                      class="form-control"
                    />
                    <div v-if="validation.name" class="mt-2">
                      <b-alert show variant="danger">{{
                        validation.name[0]
                      }}</b-alert>
                    </div>
                  </div>

                  <button class="btn btn-info mr-1 btn-submit" type="submit">
                    <i class="fa fa-paper-plane"></i> UPDATE
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
      title: "Edit Category  - Administrator",
    };
  },

  data() {
    return {
      // state category
      category: {
        image: "",
        name: "",
      },

      previewImage: "",

      // set validation
      validation: [],
    };
  },

  // hook "asyncData"
  async asyncData({ store, route }) {
    await store.dispatch("admin/category/getDetailCategory", route.params.id);
  },

  // mounted
  // data dieksekusi ketika template di render
  mounted() {
    this.category.name = this.$store.state.admin.category.category.name;
    this.previewImage = this.$store.state.admin.category.category.image;
  },

  // method
  methods: {
    //handle file upload
    handleFileUpload(event) {
      //get image
      let image = (this.category.image = event.target.files[0]);

      //check fileType
      if (!image.type.match("image.*")) {
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

    // method update category
    async updateCategory() {
      //define formData
      let formData = new FormData();

      formData.append("image", this.category.image);
      formData.append("name", this.category.name);
      formData.append("_method", "PATCH");

      //sending data to action "updateCategory" vuex
      await this.$store
        .dispatch("admin/category/updateCategory", {
          categoryId: this.$route.params.id,
          payload: formData,
        })
        //success
        .then(() => {
          //sweet alert
          this.$swal.fire({
            title: "BERHASIL!",
            text: "Data Berhasil Diupdate!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          //redirect route "admin-categories"
          this.$router.push({
            name: "admin-categories",
          });
        })

        //error
        .catch((error) => {
          //assign error to state "validation"
          this.validation = error.response.data;
        });
    },
  },
};
</script>
