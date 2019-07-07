<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <h4>Add Task</h4>

        <div class="form-group ml-5">
          <input type="text" class="form-control" v-model="task" v-bind:placeholder="placeholder" />

          <input
            type="button"
            @click="addTask()"
            class="btn btn-success mt-2"
            value="SAVE"
            :disabled="task==''||task==null"
          />
        </div>
      </div>
      <div class="col-md-6">
        <h1>All Tasks</h1>
        <div class="row" v-for="task in tasks">
          <div class="col-md-6">
            <h1>
              {{task.task}}
              <button class="btn btn-danger" @click="deleteTask(task.id)">DELETE</button>
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <Email />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
import AllTasks from "@/components/Tasks";
import Email from "@/components/Email";
export default {
  name: "add-post",
  components: {
    AllTasks: AllTasks,
    Email: Email
  },
  data() {
    return {
      task: "",
      tasks: [],
      placeholder: "Enter task name"
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    async deleteTask(id) {
      await axios
        .get("http://localhost:3000/api/v1/delete/" + id)
        .then(res => {
          if (res.status == 200) {
            this.getTasks();
            swal({
              title: "Data deleted successfully.",

              icon: "info",
              dangerMode: false
            });
            //sssss
            //adding test
          } else {
            swal({
              title: "Something went wrong.",
              text: "Error ",
              icon: "error",
              dangerMode: true
            });
          }
        })
        .catch(error => {
          swal({
            title: "Something went wrong.",
            text: "Error " + error,
            icon: "error",
            dangerMode: true
          });
        });
    },
    async addTask() {
      if (this.task != null || this.task != "") {
        await axios
          .post("http://localhost:3000/api/v1/task", {
            task: this.task
          })
          .then(res => {
            console.log(res.status);
            if (res.status == 200) {
              swal("Task saved successfully");
              this.task = "";
              this.getTasks();
            } else if (res.status == 500) {
              swal({
                title: "Something went wrong.",
                text: "Error " + res.message,
                icon: "error",
                dangerMode: true
              });
            }
          })
          .catch(error => {
            swal({
              title: "Something went wrong.",
              text: "Error " + error,
              icon: "error",
              dangerMode: true
            });
          });
      }
    },
    async getTasks() {
      await axios
        .get("http://localhost:3000/api/v1/tasks")
        .then(res => {
          if (res.status == 200) {
            // console.log(res.data);
            this.tasks = res.data["message"];
          }
        })
        .catch(err => {});
    }
  }
};
</script>