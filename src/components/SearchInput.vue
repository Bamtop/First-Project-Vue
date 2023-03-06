<template>

    <input id="search" type="text" v-on:input="searchInput" >

</template>

<script>
export default {
  name: "SearchInput",
  methods: {
    searchInput(event) {
      this.$emit('search-input',event.target.value);
          },


  },

}
</script>

<style>
.header {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 25% auto;
  grid-column-gap: 0.4rem;
  margin-bottom: 1rem;
  background-color: #04AA6D;
  border: #025939 solid;
}

img.logo-header {
  max-width: 100%;
  aspect-ratio: 1;
  cursor: pointer;
  transition: 0.5s;
  padding-left: 3rem;
}

img.logo-header:hover {
  transform: scale(1.15);
}

img.title {
  max-width: 100%;
}



</style>