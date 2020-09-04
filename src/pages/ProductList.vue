<template>
  <v-container fluid>
    <v-sheet height="100">
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="4">
          <v-overflow-btn
            dense
            :items="pricing_types"
            label="Best Match"
            v-model="sortKey"
            @change="sortProducts()"
          ></v-overflow-btn>
        </v-col>
      </v-row>
      <!-- Product list -->
      <v-layout row class="mt-5">
        <v-flex xs6 sm6 md3 xl3 v-for="product in allProducts" :key="product.id" class="pa-2 mb-4">
          <v-card max-width="400" height="400" depressed class="d-flex flex-column">
            <v-img height="200px" :src="product.img"></v-img>
            <router-link :to="{path:'shop/product/'+product.id}" class="text-decoration-none">
              <v-card-text class="pb-0 black--text">{{product.name}}</v-card-text>
            </router-link>
            <v-card-title class="secondary--text pt-0">Rs. {{product.price}}</v-card-title>

            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn color="secondary" block>Add to Cart</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      pricing_types: ["Best Match", "Price hight to low", "Price low to high"],
      sortKey: "",
    };
  },
  methods: {
    sortProducts() {
      let index = this.pricing_types.indexOf(this.sortKey);
      if (index == 1) {
        this.allProducts.sort((a, b) => {
          return Number(a.price) > Number(b.price) ? 1 : -1;
        });
      } else if (index == 2) {
        this.allProducts.sort((a, b) => {
          return Number(a.price) < Number(b.price) ? 1 : -1;
        });
      }
    },
  },
  computed: {
    ...mapGetters(["allProducts"]),
  },
};
</script>

<style>
</style>