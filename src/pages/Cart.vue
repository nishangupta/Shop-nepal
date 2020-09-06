<template>
  <v-card class="mx-auto">
    <v-app-bar color="white">
      <v-toolbar-title>
        Shoping cart
        <span>({{cartItemCount}}) items</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
        text
        color="primary"
        class="hidden-md-and-down"
        outlined
        router
        to="/"
      >continue shopping</v-btn>
      <v-btn class="ml-2 secondary hidden-md-and-down">Checkout</v-btn>
    </v-app-bar>

    <v-container>
      <v-data-table :headers="headers" :items="getCartItems">
        <template v-slot:item.quantity="{ item }">
          <v-btn small @click="cartDecrement(item.id)">-</v-btn>
          <input
            style="width:3rem;height:2rem;padding:12px;border:1px solid #ccc"
            :value="quantity"
            disabled
          />
          <v-btn small @click="cartIncrement(item.id)">+</v-btn>
        </template>

        <template v-slot:item.price="{ item }">
          <span>Rs {{formatPrice(item.price * quantity)}}</span>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn small text color="red" @click="removeFromCart(item.id)">Remove</v-btn>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" router to="/">Cart empty</v-btn>
        </template>
      </v-data-table>

      <v-row dense class="mt-2">
        <v-col cols="6">
          <v-btn text color="red" @click="clearCartItems()">Clear Cart</v-btn>
        </v-col>
        <v-col cols="6" class="ml-auto" sm="6" md="4">
          <h3 class="px-2 my-2">
            Total Price:
            <span>{{formatPrice(totalPrices)}}</span>
          </h3>
          <v-btn class="right ml-2 secondary" block>Checkout</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    items: [],
    quantity: 1,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
        width: 550,
      },
      { text: "Quantity", value: "quantity", sortable: false },
      { text: "Price", value: "price" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  watch: {},
  computed: {
    ...mapGetters(["cartItemCount", "getCartItems"]),
    totalPrices() {
      let price = 0;
      this.$store.getters.getCartItems.forEach((p) => {
        price += Number(p.price);
      });
      return price;
    },
  },
  methods: {
    // mapActions used in the components
    ...mapActions([
      "cartIncrement",
      "cartDecrement",
      "removeCart",
      "clearCart",
    ]),
    removeFromCart(id) {
      if (confirm("Are you sure to remove from cart?")) {
        this.removeCart(id);
      }
    },
    clearCartItems() {
      if (confirm("Are you sure to remove all products from cart?")) {
        this.clearCart();
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>