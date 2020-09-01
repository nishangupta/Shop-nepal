<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{on,attrs}">
      <v-btn v-bind="attrs" text color="light" outlined v-on="on">Add new project</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2>Add a new project</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form">
            <v-layout column>
              <v-flex>
                <v-text-field
                  label="Title of the project"
                  v-model="title"
                  prepend-icon="mdi-folder"
                  required
                  :rules="inputRules"
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field
                  label="Your name"
                  v-model="name"
                  prepend-icon="mdi-rss-box"
                  :rules="inputRules"
                  :counter="10"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="150px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formattedDate"
                      label="Due date"
                      prepend-icon="mdi-rss-box"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="inputRules"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex>
                <v-textarea
                  label="Information"
                  prepend-icon="mdi-rss-box"
                  v-model="content"
                  required
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="closeDialog">Close</v-btn>
        <v-btn color="blue darken-1" text @click="addProject">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from "@/main";
export default {
  data() {
    return {
      dialog: false,
      title: "",
      name: "",
      date: "",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
      status: "ongoing",
      menu2: false,
      inputRules: [
        (v) => !!v || "Field is required",
        (v) => v.length >= 3 || "Minimum length is 3 characters",
      ],
    };
  },
  methods: {
    async addProject() {
      if (this.$refs.form.validate()) {
        await db.collection("projects").add({
          name: this.name,
          title: this.title,
          due: this.formattedDate,
          status: this.status,
          content: this.content,
        });
      }
      this.resetVariables();
      this.closeDialog();
    },
    resetVariables() {
      this.title = "";
      this.name = "";
      this.date = "";
      this.content = "";
    },
    closeDialog() {
      (this.dialog = false), this.resetVariables();
    },
  },
  computed: {
    formattedDate() {
      if (!this.date) return;

      let d = new Date(this.date);

      return d.toString().slice(0, 15);
    },
  },
};
</script>

<style>
</style>