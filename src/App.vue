<template>
  <div class="container mt-5">
    <h1 class="text-center">Kanban Board</h1>
    <div class="row mt-5">
      <div class="col d-flex justify-content-end">
        <button
          v-if="!add_status"
          class="btn btn-primary float-right"
          @click="add_status = true"
        >
          Add extra board
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
    <div>
      <p class="text-danger" v-if="error">Error has occurred</p>
      <div
        class="row my-5 border border-2 rounded-2"
        v-for="(arr, index) in arrArrays"
        :key="index"
      >
        <h1>
          {{ index }}
          <i
            style="cursor: pointer; font-size: 25px"
            @click="modelArr[index].updateTitle = true"
            class="fas fa-edit"
          ></i>
        </h1>
        <div class="d-flex mb-3 w-50" v-if="modelArr[index].updateTitle">
          <input type="text" placeholder="Update Board Name" v-model="newName" class="form-control" />
          <button class="btn btn-primary ms-2" @click="update(index)">
            Update
          </button>
        </div>
        <h3>{{arr.desc}} <i
            style="cursor: pointer; font-size: 25px"
            @click="modelArr[index].updateDesc = true"
            class="fas fa-edit"
          ></i></h3>
        <div class="d-flex mb-3 w-50" v-if="modelArr[index].updateDesc">
          <input type="text" placeholder="Update Board Description" v-model="newDesc" class="form-control" />
          <button class="btn btn-primary ms-2" @click="updateDesc(index)">
            Update
          </button>
        </div>

        <div class="row mb-3">
          <div class="col-md-6 col-lg-4 d-flex">
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
                      v-model="modelArr[index].select"
                    >
                      <option
                        :value="index1"
                        v-for="(sub, index1) in arr.cols"
                        :key="index1"
                      >
                        {{ index1 }}
                      </option>
                    </select>
                    <label class="form-label">Task Name</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="modelArr[index].taskName"
                    />
                    <label class="form-label">Task Description</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="modelArr[index].taskDescription"
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
                      v-model="modelArr[index].numberMax"
                    />
                    <label class="form-label">Column Name</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="modelArr[index].colName"
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
          v-for="(sub, index1) in arr.cols"
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
                class="card w-100 mb-3"
                v-for="(element, index2) in sub.list"
                :key="element.name"
                style="width: 18rem"
              >
                <div class="card-body">
                  <div class="card-title d-flex justify-content-between">
                    <h5>{{ element.name }}</h5>
                    <i
                      @click="remove(index, index1, index2)"
                      style="font-size: 24px; cursor: pointer"
                      class="fas fa-times"
                    ></i>
                  </div>
                  <p class="card-text">
                    {{ element.description }}
                  </p>
                </div>
                <div class="card-footer" v-if="element.date">
                  Date Added: {{ element.date }}
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
      newDesc: null,
      newName: null,
      name: null,
      error: false,
      
      add_status: false,
      max: 4,
      newTask: "",
      // 4 arrays to keep track of our 4 statuses
      modelArr: {
        Tasks: {
          updateTitle: false,
          updateDesc: false,
          select: null,
          taskName: null,
          taskDescription: null,
          colName: null,
          numberMax: null,
        },
      },
      arrArrays: {
        Tasks: {
          desc: "Tasks that are outstanding",
          cols: {
            ToDo: {
              max: 4,
              list: [
                { name: "Code Sign Up Page", date: "", description: "" },
                { name: "Test Dashboard", date: "", description: "" },
                { name: "Style Registration", date: "", description: "" },
                { name: "Help with Designs", date: "", description: "" },
              ],
            },
            InProgress: { max: 2, list: [] },
            Done: { max: 4, list: [] },
          },
        },
      },
      length: null,
      initialIndex: null,
      inititalCol: null,
      afterIndex: null,
      afterCol: null,
      initialposition: null,
      afterposition: null,
    };
  },
  watch: {
    arrArrays: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler() {
        console.log("The list of colours has changed!");
        return this.arrArrays;
      },
    },
  },
  methods: {
    update(index) {
      var newname = this.newName;
      delete Object.assign(this.arrArrays, {
        [newname]: this.arrArrays[index],
      })[index];
      this.modelArr[index].updateTitle = false;
      delete Object.assign(this.modelArr, { [newname]: this.modelArr[index] })[
        index
      ];
      this.newName = "";
    },
    updateDesc(index) {
      var newname = this.newDesc;
      this.arrArrays[index].desc = newname;
      this.newDesc = ""
      this.modelArr[index].updateDesc = false;
    },
    remove(index, index1, index2) {
      var list = this.arrArrays[index][index1]["list"];
      for (var i = 0; i < list.length; i++) {
        if (i === index2) {
          list.splice(i, 1);
        }
      }

      this.arrArrays[index][index1]["list"] = list;
      console.log(this.arrArrays);
    },
    addTask(index) {
      if (this.modelArr[index].select && this.modelArr[index].taskName) {
        var date = new Date();
        date = String(date).substring(4, 15);
        console.log(this.arrArrays);
        var list = this.arrArrays[index][this.modelArr[index].select].list;
        list.push({
          name: this.modelArr[index].taskName,
          date,
          description: this.modelArr[index].taskDescription,
        });
        this.$set(
          this.arrArrays[index][this.modelArr[index].select],
          "list",
          list
        );
        console.log(this.arrArrays);
      }
      this.modelArr[index].select = "";
      this.modelArr[index].taskName = "";
      this.modelArr[index].taskDescription = "";
    },
    addBoard() {
      this.$set(this.arrArrays, this.name, {});
      this.$set(this.modelArr, this.name, {
        updateTitle: false,
        updateDesc: false,
        select: null,
        taskName: null,
        taskDescription: null,
        colName: null,
        numberMax: null,
      });
      this.add_status = false;
      this.name = "";
    },
    addCol(index) {
      this.$set(this.arrArrays[index], this.modelArr[index].colName, {
        max: this.modelArr[index].numberMax,
        list: [],
      });

      this.modelArr[index]["colName"] = null;
      this.modelArr[index]["numberMax"] = null;
    },
    onStart(moved) {
      var col = moved.to.parentNode.getElementsByTagName("h3")[0].innerText;

      var index =
        moved.to.parentNode.parentNode.parentNode.getElementsByTagName("h1")[0]
          .innerText;
      this.initialIndex = index;
      this.inititalCol = col;
    },
    onEnd(moved) {
      var col = moved.to.parentNode.getElementsByTagName("h3")[0].innerText;

      var index =
        moved.to.parentNode.parentNode.parentNode.getElementsByTagName("h1")[0]
          .innerText;

      this.max = this.arrArrays[index][col].max;
      if (this.arrArrays[index][col].list.length > this.max) {
        var remove = this.arrArrays[index][col].list.splice(
          this.afterposition,
          1
        );
        console.log(remove);
        this.arrArrays[this.initialIndex][this.inititalCol].list.splice(
          this.initialposition,
          0,
          { name: remove[0].name, date: remove[0].date }
        );
        console.log(this.arrArrays);
      }
    },
    checkMove(evt) {
      this.initialposition = evt.draggedContext.index;
      this.afterposition = evt.draggedContext.futureIndex;
    },
  },
};
</script>

<style>
.kanban-column {
  min-height: 300px;
}
</style>
