<template>
  <div class="container">
    <h1>Latest Plugs</h1>
    <form class="create-plug" enctype="multipart/form-data">
      <label for="create-plug">Post a plug</label>
      <input type="text" id="title" v-model="title">
      <input type="text" id="category" v-model="category">
      <input id="fileupload" type="file" v-on:change="plug" ref="fileInput" />
    </form>
    <hr>
    <p class="error" v-if="error">{{error}}</p>
    <div class="plugs-container">
      <div class="post"
        v-for="(plug, index) in plugs"
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
import PlugService from '../PlugService.js'

export default {
  name: 'PlugComponent',
  data () {
    return {
      plugs: [],
      error: '',
      title: '',
      category: '',
      plug: '',
      details: ''
    }
  },
  methods: {
    submitFile(){
      let formData = new FormData();
    },
    handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
  },

  async created () {
    try {
      this.posts = await PlugService.getPlugs
    } catch (err) {
      this.error = err.message
    }
  }
}
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
