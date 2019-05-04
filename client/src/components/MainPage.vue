
<template>
  <div
    v-show="loginstatus"
    class="container"
  >
    <v-card elevation="14">
      <v-card-title class="headline font-weight-regular pink accent-3 white--text center">
        <v-form
          ref="form"
          class="form white--text"
          @submit="validate"
        >
          <v-text-field
            v-model="value"
            label="Search"
            class="white--text"
            required
          ></v-text-field>
          <v-btn @click="validate">Search</v-btn>
        </v-form>
      </v-card-title>
    </v-card>
    <v-alert
      v-if="$route.params.status"
      :value="true"
      type="success"
      dismissible
      transition="scale-transition"
    >
      {{$route.params.status}}
    </v-alert>
    <v-layout
      justify-center
      row
      wrap
      fill-height
    >
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
        <v-card
          class="ma-2"
          hover:true
        >
          <v-img
            v-bind:src="'https://pluggerexpress.herokuapp.com/' + plug.fileName"
            aspect-ratio="2.75"
          ><template v-slot:placeholder>
              <v-layout
                fill-height
                align-center
                justify-center
                ma-0
              >
                <v-progress-circular
                  :size="80"
                  indeterminate
                  color="green"
                ></v-progress-circular>
              </v-layout>
            </template></v-img>
          <v-card-title primary-title>
            <h3 class="headline mb-0 background">{{plug.title}}</h3>
          </v-card-title>
          <div style="margin-left: 20px">
            {{plug.details}}
          </div>
          <v-list two-line>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                  <p style="color: #756ac7;">Category</p>
                </v-list-tile-title>
                <v-list-tile-sub-title></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                {{plug.category}}
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
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
                <div>Plug Creator Info</div>
              </template>
              <v-card>
                <v-list two-line>
                  <v-list-tile>
                    <v-list-tile-avatar>
                      <img src="https://i.imgur.com/ppqan5G.jpg">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title>{{plug.username}}</v-list-tile-title>
                      <v-list-tile-sub-title>Username</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon>arrow_forward_ios</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>

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

                </v-list>
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
      testi: "",
      valid: true,
      select: null,
      value: "",
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
    async validate() {
      if (this.$refs.form.validate()) {
        this.plugs = await PlugService.search(this.value);
        this.$refs.form.reset();
      }
    },
    async search() {
      console.log(this.value);
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
        this.plugs = await PlugService.getPlugs();
        this.titles = await PlugService.getTitles();
        this.loginstatus = true;
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style scoped>
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
}
.center {
  justify-content: center;
}
.v-text-field__slot {
  color: white;
}
</style>