<template>
  <div class="container mt-5">
    <div class="row mt-5">
      <div class="col d-flex justify-content-end">
        <button
          v-if="!add_status"
          class="btn btn-primary float-right"
          @click="add_status = true"
        >
          +
        </button>
        <div v-if="add_status" class="d-flex">
          <input
            type="text"
            v-model="name"
            placeholder="Name"
            class="form-control"
          />
          <button class="btn btn-primary ms-2" @click="addBoard">Add</button>
        </div>
      </div>
    </div>
    <div v-for="(arr, index) in arrArrays" :key="index">
      <p class="text-danger" v-if="error">Error has occurred</p>
      <div class="row mt-5 border border-2 rounded-2">
        <h1>{{ index }}</h1>
        <div class="row mb-3">
          <div class="col-md-6 col-lg-4 d-flex">
            <!--             <input
              id="input-2"
              v-model="newTask"
              required
              placeholder="Enter Task"
              @keyup.enter="add"
              class="form-control"
            />
            <button @click="add(index)" class="ml-3 btn btn-primary ms-2">
              Add
            </button> -->
            <!-- Button trigger modal -->
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              :data-bs-target="'#exampleModal' + index"
            >
              Add Task
            </button>

            <!-- Modal -->
            <div
              class="modal fade"
              :id="'exampleModal' + index"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Modal title
                    </h5>
                  </div>
                  <div class="modal-body">
                    <label class="form-label">Add to which column</label>
                    <select
                      class="form-select mb-3"
                      aria-label="Default select example"
                      v-model="select"
                    >
                      <option
                        :value="index1"
                        v-for="(sub, index1) in arr"
                        :key="index1"
                      >
                        {{ index1 }}
                      </option>
                    </select>
                    <label class="form-label">Task Name</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="taskName"
                    />
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      data-bs-dismiss="modal"
                      type="button"
                      @click="addTask(index)"
                      class="btn btn-primary"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-primary ms-2"
              data-bs-toggle="modal"
              :data-bs-target="'#exampleModal1' + index"
            >
              Add Column
            </button>

            <!-- Modal -->
            <div
              class="modal fade"
              :id="'exampleModal1' + index"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Modal title
                    </h5>
                  </div>
                  <div class="modal-body">
                    <label class="form-label">Number of maximum cards</label>
                    <input
                      type="number"
                      class="form-control"
                      v-model="numberMax"
                    />
                    <label class="form-label">Column Name</label>
                    <input type="text" class="form-control" v-model="colName" />
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      data-bs-dismiss="modal"
                      type="button"
                      @click="addCol(index)"
                      class="btn btn-primary"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-md-6 col-lg-4"
          v-for="(sub, index1) in arr"
          :key="index1"
        >
          <div class="p-2 alert alert-secondary">
            <h3>{{ index1 }}</h3>
            <!-- Backlog draggable component. Pass arrBackLog to list prop -->
            <draggable
              class="list-group kanban-column"
              :list="sub.list"
              group="tasks"
              :move="checkMove"
              @start="onStart"
              @end="onEnd"
            >
              <div
                class="card w-100"
                v-for="element in sub.list"
                :key="element.name"
                style="width: 18rem"
              >
                <div class="card-body">
                  <h5 class="card-title">{{ element.name }}</h5>
                  <p class="card-text">
                    {{ element.date }}
                  </p>
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import draggable
import draggable from "vuedraggable";

export default {
  components: {
    //import draggable as a component
    draggable,
  },
  data() {
    return {
      // for new tasks
      colName: null,
      numberMax: null,
      select: null,
      taskName: null,
      name: null,
      error: false,
      add_modal: false,
      add_status: false,
      max: 4,
      newTask: "",
      // 4 arrays to keep track of our 4 statuses

      arrArrays: {
        Tasks: {
          ToDo: {
            max: 4,
            list: [
              { name: "Code Sign Up Page", date: "" },
              { name: "Test Dashboard", date: "" },
              { name: "Style Registration", date: "" },
              { name: "Help with Designs", date: "" },
            ],
          },
          InProgress: { max: 2, list: [] },
          Done: { max: 4, list: [] },
        },
      },
      length: null,
      initialIndex: null,
      inititalCol: null,
      afterIndex: null,
      afterCol: null,
      initialposition: null,
      afterposition: null
    };
  },
  methods: {
    addTask(index) {
      if (this.select && this.taskName) {
        var date = new Date();
        date = String(date).substring(4, 15);
        this.arrArrays[index][this.select]["list"].push({
          name: this.taskName,
          date,
        });
      }
      this.select = null;
      this.taskName = "";
    },
    addBoard() {
      this.arrArrays[this.name] = {};
      this.name = "";
    },
    addCol(index) {
      this.arrArrays[index][this.colName] = { max: this.numberMax, list: [] };
      this.colName = "";
      this.numberMax = "";
    },
    onStart(moved){
      
      var col = moved.to.parentNode.getElementsByTagName("h3")[0].innerText
      
      var index = moved.to.parentNode.parentNode.parentNode.getElementsByTagName("h1")[0].innerText
      this.initialIndex = index;
      this.inititalCol = col
      
    },
    onEnd(moved){
      
      var col = moved.to.parentNode.getElementsByTagName("h3")[0].innerText
      
      var index = moved.to.parentNode.parentNode.parentNode.getElementsByTagName("h1")[0].innerText
      
      this.max = this.arrArrays[index][col].max 
      if (this.arrArrays[index][col].list.length > this.max){
        
        var remove = this.arrArrays[index][col].list.splice(this.afterposition, 1)
        
        this.arrArrays[this.initialIndex][this.inititalCol].list.splice(this.initialposition, 0, {name: remove[0].name, date: remove[0].date});
        
      }
    },
    checkMove(evt) {
      
      this.initialposition = evt.draggedContext.index
      this.afterposition = evt.draggedContext.futureIndex
    },
  },
};
</script>

<style>
.kanban-column {
  min-height: 300px;
}
</style>
