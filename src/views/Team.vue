<template>
  <div class="team pt-2">
    <h1 class="subtitle-1 grey--text">Team</h1>
    <v-container class="my-5">
      <v-layout row>
        <v-flex xs12 sm6 md4 lg-3 v-for="person in team" :key="person.name">
          <v-card flat class="text-xs-center grey lighten-4 ma-3 text-center">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="person.avatar" alt="avatar" />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subtitle-2">{{person.name}}</div>
              <div class="text--grey">{{person.role}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="grey">
                <v-icon small left>mdi-message</v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    team: [
      { name: "The Net Ninja", role: "Web developer", avatar: "/avatar-1.png" },
      { name: "Ryu", role: "Graphic designer", avatar: "/avatar-2.png" },
      { name: "Chun Li", role: "Web developer", avatar: "/avatar-3.png" },
      {
        name: "Gouken",
        role: "Social media maverick",
        avatar: "/avatar-4.png",
      },
      { name: "Yoshi", role: "Sales guru", avatar: "/avatar-5.png" },
    ],
  }),
};
</script>

<style>
</style>