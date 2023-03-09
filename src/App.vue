<template>
 <CustomHeader>
    <SearchInput v-on:search-input="setQuery"  ></SearchInput>
 </CustomHeader>

  <main>
    <section>
      <div class="filters">
        <span class="filter-letter"><h2>Filters Displayed</h2></span>
        <span class="filter-letter"><h3>Status</h3></span>
        <CustomFilter
          :filters="filtersStatus"
          v-on:box-checked="setStatus"
        ></CustomFilter>
        <span class="filter-letter"><h3>Gender</h3></span>
        <CustomFilter
          :filters="filtersGender"
          v-on:box-checked="setGender"
        ></CustomFilter>
        <span class="filter-letter"><h3>Species</h3></span>
        <CustomFilter
          :filters="filtersSpecie"
          v-on:box-checked="setSpecies"
        ></CustomFilter>
        <span class="filter-letter"><h2>Filters Querys</h2></span>
        <CustomSelect :filters="statusSelect" :nameSelect="nameSelect[0]" v-on:filter-selected="addFilterStatus" ></CustomSelect>
        <CustomSelect :filters="genderSelect" :nameSelect="nameSelect[1]" v-on:filter-selected="addFilterGender" ></CustomSelect>
        <CustomSelect :filters="speciesSelect" :nameSelect="nameSelect[2]" v-on:filter-selected="addFilterSpecies" ></CustomSelect>

      </div>
    </section>
    <characters-grid>
      <CustomCard :characters="VisibleCharacters"></CustomCard>
    </characters-grid>

  </main>
</template>
<script>
import SearchInput from "@/components/SearchInput.vue";
import CustomFilter from "@/components/CustomFilter.vue";
import CustomCard from "@/components/CustomCard.vue";
import CustomSelect from "@/components/CustomSelect.vue";
import CharactersGrid from "@/components/CharactersGrid.vue";
import CustomHeader from "@/components/CustomHeader.vue";

export default {
  components: {CustomHeader, CharactersGrid, CustomSelect, CustomCard, CustomFilter, SearchInput },
  data() {
    return {
      characters: [],
      filterStatus: [],
      filterGender:[],
      filterSpecie:[],
      currentQuery: "",
      status: new Set(),
      gender: new Set(),
      species: new Set(),
      nameSelect:["Status","Gender","Species"],
      statusSelect:["Alive","unknown","Dead"],
      genderSelect:["Male","Female"],
      speciesSelect:["Human","Alien","Humanoid"]
    };
  },

  methods: {
    setQuery(event){
      this.currentQuery = 'name='+event;
    },
    addFilterStatus(event){
      this.filterStatus ="&status="+event;
    },
    addFilterGender(event){
      this.filterGender = "&gender="+event;
    },
    addFilterSpecies(event){
      this.filterSpecie = "&species="+event;
    },
    search() {
      let currentStatus;
      let currentGender
      let currentSpecie
      let query = this.currentQuery;
      currentStatus = this.filterStatus;
      currentGender = this.filterGender;
      currentSpecie = this.filterSpecie;

      let filters = currentStatus + currentGender+currentSpecie;
      let api =
        "https://rickandmortyapi.com/api/character/?" + query + filters;
      fetch(api)
        .then((data) => data.json())
        .then((data) => {
          this.characters = data.results;
        });
    },
    setStatus(event) {
      this.status = event;
    },

    setGender(event) {
      this.gender = event;
    },

    setSpecies(event) {
      this.species = event;
    },
    setSpin(event){

    }

  },
  watch:{
    currentQuery(){
      this.search();
    },
    filterStatus(){
      this.search()
    },
    filterGender(){
      this.search()
    },
    filterSpecie(){
      this.search()
    }
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
    filtersGender() {
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

</style>
