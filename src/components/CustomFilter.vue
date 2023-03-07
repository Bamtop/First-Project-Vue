<template>
    <div class="filter">
      <ul>
        <li class="filter" v-for="filter in filters"><label>{{filter}}</label>
          <input type="checkbox" v-bind:name="filter" v-bind:value="filter" v-on:change="boxChecked">
        </li>
      </ul>

  </div>
</template>

<script>
export default {
  name: "CustomFilter",
  props:{
    filters:{
      type: Set,
      required: true
    }
  },
  data(){
    return{
      filterChecked:new Set,
    }
  },
  methods:{
    boxChecked(event){
      const filters = this.filterChecked;
      const filterValue = event.target.value;
      if(filters.has(filterValue)){
        filters.delete(filterValue);
      }else{
        filters.add(filterValue);
      }
      this.filterChecked = filters;
      this.$emit('box-checked',filters);
    }
  }
}
</script>

<style>

</style>