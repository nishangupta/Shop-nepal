<template>
  <v-container fluid>
    <v-sheet>
      <v-layout row>
        <v-flex xs12 sm12 md4 xl3 class="pa-2">
          <img :src="product.img" width="100%" />
        </v-flex>
        <v-flex xs12 sm12 md4 xl4 class="pa-2 mt-4">
          <h5 class="text-h5">{{product.name}}</h5>
          <p>
            Brand:
            <span class="primary--text">No Brand</span>
          </p>
          <v-divider></v-divider>
          <p class="secondary--text text-h4 mt-2">Rs. {{formatPrice(product.price)}}</p>
          <v-subheader>Quantity</v-subheader>
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
              <v-btn color="secondary" block @click="addToCart(product.id)">Add to cart</v-btn>
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
                <p>{{product.description}}</p>
              </v-flex>
              <v-flex xs12 sm12 md6 lg-6 md12 class="pa-4">
                <p>{{product.description}}</p>
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      quantity: 1,
      productExtra:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla deleniti eveniet, quasi eaque unde commodi dolores cumque eius rerum itaque provident mollitia voluptas ut voluptatem quis voluptatibus laborum rem? Nisi asperiores, quis laudantium aliquam iste voluptatibus, fuga praesentium dicta illo saepe ex vero corporis nemo cum eligendi! Maxime officiis dignissimos ipsum labore autem maiores, sapiente minima excepturi quisquam similique eius harum sequi quidem repellendus deserunt tenetur deleniti fuga. Pariatur placeat cupiditate repudiandae fugit modi deserunt sit, repellendus temporibus? At dolore beatae quasi nisi esse quia inventore accusamus asperiores dignissimos eaque alias architecto numquam repellendus qui fugit amet dolor dolorum dicta, aliquid, et molestiae non repellat assumenda! Hic, sed in! Ea explicabo repellendus sequi dolore quas accusamus exercitationem illo minima eaque ducimus molestias quibusdam perferendis tempore necessitatibus assumenda animi, sapiente neque qui vitae eius voluptatibus. Porro dolore molestias expedita perferendis enim blanditiis, repudiandae non quod illum sit perspiciatis praesentium quidem officia laborum? Atque ipsam quia ducimus, a, at corrupti reprehenderit veritatis deserunt iusto similique quas commodi ipsa soluta id. Aspernatur voluptas qui, voluptates numquam tenetur placeat aperiam, earum ipsam est, nostrum deleniti atque ipsum quo expedita ad doloremque dolorum magnam enim assumenda aliquid maxime? Id adipisci eligendi illo. Adipisci, delectus qui",
    };
  },
  computed: {
    product() {
      return this.$store.getters.getProduct(this.$route.params.id);
    },
  },
  methods: {
    ...mapActions(["addToCart"]),
    decQuantity() {
      if (this.quantity <= 1) return;
      this.quantity--;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>