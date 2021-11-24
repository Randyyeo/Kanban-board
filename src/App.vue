<template>
  <div class="container-fluid px-5 mt-5">
    <h1 class="text-center text-white">Kanban Board</h1>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li
          class="breadcrumb-item"
          v-for="(arr, index) in arrArrays"
          :key="index"
        >
          <a href="#" @click="change(index)">{{ index }}</a>
        </li>
      </ol>
    </nav>
    <div class="row mt-5">
      <div class="col d-flex justify-content-end">
        <button
          v-if="!add_status"
          class="btn float-right"
          @click="add_status = true"
          style="background-color: #c7f9fc"
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
          <button
            class="btn ms-2"
            style="background-color: #c7f9fc"
            @click="addBoard"
          >
            Add
          </button>
        </div>
      </div>
    </div>
    <div>
      <div class="row mb-5 mt-3" >
        <h1 style="color: white">
          {{ display }}
          <i
            style="cursor: pointer; font-size: 25px"
            @click="modelArr[display].updateTitle = true"
            class="fas fa-edit"
          ></i>
        </h1>
        <div class="d-flex mb-3 w-50" v-if="modelArr[display].updateTitle">
          
          <input
            type="text"
            placeholder="Update Board Name"
            v-model="newName"
            class="form-control"
          />
          <button
            class="btn ms-2"
            style="background-color: #c7f9fc"
            @click="update(display)"
          >
            Update
          </button>
        </div>
        <h3 style="color: white">
          {{ displayArr.desc }}
          <i
            style="cursor: pointer; font-size: 25px"
            @click="modelArr[display].updateDesc = true"
            class="fas fa-edit"
          ></i>
        </h3>
        <div class="d-flex mb-3 w-50" v-if="modelArr[display].updateDesc">
          <input
            type="text"
            placeholder="Update Board Description"
            v-model="newDesc"
            class="form-control"
          />
          <button
            class="btn ms-2"
            style="background-color: #c7f9fc"
            @click="updateDesc(display)"
          >
            Update
          </button>
        </div>

        <div class="row mb-3">
          <div class="col-md-6 col-lg-4 d-flex">
            <button
              style="background-color: #c7f9fc"
              type="button"
              class="btn"
              data-bs-toggle="modal"
              :data-bs-target="'#exampleModal' + display"
            >
              Add Task
            </button>

            <!-- Modal -->
            <div
              class="modal fade"
              :id="'exampleModal' + display"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
              style="border-radius: 20px"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content" style="border-radius: 20px">
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
                      v-model="modelArr[display].select"
                    >
                      <option
                        :value="index1"
                        v-for="(sub, index1) in displayArr.cols"
                        :key="index1"
                      >
                        {{ index1 }}
                      </option>
                    </select>
                    <label class="form-label">Task Name</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="modelArr[display].taskName"
                    />
                    <label class="form-label">Task Description</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="modelArr[display].taskDescription"
                    />
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
            <button
              type="button"
              class="btn ms-2"
              data-bs-toggle="modal"
              :data-bs-target="'#exampleModal1' + display"
              style="background-color: #c7f9fc"
            >
              Add Column
            </button>

            <!-- Modal -->
            <div
              class="modal fade"
              :id="'exampleModal1' + display"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content" style="border-radius: 20px">
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
                      v-model="modelArr[display].numberMax"
                    />
                    <label class="form-label">Column Name</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="modelArr[display].colName"
                    />
                    <label class="form-label">Column Colour</label>
                    <input
                      type="color"
                      class="form-control w-25"
                      v-model="modelArr[display].back"
                    />
                    <label class="form-label">Header Colour</label>
                    <input
                      type="color"
                      class="form-control w-25"
                      v-model="modelArr[display].color"
                    />
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
                      @click="addCol(display)"
                      class="btn"
                      style="background-color: #c7f9fc"
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
          class="col-md-4 col-lg-3 col-sm-6"
          v-for="(sub, index1) in displayArr.cols"
          :key="index1"
        >
          <div
            class="p-3 mb-3 border"
            :style="'background-color:' + sub.back + ';border-radius: 20px;'"
          >
            <div
              class="d-flex justify-content-between"
              :style="'color:' + sub.color"
            >
              <h3>{{ index1 }}</h3>
              <i
                @click="removeCard(display, index1)"
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
                      @click="remove(display, index1, index2)"
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
import Vue from "vue";
export default {
  components: {
    //import draggable as a component
    draggable,
  },
  data() {
    return {
      // for new tasks
      moving: false,
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
          back: "#009fab",
          color: "#ffffff",
          updateCard: false,
        },
      },
      display: null,
      arrArrays: {
        Tasks: {
          desc: "Tasks that are outstanding",
          cols: {
            ToDo: {
              max: 4,
              disable: true,
              back: "#009fab",
              color: "#ffffff",
              list: [
                { name: "Code Sign Up Page", date: "", description: "" },
                { name: "Test Dashboard", date: "", description: "" },
                { name: "Style Registration", date: "", description: "" },
                { name: "Help with Designs", date: "", description: "" },
              ],
            },
            InProgress: {
              back: "#009fab",
              color: "#ffffff",
              max: 2,
              disable: true,
              list: [],
            },
            Done: {
              back: "#009fab",
              color: "#ffffff",
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
  created(){
    this.display = Object.keys(this.arrArrays)[0]
    
  },
  watch: {
    // whenever question changes, this function will run
    arrArrays: {
      // This will let Vue know to look inside the array
      deep: true,
      // We have to move our method to a handler field
      handler() {
        if (this.moving){
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
          
          this.moving = false;
          
        }
        
        
      },
    },
  },
  computed:{
    displayArr(){
      return this.arrArrays[this.display]
    }
  },
  methods: {
    change(index){
      this.display = index;
    },
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
      Vue.delete(this.arrArrays[index].cols, index1);
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
        back: "#009fab",
        color: "#ffffff",
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
      this.modelArr[index]["back"] = "#009fab";
      this.modelArr[index]["color"] = "#ffffff";
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
      this.moving = true;
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
body {
  background-image: linear-gradient(to right, #1a164c, #9c9db7);
}
</style>
