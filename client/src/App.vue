<template>
  <v-app>
    <v-toolbar app>
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
        @click="$router.push('myPlugs')"
        target="_blank"
      >
        <span class="mr-2">My Plugs</span>
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
      <v-btn
        flat
        color="blue"
        @click="$router.push('/userpage')"
        target="_blank"
      >
        <span class="mr-2">Dashboard</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable */
import GalleryPage from '@/components/GalleryPage'
import LoginPage from '@/components/LoginPage'
import router from "./routes.js";
import RegisterPage from '@/components/RegisterPage'
import PlugService from './PlugService.js'
import UserPage from '@/components/UserPage'
import AddPlugPage from '@/components/AddPlugPage'
import MyPlugs from '@/components/MyPlugs'

export default {
  name: 'App',
  components: {
    GalleryPage,
    LoginPage,
    RegisterPage,
    UserPage,
    AddPlugPage,
    MyPlugs
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
      loginstatus: '',
    };
  },
  methods: {
    readOnly() {
      this.readonly = !this.readonly;
    },
    async logOut() {
      await PlugService.logout().then(() => {
        this.$router.push("/login");
      });
    }
  },
  async created() {
    try {
      this.user = await PlugService.getUser()
    } catch (err) {
      this.error = err.message;
    } finally {
      console.log(this.user)
      PlugService.user = this.user
    }
  }
  /* async created() {
    try {
      this.loginstatus = await PlugService.checkLogin();
      this.user = await PlugService.user;
    } catch (err) {
      console.log(err);
      this.error = err.message;
    } finally {
      console.log(this.loginstatus.data.passport.user)
      if (this.loginstatus.data.passport.user !== null || this.loginstatus.data.passport.user !== 'undefined') {
        console.log(this.loginstatus)
        this.username = this.user.data.username;
        this.email = this.user.data.email;
        this.firstname = this.user.data.firstname;
        this.lastname = this.user.data.lastname;
      } else {
        this.$router.push('/login')
      }
      
    }
  } */
}
</script>
