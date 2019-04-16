<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login form</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form v-on:submit="login">
                    <v-text-field
                      prepend-icon="person"
                      v-model="username"
                      name="username"
                      :counter="10"
                      label="Username"
                      required
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="lock"
                      v-model="password"
                      name="password"
                      label="Password"
                      required
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="login">Login</v-btn>
                    <v-btn class="button" color="pink" @click="$router.push('/register')">Register</v-btn>
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
import PlugService from "../PlugService.js";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  name: "Login",

  methods: {
    login() {
      let formData = new FormData();
      formData.append("username", this.username);
      formData.append("password", this.password);
      PlugService.login(formData);
    }
  }
};
</script>
<style scoped>
button {
  color: white !important;
}
</style>