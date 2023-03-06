<template>
  <header class="header">
    <img class ="logo-header" src="src/assets/navbar-logo.png" alt="rick y morty logo">
    <img class ="title" src="src/assets/title.png" alt="rick y morty logo">
  <SearchInput v-on:search-input="search"></SearchInput>
  </header>


    <main>
      <section>
        <div class="filters">
          <span class="filter-letter"><h2>Status</h2></span>
          <CustomFilter :filters="filtersStatus"></CustomFilter>
          <span class="filter-letter"><h2>Gender</h2></span>
          <CustomFilter :filters="filterGender"></CustomFilter>
          <span class="filter-letter"><h2>Species</h2></span>
          <CustomFilter :filters="filtersSpecie"></CustomFilter>
          <span class="filter-letter"><h2>Species</h2></span>
          <CustomFilter :filters="filterType"></CustomFilter>
        </div>
      </section>

      <section class="characters">
        <CustomCard :characters="characters"></CustomCard>
      </section>
    </main>


</template>
<script>
import SearchInput from "@/components/SearchInput.vue";
import CustomFilter from "@/components/CustomFilter.vue";
import CustomCard from "@/components/CustomCard.vue";
  export default {
    components: {CustomCard, CustomFilter, SearchInput},
    data() {
      return {
        characters: []
      };
    },

    methods: {
      search(event) {
        fetch('https://rickandmortyapi.com/api/character/?name=' + event)
            .then(data => data.json())
            .then(data => {
              this.characters = data.results;
            });
      }
    },
    computed: {
      filtersStatus() {
        return this.characters.reduce((filters, character) => {
          filters.add(character.status);
          return filters;
        }, new Set());
      },
      filtersSpecie() {
        return this.characters.reduce((filters, character) => {
          filters.add(character.species);
          return filters;
        }, new Set());
      },
      filterGender() {
        return this.characters.reduce((filters, character) => {
          filters.add(character.gender);
          return filters;
        }, new Set());
      },
      filterType() {
        return this.characters.reduce((filters, character) => {
          filters.add(character.type);
          return filters;
        }, new Set());
      },
    },
  };


</script>
<style>
main{
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 20% auto;
  grid-column-gap: 0.4rem;
  margin-bottom: 1rem;
}
.characters {
  background: darkkhaki;
  padding: 1.5rem;
  border: black solid 0.1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 1rem;
  grid-row-gap: 0.8rem;
}

</style>
