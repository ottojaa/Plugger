<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img v-bind:src="'https:/localhost:3000/' + plug.fileName"    height="300px">
          <v-layout column fill-height>
            <v-card-title>
              <v-btn dark icon @click="gallery">
                <v-icon>chevron_left</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn dark icon class="mr-3">
                <v-icon>edit</v-icon>
              </v-btn>

              <v-btn dark icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">{{plug.title}}</div>
            </v-card-title>
          </v-layout>
        </v-img>

        <v-list two-line>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{plug.phone}}</v-list-tile-title>
              <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">mail</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{plug.email}}</v-list-tile-title>
              <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">location_on</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>1400 Main Street</v-list-tile-title>
              <v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action></v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Description</v-list-tile-title>
              <v-list-tile-sub-title>{{plug.details}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action></v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Category</v-list-tile-title>
              <v-list-tile-sub-title>{{plug.category}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import router from "../routes.js";
import PlugService from "../PlugService";
export default {
  data() {
    return {
      plug: "",
      readonly: true,
      error: ""
    };
  },
  methods: {
    acceptPlug() {
      this.readonly = !this.readonly;
    },
    gallery() {
      this.$router.push('/');
    }
  },
  async created() {
    console.log(this.$route.query.plugId);
    try {
      this.plug = await PlugService.getPlug(this.$route.query.plugId);
    } catch (err) {
      this.error = err.message;
    } finally {
      console.log(this.plug);
    }
  }
};
</script>
<style scoped>
.main {
  width: 60%;
}
</style>