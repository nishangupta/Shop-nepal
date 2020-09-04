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
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Appbar,
  },
  methods: {
    ...mapActions(["setProducts"]),
  },

  created() {
    this.setProducts();
  },
};
</script>