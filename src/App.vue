<template>
  <div class="container-fluid px-5 mt-5">
    <h1
      class="text-center text-white"
      style="font-size: 50px; font-family: 'Bungee Inline', cursive"
    >
      Kanban Board
    </h1>
    <ul class="nav nav-tabs" style="font-family: 'Montserrat', sans-serif">
      <li
        v-for="(arr, index) in arrArrays"
        :key="index"
        :class="[display !== index ? +'' : 'constant', 'nav-item', 'tab']"
        style="
          transform: skew(-20deg);
          margin-left: 10px;
          border-top-right-radius: 12px;
          border-top-left-radius: 12px;
        "
      >
        <a
          href="#"
          class="nav-link"
          style="
            text-decoration: none;
            border-top-right-radius: 12px;
            border-top-left-radius: 12px;
          "
          @click="change(index)"
          ><h3
            v-if="!modelArr[index].updateTitle"
            style="transform: skew(20deg); font-size: 30px"
          >
            
            {{arr.name}}
            <i
              v-if="display == index"
              style="cursor: pointer; font-size: 25px"
              @click="modelArr[index].updateTitle = true"
              class="fas fa-edit"
            ></i>
          </h3>
          <div v-if="modelArr[index].updateTitle" class="d-flex">
            <input
              style="transform: skew(20deg)"
              type="text"
              placeholder="Update Board Name"
              v-model="newName"
              class="form-control"
            />
            <button
              class="btn ms-2"
              style="background-color: #c7f9fc; transform: skew(20deg)"
              @click="update(index)"
            >
              Update
            </button>
          </div></a
        >
      </li>
    </ul>
    <div class="row mt-5" style="font-family: 'Montserrat', sans-serif;">
      
      <div class="col d-flex justify-content-end">
        <button
          v-if="!add_status"
          class="btn float-right"
          @click="add_status = true"
          style="background-color: #c7f9fc; font-size: 14px;"
        >
          Add extra board
        </button>
        <div v-if="add_status" class="d-flex" style="font-size: 14px;">
          <input
            type="text"
            v-model="name"
            placeholder="Name"
            class="form-control"
            style="font-size: 14px;"
          />
          <button
            class="btn ms-2"
            style="background-color: #c7f9fc; font-size: 14px;"
            @click="addBoard"
          >
            Add
          </button>
        </div>
        <button
            type="button"
            class="btn ms-2"
            data-bs-toggle="modal"
            :data-bs-target="'#exampleModal1' + display"
            style="background-color: #c7f9fc; font-size: 14px;"
          >
            Add Column
          </button>

          <!-- Modal -->
          <modal-column :display="display" @addCol="addCol"> </modal-column>
      </div>
    </div>
    
    <div style="font-family: 'Montserrat', sans-serif">
      <h4 v-if="error" class="text-danger">{{ error }}</h4>
      <div class="row mb-5 my-3">
        <h3 style="color: white; font-size: 25px" class="mb-3">
          {{displayArr.desc}}
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

        <div class="d-flex" style="width: 100%; overflow-x: auto">
          <column
            v-for="(sub, index1) in displayArr.cols"
            :key="index1"
            :back="sub.back"
            :color="sub.color"
            :display="display"
            :index1="index1"
            :cols="displayArr.cols"
            @removeCard="removeCard"
            @updateCol="updateCol"
            @addTask="addTask"
            :max="sub.max"
          >
            <draggable
              class="list-group kanban-column"
              :list="sub.list"
              :group="{ name: 'tasks', put: sub.disable }"
              :move="checkMove"
            >
              <card
                :element="element"
                v-for="(element, index2) in sub.list"
                :index2="index2"
                :index1="index1"
                :display="display"
                :key="element.name"
                @remove="remove"
              ></card>
            </draggable>
          </column>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import draggable
import draggable from "vuedraggable";
import Vue from "vue";
import card from "./components/Card.vue";
import column from "./components/Column.vue";

