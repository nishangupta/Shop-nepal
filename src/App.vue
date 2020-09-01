<template>
  <v-app>
    <v-main>
      <calendar />
    </v-main>
  </v-app>
</template>

<script>
import Calendar from "./components/Calendar";

export default {
  name: "App",

  components: {
    Calendar,
  },

  data: () => ({
    //
  }),
};
</script>
