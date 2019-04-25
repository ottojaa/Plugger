<template>
  <div class="container">
    <h1>Create a new plug</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="title"
        ref="title"
        name="title"
        :counter="30"
        :rules="[v => !!v || 'Title is required', v => (v && v.length <= 30) || 'Title must be less than 30 characters']"
        label="Title"
        required
      ></v-text-field>
      <v-textarea
        v-model="details"
        ref="details"
        name="details"
        placeholder="A description of your project"
        label="Details"
        required
      ></v-textarea>
      <v-select
        v-model="select"
        ref="category"
        name="category"
        :items="items"
        label="Category"
        required
      ></v-select>
      <h1 style="margin-top: 40px">Contact Information</h1>
      <v-list two-line>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="indigo">mail</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Email</v-list-tile-title>
            <v-list-tile-sub-title>
              <v-text-field v-model="email" name="email">kasjd</v-text-field>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="indigo">phone</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Phone</v-list-tile-title>
            <v-list-tile-sub-title>
              <v-text-field v-model="phone" name="phone">kasjd</v-text-field>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="indigo">location_on</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Location</v-list-tile-title>
            <v-list-tile-sub-title>
              <v-text-field v-model="location" name="location">kasjd</v-text-field>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-btn color="primary" @click="$refs.plug.click()">Choose files</v-btn>
      <input v-show="false" id="plug" ref="plug" type="file" name="plug" @change="fileChanged">
      <v-btn :disabled="!valid" color="success" @click="submitPlug">Post plug</v-btn>
      <v-btn color="error" @click="reset">Reset Form</v-btn>
    </v-form>
    <hr>
    <p class="error" v-if="error">{{error}}</p>
  </div>
</template>

<script>
/* eslint-disable */
import PlugService from "../PlugService.js";
import UploadButton from "vuetify-upload-button";

export default {
  name: "PlugComponent",
  data() {
    return {
      plug: "",
      show: false,
      plugs: [],
      valid: true,
      select: null,
      items: ["Graphic Design", "Art", "Music", "Programming"],
      error: "",
      title: "",
      category: "",
      plug: "",
      details: "",
      phone: "",
      email: "",
      location: "",
      owner: "",
      user: '',
      username: '',
      firstname: '',
      lastname: ''
    };
  },

  methods: {
    submitPlug() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("category", this.select);
      formData.append("details", this.details);
      formData.append("plug", this.file);
      formData.append("email", this.email);
      formData.append("phone", this.phone);
      formData.append("location", this.location);
      formData.append("owner", this.owner);
      formData.append("username", this.username);
      formData.append("firstname", this.firstname);
      formData.append("lastname", this.lastname);
      PlugService.insertPlug(formData);
    },
    fileChanged() {
      this.file = this.$refs.plug.files[0];
    },
    reset() {
      this.$refs.form.reset();
    }
  },
  components: {
    "upload-btn": UploadButton
  },

  async created() {
    console.log(PlugService.user) // TODO ---> convert lifecycle to simple if else (if user not logged in ( which is when plugservice.user === undefined), push to login)
    try {
      this.user = await PlugService.getUser();
    } catch (err) {
      this.error = err.message;
    } finally {
      this.username = this.user.username
      this.firstname = this.user.firstname
      this.lastname = this.user.lastname
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
div.container {
  max-width: 800px;
  margin: 0 auto;
}
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}
div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15 px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
