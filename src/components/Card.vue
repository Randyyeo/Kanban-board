<template>
  <div class="card w-100 mb-3 indiv" style="width: 18rem">
    <div class="card-body">

      <div class="card-title d-flex justify-content-between">
        <button
          class="btn btn-danger labels mb-1"
          v-if="element.type == 'high'"
        >
          High Priority
        </button>
        <button
          class="btn btn-warning labels mb-1"
          v-if="element.type == 'med'"
        >
          Medium Priority
        </button>
        <button
          class="btn btn-success labels mb-1"
          v-if="element.type == 'low'"
        >
          Low Priority
        </button>
        <i
          @click="remove(display, index1, index2)"
          style="font-size: 24px; cursor: pointer"
          class="fas fa-times cancel"
        ></i>
      </div>
      <h5 style="font-size: 18px; width: 90%">{{ element.name }}</h5>
      <p class="card-text" style="font-size: 15px">
        {{ element.description }}
      </p>
    </div>
    <div class="card-footer" v-if="element.date">
      Date Added: {{ element.date }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["element", "display", "index1", "index2", "type"],
  name: "card",
  methods: {
    remove(display, index1, index2) {
      this.$emit("remove", display, index1, index2);
    },
  },
};
</script>

<style scoped>
.labels {
  padding: 0 5px;
  font-size: 15px;
  height: 25px;
}

.indiv .cancel{
    visibility: hidden;
    opacity: 0;
    transition: all 0.2s ease-in-out;

}

.indiv:hover .cancel{
    visibility: visible;
    opacity: 1; 
    transition: all 0.2s ease-in-out;
}
</style>
