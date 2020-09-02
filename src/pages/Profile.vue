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
            <div class="body-1">{{user.name}}</div>
          </v-flex>
          <v-flex xs6 md4 xl3 class="mb-4 pa-4">
            <div class="subtitle-1 grey--text">
              Email |
              <router-link to="/">Change</router-link>
            </div>
            <div class="body-1">{{user.email}}</div>
          </v-flex>
          <v-flex xs6 md4 xl3 class="mb-4 pa-4">
            <div class="subtitle-1 grey--text">
              Mobile |
              <router-link to="/">Change</router-link>
            </div>
            <div class="body-1">{{user.mobile}}</div>
          </v-flex>
          <v-flex xs6 md4 xl3 class="mb-4 pa-4">
            <div class="subtitle-1 grey--text">Birthday</div>
            <div class="body-1">{{user.dob}}</div>
          </v-flex>
          <v-flex xs6 md4 xl3 class="mb-4 pa-4">
            <div class="subtitle-1 grey--text">Gender</div>
            <div class="body-1">{{user.gender}}</div>
          </v-flex>
        </v-layout>
        <v-btn text class="caption primary--text" router to="/" link>Subscribe to our news letter</v-btn>
        <v-spacer></v-spacer>
        <br />

        <v-btn large color="primary">
          <span>Edit Profile</span>
        </v-btn>
        <v-spacer></v-spacer>
        <br />
        <v-btn large color="primary">
          <span>Change Password</span>
        </v-btn>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "Nishant",
        email: "nishant@nishant.com",
        mobile: "+977-9847232347",
        dob: "1999-11-24",
        gender: "Male",
      },
    };
  },
};
</script>

<style>
</style>