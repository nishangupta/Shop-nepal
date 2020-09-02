<template>
  <div class="address-book">
    <h1>Address Book</h1>
    <v-sheet class="grey lighten-5 mt-4">
      <v-container class="pa-4">
        <v-btn color="primary mb-5">
          <span>Add new address</span>
        </v-btn>
        <v-layout row v-for="info in addressBooks" :key="info.id" class="mb-5">
          <v-flex xs6 sm4 md3 lg2 class="pa-2 grey lighten-2">
            <div class="text-md-subtitle-2">Name</div>
            <div class="text-subtitle-1">{{info.name}}</div>
          </v-flex>
          <v-flex xs6 sm4 md3 lg3 class="pa-2 grey lighten-2">
            <div class="text-md-subtitle-2">
              Email |
              <v-btn text color="primary">Edit</v-btn>
            </div>
            <div class="text-subtitle-1">{{info.email}}</div>
          </v-flex>
          <v-flex xs6 sm4 md3 lg2 class="pa-2 grey lighten-2">
            <div class="text-md-subtitle-2">
              Phone |
              <v-btn text color="primary">Edit</v-btn>
            </div>
            <div class="text-subtitle-1">{{info.phone}}</div>
          </v-flex>
          <v-flex xs6 sm4 md3 lg3 class="py-2 grey lighten-2">
            <div class="text-md-subtitle-2">Address</div>
            <div class="text-subtitle-1">{{info.address}}</div>
            <div class="text-subtitle-1">{{info.region}}</div>
          </v-flex>
          <v-flex lg2 class="pa-2 grey lighten-2">
            <div class="text-md-subtitle-2" v-text="info.default?'Default address':''"></div>
            <v-btn text color="primary">Edit</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addressBooks: [
        {
          id: 1,
          name: "nishant",
          email: "nishant@nisahnt",
          address: "naradevi",
          region: "Bagmati - Kathmandu Metro 24 - Indrachowk Area - Naradevi",
          phone: "9864599356",
          default: true,
        },
        {
          id: 1,
          email: "nishant@nisahnt",
          name: "nisan",
          address: "syuambhu",
          region: "Bagmati - Kathmandu Metro 24 - Indrachowk Area - Naradevi",
          phone: "9864599356",
          default: false,
        },
      ],
    };
  },
};
</script>

<style>
</style>