<template>
  <div class="profile">
    <v-layout>
      <v-flex>
        <h1>My Profile</h1>
        <v-chip color="success">
          <v-icon>done</v-icon>
          <span>verified account</span>
        </v-chip>
      </v-flex>
    </v-layout>

    <v-sheet class="grey lighten-5 mt-4">
      <v-container class="pa-4">
        <v-layout row>
          <v-flex xs6 md4 xl3 class="mb-4 pa-4">
            <div class="subtitle-1 grey--text">Full name</div>
            <div class="body-1">{{name}}</div>
          </v-flex>
          <v-flex xs6 md4 xl3 class="mb-4 pa-4">
            <div class="subtitle-1 grey--text">
              Email |
              <v-btn text @click="editingProfile = true">Change</v-btn>
            </div>
            <div class="body-1">{{email}}</div>
          </v-flex>
          <v-flex xs6 md4 xl3 class="mb-4 pa-4">
            <div class="subtitle-1 grey--text">
              Mobile |
              <v-btn text @click="editingProfile =true">Change</v-btn>
            </div>
            <div class="body-1">{{phone}}</div>
          </v-flex>
          <v-flex xs6 md4 xl3 class="mb-4 pa-4">
            <div class="subtitle-1 grey--text">Birthday</div>
            <div class="body-1">{{dob}}</div>
          </v-flex>
          <v-flex xs6 md4 xl3 class="mb-4 pa-4">
            <div class="subtitle-1 grey--text">Gender</div>
            <div class="body-1">{{gender}}</div>
          </v-flex>
        </v-layout>
        <v-btn text class="caption primary--text" router to="/" link>Subscribe to our news letter</v-btn>
        <v-spacer></v-spacer>
        <br />

        <v-btn large color="primary" @click="editingProfile = true">
          <span>Edit Profile</span>
        </v-btn>
        <v-spacer></v-spacer>
        <br />
      </v-container>
    </v-sheet>

    <!-- Edit user model -->
    <v-dialog v-model="editingProfile" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="profileForm">
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Full Name*" required v-model="name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field type="number" label="Phone" v-model="phone"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field type="date" label="Date" v-model="dob" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    :items="['male', 'female', 'rather not to say']"
                    v-model="gender"
                    label="Gender"
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
      name: "",
      email: "",
      phone: null,
      dob: null,
      gender: "",
      editingProfile: false,
      isLoading: false,
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
            this.phone = userInfo.phone;
            this.dob = userInfo.dob;
            this.gender = userInfo.gender;
          },
          (err) => alert(err.message)
        );
    },

    closeForm() {
      this.editingProfile = false;
      this.isLoading = false;
    },
    submitForm() {
      this.isLoading = true;
      if (this.$refs.profileForm.validate()) {
        const uid = fauth.currentUser.uid;
        db.collection("users")
          .doc(uid)
          .update({
            name: this.name,
            dob: this.dob,
            gender: this.gender,
            phone: this.phone,
          })
          .then(
            (res) => alert(res.message),
            (err) => alert(err.message)
          );
      } else {
        alert("Invalid inputs");
      }
      this.closeForm();
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style>
</style>