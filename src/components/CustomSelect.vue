<template>
  <label v-bind:for="nameSelect">{{ nameSelect }}</label>
  <select v-bind:name="nameSelect" v-bind:id="nameSelect" v-on:change="filterSelected">
    <option value="">---</option>
    <option v-for="filter in filters" v-bind:value="filter">{{filter}}</option>

  </select>

</template>

<script>
export default {
  name: "CustomSelect",
  props:{
    filters:{
      type: Set,
    },
    nameSelect:{
      type: String,
    }

},

  methods: {
    filterSelected(event) {
      this.$emit('filter-selected', event.target.value)
    },
   },
}
</script>

<style scoped>

</style>