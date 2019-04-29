<template>
  <v-app>
    <v-toolbar
      app
      v-if="showNavbar"
    >
      <v-toolbar-title class="headline text-uppercase">
        <span>Plugger</span>
        <span class="font-weight-light"></span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        @click="$router.push('addPlug')"
        target="_blank"
      >
        <span class="mr-2">Create a new plug</span>
      </v-btn>
      <v-btn
        flat
        color="indigo"
        @click="$router.push('/')"
        target="_blank"
      >
        <span class="mr-2">All plugs</span>
      </v-btn>
      <v-btn
        flat
        color="blue"
        @click="logOut"
        target="_blank"
      >
        <span class="mr-2">Logout</span>
      </v-btn>

      <div class="text-xs-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              dark
              v-on="on"
            >
              {{user.username}}
            </v-btn>
          </template>
          <v-list>
            <v-list-tile
              v-for="(item, index) in items"
              :key="index"
              @click="pushTo(item.pushto)"
            >
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable */
import GalleryPage from "@/components/GalleryPage";
import LoginPage from "@/components/LoginPage";
import router from "./routes.js";
import RegisterPage from "@/components/RegisterPage";
import PlugService from "./PlugService.js";
import UserPage from "@/components/UserPage";
import AddPlugPage from "@/components/AddPlugPage";
import MyPlugs from "@/components/MyPlugs";
import SavedPlugsPage from "@/components/SavedPlugsPage";
export default {
  name: "App",
  components: {
    GalleryPage,
    LoginPage,
    RegisterPage,
    UserPage,
    AddPlugPage,
    MyPlugs,
    SavedPlugsPage
  },
  data() {
    return {
      user: "",
      email: "",
      lastname: "",
      firstname: "",
      username: "",
      readonly: true,
      loggedIn: false,
      showNavbar: false,
      items: [
        { title: "Profile", pushto: "userpage" },
        { title: "Plugs by me", pushto: "myPlugs" },
        { title: "Saved Plugs", pushto: "saved" }
      ]
    };
  },
  methods: {
    readOnly() {
      this.readonly = !this.readonly;
    },
    pushTo(location) {
      this.$router.push(location);
    },
    async logOut() {
      await PlugService.logout().then(() => {
        this.$router.push("/login");
      });
    }
  },
  async created() {
    try {
      this.user = await PlugService.getUser();
    } catch (err) {
      this.error = err.message;
    } finally {
      console.log(this.user);
      PlugService.user = this.user;
    }
  },
  async updated() {
    try {
      this.user = await PlugService.getUser();
    } catch (err) {
      this.error = err.message;
    } finally {
      if (this.user) {
        console.log(this.user)
        PlugService.user = this.user;
        this.showNavbar = true;
      }
    }
  }
};
</script>