<template>
  <v-container fluid>
    <v-sheet>
      <v-layout row>
        <v-flex xs12 sm12 md4 xl3 class="pa-2">
          <img src="/product.jpg" width="100%" />
        </v-flex>
        <v-flex xs12 sm12 md4 xl4 class="pa-2">
          <h5 class="text-h5">{{product.name}}</h5>
          <p>
            Brand:
            <span class="primary--text">No Brand</span>
          </p>
          <v-divider></v-divider>
          <p class="secondary--text text-h4 mt-2">Rs. 10000</p>
          <v-subtitle>Quantity</v-subtitle>
          <div class="quantity-toggle">
            <v-btn @click="decQuantity()">&mdash;</v-btn>
            <input
              type="text"
              v-model="quantity"
              readonly
              min="1"
              style="border:1px solid #ccc;width:3rem;padding:6px "
            />
            <v-btn @click="quantity++">&#xff0b;</v-btn>
          </div>
          <v-layout row class="my-5" justify-space-between>
            <v-flex>
              <v-btn color="secondary" block>Add to cart</v-btn>
            </v-flex>
            <v-flex>
              <v-btn color="primary" block>Buy now</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-sheet>
    <v-sheet class="mt-4">
      <v-container>
        <v-row>
          <v-col cols="10">
            <v-layout row>
              <v-flex xs12 md12 class="pa-2 grey lighten-4">
                <h4>Product details of {{product.name}}</h4>
              </v-flex>
              <v-flex xs12 sm12 md6 lg-6 md12 class="pa-4">
                <p>{{product.details}}</p>
              </v-flex>
              <v-flex xs12 sm12 md6 lg-6 md12 class="pa-4">
                <p>{{product.details}}</p>
              </v-flex>
              <v-flex xs12 md12 class="pa-2 grey lighten-4">
                <p>{{productExtra}}</p>
              </v-flex>
            </v-layout>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      quantity: 1,
      product: {
        name:
          "X96 Air 4GB Amlogic Smart TV Box 8K Video Decode Android 9.0 TV Box 2.4G+5.8G WiFi Bluetooth LAN USB3.0",
        details:
          'Amlogic S905X3 applies quad-core Cortex-A55 processors, which is described as an "advanced application processor designed for hybrid OTT/ IP Set-Top Box (STB) and high-end media box applications. The Cortex-A55 cores deliver up to twice the performance compared to Cortex-A53 in memory benchmarks, and a more typical 20 to 30% performance improvement for common tasks at the same frequency.',
      },
      productExtra:
        "Amlogic continues to dominate the TV box market with the release of a new S905X3 CPU. The X96 Air TV Box is one of the first of boxes to feature this new CPU, and it has already generated quite a stir among the TV box community. Will it have better performance than the previous S905X2, and how how will boxes carrying this new CPU cost. Some are of the belief that the new CPU is nothing new and it is the same S905X2 clocked at a higher speed. In this short article I will give you the information pertaining to this assumption and a break down of what the X96 Air has to offer.",
    };
  },
  methods: {
    decQuantity() {
      if (this.quantity <= 1) return;
      this.quantity--;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>