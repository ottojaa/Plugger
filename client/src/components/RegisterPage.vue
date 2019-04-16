<template>

  <v-content>
    <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>register form</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form v-on:submit="register">
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
                     <v-text-field
                      prepend-icon="lock"
                      v-model="firstname"
                      name="firstname"
                      label="First Name"
                      required
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="lock"
                      v-model="lastname"
                      name="lastname"
                      label="Last Name"
                      required
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="register">register</v-btn>
                    <v-btn class="button" color="pink" @click="$router.push('/register')">Register</v-btn>
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
export default {
  data: () => ({
    valid: true,
    username: "",
    firstname: "",
    lastname: "",
    email: "",
  }),

  methods: {
    register() {
      let formData = new FormData();
      formData.append("username", this.username);
      formData.append("password", this.password);
      formData.append("firstname", this.firstname);
      formData.append("lastname", this.lastname);
      PlugService.register(formData);
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>