import modalColumn from "./components/ModalColumn.vue";
export default {
  components: {
    //import draggable as a component
    draggable,
    card,
    column,

    modalColumn,
  },
  data() {
    return {
      // for new tasks
      moving: false,
      newDesc: null,
      newName: null,
      name: null,
      error: null,
      alert: false,
      add_status: false,
      max: 4,
      newTask: "",
      // 4 arrays to keep track of our 4 statuses
      modelArr: [
        {
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
      ],
      display: "",
      arrArrays: [
        {
          name: "Tasks",
          desc: "Outstanding Tasks",
          cols: {
            ToDo: {
              max: 4,
              disable: true,
              back: "#009fab",
              color: "#ffffff",
              list: [
                {
                  name: "Code Sign Up Page",
                  date: "",
                  description: "",
                  type: "high",
                },
                {
                  name: "Test Dashboard",
                  date: "",
                  description: "",
                  type: "low",
                },
                {
                  name: "Style Registration",
                  date: "",
                  description: "",
                  type: "med",
                },
                {
                  name: "Help with Designs",
                  date: "",
                  description: "",
                  type: "low",
                },
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
            Doness: {
              back: "#009fab",
              color: "#ffffff",
              max: 1,
              disable: true,
              list: [],
            },
            
          },
        },
      ],
      length: null,
      initialIndex: null,
      inititalCol: null,
      afterIndex: null,
      afterCol: null,
      initialposition: null,
      afterposition: null,
      update_status: false
    };
  },
  created() {
    this.display = 0;
  },
  watch: {
    arrArrays: {
      // This will let Vue know to look inside the array
      deep: true,

      handler() {
        
          for (var arr of this.arrArrays) {
            for (var sub in arr.cols) {
              if (
                arr.cols[sub].list.length >=
                arr.cols[sub].max
              ) {
                arr.cols[sub].disable = false;
              } else {
                arr.cols[sub].disable = true;
              }
            }
          }
        
        
      },
    },
  },
  computed: {
    displayArr() {
      console.log("HI")
      return this.arrArrays[this.display];
    },
  },
  
  methods: {
    status_update(display){
      console.log(display)
    },
    change(index) {
      this.display = index;
    },
    update(index) {
      this.update_status = true;
      
      
      /* delete Object.assign(this.arrArrays, {
        [newname]: this.arrArrays[index],
      })[index];

      delete Object.assign(this.modelArr, {
        [newname]: this.modelArr[index],
      })[index]; */
      this.arrArrays[index].name = this.newName;
      
      
      this.modelArr[index].updateTitle = false;
      this.display = index;
      
      this.newName = "";
    },
    updateDesc(index) {
      
      
      this.arrArrays[index].desc = this.newDesc;
      console.log(this.arrArrays[index])
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
    addTask(index, desc, name, select, type) {
      if (select && name && desc) {
        var date = new Date();
        date = String(date).substring(4, 15);

        var list = this.arrArrays[index].cols[select].list;
        
        if (list.length < this.arrArrays[index].cols[select].max) {
          this.error = null;
          list.push({
            name: name,
            date,
            description: desc,
            type: type,
          });
          this.$set(this.arrArrays[index].cols[select], "list", list);
        } else {
          this.error = `Column ${select} has already reached its maximum number of cards`;
        }
      }
    },
    addBoard() {
      /* this.$set(this.arrArrays, this.name, { desc: "", cols: {} }); */
      this.arrArrays.push({name: this.name, desc: "", cols: {} })
      /* this.$set(this.modelArr, this.name, {
        updateTitle: false,
        updateDesc: false,
        select: null,
        taskName: null,
        taskDescription: null,
        colName: null,
        numberMax: null,
        back: "#009fab",
        color: "#ffffff",
      }); */
      this.modelArr.push({
        updateTitle: false,
        updateDesc: false,
        select: null,
        taskName: null,
        taskDescription: null,
        colName: null,
        numberMax: null,
        back: "#009fab",
        color: "#ffffff",
      })
      this.display++;
      this.add_status = false;
      this.name = "";
    },
    updateCol(display, old, max, name, back, color) {
      console.log(display)
      console.log(this.arrArrays[display].cols)
      
      delete Object.assign(this.arrArrays[display].cols, {
        [name]: this.arrArrays[display].cols[old],
      })[old];
      
      this.arrArrays[display].cols[name].max = max;
      this.arrArrays[display].cols[name].back = back;
      this.arrArrays[display].cols[name].color = color;
    },
    addCol(index, max, name, back, color) {
      this.$set(this.arrArrays[index].cols, name, {
        max: max,
        list: [],
        disable: true,
        back: back,
        color: color,
      });
      
    },
    /* onStart(moved) {
      var col = moved.to.parentNode.getElementsByTagName("h3")[0].innerText;
      this.moving = true;
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
      
    }, */
    checkMove(evt) {
      this.initialposition = evt.draggedContext.index;
      this.afterposition = evt.draggedContext.futureIndex;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Bungee+Inline&display=swap");

.kanban-column {
  min-height: 300px;
}
body {
  background-image: linear-gradient(to right, #1a164c, #9c9db7);
}

.tab:hover {
  transition: all 0.5s ease;
  background-color: white;
}

.tab a {
  color: white;
}

.constant {
  background-color: white;
}

.constant a {
  color: black !important;
}

.tab:hover a {
  color: black !important;
  transition: all 0.5s ease;
}
</style>
