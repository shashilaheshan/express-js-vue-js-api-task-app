<template>
  <div>
    <div class="card col-md-4" v-for="item in user">
      <div class="card-header">
        <h1>{{item.name}}</h1>
      </div>
      <div class="card-content">
        <h1>{{item.age}}</h1>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src

import axios from "axios";
export default {
  name: "users",
  components: {},

  data() {
    return {
      user: []
    };
  },
  computed: {
    users() {
      return this.user.length;
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      await axios.get("http://localhost:3000/api/v1/posts").then(res => {
        this.user = res.data;
      });
    }
  }
};
</script>
