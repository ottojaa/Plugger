<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img v-bind:src="'https://pluggerexpress.herokuapp.com/' + plug.fileName"    height="300px">
          <v-layout column fill-height>
            <v-card-title>
              <v-btn dark icon @click="gallery">
                <v-icon>chevron_left</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn v-show="ownedByCurrentUser" dark icon class="mr-3">
                <v-icon>edit</v-icon>
              </v-btn>

              <v-btn v-show="ownedByCurrentUser" @click="deletePlug" dark icon >
                <v-icon>delete</v-icon>
              </v-btn>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-title v-show="!ownedByCurrentUser" class="white--text pl-5 pt-5" >
              <div class="display-1 pl-5 pt-5 "><p class="background">{{plug.title}}</p></div>
            </v-card-title>
          </v-layout>
        </v-img>
        <v-toolbar v-show="ownedByCurrentUser" color="white" flat>
          <v-toolbar-title class="grey--text text--darken-4">Edit your plug</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon light>
            <v-icon color="grey darken-2">edit</v-icon>
          </v-btn>
        </v-toolbar>
        <v-form v-show="ownedByCurrentUser">
          <v-form :readonly="true">
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12 md12>
                <v-text-field label="Title" class="purple-input" v-bind:readonly="readonly" required name="title"  v-model="title"/>
              </v-flex>
              <v-flex xs12 md12>
                <v-text-field label="Description" v-model="details" name="details" required  v-bind:readonly="readonly" class="purple-input"/>
              </v-flex>
              <v-flex xs12 md12>
                <v-text-field label="Phone" v-model="location" name="phone" required  v-bind:readonly="readonly" class="purple-input"/>
              </v-flex>
              <v-flex xs12 md12>
                <v-text-field label="Email Address" v-model="email" name="email" required  v-bind:readonly="readonly" class="purple-input"/>
              </v-flex>
              <v-flex xs12 md12>
                <v-text-field label="Location" v-model="location" name="location" required  v-bind:readonly="readonly" class="purple-input"/>
              </v-flex>
              <v-flex xs12 text-xs-right>
                <v-btn
                  @click="readOnly"
                  class="mx-0 font-weight-light"
                  color="success"
                >Edit Plug</v-btn>
                <v-btn
                  v-bind:disabled="readonly"
                  @click="editPlug"
                  class="mx-0 font-weight-light white"
                  color="error"
                >Save Changes</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
        </v-form>
        <v-list v-show="!ownedByCurrentUser" two-line>
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
              <v-list-tile-title>{{plug.location}}</v-list-tile-title>
              <v-list-tile-sub-title>Location</v-list-tile-sub-title>
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
        
        <div v-if="!ownedByCurrentUser">
          <v-btn @click="savePlug" color="success">Accept plug</v-btn>
        </div>
      </v-card>
      <v-alert
      v-if="status"
      :value="true"
      type="success"
      dismissible
      transition="scale-transition"
    >
      Added to your plugs succesfully!
    </v-alert>
    </v-flex>
  </v-layout>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import router from "../routes.js";
import PlugService from "../PlugService";
const serialize = require("form-serialize");
export default {
  data() {
    return {
      plug: "",
      readonly: true,
      error: "",
      ownedByCurrentUser: false,
      email: "",
      title: '',
      details: '',
      phone: '',
      location: '',
      email: '',
      plugId: '',
      status: false
    };
  },
  methods: {
    acceptPlug() {
      this.readonly = !this.readonly;
    },
    gallery() {
      this.$router.push('/');
    },
    deletePlug() {
      PlugService.deletePlug(this.$route.query.plugId).then(() => {
        this.$router.push('/myPlugs')
      })
    },
    readOnly() {
      this.readonly = !this.readonly;
    },
    editPlug() {
      let formData = new FormData();
      formData.append("email", this.email);
      formData.append("phone", this.phone);
      formData.append("location", this.location);
      formData.append('title', this.title);
      formData.append('details', this.details);
      const query = serialize(formData);
      PlugService.editPlug(formData, this.plugId);
    },
    savePlug() {
      PlugService.addToMyPlugs(this.user._id, this.$route.query.plugId).then(() => {
        this.status = true
      })
    }
  },
  async created() {
    console.log(this.$route.query.plugId);
    try {
      this.user = await PlugService.getUser()
    } catch (err) {
      this.error = err.message;
    } finally {
      if (this.user){
        PlugService.user = this.user
        this.plugId = this.$route.query.plugId;
        this.plug = await PlugService.getPlug(this.$route.query.plugId);
        this.title = this.plug.title
        this.details = this.plug.details
        this.phone = this.plug.phone
        this.email = this.plug.email
        this.location = this.plug.location
        console.log(this.plug)
        if (this.plug.owner === this.user.id) {
          this.ownedByCurrentUser = true
        }
      }else{
        /* this.$router.push('/login') */
      }
      
      
    }
  }
};
</script>
<style scoped>
.main {
  width: 60%;
}
.background{
  font-weight:bold;
}
.white{
  color: white;
}
</style>