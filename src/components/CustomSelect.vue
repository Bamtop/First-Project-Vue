<template>
  <div class="filter">
  <label v-bind:for="nameSelect">{{ nameSelect }}</label>
  <select v-bind:name="nameSelect" v-bind:id="nameSelect" v-on:change="filterSelected">
    <option value="">---</option>
    <option v-for="filter in filters" v-bind:value="filter">{{filter}}</option>
  </select>
  </div>
</template>

<script>
export default {
  name: "CustomSelect",
  props:{
    filters:{
      type: Array,
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
  emits:{
    filterSelected:null,
  }
}
</script>

<style scoped>
.filter{
  padding-top: 0.5rem;
  padding-right: 0.5rem;
}
select {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: #333;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid #ccc;
  background-color: #fff;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin-left: 0.8rem;
  margin-bottom: 0.4rem;
}
label{
  font-family: Impact;
  color: #04AA6D;
  text-shadow: 0.1em 0.1em 0.2em black;
  font-size: 100%;
}


select:focus {
  outline: none;
  border-color: #04AA6D;
}

select:hover {
  border-color: #04AA6D;
}

</style>