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
            <v-dialog v-model="dialog" max-width="500px">
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
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
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
        <template v-slot:item.name="{ item }">
          <v-subtitle>{{ item.name.slice(0,25) }}...</v-subtitle>
        </template>
        <template v-slot:item.description="{ item }">
          <v-subtitle>{{ item.description.slice(0,35) }}...</v-subtitle>
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
export default {
  data: () => ({
    isLoading: false,
    dialog: false,
    headers: [
      {
        text: "Product Name ",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Img (g)", value: "img" },
      { text: "Price (g)", value: "price" },
      { text: "Description", value: "description" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    products: [],
    editedIndex: -1,
    editedItem: {
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
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.products = [
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
          id: 3,
          name: " Samsung M21 [6GB RAM// 128GB ROM]",
          price: "25000",
          description:
            "Amlogic S905X3 applies quad-core Cortex-A55 processors, which is described as an advanced application processor designed for hybrid OTT/ IP Set-Top Box (STB) and high-end media box applications. The Cortex-A55 cores deliver up to twice the performance compared to Cortex-A53 in memory benchmarks, and a more typical 20 to 30% performance improvement for common tasks at the same frequency",
          img: "/phone2.jpg",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.products.indexOf(item);
      confirm("Are you sure you want to delete this product?") &&
        this.products.splice(index, 1);
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
        Object.assign(this.products[this.editedIndex], this.editedItem);
      } else {
        //create and store in firebase
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

        this.products.push(this.editedItem);
      }
    },
  },
};
</script>

<style>
</style>