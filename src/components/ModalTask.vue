<template>
  <div
    class="modal fade"
    
    :id="'exampleModal' + col"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    style="border-radius: 20px"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content" style="border-radius: 20px">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add a Task</h5>
        </div>
        <div class="modal-body">
          
          <label class="form-label">Task Name</label>
          <input
            type="text"
            class="form-control"
            v-model="name"
          />
          <label class="form-label">Task Description</label>
          <input
            type="text"
            class="form-control"
            v-model="desc"
          />
          <label class="form-label">Labels</label>
          <select
            class="form-select mb-3"
            aria-label="Default select example"
            v-model="type"
          >
            <option value="low">Low Priority</option>
            <option value="med">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn"
            data-bs-dismiss="modal"
            style="background-color: #c7f9fc"
          >
            Close
          </button>
          <button
            data-bs-dismiss="modal"
            type="button"
            @click="addTask(display)"
            class="btn"
            style="background-color: #c7f9fc"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'modal-task',
    props: ['display', 'col'],
    data(){
        return {
            desc: null,
            name: null,
            
            type: null
        }
    },
    methods:{
        addTask(display){
            
            this.$emit("addTask", display, this.desc, this.name, this.col, this.type)
            this.desc = ""
            this.name = ""
            this.type = ""
        }
    }
};
</script>

<style lang="scss" scoped></style>
