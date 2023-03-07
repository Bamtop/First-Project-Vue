<template>
  <header class="header">
    <img
      class="logo-header"
      src="src/assets/navbar-logo.png"
      alt="rick y morty logo"
    />
    <img class="title" src="src/assets/title.png" alt="rick y morty logo" />
    <SearchInput v-on:search-input="search"></SearchInput>
  </header>

  <main>
    <section>
      <div class="filters">
        <span class="filter-letter"><h2>Filters Displayed</h2></span>
        <span class="filter-letter"><h3>Status</h3></span>
        <CustomFilter
          :filters="filtersStatus"
          v-on:box-checked="filterCardsByStatus"
        ></CustomFilter>
        <span class="filter-letter"><h3>Gender</h3></span>
        <CustomFilter
          :filters="filterGender"
          v-on:box-checked="filterCardsByGender"
        ></CustomFilter>
        <span class="filter-letter"><h3>Species</h3></span>
        <CustomFilter
          :filters="filtersSpecie"
          v-on:box-checked="filterCardsBySpecies"
        ></CustomFilter>
        <span class="filter-letter"><h2>Filters Querys</h2></span>
        <CustomSelect :filters="filtersStatus" :nameSelect="nameSelect[0]" v-on:filter-selected="addFilterStatus" ></CustomSelect>
      </div>
    </section>

    <section class="characters">
      <CustomCard :characters="VisibleCharacters"></CustomCard>
    </section>
  </main>
</template>
<script>
import SearchInput from "@/components/SearchInput.vue";
import CustomFilter from "@/components/CustomFilter.vue";
import CustomCard from "@/components/CustomCard.vue";
import CustomSelect from "@/components/CustomSelect.vue";
export default {
  components: { CustomSelect, CustomCard, CustomFilter, SearchInput },
  data() {
    return {
      characters: [],
      filterStatus: [],
      currentQuery: "",
      status: new Set(),
      gender: new Set(),
      species: new Set(),
      nameSelect:["Status","Gender","Species"],
    };
  },

  methods: {
    addFilterStatus(event) {
      this.filterStatus = event;
      let api =
        "https://rickandmortyapi.com/api/character/?name=" + this.currentQuery;
      if (this.filterStatus.size !== 0) {
        let status = "&status=" + event;
        api += status;
      }
      fetch(api)
        .then((data) => data.json())
        .then((data) => {
          this.characters = data.results;
        });
    },
    search(query) {
      let currentStatus;
      this.currentQuery = query;
      currentStatus = this.filterStatus;
      let status = "&status=" + currentStatus;
      let api =
        "https://rickandmortyapi.com/api/character/?name=" + query + status;
      fetch(api)
        .then((data) => data.json())
        .then((data) => {
          this.characters = data.results;
        });
    },
    filterCardsByStatus(event) {
      this.status = event;
    },

    filterCardsByGender(event) {
      this.gender = event;
    },

    filterCardsBySpecies(event) {
      this.species = event;
    },
  },
  computed: {
    VisibleCharacters() {
      let charactersVisibles = this.characters;
      if (this.status.size !== 0) {
        charactersVisibles = this.characters.filter((character) =>
          this.status.has(character.status)
        );
      }
      if (this.gender.size !== 0) {
        charactersVisibles = this.characters.filter((character) =>
          this.gender.has(character.gender)
        );
      }
      if (this.species.size !== 0) {
        charactersVisibles = this.characters.filter((character) =>
          this.species.has(character.species)
        );
      }
      return charactersVisibles;
    },

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
  },
};
</script>
<style>
main {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 20% auto;
  grid-column-gap: 0.4rem;
  margin-bottom: 1rem;
}
span.filter-letter {
  font-family: Impact;
  color: #04AA6D;
  text-shadow: 0.1em 0.1em 0.2em black;
  font-size: 100%;
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
