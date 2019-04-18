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
        color="indigo"
        @click="$router.push('/')"
        target="_blank"
      >
        <span class="mr-2">All plugs</span>
      </v-btn>
      <v-btn
        flat
        color="blue"
        @click="$router.push('/login')"
        target="_blank"
      >
        <span class="mr-2">Login</span>
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
import RegisterPage from '@/components/RegisterPage'
import UserPage from '@/components/UserPage'
import AddPlugPage from '@/components/AddPlugPage'

export default {
  name: 'App',
  components: {
    GalleryPage,
    LoginPage,
    RegisterPage,
    UserPage,
    AddPlugPage,
  },
  data () {
    return {
      //
    }
  }
}
</script>
