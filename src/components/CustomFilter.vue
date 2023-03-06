<template>
    <div class="filter">
      <li class="filter" v-for="filter in filters"><label>{{filter}}</label>
        <input type="checkbox" v-bind:name="filter" v-bind:value="filter" checked>
      </li>


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
  }

}

</script>

<style scoped>

</style>