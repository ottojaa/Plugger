<template >
  <v-container v-show="loginstatus" class="main" fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <v-form :readonly="true">
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12 md12>
                <v-text-field class="purple-input" v-bind:readonly="readonly" label="User Name" v-model="username"/>
              </v-flex>
              <v-flex xs12 md12>
                <v-text-field label="Email Address" v-model="email" v-bind:readonly="readonly" class="purple-input"/>
              </v-flex>
              <v-flex xs12 md12>
                <v-text-field label="First Name" v-model="firstname" v-bind:readonly="readonly" class="purple-input"/>
              </v-flex>
              <v-flex xs12 md12>
                <v-text-field label="Last Name" v-model="lastname" v-bind:readonly="readonly" class="purple-input"/>
              </v-flex>
              <v-flex xs12 text-xs-right>
                <v-btn
                  @click="readOnly"
                  class="mx-0 font-weight-light"
                  color="success"
                >Update Profile</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-flex>
      <v-flex xs12 md4>
        <v-avatar slot="offset" class="mx-auto d-block" size="130">
          <img src="https://i.imgur.com/ppqan5G.jpg">
        </v-avatar>
        <v-card-text class="text-xs-center">
          <p
            class="card-description font-weight-light"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import router from "../routes.js";
import PlugService from "../PlugService";
export default {
  data() {
    return {
      user: "",
      email: "",
      lastname: "",
      firstname: "",
      username: "",
      readonly: true,
      loginstatus: false
    };
  },
  methods: {
    readOnly() {
      this.readonly = !this.readonly;
    }
  },
  async created() {
    try {
      this.user = await PlugService.getUser()
    } catch (err) {
      this.error = err.message;
    } finally {
      if (this.user){
        PlugService.user = this.user
        this.plug = await PlugService.getPlug(this.$route.query.plugId);
        this.loginstatus = true
        this.username = this.user.username;
        this.email = this.user.email;
        this.firstname = this.user.firstname;
        this.lastname = this.user.lastname;
        if (this.plug === this.user.id) {
          this.ownedByCurrentUser = true
        }
      }else{
        this.$router.push('/login')
      }
      
    }
  }
};
</script>
<style scoped>
.main {
  width: 60%;
}
</style>