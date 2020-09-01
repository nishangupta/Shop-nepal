<template>
  <nav>
    <v-snackbar v-model="snackbar" top color="success">
      Awesome! You added a new project.
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>

    <v-app-bar app flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Todo</span>
        <span>Ninja</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" text v-on="on" class="grey--text">
            <v-icon left>mdi-arrow-down-drop-circle-outline</v-icon>Nav
          </v-btn>
        </template>

        <v-list>
          <v-list-item router to="/">
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item router to="/projects">
            <v-list-item-title router to="/projects">My projects</v-list-item-title>
          </v-list-item>
          <v-list-item router to="/team">
            <v-list-item-title>Team</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text color="grey">
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- slider-drawer below -->
    <v-navigation-drawer
      v-model="drawer"
      dark
      app
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    >
      <v-layout column>
        <v-flex class="mt-5" align-self-center>
          <v-avatar size="100">
            <img src="/avatar-1.png" alt />
          </v-avatar>
          <p class="white--text subtitle-1 mt-1">The Net ninja</p>
        </v-flex>
        <v-flex class="mt-4 mb-3" align-self-center>
          <!-- popup component -->
          <popup @projectAdded="snackbar = true" />
        </v-flex>
      </v-layout>
      <!-- navigation -->
      <v-list dense>
        <v-list-item
          link
          v-for="linkitem in links"
          :key="linkitem.text"
          router
          :to="linkitem.route"
        >
          <v-list-item-action>
            <v-icon>{{linkitem.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{linkitem.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from "./Popup";
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
        { icon: "mdi-folder", text: "My projects", route: "/projects" },
        { icon: "mdi-account-switch", text: "Team", route: "/team" },
      ],
      snackbar: false,
    };
  },
  components: {
    Popup,
  },
};
</script>

<style>
</style>