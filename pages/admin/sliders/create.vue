<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"
                  ><i class="fa fa-folder"></i> ADD NEW SLIDER</span
                >
              </div>
              <div class="card-body">
                <form @submit.prevent="storeSlider">
                  <div class="form-group">
                    <label>GAMBAR</label>
                    <input
                      type="file"
                      @change="handleFileChange"
                      class="form-control"
                    />
                    <div v-if="validation.image" class="mt-2">
                      <b-alert show variant="danger">{{
                        validation.image[0]
                      }}</b-alert>
                    </div>
                  </div>

                  <div class="form-group">
                    <label>LINK SLIDER</label>
                    <input
                      type="text"
                      v-model="slider.link"
                      placeholder="Masukkan Link Slider"
                      class="form-control"
                    />
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
  //layout
  layout: "admin",

  //meta
  head() {
    return {
      title: "Add New Slider - Administrator",
    };
  },

  data() {
    return {
      //state slider
      slider: {
        image: "",
        link: "",
      },
      //state validation
      validation: [],
    };
  },

  methods: {
    //handle file upload
    handleFileChange(event) {
      // get image
      let image = (this.slider.image = event.target.files[0]);
      const kb = Math.round(+image.size / 1024).toFixed(2);
      const mb = Math.round(+image.size / 1024 / 1000).toFixed(2);

      // check size image not allowed > 1 mb
      if (kb > 1000) {
        // clear value and set  null
        event.target.value = null;

        // clear state image
        this.slider.image = null;

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
        this.slider.image = null;

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

    //method "storeSlider"
    async storeSlider() {
      //define formData
      let formData = new FormData();

      formData.append("image", this.slider.image);
      formData.append("link", this.slider.link);

      //sending data to action "storeSlider" vuex
      await this.$store
        .dispatch("admin/slider/storeSlider", formData)

        //success
        .then(() => {
          //sweet alert
          this.$swal.fire({
            title: "BERHASIL!",
            text: "Data Berhasil Disimpan!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          //redirect route "admin-sliders"
          this.$router.push({
            name: "admin-sliders",
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
