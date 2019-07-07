<template>
  <div>
    <h2>Send Email</h2>
    <div class="form-group">
      <input type="text" v-model="email" class="form-control" />
    </div>
    <div class="form-group">
      <textarea v-model="body" class="form-control" />
    </div>
    <div class="form-group">
      <input
        type="button"
        class="btn btn-success"
        @click="sendMail()"
        value="Send Mail"
        :disabled="email==''||body==''"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "email",
  data() {
    return {
      email: "",
      body: ""
    };
  },
  methods: {
    async sendMail() {
      var config = {
        headers: { "Content-Type": "application/json" }
      };
      await axios
        .post("http://localhost:3000/api/v1/sendmail", {
          email: this.email,
          body: this.body
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>