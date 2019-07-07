<template>
  <h1>All Tasks</h1>
</template>
<script>
import axios from "axios";
export default {
  name: "all-tasks",
  props: ["taskss"],
  data() {
    return {
      taskss: []
    };
  },

  method: {
    async getTasks() {
      await axios
        .get("http://localhost:3000/api/v1/tasks")
        .then(res => {
          if (res.status == 200) {
            console.log(res.data);
            //this.tasks = res.data["message"];
          }
        })
        .catch(err => {});
    }
  }
};
</script>