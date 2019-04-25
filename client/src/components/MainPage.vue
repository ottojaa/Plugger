
<template>
  <div class="container">
    <v-card elevation="14">
      <v-card-title class="headline font-weight-regular blue lighten-1 white--text">
        Search
        <v-combobox
          name="searchterm"
          :items="titles"
          id="searchField"
          persistent-hint
          prepend-icon="mdi-city"
        >
          <template v-slot:append-outer>
            <v-slide-x-reverse-transition mode="out-in"></v-slide-x-reverse-transition>
          </template>
        </v-combobox>
        <v-btn flat color="black" @click="search">
          <v-icon>search</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
    <v-layout justify-center row wrap fill-height>
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
            <v-expansion-panel-content
            >
              <template v-slot:header>
                <div>Plug Creator Info</div>
              </template>
              <v-card>
                <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
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
      show: [],
      plugs: [],
      valid: true,
      select: null,
      items: ["Graphics Design", "Art", "Music", "Programming"],
      error: "",
      title: "",
      category: "",
      plug: "",
      details: "",
      isEditing: false,
      searchterm: "",
      titles: [],
      plugId: "",
      loginstatus: '',
      user: ''
    };
  },

  methods: {
    fileChanged() {
      this.file = this.$refs.plug.files[0];
    },
    reset() {
      this.$refs.form.reset();
    },
    toggle(index) {
      this.show, index, !this.show[index]
    },
    getId(index) {
      this.plugId = this.plugs[index]._id;
      this.$router.push({ path: "/plug/", query: { plugId: this.plugId } });
    },
    async search() {
      this.search = document.getElementById('searchField').value;
      this.plugs = await PlugService.search(this.search); 
      this.search = ''
    },
    async resetSearch() {
      this.plugs = await PlugService.getPlugs();
    }
  },
  components: {
    "upload-btn": UploadButton
  },

  async created() {
    this.user = await PlugService.getUser()
    try {
      this.plugs = await PlugService.getPlugs();
      this.titles = await PlugService.getTitles();
    } catch (err) {
      this.error = err.message;
    } finally {
      console.log(this.titles);
    }
  }
};
</script>

<style scoped>

</style>