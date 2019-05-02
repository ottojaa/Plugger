<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container
          fluid
          fill-height
        >
          <v-layout
            align-center
            justify-center
          >
            <v-flex
              xs12
              sm8
              md4
            >
              <v-card class="elevation-12">
                <v-toolbar
                  dark
                  color="primary"
                >
                  <v-toolbar-title>Login form</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form
                    ref="form"
                    id="form"
                  >
                    <v-text-field
                      prepend-icon="person"
                      v-model="username"
                      name="username"
                      label="Username"
                      required
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="lock"
                      v-model="password"
                      type="password"
                      name="password"
                      label="Password"
                      required
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <div class="status">
                      {{ statusMessage }}
                    </div>
                    <div class="center">
                      <v-btn
                        color="primary"
                        @click="login"
                      >Login</v-btn>
                      <v-btn
                        class="button"
                        color="pink"
                        @click="$router.push('/register')"
                      >Register</v-btn>
                    </div>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import router from "../routes.js";
import PlugService from "../PlugService.js";
const serialize = require("form-serialize");

export default {
  data() {
    return {
      username: "",
      password: "",
      statusMessage: ""
    };
  },
  name: "Login",

  methods: {
    login() {
      const form = document.querySelector("#form");
      let formData = new FormData();
      formData.append("username", this.username);
      formData.append("password", this.password);
      const query = serialize(form);
      PlugService.login(query)
        .then(res => {
          PlugService.user = res;
          if (res.data.error) {
            this.statusMessage = res.data.error;
          } else {
            this.$router.push("/");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    async updated() {
      try {
        this.user = await PlugService.getUser();
      } catch (err) {
        this.error = err.message;
      } finally {
        console.log(this.user);
        if (this.user) {
          PlugService.user = this.user;
          this.$router.push("/");
        } else {
          this.statusMessage = "Please enter your credentials";
        }
      }
    }
  }
};
</script>
<style scoped>
button {
  color: white !important;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.status {
  color: red;
}
</style>