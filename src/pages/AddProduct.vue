<template>
  <div class="add-product">
    <v-sheet>
      <v-container>
        <v-subheader>Basic information</v-subheader>
        <v-layout row class="ma-4">
          <v-flex xs12 md5>
            <v-form ref="form">
              <v-text-field label="Product Name *" v-model="name" :rules="nameRules"></v-text-field>
              <v-text-field
                label="Product Price *"
                class="mb-5"
                v-model="price"
                :rules="priceRules"
              ></v-text-field>
              <v-textarea
                label="Product Description"
                v-model="description"
                rows="10"
                :rules="nameRules"
              ></v-textarea>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-sheet>
    <!-- <v-bottom-navigation v-model="bottomNav"> -->
    <v-btn class="light mx-2">
      <span>Save draft</span>
    </v-btn>
    <v-btn class="secondary" @click="addProduct" :loading="isLoading">
      <span class="white--text">Save</span>
    </v-btn>
    <!-- </v-bottom-navigation> -->
  </div>
</template>

<script>
import db from "@/fb";
export default {
  name: "addProduct",
  data() {
    return {
      name: "",
      price: "",
      description:
        "Amlogic S905X3 applies quad-core Cortex-A55 processors, which is described as an advanced application processor designed for hybrid OTT/ IP Set-Top Box (STB) and high-end media box applications. The Cortex-A55 cores deliver up to twice the performance compared to Cortex-A53 in memory benchmarks, and a more typical 20 to 30% performance improvement for common tasks at the same frequency.",
      img: "/product3.jpg",
      nameRules: [
        (v) => !!v || "Field is required",
        (v) => v.length >= 5 || "Minimum length is 5 characters",
      ],
      priceRules: [
        (v) => !!v || "Field is required",
        (v) => !isNaN(v) || "Must be a number",
        (v) => v.length >= 3 || "Minimum length is 3 characters",
      ],
      isLoading: false,
    };
  },
  methods: {
    clearInputs() {
      this.name = "";
      this.price = "";
      this.description = "";
    },
    async addProduct() {
      this.isLoading = true;
      if (!this.$refs.form.validate()) {
        return;
      }
      await db.collection("products").add({
        name: this.name,
        description: this.description,
        price: this.price,
        img: this.img,
      });
      this.clearInputs();
      this.isLoading = false;
    },
  },
};
</script>

<style>
</style>