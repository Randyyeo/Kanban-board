<template>
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
          <h5 class="modal-title" id="exampleModalLabel">Add a column</h5>
        </div>
        <div class="modal-body">
          <label class="form-label">Number of maximum cards</label>
          <input
            type="number"
            class="form-control"
            
            v-model="max"
          />
          <label class="form-label">Column Name</label>
          <input
            type="text"
            class="form-control"
            
            v-model="name"
          />
          <label class="form-label">Column Colour</label>
          <input
            type="color"
            class="form-control w-25"
            
            v-model="back"
          />
          <label class="form-label">Header Colour</label>
          <input
            type="color"
            class="form-control w-25"
            
            v-model="color"
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
</template>

<script>
export default {
    props: ['display'],
    name: 'modal-column',
    data(){
        return {
            max: null,
            name: null,
            back: "#009fab",
            color: "#ffffff",
        }
    },
    methods:{
        addCol(display){
            this.$emit('addCol', display, this.max, this.name, this.back, this.color)
            this.max = null;
            this.name = null;
            this.back = "#009fab";
            this.color = "#ffffff"
        }
    }
};
</script>

<style lang="scss" scoped></style>
