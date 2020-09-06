<template>
  <div class="address-book">
    <h1>Address Book</h1>
    <v-sheet class="grey lighten-5 mt-4">
      <v-container class="pa-4">
        <v-btn color="primary mb-5" @click="editingAddress = true">
          <span>Add new address</span>
        </v-btn>
        <v-layout row class="mb-5">
          <v-flex xs6 sm4 md3 lg2 class="pa-2 grey lighten-2">
            <div class="text-md-subtitle-2">Name</div>
            <div class="text-subtitle-1">{{name}}</div>
          </v-flex>
          <v-flex xs6 sm4 md3 lg3 class="pa-2 grey lighten-2">
            <div class="text-md-subtitle-2">
              Email |
              <v-btn text color="primary" @click.stop="editingAddress = true">Edit</v-btn>
            </div>
            <div class="text-subtitle-1">{{email}}</div>
          </v-flex>
          <v-flex xs6 sm4 md3 lg2 class="pa-2 grey lighten-2">
            <div class="text-md-subtitle-2">
              Phone |
              <v-btn text color="primary" @click.stop="editingAddress = true">Edit</v-btn>
            </div>
            <div class="text-subtitle-1">{{phone}}</div>
          </v-flex>
          <v-flex xs6 sm4 md3 lg3 class="py-2 grey lighten-2">
            <div class="text-md-subtitle-2">Address</div>
            <div class="text-subtitle-1">{{address}}</div>
            <div class="text-subtitle-1">{{region}}</div>
          </v-flex>
          <v-flex lg2 class="pa-2 grey lighten-2">
            <div class="text-md-subtitle-2" v-text="'Default address'"></div>
            <v-btn text color="primary" @click.stop="editingAddress = true">Edit</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-sheet>
    <!-- addressbook modal -->
    <v-dialog v-model="editingAddress" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Address</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="addressForm">
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Full Name*" required v-model="name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field type="number" label="Phone*" v-model="phone"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    :items="['Bagmati','Bheri','Gandaki', 'Janakpur']"
                    v-model="region"
                    label="Region*"
                    dense
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    :items="['Baneshwor','Banepa','Ason', 'Teku', 'Maitighar','Kuleshwor','Kalimati','swaymbhu','Naradevi','Naxal','Chhetrapati']"
                    v-model="address"
                    label="Address*"
                    dense
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="closeForm()">Close</v-btn>
          <v-btn
            color="primary white--text darken-1"
            :loading="isLoading"
            @click="submitForm()"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db, { fauth } from "@/fb";
export default {
  data() {
    return {
      isLoading: false,
      editingAddress: false,
      name: "",
      phone: "",
      address: "",
      region: "",
    };
  },
  methods: {
    getUser() {
      const user = fauth.currentUser;
      this.email = user.email;
      db.collection("users")
        .doc(user.uid)
        .get()
        .then(
          (res) => {
            let userInfo = res.data();
            this.name = userInfo.name;
            this.address = userInfo.address;
            this.region = userInfo.region;
            this.phone = userInfo.phone;
          },
          (err) => alert(err.message)
        );
    },
    closeForm() {
      this.editingAddress = false;
      this.isLoading = false;
    },
    submitForm() {
      this.isLoading = true;
      if (this.$refs.addressForm.validate()) {
        const uid = fauth.currentUser.uid;
        db.collection("users")
          .doc(uid)
          .update({
            address: this.address,
            region: this.region,
            phone: this.phone,
            name: this.name,
          })
          .then((err) => alert(err.message));
      } else {
        alert("Invalid inputs");
      }
      this.closeForm();
    },
  },
  created() {
    this.getUser();
  },
};
</script>

<style>
</style>