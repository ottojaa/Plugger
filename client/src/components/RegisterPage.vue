<template>
  <v-content>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" id="form">
                  <v-text-field
                    prepend-icon="person"
                    v-model="username"
                    ref="username"
                    name="username"
                    :counter="10"
                    label="Username"
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="email"
                    v-model="email"
                    ref="email"
                    name="email"
                    label="E-mail"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="firstname"
                    name="firstname"
                    ref="firstname"
                    label="First Name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="lastname"
                    name="lastname"
                    ref="lastname"
                    label="Last Name"
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    v-model="password"
                    ref="password"
                    name="password"
                    type="password"
                    label="Password"
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    v-model="passwordAgain"
                    ref="password"
                    name="passwordAgain"
                    type="password"
                    label="Type password again"
                    required
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <div class="center">
                    <v-btn color="primary" @click="register">register</v-btn>
                    <v-btn
                      class="button white--text"
                      color="pink"
                      @click="$router.push('/login')"
                    >login</v-btn>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-content>
</template>
<script>
/* eslint-disable */

import PlugService from "../PlugService.js";
import router from "../routes.js";
const serialize = require("form-serialize");
export default {
  data() {
    return {
      valid: true,
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordAgain: ""
    };
  },

  methods: {
    register() {
      const form = document.querySelector("#form");
      let formData = new FormData();
      formData.set("username", this.username);
      formData.set("email", this.email);
      formData.set("password", this.password);
      formData.set("firstname", this.firstname);
      formData.set("lastname", this.lastname);
      const query = serialize(form);
      PlugService.register(query)
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
<style scoped>
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>