<template>
  <v-layout
    justify-center
    row
    wrap
    v-if="noPlugs"
    fill-height
  >
    <v-flex
      xs1
      sm2
      md3
      class="margin"
      v-for="(plug, index) in plugs"
      v-bind:item="plug"
      v-bind:index="index"
      v-bind:key="plug._id"
    >
      <v-card
        class="ma-2"
        hover:true
      >
        <v-img
          v-bind:src="'https://pluggerexpress.herokuapp.com/' + plug.fileName"
          aspect-ratio="2.75"
        ></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0 background">{{plug.title}}</h3>
            <div>{{plug.details}}</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn
            flat
            color="purple"
            @click="getId(index)"
          >View Plug</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>Plug Views</div>
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
  <v-layout
    v-else
    justify-center
    row
    wrap
    fill-height
  >
    <div>
      <h1>No saved plugs found</h1>
    </div>
  </v-layout>
</template>
  <script>
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
      testi: "",
      valid: true,
      select: null,
      items: ["Graphics Design", "Art", "Music", "Programming"],
      error: "",
      title: "",
      noPlugs: true,
      category: "",
      plug: "",
      details: "",
      isEditing: false,
      searchterm: "",
      titles: [],
      plugId: "",
      loginstatus: false,
      user: ""
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
      this.show, index, !this.show[index];
    },
    getId(index) {
      this.plugId = this.plugs[index]._id;
      this.$router.push({ path: "/plug/", query: { plugId: this.plugId } });
    },
    async search() {
      console.log(this.value);
      this.search = document.getElementById("searchField").value;
      this.plugs = await PlugService.search(this.search);
      this.search = "";
    },
    async resetSearch() {
      this.plugs = await PlugService.getPlugs();
    }
  },
  components: {
    "upload-btn": UploadButton
  },

  async created() {
    try {
      this.user = await PlugService.getUser();
    } catch (err) {
      this.error = err.message;
    } finally {
      if (this.user) {
        PlugService.user = this.user;
        this.plugs = await PlugService.getSavedPlugs(this.user.id);
        if (this.plugs.length === 0) {
          this.noPlugs = false;
        } else {
          this.noPlugs = true;
        }
        this.titles = await PlugService.getTitles();
      } else {
        /* this.$router.push("/login"); */
      }
    }
  }
};
</script>
  