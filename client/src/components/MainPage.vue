
<template>
  <div class="container">
    <h1>Latest Plugs</h1>
    <!-- <form class="create-plug">
      <label for="create-plug">Post a plug</label>
      <input type="text" id="title" v-model="title">
      <input type="text" id="category" v-model="category">
      <input id="fileupload" type="file" v-on:change="FileUpload()">
      <input type="text" id="details" v-model="details">
      <button v-on:click="submitPlug"></button>
    </form>-->
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
      <v-text-field v-model="details" ref="details" name="details" label="Details" required></v-text-field>
      <v-select
        v-model="select"
        ref="category"
        name="category"
        :items="items"
        label="Category"
        required
      ></v-select>
      <v-btn color="primary" @click="$refs.plug.click()">Choose files</v-btn>
      <input v-show="false" id="plug" ref="plug" type="file" name="plug" @change="fileChanged" >
      <v-btn :disabled="!valid" color="success" @click="submitPlug">Post plug</v-btn>
      <v-btn color="error" @click="reset">Reset Form</v-btn>
    </v-form>
    <hr>
    <p class="error" v-if="error">{{error}}</p>
    <div class="plugs-container">
      <div
        class="post"
        v-for="(plug, index) in plug"
        v-bind:item="plug"
        v-bind:index="index"
        v-bind:key="plug._id"
      >
        {{`${plug.createdAt.getDate()}/${plug.createdAt.getMonth()}/${plug.createdAt.getFullYear()}`}}
        <p class="text">{{plug.text}}</p>
      </div>
    </div>
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
      plug: '',
      valid: true,
      select: null,
      items: ["Graphics Design", "Art", "Music", "Programming"],
      error: "",
      title: "",
      category: "",
      plug: "",
      details: ""
    };
  },

  methods: {
    submitPlug() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("category", this.select);
      formData.append("details", this.details);
      formData.append("plug", this.file);
      PlugService.insertPlug(formData);
    },
    fileChanged() {
      this.file = this.$refs.plug.files[0];
      console.log(this.file);
    },
    reset() {
      this.$refs.form.reset();
    },
  },
  components: {
    "upload-btn": UploadButton
  },

  async created() {
    try {
      this.posts = await PlugService.getPlugs;
    } catch (err) {
      this.error = err.message;
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
