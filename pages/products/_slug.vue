<template>
  <div class="container mt-custom mb-5">
    <div class="fade-in">
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card border-0 rounded shadow-sm">
            <div class="card-body">
              <img :src="isProduct.image" class="w-100 rounded" />
            </div>
          </div>
        </div>

        <div class="col-md-8">
          <div class="card border-0 rounded shadow-sm">
            <div class="card-body">
              <h4>{{ isProduct.title }}</h4>
              <hr />
              <h6 class="mb-0 font-weight-semibold">
                <s class="text-red">Rp. {{ formatPrice(isProduct.price) }}</s> /
                <strong>{{ isProduct.discount }} %</strong>
              </h6>
              <h5 class="mb-0 font-weight-semibold mt-3 text-success">
                Rp. {{ formatPrice(calculateDiscount(isProduct)) }}
              </h5>
              <div class="mt-3">
                <div v-html="isProduct.description"></div>
              </div>
              <div class="table-responsive">
                <table class="table table-sm table-borderless mb-0">
                  <tbody>
                    <client-only>
                      <tr>
                        <th class="pl-0 w-25" scope="row">
                          <strong>BERAT</strong>
                        </th>
                        <td>
                          <strong>{{ isProduct.weight }}</strong> gram
                        </td>
                      </tr>
                      <tr>
                        <th class="pl-0 w-25" scope="row">
                          <strong>STOK</strong>
                        </th>
                        <td>
                          <strong>{{ isProduct.stock }}</strong>
                        </td>
                      </tr>
                    </client-only>
                  </tbody>
                </table>
              </div>
              <hr />
              <button
                @click="onAddToCart"
                class="btn btn-lg btn-warning border-0 shadow-sm"
              >
                <i class="fa fa-shopping-cart"></i> TAMBAH KE KERANJANG
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow-sm">
            <div class="card-body">
              <h5>
                <i class="fa fa-comments"></i> ULASAN PRODUK (
                <strong>{{ isProduct.reviews_count }}</strong> ulasan )
              </h5>
              <hr />
              <div
                class="card bg-light shadow-sm rounded"
                v-for="review in isProduct.reviews"
                :key="review.id"
              >
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-1">
                      <div class="review-avatar avatar-sm">
                        <img
                          :src="`https://ui-avatars.com/api/?name=${review.customer.name}&amp;background=4e73df&amp;color=ffffff&amp;size=100`"
                        />
                      </div>
                    </div>
                    <div class="col-md-11">
                      <client-only>
                        <vue-star-rating
                          class="mb-2"
                          :rating="review.rating"
                          :star-size="20"
                          :read-only="true"
                          :show-rating="false"
                        >
                        </vue-star-rating>
                      </client-only>
                      <strong>
                        <span class="text-dark">{{
                          review.customer.name
                        }}</span>
                      </strong>
                      <div class="description mt-2">
                        <span
                          style="
                            color: rgb(119, 118, 118)
                            font-size: 15px;
                            font-style: italic;
                          "
                        >
                          {{ review.review }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //meta
  head() {
    return {
      title: `${this.isProduct.title} - MI STORE - Distributor Xiaomi Indonesia Resmi`,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: `${this.isProduct.title} - MI STORE - Distributor Xiaomi Indonesia Resmi`
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: `${this.isProduct.title} - MI STORE - Distributor Xiaomi Indonesia Resmi`
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.isProduct.image
        },
        {
          hid: 'description',
          name: 'description',
          content: `${this.isProduct.title.substr(0, 30)}...`
        }
      ]
    }
  },

  // hook async data
  async asyncData({ store, route }) {
    await store.dispatch('web/product/getDetailProduct', route.params.slug)
  },

  methods: {
    async onAddToCart() {
      // check loggedin
      if (!this.$auth.loggedIn) {
        return this.$router.push('/customer/login')
      }

      // check customer role
      if (this.$auth.strategy.name != 'customer') {
        return this.$router.push('/customer/login')
      }

      const { id, stock, weight } = this.isProduct
      const priceDiscount = this.calculateDiscount(this.isProduct)

      const payload = {
        product_id: id,
        price: priceDiscount,
        qty: stock,
        weight: weight
      }

      await this.$store.dispatch('web/cart/storeCart', payload).then(() => {
        //sweet alert
        this.$swal.fire({
          title: 'BERHASIL!',
          text: 'Product Berhasil Ditambahkan di Keranjang!',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000
        })
      })
    }
  },

  computed: {
    isProduct() {
      return this.$store.getters['web/product/isProduct']
    }
  }
}
</script>
