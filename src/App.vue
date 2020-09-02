<template>
  <v-app>
    <appbar />
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "./components/Appbar";
export default {
  name: "App",
  components: {
    Appbar,
  },
};
</script>