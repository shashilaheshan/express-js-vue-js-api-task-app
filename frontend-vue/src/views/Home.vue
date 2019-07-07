<template>
  
    <div >
     
        <AddTask />
      

      <!-- <Users /> -->
    </div>
  
</template>

<script>
// @ is an alias to /src

import AddTask from "@/components/AddTask";

export default {
  name: "home",
  components: {
    AddTask: AddTask,
   
  }
};
</script>
