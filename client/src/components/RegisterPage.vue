<template>
  <v-content>
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
                <v-toolbar-title>Register form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form
                  v-model="valid"
                  ref="form"
                  id="form"
                >
                  <v-text-field
                    prepend-icon="person"
                    v-model="username"
                    :rules="rules"
                    ref="username"
                    name="username"
                    :counter="10"
                    label="Username"
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="email"
                    v-model="email"
                    :rules="rules"
                    ref="email"
                    name="email"
                    label="E-mail"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="firstname"
                    :rules="rules"
                    name="firstname"
                    ref="firstname"
                    label="First Name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="lastname"
                    :rules="rules"
                    name="lastname"
                    ref="lastname"
                    label="Last Name"
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    v-model="password"
                    ref="password"
                    :rules="rules"
                    name="password"
                    type="password"
                    label="Password"
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    v-model="passwordAgain"
                    :rules="rules"
                    ref="password"
                    name="passwordAgain"
                    type="password"
                    label="Type password again"
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="phone"
                    v-model="phone"
                    :rules="rules"
                    ref="phone"
                    name="phone"
                    type="number"
                    label="Phone Number"
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="location"
                    v-model="location"
                    :rules="rules"
                    ref="location"
                    name="location"
                    type="text"
                    label="Location"
                    required
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <div class="center">
                    <v-btn
                      :disabled="!valid"
                      color="primary"
                      @click="register"
                    >submit</v-btn>

                    <v-btn
                      class="button white--text"
                      color="pink"
                      @click="$router.push('/login')"
                    >Back</v-btn>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
            <v-alert
              v-if="error"
              :value="true"
              type="error"
              dismissible
              transition="scale-transition"
            >{{error}}
            </v-alert>
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
      valid: false,
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      error: "",
      password: "",
      passwordAgain: "",
      location: "",
      phone: "",
      rules: [v => !!v || "Name is required"]
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
      formData.set("location", this.location);
      formData.set("phone", this.phone);
      const query = serialize(form);
      PlugService.register(query)
        .then(user => {
          if (user.data.error) {
            this.error = user.data.error;
          } else {
            console.log(user);
          }
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