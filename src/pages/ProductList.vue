<template>
  <v-container fluid>
    <v-sheet height="100">
      <v-row>
        <v-col cols="6"></v-col>
        <v-col cols="6">
          <v-overflow-btn
            dense
            :items="pricing_types"
            label="Best Match"
            target="#dropdown-example"
          ></v-overflow-btn>
        </v-col>
      </v-row>
      <!-- Product list -->
      <v-layout row class="mt-5">
        <v-flex xs6 sm6 md3 xl3 v-for="(product,i) in products" :key="i" class="pa-2 mb-4">
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
export default {
  data() {
    return {
      pricing_types: ["Best Match", "Price low to high", "Price hight to low"],
      products: [
        {
          id: 1,
          name:
            "X96 Air 4GB Amlogic Smart TV Box 8K Video Decode Android 9.0 TV Box 2.4G+5.8G WiFi Bluetooth LAN USB3.0",
          price: "2455",
          description:
            "Amlogic S905X3 applies quad-core Cortex-A55 processors, which is described as an advanced application processor designed for hybrid OTT/ IP Set-Top Box (STB) and high-end media box applications. The Cortex-A55 cores deliver up to twice the performance compared to Cortex-A53 in memory benchmarks, and a more typical 20 to 30% performance improvement for common tasks at the same frequency",
          img: "/product.jpg",
        },
        {
          id: 2,
          name: "Samsung Galaxy A51 -6GB RAM // 128GB ROM // 48MP Quad Camera",
          price: "65000",
          description:
            "Amlogic S905X3 applies quad-core Cortex-A55 processors, which is described as an advanced application processor designed for hybrid OTT/ IP Set-Top Box (STB) and high-end media box applications. The Cortex-A55 cores deliver up to twice the performance compared to Cortex-A53 in memory benchmarks, and a more typical 20 to 30% performance improvement for common tasks at the same frequency",
          img: "/phone.jpg",
        },
        {
          id: 2,
          name: " Samsung M21 [6GB RAM// 128GB ROM]",
          price: "25000",
          description:
            "Amlogic S905X3 applies quad-core Cortex-A55 processors, which is described as an advanced application processor designed for hybrid OTT/ IP Set-Top Box (STB) and high-end media box applications. The Cortex-A55 cores deliver up to twice the performance compared to Cortex-A53 in memory benchmarks, and a more typical 20 to 30% performance improvement for common tasks at the same frequency",
          img: "/phone2.jpg",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style>
</style>