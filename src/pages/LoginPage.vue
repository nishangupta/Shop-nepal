<template>
  <v-container class="py-0" fluid>
    <v-sheet v-show="signupPage">
      <v-row>
        <v-col cols="12" sm="12" md="8" lg="6" class="mx-auto">
          <v-layout row elevation="2">
            <v-flex xs12 sm12 md12 lg12 class="pa-5 form-over signup">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <v-btn class="ghost" @click="signinToggle()">Sign In</v-btn>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 class="pa-5 form-below">
              <v-form ref="createForm">
                <h1>Create Account</h1>
                <v-text-field placeholder="Name" v-model="name" :rules="nameRules" autofocus></v-text-field>
                <v-text-field type="email" placeholder="Email" :rules="emailRules" v-model="email"></v-text-field>
                <v-text-field
                  type="password"
                  placeholder="Password"
                  :rules="passwordRules"
                  v-model="password"
                ></v-text-field>
                <br />
                <v-btn
                  class="primary darken-1"
                  text
                  @click.stop="signupUser()"
                  :loading="isLoading"
                >Create Account</v-btn>
              </v-form>
            </v-flex>
          </v-layout>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet v-show="signinPage">
      <v-row>
        <v-col cols="12" sm="12" md="8" lg="6" class="mx-auto">
          <v-layout row elevation="2">
            <v-flex xs12 sm12 md12 lg12 class="pa-5 form-over">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <v-btn class="ghost" @click="signupToggle()">Sign Up</v-btn>
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 class="pa-5 form-below">
              <v-form ref="loginForm">
                <h1>Sign in</h1>
                <v-text-field type="email" label="Email" v-model="email" :rules="emailRules"></v-text-field>
                <v-text-field
                  type="password"
                  label="Password"
                  :rules="passwordRules"
                  v-model="password"
                ></v-text-field>
                <a href="#">Forgot your password?</a>
                <br />
                <br />
                <v-btn
                  class="primary lighten-1"
                  text
                  @click.stop="signinUser()"
                  :loading="isLoading"
                >Sign In</v-btn>
              </v-form>
            </v-flex>
          </v-layout>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import db, { fauth } from "@/fb";
export default {
  data() {
    return {
      isLoading: false,
      signinPage: false,
      signupPage: true,
      email: "",
      password: "",
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length >= 3 || "",
        (v) => v.trim() !== "" || "Please enter valid name",
      ],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => v.length >= 5 || "",
        (v) => this.validateEmail(v) || "Invalid email",
        (v) => v.trim() !== "" || "Please enter correct email",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Must be atleast 8 characters",
        (v) => v.trim() !== "" || "invalid input",
      ],
    };
  },
  methods: {
    signinToggle() {
      this.signinPage = true;
      this.signupPage = false;
      this.clearFields();
    },
    signupToggle() {
      this.signupPage = true;
      this.signinPage = false;
      this.clearFields();
    },
    clearFields() {
      this.email = "";
      this.password = "";
      this.name = "";
      this.isLoading = false;
    },
    validateEmail(v) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(v);
    },
    //user signup and logins
    signupUser() {
      this.isLoading = true;
      if (this.$refs.createForm.validate()) {
        fauth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((cred) => {
            return db.collection("users").doc(cred.user.uid).set({
              name: this.name,
            });
          })
          .then(
            () => {
              this.$router.push("/");
            },
            (err) => alert(err.message)
          );
      } else {
        alert("Invalid details entered!");
      }
      this.isLoading = false;
    },
    signinUser() {
      this.isLoading = true;
      if (this.$refs.loginForm.validate()) {
        this.isLoading = true;
        fauth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push("/");
          })
          .catch((err) => alert(err.message));
      } else {
        alert("Invalid details entered!");
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.form-over {
  -moz-box-shadow: -2px -1px 16px -9px rgba(0, 0, 0, 0.74);
  box-shadow: -2px -1px 16px -9px rgba(0, 0, 0, 0.74);
  background: linear-gradient(to right, #39a299, #016c82);

  color: white;
}
.form-over.signup {
  color: white;
  background: linear-gradient(to right, #006b81, #3aa39a);
}
.form-below {
  -moz-box-shadow: -2px -1px 16px -9px rgba(0, 0, 0, 0.74);
  box-shadow: -2px -1px 16px -9px rgba(0, 0, 0, 0.74);
}
</style>