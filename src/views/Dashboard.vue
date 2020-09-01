<template>
  <div class="dashboard pt-2">
    <h1 class="subtitle-1 grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="grey" @click="sortBy('title')" v-bind="attrs" v-on="on">
              <v-icon left small>mdi-folder</v-icon>
              <span class="caption text-capitalize">by project name</span>
            </v-btn>
          </template>
          <span>Sort project by name</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="grey" @click="sortBy('person')" v-bind="attrs" v-on="on">
              <v-icon left small>mdi-account-switch</v-icon>
              <span class="caption text-capitalize">by person</span>
            </v-btn>
          </template>
          <span>Sort project by Person</span>
        </v-tooltip>
      </v-layout>

      <!-- card -->
      <v-card flat class="mb-2 grey lighten-4" v-for="project in projects" :key="project.id">
        <v-layout row :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6 xl4>
            <div class="caption grey--text">Project</div>
            <div>{{project.title}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{project.person}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{project.due}}</div>
          </v-flex>
          <v-flex xs2 sm4 md2 align-self-center>
            <div>
              <v-chip :class="`${project.status} white--text caption`">{{project.status}}</v-chip>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import db from "@/fb";
export default {
  name: "Dashboard",
  data() {
    return {
      projects: [],
    };
  },
  created() {
    db.collection("projects").onSnapshot((res) => {
      const changes = res.docChanges();

      changes.forEach((change) => {
        if (change.type === "added") {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id,
          });
        }
      });
    });
  },
  methods: {
    sortBy(str) {
      this.projects.sort((a, b) => (a[str] < b[str] ? -1 : 1));
    },
  },
};
</script>

<style scoped>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid tomato;
}
.v-chip.complete {
  background-color: #3cd1c2;
}
.v-chip.ongoing {
  background-color: orange;
}
.v-chip.overdue {
  background-color: tomato;
}
</style>