<template>
  <div class="container-fluid mt-custom">
    <div class="fade-in">
      <div class="row">
        <div class="col-md-3">
          <!-- sidebar -->
          <web-sidebar />
          <!-- end sidebar -->
        </div>
        <div class="col-md-9">
          <div class="card border-0 rounded shadow-sm border-top-orange">
            <div class="card-body">
              <h5><i class="fa fa-shopping-cart"></i> MY ORDERS</h5>
              <hr />

              <div class="form-group">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="cari berdasarkan no. invoice"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-warning">
                      <i class="fa fa-search"></i>
                      SEARCH
                    </button>
                  </div>
                </div>
              </div>

              <b-table
                striped
                bordered
                hover
                :items="invoices.data"
                :fields="fields"
                show-empty
              >
                <template v-slot:cell(grand_total)="row">
                  Rp. {{ formatPrice(row.item.grand_total) }}
                </template>
                <template v-slot:cell(status)="row">
                  <button
                    v-if="row.item.status == 'pending'"
                    class="btn btn-sm btn-primary"
                  >
                    <i class="fa fa-circle-notch fa-spin"></i>
                    {{ row.item.status }}
                  </button>
                  <button
                    v-if="row.item.status == 'success'"
                    class="btn btn-sm btn-success"
                  >
                    <i class="fa fa-check-circle"></i> {{ row.item.status }}
                  </button>
                  <button
                    v-if="row.item.status == 'expired'"
                    class="btn btn-sm btn-warning-2"
                  >
                    <i class="fa fa-exclamation-triangle"></i>
                    {{ row.item.status }}
                  </button>
                  <button
                    v-if="row.item.status == 'failed'"
                    class="btn btn-sm btn-danger"
                  >
                    <i class="fa fa-times-circle"></i> {{ row.item.status }}
                  </button>
                </template>
              </b-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "isCustomer",

  layout: "default",

  head() {
    return {
      title: "Invoices - Customer",
    };
  },

  data: () => ({
    fields: [
      {
        label: "No. Invoice",
        key: "invoice",
      },
      {
        label: "Grand Total",
        key: "grand_total",
      },
      {
        label: "Status Payment",
        key: "status",
        tdClass: "text-center",
      },
      {
        label: "Actions",
        key: "actions",
        tdClass: "text-center",
      },
    ],
  }),

  async asyncData({ store }) {
    await store.dispatch("customer/invoice/getInvoicesData");
  },

  computed: {
    invoices() {
      return this.$store.state.customer.invoice.invoices;
    },
  },
};
</script>
