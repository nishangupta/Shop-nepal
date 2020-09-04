<template>
  <div class="manage-product">
    <h4 class="text-h4">Manage product</h4>
    <v-sheet class="pt-5">
      <v-data-table :headers="headers" :items="products">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>All Products</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px" persistent>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Add Product</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="editedItem.name" label="Product name"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.img" label="Img"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-textarea v-model="editedItem.description" label="Description"></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="blue darken-1" text @click="setPlaceHolders">set Default Value</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="deep-orange" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save" :loading="isLoading">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
          <v-icon small @click="deleteItem(item)">delete</v-icon>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-sheet>
  </div>
</template>

<script>
import db from "@/fb";
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    isLoading: false,
    dialog: false,
    headers: [
      {
        text: "Product Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Img", value: "img" },
      { text: "Price", value: "price" },
      { text: "Description", value: "description" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    products: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      name: "",
      img: "",
      price: "",
      description: "",
    },
    defaultItem: {
      name: "",
      img: "",
      price: "",
      description: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["allProducts"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    products() {
      return this.products;
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions(["deleteProduct"]),
    initialize() {
      this.products = this.allProducts;
    },
    //puts product in edit form inputs
    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      if (confirm("Are you sure you want to delete this product?")) {
        this.deleteProduct(item.id);
        this.products = this.products.filter((p) => p.id !== item.id);
      }
      return;
    },

    close() {
      this.dialog = false;
      this.isLoading = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.isLoading = true;
      if (this.editedIndex > -1) {
        db.collection("products")
          .doc(this.editedItem.id)
          .update(this.editedItem)
          .then(() => {
            this.close();
          });
        let oldProduct = this.products.find((p) => p.id == this.editedItem.id);
        Object.assign(oldProduct, this.editedItem);
      } else {
        //create and store in firebase
        this.editedItem.img = "/" + this.editedItem.img;

        db.collection("products")
          .add({
            name: this.editedItem.name,
            img: this.editedItem.img,
            description: this.editedItem.description,
            price: this.editedItem.price,
          })
          .then(() => {
            this.close();
          });
      }
    },
    setPlaceHolders() {
      Object.assign(this.editedItem, {
        name:
          "X96 Air 4GB Amlogic Smart TV Box 8K Video Decode Android 9.0 TV Box 2.4G+5.8G WiFi Bluetooth LAN USB3.0",
        price: "24552",
        description:
          "Amlogic S905X3 applies quad-core Cortex-A55 processors, which is described as an advanced application processor designed for hybrid OTT/ IP Set-Top Box (STB) and high-end media box applications. The Cortex-A55 cores deliver up to twice the performance compared to Cortex-A53 in memory benchmarks, and a more typical 20 to 30% performance improvement for common tasks at the same frequency",
        img: "product.jpg",
      });
    },
  },
};
</script>

<style>
</style>