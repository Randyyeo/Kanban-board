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
          <input
            type="text"
            placeholder="Update Board Name"
            v-model="newName"
            class="form-control"
          />
          <button class="btn btn-primary ms-2" @click="update(index)">
            Update
          </button>
        </div>
        <h3>
          {{ arr.desc }}
          <i
            style="cursor: pointer; font-size: 25px"
            @click="modelArr[index].updateDesc = true"
            class="fas fa-edit"
          ></i>
        </h3>
        <div class="d-flex mb-3 w-50" v-if="modelArr[index].updateDesc">
          <input
            type="text"
            placeholder="Update Board Description"
            v-model="newDesc"
            class="form-control"
          />
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
                    <label class="form-label">Column Colour</label>
                    <input
                      type="color"
                      class="form-control w-25"
                      v-model="modelArr[index].back"
                    />
                    <label class="form-label">Header Colour</label>
                    <input
                      type="color"
                      class="form-control w-25"
                      v-model="modelArr[index].color"
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
          <div class="p-3 mb-3" :style="'background-color:' + sub.back">
            <div
              class="d-flex justify-content-between"
              :style="'color:' + sub.color"
            >
              <h3>{{ index1 }}</h3>
              <i
                @click="removeCard(index, index1)"
                style="font-size: 24px; cursor: pointer"
                class="fas fa-times"
              ></i>
            </div>
            

            
            <draggable
              class="list-group kanban-column"
              :list="sub.list"
              :group="{ name: 'tasks', put: sub.disable }"
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
import Vue from 'vue'
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
      alert: false,
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
          back: "",
          color: "",
          updateCard: false,
        },
      },
      arrArrays: {
        Tasks: {
          desc: "Tasks that are outstanding",
          cols: {
            ToDo: {
              max: 4,
              disable: true,
              back: "blue",
              color: "white",
              list: [
                { name: "Code Sign Up Page", date: "", description: "" },
                { name: "Test Dashboard", date: "", description: "" },
                { name: "Style Registration", date: "", description: "" },
                { name: "Help with Designs", date: "", description: "" },
              ],
            },
            InProgress: {
              back: "yellow",
              color: "black",
              max: 2,
              disable: true,
              list: [],
            },
            Done: {
              back: "green",
              color: "black",
              max: 4,
              disable: true,
              list: [],
            },
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
    // whenever question changes, this function will run
    arrArrays: {
      // This will let Vue know to look inside the array
      deep: true,
      // We have to move our method to a handler field
      handler() {
        for (var arr in this.arrArrays) {
          for (var sub in this.arrArrays[arr].cols) {
            if (
              this.arrArrays[arr].cols[sub].list.length >=
              this.arrArrays[arr].cols[sub].max
            ) {
              this.arrArrays[arr].cols[sub].disable = false;
              
            } else {
              this.arrArrays[arr].cols[sub].disable = true;
            }
          }
        }
        console.log("hi")
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
      this.newDesc = "";
      this.modelArr[index].updateDesc = false;
    },
    removeCard(index, index1) {
      
      Vue.delete(this.arrArrays[index].cols, index1)
      
    },
    remove(index, index1, index2) {
      var list = this.arrArrays[index].cols[index1]["list"];
      for (var i = 0; i < list.length; i++) {
        if (i === index2) {
          list.splice(i, 1);
        }
      }

      this.arrArrays[index].cols[index1]["list"] = list;
    },
    addTask(index) {
      if (this.modelArr[index].select && this.modelArr[index].taskName) {
        var date = new Date();
        date = String(date).substring(4, 15);
        console.log(this.arrArrays);
        var list = this.arrArrays[index].cols[this.modelArr[index].select].list;
        list.push({
          name: this.modelArr[index].taskName,
          date,
          description: this.modelArr[index].taskDescription,
        });
        this.$set(
          this.arrArrays[index].cols[this.modelArr[index].select],
          "list",
          list
        );
        /* this.arrArrays[index].cols[this.modelArr[index].select].list.push({
          name: this.modelArr[index].taskName,
          date,
          description: this.modelArr[index].taskDescription,
        })
        console.log(this.arrArrays); */
      }
      this.modelArr[index].select = "";
      this.modelArr[index].taskName = "";
      this.modelArr[index].taskDescription = "";
    },
    addBoard() {
      this.$set(this.arrArrays, this.name, { desc: "", cols: {} });
      this.$set(this.modelArr, this.name, {
        updateTitle: false,
        updateDesc: false,
        select: null,
        taskName: null,
        taskDescription: null,
        colName: null,
        numberMax: null,
        back: "",
        color: "",
      });

      this.add_status = false;
      this.name = "";
    },
    addCol(index) {
      this.$set(this.arrArrays[index].cols, this.modelArr[index].colName, {
        max: this.modelArr[index].numberMax,
        list: [],
        disable: true,
        back: this.modelArr[index].back,
        color: this.modelArr[index].color,
      });

      this.modelArr[index]["colName"] = null;
      this.modelArr[index]["numberMax"] = null;
      this.modelArr[index]["color"] = null;
    },
    onStart(moved) {
      var col = moved.to.parentNode.getElementsByTagName("h3")[0].innerText;

      var index =
        moved.to.parentNode.parentNode.parentNode.getElementsByTagName("h1")[0]
          .innerText;
      this.initialIndex = index;
      this.inititalCol = col;
      console.log(this.initialIndex);
      console.log(this.inititalCol);
    },
    onEnd(moved) {
      var col = moved.to.parentNode.getElementsByTagName("h3")[0].innerText;

      var index =
        moved.to.parentNode.parentNode.parentNode.getElementsByTagName("h1")[0]
          .innerText;

      console.log(col);
      console.log(index);
      console.log(this.arrArrays);
      /* this.max = this.arrArrays[index].cols[col].max 
      if (this.arrArrays[index].cols.list.length > this.max){
        
        var remove = this.arrArrays[index].cols.list.splice(this.afterposition, 1)
        console.log(remove)
        this.arrArrays[this.initialIndex][this.inititalCol].list.splice(this.initialposition, 0, {name: remove[0].name, date: remove[0].date});
        
      } */
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
