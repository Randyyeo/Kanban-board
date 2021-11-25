<template>
  <div class="Column">
    <div
      class="p-3 mb-3 border"
      :style="'background-color:' + back + ';border-radius: 20px; width: 250px;'"
    >
      <div class="d-flex justify-content-between" :style="'color:' + color">
        <h4>{{ index1 }}</h4>
        <div class="dropdown">
          <i
            class="fas fa-ellipsis-v"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="cursor: pointer"
          ></i>

          <ul
            class="dropdown-menu"
            style="border-radius: 20px"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <a
                class="dropdown-item"
                href="#"
                @click="removeCard(display, index1)"
                >Delete</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                data-bs-toggle="modal"
                :data-bs-target="'#exampleModal2' + index1"
                >Update</a
              >
            </li>
          </ul>
          <i
            class="fas fa-plus ms-2"
            style="cursor: pointer"
            data-bs-toggle="modal"
            :data-bs-target="'#exampleModal' + index1"
          ></i>
        </div>
      </div>
      <slot></slot>
    </div>
    <div
      class="modal fade"
      :id="'exampleModal2' + index1"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-radius: 20px">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add a column</h5>
          </div>
          <div class="modal-body">
            <label class="form-label">Number of maximum cards</label>
            <input type="number" class="form-control" v-model="max" />
            <label class="form-label">Column Name</label>
            <input type="text" class="form-control" v-model="index1" />
            <label class="form-label">Column Colour</label>
            <input type="color" class="form-control w-25" v-model="back" />
            <label class="form-label">Header Colour</label>
            <input type="color" class="form-control w-25" v-model="color" />
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
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
    <modal-task :display="display" :col="index1" @addTask="addTask">
    </modal-task>
  </div>
</template>

<script>
import modalTask from "./ModalTask.vue";
export default {
  props: ["back", "display", "index1", "color", "max", ],
  name: "column",
  components: {
    modalTask,
  },

  methods: {
    removeCard(display, index1) {
      this.$emit("removeCard", display, index1);
    },
    addCol(display) {
      this.$emit(
        "updateCol",
        display,
        this.max,
        this.index1,
        this.back,
        this.color
      );
    },
    addTask(display, desc, name, select, type){
        this.$emit("addTask", display, desc, name, select, type)
    }
  },
};
</script>

<style>
.Column{
    
    
    margin-right: 20px;
    
}

.Column .dropdown {
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s ease-in-out;
}

.Column:hover .dropdown {
  visibility: visible;
  opacity: 1;
  transition: all 0.2s ease-in-out;
}

.dropdown-menu {
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
}

.dropdown-menu a {
  border-radius: 8px;
}
</style>
