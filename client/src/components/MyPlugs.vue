<template>
<div class="container">
<v-layout align-center justify-center row wrap fill-height>
      <v-flex
        xs2
        sm3
        md4
        class="margin"
        v-for="(plug, index) in plugs"
        v-bind:item="plug"
        v-bind:index="index"
        v-bind:key="plug._id"
      >
        <v-card class="ma-2" hover:true>
          <v-img v-bind:src="'https:/localhost:3000/' + plug.fileName" aspect-ratio="2.75"></v-img>
          <v-card-title primary-title >
            <div>
              <h3 class="headline mb-0 background">{{plug.title}}</h3>
              <div>{{plug.details}}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="purple" @click="getId(index)">View Plug</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
          <v-expansion-panel
            expand
          >
            <v-expansion-panel-content>
              <template v-slot:header>Creator Information</template>
              
              <v-card>
                <v-divider></v-divider>
                <v-card-text>Sasklfdjasdflj sdlkfjskldj lksdffsd</v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card>
        <v-spacer></v-spacer>
      </v-flex>
    </v-layout>
    </div>
 </template>
 <script>
/* eslint-disable */
import PlugService from "../PlugService.js";
import UploadButton from "vuetify-upload-button";
import router from "../routes.js";

export default {
  name: "PlugComponent",
  data() {
    return {
      plug: "",
      plugs: [],
      items: ["Graphics Design", "Art", "Music", "Programming"],
      title: "",
      category: "",
      details: "",
      isEditing: false,
      currentUser: ''
    };
  },

  methods: {
    reset() {
      this.$refs.form.reset();
    },
    getId(index) {
      this.plugId = this.plugs[index]._id;
      this.$router.push({ path: "/plug/", query: { plugId: this.plugId } });
    }
  },
  components: {
    "upload-btn": UploadButton
  },

  async created() {
    console.log(PlugService.user)
    try {
      this.plugs = await PlugService.myPlugs(this.loginstatus.data.passport.user);
    } catch (err) {
      this.error = err.message;
    } finally {
      console.log(this.plugs);
    }
  }
};
</script>