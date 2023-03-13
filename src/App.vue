<template>
 <CustomHeader>
    <SearchInput v-on:search-input="setQuery"  ></SearchInput>
 </CustomHeader>

  <main>
    <section class="aside">
      <div class="filters">
        <!--
        <div class="filtersDisplayed">
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
        </div>
        -->
        <div class="queryFilters">
        <span class="filter-letter"><h2>Filters Querys</h2></span>
        <CustomSelect :filters="statusSelect" :nameSelect="nameSelect[0]" v-on:filter-selected="addFilterStatus" ></CustomSelect>
        <CustomSelect :filters="genderSelect" :nameSelect="nameSelect[1]" v-on:filter-selected="addFilterGender" ></CustomSelect>
        <CustomSelect :filters="speciesSelect" :nameSelect="nameSelect[2]" v-on:filter-selected="addFilterSpecies" ></CustomSelect>
        </div>
      </div>
    </section>
    <characters-grid>
      <CustomCard :characters="VisibleCharacters"></CustomCard>
    </characters-grid>
    <div class="separator">

    </div>
    <custom-button :info="info" @input-next="setNext" @input-prev="setPrev" ></custom-button>
  </main>
</template>
<script>
import SearchInput from "@/components/SearchInput.vue";
import CustomFilter from "@/components/CustomFilter.vue";
import CustomCard from "@/components/CustomCard.vue";
import CustomSelect from "@/components/CustomSelect.vue";
import CharactersGrid from "@/components/CharactersGrid.vue";
import CustomHeader from "@/components/CustomHeader.vue";
import CustomButton from "@/components/CustomButton.vue";

export default {
  components: {CustomButton, CustomHeader, CharactersGrid, CustomSelect, CustomCard, CustomFilter, SearchInput },
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
      speciesSelect:["Human","Alien","Humanoid"],
      info:"",
      isNext:false,
      isPrev:false,
    };
  },

  methods: {
    setNext(){
      this.isNext = true;
      this.search();
      this.isNext = false;
    },
    setPrev(){
      this.isPrev = true;
      this.search();
      this.isPrev = false;
    },

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
      let api ="https://rickandmortyapi.com/api/character/?"
      api = api + query + filters;
      if(this.isNext){
        api =this.info.next
      }
      if(this.isPrev){
        api = this.info.prev
      }

      fetch(api)
        .then((data) => data.json())
        .then((data) => {
          this.characters = data.results;
          this.info = data.info;

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
    }
  },

  hiddenPrevButton(){
    this.notPrev = !this.info.prev;
  },

  hiddenNextButton(){
    this.notNext = !this.info.next;

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
  grid-template-columns: 14rem auto;
  grid-column-gap: 0.4rem;
  margin-bottom: 1rem;
}
span.filter-letter {
  font-family: Impact;
  color: #04AA6D;
  text-shadow: 0.1em 0.1em 0.2em black;
  font-size: 100%;
}
.queryFilters{
  display: flex;
  flex-direction: column;
}

@media only screen and (max-width: 500px) {
  main {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto;
    grid-column-gap: 0.4rem;
    margin-bottom: 1rem;
  }
  .aside{
    display: flex;
    justify-content: center;
  }
}

</style>
